'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _crud = require('./crud.js');

var _sinon = require('sinon');

var _uniqueId = require('lodash/uniqueId.js');

var _uniqueId2 = _interopRequireDefault(_uniqueId);

require('sinon-bluebird');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const METHODS = {
  GET: 'GET'
};

_ava2.default.beforeEach('setup server', t => {
  t.context.server = {
    route: (0, _sinon.stub)()
  };
});

const makeModel = () => {
  const id = (0, _uniqueId2.default)();
  return {
    findAll: (0, _sinon.stub)(),
    _plural: 'models',
    _singular: 'model',
    toJSON: () => ({ id }),
    id
  };
};

_ava2.default.beforeEach('setup model', t => {
  t.context.model = makeModel();
});

_ava2.default.beforeEach('setup models', t => {
  t.context.models = [t.context.model, makeModel()];
});

_ava2.default.beforeEach('setup request stub', t => {
  t.context.request = {
    query: {},
    payload: {},
    models: t.context.models
  };
});

_ava2.default.beforeEach('setup reply stub', t => {
  t.context.reply = (0, _sinon.stub)();
});

(0, _ava2.default)('crud#list without prefix', t => {
  const { server, model } = t.context;

  (0, _crud.list)({ server, model });
  const { path } = server.route.args[0][0];

  t.falsy(path.includes('undefined'), 'correctly sets the path without a prefix defined');

  t.is(path, `/${ model._plural }`, 'the path sets to the plural model');
});

(0, _ava2.default)('crud#list with prefix', t => {
  const { server, model } = t.context;
  const prefix = '/v1';

  (0, _crud.list)({ server, model, prefix });
  const { path } = server.route.args[0][0];

  t.is(path, `${ prefix }/${ model._plural }`, 'the path sets to the plural model with the prefix');
});

(0, _ava2.default)('crud#list method', t => {
  const { server, model } = t.context;

  (0, _crud.list)({ server, model });
  const { method } = server.route.args[0][0];

  t.is(method, METHODS.GET, `sets the method to ${ METHODS.GET }`);
});

(0, _ava2.default)('crud#list config', t => {
  const { server, model } = t.context;
  const userConfig = {};

  (0, _crud.list)({ server, model, config: userConfig });
  const { config } = server.route.args[0][0];

  t.is(config, userConfig, 'sets the user config');
});

function _ref2({ id }) {
  return { id };
}

function* _ref3(t) {
  const { server, model, request, reply, models } = t.context;

  (0, _crud.list)({ server, model });
  const { handler } = server.route.args[0][0];
  model.findAll.resolves(models);

  try {
    yield handler(request, reply);
  } catch (e) {
    t.ifError(e, 'does not error while handling');
  } finally {
    t.pass('does not error while handling');
  }

  t.truthy(reply.calledOnce, 'calls reply only once');

  const response = reply.args[0][0];

  t.falsy(response instanceof Error, response);

  t.deepEqual(response, models.map(_ref2), 'responds with the list of models');
}

(0, _ava2.default)('crud#list handler', (() => {
  var _ref = _asyncToGenerator(_ref3);

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})());

function* _ref5(t) {
  const { server, model, request, reply } = t.context;
  // we _want_ the error
  delete request.models;

  (0, _crud.list)({ server, model });
  const { handler } = server.route.args[0][0];

  yield handler(request, reply);

  t.truthy(reply.calledOnce, 'calls reply only once');

  const response = reply.args[0][0];

  t.truthy(response.isBoom, 'responds with a Boom error');
}

(0, _ava2.default)('crud#list handler if parseInclude errors', (() => {
  var _ref4 = _asyncToGenerator(_ref5);

  return function (_x2) {
    return _ref4.apply(this, arguments);
  };
})());

function* _ref7(t) {
  const { server, model, request, reply, models } = t.context;
  const { findAll } = model;

  // set the limit
  request.query.limit = 1;

  (0, _crud.list)({ server, model });
  const { handler } = server.route.args[0][0];
  model.findAll.resolves(models);

  try {
    yield handler(request, reply);
  } catch (e) {
    t.ifError(e, 'does not error while handling');
  } finally {
    t.pass('does not error while handling');
  }

  t.truthy(reply.calledOnce, 'calls reply only once');

  const response = reply.args[0][0];
  const findAllArgs = findAll.args[0][0];

  t.falsy(response instanceof Error, response);

  t.is(findAllArgs.limit, request.query.limit, 'queries with the limit');
}

(0, _ava2.default)('crud#list handler with limit', (() => {
  var _ref6 = _asyncToGenerator(_ref7);

  return function (_x3) {
    return _ref6.apply(this, arguments);
  };
})());

function* _ref9(t) {
  const { server, model, request, reply, models } = t.context;
  const { findAll } = model;

  // set the limit
  request.query.order = 'key';

  (0, _crud.list)({ server, model });
  const { handler } = server.route.args[0][0];
  model.findAll.resolves(models);

  try {
    yield handler(request, reply);
  } catch (e) {
    t.ifError(e, 'does not error while handling');
  } finally {
    t.pass('does not error while handling');
  }

  t.truthy(reply.calledOnce, 'calls reply only once');

  const response = reply.args[0][0];
  const findAllArgs = findAll.args[0][0];

  t.falsy(response instanceof Error, response);

  t.deepEqual(findAllArgs.order, [[request.query.order]], 'queries with the order as an array b/c that\'s what sequelize wants');
}

(0, _ava2.default)('crud#list handler with order', (() => {
  var _ref8 = _asyncToGenerator(_ref9);

  return function (_x4) {
    return _ref8.apply(this, arguments);
  };
})());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcnVkLnRlc3QuanMiXSwibmFtZXMiOlsiTUVUSE9EUyIsIkdFVCIsImJlZm9yZUVhY2giLCJ0IiwiY29udGV4dCIsInNlcnZlciIsInJvdXRlIiwibWFrZU1vZGVsIiwiaWQiLCJmaW5kQWxsIiwiX3BsdXJhbCIsIl9zaW5ndWxhciIsInRvSlNPTiIsIm1vZGVsIiwibW9kZWxzIiwicmVxdWVzdCIsInF1ZXJ5IiwicGF5bG9hZCIsInJlcGx5IiwicGF0aCIsImFyZ3MiLCJmYWxzeSIsImluY2x1ZGVzIiwiaXMiLCJwcmVmaXgiLCJtZXRob2QiLCJ1c2VyQ29uZmlnIiwiY29uZmlnIiwiaGFuZGxlciIsInJlc29sdmVzIiwiZSIsImlmRXJyb3IiLCJwYXNzIiwidHJ1dGh5IiwiY2FsbGVkT25jZSIsInJlc3BvbnNlIiwiRXJyb3IiLCJkZWVwRXF1YWwiLCJtYXAiLCJpc0Jvb20iLCJsaW1pdCIsImZpbmRBbGxBcmdzIiwib3JkZXIiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxNQUFNQSxVQUFVO0FBQ2RDLE9BQUs7QUFEUyxDQUFoQjs7QUFJQSxjQUFLQyxVQUFMLENBQWdCLGNBQWhCLEVBQWlDQyxDQUFELElBQU87QUFDckNBLElBQUVDLE9BQUYsQ0FBVUMsTUFBVixHQUFtQjtBQUNqQkMsV0FBTztBQURVLEdBQW5CO0FBR0QsQ0FKRDs7QUFNQSxNQUFNQyxZQUFZLE1BQU07QUFDdEIsUUFBTUMsS0FBSyx5QkFBWDtBQUNBLFNBQU87QUFDTEMsYUFBUyxrQkFESjtBQUVMQyxhQUFTLFFBRko7QUFHTEMsZUFBVyxPQUhOO0FBSUxDLFlBQVEsT0FBTyxFQUFFSixFQUFGLEVBQVAsQ0FKSDtBQUtMQTtBQUxLLEdBQVA7QUFPRCxDQVREOztBQVdBLGNBQUtOLFVBQUwsQ0FBZ0IsYUFBaEIsRUFBZ0NDLENBQUQsSUFBTztBQUNwQ0EsSUFBRUMsT0FBRixDQUFVUyxLQUFWLEdBQWtCTixX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QUNBLFFBQU1xQixjQUFjaEMsUUFBUVcsSUFBUixDQUFhLENBQWIsRUFBZ0IsQ0FBaEIsQ0FBcEI7O0FBRUFqQixJQUFFa0IsS0FBRixDQUFRYyxvQkFBb0JDLEtBQTVCLEVBQW1DRCxRQUFuQzs7QUFFQWhDLElBQUVrQyxTQUFGLENBQ0VJLFlBQVlDLEtBRGQsRUFFRSxDQUFDLENBQUMzQixRQUFRQyxLQUFSLENBQWMwQixLQUFmLENBQUQsQ0FGRixFQUdFLHFFQUhGO0FBS0Q7O0FBbENELG1CQUFLLDhCQUFMO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoiY3J1ZC50ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRlc3QgZnJvbSAnYXZhJztcbmltcG9ydCB7IGxpc3QgfSBmcm9tICcuL2NydWQuanMnO1xuaW1wb3J0IHsgc3R1YiB9IGZyb20gJ3Npbm9uJztcbmltcG9ydCB1bmlxdWVJZCBmcm9tICdsb2Rhc2gvdW5pcXVlSWQuanMnO1xuaW1wb3J0ICdzaW5vbi1ibHVlYmlyZCc7XG5cbmNvbnN0IE1FVEhPRFMgPSB7XG4gIEdFVDogJ0dFVCcsXG59O1xuXG50ZXN0LmJlZm9yZUVhY2goJ3NldHVwIHNlcnZlcicsICh0KSA9PiB7XG4gIHQuY29udGV4dC5zZXJ2ZXIgPSB7XG4gICAgcm91dGU6IHN0dWIoKSxcbiAgfTtcbn0pO1xuXG5jb25zdCBtYWtlTW9kZWwgPSAoKSA9PiB7XG4gIGNvbnN0IGlkID0gdW5pcXVlSWQoKTtcbiAgcmV0dXJuIHtcbiAgICBmaW5kQWxsOiBzdHViKCksXG4gICAgX3BsdXJhbDogJ21vZGVscycsXG4gICAgX3Npbmd1bGFyOiAnbW9kZWwnLFxuICAgIHRvSlNPTjogKCkgPT4gKHsgaWQgfSksXG4gICAgaWQsXG4gIH07XG59O1xuXG50ZXN0LmJlZm9yZUVhY2goJ3NldHVwIG1vZGVsJywgKHQpID0+IHtcbiAgdC5jb250ZXh0Lm1vZGVsID0gbWFrZU1vZGVsKCk7XG59KTtcblxudGVzdC5iZWZvcmVFYWNoKCdzZXR1cCBtb2RlbHMnLCAodCkgPT4ge1xuICB0LmNvbnRleHQubW9kZWxzID0gW3QuY29udGV4dC5tb2RlbCwgbWFrZU1vZGVsKCldO1xufSk7XG5cbnRlc3QuYmVmb3JlRWFjaCgnc2V0dXAgcmVxdWVzdCBzdHViJywgKHQpID0+IHtcbiAgdC5jb250ZXh0LnJlcXVlc3QgPSB7XG4gICAgcXVlcnk6IHt9LFxuICAgIHBheWxvYWQ6IHt9LFxuICAgIG1vZGVsczogdC5jb250ZXh0Lm1vZGVscyxcbiAgfTtcbn0pO1xuXG50ZXN0LmJlZm9yZUVhY2goJ3NldHVwIHJlcGx5IHN0dWInLCAodCkgPT4ge1xuICB0LmNvbnRleHQucmVwbHkgPSBzdHViKCk7XG59KTtcblxudGVzdCgnY3J1ZCNsaXN0IHdpdGhvdXQgcHJlZml4JywgKHQpID0+IHtcbiAgY29uc3QgeyBzZXJ2ZXIsIG1vZGVsIH0gPSB0LmNvbnRleHQ7XG5cbiAgbGlzdCh7IHNlcnZlciwgbW9kZWwgfSk7XG4gIGNvbnN0IHsgcGF0aCB9ID0gc2VydmVyLnJvdXRlLmFyZ3NbMF1bMF07XG5cbiAgdC5mYWxzeShcbiAgICBwYXRoLmluY2x1ZGVzKCd1bmRlZmluZWQnKSxcbiAgICAnY29ycmVjdGx5IHNldHMgdGhlIHBhdGggd2l0aG91dCBhIHByZWZpeCBkZWZpbmVkJyxcbiAgKTtcblxuICB0LmlzKFxuICAgIHBhdGgsXG4gICAgYC8ke21vZGVsLl9wbHVyYWx9YCxcbiAgICAndGhlIHBhdGggc2V0cyB0byB0aGUgcGx1cmFsIG1vZGVsJ1xuICApO1xufSk7XG5cbnRlc3QoJ2NydWQjbGlzdCB3aXRoIHByZWZpeCcsICh0KSA9PiB7XG4gIGNvbnN0IHsgc2VydmVyLCBtb2RlbCB9ID0gdC5jb250ZXh0O1xuICBjb25zdCBwcmVmaXggPSAnL3YxJztcblxuICBsaXN0KHsgc2VydmVyLCBtb2RlbCwgcHJlZml4IH0pO1xuICBjb25zdCB7IHBhdGggfSA9IHNlcnZlci5yb3V0ZS5hcmdzWzBdWzBdO1xuXG4gIHQuaXMoXG4gICAgcGF0aCxcbiAgICBgJHtwcmVmaXh9LyR7bW9kZWwuX3BsdXJhbH1gLFxuICAgICd0aGUgcGF0aCBzZXRzIHRvIHRoZSBwbHVyYWwgbW9kZWwgd2l0aCB0aGUgcHJlZml4J1xuICApO1xufSk7XG5cbnRlc3QoJ2NydWQjbGlzdCBtZXRob2QnLCAodCkgPT4ge1xuICBjb25zdCB7IHNlcnZlciwgbW9kZWwgfSA9IHQuY29udGV4dDtcblxuICBsaXN0KHsgc2VydmVyLCBtb2RlbCB9KTtcbiAgY29uc3QgeyBtZXRob2QgfSA9IHNlcnZlci5yb3V0ZS5hcmdzWzBdWzBdO1xuXG4gIHQuaXMoXG4gICAgbWV0aG9kLFxuICAgIE1FVEhPRFMuR0VULFxuICAgIGBzZXRzIHRoZSBtZXRob2QgdG8gJHtNRVRIT0RTLkdFVH1gXG4gICk7XG59KTtcblxudGVzdCgnY3J1ZCNsaXN0IGNvbmZpZycsICh0KSA9PiB7XG4gIGNvbnN0IHsgc2VydmVyLCBtb2RlbCB9ID0gdC5jb250ZXh0O1xuICBjb25zdCB1c2VyQ29uZmlnID0ge307XG5cbiAgbGlzdCh7IHNlcnZlciwgbW9kZWwsIGNvbmZpZzogdXNlckNvbmZpZyB9KTtcbiAgY29uc3QgeyBjb25maWcgfSA9IHNlcnZlci5yb3V0ZS5hcmdzWzBdWzBdO1xuXG4gIHQuaXMoXG4gICAgY29uZmlnLFxuICAgIHVzZXJDb25maWcsXG4gICAgJ3NldHMgdGhlIHVzZXIgY29uZmlnJ1xuICApO1xufSk7XG5cbnRlc3QoJ2NydWQjbGlzdCBoYW5kbGVyJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzZXJ2ZXIsIG1vZGVsLCByZXF1ZXN0LCByZXBseSwgbW9kZWxzIH0gPSB0LmNvbnRleHQ7XG5cbiAgbGlzdCh7IHNlcnZlciwgbW9kZWwgfSk7XG4gIGNvbnN0IHsgaGFuZGxlciB9ID0gc2VydmVyLnJvdXRlLmFyZ3NbMF1bMF07XG4gIG1vZGVsLmZpbmRBbGwucmVzb2x2ZXMobW9kZWxzKTtcblxuICB0cnkge1xuICAgIGF3YWl0IGhhbmRsZXIocmVxdWVzdCwgcmVwbHkpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgdC5pZkVycm9yKGUsICdkb2VzIG5vdCBlcnJvciB3aGlsZSBoYW5kbGluZycpO1xuICB9IGZpbmFsbHkge1xuICAgIHQucGFzcygnZG9lcyBub3QgZXJyb3Igd2hpbGUgaGFuZGxpbmcnKTtcbiAgfVxuXG4gIHQudHJ1dGh5KFxuICAgIHJlcGx5LmNhbGxlZE9uY2VcbiAgICAsICdjYWxscyByZXBseSBvbmx5IG9uY2UnXG4gICk7XG5cbiAgY29uc3QgcmVzcG9uc2UgPSByZXBseS5hcmdzWzBdWzBdO1xuXG4gIHQuZmFsc3kocmVzcG9uc2UgaW5zdGFuY2VvZiBFcnJvciwgcmVzcG9uc2UpO1xuXG4gIHQuZGVlcEVxdWFsKFxuICAgIHJlc3BvbnNlLFxuICAgIG1vZGVscy5tYXAoKHsgaWQgfSkgPT4gKHsgaWQgfSkpLFxuICAgICdyZXNwb25kcyB3aXRoIHRoZSBsaXN0IG9mIG1vZGVscydcbiAgKTtcbn0pO1xuXG50ZXN0KCdjcnVkI2xpc3QgaGFuZGxlciBpZiBwYXJzZUluY2x1ZGUgZXJyb3JzJywgYXN5bmMgKHQpID0+IHtcbiAgY29uc3QgeyBzZXJ2ZXIsIG1vZGVsLCByZXF1ZXN0LCByZXBseSB9ID0gdC5jb250ZXh0O1xuICAvLyB3ZSBfd2FudF8gdGhlIGVycm9yXG4gIGRlbGV0ZSByZXF1ZXN0Lm1vZGVscztcblxuICBsaXN0KHsgc2VydmVyLCBtb2RlbCB9KTtcbiAgY29uc3QgeyBoYW5kbGVyIH0gPSBzZXJ2ZXIucm91dGUuYXJnc1swXVswXTtcblxuICBhd2FpdCBoYW5kbGVyKHJlcXVlc3QsIHJlcGx5KTtcblxuICB0LnRydXRoeShcbiAgICByZXBseS5jYWxsZWRPbmNlXG4gICAgLCAnY2FsbHMgcmVwbHkgb25seSBvbmNlJ1xuICApO1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gcmVwbHkuYXJnc1swXVswXTtcblxuICB0LnRydXRoeShcbiAgICByZXNwb25zZS5pc0Jvb20sXG4gICAgJ3Jlc3BvbmRzIHdpdGggYSBCb29tIGVycm9yJ1xuICApO1xufSk7XG5cbnRlc3QoJ2NydWQjbGlzdCBoYW5kbGVyIHdpdGggbGltaXQnLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHNlcnZlciwgbW9kZWwsIHJlcXVlc3QsIHJlcGx5LCBtb2RlbHMgfSA9IHQuY29udGV4dDtcbiAgY29uc3QgeyBmaW5kQWxsIH0gPSBtb2RlbDtcblxuICAvLyBzZXQgdGhlIGxpbWl0XG4gIHJlcXVlc3QucXVlcnkubGltaXQgPSAxO1xuXG4gIGxpc3QoeyBzZXJ2ZXIsIG1vZGVsIH0pO1xuICBjb25zdCB7IGhhbmRsZXIgfSA9IHNlcnZlci5yb3V0ZS5hcmdzWzBdWzBdO1xuICBtb2RlbC5maW5kQWxsLnJlc29sdmVzKG1vZGVscyk7XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCBoYW5kbGVyKHJlcXVlc3QsIHJlcGx5KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHQuaWZFcnJvcihlLCAnZG9lcyBub3QgZXJyb3Igd2hpbGUgaGFuZGxpbmcnKTtcbiAgfSBmaW5hbGx5IHtcbiAgICB0LnBhc3MoJ2RvZXMgbm90IGVycm9yIHdoaWxlIGhhbmRsaW5nJyk7XG4gIH1cblxuICB0LnRydXRoeShcbiAgICByZXBseS5jYWxsZWRPbmNlXG4gICAgLCAnY2FsbHMgcmVwbHkgb25seSBvbmNlJ1xuICApO1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gcmVwbHkuYXJnc1swXVswXTtcbiAgY29uc3QgZmluZEFsbEFyZ3MgPSBmaW5kQWxsLmFyZ3NbMF1bMF07XG5cbiAgdC5mYWxzeShyZXNwb25zZSBpbnN0YW5jZW9mIEVycm9yLCByZXNwb25zZSk7XG5cbiAgdC5pcyhcbiAgICBmaW5kQWxsQXJncy5saW1pdCxcbiAgICByZXF1ZXN0LnF1ZXJ5LmxpbWl0LFxuICAgICdxdWVyaWVzIHdpdGggdGhlIGxpbWl0J1xuICApO1xufSk7XG5cbnRlc3QoJ2NydWQjbGlzdCBoYW5kbGVyIHdpdGggb3JkZXInLCBhc3luYyAodCkgPT4ge1xuICBjb25zdCB7IHNlcnZlciwgbW9kZWwsIHJlcXVlc3QsIHJlcGx5LCBtb2RlbHMgfSA9IHQuY29udGV4dDtcbiAgY29uc3QgeyBmaW5kQWxsIH0gPSBtb2RlbDtcblxuICAvLyBzZXQgdGhlIGxpbWl0XG4gIHJlcXVlc3QucXVlcnkub3JkZXIgPSAna2V5JztcblxuICBsaXN0KHsgc2VydmVyLCBtb2RlbCB9KTtcbiAgY29uc3QgeyBoYW5kbGVyIH0gPSBzZXJ2ZXIucm91dGUuYXJnc1swXVswXTtcbiAgbW9kZWwuZmluZEFsbC5yZXNvbHZlcyhtb2RlbHMpO1xuXG4gIHRyeSB7XG4gICAgYXdhaXQgaGFuZGxlcihyZXF1ZXN0LCByZXBseSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0LmlmRXJyb3IoZSwgJ2RvZXMgbm90IGVycm9yIHdoaWxlIGhhbmRsaW5nJyk7XG4gIH0gZmluYWxseSB7XG4gICAgdC5wYXNzKCdkb2VzIG5vdCBlcnJvciB3aGlsZSBoYW5kbGluZycpO1xuICB9XG5cbiAgdC50cnV0aHkoXG4gICAgcmVwbHkuY2FsbGVkT25jZVxuICAgICwgJ2NhbGxzIHJlcGx5IG9ubHkgb25jZSdcbiAgKTtcblxuICBjb25zdCByZXNwb25zZSA9IHJlcGx5LmFyZ3NbMF1bMF07XG4gIGNvbnN0IGZpbmRBbGxBcmdzID0gZmluZEFsbC5hcmdzWzBdWzBdO1xuXG4gIHQuZmFsc3kocmVzcG9uc2UgaW5zdGFuY2VvZiBFcnJvciwgcmVzcG9uc2UpO1xuXG4gIHQuZGVlcEVxdWFsKFxuICAgIGZpbmRBbGxBcmdzLm9yZGVyLFxuICAgIFtbcmVxdWVzdC5xdWVyeS5vcmRlcl1dLFxuICAgICdxdWVyaWVzIHdpdGggdGhlIG9yZGVyIGFzIGFuIGFycmF5IGIvYyB0aGF0XFwncyB3aGF0IHNlcXVlbGl6ZSB3YW50cydcbiAgKTtcbn0pO1xuIl19