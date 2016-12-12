'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.destroyScope = exports.destroyAll = exports.destroy = exports.create = exports.scope = exports.get = exports.list = exports.associations = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('./utils');

var _boom = require('boom');

var _index = require('./associations/index');

var associations = _interopRequireWildcard(_index);

var _getConfigForMethod = require('./get-config-for-method.js');

var _getConfigForMethod2 = _interopRequireDefault(_getConfigForMethod);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

const createAll = ({
  server,
  model,
  prefix,
  config,
  attributeValidation,
  associationValidation,
  scopes
}) => {
  Object.keys(methods).forEach(method => {
    methods[method]({
      server,
      model,
      prefix,
      config: (0, _getConfigForMethod2.default)({
        method,
        attributeValidation,
        associationValidation,
        config,
        scopes
      })
    });
  });
};

exports.associations = associations;

/*
The `models` option, becomes `permissions`, and can look like:

```
models: ['cat', 'dog']
```

or

```
models: {
  cat: ['list', 'get']
  , dog: true // all
}
```

*/

function _ref(params, attribute) {
  // TODO: use joi-sequelize
  params[attribute] = _joi2.default.any();
  return params;
}

exports.default = (server, model, { prefix, defaultConfig: config, models: permissions }) => {
  const modelName = model._singular;
  const modelAttributes = Object.keys(model.attributes);
  const associatedModelNames = Object.keys(model.associations);
  const modelAssociations = [...associatedModelNames, ..._lodash2.default.flatMap(associatedModelNames, associationName => {
    const { target } = model.associations[associationName];
    const { _singular, _plural, _Singular, _Plural } = target;
    return [_singular, _plural, _Singular, _Plural];
  })].filter(Boolean);

  const attributeValidation = modelAttributes.reduce(_ref, {});

  const validAssociations = modelAssociations.length ? _joi2.default.string().valid(...modelAssociations) : _joi2.default.valid(null);
  const associationValidation = {
    include: [_joi2.default.array().items(validAssociations), validAssociations]
  };

  const scopes = Object.keys(model.options.scopes);

  // if we don't have any permissions set, just create all the methods

  function _ref2(permission) {
    return permission.model === modelName;
  }

  function _ref4(permissionOption) {
    if (_lodash2.default.isPlainObject(permissionOption)) {
      const permissionConfig = permissionOption.config || config;

      function _ref3(method) {
        methods[method]({
          server,
          model,
          prefix,
          config: (0, _getConfigForMethod2.default)({
            method,
            attributeValidation,
            associationValidation,
            scopes,
            config: permissionConfig
          })
        });
      }

      if (permissionOption.methods) {
        permissionOption.methods.forEach(_ref3);
      } else {
        createAll({
          server,
          model,
          prefix,
          attributeValidation,
          associationValidation,
          scopes,
          config: permissionConfig
        });
      }
    }
  }

  if (!permissions) {
    createAll({
      server,
      model,
      prefix,
      config,
      attributeValidation,
      associationValidation,
      scopes
    });
    // if permissions are set, but we can't parse them, throw an error
  } else if (!Array.isArray(permissions)) {
    throw new Error('hapi-sequelize-crud: `models` property must be an array');
    // if permissions are set, but the only thing we've got is a model name, there
    // are no permissions to be set, so just create all methods and move on
  } else if (permissions.includes(modelName)) {
    createAll({
      server,
      model,
      prefix,
      config,
      attributeValidation,
      associationValidation,
      scopes
    });
    // if we've gotten here, we have complex permissions and need to set them
  } else {
    const permissionOptions = permissions.filter(_ref2);

    permissionOptions.forEach(_ref4);
  }
};

function _ref5(item) {
  return item.toJSON();
}

const list = exports.list = ({ server, model, prefix = '/', config }) => {
  var _desc, _value, _obj;

  server.route((_obj = {
    method: 'GET',
    path: _path2.default.join(prefix, model._plural),

    handler(request, reply) {
      return _asyncToGenerator(function* () {
        const include = (0, _utils.parseInclude)(request);
        const where = (0, _utils.parseWhere)(request);
        const { limit, offset } = (0, _utils.parseLimitAndOffset)(request);
        const order = (0, _utils.parseOrder)(request);

        if (include instanceof Error) return void reply(include);

        const list = yield model.findAll({
          where, include, limit, offset, order
        });

        if (!list.length) return void reply((0, _boom.notFound)('Nothing found.'));

        reply(list.map(_ref5));
      })();
    },

    config
  }, (_applyDecoratedDescriptor(_obj, 'handler', [_error2.default], Object.getOwnPropertyDescriptor(_obj, 'handler'), _obj)), _obj));
};

const get = exports.get = ({ server, model, prefix = '/', config }) => {
  var _desc2, _value2, _obj2;

  server.route((_obj2 = {
    method: 'GET',
    path: _path2.default.join(prefix, model._singular, '{id?}'),

    handler(request, reply) {
      return _asyncToGenerator(function* () {
        const include = (0, _utils.parseInclude)(request);
        const where = (0, _utils.parseWhere)(request);
        const { id } = request.params;
        if (id) where[model.primaryKeyField] = id;

        if (include instanceof Error) return void reply(include);

        const instance = yield model.findOne({ where, include });

        if (!instance) return void reply((0, _boom.notFound)(`${ id } not found.`));

        reply(instance.toJSON());
      })();
    },
    config
  }, (_applyDecoratedDescriptor(_obj2, 'handler', [_error2.default], Object.getOwnPropertyDescriptor(_obj2, 'handler'), _obj2)), _obj2));
};

function _ref6(item) {
  return item.toJSON();
}

const scope = exports.scope = ({ server, model, prefix = '/', config }) => {
  var _desc3, _value3, _obj3;

  server.route((_obj3 = {
    method: 'GET',
    path: _path2.default.join(prefix, model._plural, '{scope}'),

    handler(request, reply) {
      return _asyncToGenerator(function* () {
        const include = (0, _utils.parseInclude)(request);
        const where = (0, _utils.parseWhere)(request);
        const { limit, offset } = (0, _utils.parseLimitAndOffset)(request);
        const order = (0, _utils.parseOrder)(request);

        if (include instanceof Error) return void reply(include);

        const list = yield model.scope(request.params.scope).findAll({
          include, where, limit, offset, order
        });

        if (!list.length) return void reply((0, _boom.notFound)('Nothing found.'));

        reply(list.map(_ref6));
      })();
    },
    config
  }, (_applyDecoratedDescriptor(_obj3, 'handler', [_error2.default], Object.getOwnPropertyDescriptor(_obj3, 'handler'), _obj3)), _obj3));
};

const create = exports.create = ({ server, model, prefix = '/', config }) => {
  var _desc4, _value4, _obj4;

  server.route((_obj4 = {
    method: 'POST',
    path: _path2.default.join(prefix, model._singular),

    handler(request, reply) {
      return _asyncToGenerator(function* () {
        const instance = yield model.create(request.payload);

        reply(instance.toJSON());
      })();
    },

    config
  }, (_applyDecoratedDescriptor(_obj4, 'handler', [_error2.default], Object.getOwnPropertyDescriptor(_obj4, 'handler'), _obj4)), _obj4));
};

function _ref7(instance) {
  return instance.destroy();
}

function _ref8(item) {
  return item.toJSON();
}

const destroy = exports.destroy = ({ server, model, prefix = '/', config }) => {
  var _desc5, _value5, _obj5;

  server.route((_obj5 = {
    method: 'DELETE',
    path: _path2.default.join(prefix, model._singular, '{id?}'),

    handler(request, reply) {
      return _asyncToGenerator(function* () {
        const where = (0, _utils.parseWhere)(request);
        const { id } = request.params;
        if (id) where[model.primaryKeyField] = id;

        const list = yield model.findAll({ where });

        if (!list.length) {
          return void reply(id ? (0, _boom.notFound)(`${ id } not found.`) : (0, _boom.notFound)('Nothing found.'));
        }

        yield Promise.all(list.map(_ref7));

        const listAsJSON = list.map(_ref8);
        reply(listAsJSON.length === 1 ? listAsJSON[0] : listAsJSON);
      })();
    },

    config
  }, (_applyDecoratedDescriptor(_obj5, 'handler', [_error2.default], Object.getOwnPropertyDescriptor(_obj5, 'handler'), _obj5)), _obj5));
};

function _ref9(instance) {
  return instance.destroy();
}

function _ref10(item) {
  return item.toJSON();
}

const destroyAll = exports.destroyAll = ({ server, model, prefix = '/', config }) => {
  var _desc6, _value6, _obj6;

  server.route((_obj6 = {
    method: 'DELETE',
    path: _path2.default.join(prefix, model._plural),

    handler(request, reply) {
      return _asyncToGenerator(function* () {
        const where = (0, _utils.parseWhere)(request);
        const { id } = request.params;

        const list = yield model.findAll({ where });

        if (!list.length) {
          return void reply(id ? (0, _boom.notFound)(`${ id } not found.`) : (0, _boom.notFound)('Nothing found.'));
        }

        yield Promise.all(list.map(_ref9));

        const listAsJSON = list.map(_ref10);
        reply(listAsJSON.length === 1 ? listAsJSON[0] : listAsJSON);
      })();
    },

    config
  }, (_applyDecoratedDescriptor(_obj6, 'handler', [_error2.default], Object.getOwnPropertyDescriptor(_obj6, 'handler'), _obj6)), _obj6));
};

function _ref11(instance) {
  return instance.destroy();
}

function _ref12(item) {
  return item.toJSON();
}

const destroyScope = exports.destroyScope = ({ server, model, prefix = '/', config }) => {
  var _desc7, _value7, _obj7;

  server.route((_obj7 = {
    method: 'DELETE',
    path: _path2.default.join(prefix, model._plural, '{scope}'),

    handler(request, reply) {
      return _asyncToGenerator(function* () {
        const include = (0, _utils.parseInclude)(request);
        const where = (0, _utils.parseWhere)(request);

        if (include instanceof Error) return void reply(include);

        const list = yield model.scope(request.params.scope).findAll({ include, where });

        if (!list.length) return void reply((0, _boom.notFound)('Nothing found.'));

        yield Promise.all(list.map(_ref11));

        const listAsJSON = list.map(_ref12);
        reply(listAsJSON.length === 1 ? listAsJSON[0] : listAsJSON);
      })();
    },
    config
  }, (_applyDecoratedDescriptor(_obj7, 'handler', [_error2.default], Object.getOwnPropertyDescriptor(_obj7, 'handler'), _obj7)), _obj7));
};

const update = exports.update = ({ server, model, prefix = '/', config }) => {
  var _desc8, _value8, _obj8;

  server.route((_obj8 = {
    method: 'PUT',
    path: _path2.default.join(prefix, model._singular, '{id}'),

    handler(request, reply) {
      return _asyncToGenerator(function* () {
        const { id } = request.params;
        const instance = yield model.findById(id);

        if (!instance) return void reply((0, _boom.notFound)(`${ id } not found.`));

        yield instance.update(request.payload);

        reply(instance.toJSON());
      })();
    },

    config
  }, (_applyDecoratedDescriptor(_obj8, 'handler', [_error2.default], Object.getOwnPropertyDescriptor(_obj8, 'handler'), _obj8)), _obj8));
};

const methods = {
  list, get, scope, create, destroy, destroyAll, destroyScope, update
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcnVkLmpzIl0sIm5hbWVzIjpbImFzc29jaWF0aW9ucyIsImNyZWF0ZUFsbCIsInNlcnZlciIsIm1vZGVsIiwicHJlZml4IiwiY29uZmlnIiwiYXR0cmlidXRlVmFsaWRhdGlvbiIsImFzc29jaWF0aW9uVmFsaWRhdGlvbiIsInNjb3BlcyIsIk9iamVjdCIsImtleXMiLCJtZXRob2RzIiwiZm9yRWFjaCIsIm1ldGhvZCIsInBhcmFtcyIsImF0dHJpYnV0ZSIsImFueSIsImRlZmF1bHRDb25maWciLCJtb2RlbHMiLCJwZXJtaXNzaW9ucyIsIm1vZGVsTmFtZSIsIl9zaW5ndWxhciIsIm1vZGVsQXR0cmlidXRlcyIsImF0dHJpYnV0ZXMiLCJhc3NvY2lhdGVkTW9kZWxOYW1lcyIsIm1vZGVsQXNzb2NpYXRpb25zIiwiZmxhdE1hcCIsImFzc29jaWF0aW9uTmFtZSIsInRhcmdldCIsIl9wbHVyYWwiLCJfU2luZ3VsYXIiLCJfUGx1cmFsIiwiZmlsdGVyIiwiQm9vbGVhbiIsInJlZHVjZSIsInZhbGlkQXNzb2NpYXRpb25zIiwibGVuZ3RoIiwic3RyaW5nIiwidmFsaWQiLCJpbmNsdWRlIiwiYXJyYXkiLCJpdGVtcyIsIm9wdGlvbnMiLCJwZXJtaXNzaW9uIiwicGVybWlzc2lvbk9wdGlvbiIsImlzUGxhaW5PYmplY3QiLCJwZXJtaXNzaW9uQ29uZmlnIiwiQXJyYXkiLCJpc0FycmF5IiwiRXJyb3IiLCJpbmNsdWRlcyIsInBlcm1pc3Npb25PcHRpb25zIiwiaXRlbSIsInRvSlNPTiIsImxpc3QiLCJyb3V0ZSIsInBhdGgiLCJqb2luIiwiaGFuZGxlciIsInJlcXVlc3QiLCJyZXBseSIsIndoZXJlIiwibGltaXQiLCJvZmZzZXQiLCJvcmRlciIsImZpbmRBbGwiLCJtYXAiLCJnZXQiLCJpZCIsInByaW1hcnlLZXlGaWVsZCIsImluc3RhbmNlIiwiZmluZE9uZSIsInNjb3BlIiwiY3JlYXRlIiwicGF5bG9hZCIsImRlc3Ryb3kiLCJQcm9taXNlIiwiYWxsIiwibGlzdEFzSlNPTiIsImRlc3Ryb3lBbGwiLCJkZXN0cm95U2NvcGUiLCJ1cGRhdGUiLCJmaW5kQnlJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0lBQVlBLFk7O0FBQ1o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLE1BQU1DLFlBQVksQ0FBQztBQUNqQkMsUUFEaUI7QUFFakJDLE9BRmlCO0FBR2pCQyxRQUhpQjtBQUlqQkMsUUFKaUI7QUFLakJDLHFCQUxpQjtBQU1qQkMsdUJBTmlCO0FBT2pCQztBQVBpQixDQUFELEtBUVo7QUFDSkMsU0FBT0MsSUFBUCxDQUFZQyxPQUFaLEVBQXFCQyxPQUFyQixDQUE4QkMsTUFBRCxJQUFZO0FBQ3ZDRixZQUFRRSxNQUFSLEVBQWdCO0FBQ2RYLFlBRGM7QUFFZEMsV0FGYztBQUdkQyxZQUhjO0FBSWRDLGNBQVEsa0NBQW1CO0FBQ3pCUSxjQUR5QjtBQUV6QlAsMkJBRnlCO0FBR3pCQyw2QkFIeUI7QUFJekJGLGNBSnlCO0FBS3pCRztBQUx5QixPQUFuQjtBQUpNLEtBQWhCO0FBWUQsR0FiRDtBQWNELENBdkJEOztRQXlCU1IsWSxHQUFBQSxZOztBQUVUOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUErQnFELGNBQUNjLE1BQUQsRUFBU0MsU0FBVCxFQUF1QjtBQUN4RTtBQUNBRCxTQUFPQyxTQUFQLElBQW9CLGNBQUlDLEdBQUosRUFBcEI7QUFDQSxTQUFPRixNQUFQO0FBQ0Q7O2tCQWpCWSxDQUFDWixNQUFELEVBQVNDLEtBQVQsRUFBZ0IsRUFBRUMsTUFBRixFQUFVYSxlQUFlWixNQUF6QixFQUFpQ2EsUUFBUUMsV0FBekMsRUFBaEIsS0FBMkU7QUFDeEYsUUFBTUMsWUFBWWpCLE1BQU1rQixTQUF4QjtBQUNBLFFBQU1DLGtCQUFrQmIsT0FBT0MsSUFBUCxDQUFZUCxNQUFNb0IsVUFBbEIsQ0FBeEI7QUFDQSxRQUFNQyx1QkFBdUJmLE9BQU9D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LEtBQTZDO0FBQUE7O0FBQ2pFSCxTQUFPcUQsS0FBUCxVQUFhO0FBQ1gxQyxZQUFRLEtBREc7QUFFWDJDLFVBQU0sZUFBS0MsSUFBTCxDQUFVckQsTUFBVixFQUFrQkQsTUFBTWtCLFNBQXhCLEVBQW1DLE1BQW5DLENBRks7O0FBS0xxQyxXQUFOLENBQWNDLE9BQWQsRUFBdUJDLEtBQXZCLEVBQThCO0FBQUE7QUFDNUIsY0FBTSxFQUFFUSxFQUFGLEtBQVNULFFBQVE3QyxNQUF2QjtBQUNBLGNBQU13RCxXQUFXLE1BQU1uRSxNQUFNK0UsUUFBTixDQUFlZCxFQUFmLENBQXZCOztBQUVBLFlBQUksQ0FBQ0UsUUFBTCxFQUFlLE9BQU8sS0FBS1YsTUFBTSxvQkFBVSxJQUFFUSxFQUFHLGNBQWYsQ0FBTixDQUFaOztBQUVmLGNBQU1FLFNBQVNXLE1BQVQsQ0FBZ0J0QixRQUFRZSxPQUF4QixDQUFOOztBQUVBZCxjQUFNVSxTQUFTakIsTUFBVCxFQUFOO0FBUjRCO0FBUzdCLEtBZFU7O0FBZ0JYaEQ7QUFoQlcsR0FBYjtBQWtCRCxDQW5CTTs7QUFxQlAsTUFBTU0sVUFBVTtBQUNkMkMsTUFEYyxFQUNSYSxHQURRLEVBQ0hLLEtBREcsRUFDSUMsTUFESixFQUNZRSxPQURaLEVBQ3FCSSxVQURyQixFQUNpQ0MsWUFEakMsRUFDK0NDO0FBRC9DLENBQWhCIiwiZmlsZSI6ImNydWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgam9pIGZyb20gJ2pvaSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBlcnJvciBmcm9tICcuL2Vycm9yJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBwYXJzZUluY2x1ZGUsIHBhcnNlV2hlcmUsIHBhcnNlTGltaXRBbmRPZmZzZXQsIHBhcnNlT3JkZXIgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IG5vdEZvdW5kIH0gZnJvbSAnYm9vbSc7XG5pbXBvcnQgKiBhcyBhc3NvY2lhdGlvbnMgZnJvbSAnLi9hc3NvY2lhdGlvbnMvaW5kZXgnO1xuaW1wb3J0IGdldENvbmZpZ0Zvck1ldGhvZCBmcm9tICcuL2dldC1jb25maWctZm9yLW1ldGhvZC5qcyc7XG5cbmNvbnN0IGNyZWF0ZUFsbCA9ICh7XG4gIHNlcnZlcixcbiAgbW9kZWwsXG4gIHByZWZpeCxcbiAgY29uZmlnLFxuICBhdHRyaWJ1dGVWYWxpZGF0aW9uLFxuICBhc3NvY2lhdGlvblZhbGlkYXRpb24sXG4gIHNjb3Blcyxcbn0pID0+IHtcbiAgT2JqZWN0LmtleXMobWV0aG9kcykuZm9yRWFjaCgobWV0aG9kKSA9PiB7XG4gICAgbWV0aG9kc1ttZXRob2RdKHtcbiAgICAgIHNlcnZlcixcbiAgICAgIG1vZGVsLFxuICAgICAgcHJlZml4LFxuICAgICAgY29uZmlnOiBnZXRDb25maWdGb3JNZXRob2Qoe1xuICAgICAgICBtZXRob2QsXG4gICAgICAgIGF0dHJpYnV0ZVZhbGlkYXRpb24sXG4gICAgICAgIGFzc29jaWF0aW9uVmFsaWRhdGlvbixcbiAgICAgICAgY29uZmlnLFxuICAgICAgICBzY29wZXMsXG4gICAgICB9KSxcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgeyBhc3NvY2lhdGlvbnMgfTtcblxuLypcblRoZSBgbW9kZWxzYCBvcHRpb24sIGJlY29tZXMgYHBlcm1pc3Npb25zYCwgYW5kIGNhbiBsb29rIGxpa2U6XG5cbmBgYFxubW9kZWxzOiBbJ2NhdCcsICdkb2cnXVxuYGBgXG5cbm9yXG5cbmBgYFxubW9kZWxzOiB7XG4gIGNhdDogWydsaXN0JywgJ2dldCddXG4gICwgZG9nOiB0cnVlIC8vIGFsbFxufVxuYGBgXG5cbiovXG5cbmV4cG9ydCBkZWZhdWx0IChzZXJ2ZXIsIG1vZGVsLCB7IHByZWZpeCwgZGVmYXVsdENvbmZpZzogY29uZmlnLCBtb2RlbHM6IHBlcm1pc3Npb25zIH0pID0+IHtcbiAgY29uc3QgbW9kZWxOYW1lID0gbW9kZWwuX3Npbmd1bGFyO1xuICBjb25zdCBtb2RlbEF0dHJpYnV0ZXMgPSBPYmplY3Qua2V5cyhtb2RlbC5hdHRyaWJ1dGVzKTtcbiAgY29uc3QgYXNzb2NpYXRlZE1vZGVsTmFtZXMgPSBPYmplY3Qua2V5cyhtb2RlbC5hc3NvY2lhdGlvbnMpO1xuICBjb25zdCBtb2RlbEFzc29jaWF0aW9ucyA9IFtcbiAgICAuLi5hc3NvY2lhdGVkTW9kZWxOYW1lcyxcbiAgICAuLi5fLmZsYXRNYXAoYXNzb2NpYXRlZE1vZGVsTmFtZXMsIChhc3NvY2lhdGlvbk5hbWUpID0+IHtcbiAgICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBtb2RlbC5hc3NvY2lhdGlvbnNbYXNzb2NpYXRpb25OYW1lXTtcbiAgICAgIGNvbnN0IHsgX3Npbmd1bGFyLCBfcGx1cmFsLCBfU2luZ3VsYXIsIF9QbHVyYWwgfSA9IHRhcmdldDtcbiAgICAgIHJldHVybiBbX3Npbmd1bGFyLCBfcGx1cmFsLCBfU2luZ3VsYXIsIF9QbHVyYWxdO1xuICAgIH0pLFxuICBdLmZpbHRlcihCb29sZWFuKTtcblxuICBjb25zdCBhdHRyaWJ1dGVWYWxpZGF0aW9uID0gbW9kZWxBdHRyaWJ1dGVzLnJlZHVjZSgocGFyYW1zLCBhdHRyaWJ1dGUpID0+IHtcbiAgICAvLyBUT0RPOiB1c2Ugam9pLXNlcXVlbGl6ZVxuICAgIHBhcmFtc1thdHRyaWJ1dGVdID0gam9pLmFueSgpO1xuICAgIHJldHVybiBwYXJhbXM7XG4gIH0sIHt9KTtcblxuICBjb25zdCB2YWxpZEFzc29jaWF0aW9ucyA9IG1vZGVsQXNzb2NpYXRpb25zLmxlbmd0aFxuICAgID8gam9pLnN0cmluZygpLnZhbGlkKC4uLm1vZGVsQXNzb2NpYXRpb25zKVxuICAgIDogam9pLnZhbGlkKG51bGwpO1xuICBjb25zdCBhc3NvY2lhdGlvblZhbGlkYXRpb24gPSB7XG4gICAgaW5jbHVkZTogW2pvaS5hcnJheSgpLml0ZW1zKHZhbGlkQXNzb2NpYXRpb25zKSwgdmFsaWRBc3NvY2lhdGlvbnNdLFxuICB9O1xuXG4gIGNvbnN0IHNjb3BlcyA9IE9iamVjdC5rZXlzKG1vZGVsLm9wdGlvbnMuc2NvcGVzKTtcblxuICAvLyBpZiB3ZSBkb24ndCBoYXZlIGFueSBwZXJtaXNzaW9ucyBzZXQsIGp1c3QgY3JlYXRlIGFsbCB0aGUgbWV0aG9kc1xuICBpZiAoIXBlcm1pc3Npb25zKSB7XG4gICAgY3JlYXRlQWxsKHtcbiAgICAgIHNlcnZlcixcbiAgICAgIG1vZGVsLFxuICAgICAgcHJlZml4LFxuICAgICAgY29uZmlnLFxuICAgICAgYXR0cmlidXRlVmFsaWRhdGlvbixcbiAgICAgIGFzc29jaWF0aW9uVmFsaWRhdGlvbixcbiAgICAgIHNjb3BlcyxcbiAgICB9KTtcbiAgLy8gaWYgcGVybWlzc2lvbnMgYXJlIHNldCwgYnV0IHdlIGNhbid0IHBhcnNlIHRoZW0sIHRocm93IGFuIGVycm9yXG4gIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkocGVybWlzc2lvbnMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdoYXBpLXNlcXVlbGl6ZS1jcnVkOiBgbW9kZWxzYCBwcm9wZXJ0eSBtdXN0IGJlIGFuIGFycmF5Jyk7XG4gIC8vIGlmIHBlcm1pc3Npb25zIGFyZSBzZXQsIGJ1dCB0aGUgb25seSB0aGluZyB3ZSd2ZSBnb3QgaXMgYSBtb2RlbCBuYW1lLCB0aGVyZVxuICAvLyBhcmUgbm8gcGVybWlzc2lvbnMgdG8gYmUgc2V0LCBzbyBqdXN0IGNyZWF0ZSBhbGwgbWV0aG9kcyBhbmQgbW92ZSBvblxuICB9IGVsc2UgaWYgKHBlcm1pc3Npb25zLmluY2x1ZGVzKG1vZGVsTmFtZSkpIHtcbiAgICBjcmVhdGVBbGwoe1xuICAgICAgc2VydmVyLFxuICAgICAgbW9kZWwsXG4gICAgICBwcmVmaXgsXG4gICAgICBjb25maWcsXG4gICAgICBhdHRyaWJ1dGVWYWxpZGF0aW9uLFxuICAgICAgYXNzb2NpYXRpb25WYWxpZGF0aW9uLFxuICAgICAgc2NvcGVzLFxuICAgIH0pO1xuICAvLyBpZiB3ZSd2ZSBnb3R0ZW4gaGVyZSwgd2UgaGF2ZSBjb21wbGV4IHBlcm1pc3Npb25zIGFuZCBuZWVkIHRvIHNldCB0aGVtXG4gIH0gZWxzZSB7XG4gICAgY29uc3QgcGVybWlzc2lvbk9wdGlvbnMgPSBwZXJtaXNzaW9ucy5maWx0ZXIoKHBlcm1pc3Npb24pID0+IHtcbiAgICAgIHJldHVybiBwZXJtaXNzaW9uLm1vZGVsID09PSBtb2RlbE5hbWU7XG4gICAgfSk7XG5cbiAgICBwZXJtaXNzaW9uT3B0aW9ucy5mb3JFYWNoKChwZXJtaXNzaW9uT3B0aW9uKSA9PiB7XG4gICAgICBpZiAoXy5pc1BsYWluT2JqZWN0KHBlcm1pc3Npb25PcHRpb24pKSB7XG4gICAgICAgIGNvbnN0IHBlcm1pc3Npb25Db25maWcgPSBwZXJtaXNzaW9uT3B0aW9uLmNvbmZpZyB8fCBjb25maWc7XG5cbiAgICAgICAgaWYgKHBlcm1pc3Npb25PcHRpb24ubWV0aG9kcykge1xuICAgICAgICAgIHBlcm1pc3Npb25PcHRpb24ubWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHtcbiAgICAgICAgICAgIG1ldGhvZHNbbWV0aG9kXSh7XG4gICAgICAgICAgICAgIHNlcnZlcixcbiAgICAgICAgICAgICAgbW9kZWwsXG4gICAgICAgICAgICAgIHByZWZpeCxcbiAgICAgICAgICAgICAgY29uZmlnOiBnZXRDb25maWdGb3JNZXRob2Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZCxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVWYWxpZGF0aW9uLFxuICAgICAgICAgICAgICAgIGFzc29jaWF0aW9uVmFsaWRhdGlvbixcbiAgICAgICAgICAgICAgICBzY29wZXMsXG4gICAgICAgICAgICAgICAgY29uZmlnOiBwZXJtaXNzaW9uQ29uZmlnLFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNyZWF0ZUFsbCh7XG4gICAgICAgICAgICBzZXJ2ZXIsXG4gICAgICAgICAgICBtb2RlbCxcbiAgICAgICAgICAgIHByZWZpeCxcbiAgICAgICAgICAgIGF0dHJpYnV0ZVZhbGlkYXRpb24sXG4gICAgICAgICAgICBhc3NvY2lhdGlvblZhbGlkYXRpb24sXG4gICAgICAgICAgICBzY29wZXMsXG4gICAgICAgICAgICBjb25maWc6IHBlcm1pc3Npb25Db25maWcsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGxpc3QgPSAoeyBzZXJ2ZXIsIG1vZGVsLCBwcmVmaXggPSAnLycsIGNvbmZpZyB9KSA9PiB7XG4gIHNlcnZlci5yb3V0ZSh7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICBwYXRoOiBwYXRoLmpvaW4ocHJlZml4LCBtb2RlbC5fcGx1cmFsKSxcblxuICAgIEBlcnJvclxuICAgIGFzeW5jIGhhbmRsZXIocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgIGNvbnN0IGluY2x1ZGUgPSBwYXJzZUluY2x1ZGUocmVxdWVzdCk7XG4gICAgICBjb25zdCB3aGVyZSA9IHBhcnNlV2hlcmUocmVxdWVzdCk7XG4gICAgICBjb25zdCB7IGxpbWl0LCBvZmZzZXQgfSA9IHBhcnNlTGltaXRBbmRPZmZzZXQocmVxdWVzdCk7XG4gICAgICBjb25zdCBvcmRlciA9IHBhcnNlT3JkZXIocmVxdWVzdCk7XG5cbiAgICAgIGlmIChpbmNsdWRlIGluc3RhbmNlb2YgRXJyb3IpIHJldHVybiB2b2lkIHJlcGx5KGluY2x1ZGUpO1xuXG4gICAgICBjb25zdCBsaXN0ID0gYXdhaXQgbW9kZWwuZmluZEFsbCh7XG4gICAgICAgIHdoZXJlLCBpbmNsdWRlLCBsaW1pdCwgb2Zmc2V0LCBvcmRlcixcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIWxpc3QubGVuZ3RoKSByZXR1cm4gdm9pZCByZXBseShub3RGb3VuZCgnTm90aGluZyBmb3VuZC4nKSk7XG5cbiAgICAgIHJlcGx5KGxpc3QubWFwKChpdGVtKSA9PiBpdGVtLnRvSlNPTigpKSk7XG4gICAgfSxcblxuICAgIGNvbmZpZyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0ID0gKHsgc2VydmVyLCBtb2RlbCwgcHJlZml4ID0gJy8nLCBjb25maWcgfSkgPT4ge1xuICBzZXJ2ZXIucm91dGUoe1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgcGF0aDogcGF0aC5qb2luKHByZWZpeCwgbW9kZWwuX3Npbmd1bGFyLCAne2lkP30nKSxcblxuICAgIEBlcnJvclxuICAgIGFzeW5jIGhhbmRsZXIocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgIGNvbnN0IGluY2x1ZGUgPSBwYXJzZUluY2x1ZGUocmVxdWVzdCk7XG4gICAgICBjb25zdCB3aGVyZSA9IHBhcnNlV2hlcmUocmVxdWVzdCk7XG4gICAgICBjb25zdCB7IGlkIH0gPSByZXF1ZXN0LnBhcmFtcztcbiAgICAgIGlmIChpZCkgd2hlcmVbbW9kZWwucHJpbWFyeUtleUZpZWxkXSA9IGlkO1xuXG4gICAgICBpZiAoaW5jbHVkZSBpbnN0YW5jZW9mIEVycm9yKSByZXR1cm4gdm9pZCByZXBseShpbmNsdWRlKTtcblxuICAgICAgY29uc3QgaW5zdGFuY2UgPSBhd2FpdCBtb2RlbC5maW5kT25lKHsgd2hlcmUsIGluY2x1ZGUgfSk7XG5cbiAgICAgIGlmICghaW5zdGFuY2UpIHJldHVybiB2b2lkIHJlcGx5KG5vdEZvdW5kKGAke2lkfSBub3QgZm91bmQuYCkpO1xuXG4gICAgICByZXBseShpbnN0YW5jZS50b0pTT04oKSk7XG4gICAgfSxcbiAgICBjb25maWcsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNjb3BlID0gKHsgc2VydmVyLCBtb2RlbCwgcHJlZml4ID0gJy8nLCBjb25maWcgfSkgPT4ge1xuICBzZXJ2ZXIucm91dGUoe1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgcGF0aDogcGF0aC5qb2luKHByZWZpeCwgbW9kZWwuX3BsdXJhbCwgJ3tzY29wZX0nKSxcblxuICAgIEBlcnJvclxuICAgIGFzeW5jIGhhbmRsZXIocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgIGNvbnN0IGluY2x1ZGUgPSBwYXJzZUluY2x1ZGUocmVxdWVzdCk7XG4gICAgICBjb25zdCB3aGVyZSA9IHBhcnNlV2hlcmUocmVxdWVzdCk7XG4gICAgICBjb25zdCB7IGxpbWl0LCBvZmZzZXQgfSA9IHBhcnNlTGltaXRBbmRPZmZzZXQocmVxdWVzdCk7XG4gICAgICBjb25zdCBvcmRlciA9IHBhcnNlT3JkZXIocmVxdWVzdCk7XG5cbiAgICAgIGlmIChpbmNsdWRlIGluc3RhbmNlb2YgRXJyb3IpIHJldHVybiB2b2lkIHJlcGx5KGluY2x1ZGUpO1xuXG4gICAgICBjb25zdCBsaXN0ID0gYXdhaXQgbW9kZWwuc2NvcGUocmVxdWVzdC5wYXJhbXMuc2NvcGUpLmZpbmRBbGwoe1xuICAgICAgICBpbmNsdWRlLCB3aGVyZSwgbGltaXQsIG9mZnNldCwgb3JkZXIsXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFsaXN0Lmxlbmd0aCkgcmV0dXJuIHZvaWQgcmVwbHkobm90Rm91bmQoJ05vdGhpbmcgZm91bmQuJykpO1xuXG4gICAgICByZXBseShsaXN0Lm1hcCgoaXRlbSkgPT4gaXRlbS50b0pTT04oKSkpO1xuICAgIH0sXG4gICAgY29uZmlnLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGUgPSAoeyBzZXJ2ZXIsIG1vZGVsLCBwcmVmaXggPSAnLycsIGNvbmZpZyB9KSA9PiB7XG4gIHNlcnZlci5yb3V0ZSh7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgcGF0aDogcGF0aC5qb2luKHByZWZpeCwgbW9kZWwuX3Npbmd1bGFyKSxcblxuICAgIEBlcnJvclxuICAgIGFzeW5jIGhhbmRsZXIocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgIGNvbnN0IGluc3RhbmNlID0gYXdhaXQgbW9kZWwuY3JlYXRlKHJlcXVlc3QucGF5bG9hZCk7XG5cbiAgICAgIHJlcGx5KGluc3RhbmNlLnRvSlNPTigpKTtcbiAgICB9LFxuXG4gICAgY29uZmlnLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBkZXN0cm95ID0gKHsgc2VydmVyLCBtb2RlbCwgcHJlZml4ID0gJy8nLCBjb25maWcgfSkgPT4ge1xuICBzZXJ2ZXIucm91dGUoe1xuICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgcGF0aDogcGF0aC5qb2luKHByZWZpeCwgbW9kZWwuX3Npbmd1bGFyLCAne2lkP30nKSxcblxuICAgIEBlcnJvclxuICAgIGFzeW5jIGhhbmRsZXIocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgIGNvbnN0IHdoZXJlID0gcGFyc2VXaGVyZShyZXF1ZXN0KTtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcXVlc3QucGFyYW1zO1xuICAgICAgaWYgKGlkKSB3aGVyZVttb2RlbC5wcmltYXJ5S2V5RmllbGRdID0gaWQ7XG5cbiAgICAgIGNvbnN0IGxpc3QgPSBhd2FpdCBtb2RlbC5maW5kQWxsKHsgd2hlcmUgfSk7XG5cbiAgICAgIGlmICghbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHZvaWQgcmVwbHkoaWRcbiAgICAgICAgICA/IG5vdEZvdW5kKGAke2lkfSBub3QgZm91bmQuYClcbiAgICAgICAgICA6IG5vdEZvdW5kKCdOb3RoaW5nIGZvdW5kLicpXG4gICAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwobGlzdC5tYXAoaW5zdGFuY2UgPT4gaW5zdGFuY2UuZGVzdHJveSgpKSk7XG5cbiAgICAgIGNvbnN0IGxpc3RBc0pTT04gPSBsaXN0Lm1hcCgoaXRlbSkgPT4gaXRlbS50b0pTT04oKSk7XG4gICAgICByZXBseShsaXN0QXNKU09OLmxlbmd0aCA9PT0gMSA/IGxpc3RBc0pTT05bMF0gOiBsaXN0QXNKU09OKTtcbiAgICB9LFxuXG4gICAgY29uZmlnLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBkZXN0cm95QWxsID0gKHsgc2VydmVyLCBtb2RlbCwgcHJlZml4ID0gJy8nLCBjb25maWcgfSkgPT4ge1xuICBzZXJ2ZXIucm91dGUoe1xuICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgcGF0aDogcGF0aC5qb2luKHByZWZpeCwgbW9kZWwuX3BsdXJhbCksXG5cbiAgICBAZXJyb3JcbiAgICBhc3luYyBoYW5kbGVyKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICBjb25zdCB3aGVyZSA9IHBhcnNlV2hlcmUocmVxdWVzdCk7XG4gICAgICBjb25zdCB7IGlkIH0gPSByZXF1ZXN0LnBhcmFtcztcblxuICAgICAgY29uc3QgbGlzdCA9IGF3YWl0IG1vZGVsLmZpbmRBbGwoeyB3aGVyZSB9KTtcblxuICAgICAgaWYgKCFsaXN0Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdm9pZCByZXBseShpZFxuICAgICAgICAgID8gbm90Rm91bmQoYCR7aWR9IG5vdCBmb3VuZC5gKVxuICAgICAgICAgIDogbm90Rm91bmQoJ05vdGhpbmcgZm91bmQuJylcbiAgICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChsaXN0Lm1hcChpbnN0YW5jZSA9PiBpbnN0YW5jZS5kZXN0cm95KCkpKTtcblxuICAgICAgY29uc3QgbGlzdEFzSlNPTiA9IGxpc3QubWFwKChpdGVtKSA9PiBpdGVtLnRvSlNPTigpKTtcbiAgICAgIHJlcGx5KGxpc3RBc0pTT04ubGVuZ3RoID09PSAxID8gbGlzdEFzSlNPTlswXSA6IGxpc3RBc0pTT04pO1xuICAgIH0sXG5cbiAgICBjb25maWcsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGRlc3Ryb3lTY29wZSA9ICh7IHNlcnZlciwgbW9kZWwsIHByZWZpeCA9ICcvJywgY29uZmlnIH0pID0+IHtcbiAgc2VydmVyLnJvdXRlKHtcbiAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgIHBhdGg6IHBhdGguam9pbihwcmVmaXgsIG1vZGVsLl9wbHVyYWwsICd7c2NvcGV9JyksXG5cbiAgICBAZXJyb3JcbiAgICBhc3luYyBoYW5kbGVyKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICBjb25zdCBpbmNsdWRlID0gcGFyc2VJbmNsdWRlKHJlcXVlc3QpO1xuICAgICAgY29uc3Qgd2hlcmUgPSBwYXJzZVdoZXJlKHJlcXVlc3QpO1xuXG4gICAgICBpZiAoaW5jbHVkZSBpbnN0YW5jZW9mIEVycm9yKSByZXR1cm4gdm9pZCByZXBseShpbmNsdWRlKTtcblxuICAgICAgY29uc3QgbGlzdCA9IGF3YWl0IG1vZGVsLnNjb3BlKHJlcXVlc3QucGFyYW1zLnNjb3BlKS5maW5kQWxsKHsgaW5jbHVkZSwgd2hlcmUgfSk7XG5cbiAgICAgIGlmICghbGlzdC5sZW5ndGgpIHJldHVybiB2b2lkIHJlcGx5KG5vdEZvdW5kKCdOb3RoaW5nIGZvdW5kLicpKTtcblxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwobGlzdC5tYXAoaW5zdGFuY2UgPT4gaW5zdGFuY2UuZGVzdHJveSgpKSk7XG5cbiAgICAgIGNvbnN0IGxpc3RBc0pTT04gPSBsaXN0Lm1hcCgoaXRlbSkgPT4gaXRlbS50b0pTT04oKSk7XG4gICAgICByZXBseShsaXN0QXNKU09OLmxlbmd0aCA9PT0gMSA/IGxpc3RBc0pTT05bMF0gOiBsaXN0QXNKU09OKTtcbiAgICB9LFxuICAgIGNvbmZpZyxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgdXBkYXRlID0gKHsgc2VydmVyLCBtb2RlbCwgcHJlZml4ID0gJy8nLCBjb25maWcgfSkgPT4ge1xuICBzZXJ2ZXIucm91dGUoe1xuICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgcGF0aDogcGF0aC5qb2luKHByZWZpeCwgbW9kZWwuX3Npbmd1bGFyLCAne2lkfScpLFxuXG4gICAgQGVycm9yXG4gICAgYXN5bmMgaGFuZGxlcihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxdWVzdC5wYXJhbXM7XG4gICAgICBjb25zdCBpbnN0YW5jZSA9IGF3YWl0IG1vZGVsLmZpbmRCeUlkKGlkKTtcblxuICAgICAgaWYgKCFpbnN0YW5jZSkgcmV0dXJuIHZvaWQgcmVwbHkobm90Rm91bmQoYCR7aWR9IG5vdCBmb3VuZC5gKSk7XG5cbiAgICAgIGF3YWl0IGluc3RhbmNlLnVwZGF0ZShyZXF1ZXN0LnBheWxvYWQpO1xuXG4gICAgICByZXBseShpbnN0YW5jZS50b0pTT04oKSk7XG4gICAgfSxcblxuICAgIGNvbmZpZyxcbiAgfSk7XG59O1xuXG5jb25zdCBtZXRob2RzID0ge1xuICBsaXN0LCBnZXQsIHNjb3BlLCBjcmVhdGUsIGRlc3Ryb3ksIGRlc3Ryb3lBbGwsIGRlc3Ryb3lTY29wZSwgdXBkYXRlLFxufTtcbiJdfQ==