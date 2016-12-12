'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

require('sinon-bluebird');

var _integrationSetup = require('../test/integration-setup.js');

var _integrationSetup2 = _interopRequireDefault(_integrationSetup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;
const STATUS_BAD_REQUEST = 400;

(0, _integrationSetup2.default)(_ava2.default);

function* _ref2(t) {
  const { server, instances } = t.context;
  const { player1 } = instances;
  const url = '/players/returnsOne';
  const method = 'GET';

  const { result, statusCode } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_OK);
  t.is(result.length, 1);
  t.truthy(result[0].id, player1.id);
}

(0, _ava2.default)('/players/returnsOne', (() => {
  var _ref = _asyncToGenerator(_ref2);

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})());

function* _ref4(t) {
  const { server } = t.context;
  const url = '/players/returnsNone';
  const method = 'GET';

  const { statusCode } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_NOT_FOUND);
}

(0, _ava2.default)('/players/returnsNone', (() => {
  var _ref3 = _asyncToGenerator(_ref4);

  return function (_x2) {
    return _ref3.apply(this, arguments);
  };
})());

function* _ref6(t) {
  const { server } = t.context;
  // this doesn't exist in our fixtures
  const url = '/players/invalid';
  const method = 'GET';

  const { statusCode } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_BAD_REQUEST);
}

(0, _ava2.default)('invalid scope /players/invalid', (() => {
  var _ref5 = _asyncToGenerator(_ref6);

  return function (_x3) {
    return _ref5.apply(this, arguments);
  };
})());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcnVkLXNjb3BlLmludGVncmF0aW9uLnRlc3QuanMiXSwibmFtZXMiOlsiU1RBVFVTX09LIiwiU1RBVFVTX05PVF9GT1VORCIsIlNUQVRVU19CQURfUkVRVUVTVCIsInQiLCJzZXJ2ZXIiLCJpbnN0YW5jZXMiLCJjb250ZXh0IiwicGxheWVyMSIsInVybCIsIm1ldGhvZCIsInJlc3VsdCIsInN0YXR1c0NvZGUiLCJpbmplY3QiLCJpcyIsImxlbmd0aCIsInRydXRoeSIsImlkIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUEsTUFBTUEsWUFBWSxHQUFsQjtBQUNBLE1BQU1DLG1CQUFtQixHQUF6QjtBQUNBLE1BQU1DLHFCQUFxQixHQUEzQjs7QUFFQTs7QUFFNEIsZ0JBQU9DLENBQVAsRUFBYTtBQUN2QyxRQUFNLEVBQUVDLE1BQUYsRUFBVUMsU0FBVixLQUF3QkYsRUFBRUcsT0FBaEM7QUFDQSxRQUFNLEVBQUVDLE9BQUYsS0FBY0YsU0FBcEI7QUFDQSxRQUFNRyxNQUFNLHFCQUFaO0FBQ0EsUUFBTUMsU0FBUyxLQUFmOztBQUVBLFFBQU0sRUFBRUMsTUFBRixFQUFVQyxVQUFWLEtBQXlCLE1BQU1QLE9BQU9RLE1BQVAsQ0FBYyxFQUFFSixHQUFGLEVBQU9DLE1BQVAsRUFBZCxDQUFyQztBQUNBTixJQUFFVSxFQUFGLENBQUtGLFVBQUwsRUFBaUJYLFNBQWpCO0FBQ0FHLElBQUVVLEVBQUYsQ0FBS0gsT0FBT0ksTUFBWixFQUFvQixDQUFwQjtBQUNBWCxJQUFFWSxNQUFGLENBQVNMLE9BQU8sQ0FBUCxFQUFVTSxFQUFuQixFQUF1QlQsUUFBUVMsRUFBL0I7QUFDRDs7QUFWRCxtQkFBSyxxQkFBTDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVk2QixnQkFBT2IsQ0FBUCxFQUFhO0FBQ3hDLFFBQU0sRUFBRUMsTUFBRixLQUFhRCxFQUFFRyxPQUFyQjtBQUNBLFFBQU1FLE1BQU0sc0JBQVo7QUFDQSxRQUFNQyxTQUFTLEtBQWY7O0FBRUEsUUFBTSxFQUFFRSxVQUFGLEtBQWlCLE1BQU1QLE9BQU9RLE1BQVAsQ0FBYyxFQUFFSixHQUFGLEVBQU9DLE1BQVAsRUFBZCxDQUE3QjtBQUNBTixJQUFFVSxFQUFGLENBQUtGLFVBQUwsRUFBaUJWLGdCQUFqQjtBQUNEOztBQVBELG1CQUFLLHNCQUFMO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBU3VDLGdCQUFPRSxDQUFQLEVBQWE7QUFDbEQsUUFBTSxFQUFFQyxNQUFGLEtBQWFELEVBQUVHLE9BQXJCO0FBQ0E7QUFDQSxRQUFNRSxNQUFNLGtCQUFaO0FBQ0EsUUFBTUMsU0FBUyxLQUFmOztBQUVBLFFBQU0sRUFBRUUsVUFBRixLQUFpQixNQUFNUCxPQUFPUSxNQUFQLENBQWMsRUFBRUosR0FBRixFQUFPQyxNQUFQLEVBQWQsQ0FBN0I7QUFDQU4sSUFBRVUsRUFBRixDQUFLRixVQUFMLEVBQWlCVCxrQkFBakI7QUFDRDs7QUFSRCxtQkFBSyxnQ0FBTDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6ImNydWQtc2NvcGUuaW50ZWdyYXRpb24udGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0ZXN0IGZyb20gJ2F2YSc7XG5pbXBvcnQgJ3Npbm9uLWJsdWViaXJkJztcbmltcG9ydCBzZXR1cCBmcm9tICcuLi90ZXN0L2ludGVncmF0aW9uLXNldHVwLmpzJztcblxuY29uc3QgU1RBVFVTX09LID0gMjAwO1xuY29uc3QgU1RBVFVTX05PVF9GT1VORCA9IDQwNDtcbmNvbnN0IFNUQVRVU19CQURfUkVRVUVTVCA9IDQwMDtcblxuc2V0dXAodGVzdCk7XG5cbnRlc3QoJy9wbGF5ZXJzL3JldHVybnNPbmUnLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHNlcnZlciwgaW5zdGFuY2VzIH0gPSB0LmNvbnRleHQ7XG4gIGNvbnN0IHsgcGxheWVyMSB9ID0gaW5zdGFuY2VzO1xuICBjb25zdCB1cmwgPSAnL3BsYXllcnMvcmV0dXJuc09uZSc7XG4gIGNvbnN0IG1ldGhvZCA9ICdHRVQnO1xuXG4gIGNvbnN0IHsgcmVzdWx0LCBzdGF0dXNDb2RlIH0gPSBhd2FpdCBzZXJ2ZXIuaW5qZWN0KHsgdXJsLCBtZXRob2QgfSk7XG4gIHQuaXMoc3RhdHVzQ29kZSwgU1RBVFVTX09LKTtcbiAgdC5pcyhyZXN1bHQubGVuZ3RoLCAxKTtcbiAgdC50cnV0aHkocmVzdWx0WzBdLmlkLCBwbGF5ZXIxLmlkKTtcbn0pO1xuXG50ZXN0KCcvcGxheWVycy9yZXR1cm5zTm9uZScsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc2VydmVyIH0gPSB0LmNvbnRleHQ7XG4gIGNvbnN0IHVybCA9ICcvcGxheWVycy9yZXR1cm5zTm9uZSc7XG4gIGNvbnN0IG1ldGhvZCA9ICdHRVQnO1xuXG4gIGNvbnN0IHsgc3RhdHVzQ29kZSB9ID0gYXdhaXQgc2VydmVyLmluamVjdCh7IHVybCwgbWV0aG9kIH0pO1xuICB0LmlzKHN0YXR1c0NvZGUsIFNUQVRVU19OT1RfRk9VTkQpO1xufSk7XG5cbnRlc3QoJ2ludmFsaWQgc2NvcGUgL3BsYXllcnMvaW52YWxpZCcsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc2VydmVyIH0gPSB0LmNvbnRleHQ7XG4gIC8vIHRoaXMgZG9lc24ndCBleGlzdCBpbiBvdXIgZml4dHVyZXNcbiAgY29uc3QgdXJsID0gJy9wbGF5ZXJzL2ludmFsaWQnO1xuICBjb25zdCBtZXRob2QgPSAnR0VUJztcblxuICBjb25zdCB7IHN0YXR1c0NvZGUgfSA9IGF3YWl0IHNlcnZlci5pbmplY3QoeyB1cmwsIG1ldGhvZCB9KTtcbiAgdC5pcyhzdGF0dXNDb2RlLCBTVEFUVVNfQkFEX1JFUVVFU1QpO1xufSk7XG4iXX0=