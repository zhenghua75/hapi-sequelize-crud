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

(0, _integrationSetup2.default)(_ava2.default);

function* _ref2(t) {
  const { server, instances } = t.context;
  const { team1 } = instances;
  const path = `/team?name=${ team1.name }`;

  const { result, statusCode } = yield server.inject(path);
  t.is(statusCode, STATUS_OK);
  t.is(result.id, team1.id);
  t.is(result.name, team1.name);
}

(0, _ava2.default)('single result /team?name=Baseball', (() => {
  var _ref = _asyncToGenerator(_ref2);

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})());

function* _ref4(t) {
  const { server, instances } = t.context;
  const { team1 } = instances;
  // this doesn't exist in our fixtures
  const path = `/team?name=${ team1.name }&id=2`;

  const { statusCode } = yield server.inject(path);
  t.is(statusCode, STATUS_NOT_FOUND);
}

(0, _ava2.default)('no results /team?name=Baseball&id=2', (() => {
  var _ref3 = _asyncToGenerator(_ref4);

  return function (_x2) {
    return _ref3.apply(this, arguments);
  };
})());

function* _ref6(t) {
  const { server, instances } = t.context;
  const { team1 } = instances;
  const path = `/team?name=${ team1.name }`;

  const { result, statusCode } = yield server.inject(path);
  t.is(statusCode, STATUS_OK);
  t.is(result.id, team1.id);
  t.is(result.name, team1.name);
}

(0, _ava2.default)('single result from list query /teams?name=Baseball', (() => {
  var _ref5 = _asyncToGenerator(_ref6);

  return function (_x3) {
    return _ref5.apply(this, arguments);
  };
})());

function _ref8({ id }) {
  return id;
}

function* _ref9(t) {
  const { server, instances } = t.context;
  const { team1, player1, player2 } = instances;
  const path = `/players?teamId=${ team1.id }`;

  const { result, statusCode } = yield server.inject(path);
  t.is(statusCode, STATUS_OK);
  const playerIds = result.map(_ref8);
  t.truthy(playerIds.includes(player1.id));
  t.truthy(playerIds.includes(player2.id));
}

(0, _ava2.default)('multiple results from list query /players?teamId=1', (() => {
  var _ref7 = _asyncToGenerator(_ref9);

  return function (_x4) {
    return _ref7.apply(this, arguments);
  };
})());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcnVkLXdoZXJlLmludGVncmF0aW9uLnRlc3QuanMiXSwibmFtZXMiOlsiU1RBVFVTX09LIiwiU1RBVFVTX05PVF9GT1VORCIsInQiLCJzZXJ2ZXIiLCJpbnN0YW5jZXMiLCJjb250ZXh0IiwidGVhbTEiLCJwYXRoIiwibmFtZSIsInJlc3VsdCIsInN0YXR1c0NvZGUiLCJpbmplY3QiLCJpcyIsImlkIiwicGxheWVyMSIsInBsYXllcjIiLCJwbGF5ZXJJZHMiLCJtYXAiLCJ0cnV0aHkiLCJpbmNsdWRlcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLE1BQU1BLFlBQVksR0FBbEI7QUFDQSxNQUFNQyxtQkFBbUIsR0FBekI7O0FBRUE7O0FBRTBDLGdCQUFPQyxDQUFQLEVBQWE7QUFDckQsUUFBTSxFQUFFQyxNQUFGLEVBQVVDLFNBQVYsS0FBd0JGLEVBQUVHLE9BQWhDO0FBQ0EsUUFBTSxFQUFFQyxLQUFGLEtBQVlGLFNBQWxCO0FBQ0EsUUFBTUcsT0FBUSxlQUFhRCxNQUFNRSxJQUFLLEdBQXRDOztBQUVBLFFBQU0sRUFBRUMsTUFBRixFQUFVQyxVQUFWLEtBQXlCLE1BQU1QLE9BQU9RLE1BQVAsQ0FBY0osSUFBZCxDQUFyQztBQUNBTCxJQUFFVSxFQUFGLENBQUtGLFVBQUwsRUFBaUJWLFNBQWpCO0FBQ0FFLElBQUVVLEVBQUYsQ0FBS0gsT0FBT0ksRUFBWixFQUFnQlAsTUFBTU8sRUFBdEI7QUFDQVgsSUFBRVUsRUFBRixDQUFLSCxPQUFPRCxJQUFaLEVBQWtCRixNQUFNRSxJQUF4QjtBQUNEOztBQVRELG1CQUFLLG1DQUFMO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBVzRDLGdCQUFPTixDQUFQLEVBQWE7QUFDdkQsUUFBTSxFQUFFQyxNQUFGLEVBQVVDLFNBQVYsS0FBd0JGLEVBQUVHLE9BQWhDO0FBQ0EsUUFBTSxFQUFFQyxLQUFGLEtBQVlGLFNBQWxCO0FBQ0E7QUFDQSxRQUFNRyxPQUFRLGVBQWFELE1BQU1FLElBQUssUUFBdEM7O0FBRUEsUUFBTSxFQUFFRSxVQUFGLEtBQWlCLE1BQU1QLE9BQU9RLE1BQVAsQ0FBY0osSUFBZCxDQUE3QjtBQUNBTCxJQUFFVSxFQUFGLENBQUtGLFVBQUwsRUFBaUJULGdCQUFqQjtBQUNEOztBQVJELG1CQUFLLHFDQUFMO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBVTJELGdCQUFPQyxDQUFQLEVBQWE7QUFDdEUsUUFBTSxFQUFFQyxNQUFGLEVBQVVDLFNBQVYsS0FBd0JGLEVBQUVHLE9BQWhDO0FBQ0EsUUFBTSxFQUFFQyxLQUFGLEtBQVlGLFNBQWxCO0FBQ0EsUUFBTUcsT0FBUSxlQUFhRCxNQUFNRSxJQUFLLEdBQXRDOztBQUVBLFFBQU0sRUFBRUMsTUFBRixFQUFVQyxVQUFWLEtBQXlCLE1BQU1QLE9BQU9RLE1BQVAsQ0FBY0osSUFBZCxDQUFyQztBQUNBTCxJQUFFVSxFQUFGLENBQUtGLFVBQUwsRUFBaUJWLFNBQWpCO0FBQ0FFLElBQUVVLEVBQUYsQ0FBS0gsT0FBT0ksRUFBWixFQUFnQlAsTUFBTU8sRUFBdEI7QUFDQVgsSUFBRVUsRUFBRixDQUFLSCxPQUFPRCxJQUFaLEVBQWtCRixNQUFNRSxJQUF4QjtBQUNEOztBQVRELG1CQUFLLG9EQUFMO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBa0IrQixlQUFDLEVBQUVLLEVBQUYsRUFBRDtBQUFBLFNBQVlBLEVBQVo7QUFBQTs7QUFQNEIsZ0JBQU9YLENBQVAsRUFBYTtBQUN0RSxRQUFNLEVBQUVDLE1BQUYsRUFBVUMsU0FBVixLQUF3QkYsRUFBRUcsT0FBaEM7QUFDQSxRQUFNLEVBQUVDLEtBQUYsRUFBU1EsT0FBVCxFQUFrQkMsT0FBbEIsS0FBOEJYLFNBQXBDO0FBQ0EsUUFBTUcsT0FBUSxvQkFBa0JELE1BQU1PLEVBQUcsR0FBekM7O0FBRUEsUUFBTSxFQUFFSixNQUFGLEVBQVVDLFVBQVYsS0FBeUIsTUFBTVAsT0FBT1EsTUFBUCxDQUFjSixJQUFkLENBQXJDO0FBQ0FMLElBQUVVLEVBQUYsQ0FBS0YsVUFBTCxFQUFpQlYsU0FBakI7QUFDQSxRQUFNZ0IsWUFBWVAsT0FBT1EsR0FBUCxPQUFsQjtBQUNBZixJQUFFZ0IsTUFBRixDQUFTRixVQUFVRyxRQUFWLENBQW1CTCxRQUFRRCxFQUEzQixDQUFUO0FBQ0FYLElBQUVnQixNQUFGLENBQVNGLFVBQVVHLFFBQVYsQ0FBbUJKLFFBQVFGLEVBQTNCLENBQVQ7QUFDRDs7QUFWRCxtQkFBSyxvREFBTDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6ImNydWQtd2hlcmUuaW50ZWdyYXRpb24udGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0ZXN0IGZyb20gJ2F2YSc7XG5pbXBvcnQgJ3Npbm9uLWJsdWViaXJkJztcbmltcG9ydCBzZXR1cCBmcm9tICcuLi90ZXN0L2ludGVncmF0aW9uLXNldHVwLmpzJztcblxuY29uc3QgU1RBVFVTX09LID0gMjAwO1xuY29uc3QgU1RBVFVTX05PVF9GT1VORCA9IDQwNDtcblxuc2V0dXAodGVzdCk7XG5cbnRlc3QoJ3NpbmdsZSByZXN1bHQgL3RlYW0/bmFtZT1CYXNlYmFsbCcsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc2VydmVyLCBpbnN0YW5jZXMgfSA9IHQuY29udGV4dDtcbiAgY29uc3QgeyB0ZWFtMSB9ID0gaW5zdGFuY2VzO1xuICBjb25zdCBwYXRoID0gYC90ZWFtP25hbWU9JHt0ZWFtMS5uYW1lfWA7XG5cbiAgY29uc3QgeyByZXN1bHQsIHN0YXR1c0NvZGUgfSA9IGF3YWl0IHNlcnZlci5pbmplY3QocGF0aCk7XG4gIHQuaXMoc3RhdHVzQ29kZSwgU1RBVFVTX09LKTtcbiAgdC5pcyhyZXN1bHQuaWQsIHRlYW0xLmlkKTtcbiAgdC5pcyhyZXN1bHQubmFtZSwgdGVhbTEubmFtZSk7XG59KTtcblxudGVzdCgnbm8gcmVzdWx0cyAvdGVhbT9uYW1lPUJhc2ViYWxsJmlkPTInLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHNlcnZlciwgaW5zdGFuY2VzIH0gPSB0LmNvbnRleHQ7XG4gIGNvbnN0IHsgdGVhbTEgfSA9IGluc3RhbmNlcztcbiAgLy8gdGhpcyBkb2Vzbid0IGV4aXN0IGluIG91ciBmaXh0dXJlc1xuICBjb25zdCBwYXRoID0gYC90ZWFtP25hbWU9JHt0ZWFtMS5uYW1lfSZpZD0yYDtcblxuICBjb25zdCB7IHN0YXR1c0NvZGUgfSA9IGF3YWl0IHNlcnZlci5pbmplY3QocGF0aCk7XG4gIHQuaXMoc3RhdHVzQ29kZSwgU1RBVFVTX05PVF9GT1VORCk7XG59KTtcblxudGVzdCgnc2luZ2xlIHJlc3VsdCBmcm9tIGxpc3QgcXVlcnkgL3RlYW1zP25hbWU9QmFzZWJhbGwnLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHNlcnZlciwgaW5zdGFuY2VzIH0gPSB0LmNvbnRleHQ7XG4gIGNvbnN0IHsgdGVhbTEgfSA9IGluc3RhbmNlcztcbiAgY29uc3QgcGF0aCA9IGAvdGVhbT9uYW1lPSR7dGVhbTEubmFtZX1gO1xuXG4gIGNvbnN0IHsgcmVzdWx0LCBzdGF0dXNDb2RlIH0gPSBhd2FpdCBzZXJ2ZXIuaW5qZWN0KHBhdGgpO1xuICB0LmlzKHN0YXR1c0NvZGUsIFNUQVRVU19PSyk7XG4gIHQuaXMocmVzdWx0LmlkLCB0ZWFtMS5pZCk7XG4gIHQuaXMocmVzdWx0Lm5hbWUsIHRlYW0xLm5hbWUpO1xufSk7XG5cbnRlc3QoJ211bHRpcGxlIHJlc3VsdHMgZnJvbSBsaXN0IHF1ZXJ5IC9wbGF5ZXJzP3RlYW1JZD0xJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzZXJ2ZXIsIGluc3RhbmNlcyB9ID0gdC5jb250ZXh0O1xuICBjb25zdCB7IHRlYW0xLCBwbGF5ZXIxLCBwbGF5ZXIyIH0gPSBpbnN0YW5jZXM7XG4gIGNvbnN0IHBhdGggPSBgL3BsYXllcnM/dGVhbUlkPSR7dGVhbTEuaWR9YDtcblxuICBjb25zdCB7IHJlc3VsdCwgc3RhdHVzQ29kZSB9ID0gYXdhaXQgc2VydmVyLmluamVjdChwYXRoKTtcbiAgdC5pcyhzdGF0dXNDb2RlLCBTVEFUVVNfT0spO1xuICBjb25zdCBwbGF5ZXJJZHMgPSByZXN1bHQubWFwKCh7IGlkIH0pID0+IGlkKTtcbiAgdC50cnV0aHkocGxheWVySWRzLmluY2x1ZGVzKHBsYXllcjEuaWQpKTtcbiAgdC50cnV0aHkocGxheWVySWRzLmluY2x1ZGVzKHBsYXllcjIuaWQpKTtcbn0pO1xuXG4iXX0=