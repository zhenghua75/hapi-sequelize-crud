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
  const { server, instances, sequelize: { models: { Player } } } = t.context;
  const { player1, player2 } = instances;
  const url = `/player?name=${ player1.name }`;
  const method = 'DELETE';

  const presentPlayer = yield Player.findById(player1.id);
  t.truthy(presentPlayer);

  const { result, statusCode } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_OK);
  t.is(result.id, player1.id);

  const deletedPlayer = yield Player.findById(player1.id);
  t.falsy(deletedPlayer);
  const stillTherePlayer = yield Player.findById(player2.id);
  t.truthy(stillTherePlayer);
}

(0, _ava2.default)('destroy where /player?name=Baseball', (() => {
  var _ref = _asyncToGenerator(_ref2);

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})());

function* _ref4(t) {
  const { server, instances, sequelize: { models: { Player } } } = t.context;
  const { player1, player2 } = instances;
  const url = `/players?name=${ player1.name }`;
  const method = 'DELETE';

  const presentPlayer = yield Player.findById(player1.id);
  t.truthy(presentPlayer);

  const { result, statusCode } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_OK);
  t.is(result.id, player1.id);

  const deletedPlayer = yield Player.findById(player1.id);
  t.falsy(deletedPlayer);
  const stillTherePlayer = yield Player.findById(player2.id);
  t.truthy(stillTherePlayer);
}

(0, _ava2.default)('destroyAll where /players?name=Baseball', (() => {
  var _ref3 = _asyncToGenerator(_ref4);

  return function (_x2) {
    return _ref3.apply(this, arguments);
  };
})());

function _ref6({ id }) {
  return id;
}

function _ref7({ id }) {
  return id;
}

function* _ref8(t) {
  const { server, instances, sequelize: { models: { Player } } } = t.context;
  const { player1, player2 } = instances;
  const url = '/players';
  const method = 'DELETE';

  const presentPlayers = yield Player.findAll();
  const playerIds = presentPlayers.map(_ref6);
  t.truthy(playerIds.includes(player1.id));
  t.truthy(playerIds.includes(player2.id));

  const { result, statusCode } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_OK);
  const resultPlayerIds = result.map(_ref7);
  t.truthy(resultPlayerIds.includes(player1.id));
  t.truthy(resultPlayerIds.includes(player2.id));

  const deletedPlayers = yield Player.findAll();
  t.is(deletedPlayers.length, 0);
}

(0, _ava2.default)('destroyAll /players', (() => {
  var _ref5 = _asyncToGenerator(_ref8);

  return function (_x3) {
    return _ref5.apply(this, arguments);
  };
})());

function _ref10({ id }) {
  return id;
}

function* _ref11(t) {
  const { server, instances, sequelize: { models: { Player } } } = t.context;
  const { player1, player2 } = instances;
  // this doesn't exist in our fixtures
  const url = '/player/10';
  const method = 'DELETE';

  const presentPlayers = yield Player.findAll();
  const playerIds = presentPlayers.map(_ref10);
  t.truthy(playerIds.includes(player1.id));
  t.truthy(playerIds.includes(player2.id));

  const { statusCode } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_NOT_FOUND);

  const nonDeletedPlayers = yield Player.findAll();
  t.is(nonDeletedPlayers.length, presentPlayers.length);
}

(0, _ava2.default)('destroy not found /player/10', (() => {
  var _ref9 = _asyncToGenerator(_ref11);

  return function (_x4) {
    return _ref9.apply(this, arguments);
  };
})());

function _ref13({ id }) {
  return id;
}

function* _ref14(t) {
  const { server, instances, sequelize: { models: { Player } } } = t.context;
  const { player1, player2 } = instances;
  // this doesn't exist in our fixtures
  const url = '/players?name=no';
  const method = 'DELETE';

  const presentPlayers = yield Player.findAll();
  const playerIds = presentPlayers.map(_ref13);
  t.truthy(playerIds.includes(player1.id));
  t.truthy(playerIds.includes(player2.id));

  const { statusCode } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_NOT_FOUND);

  const nonDeletedPlayers = yield Player.findAll();
  t.is(nonDeletedPlayers.length, presentPlayers.length);
}

(0, _ava2.default)('destroyAll not found /players?name=no', (() => {
  var _ref12 = _asyncToGenerator(_ref14);

  return function (_x5) {
    return _ref12.apply(this, arguments);
  };
})());

function* _ref16(t) {
  const { server } = t.context;
  const url = '/notamodel';
  const method = 'DELETE';

  const { statusCode } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_NOT_FOUND);
}

(0, _ava2.default)('not found /notamodel', (() => {
  var _ref15 = _asyncToGenerator(_ref16);

  return function (_x6) {
    return _ref15.apply(this, arguments);
  };
})());

function _ref18({ id }) {
  return id;
}

function* _ref19(t) {
  const { server, instances, sequelize: { models: { Player } } } = t.context;
  const { player1, player2 } = instances;
  // this doesn't exist in our fixtures
  const url = '/players/returnsOne';
  const method = 'DELETE';

  const presentPlayers = yield Player.findAll();
  const playerIds = presentPlayers.map(_ref18);
  t.truthy(playerIds.includes(player1.id));
  t.truthy(playerIds.includes(player2.id));

  const { result, statusCode } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_OK);
  t.is(result.id, player1.id);

  const nonDeletedPlayers = yield Player.findAll();
  t.is(nonDeletedPlayers.length, presentPlayers.length - 1);
}

(0, _ava2.default)('destroyScope /players/returnsOne', (() => {
  var _ref17 = _asyncToGenerator(_ref19);

  return function (_x7) {
    return _ref17.apply(this, arguments);
  };
})());

function _ref21({ id }) {
  return id;
}

function _ref22({ id }) {
  return id;
}

function* _ref23(t) {
  const { server, instances, sequelize: { models: { Player } } } = t.context;
  const { player1, player2 } = instances;
  // this doesn't exist in our fixtures
  const url = '/players/returnsNone';
  const method = 'DELETE';

  const presentPlayers = yield Player.findAll();
  const playerIds = presentPlayers.map(_ref21);
  t.truthy(playerIds.includes(player1.id));
  t.truthy(playerIds.includes(player2.id));

  const { statusCode } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_NOT_FOUND);

  const nonDeletedPlayers = yield Player.findAll();
  const nonDeletedPlayerIds = nonDeletedPlayers.map(_ref22);
  t.truthy(nonDeletedPlayerIds.includes(player1.id));
  t.truthy(nonDeletedPlayerIds.includes(player2.id));
}

(0, _ava2.default)('destroyScope /players/returnsNone', (() => {
  var _ref20 = _asyncToGenerator(_ref23);

  return function (_x8) {
    return _ref20.apply(this, arguments);
  };
})());

function _ref25({ id }) {
  return id;
}

function _ref26({ id }) {
  return id;
}

function* _ref27(t) {
  const { server, instances, sequelize: { models: { Player } } } = t.context;
  const { player1, player2 } = instances;
  // this doesn't exist in our fixtures
  const url = '/players/invalid';
  const method = 'DELETE';

  const presentPlayers = yield Player.findAll();
  const playerIds = presentPlayers.map(_ref25);
  t.truthy(playerIds.includes(player1.id));
  t.truthy(playerIds.includes(player2.id));

  const { statusCode } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_BAD_REQUEST);

  const nonDeletedPlayers = yield Player.findAll();
  const nonDeletedPlayerIds = nonDeletedPlayers.map(_ref26);
  t.truthy(nonDeletedPlayerIds.includes(player1.id));
  t.truthy(nonDeletedPlayerIds.includes(player2.id));
}

(0, _ava2.default)('destroyScope invalid scope /players/invalid', (() => {
  var _ref24 = _asyncToGenerator(_ref27);

  return function (_x9) {
    return _ref24.apply(this, arguments);
  };
})());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcnVkLWRlc3Ryb3kuaW50ZWdyYXRpb24udGVzdC5qcyJdLCJuYW1lcyI6WyJTVEFUVVNfT0siLCJTVEFUVVNfTk9UX0ZPVU5EIiwiU1RBVFVTX0JBRF9SRVFVRVNUIiwidCIsInNlcnZlciIsImluc3RhbmNlcyIsInNlcXVlbGl6ZSIsIm1vZGVscyIsIlBsYXllciIsImNvbnRleHQiLCJwbGF5ZXIxIiwicGxheWVyMiIsInVybCIsIm5hbWUiLCJtZXRob2QiLCJwcmVzZW50UGxheWVyIiwiZmluZEJ5SWQiLCJpZCIsInRydXRoeSIsInJlc3VsdCIsInN0YXR1c0NvZGUiLCJpbmplY3QiLCJpcyIsImRlbGV0ZWRQbGF5ZXIiLCJmYWxzeSIsInN0aWxsVGhlcmVQbGF5ZXIiLCJwcmVzZW50UGxheWVycyIsImZpbmRBbGwiLCJwbGF5ZXJJZHMiLCJtYXAiLCJpbmNsdWRlcyIsInJlc3VsdFBsYXllcklkcyIsImRlbGV0ZWRQbGF5ZXJzIiwibGVuZ3RoIiwibm9uRGVsZXRlZFBsYXllcnMiLCJub25EZWxldGVkUGxheWVySWRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUEsTUFBTUEsWUFBWSxHQUFsQjtBQUNBLE1BQU1DLG1CQUFtQixHQUF6QjtBQUNBLE1BQU1DLHFCQUFxQixHQUEzQjs7QUFFQTs7QUFFNEMsZ0JBQU9DLENBQVAsRUFBYTtBQUN2RCxRQUFNLEVBQUVDLE1BQUYsRUFBVUMsU0FBVixFQUFxQkMsV0FBVyxFQUFFQyxRQUFRLEVBQUVDLE1BQUYsRUFBVixFQUFoQyxLQUEyREwsRUFBRU0sT0FBbkU7QUFDQSxRQUFNLEVBQUVDLE9BQUYsRUFBV0MsT0FBWCxLQUF1Qk4sU0FBN0I7QUFDQSxRQUFNTyxNQUFPLGlCQUFlRixRQUFRRyxJQUFLLEdBQXpDO0FBQ0EsUUFBTUMsU0FBUyxRQUFmOztBQUVBLFFBQU1DLGdCQUFnQixNQUFNUCxPQUFPUSxRQUFQLENBQWdCTixRQUFRTyxFQUF4QixDQUE1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QixPQUFPbUIsT0FBUCxFQUFoQztBQUNBLFFBQU1RLHNCQUFzQkQsa0JBQWtCTCxHQUFsQixRQUE1QjtBQUNBMUIsSUFBRWUsTUFBRixDQUFTaUIsb0JBQW9CTCxRQUFwQixDQUE2QnBCLFFBQVFPLEVBQXJDLENBQVQ7QUFDQWQsSUFBRWUsTUFBRixDQUFTaUIsb0JBQW9CTCxRQUFwQixDQUE2Qm5CLFFBQVFNLEVBQXJDLENBQVQ7QUFDRDs7QUFuQkQsbUJBQUssNkNBQUw7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJjcnVkLWRlc3Ryb3kuaW50ZWdyYXRpb24udGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0ZXN0IGZyb20gJ2F2YSc7XG5pbXBvcnQgJ3Npbm9uLWJsdWViaXJkJztcbmltcG9ydCBzZXR1cCBmcm9tICcuLi90ZXN0L2ludGVncmF0aW9uLXNldHVwLmpzJztcblxuY29uc3QgU1RBVFVTX09LID0gMjAwO1xuY29uc3QgU1RBVFVTX05PVF9GT1VORCA9IDQwNDtcbmNvbnN0IFNUQVRVU19CQURfUkVRVUVTVCA9IDQwMDtcblxuc2V0dXAodGVzdCk7XG5cbnRlc3QoJ2Rlc3Ryb3kgd2hlcmUgL3BsYXllcj9uYW1lPUJhc2ViYWxsJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzZXJ2ZXIsIGluc3RhbmNlcywgc2VxdWVsaXplOiB7IG1vZGVsczogeyBQbGF5ZXIgfSB9IH0gPSB0LmNvbnRleHQ7XG4gIGNvbnN0IHsgcGxheWVyMSwgcGxheWVyMiB9ID0gaW5zdGFuY2VzO1xuICBjb25zdCB1cmwgPSBgL3BsYXllcj9uYW1lPSR7cGxheWVyMS5uYW1lfWA7XG4gIGNvbnN0IG1ldGhvZCA9ICdERUxFVEUnO1xuXG4gIGNvbnN0IHByZXNlbnRQbGF5ZXIgPSBhd2FpdCBQbGF5ZXIuZmluZEJ5SWQocGxheWVyMS5pZCk7XG4gIHQudHJ1dGh5KHByZXNlbnRQbGF5ZXIpO1xuXG4gIGNvbnN0IHsgcmVzdWx0LCBzdGF0dXNDb2RlIH0gPSBhd2FpdCBzZXJ2ZXIuaW5qZWN0KHsgdXJsLCBtZXRob2QgfSk7XG4gIHQuaXMoc3RhdHVzQ29kZSwgU1RBVFVTX09LKTtcbiAgdC5pcyhyZXN1bHQuaWQsIHBsYXllcjEuaWQpO1xuXG4gIGNvbnN0IGRlbGV0ZWRQbGF5ZXIgPSBhd2FpdCBQbGF5ZXIuZmluZEJ5SWQocGxheWVyMS5pZCk7XG4gIHQuZmFsc3koZGVsZXRlZFBsYXllcik7XG4gIGNvbnN0IHN0aWxsVGhlcmVQbGF5ZXIgPSBhd2FpdCBQbGF5ZXIuZmluZEJ5SWQocGxheWVyMi5pZCk7XG4gIHQudHJ1dGh5KHN0aWxsVGhlcmVQbGF5ZXIpO1xufSk7XG5cbnRlc3QoJ2Rlc3Ryb3lBbGwgd2hlcmUgL3BsYXllcnM/bmFtZT1CYXNlYmFsbCcsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc2VydmVyLCBpbnN0YW5jZXMsIHNlcXVlbGl6ZTogeyBtb2RlbHM6IHsgUGxheWVyIH0gfSB9ID0gdC5jb250ZXh0O1xuICBjb25zdCB7IHBsYXllcjEsIHBsYXllcjIgfSA9IGluc3RhbmNlcztcbiAgY29uc3QgdXJsID0gYC9wbGF5ZXJzP25hbWU9JHtwbGF5ZXIxLm5hbWV9YDtcbiAgY29uc3QgbWV0aG9kID0gJ0RFTEVURSc7XG5cbiAgY29uc3QgcHJlc2VudFBsYXllciA9IGF3YWl0IFBsYXllci5maW5kQnlJZChwbGF5ZXIxLmlkKTtcbiAgdC50cnV0aHkocHJlc2VudFBsYXllcik7XG5cbiAgY29uc3QgeyByZXN1bHQsIHN0YXR1c0NvZGUgfSA9IGF3YWl0IHNlcnZlci5pbmplY3QoeyB1cmwsIG1ldGhvZCB9KTtcbiAgdC5pcyhzdGF0dXNDb2RlLCBTVEFUVVNfT0spO1xuICB0LmlzKHJlc3VsdC5pZCwgcGxheWVyMS5pZCk7XG5cbiAgY29uc3QgZGVsZXRlZFBsYXllciA9IGF3YWl0IFBsYXllci5maW5kQnlJZChwbGF5ZXIxLmlkKTtcbiAgdC5mYWxzeShkZWxldGVkUGxheWVyKTtcbiAgY29uc3Qgc3RpbGxUaGVyZVBsYXllciA9IGF3YWl0IFBsYXllci5maW5kQnlJZChwbGF5ZXIyLmlkKTtcbiAgdC50cnV0aHkoc3RpbGxUaGVyZVBsYXllcik7XG59KTtcblxudGVzdCgnZGVzdHJveUFsbCAvcGxheWVycycsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc2VydmVyLCBpbnN0YW5jZXMsIHNlcXVlbGl6ZTogeyBtb2RlbHM6IHsgUGxheWVyIH0gfSB9ID0gdC5jb250ZXh0O1xuICBjb25zdCB7IHBsYXllcjEsIHBsYXllcjIgfSA9IGluc3RhbmNlcztcbiAgY29uc3QgdXJsID0gJy9wbGF5ZXJzJztcbiAgY29uc3QgbWV0aG9kID0gJ0RFTEVURSc7XG5cbiAgY29uc3QgcHJlc2VudFBsYXllcnMgPSBhd2FpdCBQbGF5ZXIuZmluZEFsbCgpO1xuICBjb25zdCBwbGF5ZXJJZHMgPSBwcmVzZW50UGxheWVycy5tYXAoKHsgaWQgfSkgPT4gaWQpO1xuICB0LnRydXRoeShwbGF5ZXJJZHMuaW5jbHVkZXMocGxheWVyMS5pZCkpO1xuICB0LnRydXRoeShwbGF5ZXJJZHMuaW5jbHVkZXMocGxheWVyMi5pZCkpO1xuXG4gIGNvbnN0IHsgcmVzdWx0LCBzdGF0dXNDb2RlIH0gPSBhd2FpdCBzZXJ2ZXIuaW5qZWN0KHsgdXJsLCBtZXRob2QgfSk7XG4gIHQuaXMoc3RhdHVzQ29kZSwgU1RBVFVTX09LKTtcbiAgY29uc3QgcmVzdWx0UGxheWVySWRzID0gcmVzdWx0Lm1hcCgoeyBpZCB9KSA9PiBpZCk7XG4gIHQudHJ1dGh5KHJlc3VsdFBsYXllcklkcy5pbmNsdWRlcyhwbGF5ZXIxLmlkKSk7XG4gIHQudHJ1dGh5KHJlc3VsdFBsYXllcklkcy5pbmNsdWRlcyhwbGF5ZXIyLmlkKSk7XG5cbiAgY29uc3QgZGVsZXRlZFBsYXllcnMgPSBhd2FpdCBQbGF5ZXIuZmluZEFsbCgpO1xuICB0LmlzKGRlbGV0ZWRQbGF5ZXJzLmxlbmd0aCwgMCk7XG59KTtcblxudGVzdCgnZGVzdHJveSBub3QgZm91bmQgL3BsYXllci8xMCcsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc2VydmVyLCBpbnN0YW5jZXMsIHNlcXVlbGl6ZTogeyBtb2RlbHM6IHsgUGxheWVyIH0gfSB9ID0gdC5jb250ZXh0O1xuICBjb25zdCB7IHBsYXllcjEsIHBsYXllcjIgfSA9IGluc3RhbmNlcztcbiAgLy8gdGhpcyBkb2Vzbid0IGV4aXN0IGluIG91ciBmaXh0dXJlc1xuICBjb25zdCB1cmwgPSAnL3BsYXllci8xMCc7XG4gIGNvbnN0IG1ldGhvZCA9ICdERUxFVEUnO1xuXG4gIGNvbnN0IHByZXNlbnRQbGF5ZXJzID0gYXdhaXQgUGxheWVyLmZpbmRBbGwoKTtcbiAgY29uc3QgcGxheWVySWRzID0gcHJlc2VudFBsYXllcnMubWFwKCh7IGlkIH0pID0+IGlkKTtcbiAgdC50cnV0aHkocGxheWVySWRzLmluY2x1ZGVzKHBsYXllcjEuaWQpKTtcbiAgdC50cnV0aHkocGxheWVySWRzLmluY2x1ZGVzKHBsYXllcjIuaWQpKTtcblxuICBjb25zdCB7IHN0YXR1c0NvZGUgfSA9IGF3YWl0IHNlcnZlci5pbmplY3QoeyB1cmwsIG1ldGhvZCB9KTtcbiAgdC5pcyhzdGF0dXNDb2RlLCBTVEFUVVNfTk9UX0ZPVU5EKTtcblxuICBjb25zdCBub25EZWxldGVkUGxheWVycyA9IGF3YWl0IFBsYXllci5maW5kQWxsKCk7XG4gIHQuaXMobm9uRGVsZXRlZFBsYXllcnMubGVuZ3RoLCBwcmVzZW50UGxheWVycy5sZW5ndGgpO1xufSk7XG5cbnRlc3QoJ2Rlc3Ryb3lBbGwgbm90IGZvdW5kIC9wbGF5ZXJzP25hbWU9bm8nLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHNlcnZlciwgaW5zdGFuY2VzLCBzZXF1ZWxpemU6IHsgbW9kZWxzOiB7IFBsYXllciB9IH0gfSA9IHQuY29udGV4dDtcbiAgY29uc3QgeyBwbGF5ZXIxLCBwbGF5ZXIyIH0gPSBpbnN0YW5jZXM7XG4gIC8vIHRoaXMgZG9lc24ndCBleGlzdCBpbiBvdXIgZml4dHVyZXNcbiAgY29uc3QgdXJsID0gJy9wbGF5ZXJzP25hbWU9bm8nO1xuICBjb25zdCBtZXRob2QgPSAnREVMRVRFJztcblxuICBjb25zdCBwcmVzZW50UGxheWVycyA9IGF3YWl0IFBsYXllci5maW5kQWxsKCk7XG4gIGNvbnN0IHBsYXllcklkcyA9IHByZXNlbnRQbGF5ZXJzLm1hcCgoeyBpZCB9KSA9PiBpZCk7XG4gIHQudHJ1dGh5KHBsYXllcklkcy5pbmNsdWRlcyhwbGF5ZXIxLmlkKSk7XG4gIHQudHJ1dGh5KHBsYXllcklkcy5pbmNsdWRlcyhwbGF5ZXIyLmlkKSk7XG5cbiAgY29uc3QgeyBzdGF0dXNDb2RlIH0gPSBhd2FpdCBzZXJ2ZXIuaW5qZWN0KHsgdXJsLCBtZXRob2QgfSk7XG4gIHQuaXMoc3RhdHVzQ29kZSwgU1RBVFVTX05PVF9GT1VORCk7XG5cbiAgY29uc3Qgbm9uRGVsZXRlZFBsYXllcnMgPSBhd2FpdCBQbGF5ZXIuZmluZEFsbCgpO1xuICB0LmlzKG5vbkRlbGV0ZWRQbGF5ZXJzLmxlbmd0aCwgcHJlc2VudFBsYXllcnMubGVuZ3RoKTtcbn0pO1xuXG50ZXN0KCdub3QgZm91bmQgL25vdGFtb2RlbCcsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc2VydmVyIH0gPSB0LmNvbnRleHQ7XG4gIGNvbnN0IHVybCA9ICcvbm90YW1vZGVsJztcbiAgY29uc3QgbWV0aG9kID0gJ0RFTEVURSc7XG5cbiAgY29uc3QgeyBzdGF0dXNDb2RlIH0gPSBhd2FpdCBzZXJ2ZXIuaW5qZWN0KHsgdXJsLCBtZXRob2QgfSk7XG4gIHQuaXMoc3RhdHVzQ29kZSwgU1RBVFVTX05PVF9GT1VORCk7XG59KTtcblxudGVzdCgnZGVzdHJveVNjb3BlIC9wbGF5ZXJzL3JldHVybnNPbmUnLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHNlcnZlciwgaW5zdGFuY2VzLCBzZXF1ZWxpemU6IHsgbW9kZWxzOiB7IFBsYXllciB9IH0gfSA9IHQuY29udGV4dDtcbiAgY29uc3QgeyBwbGF5ZXIxLCBwbGF5ZXIyIH0gPSBpbnN0YW5jZXM7XG4gIC8vIHRoaXMgZG9lc24ndCBleGlzdCBpbiBvdXIgZml4dHVyZXNcbiAgY29uc3QgdXJsID0gJy9wbGF5ZXJzL3JldHVybnNPbmUnO1xuICBjb25zdCBtZXRob2QgPSAnREVMRVRFJztcblxuICBjb25zdCBwcmVzZW50UGxheWVycyA9IGF3YWl0IFBsYXllci5maW5kQWxsKCk7XG4gIGNvbnN0IHBsYXllcklkcyA9IHByZXNlbnRQbGF5ZXJzLm1hcCgoeyBpZCB9KSA9PiBpZCk7XG4gIHQudHJ1dGh5KHBsYXllcklkcy5pbmNsdWRlcyhwbGF5ZXIxLmlkKSk7XG4gIHQudHJ1dGh5KHBsYXllcklkcy5pbmNsdWRlcyhwbGF5ZXIyLmlkKSk7XG5cbiAgY29uc3QgeyByZXN1bHQsIHN0YXR1c0NvZGUgfSA9IGF3YWl0IHNlcnZlci5pbmplY3QoeyB1cmwsIG1ldGhvZCB9KTtcbiAgdC5pcyhzdGF0dXNDb2RlLCBTVEFUVVNfT0spO1xuICB0LmlzKHJlc3VsdC5pZCwgcGxheWVyMS5pZCk7XG5cbiAgY29uc3Qgbm9uRGVsZXRlZFBsYXllcnMgPSBhd2FpdCBQbGF5ZXIuZmluZEFsbCgpO1xuICB0LmlzKG5vbkRlbGV0ZWRQbGF5ZXJzLmxlbmd0aCwgcHJlc2VudFBsYXllcnMubGVuZ3RoIC0gMSk7XG59KTtcblxudGVzdCgnZGVzdHJveVNjb3BlIC9wbGF5ZXJzL3JldHVybnNOb25lJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzZXJ2ZXIsIGluc3RhbmNlcywgc2VxdWVsaXplOiB7IG1vZGVsczogeyBQbGF5ZXIgfSB9IH0gPSB0LmNvbnRleHQ7XG4gIGNvbnN0IHsgcGxheWVyMSwgcGxheWVyMiB9ID0gaW5zdGFuY2VzO1xuICAvLyB0aGlzIGRvZXNuJ3QgZXhpc3QgaW4gb3VyIGZpeHR1cmVzXG4gIGNvbnN0IHVybCA9ICcvcGxheWVycy9yZXR1cm5zTm9uZSc7XG4gIGNvbnN0IG1ldGhvZCA9ICdERUxFVEUnO1xuXG4gIGNvbnN0IHByZXNlbnRQbGF5ZXJzID0gYXdhaXQgUGxheWVyLmZpbmRBbGwoKTtcbiAgY29uc3QgcGxheWVySWRzID0gcHJlc2VudFBsYXllcnMubWFwKCh7IGlkIH0pID0+IGlkKTtcbiAgdC50cnV0aHkocGxheWVySWRzLmluY2x1ZGVzKHBsYXllcjEuaWQpKTtcbiAgdC50cnV0aHkocGxheWVySWRzLmluY2x1ZGVzKHBsYXllcjIuaWQpKTtcblxuICBjb25zdCB7IHN0YXR1c0NvZGUgfSA9IGF3YWl0IHNlcnZlci5pbmplY3QoeyB1cmwsIG1ldGhvZCB9KTtcbiAgdC5pcyhzdGF0dXNDb2RlLCBTVEFUVVNfTk9UX0ZPVU5EKTtcblxuICBjb25zdCBub25EZWxldGVkUGxheWVycyA9IGF3YWl0IFBsYXllci5maW5kQWxsKCk7XG4gIGNvbnN0IG5vbkRlbGV0ZWRQbGF5ZXJJZHMgPSBub25EZWxldGVkUGxheWVycy5tYXAoKHsgaWQgfSkgPT4gaWQpO1xuICB0LnRydXRoeShub25EZWxldGVkUGxheWVySWRzLmluY2x1ZGVzKHBsYXllcjEuaWQpKTtcbiAgdC50cnV0aHkobm9uRGVsZXRlZFBsYXllcklkcy5pbmNsdWRlcyhwbGF5ZXIyLmlkKSk7XG59KTtcblxudGVzdCgnZGVzdHJveVNjb3BlIGludmFsaWQgc2NvcGUgL3BsYXllcnMvaW52YWxpZCcsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc2VydmVyLCBpbnN0YW5jZXMsIHNlcXVlbGl6ZTogeyBtb2RlbHM6IHsgUGxheWVyIH0gfSB9ID0gdC5jb250ZXh0O1xuICBjb25zdCB7IHBsYXllcjEsIHBsYXllcjIgfSA9IGluc3RhbmNlcztcbiAgLy8gdGhpcyBkb2Vzbid0IGV4aXN0IGluIG91ciBmaXh0dXJlc1xuICBjb25zdCB1cmwgPSAnL3BsYXllcnMvaW52YWxpZCc7XG4gIGNvbnN0IG1ldGhvZCA9ICdERUxFVEUnO1xuXG4gIGNvbnN0IHByZXNlbnRQbGF5ZXJzID0gYXdhaXQgUGxheWVyLmZpbmRBbGwoKTtcbiAgY29uc3QgcGxheWVySWRzID0gcHJlc2VudFBsYXllcnMubWFwKCh7IGlkIH0pID0+IGlkKTtcbiAgdC50cnV0aHkocGxheWVySWRzLmluY2x1ZGVzKHBsYXllcjEuaWQpKTtcbiAgdC50cnV0aHkocGxheWVySWRzLmluY2x1ZGVzKHBsYXllcjIuaWQpKTtcblxuICBjb25zdCB7IHN0YXR1c0NvZGUgfSA9IGF3YWl0IHNlcnZlci5pbmplY3QoeyB1cmwsIG1ldGhvZCB9KTtcbiAgdC5pcyhzdGF0dXNDb2RlLCBTVEFUVVNfQkFEX1JFUVVFU1QpO1xuXG4gIGNvbnN0IG5vbkRlbGV0ZWRQbGF5ZXJzID0gYXdhaXQgUGxheWVyLmZpbmRBbGwoKTtcbiAgY29uc3Qgbm9uRGVsZXRlZFBsYXllcklkcyA9IG5vbkRlbGV0ZWRQbGF5ZXJzLm1hcCgoeyBpZCB9KSA9PiBpZCk7XG4gIHQudHJ1dGh5KG5vbkRlbGV0ZWRQbGF5ZXJJZHMuaW5jbHVkZXMocGxheWVyMS5pZCkpO1xuICB0LnRydXRoeShub25EZWxldGVkUGxheWVySWRzLmluY2x1ZGVzKHBsYXllcjIuaWQpKTtcbn0pO1xuIl19