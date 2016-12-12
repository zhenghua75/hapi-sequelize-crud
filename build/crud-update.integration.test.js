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
  const url = `/player/${ player1.id }`;
  const method = 'PUT';
  const payload = { name: 'Chard' };

  const { result, statusCode } = yield server.inject({ url, method, payload });
  t.is(statusCode, STATUS_OK);
  t.is(result.id, player1.id);
  t.is(result.name, payload.name);
}

(0, _ava2.default)('where /player/1 {name: "Chard"}', (() => {
  var _ref = _asyncToGenerator(_ref2);

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})());

function* _ref4(t) {
  const { server } = t.context;
  // this doesn't exist in our fixtures
  const url = '/player/10';
  const method = 'PUT';
  const payload = { name: 'Chard' };

  const { statusCode } = yield server.inject({ url, method, payload });
  t.is(statusCode, STATUS_NOT_FOUND);
}

(0, _ava2.default)('not found /player/10 {name: "Chard"}', (() => {
  var _ref3 = _asyncToGenerator(_ref4);

  return function (_x2) {
    return _ref3.apply(this, arguments);
  };
})());

function* _ref6(t) {
  const { server, instances } = t.context;
  const { player1 } = instances;
  const url = `/player/${ player1.id }`;
  const method = 'PUT';

  const { statusCode } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_BAD_REQUEST);
}

(0, _ava2.default)('no payload /player/1', (() => {
  var _ref5 = _asyncToGenerator(_ref6);

  return function (_x3) {
    return _ref5.apply(this, arguments);
  };
})());

function* _ref8(t) {
  const { server } = t.context;
  const url = '/notamodel';
  const method = 'PUT';
  const payload = { name: 'Chard' };

  const { statusCode } = yield server.inject({ url, method, payload });
  t.is(statusCode, STATUS_NOT_FOUND);
}

(0, _ava2.default)('not found /notamodel {name: "Chard"}', (() => {
  var _ref7 = _asyncToGenerator(_ref8);

  return function (_x4) {
    return _ref7.apply(this, arguments);
  };
})());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcnVkLXVwZGF0ZS5pbnRlZ3JhdGlvbi50ZXN0LmpzIl0sIm5hbWVzIjpbIlNUQVRVU19PSyIsIlNUQVRVU19OT1RfRk9VTkQiLCJTVEFUVVNfQkFEX1JFUVVFU1QiLCJ0Iiwic2VydmVyIiwiaW5zdGFuY2VzIiwiY29udGV4dCIsInBsYXllcjEiLCJ1cmwiLCJpZCIsIm1ldGhvZCIsInBheWxvYWQiLCJuYW1lIiwicmVzdWx0Iiwic3RhdHVzQ29kZSIsImluamVjdCIsImlzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUEsTUFBTUEsWUFBWSxHQUFsQjtBQUNBLE1BQU1DLG1CQUFtQixHQUF6QjtBQUNBLE1BQU1DLHFCQUFxQixHQUEzQjs7QUFFQTs7QUFFd0MsZ0JBQU9DLENBQVAsRUFBYTtBQUNuRCxRQUFNLEVBQUVDLE1BQUYsRUFBVUMsU0FBVixLQUF3QkYsRUFBRUcsT0FBaEM7QUFDQSxRQUFNLEVBQUVDLE9BQUYsS0FBY0YsU0FBcEI7QUFDQSxRQUFNRyxNQUFPLFlBQVVELFFBQVFFLEVBQUcsR0FBbEM7QUFDQSxRQUFNQyxTQUFTLEtBQWY7QUFDQSxRQUFNQyxVQUFVLEVBQUVDLE1BQU0sT0FBUixFQUFoQjs7QUFFQSxRQUFNLEVBQUVDLE1BQUYsRUFBVUMsVUFBVixLQUF5QixNQUFNVixPQUFPVyxNQUFQLENBQWMsRUFBRVAsR0FBRixFQUFPRSxNQUFQLEVBQWVDLE9BQWYsRUFBZCxDQUFyQztBQUNBUixJQUFFYSxFQUFGLENBQUtGLFVBQUwsRUFBaUJkLFNBQWpCO0FBQ0FHLElBQUVhLEVBQUYsQ0FBS0gsT0FBT0osRUFBWixFQUFnQkYsUUFBUUUsRUFBeEI7QUFDQU4sSUFBRWEsRUFBRixDQUFLSCxPQUFPRCxJQUFaLEVBQWtCRCxRQUFRQyxJQUExQjtBQUNEOztBQVhELG1CQUFLLGlDQUFMO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBYTZDLGdCQUFPVCxDQUFQLEVBQWE7QUFDeEQsUUFBTSxFQUFFQyxNQUFGLEtBQWFELEVBQUVHLE9BQXJCO0FBQ0E7QUFDQSxRQUFNRSxNQUFNLFlBQVo7QUFDQSxRQUFNRSxTQUFTLEtBQWY7QUFDQSxRQUFNQyxVQUFVLEVBQUVDLE1BQU0sT0FBUixFQUFoQjs7QUFFQSxRQUFNLEVBQUVFLFVBQUYsS0FBaUIsTUFBTVYsT0FBT1csTUFBUCxDQUFjLEVBQUVQLEdBQUYsRUFBT0UsTUFBUCxFQUFlQyxPQUFmLEVBQWQsQ0FBN0I7QUFDQVIsSUFBRWEsRUFBRixDQUFLRixVQUFMLEVBQWlCYixnQkFBakI7QUFDRDs7QUFURCxtQkFBSyxzQ0FBTDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVk2QixnQkFBT0UsQ0FBUCxFQUFhO0FBQ3hDLFFBQU0sRUFBRUMsTUFBRixFQUFVQyxTQUFWLEtBQXdCRixFQUFFRyxPQUFoQztBQUNBLFFBQU0sRUFBRUMsT0FBRixLQUFjRixTQUFwQjtBQUNBLFFBQU1HLE1BQU8sWUFBVUQsUUFBUUUsRUFBRyxHQUFsQztBQUNBLFFBQU1DLFNBQVMsS0FBZjs7QUFFQSxRQUFNLEVBQUVJLFVBQUYsS0FBaUIsTUFBTVYsT0FBT1csTUFBUCxDQUFjLEVBQUVQLEdBQUYsRUFBT0UsTUFBUCxFQUFkLENBQTdCO0FBQ0FQLElBQUVhLEVBQUYsQ0FBS0YsVUFBTCxFQUFpQlosa0JBQWpCO0FBQ0Q7O0FBUkQsbUJBQUssc0JBQUw7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFVNkMsZ0JBQU9DLENBQVAsRUFBYTtBQUN4RCxRQUFNLEVBQUVDLE1BQUYsS0FBYUQsRUFBRUcsT0FBckI7QUFDQSxRQUFNRSxNQUFNLFlBQVo7QUFDQSxRQUFNRSxTQUFTLEtBQWY7QUFDQSxRQUFNQyxVQUFVLEVBQUVDLE1BQU0sT0FBUixFQUFoQjs7QUFFQSxRQUFNLEVBQUVFLFVBQUYsS0FBaUIsTUFBTVYsT0FBT1csTUFBUCxDQUFjLEVBQUVQLEdBQUYsRUFBT0UsTUFBUCxFQUFlQyxPQUFmLEVBQWQsQ0FBN0I7QUFDQVIsSUFBRWEsRUFBRixDQUFLRixVQUFMLEVBQWlCYixnQkFBakI7QUFDRDs7QUFSRCxtQkFBSyxzQ0FBTDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6ImNydWQtdXBkYXRlLmludGVncmF0aW9uLnRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdGVzdCBmcm9tICdhdmEnO1xuaW1wb3J0ICdzaW5vbi1ibHVlYmlyZCc7XG5pbXBvcnQgc2V0dXAgZnJvbSAnLi4vdGVzdC9pbnRlZ3JhdGlvbi1zZXR1cC5qcyc7XG5cbmNvbnN0IFNUQVRVU19PSyA9IDIwMDtcbmNvbnN0IFNUQVRVU19OT1RfRk9VTkQgPSA0MDQ7XG5jb25zdCBTVEFUVVNfQkFEX1JFUVVFU1QgPSA0MDA7XG5cbnNldHVwKHRlc3QpO1xuXG50ZXN0KCd3aGVyZSAvcGxheWVyLzEge25hbWU6IFwiQ2hhcmRcIn0nLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHNlcnZlciwgaW5zdGFuY2VzIH0gPSB0LmNvbnRleHQ7XG4gIGNvbnN0IHsgcGxheWVyMSB9ID0gaW5zdGFuY2VzO1xuICBjb25zdCB1cmwgPSBgL3BsYXllci8ke3BsYXllcjEuaWR9YDtcbiAgY29uc3QgbWV0aG9kID0gJ1BVVCc7XG4gIGNvbnN0IHBheWxvYWQgPSB7IG5hbWU6ICdDaGFyZCcgfTtcblxuICBjb25zdCB7IHJlc3VsdCwgc3RhdHVzQ29kZSB9ID0gYXdhaXQgc2VydmVyLmluamVjdCh7IHVybCwgbWV0aG9kLCBwYXlsb2FkIH0pO1xuICB0LmlzKHN0YXR1c0NvZGUsIFNUQVRVU19PSyk7XG4gIHQuaXMocmVzdWx0LmlkLCBwbGF5ZXIxLmlkKTtcbiAgdC5pcyhyZXN1bHQubmFtZSwgcGF5bG9hZC5uYW1lKTtcbn0pO1xuXG50ZXN0KCdub3QgZm91bmQgL3BsYXllci8xMCB7bmFtZTogXCJDaGFyZFwifScsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc2VydmVyIH0gPSB0LmNvbnRleHQ7XG4gIC8vIHRoaXMgZG9lc24ndCBleGlzdCBpbiBvdXIgZml4dHVyZXNcbiAgY29uc3QgdXJsID0gJy9wbGF5ZXIvMTAnO1xuICBjb25zdCBtZXRob2QgPSAnUFVUJztcbiAgY29uc3QgcGF5bG9hZCA9IHsgbmFtZTogJ0NoYXJkJyB9O1xuXG4gIGNvbnN0IHsgc3RhdHVzQ29kZSB9ID0gYXdhaXQgc2VydmVyLmluamVjdCh7IHVybCwgbWV0aG9kLCBwYXlsb2FkIH0pO1xuICB0LmlzKHN0YXR1c0NvZGUsIFNUQVRVU19OT1RfRk9VTkQpO1xufSk7XG5cblxudGVzdCgnbm8gcGF5bG9hZCAvcGxheWVyLzEnLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHNlcnZlciwgaW5zdGFuY2VzIH0gPSB0LmNvbnRleHQ7XG4gIGNvbnN0IHsgcGxheWVyMSB9ID0gaW5zdGFuY2VzO1xuICBjb25zdCB1cmwgPSBgL3BsYXllci8ke3BsYXllcjEuaWR9YDtcbiAgY29uc3QgbWV0aG9kID0gJ1BVVCc7XG5cbiAgY29uc3QgeyBzdGF0dXNDb2RlIH0gPSBhd2FpdCBzZXJ2ZXIuaW5qZWN0KHsgdXJsLCBtZXRob2QgfSk7XG4gIHQuaXMoc3RhdHVzQ29kZSwgU1RBVFVTX0JBRF9SRVFVRVNUKTtcbn0pO1xuXG50ZXN0KCdub3QgZm91bmQgL25vdGFtb2RlbCB7bmFtZTogXCJDaGFyZFwifScsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc2VydmVyIH0gPSB0LmNvbnRleHQ7XG4gIGNvbnN0IHVybCA9ICcvbm90YW1vZGVsJztcbiAgY29uc3QgbWV0aG9kID0gJ1BVVCc7XG4gIGNvbnN0IHBheWxvYWQgPSB7IG5hbWU6ICdDaGFyZCcgfTtcblxuICBjb25zdCB7IHN0YXR1c0NvZGUgfSA9IGF3YWl0IHNlcnZlci5pbmplY3QoeyB1cmwsIG1ldGhvZCwgcGF5bG9hZCB9KTtcbiAgdC5pcyhzdGF0dXNDb2RlLCBTVEFUVVNfTk9UX0ZPVU5EKTtcbn0pO1xuIl19