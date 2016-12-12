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
  const { server } = t.context;
  const limit = 2;
  const url = `/players?limit=${ limit }`;
  const method = 'GET';

  const { result, statusCode } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_OK);
  t.is(result.length, limit);
}

(0, _ava2.default)('/players?limit=2', (() => {
  var _ref = _asyncToGenerator(_ref2);

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})());

function* _ref4(t) {
  const { server } = t.context;
  const limit = 2;
  const url = `/players?limit=${ limit }&offset=1`;
  const method = 'GET';

  const { result, statusCode } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_OK);
  t.is(result.length, limit);
}

(0, _ava2.default)('/players?limit=2&offset=1', (() => {
  var _ref3 = _asyncToGenerator(_ref4);

  return function (_x2) {
    return _ref3.apply(this, arguments);
  };
})());

function* _ref6(t) {
  const { server } = t.context;
  const limit = 2;
  const url = `/players?limit=${ limit }&offset=2`;
  const method = 'GET';

  const { result, statusCode } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_OK);
  t.is(result.length, 1, 'with only 3 players, only get 1 back with an offset of 2');
}

(0, _ava2.default)('/players?limit=2&offset=2', (() => {
  var _ref5 = _asyncToGenerator(_ref6);

  return function (_x3) {
    return _ref5.apply(this, arguments);
  };
})());

function* _ref8(t) {
  const { server } = t.context;
  const limit = 2;
  const url = `/players?limit=${ limit }&offset=20`;
  const method = 'GET';

  const { statusCode } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_NOT_FOUND, 'with a offset/limit greater than the data, returns a 404');
}

(0, _ava2.default)('/players?limit=2&offset=20', (() => {
  var _ref7 = _asyncToGenerator(_ref8);

  return function (_x4) {
    return _ref7.apply(this, arguments);
  };
})());

function* _ref10(t) {
  const { server } = t.context;
  const limit = 2;
  const url = `/players/returnsAll?limit=${ limit }`;
  const method = 'GET';

  const { result, statusCode } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_OK);
  t.is(result.length, limit);
}

(0, _ava2.default)('scope /players/returnsAll?limit=2', (() => {
  var _ref9 = _asyncToGenerator(_ref10);

  return function (_x5) {
    return _ref9.apply(this, arguments);
  };
})());

function* _ref12(t) {
  const { server } = t.context;
  const limit = 2;
  const url = `/players/returnsAll?limit=${ limit }&offset=1`;
  const method = 'GET';

  const { result, statusCode } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_OK);
  t.is(result.length, limit);
}

(0, _ava2.default)('scope /players/returnsAll?limit=2&offset=1', (() => {
  var _ref11 = _asyncToGenerator(_ref12);

  return function (_x6) {
    return _ref11.apply(this, arguments);
  };
})());

function* _ref14(t) {
  const { server } = t.context;
  const limit = 2;
  const url = `/players/returnsAll?limit=${ limit }&offset=2`;
  const method = 'GET';

  const { result, statusCode } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_OK);
  t.is(result.length, 1, 'with only 3 players, only get 1 back with an offset of 2');
}

(0, _ava2.default)('scope /players/returnsAll?limit=2&offset=2', (() => {
  var _ref13 = _asyncToGenerator(_ref14);

  return function (_x7) {
    return _ref13.apply(this, arguments);
  };
})());

function* _ref16(t) {
  const { server } = t.context;
  const limit = 2;
  const url = `/players/returnsAll?limit=${ limit }&offset=20`;
  const method = 'GET';

  const { statusCode } = yield server.inject({ url, method });
  t.is(statusCode, STATUS_NOT_FOUND, 'with a offset/limit greater than the data, returns a 404');
}

(0, _ava2.default)('scope /players/returnsAll?limit=2&offset=20', (() => {
  var _ref15 = _asyncToGenerator(_ref16);

  return function (_x8) {
    return _ref15.apply(this, arguments);
  };
})());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcnVkLWxpc3QtbGltaXQtYW5kLW9mZnNldC5pbnRlZ3JhdGlvbi50ZXN0LmpzIl0sIm5hbWVzIjpbIlNUQVRVU19PSyIsIlNUQVRVU19OT1RfRk9VTkQiLCJ0Iiwic2VydmVyIiwiY29udGV4dCIsImxpbWl0IiwidXJsIiwibWV0aG9kIiwicmVzdWx0Iiwic3RhdHVzQ29kZSIsImluamVjdCIsImlzIiwibGVuZ3RoIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUEsTUFBTUEsWUFBWSxHQUFsQjtBQUNBLE1BQU1DLG1CQUFtQixHQUF6Qjs7QUFFQTs7QUFFeUIsZ0JBQU9DLENBQVAsRUFBYTtBQUNwQyxRQUFNLEVBQUVDLE1BQUYsS0FBYUQsRUFBRUUsT0FBckI7QUFDQSxRQUFNQyxRQUFRLENBQWQ7QUFDQSxRQUFNQyxNQUFPLG1CQUFpQkQsS0FBTSxHQUFwQztBQUNBLFFBQU1FLFNBQVMsS0FBZjs7QUFFQSxRQUFNLEVBQUVDLE1BQUYsRUFBVUMsVUFBVixLQUF5QixNQUFNTixPQUFPTyxNQUFQLENBQWMsRUFBRUosR0FBRixFQUFPQyxNQUFQLEVBQWQsQ0FBckM7QUFDQUwsSUFBRVMsRUFBRixDQUFLRixVQUFMLEVBQWlCVCxTQUFqQjtBQUNBRSxJQUFFUyxFQUFGLENBQUtILE9BQU9JLE1BQVosRUFBb0JQLEtBQXBCO0FBQ0Q7O0FBVEQsbUJBQUssa0JBQUw7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFXa0MsZ0JBQU9ILENBQVAsRUFBYTtBQUM3QyxRQUFNLEVBQUVDLE1BQUYsS0FBYUQsRUFBRUUsT0FBckI7QUFDQSxRQUFNQyxRQUFRLENBQWQ7QUFDQSxRQUFNQyxNQUFPLG1CQUFpQkQsS0FBTSxZQUFwQztBQUNBLFFBQU1FLFNBQVMsS0FBZjs7QUFFQSxRQUFNLEVBQUVDLE1BQUYsRUFBVUMsVUFBVixLQUF5QixNQUFNTixPQUFPTyxNQUFQLENBQWMsRUFBRUosR0FBRixFQUFPQyxNQUFQLEVBQWQsQ0FBckM7QUFDQUwsSUFBRVMsRUFBRixDQUFLRixVQUFMLEVBQWlCVCxTQUFqQjtBQUNBRSxJQUFFUyxFQUFGLENBQUtILE9BQU9JLE1BQVosRUFBb0JQLEtBQXBCO0FBQ0Q7O0FBVEQsbUJBQUssMkJBQUw7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFXa0MsZ0JBQU9ILENBQVAsRUFBYTtBQUM3QyxRQUFNLEVBQUVDLE1BQUYsS0FBYUQsRUFBRUUsT0FBckI7QUFDQSxRQUFNQyxRQUFRLENBQWQ7QUFDQSxRQUFNQyxNQUFPLG1CQUFpQkQsS0FBTSxZQUFwQztBQUNBLFFBQU1FLFNBQVMsS0FBZjs7QUFFQSxRQUFNLEVBQUVDLE1BQUYsRUFBVUMsVUFBVixLQUF5QixNQUFNTixPQUFPTyxNQUFQLENBQWMsRUFBRUosR0FBRixFQUFPQyxNQUFQLEVBQWQsQ0FBckM7QUFDQUwsSUFBRVMsRUFBRixDQUFLRixVQUFMLEVBQWlCVCxTQUFqQjtBQUNBRSxJQUFFUyxFQUFGLENBQUtILE9BQU9JLE1BQVosRUFBb0IsQ0FBcEIsRUFBdUIsMERBQXZCO0FBQ0Q7O0FBVEQsbUJBQUssMkJBQUw7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFXbUMsZ0JBQU9WLENBQVAsRUFBYTtBQUM5QyxRQUFNLEVBQUVDLE1BQUYsS0FBYUQsRUFBRUUsT0FBckI7QUFDQSxRQUFNQyxRQUFRLENBQWQ7QUFDQSxRQUFNQyxNQUFPLG1CQUFpQkQsS0FBTSxhQUFwQztBQUNBLFFBQU1FLFNBQVMsS0FBZjs7QUFFQSxRQUFNLEVBQUVFLFVBQUYsS0FBaUIsTUFBTU4sT0FBT08sTUFBUCxDQUFjLEVBQUVKLEdBQUYsRUFBT0MsTUFBUCxFQUFkLENBQTdCO0FBQ0FMLElBQUVTLEVBQUYsQ0FBS0YsVUFBTCxFQUFpQlIsZ0JBQWpCLEVBQW1DLDBEQUFuQztBQUNEOztBQVJELG1CQUFLLDRCQUFMO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBVTBDLGlCQUFPQyxDQUFQLEVBQWE7QUFDckQsUUFBTSxFQUFFQyxNQUFGLEtBQWFELEVBQUVFLE9BQXJCO0FBQ0EsUUFBTUMsUUFBUSxDQUFkO0FBQ0EsUUFBTUMsTUFBTyw4QkFBNEJELEtBQU0sR0FBL0M7QUFDQSxRQUFNRSxTQUFTLEtBQWY7O0FBRUEsUUFBTSxFQUFFQyxNQUFGLEVBQVVDLFVBQVYsS0FBeUIsTUFBTU4sT0FBT08sTUFBUCxDQUFjLEVBQUVKLEdBQUYsRUFBT0MsTUFBUCxFQUFkLENBQXJDO0FBQ0FMLElBQUVTLEVBQUYsQ0FBS0YsVUFBTCxFQUFpQlQsU0FBakI7QUFDQUUsSUFBRVMsRUFBRixDQUFLSCxPQUFPSSxNQUFaLEVBQW9CUCxLQUFwQjtBQUNEOztBQVRELG1CQUFLLG1DQUFMO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBV21ELGlCQUFPSCxDQUFQLEVBQWE7QUFDOUQsUUFBTSxFQUFFQyxNQUFGLEtBQWFELEVBQUVFLE9BQXJCO0FBQ0EsUUFBTUMsUUFBUSxDQUFkO0FBQ0EsUUFBTUMsTUFBTyw4QkFBNEJELEtBQU0sWUFBL0M7QUFDQSxRQUFNRSxTQUFTLEtBQWY7O0FBRUEsUUFBTSxFQUFFQyxNQUFGLEVBQVVDLFVBQVYsS0FBeUIsTUFBTU4sT0FBT08sTUFBUCxDQUFjLEVBQUVKLEdBQUYsRUFBT0MsTUFBUCxFQUFkLENBQXJDO0FBQ0FMLElBQUVTLEVBQUYsQ0FBS0YsVUFBTCxFQUFpQlQsU0FBakI7QUFDQUUsSUFBRVMsRUFBRixDQUFLSCxPQUFPSSxNQUFaLEVBQW9CUCxLQUFwQjtBQUNEOztBQVRELG1CQUFLLDRDQUFMO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBV21ELGlCQUFPSCxDQUFQLEVBQWE7QUFDOUQsUUFBTSxFQUFFQyxNQUFGLEtBQWFELEVBQUVFLE9BQXJCO0FBQ0EsUUFBTUMsUUFBUSxDQUFkO0FBQ0EsUUFBTUMsTUFBTyw4QkFBNEJELEtBQU0sWUFBL0M7QUFDQSxRQUFNRSxTQUFTLEtBQWY7O0FBRUEsUUFBTSxFQUFFQyxNQUFGLEVBQVVDLFVBQVYsS0FBeUIsTUFBTU4sT0FBT08sTUFBUCxDQUFjLEVBQUVKLEdBQUYsRUFBT0MsTUFBUCxFQUFkLENBQXJDO0FBQ0FMLElBQUVTLEVBQUYsQ0FBS0YsVUFBTCxFQUFpQlQsU0FBakI7QUFDQUUsSUFBRVMsRUFBRixDQUFLSCxPQUFPSSxNQUFaLEVBQW9CLENBQXBCLEVBQXVCLDBEQUF2QjtBQUNEOztBQVRELG1CQUFLLDRDQUFMO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBV29ELGlCQUFPVixDQUFQLEVBQWE7QUFDL0QsUUFBTSxFQUFFQyxNQUFGLEtBQWFELEVBQUVFLE9BQXJCO0FBQ0EsUUFBTUMsUUFBUSxDQUFkO0FBQ0EsUUFBTUMsTUFBTyw4QkFBNEJELEtBQU0sYUFBL0M7QUFDQSxRQUFNRSxTQUFTLEtBQWY7O0FBRUEsUUFBTSxFQUFFRSxVQUFGLEtBQWlCLE1BQU1OLE9BQU9PLE1BQVAsQ0FBYyxFQUFFSixHQUFGLEVBQU9DLE1BQVAsRUFBZCxDQUE3QjtBQUNBTCxJQUFFUyxFQUFGLENBQUtGLFVBQUwsRUFBaUJSLGdCQUFqQixFQUFtQywwREFBbkM7QUFDRDs7QUFSRCxtQkFBSyw2Q0FBTDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6ImNydWQtbGlzdC1saW1pdC1hbmQtb2Zmc2V0LmludGVncmF0aW9uLnRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdGVzdCBmcm9tICdhdmEnO1xuaW1wb3J0ICdzaW5vbi1ibHVlYmlyZCc7XG5pbXBvcnQgc2V0dXAgZnJvbSAnLi4vdGVzdC9pbnRlZ3JhdGlvbi1zZXR1cC5qcyc7XG5cbmNvbnN0IFNUQVRVU19PSyA9IDIwMDtcbmNvbnN0IFNUQVRVU19OT1RfRk9VTkQgPSA0MDQ7XG5cbnNldHVwKHRlc3QpO1xuXG50ZXN0KCcvcGxheWVycz9saW1pdD0yJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzZXJ2ZXIgfSA9IHQuY29udGV4dDtcbiAgY29uc3QgbGltaXQgPSAyO1xuICBjb25zdCB1cmwgPSBgL3BsYXllcnM/bGltaXQ9JHtsaW1pdH1gO1xuICBjb25zdCBtZXRob2QgPSAnR0VUJztcblxuICBjb25zdCB7IHJlc3VsdCwgc3RhdHVzQ29kZSB9ID0gYXdhaXQgc2VydmVyLmluamVjdCh7IHVybCwgbWV0aG9kIH0pO1xuICB0LmlzKHN0YXR1c0NvZGUsIFNUQVRVU19PSyk7XG4gIHQuaXMocmVzdWx0Lmxlbmd0aCwgbGltaXQpO1xufSk7XG5cbnRlc3QoJy9wbGF5ZXJzP2xpbWl0PTImb2Zmc2V0PTEnLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHNlcnZlciB9ID0gdC5jb250ZXh0O1xuICBjb25zdCBsaW1pdCA9IDI7XG4gIGNvbnN0IHVybCA9IGAvcGxheWVycz9saW1pdD0ke2xpbWl0fSZvZmZzZXQ9MWA7XG4gIGNvbnN0IG1ldGhvZCA9ICdHRVQnO1xuXG4gIGNvbnN0IHsgcmVzdWx0LCBzdGF0dXNDb2RlIH0gPSBhd2FpdCBzZXJ2ZXIuaW5qZWN0KHsgdXJsLCBtZXRob2QgfSk7XG4gIHQuaXMoc3RhdHVzQ29kZSwgU1RBVFVTX09LKTtcbiAgdC5pcyhyZXN1bHQubGVuZ3RoLCBsaW1pdCk7XG59KTtcblxudGVzdCgnL3BsYXllcnM/bGltaXQ9MiZvZmZzZXQ9MicsIGFzeW5jICh0KSA9PiB7XG4gIGNvbnN0IHsgc2VydmVyIH0gPSB0LmNvbnRleHQ7XG4gIGNvbnN0IGxpbWl0ID0gMjtcbiAgY29uc3QgdXJsID0gYC9wbGF5ZXJzP2xpbWl0PSR7bGltaXR9Jm9mZnNldD0yYDtcbiAgY29uc3QgbWV0aG9kID0gJ0dFVCc7XG5cbiAgY29uc3QgeyByZXN1bHQsIHN0YXR1c0NvZGUgfSA9IGF3YWl0IHNlcnZlci5pbmplY3QoeyB1cmwsIG1ldGhvZCB9KTtcbiAgdC5pcyhzdGF0dXNDb2RlLCBTVEFUVVNfT0spO1xuICB0LmlzKHJlc3VsdC5sZW5ndGgsIDEsICd3aXRoIG9ubHkgMyBwbGF5ZXJzLCBvbmx5IGdldCAxIGJhY2sgd2l0aCBhbiBvZmZzZXQgb2YgMicpO1xufSk7XG5cbnRlc3QoJy9wbGF5ZXJzP2xpbWl0PTImb2Zmc2V0PTIwJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzZXJ2ZXIgfSA9IHQuY29udGV4dDtcbiAgY29uc3QgbGltaXQgPSAyO1xuICBjb25zdCB1cmwgPSBgL3BsYXllcnM/bGltaXQ9JHtsaW1pdH0mb2Zmc2V0PTIwYDtcbiAgY29uc3QgbWV0aG9kID0gJ0dFVCc7XG5cbiAgY29uc3QgeyBzdGF0dXNDb2RlIH0gPSBhd2FpdCBzZXJ2ZXIuaW5qZWN0KHsgdXJsLCBtZXRob2QgfSk7XG4gIHQuaXMoc3RhdHVzQ29kZSwgU1RBVFVTX05PVF9GT1VORCwgJ3dpdGggYSBvZmZzZXQvbGltaXQgZ3JlYXRlciB0aGFuIHRoZSBkYXRhLCByZXR1cm5zIGEgNDA0Jyk7XG59KTtcblxudGVzdCgnc2NvcGUgL3BsYXllcnMvcmV0dXJuc0FsbD9saW1pdD0yJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzZXJ2ZXIgfSA9IHQuY29udGV4dDtcbiAgY29uc3QgbGltaXQgPSAyO1xuICBjb25zdCB1cmwgPSBgL3BsYXllcnMvcmV0dXJuc0FsbD9saW1pdD0ke2xpbWl0fWA7XG4gIGNvbnN0IG1ldGhvZCA9ICdHRVQnO1xuXG4gIGNvbnN0IHsgcmVzdWx0LCBzdGF0dXNDb2RlIH0gPSBhd2FpdCBzZXJ2ZXIuaW5qZWN0KHsgdXJsLCBtZXRob2QgfSk7XG4gIHQuaXMoc3RhdHVzQ29kZSwgU1RBVFVTX09LKTtcbiAgdC5pcyhyZXN1bHQubGVuZ3RoLCBsaW1pdCk7XG59KTtcblxudGVzdCgnc2NvcGUgL3BsYXllcnMvcmV0dXJuc0FsbD9saW1pdD0yJm9mZnNldD0xJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzZXJ2ZXIgfSA9IHQuY29udGV4dDtcbiAgY29uc3QgbGltaXQgPSAyO1xuICBjb25zdCB1cmwgPSBgL3BsYXllcnMvcmV0dXJuc0FsbD9saW1pdD0ke2xpbWl0fSZvZmZzZXQ9MWA7XG4gIGNvbnN0IG1ldGhvZCA9ICdHRVQnO1xuXG4gIGNvbnN0IHsgcmVzdWx0LCBzdGF0dXNDb2RlIH0gPSBhd2FpdCBzZXJ2ZXIuaW5qZWN0KHsgdXJsLCBtZXRob2QgfSk7XG4gIHQuaXMoc3RhdHVzQ29kZSwgU1RBVFVTX09LKTtcbiAgdC5pcyhyZXN1bHQubGVuZ3RoLCBsaW1pdCk7XG59KTtcblxudGVzdCgnc2NvcGUgL3BsYXllcnMvcmV0dXJuc0FsbD9saW1pdD0yJm9mZnNldD0yJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzZXJ2ZXIgfSA9IHQuY29udGV4dDtcbiAgY29uc3QgbGltaXQgPSAyO1xuICBjb25zdCB1cmwgPSBgL3BsYXllcnMvcmV0dXJuc0FsbD9saW1pdD0ke2xpbWl0fSZvZmZzZXQ9MmA7XG4gIGNvbnN0IG1ldGhvZCA9ICdHRVQnO1xuXG4gIGNvbnN0IHsgcmVzdWx0LCBzdGF0dXNDb2RlIH0gPSBhd2FpdCBzZXJ2ZXIuaW5qZWN0KHsgdXJsLCBtZXRob2QgfSk7XG4gIHQuaXMoc3RhdHVzQ29kZSwgU1RBVFVTX09LKTtcbiAgdC5pcyhyZXN1bHQubGVuZ3RoLCAxLCAnd2l0aCBvbmx5IDMgcGxheWVycywgb25seSBnZXQgMSBiYWNrIHdpdGggYW4gb2Zmc2V0IG9mIDInKTtcbn0pO1xuXG50ZXN0KCdzY29wZSAvcGxheWVycy9yZXR1cm5zQWxsP2xpbWl0PTImb2Zmc2V0PTIwJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzZXJ2ZXIgfSA9IHQuY29udGV4dDtcbiAgY29uc3QgbGltaXQgPSAyO1xuICBjb25zdCB1cmwgPSBgL3BsYXllcnMvcmV0dXJuc0FsbD9saW1pdD0ke2xpbWl0fSZvZmZzZXQ9MjBgO1xuICBjb25zdCBtZXRob2QgPSAnR0VUJztcblxuICBjb25zdCB7IHN0YXR1c0NvZGUgfSA9IGF3YWl0IHNlcnZlci5pbmplY3QoeyB1cmwsIG1ldGhvZCB9KTtcbiAgdC5pcyhzdGF0dXNDb2RlLCBTVEFUVVNfTk9UX0ZPVU5ELCAnd2l0aCBhIG9mZnNldC9saW1pdCBncmVhdGVyIHRoYW4gdGhlIGRhdGEsIHJldHVybnMgYSA0MDQnKTtcbn0pO1xuIl19