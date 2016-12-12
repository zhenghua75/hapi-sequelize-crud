'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
  var _desc, _value, _obj;

  prefix = options.prefix;
  defaultConfig = options.defaultConfig;

  server.route((_obj = {
    method: 'GET',
    path: `${ prefix }/associate/${ names.a.singular }/{aid}/${ names.b.singular }/{bid}`,

    handler(request, reply) {
      return _asyncToGenerator(function* () {
        const instanceb = yield b.findOne({
          where: {
            [b.primaryKeyField]: request.params.bid
          }
        });

        const instancea = yield a.findOne({
          where: {
            [a.primaryKeyField]: request.params.aid
          }
        });

        const fn = (0, _utils.getMethod)(instancea, names.b, false, 'add') || (0, _utils.getMethod)(instancea, names.b, false, 'set');
        yield fn(instanceb);

        reply([instancea, instanceb]);
      })();
    },

    config: defaultConfig
  }, (_applyDecoratedDescriptor(_obj, 'handler', [_error2.default], Object.getOwnPropertyDescriptor(_obj, 'handler'), _obj)), _obj));
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hc3NvY2lhdGlvbnMvYXNzb2NpYXRlLmpzIl0sIm5hbWVzIjpbInByZWZpeCIsImRlZmF1bHRDb25maWciLCJzZXJ2ZXIiLCJhIiwiYiIsIm5hbWVzIiwib3B0aW9ucyIsInJvdXRlIiwibWV0aG9kIiwicGF0aCIsInNpbmd1bGFyIiwiaGFuZGxlciIsInJlcXVlc3QiLCJyZXBseSIsImluc3RhbmNlYiIsImZpbmRPbmUiLCJ3aGVyZSIsInByaW1hcnlLZXlGaWVsZCIsInBhcmFtcyIsImJpZCIsImluc3RhbmNlYSIsImFpZCIsImZuIiwiY29uZmlnIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLE1BQUo7QUFDQSxJQUFJQyxhQUFKOztrQkFFZSxDQUFDQyxNQUFELEVBQVNDLENBQVQsRUFBWUMsQ0FBWixFQUFlQyxLQUFmLEVBQXNCQyxPQUF0QixLQUFrQztBQUFBOztBQUMvQ04sV0FBU00sUUFBUU4sTUFBakI7QUFDQUMsa0JBQWdCSyxRQUFRTCxhQUF4Qjs7QUFFQUMsU0FBT0ssS0FBUCxTQUFhO0FBQ1hDLFlBQVEsS0FERztBQUVYQyxVQUFPLElBQUVULE1BQU8sZ0JBQWFLLE1BQU1GLENBQU4sQ0FBUU8sUUFBUyxZQUFTTCxNQUFNRCxDQUFOLENBQVFNLFFBQVMsU0FGN0Q7O0FBS0xDLFdBQU4sQ0FBY0MsT0FBZCxFQUF1QkMsS0FBdkIsRUFBOEI7QUFBQTtBQUM1QixjQUFNQyxZQUFZLE1BQU1WLEVBQUVXLE9BQUYsQ0FBVTtBQUNoQ0MsaUJBQU87QUFDTCxhQUFDWixFQUFFYSxlQUFILEdBQXFCTCxRQUFRTSxNQUFSLENBQWVDO0FBRC9CO0FBRHlCLFNBQVYsQ0FBeEI7O0FBTUEsY0FBTUMsWUFBWSxNQUFNakIsRUFBRVksT0FBRixDQUFVO0FBQ2hDQyxpQkFBTztBQUNMLGFBQUNiLEVBQUVjLGVBQUgsR0FBcUJMLFFBQVFNLE1BQVIsQ0FBZUc7QUFEL0I7QUFEeUIsU0FBVixDQUF4Qjs7QUFNQSxjQUFNQyxLQUFLLHNCQUFVRixTQUFWLEVBQXFCZixNQUFNRCxDQUEzQixFQUE4QixLQUE5QixFQUFxQyxLQUFyQyxLQUNBLHNCQUFVZ0IsU0FBVixFQUFxQmYsTUFBTUQsQ0FBM0IsRUFBOEIsS0FBOUIsRUFBcUMsS0FBckMsQ0FEWDtBQUVBLGNBQU1rQixHQUFHUixTQUFILENBQU47O0FBRUFELGNBQU0sQ0FBQ08sU0FBRCxFQUFZTixTQUFaLENBQU47QUFqQjRCO0FBa0I3QixLQXZCVTs7QUF5QlhTLFlBQVF0QjtBQXpCRyxHQUFiO0FBMkJELEMiLCJmaWxlIjoiYXNzb2NpYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGVycm9yIGZyb20gJy4uL2Vycm9yJztcbmltcG9ydCB7IGdldE1ldGhvZCB9IGZyb20gJy4uL3V0aWxzJztcblxubGV0IHByZWZpeDtcbmxldCBkZWZhdWx0Q29uZmlnO1xuXG5leHBvcnQgZGVmYXVsdCAoc2VydmVyLCBhLCBiLCBuYW1lcywgb3B0aW9ucykgPT4ge1xuICBwcmVmaXggPSBvcHRpb25zLnByZWZpeDtcbiAgZGVmYXVsdENvbmZpZyA9IG9wdGlvbnMuZGVmYXVsdENvbmZpZztcblxuICBzZXJ2ZXIucm91dGUoe1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgcGF0aDogYCR7cHJlZml4fS9hc3NvY2lhdGUvJHtuYW1lcy5hLnNpbmd1bGFyfS97YWlkfS8ke25hbWVzLmIuc2luZ3VsYXJ9L3tiaWR9YCxcblxuICAgIEBlcnJvclxuICAgIGFzeW5jIGhhbmRsZXIocmVxdWVzdCwgcmVwbHkpIHtcbiAgICAgIGNvbnN0IGluc3RhbmNlYiA9IGF3YWl0IGIuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgW2IucHJpbWFyeUtleUZpZWxkXTogcmVxdWVzdC5wYXJhbXMuYmlkLFxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGluc3RhbmNlYSA9IGF3YWl0IGEuZmluZE9uZSh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgW2EucHJpbWFyeUtleUZpZWxkXTogcmVxdWVzdC5wYXJhbXMuYWlkLFxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGZuID0gZ2V0TWV0aG9kKGluc3RhbmNlYSwgbmFtZXMuYiwgZmFsc2UsICdhZGQnKSB8fFxuICAgICAgICAgICAgICAgICBnZXRNZXRob2QoaW5zdGFuY2VhLCBuYW1lcy5iLCBmYWxzZSwgJ3NldCcpO1xuICAgICAgYXdhaXQgZm4oaW5zdGFuY2ViKTtcblxuICAgICAgcmVwbHkoW2luc3RhbmNlYSwgaW5zdGFuY2ViXSk7XG4gICAgfSxcblxuICAgIGNvbmZpZzogZGVmYXVsdENvbmZpZyxcbiAgfSk7XG59O1xuIl19