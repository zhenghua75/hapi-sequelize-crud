'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (target, key, descriptor) => {
  const fn = descriptor.value;

  function* _ref2(request, reply) {
    try {
      yield fn(request, reply);
    } catch (e) {
      if (e.original) {
        const { code, detail, hint } = e.original;
        let error;

        // pg error codes https://www.postgresql.org/docs/9.5/static/errcodes-appendix.html
        if (code && (code.startsWith('22') || code.startsWith('23'))) {
          error = _boom2.default.wrap(e, 406);
        } else if (code && code.startsWith('42')) {
          error = _boom2.default.wrap(e, 422);
          // TODO: we could get better at parse postgres error codes
        } else {
          // use a 502 error code since the issue is upstream with postgres, not
          // this server
          error = _boom2.default.wrap(e, 502);
        }

        // detail tends to be more specific information. So, if we have it, use.
        if (detail) {
          error.message += `: ${ detail }`;
          error.reformat();
        }

        // hint might provide useful information about how to fix the problem
        if (hint) {
          error.message += ` Hint: ${ hint }`;
          error.reformat();
        }

        reply(error);
      } else if (!e.isBoom) {
        const { message } = e;
        let err;

        if (e.name === 'SequelizeValidationError') err = _boom2.default.badData(message);else if (e.name === 'SequelizeConnectionTimedOutError') err = _boom2.default.gatewayTimeout(message);else if (e.name === 'SequelizeHostNotReachableError') err = _boom2.default.serverUnavailable(message);else if (e.name === 'SequelizeUniqueConstraintError') err = _boom2.default.conflict(message);else if (e.name === 'SequelizeForeignKeyConstraintError') err = _boom2.default.expectationFailed(message);else if (e.name === 'SequelizeExclusionConstraintError') err = _boom2.default.expectationFailed(message);else if (e.name === 'SequelizeConnectionError') err = _boom2.default.badGateway(message);else err = _boom2.default.badImplementation(message);

        reply(err);
      } else {
        reply(e);
      }
    }
  }

  descriptor.value = (() => {
    var _ref = _asyncToGenerator(_ref2);

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  })();

  return descriptor;
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lcnJvci5qcyJdLCJuYW1lcyI6WyJ0YXJnZXQiLCJrZXkiLCJkZXNjcmlwdG9yIiwiZm4iLCJ2YWx1ZSIsInJlcXVlc3QiLCJyZXBseSIsImUiLCJvcmlnaW5hbCIsImNvZGUiLCJkZXRhaWwiLCJoaW50IiwiZXJyb3IiLCJzdGFydHNXaXRoIiwid3JhcCIsIm1lc3NhZ2UiLCJyZWZvcm1hdCIsImlzQm9vbSIsImVyciIsIm5hbWUiLCJiYWREYXRhIiwiZ2F0ZXdheVRpbWVvdXQiLCJzZXJ2ZXJVbmF2YWlsYWJsZSIsImNvbmZsaWN0IiwiZXhwZWN0YXRpb25GYWlsZWQiLCJiYWRHYXRld2F5IiwiYmFkSW1wbGVtZW50YXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7OztrQkFFZSxDQUFDQSxNQUFELEVBQVNDLEdBQVQsRUFBY0MsVUFBZCxLQUE2QjtBQUMxQyxRQUFNQyxLQUFLRCxXQUFXRSxLQUF0Qjs7QUFFbUIsa0JBQU9DLE9BQVAsRUFBZ0JDLEtBQWhCLEVBQTBCO0FBQzNDLFFBQUk7QUFDRixZQUFNSCxHQUFHRSxPQUFILEVBQVlDLEtBQVosQ0FBTjtBQUNELEtBRkQsQ0FFRSxPQUFPQyxDQUFQLEVBQVU7QUFDVixVQUFJQSxFQUFFQyxRQUFOLEVBQWdCO0FBQ2QsY0FBTSxFQUFFQyxJQUFGLEVBQVFDLE1BQVIsRUFBZ0JDLElBQWhCLEtBQXlCSixFQUFFQyxRQUFqQztBQUNBLFlBQUlJLEtBQUo7O0FBRUE7QUFDQSxZQUFJSCxTQUFTQSxLQUFLSSxVQUFMLENBQWdCLElBQWhCLEtBQXlCSixLQUFLSSxVQUFMLENBQWdCLElBQWhCLENBQWxDLENBQUosRUFBOEQ7QUFDNURELGtCQUFRLGVBQUtFLElBQUwsQ0FBVVAsQ0FBVixFQUFhLEdBQWIsQ0FBUjtBQUNELFNBRkQsTUFFTyxJQUFJRSxRQUFTQSxLQUFLSSxVQUFMLENBQWdCLElBQWhCLENBQWIsRUFBcUM7QUFDMUNELGtCQUFRLGVBQUtFLElBQUwsQ0FBVVAsQ0FBVixFQUFhLEdBQWIsQ0FBUjtBQUNGO0FBQ0MsU0FITSxNQUdBO0FBQ0w7QUFDQTtBQUNBSyxrQkFBUSxlQUFLRSxJQUFMLENBQVVQLENBQVYsRUFBYSxHQUFiLENBQVI7QUFDRDs7QUFFRDtBQUNBLFlBQUlHLE1BQUosRUFBWTtBQUNWRSxnQkFBTUcsT0FBTixJQUFrQixNQUFJTCxNQUFPLEdBQTdCO0FBQ0FFLGdCQUFNSSxRQUFOO0FBQ0Q7O0FBRUQ7QUFDQSxZQUFJTCxJQUFKLEVBQVU7QUFDUkMsZ0JBQU1HLE9BQU4sSUFBa0IsV0FBU0osSUFBSyxHQUFoQztBQUNBQyxnQkFBTUksUUFBTjtBQUNEOztBQUVEVixjQUFNTSxLQUFOO0FBQ0QsT0E3QkQsTUE2Qk8sSUFBSSxDQUFDTCxFQUFFVSxNQUFQLEVBQWU7QUFDcEIsY0FBTSxFQUFFRixPQUFGLEtBQWNSLENBQXBCO0FBQ0EsWUFBSVcsR0FBSjs7QUFFQSxZQUFJWCxFQUFFWSxJQUFGLEtBQVcsMEJBQWYsRUFDRUQsTUFBTSxlQUFLRSxPQUFMLENBQWFMLE9BQWIsQ0FBTixDQURGLEtBRUssSUFBSVIsRUFBRVksSUFBRixLQUFXLGtDQUFmLEVBQ0hELE1BQU0sZUFBS0csY0FBTCxDQUFvQk4sT0FBcEIsQ0FBTixDQURHLEtBRUEsSUFBSVIsRUFBRVksSUFBRixLQUFXLGdDQUFmLEVBQ0hELE1BQU0sZUFBS0ksaUJBQUwsQ0FBdUJQLE9BQXZCLENBQU4sQ0FERyxLQUVBLElBQUlSLEVBQUVZLElBQUYsS0FBVyxnQ0FBZixFQUNIRCxNQUFNLGVBQUtLLFFBQUwsQ0FBY1IsT0FBZCxDQUFOLENBREcsS0FFQSxJQUFJUixFQUFFWSxJQUFGLEtBQVcsb0NBQWYsRUFDSEQsTUFBTSxlQUFLTSxpQkFBTCxDQUF1QlQsT0FBdkIsQ0FBTixDQURHLEtBRUEsSUFBSVIsRUFBRVksSUFBRixLQUFXLG1DQUFmLEVBQ0hELE1BQU0sZUFBS00saUJBQUwsQ0FBdUJULE9BQXZCLENBQU4sQ0FERyxLQUVBLElBQUlSLEVBQUVZLElBQUYsS0FBVywwQkFBZixFQUNIRCxNQUFNLGVBQUtPLFVBQUwsQ0FBZ0JWLE9BQWhCLENBQU4sQ0FERyxLQUVBRyxNQUFNLGVBQUtRLGlCQUFMLENBQXVCWCxPQUF2QixDQUFOOztBQUVMVCxjQUFNWSxHQUFOO0FBQ0QsT0FyQk0sTUFxQkE7QUFDTFosY0FBTUMsQ0FBTjtBQUNEO0FBQ0Y7QUFDRjs7QUExRERMLGFBQVdFLEtBQVg7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUE0REEsU0FBT0YsVUFBUDtBQUNELEMiLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQm9vbSBmcm9tICdib29tJztcblxuZXhwb3J0IGRlZmF1bHQgKHRhcmdldCwga2V5LCBkZXNjcmlwdG9yKSA9PiB7XG4gIGNvbnN0IGZuID0gZGVzY3JpcHRvci52YWx1ZTtcblxuICBkZXNjcmlwdG9yLnZhbHVlID0gYXN5bmMgKHJlcXVlc3QsIHJlcGx5KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGZuKHJlcXVlc3QsIHJlcGx5KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZS5vcmlnaW5hbCkge1xuICAgICAgICBjb25zdCB7IGNvZGUsIGRldGFpbCwgaGludCB9ID0gZS5vcmlnaW5hbDtcbiAgICAgICAgbGV0IGVycm9yO1xuXG4gICAgICAgIC8vIHBnIGVycm9yIGNvZGVzIGh0dHBzOi8vd3d3LnBvc3RncmVzcWwub3JnL2RvY3MvOS41L3N0YXRpYy9lcnJjb2Rlcy1hcHBlbmRpeC5odG1sXG4gICAgICAgIGlmIChjb2RlICYmIChjb2RlLnN0YXJ0c1dpdGgoJzIyJykgfHwgY29kZS5zdGFydHNXaXRoKCcyMycpKSkge1xuICAgICAgICAgIGVycm9yID0gQm9vbS53cmFwKGUsIDQwNik7XG4gICAgICAgIH0gZWxzZSBpZiAoY29kZSAmJiAoY29kZS5zdGFydHNXaXRoKCc0MicpKSkge1xuICAgICAgICAgIGVycm9yID0gQm9vbS53cmFwKGUsIDQyMik7XG4gICAgICAgIC8vIFRPRE86IHdlIGNvdWxkIGdldCBiZXR0ZXIgYXQgcGFyc2UgcG9zdGdyZXMgZXJyb3IgY29kZXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB1c2UgYSA1MDIgZXJyb3IgY29kZSBzaW5jZSB0aGUgaXNzdWUgaXMgdXBzdHJlYW0gd2l0aCBwb3N0Z3Jlcywgbm90XG4gICAgICAgICAgLy8gdGhpcyBzZXJ2ZXJcbiAgICAgICAgICBlcnJvciA9IEJvb20ud3JhcChlLCA1MDIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGV0YWlsIHRlbmRzIHRvIGJlIG1vcmUgc3BlY2lmaWMgaW5mb3JtYXRpb24uIFNvLCBpZiB3ZSBoYXZlIGl0LCB1c2UuXG4gICAgICAgIGlmIChkZXRhaWwpIHtcbiAgICAgICAgICBlcnJvci5tZXNzYWdlICs9IGA6ICR7ZGV0YWlsfWA7XG4gICAgICAgICAgZXJyb3IucmVmb3JtYXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGhpbnQgbWlnaHQgcHJvdmlkZSB1c2VmdWwgaW5mb3JtYXRpb24gYWJvdXQgaG93IHRvIGZpeCB0aGUgcHJvYmxlbVxuICAgICAgICBpZiAoaGludCkge1xuICAgICAgICAgIGVycm9yLm1lc3NhZ2UgKz0gYCBIaW50OiAke2hpbnR9YDtcbiAgICAgICAgICBlcnJvci5yZWZvcm1hdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVwbHkoZXJyb3IpO1xuICAgICAgfSBlbHNlIGlmICghZS5pc0Jvb20pIHtcbiAgICAgICAgY29uc3QgeyBtZXNzYWdlIH0gPSBlO1xuICAgICAgICBsZXQgZXJyO1xuXG4gICAgICAgIGlmIChlLm5hbWUgPT09ICdTZXF1ZWxpemVWYWxpZGF0aW9uRXJyb3InKVxuICAgICAgICAgIGVyciA9IEJvb20uYmFkRGF0YShtZXNzYWdlKTtcbiAgICAgICAgZWxzZSBpZiAoZS5uYW1lID09PSAnU2VxdWVsaXplQ29ubmVjdGlvblRpbWVkT3V0RXJyb3InKVxuICAgICAgICAgIGVyciA9IEJvb20uZ2F0ZXdheVRpbWVvdXQobWVzc2FnZSk7XG4gICAgICAgIGVsc2UgaWYgKGUubmFtZSA9PT0gJ1NlcXVlbGl6ZUhvc3ROb3RSZWFjaGFibGVFcnJvcicpXG4gICAgICAgICAgZXJyID0gQm9vbS5zZXJ2ZXJVbmF2YWlsYWJsZShtZXNzYWdlKTtcbiAgICAgICAgZWxzZSBpZiAoZS5uYW1lID09PSAnU2VxdWVsaXplVW5pcXVlQ29uc3RyYWludEVycm9yJylcbiAgICAgICAgICBlcnIgPSBCb29tLmNvbmZsaWN0KG1lc3NhZ2UpO1xuICAgICAgICBlbHNlIGlmIChlLm5hbWUgPT09ICdTZXF1ZWxpemVGb3JlaWduS2V5Q29uc3RyYWludEVycm9yJylcbiAgICAgICAgICBlcnIgPSBCb29tLmV4cGVjdGF0aW9uRmFpbGVkKG1lc3NhZ2UpO1xuICAgICAgICBlbHNlIGlmIChlLm5hbWUgPT09ICdTZXF1ZWxpemVFeGNsdXNpb25Db25zdHJhaW50RXJyb3InKVxuICAgICAgICAgIGVyciA9IEJvb20uZXhwZWN0YXRpb25GYWlsZWQobWVzc2FnZSk7XG4gICAgICAgIGVsc2UgaWYgKGUubmFtZSA9PT0gJ1NlcXVlbGl6ZUNvbm5lY3Rpb25FcnJvcicpXG4gICAgICAgICAgZXJyID0gQm9vbS5iYWRHYXRld2F5KG1lc3NhZ2UpO1xuICAgICAgICBlbHNlIGVyciA9IEJvb20uYmFkSW1wbGVtZW50YXRpb24obWVzc2FnZSk7XG5cbiAgICAgICAgcmVwbHkoZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcGx5KGUpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gZGVzY3JpcHRvcjtcbn07XG4iXX0=