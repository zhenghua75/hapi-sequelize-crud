'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

require('sinon-bluebird');

var _integrationSetup = require('../test/integration-setup.js');

var _integrationSetup2 = _interopRequireDefault(_integrationSetup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const STATUS_OK = 200;
const STATUS_BAD_QUERY = 502;

(0, _integrationSetup2.default)(_ava2.default);

function* _ref2(t) {
  const { server, instances } = t.context;
  const { player1, player2, player3 } = instances;
  const url = '/players?order=name';
  const method = 'GET';

  const { result, statusCode } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_OK);
  // this is the order we'd expect the names to be in
  t.is(result[0].name, player1.name);
  t.is(result[1].name, player2.name);
  t.is(result[2].name, player3.name);
}

(0, _ava2.default)('/players?order=name', (() => {
  var _ref = _asyncToGenerator(_ref2);

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})());

function* _ref4(t) {
  const { server, instances } = t.context;
  const { player1, player2, player3 } = instances;
  const url = '/players?order=name%20ASC';
  const method = 'GET';

  const { result, statusCode } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_OK);
  // this is the order we'd expect the names to be in
  t.is(result[0].name, player1.name);
  t.is(result[1].name, player2.name);
  t.is(result[2].name, player3.name);
}

(0, _ava2.default)('/players?order=name%20ASC', (() => {
  var _ref3 = _asyncToGenerator(_ref4);

  return function (_x2) {
    return _ref3.apply(this, arguments);
  };
})());

function* _ref6(t) {
  const { server, instances } = t.context;
  const { player1, player2, player3 } = instances;
  const url = '/players?order=name%20DESC';
  const method = 'GET';

  const { result, statusCode } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_OK);
  // this is the order we'd expect the names to be in
  t.is(result[0].name, player3.name);
  t.is(result[1].name, player2.name);
  t.is(result[2].name, player1.name);
}

(0, _ava2.default)('/players?order=name%20DESC', (() => {
  var _ref5 = _asyncToGenerator(_ref6);

  return function (_x3) {
    return _ref5.apply(this, arguments);
  };
})());

function* _ref8(t) {
  const { server, instances } = t.context;
  const { player1, player2, player3 } = instances;
  const url = '/players?order[]=name';
  const method = 'GET';

  const { result, statusCode } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_OK);
  // this is the order we'd expect the names to be in
  t.is(result[0].name, player1.name);
  t.is(result[1].name, player2.name);
  t.is(result[2].name, player3.name);
}

(0, _ava2.default)('/players?order[]=name', (() => {
  var _ref7 = _asyncToGenerator(_ref8);

  return function (_x4) {
    return _ref7.apply(this, arguments);
  };
})());

function* _ref10(t) {
  const { server, instances } = t.context;
  const { player1, player2, player3 } = instances;
  const url = '/players?order[0]=name&order[0]=DESC';
  const method = 'GET';

  const { result, statusCode } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_OK);
  // this is the order we'd expect the names to be in
  t.is(result[0].name, player3.name);
  t.is(result[1].name, player2.name);
  t.is(result[2].name, player1.name);
}

(0, _ava2.default)('/players?order[0]=name&order[0]=DESC', (() => {
  var _ref9 = _asyncToGenerator(_ref10);

  return function (_x5) {
    return _ref9.apply(this, arguments);
  };
})());

// multiple sorts

function* _ref12(t) {
  const { server, instances } = t.context;
  const { player1, player2, player3 } = instances;
  const url = '/players?order[0]=name&order[0]=DESC&order[1]=teamId&order[1]=DESC';
  const method = 'GET';

  const { result, statusCode } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_OK);
  // this is the order we'd expect the names to be in
  t.is(result[0].name, player3.name);
  t.is(result[1].name, player2.name);
  t.is(result[2].name, player1.name);
}

(0, _ava2.default)('/players?order[0]=active&order[0]=DESC&order[1]=name&order[1]=DESC', (() => {
  var _ref11 = _asyncToGenerator(_ref12);

  return function (_x6) {
    return _ref11.apply(this, arguments);
  };
})());

// this will fail b/c sequelize doesn't correctly do the join when you pass
// an order. There are many issues for this:
// eslint-disable-next-line
// https://github.com/sequelize/sequelize/issues?utf8=%E2%9C%93&q=is%3Aissue%20is%3Aopen%20order%20join%20
//
// https://github.com/sequelize/sequelize/issues/5353 is a good example
// if this test passes, that's great! Just remove the workaround note in the
// docs
// eslint-disable-next-line

function* _ref14(t) {
  const { server, instances } = t.context;
  const { player1, player2, player3 } = instances;
  const url = '/players?order[0]={"model":"Team"}&order[0]=name&order[0]=DESC';
  const method = 'GET';

  const { result, statusCode } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_OK);
  // this is the order we'd expect the names to be in
  t.is(result[0].name, player3.name);
  t.is(result[1].name, player1.name);
  t.is(result[2].name, player2.name);
}

_ava2.default.failing('sequelize bug /players?order[0]={"model":"Team"}&order[0]=name&order[0]=DESC', (() => {
  var _ref13 = _asyncToGenerator(_ref14);

  return function (_x7) {
    return _ref13.apply(this, arguments);
  };
})());

// b/c the above fails, this is a work-around

function* _ref16(t) {
  const { server, instances } = t.context;
  const { player1, player2, player3 } = instances;
  const url = '/players?order[0]={"model":"Team"}&order[0]=name&order[0]=DESC&include=team';
  const method = 'GET';

  const { result, statusCode } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_OK);
  // this is the order we'd expect the names to be in
  t.is(result[0].name, player3.name);
  t.is(result[1].name, player1.name);
  t.is(result[2].name, player2.name);
}

(0, _ava2.default)('/players?order[0]={"model":"Team"}&order[0]=name&order[0]=DESC&include=team', (() => {
  var _ref15 = _asyncToGenerator(_ref16);

  return function (_x8) {
    return _ref15.apply(this, arguments);
  };
})());

function* _ref18(t) {
  const { server } = t.context;
  const url = '/players?order[]=invalid';
  const method = 'GET';

  const { statusCode, result } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_BAD_QUERY);
  t.truthy(result.message.includes('invalid'));
}

(0, _ava2.default)('invalid column /players?order[0]=invalid', (() => {
  var _ref17 = _asyncToGenerator(_ref18);

  return function (_x9) {
    return _ref17.apply(this, arguments);
  };
})());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcnVkLWxpc3Qtb3JkZXIuaW50ZWdyYXRpb24udGVzdC5qcyJdLCJuYW1lcyI6WyJTVEFUVVNfT0siLCJTVEFUVVNfQkFEX1FVRVJZIiwidCIsInNlcnZlciIsImluc3RhbmNlcyIsImNvbnRleHQiLCJwbGF5ZXIxIiwicGxheWVyMiIsInBsYXllcjMiLCJ1cmwiLCJtZXRob2QiLCJyZXN1bHQiLCJzdGF0dXNDb2RlIiwiaW5qZWN0IiwiaXMiLCJuYW1lIiwiZmFpbGluZyIsInRydXRoeSIsIm1lc3NhZ2UiLCJpbmNsdWRlcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLE1BQU1BLFlBQVksR0FBbEI7QUFDQSxNQUFNQyxtQkFBbUIsR0FBekI7O0FBRUE7O0FBRTRCLGdCQUFPQyxDQUFQLEVBQWE7QUFDdkMsUUFBTSxFQUFFQyxNQUFGLEVBQVVDLFNBQVYsS0FBd0JGLEVBQUVHLE9BQWhDO0FBQ0EsUUFBTSxFQUFFQyxPQUFGLEVBQVdDLE9BQVgsRUFBb0JDLE9BQXBCLEtBQWdDSixTQUF0QztBQUNBLFFBQU1LLE1BQU0scUJBQVo7QUFDQSxRQUFNQyxTQUFTLEtBQWY7O0FBRUEsUUFBTSxFQUFFQyxNQUFGLEVBQVVDLFVBQVYsS0FBeUIsTUFBTVQsT0FBT1UsTUFBUCxDQUFjLEVBQUVKLEdBQUYsRUFBT0MsTUFBUCxFQUFkLENBQXJDO0FBQ0FSLElBQUVZLEVBQUYsQ0FBS0YsVUFBTCxFQUFpQlosU0FBakI7QUFDQTtBQUNBRSxJQUFFWSxFQUFGLENBQUtILE9BQU8sQ0FBUCxFQUFVSSxJQUFmLEVBQXFCVCxRQUFRUyxJQUE3QjtBQUNBYixJQUFFWSxFQUFGLENBQUtILE9BQU8sQ0FBUCxFQUFVSSxJQUFmLEVBQXFCUixRQUFRUSxJQUE3QjtBQUNBYixJQUFFWSxFQUFGLENBQUtILE9BQU8sQ0FBUCxFQUFVSSxJQUFmLEVBQXFCUCxRQUFRTyxJQUE3QjtBQUNEOztBQVpELG1CQUFLLHFCQUFMO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBY2tDLGdCQUFPYixDQUFQLEVBQWE7QUFDN0MsUUFBTSxFQUFFQyxNQUFGLEVBQVVDLFNBQVYsS0FBd0JGLEVBQUVHLE9BQWhDO0FBQ0EsUUFBTSxFQUFFQyxPQUFGLEVBQVdDLE9BQVgsRUFBb0JDLE9BQXBCLEtBQWdDSixTQUF0QztBQUNBLFFBQU1LLE1BQU0sMkJBQVo7QUFDQSxRQUFNQyxTQUFTLEtBQWY7O0FBRUEsUUFBTSxFQUFFQyxNQUFGLEVBQVVDLFVBQVYsS0FBeUIsTUFBTVQsT0FBT1UsTUFBUCxDQUFjLEVBQUVKLEdBQUYsRUFBT0MsTUFBUCxFQUFkLENBQXJDO0FBQ0FSLElBQUVZLEVBQUYsQ0FBS0YsVUFBTCxFQUFpQlosU0FBakI7QUFDQTtBQUNBRSxJQUFFWSxFQUFGLENBQUtILE9BQU8sQ0FBUCxFQUFVSSxJQUFmLEVBQXFCVCxRQUFRUyxJQUE3QjtBQUNBYixJQUFFWSxFQUFGLENBQUtILE9BQU8sQ0FBUCxFQUFVSSxJQUFmLEVBQXFCUixRQUFRUSxJQUE3QjtBQUNBYixJQUFFWSxFQUFGLENBQUtILE9BQU8sQ0FBUCxFQUFVSSxJQUFmLEVBQXFCUCxRQUFRTyxJQUE3QjtBQUNEOztBQVpELG1CQUFLLDJCQUFMO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBY21DLGdCQUFPYixDQUFQLEVBQWE7QUFDOUMsUUFBTSxFQUFFQyxNQUFGLEVBQVVDLFNBQVYsS0FBd0JGLEVBQUVHLE9BQWhDO0FBQ0EsUUFBTSxFQUFFQyxPQUFGLEVBQVdDLE9BQVgsRUFBb0JDLE9BQXBCLEtBQWdDSixTQUF0QztBQUNBLFFBQU1LLE1BQU0sNEJBQVo7QUFDQSxRQUFNQyxTQUFTLEtBQWY7O0FBRUEsUUFBTSxFQUFFQyxNQUFGLEVBQVVDLFVBQVYsS0FBeUIsTUFBTVQsT0FBT1UsTUFBUCxDQUFjLEVBQUVKLEdBQUYsRUFBT0MsTUFBUCxFQUFkLENBQXJDO0FBQ0FSLElBQUVZLEVBQUYsQ0FBS0YsVUFBTCxFQUFpQlosU0FBakI7QUFDQTtBQUNBRSxJQUFFWSxFQUFGLENBQUtILE9BQU8sQ0FBUCxFQUFVSSxJQUFmLEVBQXFCUCxRQUFRTyxJQUE3QjtBQUNBYixJQUFFWSxFQUFGLENBQUtILE9BQU8sQ0FBUCxFQUFVSSxJQUFmLEVBQXFCUixRQUFRUSxJQUE3QjtBQUNBYixJQUFFWSxFQUFGLENBQUtILE9BQU8sQ0FBUCxFQUFVSSxJQUFmLEVBQXFCVCxRQUFRUyxJQUE3QjtBQUNEOztBQVpELG1CQUFLLDRCQUFMO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBYzhCLGdCQUFPYixDQUFQLEVBQWE7QUFDekMsUUFBTSxFQUFFQyxNQUFGLEVBQVVDLFNBQVYsS0FBd0JGLEVBQUVHLE9BQWhDO0FBQ0EsUUFBTSxFQUFFQyxPQUFGLEVBQVdDLE9BQVgsRUFBb0JDLE9BQXBCLEtBQWdDSixTQUF0QztBQUNBLFFBQU1LLE1BQU0sdUJBQVo7QUFDQSxRQUFNQyxTQUFTLEtBQWY7O0FBRUEsUUFBTSxFQUFFQyxNQUFGLEVBQVVDLFVBQVYsS0FBeUIsTUFBTVQsT0FBT1UsTUFBUCxDQUFjLEVBQUVKLEdBQUYsRUFBT0MsTUFBUCxFQUFkLENBQXJDO0FBQ0FSLElBQUVZLEVBQUYsQ0FBS0YsVUFBTCxFQUFpQlosU0FBakI7QUFDQTtBQUNBRSxJQUFFWSxFQUFGLENBQUtILE9BQU8sQ0FBUCxFQUFVSSxJQUFmLEVBQXFCVCxRQUFRUyxJQUE3QjtBQUNBYixJQUFFWSxFQUFGLENBQUtILE9BQU8sQ0FBUCxFQUFVSSxJQUFmLEVBQXFCUixRQUFRUSxJQUE3QjtBQUNBYixJQUFFWSxFQUFGLENBQUtILE9BQU8sQ0FBUCxFQUFVSSxJQUFmLEVBQXFCUCxRQUFRTyxJQUE3QjtBQUNEOztBQVpELG1CQUFLLHVCQUFMO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBYzZDLGlCQUFPYixDQUFQLEVBQWE7QUFDeEQsUUFBTSxFQUFFQyxNQUFGLEVBQVVDLFNBQVYsS0FBd0JGLEVBQUVHLE9BQWhDO0FBQ0EsUUFBTSxFQUFFQyxPQUFGLEVBQVdDLE9BQVgsRUFBb0JDLE9BQXBCLEtBQWdDSixTQUF0QztBQUNBLFFBQU1LLE1BQU0sc0NBQVo7QUFDQSxRQUFNQyxTQUFTLEtBQWY7O0FBRUEsUUFBTSxFQUFFQyxNQUFGLEVBQVVDLFVBQVYsS0FBeUIsTUFBTVQsT0FBT1UsTUFBUCxDQUFjLEVBQUVKLEdBQUYsRUFBT0MsTUFBUCxFQUFkLENBQXJDO0FBQ0FSLElBQUVZLEVBQUYsQ0FBS0YsVUFBTCxFQUFpQlosU0FBakI7QUFDQTtBQUNBRSxJQUFFWSxFQUFGLENBQUtILE9BQU8sQ0FBUCxFQUFVSSxJQUFmLEVBQXFCUCxRQUFRTyxJQUE3QjtBQUNBYixJQUFFWSxFQUFGLENBQUtILE9BQU8sQ0FBUCxFQUFVSSxJQUFmLEVBQXFCUixRQUFRUSxJQUE3QjtBQUNBYixJQUFFWSxFQUFGLENBQUtILE9BQU8sQ0FBUCxFQUFVSSxJQUFmLEVBQXFCVCxRQUFRUyxJQUE3QjtBQUNEOztBQVpELG1CQUFLLHNDQUFMO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBY0E7O0FBQzJFLGlCQUFPYixDQUFQLEVBQWE7QUFDdEYsUUFBTSxFQUFFQyxNQUFGLEVBQVVDLFNBQVYsS0FBd0JGLEVBQUVHLE9BQWhDO0FBQ0EsUUFBTSxFQUFFQyxPQUFGLEVBQVdDLE9BQVgsRUFBb0JDLE9BQXBCLEtBQWdDSixTQUF0QztBQUNBLFFBQU1LLE1BQU0sb0VBQVo7QUFDQSxRQUFNQyxTQUFTLEtBQWY7O0FBRUEsUUFBTSxFQUFFQyxNQUFGLEVBQVVDLFVBQVYsS0FBeUIsTUFBTVQsT0FBT1UsTUFBUCxDQUFjLEVBQUVKLEdBQUYsRUFBT0MsTUFBUCxFQUFkLENBQXJDO0FBQ0FSLElBQUVZLEVBQUYsQ0FBS0YsVUFBTCxFQUFpQlosU0FBakI7QUFDQTtBQUNBRSxJQUFFWSxFQUFGLENBQUtILE9BQU8sQ0FBUCxFQUFVSSxJQUFmLEVBQXFCUCxRQUFRTyxJQUE3QjtBQUNBYixJQUFFWSxFQUFGLENBQUtILE9BQU8sQ0FBUCxFQUFVSSxJQUFmLEVBQXFCUixRQUFRUSxJQUE3QjtBQUNBYixJQUFFWSxFQUFGLENBQUtILE9BQU8sQ0FBUCxFQUFVSSxJQUFmLEVBQXFCVCxRQUFRUyxJQUE3QjtBQUNEOztBQVpELG1CQUFLLG9FQUFMO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUM2RixpQkFBT2IsQ0FBUCxFQUFhO0FBQ3hHLFFBQU0sRUFBRUMsTUFBRixFQUFVQyxTQUFWLEtBQXdCRixFQUFFRyxPQUFoQztBQUNBLFFBQU0sRUFBRUMsT0FBRixFQUFXQyxPQUFYLEVBQW9CQyxPQUFwQixLQUFnQ0osU0FBdEM7QUFDQSxRQUFNSyxNQUFNLGdFQUFaO0FBQ0EsUUFBTUMsU0FBUyxLQUFmOztBQUVBLFFBQU0sRUFBRUMsTUFBRixFQUFVQyxVQUFWLEtBQXlCLE1BQU1ULE9BQU9VLE1BQVAsQ0FBYyxFQUFFSixHQUFGLEVBQU9DLE1BQVAsRUFBZCxDQUFyQztBQUNBUixJQUFFWSxFQUFGLENBQUtGLFVBQUwsRUFBaUJaLFNBQWpCO0FBQ0E7QUFDQUUsSUFBRVksRUFBRixDQUFLSCxPQUFPLENBQVAsRUFBVUksSUFBZixFQUFxQlAsUUFBUU8sSUFBN0I7QUFDQWIsSUFBRVksRUFBRixDQUFLSCxPQUFPLENBQVAsRUFBVUksSUFBZixFQUFxQlQsUUFBUVMsSUFBN0I7QUFDQWIsSUFBRVksRUFBRixDQUFLSCxPQUFPLENBQVAsRUFBVUksSUFBZixFQUFxQlIsUUFBUVEsSUFBN0I7QUFDRDs7QUFaRCxjQUFLQyxPQUFMLENBQWEsOEVBQWI7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFjQTs7QUFDb0YsaUJBQU9kLENBQVAsRUFBYTtBQUMvRixRQUFNLEVBQUVDLE1BQUYsRUFBVUMsU0FBVixLQUF3QkYsRUFBRUcsT0FBaEM7QUFDQSxRQUFNLEVBQUVDLE9BQUYsRUFBV0MsT0FBWCxFQUFvQkMsT0FBcEIsS0FBZ0NKLFNBQXRDO0FBQ0EsUUFBTUssTUFBTSw2RUFBWjtBQUNBLFFBQU1DLFNBQVMsS0FBZjs7QUFFQSxRQUFNLEVBQUVDLE1BQUYsRUFBVUMsVUFBVixLQUF5QixNQUFNVCxPQUFPVSxNQUFQLENBQWMsRUFBRUosR0FBRixFQUFPQyxNQUFQLEVBQWQsQ0FBckM7QUFDQVIsSUFBRVksRUFBRixDQUFLRixVQUFMLEVBQWlCWixTQUFqQjtBQUNBO0FBQ0FFLElBQUVZLEVBQUYsQ0FBS0gsT0FBTyxDQUFQLEVBQVVJLElBQWYsRUFBcUJQLFFBQVFPLElBQTdCO0FBQ0FiLElBQUVZLEVBQUYsQ0FBS0gsT0FBTyxDQUFQLEVBQVVJLElBQWYsRUFBcUJULFFBQVFTLElBQTdCO0FBQ0FiLElBQUVZLEVBQUYsQ0FBS0gsT0FBTyxDQUFQLEVBQVVJLElBQWYsRUFBcUJSLFFBQVFRLElBQTdCO0FBQ0Q7O0FBWkQsbUJBQUssNkVBQUw7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFjaUQsaUJBQU9iLENBQVAsRUFBYTtBQUM1RCxRQUFNLEVBQUVDLE1BQUYsS0FBYUQsRUFBRUcsT0FBckI7QUFDQSxRQUFNSSxNQUFNLDBCQUFaO0FBQ0EsUUFBTUMsU0FBUyxLQUFmOztBQUVBLFFBQU0sRUFBRUUsVUFBRixFQUFjRCxNQUFkLEtBQXlCLE1BQU1SLE9BQU9VLE1BQVAsQ0FBYyxFQUFFSixHQUFGLEVBQU9DLE1BQVAsRUFBZCxDQUFyQztBQUNBUixJQUFFWSxFQUFGLENBQUtGLFVBQUwsRUFBaUJYLGdCQUFqQjtBQUNBQyxJQUFFZSxNQUFGLENBQVNOLE9BQU9PLE9BQVAsQ0FBZUMsUUFBZixDQUF3QixTQUF4QixDQUFUO0FBQ0Q7O0FBUkQsbUJBQUssMENBQUw7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJjcnVkLWxpc3Qtb3JkZXIuaW50ZWdyYXRpb24udGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0ZXN0IGZyb20gJ2F2YSc7XG5pbXBvcnQgJ3Npbm9uLWJsdWViaXJkJztcbmltcG9ydCBzZXR1cCBmcm9tICcuLi90ZXN0L2ludGVncmF0aW9uLXNldHVwLmpzJztcblxuY29uc3QgU1RBVFVTX09LID0gMjAwO1xuY29uc3QgU1RBVFVTX0JBRF9RVUVSWSA9IDUwMjtcblxuc2V0dXAodGVzdCk7XG5cbnRlc3QoJy9wbGF5ZXJzP29yZGVyPW5hbWUnLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHNlcnZlciwgaW5zdGFuY2VzIH0gPSB0LmNvbnRleHQ7XG4gIGNvbnN0IHsgcGxheWVyMSwgcGxheWVyMiwgcGxheWVyMyB9ID0gaW5zdGFuY2VzO1xuICBjb25zdCB1cmwgPSAnL3BsYXllcnM/b3JkZXI9bmFtZSc7XG4gIGNvbnN0IG1ldGhvZCA9ICdHRVQnO1xuXG4gIGNvbnN0IHsgcmVzdWx0LCBzdGF0dXNDb2RlIH0gPSBhd2FpdCBzZXJ2ZXIuaW5qZWN0KHsgdXJsLCBtZXRob2QgfSk7XG4gIHQuaXMoc3RhdHVzQ29kZSwgU1RBVFVTX09LKTtcbiAgLy8gdGhpcyBpcyB0aGUgb3JkZXIgd2UnZCBleHBlY3QgdGhlIG5hbWVzIHRvIGJlIGluXG4gIHQuaXMocmVzdWx0WzBdLm5hbWUsIHBsYXllcjEubmFtZSk7XG4gIHQuaXMocmVzdWx0WzFdLm5hbWUsIHBsYXllcjIubmFtZSk7XG4gIHQuaXMocmVzdWx0WzJdLm5hbWUsIHBsYXllcjMubmFtZSk7XG59KTtcblxudGVzdCgnL3BsYXllcnM/b3JkZXI9bmFtZSUyMEFTQycsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc2VydmVyLCBpbnN0YW5jZXMgfSA9IHQuY29udGV4dDtcbiAgY29uc3QgeyBwbGF5ZXIxLCBwbGF5ZXIyLCBwbGF5ZXIzIH0gPSBpbnN0YW5jZXM7XG4gIGNvbnN0IHVybCA9ICcvcGxheWVycz9vcmRlcj1uYW1lJTIwQVNDJztcbiAgY29uc3QgbWV0aG9kID0gJ0dFVCc7XG5cbiAgY29uc3QgeyByZXN1bHQsIHN0YXR1c0NvZGUgfSA9IGF3YWl0IHNlcnZlci5pbmplY3QoeyB1cmwsIG1ldGhvZCB9KTtcbiAgdC5pcyhzdGF0dXNDb2RlLCBTVEFUVVNfT0spO1xuICAvLyB0aGlzIGlzIHRoZSBvcmRlciB3ZSdkIGV4cGVjdCB0aGUgbmFtZXMgdG8gYmUgaW5cbiAgdC5pcyhyZXN1bHRbMF0ubmFtZSwgcGxheWVyMS5uYW1lKTtcbiAgdC5pcyhyZXN1bHRbMV0ubmFtZSwgcGxheWVyMi5uYW1lKTtcbiAgdC5pcyhyZXN1bHRbMl0ubmFtZSwgcGxheWVyMy5uYW1lKTtcbn0pO1xuXG50ZXN0KCcvcGxheWVycz9vcmRlcj1uYW1lJTIwREVTQycsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc2VydmVyLCBpbnN0YW5jZXMgfSA9IHQuY29udGV4dDtcbiAgY29uc3QgeyBwbGF5ZXIxLCBwbGF5ZXIyLCBwbGF5ZXIzIH0gPSBpbnN0YW5jZXM7XG4gIGNvbnN0IHVybCA9ICcvcGxheWVycz9vcmRlcj1uYW1lJTIwREVTQyc7XG4gIGNvbnN0IG1ldGhvZCA9ICdHRVQnO1xuXG4gIGNvbnN0IHsgcmVzdWx0LCBzdGF0dXNDb2RlIH0gPSBhd2FpdCBzZXJ2ZXIuaW5qZWN0KHsgdXJsLCBtZXRob2QgfSk7XG4gIHQuaXMoc3RhdHVzQ29kZSwgU1RBVFVTX09LKTtcbiAgLy8gdGhpcyBpcyB0aGUgb3JkZXIgd2UnZCBleHBlY3QgdGhlIG5hbWVzIHRvIGJlIGluXG4gIHQuaXMocmVzdWx0WzBdLm5hbWUsIHBsYXllcjMubmFtZSk7XG4gIHQuaXMocmVzdWx0WzFdLm5hbWUsIHBsYXllcjIubmFtZSk7XG4gIHQuaXMocmVzdWx0WzJdLm5hbWUsIHBsYXllcjEubmFtZSk7XG59KTtcblxudGVzdCgnL3BsYXllcnM/b3JkZXJbXT1uYW1lJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzZXJ2ZXIsIGluc3RhbmNlcyB9ID0gdC5jb250ZXh0O1xuICBjb25zdCB7IHBsYXllcjEsIHBsYXllcjIsIHBsYXllcjMgfSA9IGluc3RhbmNlcztcbiAgY29uc3QgdXJsID0gJy9wbGF5ZXJzP29yZGVyW109bmFtZSc7XG4gIGNvbnN0IG1ldGhvZCA9ICdHRVQnO1xuXG4gIGNvbnN0IHsgcmVzdWx0LCBzdGF0dXNDb2RlIH0gPSBhd2FpdCBzZXJ2ZXIuaW5qZWN0KHsgdXJsLCBtZXRob2QgfSk7XG4gIHQuaXMoc3RhdHVzQ29kZSwgU1RBVFVTX09LKTtcbiAgLy8gdGhpcyBpcyB0aGUgb3JkZXIgd2UnZCBleHBlY3QgdGhlIG5hbWVzIHRvIGJlIGluXG4gIHQuaXMocmVzdWx0WzBdLm5hbWUsIHBsYXllcjEubmFtZSk7XG4gIHQuaXMocmVzdWx0WzFdLm5hbWUsIHBsYXllcjIubmFtZSk7XG4gIHQuaXMocmVzdWx0WzJdLm5hbWUsIHBsYXllcjMubmFtZSk7XG59KTtcblxudGVzdCgnL3BsYXllcnM/b3JkZXJbMF09bmFtZSZvcmRlclswXT1ERVNDJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzZXJ2ZXIsIGluc3RhbmNlcyB9ID0gdC5jb250ZXh0O1xuICBjb25zdCB7IHBsYXllcjEsIHBsYXllcjIsIHBsYXllcjMgfSA9IGluc3RhbmNlcztcbiAgY29uc3QgdXJsID0gJy9wbGF5ZXJzP29yZGVyWzBdPW5hbWUmb3JkZXJbMF09REVTQyc7XG4gIGNvbnN0IG1ldGhvZCA9ICdHRVQnO1xuXG4gIGNvbnN0IHsgcmVzdWx0LCBzdGF0dXNDb2RlIH0gPSBhd2FpdCBzZXJ2ZXIuaW5qZWN0KHsgdXJsLCBtZXRob2QgfSk7XG4gIHQuaXMoc3RhdHVzQ29kZSwgU1RBVFVTX09LKTtcbiAgLy8gdGhpcyBpcyB0aGUgb3JkZXIgd2UnZCBleHBlY3QgdGhlIG5hbWVzIHRvIGJlIGluXG4gIHQuaXMocmVzdWx0WzBdLm5hbWUsIHBsYXllcjMubmFtZSk7XG4gIHQuaXMocmVzdWx0WzFdLm5hbWUsIHBsYXllcjIubmFtZSk7XG4gIHQuaXMocmVzdWx0WzJdLm5hbWUsIHBsYXllcjEubmFtZSk7XG59KTtcblxuLy8gbXVsdGlwbGUgc29ydHNcbnRlc3QoJy9wbGF5ZXJzP29yZGVyWzBdPWFjdGl2ZSZvcmRlclswXT1ERVNDJm9yZGVyWzFdPW5hbWUmb3JkZXJbMV09REVTQycsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc2VydmVyLCBpbnN0YW5jZXMgfSA9IHQuY29udGV4dDtcbiAgY29uc3QgeyBwbGF5ZXIxLCBwbGF5ZXIyLCBwbGF5ZXIzIH0gPSBpbnN0YW5jZXM7XG4gIGNvbnN0IHVybCA9ICcvcGxheWVycz9vcmRlclswXT1uYW1lJm9yZGVyWzBdPURFU0Mmb3JkZXJbMV09dGVhbUlkJm9yZGVyWzFdPURFU0MnO1xuICBjb25zdCBtZXRob2QgPSAnR0VUJztcblxuICBjb25zdCB7IHJlc3VsdCwgc3RhdHVzQ29kZSB9ID0gYXdhaXQgc2VydmVyLmluamVjdCh7IHVybCwgbWV0aG9kIH0pO1xuICB0LmlzKHN0YXR1c0NvZGUsIFNUQVRVU19PSyk7XG4gIC8vIHRoaXMgaXMgdGhlIG9yZGVyIHdlJ2QgZXhwZWN0IHRoZSBuYW1lcyB0byBiZSBpblxuICB0LmlzKHJlc3VsdFswXS5uYW1lLCBwbGF5ZXIzLm5hbWUpO1xuICB0LmlzKHJlc3VsdFsxXS5uYW1lLCBwbGF5ZXIyLm5hbWUpO1xuICB0LmlzKHJlc3VsdFsyXS5uYW1lLCBwbGF5ZXIxLm5hbWUpO1xufSk7XG5cbi8vIHRoaXMgd2lsbCBmYWlsIGIvYyBzZXF1ZWxpemUgZG9lc24ndCBjb3JyZWN0bHkgZG8gdGhlIGpvaW4gd2hlbiB5b3UgcGFzc1xuLy8gYW4gb3JkZXIuIFRoZXJlIGFyZSBtYW55IGlzc3VlcyBmb3IgdGhpczpcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3NlcXVlbGl6ZS9zZXF1ZWxpemUvaXNzdWVzP3V0Zjg9JUUyJTlDJTkzJnE9aXMlM0Fpc3N1ZSUyMGlzJTNBb3BlbiUyMG9yZGVyJTIwam9pbiUyMFxuLy9cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zZXF1ZWxpemUvc2VxdWVsaXplL2lzc3Vlcy81MzUzIGlzIGEgZ29vZCBleGFtcGxlXG4vLyBpZiB0aGlzIHRlc3QgcGFzc2VzLCB0aGF0J3MgZ3JlYXQhIEp1c3QgcmVtb3ZlIHRoZSB3b3JrYXJvdW5kIG5vdGUgaW4gdGhlXG4vLyBkb2NzXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbnRlc3QuZmFpbGluZygnc2VxdWVsaXplIGJ1ZyAvcGxheWVycz9vcmRlclswXT17XCJtb2RlbFwiOlwiVGVhbVwifSZvcmRlclswXT1uYW1lJm9yZGVyWzBdPURFU0MnLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHNlcnZlciwgaW5zdGFuY2VzIH0gPSB0LmNvbnRleHQ7XG4gIGNvbnN0IHsgcGxheWVyMSwgcGxheWVyMiwgcGxheWVyMyB9ID0gaW5zdGFuY2VzO1xuICBjb25zdCB1cmwgPSAnL3BsYXllcnM/b3JkZXJbMF09e1wibW9kZWxcIjpcIlRlYW1cIn0mb3JkZXJbMF09bmFtZSZvcmRlclswXT1ERVNDJztcbiAgY29uc3QgbWV0aG9kID0gJ0dFVCc7XG5cbiAgY29uc3QgeyByZXN1bHQsIHN0YXR1c0NvZGUgfSA9IGF3YWl0IHNlcnZlci5pbmplY3QoeyB1cmwsIG1ldGhvZCB9KTtcbiAgdC5pcyhzdGF0dXNDb2RlLCBTVEFUVVNfT0spO1xuICAvLyB0aGlzIGlzIHRoZSBvcmRlciB3ZSdkIGV4cGVjdCB0aGUgbmFtZXMgdG8gYmUgaW5cbiAgdC5pcyhyZXN1bHRbMF0ubmFtZSwgcGxheWVyMy5uYW1lKTtcbiAgdC5pcyhyZXN1bHRbMV0ubmFtZSwgcGxheWVyMS5uYW1lKTtcbiAgdC5pcyhyZXN1bHRbMl0ubmFtZSwgcGxheWVyMi5uYW1lKTtcbn0pO1xuXG4vLyBiL2MgdGhlIGFib3ZlIGZhaWxzLCB0aGlzIGlzIGEgd29yay1hcm91bmRcbnRlc3QoJy9wbGF5ZXJzP29yZGVyWzBdPXtcIm1vZGVsXCI6XCJUZWFtXCJ9Jm9yZGVyWzBdPW5hbWUmb3JkZXJbMF09REVTQyZpbmNsdWRlPXRlYW0nLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHNlcnZlciwgaW5zdGFuY2VzIH0gPSB0LmNvbnRleHQ7XG4gIGNvbnN0IHsgcGxheWVyMSwgcGxheWVyMiwgcGxheWVyMyB9ID0gaW5zdGFuY2VzO1xuICBjb25zdCB1cmwgPSAnL3BsYXllcnM/b3JkZXJbMF09e1wibW9kZWxcIjpcIlRlYW1cIn0mb3JkZXJbMF09bmFtZSZvcmRlclswXT1ERVNDJmluY2x1ZGU9dGVhbSc7XG4gIGNvbnN0IG1ldGhvZCA9ICdHRVQnO1xuXG4gIGNvbnN0IHsgcmVzdWx0LCBzdGF0dXNDb2RlIH0gPSBhd2FpdCBzZXJ2ZXIuaW5qZWN0KHsgdXJsLCBtZXRob2QgfSk7XG4gIHQuaXMoc3RhdHVzQ29kZSwgU1RBVFVTX09LKTtcbiAgLy8gdGhpcyBpcyB0aGUgb3JkZXIgd2UnZCBleHBlY3QgdGhlIG5hbWVzIHRvIGJlIGluXG4gIHQuaXMocmVzdWx0WzBdLm5hbWUsIHBsYXllcjMubmFtZSk7XG4gIHQuaXMocmVzdWx0WzFdLm5hbWUsIHBsYXllcjEubmFtZSk7XG4gIHQuaXMocmVzdWx0WzJdLm5hbWUsIHBsYXllcjIubmFtZSk7XG59KTtcblxudGVzdCgnaW52YWxpZCBjb2x1bW4gL3BsYXllcnM/b3JkZXJbMF09aW52YWxpZCcsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc2VydmVyIH0gPSB0LmNvbnRleHQ7XG4gIGNvbnN0IHVybCA9ICcvcGxheWVycz9vcmRlcltdPWludmFsaWQnO1xuICBjb25zdCBtZXRob2QgPSAnR0VUJztcblxuICBjb25zdCB7IHN0YXR1c0NvZGUsIHJlc3VsdCB9ID0gYXdhaXQgc2VydmVyLmluamVjdCh7IHVybCwgbWV0aG9kIH0pO1xuICB0LmlzKHN0YXR1c0NvZGUsIFNUQVRVU19CQURfUVVFUlkpO1xuICB0LnRydXRoeShyZXN1bHQubWVzc2FnZS5pbmNsdWRlcygnaW52YWxpZCcpKTtcbn0pO1xuIl19