'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

require('sinon-bluebird');

var _integrationSetup = require('../test/integration-setup.js');

var _integrationSetup2 = _interopRequireDefault(_integrationSetup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const STATUS_OK = 200;

(0, _integrationSetup2.default)(_ava2.default);

function* _ref2(t) {
  const { server, instances } = t.context;
  const { team1, city1 } = instances;
  const path = `/team/${ team1.id }?include=city`;

  const { result, statusCode } = yield server.inject(path);
  t.is(statusCode, STATUS_OK);
  t.is(result.id, team1.id);
  t.is(result.City.id, city1.id);
}

(0, _ava2.default)('belongsTo /team?include=city', (() => {
  var _ref = _asyncToGenerator(_ref2);

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})());

function* _ref4(t) {
  const { server, instances } = t.context;
  const { team1, city1 } = instances;
  const path = `/team/${ team1.id }?include=cities`;

  const { result, statusCode } = yield server.inject(path);
  t.is(statusCode, STATUS_OK);
  t.is(result.id, team1.id);
  t.is(result.City.id, city1.id);
}

(0, _ava2.default)('belongsTo /team?include=cities', (() => {
  var _ref3 = _asyncToGenerator(_ref4);

  return function (_x2) {
    return _ref3.apply(this, arguments);
  };
})());

function _ref6({ id }) {
  return id;
}

function* _ref7(t) {
  const { server, instances } = t.context;
  const { team1, player1, player2 } = instances;
  const path = `/team/${ team1.id }?include=player`;

  const { result, statusCode } = yield server.inject(path);
  t.is(statusCode, STATUS_OK);
  t.is(result.id, team1.id);

  const playerIds = result.Players.map(_ref6);
  t.truthy(playerIds.includes(player1.id));
  t.truthy(playerIds.includes(player2.id));
}

(0, _ava2.default)('hasMany /team?include=player', (() => {
  var _ref5 = _asyncToGenerator(_ref7);

  return function (_x3) {
    return _ref5.apply(this, arguments);
  };
})());

function _ref9({ id }) {
  return id;
}

function* _ref10(t) {
  const { server, instances } = t.context;
  const { team1, player1, player2 } = instances;
  const path = `/team/${ team1.id }?include=players`;

  const { result, statusCode } = yield server.inject(path);
  t.is(statusCode, STATUS_OK);
  t.is(result.id, team1.id);

  const playerIds = result.Players.map(_ref9);
  t.truthy(playerIds.includes(player1.id));
  t.truthy(playerIds.includes(player2.id));
}

(0, _ava2.default)('hasMany /team?include=players', (() => {
  var _ref8 = _asyncToGenerator(_ref10);

  return function (_x4) {
    return _ref8.apply(this, arguments);
  };
})());

function _ref12({ id }) {
  return id;
}

function* _ref13(t) {
  const { server, instances } = t.context;
  const { team1, player1, player2, city1 } = instances;
  const path = `/team/${ team1.id }?include=players&include=city`;

  const { result, statusCode } = yield server.inject(path);
  t.is(statusCode, STATUS_OK);
  t.is(result.id, team1.id);

  const playerIds = result.Players.map(_ref12);
  t.truthy(playerIds.includes(player1.id));
  t.truthy(playerIds.includes(player2.id));
  t.is(result.City.id, city1.id);
}

(0, _ava2.default)('multiple includes /team?include=players&include=city', (() => {
  var _ref11 = _asyncToGenerator(_ref13);

  return function (_x5) {
    return _ref11.apply(this, arguments);
  };
})());

function _ref15({ id }) {
  return id;
}

function* _ref16(t) {
  const { server, instances } = t.context;
  const { team1, player1, player2, city1 } = instances;
  const path = `/team/${ team1.id }?include[]=players&include[]=city`;

  const { result, statusCode } = yield server.inject(path);
  t.is(statusCode, STATUS_OK);
  t.is(result.id, team1.id);

  const playerIds = result.Players.map(_ref15);
  t.truthy(playerIds.includes(player1.id));
  t.truthy(playerIds.includes(player2.id));
  t.is(result.City.id, city1.id);
}

(0, _ava2.default)('multiple includes /team?include[]=players&include[]=city', (() => {
  var _ref14 = _asyncToGenerator(_ref16);

  return function (_x6) {
    return _ref14.apply(this, arguments);
  };
})());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcnVkLWluY2x1ZGUuaW50ZWdyYXRpb24udGVzdC5qcyJdLCJuYW1lcyI6WyJTVEFUVVNfT0siLCJ0Iiwic2VydmVyIiwiaW5zdGFuY2VzIiwiY29udGV4dCIsInRlYW0xIiwiY2l0eTEiLCJwYXRoIiwiaWQiLCJyZXN1bHQiLCJzdGF0dXNDb2RlIiwiaW5qZWN0IiwiaXMiLCJDaXR5IiwicGxheWVyMSIsInBsYXllcjIiLCJwbGF5ZXJJZHMiLCJQbGF5ZXJzIiwibWFwIiwidHJ1dGh5IiwiaW5jbHVkZXMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQSxNQUFNQSxZQUFZLEdBQWxCOztBQUVBOztBQUVxQyxnQkFBT0MsQ0FBUCxFQUFhO0FBQ2hELFFBQU0sRUFBRUMsTUFBRixFQUFVQyxTQUFWLEtBQXdCRixFQUFFRyxPQUFoQztBQUNBLFFBQU0sRUFBRUMsS0FBRixFQUFTQyxLQUFULEtBQW1CSCxTQUF6QjtBQUNBLFFBQU1JLE9BQVEsVUFBUUYsTUFBTUcsRUFBRyxnQkFBL0I7O0FBRUEsUUFBTSxFQUFFQyxNQUFGLEVBQVVDLFVBQVYsS0FBeUIsTUFBTVIsT0FBT1MsTUFBUCxDQUFjSixJQUFkLENBQXJDO0FBQ0FOLElBQUVXLEVBQUYsQ0FBS0YsVUFBTCxFQUFpQlYsU0FBakI7QUFDQUMsSUFBRVcsRUFBRixDQUFLSCxPQUFPRCxFQUFaLEVBQWdCSCxNQUFNRyxFQUF0QjtBQUNBUCxJQUFFVyxFQUFGLENBQUtILE9BQU9JLElBQVAsQ0FBWUwsRUFBakIsRUFBcUJGLE1BQU1FLEVBQTNCO0FBQ0Q7O0FBVEQsbUJBQUssOEJBQUw7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFXdUMsZ0JBQU9QLENBQVAsRUFBYTtBQUNsRCxRQUFNLEVBQUVDLE1BQUYsRUFBVUMsU0FBVixLQUF3QkYsRUFBRUcsT0FBaEM7QUFDQSxRQUFNLEVBQUVDLEtBQUYsRUFBU0MsS0FBVCxLQUFtQkgsU0FBekI7QUFDQSxR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LFFBQVFOLEVBQTNCLENBQVQ7QUFDQVAsSUFBRWtCLE1BQUYsQ0FBU0gsVUFBVUksUUFBVixDQUFtQkwsUUFBUVAsRUFBM0IsQ0FBVDtBQUNBUCxJQUFFVyxFQUFGLENBQUtILE9BQU9JLElBQVAsQ0FBWUwsRUFBakIsRUFBcUJGLE1BQU1FLEVBQTNCO0FBQ0Q7O0FBYkQsbUJBQUssMERBQUw7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJjcnVkLWluY2x1ZGUuaW50ZWdyYXRpb24udGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0ZXN0IGZyb20gJ2F2YSc7XG5pbXBvcnQgJ3Npbm9uLWJsdWViaXJkJztcbmltcG9ydCBzZXR1cCBmcm9tICcuLi90ZXN0L2ludGVncmF0aW9uLXNldHVwLmpzJztcblxuY29uc3QgU1RBVFVTX09LID0gMjAwO1xuXG5zZXR1cCh0ZXN0KTtcblxudGVzdCgnYmVsb25nc1RvIC90ZWFtP2luY2x1ZGU9Y2l0eScsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc2VydmVyLCBpbnN0YW5jZXMgfSA9IHQuY29udGV4dDtcbiAgY29uc3QgeyB0ZWFtMSwgY2l0eTEgfSA9IGluc3RhbmNlcztcbiAgY29uc3QgcGF0aCA9IGAvdGVhbS8ke3RlYW0xLmlkfT9pbmNsdWRlPWNpdHlgO1xuXG4gIGNvbnN0IHsgcmVzdWx0LCBzdGF0dXNDb2RlIH0gPSBhd2FpdCBzZXJ2ZXIuaW5qZWN0KHBhdGgpO1xuICB0LmlzKHN0YXR1c0NvZGUsIFNUQVRVU19PSyk7XG4gIHQuaXMocmVzdWx0LmlkLCB0ZWFtMS5pZCk7XG4gIHQuaXMocmVzdWx0LkNpdHkuaWQsIGNpdHkxLmlkKTtcbn0pO1xuXG50ZXN0KCdiZWxvbmdzVG8gL3RlYW0/aW5jbHVkZT1jaXRpZXMnLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHNlcnZlciwgaW5zdGFuY2VzIH0gPSB0LmNvbnRleHQ7XG4gIGNvbnN0IHsgdGVhbTEsIGNpdHkxIH0gPSBpbnN0YW5jZXM7XG4gIGNvbnN0IHBhdGggPSBgL3RlYW0vJHt0ZWFtMS5pZH0/aW5jbHVkZT1jaXRpZXNgO1xuXG4gIGNvbnN0IHsgcmVzdWx0LCBzdGF0dXNDb2RlIH0gPSBhd2FpdCBzZXJ2ZXIuaW5qZWN0KHBhdGgpO1xuICB0LmlzKHN0YXR1c0NvZGUsIFNUQVRVU19PSyk7XG4gIHQuaXMocmVzdWx0LmlkLCB0ZWFtMS5pZCk7XG4gIHQuaXMocmVzdWx0LkNpdHkuaWQsIGNpdHkxLmlkKTtcbn0pO1xuXG50ZXN0KCdoYXNNYW55IC90ZWFtP2luY2x1ZGU9cGxheWVyJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzZXJ2ZXIsIGluc3RhbmNlcyB9ID0gdC5jb250ZXh0O1xuICBjb25zdCB7IHRlYW0xLCBwbGF5ZXIxLCBwbGF5ZXIyIH0gPSBpbnN0YW5jZXM7XG4gIGNvbnN0IHBhdGggPSBgL3RlYW0vJHt0ZWFtMS5pZH0/aW5jbHVkZT1wbGF5ZXJgO1xuXG4gIGNvbnN0IHsgcmVzdWx0LCBzdGF0dXNDb2RlIH0gPSBhd2FpdCBzZXJ2ZXIuaW5qZWN0KHBhdGgpO1xuICB0LmlzKHN0YXR1c0NvZGUsIFNUQVRVU19PSyk7XG4gIHQuaXMocmVzdWx0LmlkLCB0ZWFtMS5pZCk7XG5cbiAgY29uc3QgcGxheWVySWRzID0gcmVzdWx0LlBsYXllcnMubWFwKCh7IGlkIH0pID0+IGlkKTtcbiAgdC50cnV0aHkocGxheWVySWRzLmluY2x1ZGVzKHBsYXllcjEuaWQpKTtcbiAgdC50cnV0aHkocGxheWVySWRzLmluY2x1ZGVzKHBsYXllcjIuaWQpKTtcbn0pO1xuXG50ZXN0KCdoYXNNYW55IC90ZWFtP2luY2x1ZGU9cGxheWVycycsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc2VydmVyLCBpbnN0YW5jZXMgfSA9IHQuY29udGV4dDtcbiAgY29uc3QgeyB0ZWFtMSwgcGxheWVyMSwgcGxheWVyMiB9ID0gaW5zdGFuY2VzO1xuICBjb25zdCBwYXRoID0gYC90ZWFtLyR7dGVhbTEuaWR9P2luY2x1ZGU9cGxheWVyc2A7XG5cbiAgY29uc3QgeyByZXN1bHQsIHN0YXR1c0NvZGUgfSA9IGF3YWl0IHNlcnZlci5pbmplY3QocGF0aCk7XG4gIHQuaXMoc3RhdHVzQ29kZSwgU1RBVFVTX09LKTtcbiAgdC5pcyhyZXN1bHQuaWQsIHRlYW0xLmlkKTtcblxuICBjb25zdCBwbGF5ZXJJZHMgPSByZXN1bHQuUGxheWVycy5tYXAoKHsgaWQgfSkgPT4gaWQpO1xuICB0LnRydXRoeShwbGF5ZXJJZHMuaW5jbHVkZXMocGxheWVyMS5pZCkpO1xuICB0LnRydXRoeShwbGF5ZXJJZHMuaW5jbHVkZXMocGxheWVyMi5pZCkpO1xufSk7XG5cbnRlc3QoJ211bHRpcGxlIGluY2x1ZGVzIC90ZWFtP2luY2x1ZGU9cGxheWVycyZpbmNsdWRlPWNpdHknLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHNlcnZlciwgaW5zdGFuY2VzIH0gPSB0LmNvbnRleHQ7XG4gIGNvbnN0IHsgdGVhbTEsIHBsYXllcjEsIHBsYXllcjIsIGNpdHkxIH0gPSBpbnN0YW5jZXM7XG4gIGNvbnN0IHBhdGggPSBgL3RlYW0vJHt0ZWFtMS5pZH0/aW5jbHVkZT1wbGF5ZXJzJmluY2x1ZGU9Y2l0eWA7XG5cbiAgY29uc3QgeyByZXN1bHQsIHN0YXR1c0NvZGUgfSA9IGF3YWl0IHNlcnZlci5pbmplY3QocGF0aCk7XG4gIHQuaXMoc3RhdHVzQ29kZSwgU1RBVFVTX09LKTtcbiAgdC5pcyhyZXN1bHQuaWQsIHRlYW0xLmlkKTtcblxuICBjb25zdCBwbGF5ZXJJZHMgPSByZXN1bHQuUGxheWVycy5tYXAoKHsgaWQgfSkgPT4gaWQpO1xuICB0LnRydXRoeShwbGF5ZXJJZHMuaW5jbHVkZXMocGxheWVyMS5pZCkpO1xuICB0LnRydXRoeShwbGF5ZXJJZHMuaW5jbHVkZXMocGxheWVyMi5pZCkpO1xuICB0LmlzKHJlc3VsdC5DaXR5LmlkLCBjaXR5MS5pZCk7XG59KTtcblxudGVzdCgnbXVsdGlwbGUgaW5jbHVkZXMgL3RlYW0/aW5jbHVkZVtdPXBsYXllcnMmaW5jbHVkZVtdPWNpdHknLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHNlcnZlciwgaW5zdGFuY2VzIH0gPSB0LmNvbnRleHQ7XG4gIGNvbnN0IHsgdGVhbTEsIHBsYXllcjEsIHBsYXllcjIsIGNpdHkxIH0gPSBpbnN0YW5jZXM7XG4gIGNvbnN0IHBhdGggPSBgL3RlYW0vJHt0ZWFtMS5pZH0/aW5jbHVkZVtdPXBsYXllcnMmaW5jbHVkZVtdPWNpdHlgO1xuXG4gIGNvbnN0IHsgcmVzdWx0LCBzdGF0dXNDb2RlIH0gPSBhd2FpdCBzZXJ2ZXIuaW5qZWN0KHBhdGgpO1xuICB0LmlzKHN0YXR1c0NvZGUsIFNUQVRVU19PSyk7XG4gIHQuaXMocmVzdWx0LmlkLCB0ZWFtMS5pZCk7XG5cbiAgY29uc3QgcGxheWVySWRzID0gcmVzdWx0LlBsYXllcnMubWFwKCh7IGlkIH0pID0+IGlkKTtcbiAgdC50cnV0aHkocGxheWVySWRzLmluY2x1ZGVzKHBsYXllcjEuaWQpKTtcbiAgdC50cnV0aHkocGxheWVySWRzLmluY2x1ZGVzKHBsYXllcjIuaWQpKTtcbiAgdC5pcyhyZXN1bHQuQ2l0eS5pZCwgY2l0eTEuaWQpO1xufSk7XG4iXX0=