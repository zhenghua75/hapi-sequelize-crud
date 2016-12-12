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
  const { server, sequelize: { models: { Player } } } = t.context;
  const url = '/player';
  const method = 'POST';
  const payload = { name: 'Chard' };

  const notPresentPlayer = yield Player.findOne({ where: payload });
  t.falsy(notPresentPlayer);

  const { result, statusCode } = yield server.inject({ url, method, payload });
  t.is(statusCode, STATUS_OK);
  t.truthy(result.id);
  t.is(result.name, payload.name);
}

(0, _ava2.default)('where /player {name: "Chard"}', (() => {
  var _ref = _asyncToGenerator(_ref2);

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})());

function* _ref4(t) {
  const { server } = t.context;
  const url = '/notamodel';
  const method = 'POST';
  const payload = { name: 'Chard' };

  const { statusCode } = yield server.inject({ url, method, payload });
  t.is(statusCode, STATUS_NOT_FOUND);
}

(0, _ava2.default)('not found /notamodel {name: "Chard"}', (() => {
  var _ref3 = _asyncToGenerator(_ref4);

  return function (_x2) {
    return _ref3.apply(this, arguments);
  };
})());

function* _ref6(t) {
  const { server } = t.context;
  const url = '/player';
  const method = 'POST';

  const { statusCode } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_BAD_REQUEST);
}

(0, _ava2.default)('no payload /player/1', (() => {
  var _ref5 = _asyncToGenerator(_ref6);

  return function (_x3) {
    return _ref5.apply(this, arguments);
  };
})());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcnVkLWNyZWF0ZS5pbnRlZ3JhdGlvbi50ZXN0LmpzIl0sIm5hbWVzIjpbIlNUQVRVU19PSyIsIlNUQVRVU19OT1RfRk9VTkQiLCJTVEFUVVNfQkFEX1JFUVVFU1QiLCJ0Iiwic2VydmVyIiwic2VxdWVsaXplIiwibW9kZWxzIiwiUGxheWVyIiwiY29udGV4dCIsInVybCIsIm1ldGhvZCIsInBheWxvYWQiLCJuYW1lIiwibm90UHJlc2VudFBsYXllciIsImZpbmRPbmUiLCJ3aGVyZSIsImZhbHN5IiwicmVzdWx0Iiwic3RhdHVzQ29kZSIsImluamVjdCIsImlzIiwidHJ1dGh5IiwiaWQiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQSxNQUFNQSxZQUFZLEdBQWxCO0FBQ0EsTUFBTUMsbUJBQW1CLEdBQXpCO0FBQ0EsTUFBTUMscUJBQXFCLEdBQTNCOztBQUVBOztBQUVzQyxnQkFBT0MsQ0FBUCxFQUFhO0FBQ2pELFFBQU0sRUFBRUMsTUFBRixFQUFVQyxXQUFXLEVBQUVDLFFBQVEsRUFBRUMsTUFBRixFQUFWLEVBQXJCLEtBQWdESixFQUFFSyxPQUF4RDtBQUNBLFFBQU1DLE1BQU0sU0FBWjtBQUNBLFFBQU1DLFNBQVMsTUFBZjtBQUNBLFFBQU1DLFVBQVUsRUFBRUMsTUFBTSxPQUFSLEVBQWhCOztBQUVBLFFBQU1DLG1CQUFtQixNQUFNTixPQUFPTyxPQUFQLENBQWUsRUFBRUMsT0FBT0osT0FBVCxFQUFmLENBQS9CO0FBQ0FSLElBQUVhLEtBQUYsQ0FBUUgsZ0JBQVI7O0FBRUEsUUFBTSxFQUFFSSxNQUFGLEVBQVVDLFVBQVYsS0FBeUIsTUFBTWQsT0FBT2UsTUFBUCxDQUFjLEVBQUVWLEdBQUYsRUFBT0MsTUFBUCxFQUFlQyxPQUFmLEVBQWQsQ0FBckM7QUFDQVIsSUFBRWlCLEVBQUYsQ0FBS0YsVUFBTCxFQUFpQmxCLFNBQWpCO0FBQ0FHLElBQUVrQixNQUFGLENBQVNKLE9BQU9LLEVBQWhCO0FBQ0FuQixJQUFFaUIsRUFBRixDQUFLSCxPQUFPTCxJQUFaLEVBQWtCRCxRQUFRQyxJQUExQjtBQUNEOztBQWJELG1CQUFLLCtCQUFMO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBZTZDLGdCQUFPVCxDQUFQLEVBQWE7QUFDeEQsUUFBTSxFQUFFQyxNQUFGLEtBQWFELEVBQUVLLE9BQXJCO0FBQ0EsUUFBTUMsTUFBTSxZQUFaO0FBQ0EsUUFBTUMsU0FBUyxNQUFmO0FBQ0EsUUFBTUMsVUFBVSxFQUFFQyxNQUFNLE9BQVIsRUFBaEI7O0FBRUEsUUFBTSxFQUFFTSxVQUFGLEtBQWlCLE1BQU1kLE9BQU9lLE1BQVAsQ0FBYyxFQUFFVixHQUFGLEVBQU9DLE1BQVAsRUFBZUMsT0FBZixFQUFkLENBQTdCO0FBQ0FSLElBQUVpQixFQUFGLENBQUtGLFVBQUwsRUFBaUJqQixnQkFBakI7QUFDRDs7QUFSRCxtQkFBSyxzQ0FBTDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVc2QixnQkFBT0UsQ0FBUCxFQUFhO0FBQ3hDLFFBQU0sRUFBRUMsTUFBRixLQUFhRCxFQUFFSyxPQUFyQjtBQUNBLFFBQU1DLE1BQU0sU0FBWjtBQUNBLFFBQU1DLFNBQVMsTUFBZjs7QUFFQSxRQUFNLEVBQUVRLFVBQUYsS0FBaUIsTUFBTWQsT0FBT2UsTUFBUCxDQUFjLEVBQUVWLEdBQUYsRUFBT0MsTUFBUCxFQUFkLENBQTdCO0FBQ0FQLElBQUVpQixFQUFGLENBQUtGLFVBQUwsRUFBaUJoQixrQkFBakI7QUFDRDs7QUFQRCxtQkFBSyxzQkFBTDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6ImNydWQtY3JlYXRlLmludGVncmF0aW9uLnRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdGVzdCBmcm9tICdhdmEnO1xuaW1wb3J0ICdzaW5vbi1ibHVlYmlyZCc7XG5pbXBvcnQgc2V0dXAgZnJvbSAnLi4vdGVzdC9pbnRlZ3JhdGlvbi1zZXR1cC5qcyc7XG5cbmNvbnN0IFNUQVRVU19PSyA9IDIwMDtcbmNvbnN0IFNUQVRVU19OT1RfRk9VTkQgPSA0MDQ7XG5jb25zdCBTVEFUVVNfQkFEX1JFUVVFU1QgPSA0MDA7XG5cbnNldHVwKHRlc3QpO1xuXG50ZXN0KCd3aGVyZSAvcGxheWVyIHtuYW1lOiBcIkNoYXJkXCJ9JywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzZXJ2ZXIsIHNlcXVlbGl6ZTogeyBtb2RlbHM6IHsgUGxheWVyIH0gfSB9ID0gdC5jb250ZXh0O1xuICBjb25zdCB1cmwgPSAnL3BsYXllcic7XG4gIGNvbnN0IG1ldGhvZCA9ICdQT1NUJztcbiAgY29uc3QgcGF5bG9hZCA9IHsgbmFtZTogJ0NoYXJkJyB9O1xuXG4gIGNvbnN0IG5vdFByZXNlbnRQbGF5ZXIgPSBhd2FpdCBQbGF5ZXIuZmluZE9uZSh7IHdoZXJlOiBwYXlsb2FkIH0pO1xuICB0LmZhbHN5KG5vdFByZXNlbnRQbGF5ZXIpO1xuXG4gIGNvbnN0IHsgcmVzdWx0LCBzdGF0dXNDb2RlIH0gPSBhd2FpdCBzZXJ2ZXIuaW5qZWN0KHsgdXJsLCBtZXRob2QsIHBheWxvYWQgfSk7XG4gIHQuaXMoc3RhdHVzQ29kZSwgU1RBVFVTX09LKTtcbiAgdC50cnV0aHkocmVzdWx0LmlkKTtcbiAgdC5pcyhyZXN1bHQubmFtZSwgcGF5bG9hZC5uYW1lKTtcbn0pO1xuXG50ZXN0KCdub3QgZm91bmQgL25vdGFtb2RlbCB7bmFtZTogXCJDaGFyZFwifScsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc2VydmVyIH0gPSB0LmNvbnRleHQ7XG4gIGNvbnN0IHVybCA9ICcvbm90YW1vZGVsJztcbiAgY29uc3QgbWV0aG9kID0gJ1BPU1QnO1xuICBjb25zdCBwYXlsb2FkID0geyBuYW1lOiAnQ2hhcmQnIH07XG5cbiAgY29uc3QgeyBzdGF0dXNDb2RlIH0gPSBhd2FpdCBzZXJ2ZXIuaW5qZWN0KHsgdXJsLCBtZXRob2QsIHBheWxvYWQgfSk7XG4gIHQuaXMoc3RhdHVzQ29kZSwgU1RBVFVTX05PVF9GT1VORCk7XG59KTtcblxuXG50ZXN0KCdubyBwYXlsb2FkIC9wbGF5ZXIvMScsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc2VydmVyIH0gPSB0LmNvbnRleHQ7XG4gIGNvbnN0IHVybCA9ICcvcGxheWVyJztcbiAgY29uc3QgbWV0aG9kID0gJ1BPU1QnO1xuXG4gIGNvbnN0IHsgc3RhdHVzQ29kZSB9ID0gYXdhaXQgc2VydmVyLmluamVjdCh7IHVybCwgbWV0aG9kIH0pO1xuICB0LmlzKHN0YXR1c0NvZGUsIFNUQVRVU19CQURfUkVRVUVTVCk7XG59KTtcbiJdfQ==