'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

require('sinon-bluebird');

var _integrationSetup = require('../test/integration-setup.js');

var _integrationSetup2 = _interopRequireDefault(_integrationSetup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { modelNames } = (0, _integrationSetup2.default)(_ava2.default);

const confirmRoute = (t, { path, method }) => {
  const { server } = t.context;
  // there's only one connection, so just get the first table
  const routes = server.table()[0].table;

  t.truthy(routes.find(route => {
    return route.path = path && route.method === method;
  }));
};

modelNames.forEach(({ singular, plural }) => {
  (0, _ava2.default)('get', confirmRoute, { path: `/${ singular }/{id}`, method: 'get' });
  (0, _ava2.default)('list', confirmRoute, { path: `/${ plural }/{id}`, method: 'get' });
  (0, _ava2.default)('scope', confirmRoute, { path: `/${ plural }/{scope}`, method: 'get' });
  (0, _ava2.default)('create', confirmRoute, { path: `/${ singular }`, method: 'post' });
  (0, _ava2.default)('destroy', confirmRoute, { path: `/${ plural }`, method: 'delete' });
  (0, _ava2.default)('destroyScope', confirmRoute, { path: `/${ plural }/{scope}`, method: 'delete' });
  (0, _ava2.default)('update', confirmRoute, { path: `/${ singular }/{id}`, method: 'put' });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jcnVkLXJvdXRlLWNyZWF0aW9uLmludGVncmF0aW9uLnRlc3QuanMiXSwibmFtZXMiOlsibW9kZWxOYW1lcyIsImNvbmZpcm1Sb3V0ZSIsInQiLCJwYXRoIiwibWV0aG9kIiwic2VydmVyIiwiY29udGV4dCIsInJvdXRlcyIsInRhYmxlIiwidHJ1dGh5IiwiZmluZCIsInJvdXRlIiwiZm9yRWFjaCIsInNpbmd1bGFyIiwicGx1cmFsIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBLE1BQU0sRUFBRUEsVUFBRixLQUFpQiw4Q0FBdkI7O0FBRUEsTUFBTUMsZUFBZSxDQUFDQyxDQUFELEVBQUksRUFBRUMsSUFBRixFQUFRQyxNQUFSLEVBQUosS0FBeUI7QUFDNUMsUUFBTSxFQUFFQyxNQUFGLEtBQWFILEVBQUVJLE9BQXJCO0FBQ0E7QUFDQSxRQUFNQyxTQUFTRixPQUFPRyxLQUFQLEdBQWUsQ0FBZixFQUFrQkEsS0FBakM7O0FBRUFOLElBQUVPLE1BQUYsQ0FBU0YsT0FBT0csSUFBUCxDQUFhQyxLQUFELElBQVc7QUFDOUIsV0FBT0EsTUFBTVIsSUFBTixHQUFhQSxRQUNmUSxNQUFNUCxNQUFOLEtBQWlCQSxNQUR0QjtBQUVELEdBSFEsQ0FBVDtBQUlELENBVEQ7O0FBV0FKLFdBQVdZLE9BQVgsQ0FBbUIsQ0FBQyxFQUFFQyxRQUFGLEVBQVlDLE1BQVosRUFBRCxLQUEwQjtBQUMzQyxxQkFBSyxLQUFMLEVBQVliLFlBQVosRUFBMEIsRUFBRUUsTUFBTyxLQUFHVSxRQUFTLFFBQXJCLEVBQTZCVCxRQUFRLEtBQXJDLEVBQTFCO0FBQ0EscUJBQUssTUFBTCxFQUFhSCxZQUFiLEVBQTJCLEVBQUVFLE1BQU8sS0FBR1csTUFBTyxRQUFuQixFQUEyQlYsUUFBUSxLQUFuQyxFQUEzQjtBQUNBLHFCQUFLLE9BQUwsRUFBY0gsWUFBZCxFQUE0QixFQUFFRSxNQUFPLEtBQUdXLE1BQU8sV0FBbkIsRUFBOEJWLFFBQVEsS0FBdEMsRUFBNUI7QUFDQSxxQkFBSyxRQUFMLEVBQWVILFlBQWYsRUFBNkIsRUFBRUUsTUFBTyxLQUFHVSxRQUFTLEdBQXJCLEVBQXdCVCxRQUFRLE1BQWhDLEVBQTdCO0FBQ0EscUJBQUssU0FBTCxFQUFnQkgsWUFBaEIsRUFBOEIsRUFBRUUsTUFBTyxLQUFHVyxNQUFPLEdBQW5CLEVBQXNCVixRQUFRLFFBQTlCLEVBQTlCO0FBQ0EscUJBQUssY0FBTCxFQUFxQkgsWUFBckIsRUFBbUMsRUFBRUUsTUFBTyxLQUFHVyxNQUFPLFdBQW5CLEVBQThCVixRQUFRLFFBQXRDLEVBQW5DO0FBQ0EscUJBQUssUUFBTCxFQUFlSCxZQUFmLEVBQTZCLEVBQUVFLE1BQU8sS0FBR1UsUUFBUyxRQUFyQixFQUE2QlQsUUFBUSxLQUFyQyxFQUE3QjtBQUNELENBUkQiLCJmaWxlIjoiY3J1ZC1yb3V0ZS1jcmVhdGlvbi5pbnRlZ3JhdGlvbi50ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRlc3QgZnJvbSAnYXZhJztcbmltcG9ydCAnc2lub24tYmx1ZWJpcmQnO1xuaW1wb3J0IHNldHVwIGZyb20gJy4uL3Rlc3QvaW50ZWdyYXRpb24tc2V0dXAuanMnO1xuXG5jb25zdCB7IG1vZGVsTmFtZXMgfSA9IHNldHVwKHRlc3QpO1xuXG5jb25zdCBjb25maXJtUm91dGUgPSAodCwgeyBwYXRoLCBtZXRob2QgfSkgPT4ge1xuICBjb25zdCB7IHNlcnZlciB9ID0gdC5jb250ZXh0O1xuICAvLyB0aGVyZSdzIG9ubHkgb25lIGNvbm5lY3Rpb24sIHNvIGp1c3QgZ2V0IHRoZSBmaXJzdCB0YWJsZVxuICBjb25zdCByb3V0ZXMgPSBzZXJ2ZXIudGFibGUoKVswXS50YWJsZTtcblxuICB0LnRydXRoeShyb3V0ZXMuZmluZCgocm91dGUpID0+IHtcbiAgICByZXR1cm4gcm91dGUucGF0aCA9IHBhdGhcbiAgICAgICYmIHJvdXRlLm1ldGhvZCA9PT0gbWV0aG9kO1xuICB9KSk7XG59O1xuXG5tb2RlbE5hbWVzLmZvckVhY2goKHsgc2luZ3VsYXIsIHBsdXJhbCB9KSA9PiB7XG4gIHRlc3QoJ2dldCcsIGNvbmZpcm1Sb3V0ZSwgeyBwYXRoOiBgLyR7c2luZ3VsYXJ9L3tpZH1gLCBtZXRob2Q6ICdnZXQnIH0pO1xuICB0ZXN0KCdsaXN0JywgY29uZmlybVJvdXRlLCB7IHBhdGg6IGAvJHtwbHVyYWx9L3tpZH1gLCBtZXRob2Q6ICdnZXQnIH0pO1xuICB0ZXN0KCdzY29wZScsIGNvbmZpcm1Sb3V0ZSwgeyBwYXRoOiBgLyR7cGx1cmFsfS97c2NvcGV9YCwgbWV0aG9kOiAnZ2V0JyB9KTtcbiAgdGVzdCgnY3JlYXRlJywgY29uZmlybVJvdXRlLCB7IHBhdGg6IGAvJHtzaW5ndWxhcn1gLCBtZXRob2Q6ICdwb3N0JyB9KTtcbiAgdGVzdCgnZGVzdHJveScsIGNvbmZpcm1Sb3V0ZSwgeyBwYXRoOiBgLyR7cGx1cmFsfWAsIG1ldGhvZDogJ2RlbGV0ZScgfSk7XG4gIHRlc3QoJ2Rlc3Ryb3lTY29wZScsIGNvbmZpcm1Sb3V0ZSwgeyBwYXRoOiBgLyR7cGx1cmFsfS97c2NvcGV9YCwgbWV0aG9kOiAnZGVsZXRlJyB9KTtcbiAgdGVzdCgndXBkYXRlJywgY29uZmlybVJvdXRlLCB7IHBhdGg6IGAvJHtzaW5ndWxhcn0ve2lkfWAsIG1ldGhvZDogJ3B1dCcgfSk7XG59KTtcbiJdfQ==