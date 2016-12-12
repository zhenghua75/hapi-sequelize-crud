'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.destroyScope = exports.destroy = exports.scopeScope = exports.scope = exports.list = exports.get = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _error = require('../error');

var _error2 = _interopRequireDefault(_error);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('../utils');

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

let prefix;
let defaultConfig;

exports.default = (server, a, b, names, options) => {
  prefix = options.prefix;
  defaultConfig = options.defaultConfig;

  get(server, a, b, names);
  list(server, a, b, names);
  scope(server, a, b, names);
  scopeScope(server, a, b, names);
  destroy(server, a, b, names);
  destroyScope(server, a, b, names);
  update(server, a, b, names);
};

const get = exports.get = (server, a, b, names) => {
  var _desc, _value, _obj;

  server.route((_obj = {
    method: 'GET',
    path: `${ prefix }/${ names.a.singular }/{aid}/${ names.b.singular }/{bid}`,

    handler(request, reply) {
      return _asyncToGenerator(function* () {
        const include = (0, _utils.parseInclude)(request);

        const base = yield a.findOne({
          where: {
            [a.primaryKeyField]: request.params.aid
          }
        });

        const method = (0, _utils.getMethod)(base, names.b);

        const list = yield method({ where: {
            [b.primaryKeyField]: request.params.bid
          }, include });

        if (Array.isArray(list)) {
          reply(list[0]);
        } else {
          reply(list);
        }
      })();
    },

    config: defaultConfig
  }, (_applyDecoratedDescriptor(_obj, 'handler', [_error2.default], Object.getOwnPropertyDescriptor(_obj, 'handler'), _obj)), _obj));
};

const list = exports.list = (server, a, b, names) => {
  var _desc2, _value2, _obj2;

  server.route((_obj2 = {
    method: 'GET',
    path: `${ prefix }/${ names.a.singular }/{aid}/${ names.b.plural }`,

    handler(request, reply) {
      return _asyncToGenerator(function* () {
        const include = (0, _utils.parseInclude)(request);
        const where = (0, _utils.parseWhere)(request);

        const base = yield a.findOne({
          where: {
            [a.primaryKeyField]: request.params.aid
          }
        });

        const method = (0, _utils.getMethod)(base, names.b);
        const list = yield method({ where, include });

        reply(list);
      })();
    },

    config: defaultConfig
  }, (_applyDecoratedDescriptor(_obj2, 'handler', [_error2.default], Object.getOwnPropertyDescriptor(_obj2, 'handler'), _obj2)), _obj2));
};

const scope = exports.scope = (server, a, b, names) => {
  var _desc3, _value3, _obj3;

  const scopes = Object.keys(b.options.scopes);

  server.route((_obj3 = {
    method: 'GET',
    path: `${ prefix }/${ names.a.singular }/{aid}/${ names.b.plural }/{scope}`,

    handler(request, reply) {
      return _asyncToGenerator(function* () {
        const include = (0, _utils.parseInclude)(request);
        const where = (0, _utils.parseWhere)(request);

        const base = yield a.findOne({
          where: {
            [a.primaryKeyField]: request.params.aid
          }
        });

        const method = (0, _utils.getMethod)(base, names.b);
        const list = yield method({
          scope: request.params.scope,
          where,
          include
        });

        reply(list);
      })();
    },

    config: _lodash2.default.defaultsDeep({
      validate: {
        params: _joi2.default.object().keys({
          scope: _joi2.default.string().valid(...scopes),
          aid: _joi2.default.number().integer().required()
        })
      }
    }, defaultConfig)
  }, (_applyDecoratedDescriptor(_obj3, 'handler', [_error2.default], Object.getOwnPropertyDescriptor(_obj3, 'handler'), _obj3)), _obj3));
};

const scopeScope = exports.scopeScope = (server, a, b, names) => {
  var _desc4, _value4, _obj4;

  const scopes = {
    a: Object.keys(a.options.scopes),
    b: Object.keys(b.options.scopes)
  };

  server.route((_obj4 = {
    method: 'GET',
    path: `${ prefix }/${ names.a.plural }/{scopea}/${ names.b.plural }/{scopeb}`,

    handler(request, reply) {
      return _asyncToGenerator(function* () {
        const include = (0, _utils.parseInclude)(request);
        const where = (0, _utils.parseWhere)(request);

        const list = yield b.scope(request.params.scopeb).findAll({
          where,
          include: include.concat({
            model: a.scope(request.params.scopea)
          })
        });

        reply(list);
      })();
    },

    config: _lodash2.default.defaultsDeep({
      validate: {
        params: _joi2.default.object().keys({
          scopea: _joi2.default.string().valid(...scopes.a),
          scopeb: _joi2.default.string().valid(...scopes.b)
        })
      }
    }, defaultConfig)
  }, (_applyDecoratedDescriptor(_obj4, 'handler', [_error2.default], Object.getOwnPropertyDescriptor(_obj4, 'handler'), _obj4)), _obj4));
};

function _ref(item) {
  return item.destroy();
}

const destroy = exports.destroy = (server, a, b, names) => {
  var _desc5, _value5, _obj5;

  server.route((_obj5 = {
    method: 'DELETE',
    path: `${ prefix }/${ names.a.singular }/{aid}/${ names.b.plural }`,

    handler(request, reply) {
      return _asyncToGenerator(function* () {
        const include = (0, _utils.parseInclude)(request);
        const where = (0, _utils.parseWhere)(request);

        const base = yield a.findOne({
          where: {
            [a.primaryKeyField]: request.params.aid
          }
        });

        const method = (0, _utils.getMethod)(base, names.b, true, 'get');
        const list = yield method({ where, include });
        yield Promise.all(list.map(_ref));

        reply(list);
      })();
    }
  }, (_applyDecoratedDescriptor(_obj5, 'handler', [_error2.default], Object.getOwnPropertyDescriptor(_obj5, 'handler'), _obj5)), _obj5));
};

function _ref2(instance) {
  return instance.destroy();
}

const destroyScope = exports.destroyScope = (server, a, b, names) => {
  var _desc6, _value6, _obj6;

  const scopes = Object.keys(b.options.scopes);

  server.route((_obj6 = {
    method: 'DELETE',
    path: `${ prefix }/${ names.a.singular }/{aid}/${ names.b.plural }/{scope}`,

    handler(request, reply) {
      return _asyncToGenerator(function* () {
        const include = (0, _utils.parseInclude)(request);
        const where = (0, _utils.parseWhere)(request);

        const base = yield a.findOne({
          where: {
            [a.primarykeyField]: request.params.aid
          }
        });

        const method = (0, _utils.getMethod)(base, names.b, true, 'get');

        const list = yield method({
          scope: request.params.scope,
          where,
          include
        });

        yield Promise.all(list.map(_ref2));

        reply(list);
      })();
    },

    config: _lodash2.default.defaultsDeep({
      validate: {
        params: _joi2.default.object().keys({
          scope: _joi2.default.string().valid(...scopes),
          aid: _joi2.default.number().integer().required()
        })
      }
    }, defaultConfig)
  }, (_applyDecoratedDescriptor(_obj6, 'handler', [_error2.default], Object.getOwnPropertyDescriptor(_obj6, 'handler'), _obj6)), _obj6));
};

const update = exports.update = (server, a, b, names) => {
  var _desc7, _value7, _obj7;

  server.route((_obj7 = {
    method: 'PUT',
    path: `${ prefix }/${ names.a.singular }/{aid}/${ names.b.plural }`,

    handler(request, reply) {
      function _ref3(instance) {
        return instance.update(request.payload);
      }

      return _asyncToGenerator(function* () {
        const include = (0, _utils.parseInclude)(request);
        const where = (0, _utils.parseWhere)(request);

        const base = yield a.findOne({
          where: {
            [a.primaryKeyField]: request.params.aid
          }
        });

        const method = (0, _utils.getMethod)(base, names.b);
        const list = yield method({ where, include });

        yield Promise.all(list.map(_ref3));

        reply(list);
      })();
    },

    config: defaultConfig
  }, (_applyDecoratedDescriptor(_obj7, 'handler', [_error2.default], Object.getOwnPropertyDescriptor(_obj7, 'handler'), _obj7)), _obj7));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hc3NvY2lhdGlvbnMvb25lLXRvLW1hbnkuanMiXSwibmFtZXMiOlsicHJlZml4IiwiZGVmYXVsdENvbmZpZyIsInNlcnZlciIsImEiLCJiIiwibmFtZXMiLCJvcHRpb25zIiwiZ2V0IiwibGlzdCIsInNjb3BlIiwic2NvcGVTY29wZSIsImRlc3Ryb3kiLCJkZXN0cm95U2NvcGUiLCJ1cGRhdGUiLCJyb3V0ZSIsIm1ldGhvZCIsInBhdGgiLCJzaW5ndWxhciIsImhhbmRsZXIiLCJyZXF1ZXN0IiwicmVwbHkiLCJpbmNsdWRlIiwiYmFzZSIsImZpbmRPbmUiLCJ3aGVyZSIsInByaW1hcnlLZXlGaWVsZCIsInBhcmFtcyIsImFpZCIsImJpZCIsIkFycmF5IiwiaXNBcnJheSIsImNvbmZpZyIsInBsdXJhbCIsInNjb3BlcyIsIk9iamVjdCIsImtleXMiLCJkZWZhdWx0c0RlZXAiLCJ2YWxpZGF0ZSIsIm9iamVjdCIsInN0cmluZyIsInZhbGlkIiwibnVtYmVyIiwiaW50ZWdlciIsInJlcXVpcmVkIiwic2NvcGViIiwiZmluZEFsbCIsImNvbmNhdCIsIm1vZGVsIiwic2NvcGVhIiwiaXRlbSIsIlByb21pc2UiLCJhbGwiLCJtYXAiLCJpbnN0YW5jZSIsInByaW1hcnlrZXlGaWVsZCIsInBheWxvYWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxNQUFKO0FBQ0EsSUFBSUMsYUFBSjs7a0JBRWUsQ0FBQ0MsTUFBRCxFQUFTQyxDQUFULEVBQVlDLENBQVosRUFBZUMsS0FBZixFQUFzQkMsT0FBdEIsS0FBa0M7QUFDL0NOLFdBQVNNLFFBQVFOLE1BQWpCO0FBQ0FDLGtCQUFnQkssUUFBUUwsYUFBeEI7O0FBRUFNLE1BQUlMLE1BQUosRUFBWUMsQ0FBWixFQUFlQyxDQUFmLEVBQWtCQyxLQUFsQjtBQUNBRyxPQUFLTixNQUFM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QURBO0FBRFcsS0FBZixFQU9MMUMsYUFQSztBQTVCRyxHQUFiO0FBcUNELENBeENNOztBQTBDQSxNQUFNWSwwQkFBUyxDQUFDWCxNQUFELEVBQVNDLENBQVQsRUFBWUMsQ0FBWixFQUFlQyxLQUFmLEtBQXlCO0FBQUE7O0FBQzdDSCxTQUFPWSxLQUFQLFVBQWE7QUFDWEMsWUFBUSxLQURHO0FBRVhDLFVBQU8sSUFBRWhCLE1BQU8sTUFBR0ssTUFBTUYsQ0FBTixDQUFRYyxRQUFTLFlBQVNaLE1BQU1ELENBQU4sQ0FBUTRCLE1BQU8sR0FGakQ7O0FBS0xkLFdBQU4sQ0FBY0MsT0FBZCxFQUF1QkMsS0FBdkIsRUFBOEI7QUFhRDtBQUFBLGVBQVlpQyxTQUFTeEMsTUFBVCxDQUFnQk0sUUFBUW9DLE9BQXhCLENBQVo7QUFBQTs7QUFiQztBQUM1QixjQUFNbEMsVUFBVSx5QkFBYUYsT0FBYixDQUFoQjtBQUNBLGNBQU1LLFFBQVEsdUJBQVdMLE9BQVgsQ0FBZDs7QUFFQSxjQUFNRyxPQUFPLE1BQU1uQixFQUFFb0IsT0FBRixDQUFVO0FBQzNCQyxpQkFBTztBQUNMLGFBQUNyQixFQUFFc0IsZUFBSCxHQUFxQk4sUUFBUU8sTUFBUixDQUFlQztBQUQvQjtBQURvQixTQUFWLENBQW5COztBQU1BLGNBQU1aLFNBQVMsc0JBQVVPLElBQVYsRUFBZ0JqQixNQUFNRCxDQUF0QixDQUFmO0FBQ0EsY0FBTUksT0FBTyxNQUFNTyxPQUFPLEVBQUVTLEtBQUYsRUFBU0gsT0FBVCxFQUFQLENBQW5COztBQUVBLGNBQU02QixRQUFRQyxHQUFSLENBQVkzQyxLQUFLNEMsR0FBTCxPQUFaLENBQU47O0FBRUFoQyxjQUFNWixJQUFOO0FBZjRCO0FBZ0I3QixLQXJCVTs7QUF1Qlh1QixZQUFROUI7QUF2QkcsR0FBYjtBQXlCRCxDQTFCTSIsImZpbGUiOiJvbmUtdG8tbWFueS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBqb2kgZnJvbSAnam9pJztcbmltcG9ydCBlcnJvciBmcm9tICcuLi9lcnJvcic7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgcGFyc2VJbmNsdWRlLCBwYXJzZVdoZXJlLCBnZXRNZXRob2QgfSBmcm9tICcuLi91dGlscyc7XG5cbmxldCBwcmVmaXg7XG5sZXQgZGVmYXVsdENvbmZpZztcblxuZXhwb3J0IGRlZmF1bHQgKHNlcnZlciwgYSwgYiwgbmFtZXMsIG9wdGlvbnMpID0+IHtcbiAgcHJlZml4ID0gb3B0aW9ucy5wcmVmaXg7XG4gIGRlZmF1bHRDb25maWcgPSBvcHRpb25zLmRlZmF1bHRDb25maWc7XG5cbiAgZ2V0KHNlcnZlciwgYSwgYiwgbmFtZXMpO1xuICBsaXN0KHNlcnZlciwgYSwgYiwgbmFtZXMpO1xuICBzY29wZShzZXJ2ZXIsIGEsIGIsIG5hbWVzKTtcbiAgc2NvcGVTY29wZShzZXJ2ZXIsIGEsIGIsIG5hbWVzKTtcbiAgZGVzdHJveShzZXJ2ZXIsIGEsIGIsIG5hbWVzKTtcbiAgZGVzdHJveVNjb3BlKHNlcnZlciwgYSwgYiwgbmFtZXMpO1xuICB1cGRhdGUoc2VydmVyLCBhLCBiLCBuYW1lcyk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0ID0gKHNlcnZlciwgYSwgYiwgbmFtZXMpID0+IHtcbiAgc2VydmVyLnJvdXRlKHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIHBhdGg6IGAke3ByZWZpeH0vJHtuYW1lcy5hLnNpbmd1bGFyfS97YWlkfS8ke25hbWVzLmIuc2luZ3VsYXJ9L3tiaWR9YCxcblxuICAgIEBlcnJvclxuICAgIGFzeW5jIGhhbmRsZXIocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgIGNvbnN0IGluY2x1ZGUgPSBwYXJzZUluY2x1ZGUocmVxdWVzdCk7XG5cbiAgICAgIGNvbnN0IGJhc2UgPSBhd2FpdCBhLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIFthLnByaW1hcnlLZXlGaWVsZF06IHJlcXVlc3QucGFyYW1zLmFpZCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBtZXRob2QgPSBnZXRNZXRob2QoYmFzZSwgbmFtZXMuYik7XG5cbiAgICAgIGNvbnN0IGxpc3QgPSBhd2FpdCBtZXRob2QoeyB3aGVyZToge1xuICAgICAgICBbYi5wcmltYXJ5S2V5RmllbGRdOiByZXF1ZXN0LnBhcmFtcy5iaWQsXG4gICAgICB9LCBpbmNsdWRlIH0pO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShsaXN0KSkge1xuICAgICAgICByZXBseShsaXN0WzBdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcGx5KGxpc3QpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBjb25maWc6IGRlZmF1bHRDb25maWcsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGxpc3QgPSAoc2VydmVyLCBhLCBiLCBuYW1lcykgPT4ge1xuICBzZXJ2ZXIucm91dGUoe1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgcGF0aDogYCR7cHJlZml4fS8ke25hbWVzLmEuc2luZ3VsYXJ9L3thaWR9LyR7bmFtZXMuYi5wbHVyYWx9YCxcblxuICAgIEBlcnJvclxuICAgIGFzeW5jIGhhbmRsZXIocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgIGNvbnN0IGluY2x1ZGUgPSBwYXJzZUluY2x1ZGUocmVxdWVzdCk7XG4gICAgICBjb25zdCB3aGVyZSA9IHBhcnNlV2hlcmUocmVxdWVzdCk7XG5cbiAgICAgIGNvbnN0IGJhc2UgPSBhd2FpdCBhLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIFthLnByaW1hcnlLZXlGaWVsZF06IHJlcXVlc3QucGFyYW1zLmFpZCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBtZXRob2QgPSBnZXRNZXRob2QoYmFzZSwgbmFtZXMuYik7XG4gICAgICBjb25zdCBsaXN0ID0gYXdhaXQgbWV0aG9kKHsgd2hlcmUsIGluY2x1ZGUgfSk7XG5cbiAgICAgIHJlcGx5KGxpc3QpO1xuICAgIH0sXG5cbiAgICBjb25maWc6IGRlZmF1bHRDb25maWcsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNjb3BlID0gKHNlcnZlciwgYSwgYiwgbmFtZXMpID0+IHtcbiAgY29uc3Qgc2NvcGVzID0gT2JqZWN0LmtleXMoYi5vcHRpb25zLnNjb3Blcyk7XG5cbiAgc2VydmVyLnJvdXRlKHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIHBhdGg6IGAke3ByZWZpeH0vJHtuYW1lcy5hLnNpbmd1bGFyfS97YWlkfS8ke25hbWVzLmIucGx1cmFsfS97c2NvcGV9YCxcblxuICAgIEBlcnJvclxuICAgIGFzeW5jIGhhbmRsZXIocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgIGNvbnN0IGluY2x1ZGUgPSBwYXJzZUluY2x1ZGUocmVxdWVzdCk7XG4gICAgICBjb25zdCB3aGVyZSA9IHBhcnNlV2hlcmUocmVxdWVzdCk7XG5cbiAgICAgIGNvbnN0IGJhc2UgPSBhd2FpdCBhLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIFthLnByaW1hcnlLZXlGaWVsZF06IHJlcXVlc3QucGFyYW1zLmFpZCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBtZXRob2QgPSBnZXRNZXRob2QoYmFzZSwgbmFtZXMuYik7XG4gICAgICBjb25zdCBsaXN0ID0gYXdhaXQgbWV0aG9kKHtcbiAgICAgICAgc2NvcGU6IHJlcXVlc3QucGFyYW1zLnNjb3BlLFxuICAgICAgICB3aGVyZSxcbiAgICAgICAgaW5jbHVkZSxcbiAgICAgIH0pO1xuXG4gICAgICByZXBseShsaXN0KTtcbiAgICB9LFxuXG4gICAgY29uZmlnOiBfLmRlZmF1bHRzRGVlcCh7XG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBwYXJhbXM6IGpvaS5vYmplY3QoKS5rZXlzKHtcbiAgICAgICAgICBzY29wZTogam9pLnN0cmluZygpLnZhbGlkKC4uLnNjb3BlcyksXG4gICAgICAgICAgYWlkOiBqb2kubnVtYmVyKCkuaW50ZWdlcigpLnJlcXVpcmVkKCksXG4gICAgICAgIH0pLFxuICAgICAgfSxcbiAgICB9LCBkZWZhdWx0Q29uZmlnKSxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2NvcGVTY29wZSA9IChzZXJ2ZXIsIGEsIGIsIG5hbWVzKSA9PiB7XG4gIGNvbnN0IHNjb3BlcyA9IHtcbiAgICBhOiBPYmplY3Qua2V5cyhhLm9wdGlvbnMuc2NvcGVzKSxcbiAgICBiOiBPYmplY3Qua2V5cyhiLm9wdGlvbnMuc2NvcGVzKSxcbiAgfTtcblxuICBzZXJ2ZXIucm91dGUoe1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgcGF0aDogYCR7cHJlZml4fS8ke25hbWVzLmEucGx1cmFsfS97c2NvcGVhfS8ke25hbWVzLmIucGx1cmFsfS97c2NvcGVifWAsXG5cbiAgICBAZXJyb3JcbiAgICBhc3luYyBoYW5kbGVyKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICBjb25zdCBpbmNsdWRlID0gcGFyc2VJbmNsdWRlKHJlcXVlc3QpO1xuICAgICAgY29uc3Qgd2hlcmUgPSBwYXJzZVdoZXJlKHJlcXVlc3QpO1xuXG4gICAgICBjb25zdCBsaXN0ID0gYXdhaXQgYi5zY29wZShyZXF1ZXN0LnBhcmFtcy5zY29wZWIpLmZpbmRBbGwoe1xuICAgICAgICB3aGVyZSxcbiAgICAgICAgaW5jbHVkZTogaW5jbHVkZS5jb25jYXQoe1xuICAgICAgICAgIG1vZGVsOiBhLnNjb3BlKHJlcXVlc3QucGFyYW1zLnNjb3BlYSksXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG5cbiAgICAgIHJlcGx5KGxpc3QpO1xuICAgIH0sXG5cbiAgICBjb25maWc6IF8uZGVmYXVsdHNEZWVwKHtcbiAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgIHBhcmFtczogam9pLm9iamVjdCgpLmtleXMoe1xuICAgICAgICAgIHNjb3BlYTogam9pLnN0cmluZygpLnZhbGlkKC4uLnNjb3Blcy5hKSxcbiAgICAgICAgICBzY29wZWI6IGpvaS5zdHJpbmcoKS52YWxpZCguLi5zY29wZXMuYiksXG4gICAgICAgIH0pLFxuICAgICAgfSxcbiAgICB9LCBkZWZhdWx0Q29uZmlnKSxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZGVzdHJveSA9IChzZXJ2ZXIsIGEsIGIsIG5hbWVzKSA9PiB7XG4gIHNlcnZlci5yb3V0ZSh7XG4gICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICBwYXRoOiBgJHtwcmVmaXh9LyR7bmFtZXMuYS5zaW5ndWxhcn0ve2FpZH0vJHtuYW1lcy5iLnBsdXJhbH1gLFxuXG4gICAgQGVycm9yXG4gICAgYXN5bmMgaGFuZGxlcihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgY29uc3QgaW5jbHVkZSA9IHBhcnNlSW5jbHVkZShyZXF1ZXN0KTtcbiAgICAgIGNvbnN0IHdoZXJlID0gcGFyc2VXaGVyZShyZXF1ZXN0KTtcblxuICAgICAgY29uc3QgYmFzZSA9IGF3YWl0IGEuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgW2EucHJpbWFyeUtleUZpZWxkXTogcmVxdWVzdC5wYXJhbXMuYWlkLFxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IG1ldGhvZCA9IGdldE1ldGhvZChiYXNlLCBuYW1lcy5iLCB0cnVlLCAnZ2V0Jyk7XG4gICAgICBjb25zdCBsaXN0ID0gYXdhaXQgbWV0aG9kKHsgd2hlcmUsIGluY2x1ZGUgfSk7XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChsaXN0Lm1hcChpdGVtID0+XG4gICAgICAgIGl0ZW0uZGVzdHJveSgpXG4gICAgICApKTtcblxuICAgICAgcmVwbHkobGlzdCk7XG4gICAgfSxcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgZGVzdHJveVNjb3BlID0gKHNlcnZlciwgYSwgYiwgbmFtZXMpID0+IHtcbiAgY29uc3Qgc2NvcGVzID0gT2JqZWN0LmtleXMoYi5vcHRpb25zLnNjb3Blcyk7XG5cbiAgc2VydmVyLnJvdXRlKHtcbiAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgIHBhdGg6IGAke3ByZWZpeH0vJHtuYW1lcy5hLnNpbmd1bGFyfS97YWlkfS8ke25hbWVzLmIucGx1cmFsfS97c2NvcGV9YCxcblxuICAgIEBlcnJvclxuICAgIGFzeW5jIGhhbmRsZXIocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgIGNvbnN0IGluY2x1ZGUgPSBwYXJzZUluY2x1ZGUocmVxdWVzdCk7XG4gICAgICBjb25zdCB3aGVyZSA9IHBhcnNlV2hlcmUocmVxdWVzdCk7XG5cbiAgICAgIGNvbnN0IGJhc2UgPSBhd2FpdCBhLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIFthLnByaW1hcnlrZXlGaWVsZF06IHJlcXVlc3QucGFyYW1zLmFpZCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBtZXRob2QgPSBnZXRNZXRob2QoYmFzZSwgbmFtZXMuYiwgdHJ1ZSwgJ2dldCcpO1xuXG4gICAgICBjb25zdCBsaXN0ID0gYXdhaXQgbWV0aG9kKHtcbiAgICAgICAgc2NvcGU6IHJlcXVlc3QucGFyYW1zLnNjb3BlLFxuICAgICAgICB3aGVyZSxcbiAgICAgICAgaW5jbHVkZSxcbiAgICAgIH0pO1xuXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChsaXN0Lm1hcChpbnN0YW5jZSA9PiBpbnN0YW5jZS5kZXN0cm95KCkpKTtcblxuICAgICAgcmVwbHkobGlzdCk7XG4gICAgfSxcblxuICAgIGNvbmZpZzogXy5kZWZhdWx0c0RlZXAoe1xuICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgcGFyYW1zOiBqb2kub2JqZWN0KCkua2V5cyh7XG4gICAgICAgICAgc2NvcGU6IGpvaS5zdHJpbmcoKS52YWxpZCguLi5zY29wZXMpLFxuICAgICAgICAgIGFpZDogam9pLm51bWJlcigpLmludGVnZXIoKS5yZXF1aXJlZCgpLFxuICAgICAgICB9KSxcbiAgICAgIH0sXG4gICAgfSwgZGVmYXVsdENvbmZpZyksXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZSA9IChzZXJ2ZXIsIGEsIGIsIG5hbWVzKSA9PiB7XG4gIHNlcnZlci5yb3V0ZSh7XG4gICAgbWV0aG9kOiAnUFVUJyxcbiAgICBwYXRoOiBgJHtwcmVmaXh9LyR7bmFtZXMuYS5zaW5ndWxhcn0ve2FpZH0vJHtuYW1lcy5iLnBsdXJhbH1gLFxuXG4gICAgQGVycm9yXG4gICAgYXN5bmMgaGFuZGxlcihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgY29uc3QgaW5jbHVkZSA9IHBhcnNlSW5jbHVkZShyZXF1ZXN0KTtcbiAgICAgIGNvbnN0IHdoZXJlID0gcGFyc2VXaGVyZShyZXF1ZXN0KTtcblxuICAgICAgY29uc3QgYmFzZSA9IGF3YWl0IGEuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgW2EucHJpbWFyeUtleUZpZWxkXTogcmVxdWVzdC5wYXJhbXMuYWlkLFxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IG1ldGhvZCA9IGdldE1ldGhvZChiYXNlLCBuYW1lcy5iKTtcbiAgICAgIGNvbnN0IGxpc3QgPSBhd2FpdCBtZXRob2QoeyB3aGVyZSwgaW5jbHVkZSB9KTtcblxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwobGlzdC5tYXAoaW5zdGFuY2UgPT4gaW5zdGFuY2UudXBkYXRlKHJlcXVlc3QucGF5bG9hZCkpKTtcblxuICAgICAgcmVwbHkobGlzdCk7XG4gICAgfSxcblxuICAgIGNvbmZpZzogZGVmYXVsdENvbmZpZyxcbiAgfSk7XG59O1xuIl19