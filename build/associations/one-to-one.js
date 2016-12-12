'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.destroy = exports.create = exports.get = undefined;

var _error = require('../error');

var _error2 = _interopRequireDefault(_error);

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
  create(server, a, b, names);
  destroy(server, a, b, names);
  update(server, a, b, names);
};

const get = exports.get = (server, a, b, names) => {
  var _desc, _value, _obj;

  server.route((_obj = {
    method: 'GET',
    path: `${ prefix }/${ names.a.singular }/{aid}/${ names.b.singular }`,

    handler(request, reply) {
      return _asyncToGenerator(function* () {
        const include = (0, _utils.parseInclude)(request);
        const where = (0, _utils.parseWhere)(request);

        const base = yield a.findOne({
          where: {
            [a.primaryKeyField]: request.params.aid
          }
        });
        const method = (0, _utils.getMethod)(base, names.b, false);

        const list = yield method({ where, include, limit: 1 });

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

const create = exports.create = (server, a, b, names) => {
  var _desc2, _value2, _obj2;

  server.route((_obj2 = {
    method: 'POST',
    path: `${ prefix }/${ names.a.singular }/{id}/${ names.b.singular }`,

    handler(request, reply) {
      return _asyncToGenerator(function* () {
        const base = yield a.findOne({
          where: {
            [a.primaryKeyField]: request.params.id
          }
        });

        const method = (0, _utils.getMethod)(base, names.b, false, 'create');
        const instance = yield method(request.payload);

        reply(instance);
      })();
    },

    config: defaultConfig
  }, (_applyDecoratedDescriptor(_obj2, 'handler', [_error2.default], Object.getOwnPropertyDescriptor(_obj2, 'handler'), _obj2)), _obj2));
};

const destroy = exports.destroy = (server, a, b, names) => {
  var _desc3, _value3, _obj3;

  server.route((_obj3 = {
    method: 'DELETE',
    path: `${ prefix }/${ names.a.singular }/{aid}/${ names.b.singular }/{bid}`,

    handler(request, reply) {
      return _asyncToGenerator(function* () {
        const include = (0, _utils.parseInclude)(request);
        const where = (0, _utils.parseWhere)(request);

        const base = yield a.findOne({
          where: {
            [a.primaryKeyField]: request.params.aid
          }
        });

        where[b.primaryKeyField] = request.params.bid;

        const method = (0, _utils.getMethod)(base, names.b, false, 'get');
        const instance = yield method({ where, include });
        yield instance.destroy();

        reply(instance);
      })();
    },

    config: defaultConfig
  }, (_applyDecoratedDescriptor(_obj3, 'handler', [_error2.default], Object.getOwnPropertyDescriptor(_obj3, 'handler'), _obj3)), _obj3));
};

const update = exports.update = (server, a, b, names) => {
  var _desc4, _value4, _obj4;

  server.route((_obj4 = {
    method: 'PUT',
    path: `${ prefix }/${ names.a.singular }/{aid}/${ names.b.singular }/{bid}`,

    handler(request, reply) {
      return _asyncToGenerator(function* () {
        const include = (0, _utils.parseInclude)(request);
        const where = (0, _utils.parseWhere)(request);

        const base = yield a.findOne({
          where: {
            id: request.params.aid
          }
        });

        where[b.primaryKeyField] = request.params.bid;

        const method = (0, _utils.getMethod)(base, names.b, false);

        const instance = yield method({ where, include });
        yield instance.update(request.payload);

        reply(instance);
      })();
    },

    config: defaultConfig
  }, (_applyDecoratedDescriptor(_obj4, 'handler', [_error2.default], Object.getOwnPropertyDescriptor(_obj4, 'handler'), _obj4)), _obj4));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hc3NvY2lhdGlvbnMvb25lLXRvLW9uZS5qcyJdLCJuYW1lcyI6WyJwcmVmaXgiLCJkZWZhdWx0Q29uZmlnIiwic2VydmVyIiwiYSIsImIiLCJuYW1lcyIsIm9wdGlvbnMiLCJnZXQiLCJjcmVhdGUiLCJkZXN0cm95IiwidXBkYXRlIiwicm91dGUiLCJtZXRob2QiLCJwYXRoIiwic2luZ3VsYXIiLCJoYW5kbGVyIiwicmVxdWVzdCIsInJlcGx5IiwiaW5jbHVkZSIsIndoZXJlIiwiYmFzZSIsImZpbmRPbmUiLCJwcmltYXJ5S2V5RmllbGQiLCJwYXJhbXMiLCJhaWQiLCJsaXN0IiwibGltaXQiLCJBcnJheSIsImlzQXJyYXkiLCJjb25maWciLCJpZCIsImluc3RhbmNlIiwicGF5bG9hZCIsImJpZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSUEsTUFBSjtBQUNBLElBQUlDLGFBQUo7O2tCQUVlLENBQUNDLE1BQUQsRUFBU0MsQ0FBVCxFQUFZQyxDQUFaLEVBQWVDLEtBQWYsRUFBc0JDLE9BQXRCLEtBQWtDO0FBQy9DTixXQUFTTSxRQUFRTixNQUFqQjtBQUNBQyxrQkFBZ0JLLFFBQVFMLGFBQXhCOztBQUVBTSxNQUFJTCxNQUFKLEVBQVlDLENBQVosRUFBZUMsQ0FBZixFQUFrQkMsS0FBbEI7QUFDQUcsU0FBT04sTUFBUCxFQUFlQyxDQUFmLEVBQWtCQyxDQUFsQixFQUFxQkMsS0FBckI7QUFDQUksVUFBUVAsTUFBUixFQUFnQkMsQ0FBaEIsRUFBbUJDLENBQW5CLEVBQXNCQyxLQUF0QjtBQUNBSyxTQUFPUixNQUFQLEVBQWVDLENBQWYsRUFBa0JDLENBQWxCLEVBQXFCQyxLQUFyQjtBQUNELEM7O0FBRU0sTUFBTUUsb0JBQU0sQ0FBQ0wsTUFBRCxFQUFTQyxDQUFULEVBQVlDLENBQVosRUFBZUMsS0FBZixLQUF5QjtBQUFBOztBQUMxQ0gsU0FB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IiwiZmlsZSI6Im9uZS10by1vbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXJyb3IgZnJvbSAnLi4vZXJyb3InO1xuaW1wb3J0IHsgcGFyc2VJbmNsdWRlLCBwYXJzZVdoZXJlLCBnZXRNZXRob2QgfSBmcm9tICcuLi91dGlscyc7XG5cbmxldCBwcmVmaXg7XG5sZXQgZGVmYXVsdENvbmZpZztcblxuZXhwb3J0IGRlZmF1bHQgKHNlcnZlciwgYSwgYiwgbmFtZXMsIG9wdGlvbnMpID0+IHtcbiAgcHJlZml4ID0gb3B0aW9ucy5wcmVmaXg7XG4gIGRlZmF1bHRDb25maWcgPSBvcHRpb25zLmRlZmF1bHRDb25maWc7XG5cbiAgZ2V0KHNlcnZlciwgYSwgYiwgbmFtZXMpO1xuICBjcmVhdGUoc2VydmVyLCBhLCBiLCBuYW1lcyk7XG4gIGRlc3Ryb3koc2VydmVyLCBhLCBiLCBuYW1lcyk7XG4gIHVwZGF0ZShzZXJ2ZXIsIGEsIGIsIG5hbWVzKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXQgPSAoc2VydmVyLCBhLCBiLCBuYW1lcykgPT4ge1xuICBzZXJ2ZXIucm91dGUoe1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgcGF0aDogYCR7cHJlZml4fS8ke25hbWVzLmEuc2luZ3VsYXJ9L3thaWR9LyR7bmFtZXMuYi5zaW5ndWxhcn1gLFxuXG4gICAgQGVycm9yXG4gICAgYXN5bmMgaGFuZGxlcihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgY29uc3QgaW5jbHVkZSA9IHBhcnNlSW5jbHVkZShyZXF1ZXN0KTtcbiAgICAgIGNvbnN0IHdoZXJlID0gcGFyc2VXaGVyZShyZXF1ZXN0KTtcblxuICAgICAgY29uc3QgYmFzZSA9IGF3YWl0IGEuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgW2EucHJpbWFyeUtleUZpZWxkXTogcmVxdWVzdC5wYXJhbXMuYWlkLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBjb25zdCBtZXRob2QgPSBnZXRNZXRob2QoYmFzZSwgbmFtZXMuYiwgZmFsc2UpO1xuXG4gICAgICBjb25zdCBsaXN0ID0gYXdhaXQgbWV0aG9kKHsgd2hlcmUsIGluY2x1ZGUsIGxpbWl0OiAxIH0pO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShsaXN0KSkge1xuICAgICAgICByZXBseShsaXN0WzBdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcGx5KGxpc3QpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBjb25maWc6IGRlZmF1bHRDb25maWcsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZSA9IChzZXJ2ZXIsIGEsIGIsIG5hbWVzKSA9PiB7XG4gIHNlcnZlci5yb3V0ZSh7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgcGF0aDogYCR7cHJlZml4fS8ke25hbWVzLmEuc2luZ3VsYXJ9L3tpZH0vJHtuYW1lcy5iLnNpbmd1bGFyfWAsXG5cbiAgICBAZXJyb3JcbiAgICBhc3luYyBoYW5kbGVyKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICBjb25zdCBiYXNlID0gYXdhaXQgYS5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICBbYS5wcmltYXJ5S2V5RmllbGRdOiByZXF1ZXN0LnBhcmFtcy5pZCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBtZXRob2QgPSBnZXRNZXRob2QoYmFzZSwgbmFtZXMuYiwgZmFsc2UsICdjcmVhdGUnKTtcbiAgICAgIGNvbnN0IGluc3RhbmNlID0gYXdhaXQgbWV0aG9kKHJlcXVlc3QucGF5bG9hZCk7XG5cbiAgICAgIHJlcGx5KGluc3RhbmNlKTtcbiAgICB9LFxuXG4gICAgY29uZmlnOiBkZWZhdWx0Q29uZmlnLFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBkZXN0cm95ID0gKHNlcnZlciwgYSwgYiwgbmFtZXMpID0+IHtcbiAgc2VydmVyLnJvdXRlKHtcbiAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgIHBhdGg6IGAke3ByZWZpeH0vJHtuYW1lcy5hLnNpbmd1bGFyfS97YWlkfS8ke25hbWVzLmIuc2luZ3VsYXJ9L3tiaWR9YCxcblxuICAgIEBlcnJvclxuICAgIGFzeW5jIGhhbmRsZXIocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgIGNvbnN0IGluY2x1ZGUgPSBwYXJzZUluY2x1ZGUocmVxdWVzdCk7XG4gICAgICBjb25zdCB3aGVyZSA9IHBhcnNlV2hlcmUocmVxdWVzdCk7XG5cbiAgICAgIGNvbnN0IGJhc2UgPSBhd2FpdCBhLmZpbmRPbmUoe1xuICAgICAgICB3aGVyZToge1xuICAgICAgICAgIFthLnByaW1hcnlLZXlGaWVsZF06IHJlcXVlc3QucGFyYW1zLmFpZCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICB3aGVyZVtiLnByaW1hcnlLZXlGaWVsZF0gPSByZXF1ZXN0LnBhcmFtcy5iaWQ7XG5cbiAgICAgIGNvbnN0IG1ldGhvZCA9IGdldE1ldGhvZChiYXNlLCBuYW1lcy5iLCBmYWxzZSwgJ2dldCcpO1xuICAgICAgY29uc3QgaW5zdGFuY2UgPSBhd2FpdCBtZXRob2QoeyB3aGVyZSwgaW5jbHVkZSB9KTtcbiAgICAgIGF3YWl0IGluc3RhbmNlLmRlc3Ryb3koKTtcblxuICAgICAgcmVwbHkoaW5zdGFuY2UpO1xuICAgIH0sXG5cbiAgICBjb25maWc6IGRlZmF1bHRDb25maWcsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZSA9IChzZXJ2ZXIsIGEsIGIsIG5hbWVzKSA9PiB7XG4gIHNlcnZlci5yb3V0ZSh7XG4gICAgbWV0aG9kOiAnUFVUJyxcbiAgICBwYXRoOiBgJHtwcmVmaXh9LyR7bmFtZXMuYS5zaW5ndWxhcn0ve2FpZH0vJHtuYW1lcy5iLnNpbmd1bGFyfS97YmlkfWAsXG5cbiAgICBAZXJyb3JcbiAgICBhc3luYyBoYW5kbGVyKHJlcXVlc3QsIHJlcGx5KSB7XG4gICAgICBjb25zdCBpbmNsdWRlID0gcGFyc2VJbmNsdWRlKHJlcXVlc3QpO1xuICAgICAgY29uc3Qgd2hlcmUgPSBwYXJzZVdoZXJlKHJlcXVlc3QpO1xuXG4gICAgICBjb25zdCBiYXNlID0gYXdhaXQgYS5maW5kT25lKHtcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICBpZDogcmVxdWVzdC5wYXJhbXMuYWlkLFxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIHdoZXJlW2IucHJpbWFyeUtleUZpZWxkXSA9IHJlcXVlc3QucGFyYW1zLmJpZDtcblxuICAgICAgY29uc3QgbWV0aG9kID0gZ2V0TWV0aG9kKGJhc2UsIG5hbWVzLmIsIGZhbHNlKTtcblxuICAgICAgY29uc3QgaW5zdGFuY2UgPSBhd2FpdCBtZXRob2QoeyB3aGVyZSwgaW5jbHVkZSB9KTtcbiAgICAgIGF3YWl0IGluc3RhbmNlLnVwZGF0ZShyZXF1ZXN0LnBheWxvYWQpO1xuXG4gICAgICByZXBseShpbnN0YW5jZSk7XG4gICAgfSxcblxuICAgIGNvbmZpZzogZGVmYXVsdENvbmZpZyxcbiAgfSk7XG59O1xuIl19