'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = undefined;

var _crud = require('./crud');

var _crud2 = _interopRequireDefault(_crud);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!global._babelPolyfill) {
  require('babel-polyfill');
}

function _ref(request, reply) {
  const uri = request.raw.req.url;
  const parsed = _url2.default.parse(uri, false);
  parsed.query = _qs2.default.parse(parsed.query);
  request.setUrl(parsed);

  return reply.continue();
}

const register = (server, options = {}, next) => {
  server.dependency('hapi-sequelize');

  options.prefix = options.prefix || '/';
  options.name = options.name || 'db';

  const db = server.plugins['hapi-sequelize'][options.name];
  const models = db.sequelize.models;

  const onRequest = _ref;

  server.ext({
    type: 'onRequest',
    method: onRequest
  });

  for (const modelName of Object.keys(models)) {
    const model = models[modelName];
    const { plural, singular } = model.options.name;
    model._plural = plural.toLowerCase();
    model._singular = singular.toLowerCase();
    model._Plural = plural;
    model._Singular = singular;

    // Join tables
    if (model.options.name.singular !== model.name) continue;

    for (const key of Object.keys(model.associations)) {
      const association = model.associations[key];
      const { source, target } = association;

      const sourceName = source.options.name;

      const names = rev => {
        const arr = [{
          plural: sourceName.plural.toLowerCase(),
          singular: sourceName.singular.toLowerCase(),
          original: sourceName
        }, {
          plural: association.options.name.plural.toLowerCase(),
          singular: association.options.name.singular.toLowerCase(),
          original: association.options.name
        }];

        return rev ? { b: arr[0], a: arr[1] } : { a: arr[0], b: arr[1] };
      };

      const targetAssociations = target.associations[sourceName.plural] || target.associations[sourceName.singular];
      const sourceType = association.associationType,
            targetType = (targetAssociations || {}).associationType;

      try {
        if (sourceType === 'BelongsTo' && (targetType === 'BelongsTo' || !targetType)) {
          _crud.associations.oneToOne(server, source, target, names(), options);
          _crud.associations.oneToOne(server, target, source, names(1), options);
        }

        if (sourceType === 'BelongsTo' && targetType === 'HasMany') {
          _crud.associations.oneToOne(server, source, target, names(), options);
          _crud.associations.oneToOne(server, target, source, names(1), options);
          _crud.associations.oneToMany(server, target, source, names(1), options);
        }

        if (sourceType === 'BelongsToMany' && targetType === 'BelongsToMany') {
          _crud.associations.oneToOne(server, source, target, names(), options);
          _crud.associations.oneToOne(server, target, source, names(1), options);

          _crud.associations.oneToMany(server, source, target, names(), options);
          _crud.associations.oneToMany(server, target, source, names(1), options);
        }

        _crud.associations.associate(server, source, target, names(), options);
        _crud.associations.associate(server, target, source, names(1), options);
      } catch (e) {
        // There might be conflicts in case of models associated with themselves and some other
        // rare cases.
      }
    }
  }

  // build the methods for each model now that we've defined all the
  // associations
  Object.keys(models).forEach(modelName => {
    const model = models[modelName];
    (0, _crud2.default)(server, model, options);
  });

  return next();
};

register.attributes = {
  pkg: require('../package.json')
};

exports.register = register;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJnbG9iYWwiLCJfYmFiZWxQb2x5ZmlsbCIsInJlcXVpcmUiLCJyZXF1ZXN0IiwicmVwbHkiLCJ1cmkiLCJyYXciLCJyZXEiLCJ1cmwiLCJwYXJzZWQiLCJwYXJzZSIsInF1ZXJ5Iiwic2V0VXJsIiwiY29udGludWUiLCJyZWdpc3RlciIsInNlcnZlciIsIm9wdGlvbnMiLCJuZXh0IiwiZGVwZW5kZW5jeSIsInByZWZpeCIsIm5hbWUiLCJkYiIsInBsdWdpbnMiLCJtb2RlbHMiLCJzZXF1ZWxpemUiLCJvblJlcXVlc3QiLCJleHQiLCJ0eXBlIiwibWV0aG9kIiwibW9kZWxOYW1lIiwiT2JqZWN0Iiwia2V5cyIsIm1vZGVsIiwicGx1cmFsIiwic2luZ3VsYXIiLCJfcGx1cmFsIiwidG9Mb3dlckNhc2UiLCJfc2luZ3VsYXIiLCJfUGx1cmFsIiwiX1Npbmd1bGFyIiwia2V5IiwiYXNzb2NpYXRpb25zIiwiYXNzb2NpYXRpb24iLCJzb3VyY2UiLCJ0YXJnZXQiLCJzb3VyY2VOYW1lIiwibmFtZXMiLCJyZXYiLCJhcnIiLCJvcmlnaW5hbCIsImIiLCJhIiwidGFyZ2V0QXNzb2NpYXRpb25zIiwic291cmNlVHlwZSIsImFzc29jaWF0aW9uVHlwZSIsInRhcmdldFR5cGUiLCJvbmVUb09uZSIsIm9uZVRvTWFueSIsImFzc29jaWF0ZSIsImUiLCJmb3JFYWNoIiwiYXR0cmlidXRlcyIsInBrZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBTkEsSUFBSSxDQUFDQSxPQUFPQyxjQUFaLEVBQTRCO0FBQzFCQyxVQUFRLGdCQUFSO0FBQ0Q7O0FBZ0JtQixjQUFVQyxPQUFWLEVBQW1CQyxLQUFuQixFQUEwQjtBQUMxQyxRQUFNQyxNQUFNRixRQUFRRyxHQUFSLENBQVlDLEdBQVosQ0FBZ0JDLEdBQTVCO0FBQ0EsUUFBTUMsU0FBUyxjQUFJQyxLQUFKLENBQVVMLEdBQVYsRUFBZSxL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dkIsRUFBK0I2QixNQUEvQixFQUF1Q0QsTUFBdkMsRUFBK0NHLE1BQU0sQ0FBTixDQUEvQyxFQUF5RDlCLE9BQXpEO0FBQ0Q7O0FBRUQsMkJBQWEwQyxTQUFiLENBQXVCM0MsTUFBdkIsRUFBK0I0QixNQUEvQixFQUF1Q0MsTUFBdkMsRUFBK0NFLE9BQS9DLEVBQXdEOUIsT0FBeEQ7QUFDQSwyQkFBYTBDLFNBQWIsQ0FBdUIzQyxNQUF2QixFQUErQjZCLE1BQS9CLEVBQXVDRCxNQUF2QyxFQUErQ0csTUFBTSxDQUFOLENBQS9DLEVBQXlEOUIsT0FBekQ7QUFDRCxPQXRCRCxDQXNCRSxPQUFPMkMsQ0FBUCxFQUFVO0FBQ1Y7QUFDQTtBQUNEO0FBQ0Y7QUFDRjs7QUFFRDtBQUNBO0FBQ0E3QixTQUFPQyxJQUFQLENBQVlSLE1BQVosRUFBb0JxQyxPQUFwQixDQUE2Qi9CLFNBQUQsSUFBZTtBQUN6QyxVQUFNRyxRQUFRVCxPQUFPTSxTQUFQLENBQWQ7QUFDQSx3QkFBS2QsTUFBTCxFQUFhaUIsS0FBYixFQUFvQmhCLE9BQXBCO0FBQ0QsR0FIRDs7QUFLQSxTQUFPQyxNQUFQO0FBQ0QsQ0FqR0Q7O0FBbUdBSCxTQUFTK0MsVUFBVCxHQUFzQjtBQUNwQkMsT0FBSzVELFFBQVEsaUJBQVI7QUFEZSxDQUF0Qjs7UUFJU1ksUSxHQUFBQSxRIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaWYgKCFnbG9iYWwuX2JhYmVsUG9seWZpbGwpIHtcbiAgcmVxdWlyZSgnYmFiZWwtcG9seWZpbGwnKTtcbn1cblxuaW1wb3J0IGNydWQsIHsgYXNzb2NpYXRpb25zIH0gZnJvbSAnLi9jcnVkJztcbmltcG9ydCB1cmwgZnJvbSAndXJsJztcbmltcG9ydCBxcyBmcm9tICdxcyc7XG5cblxuY29uc3QgcmVnaXN0ZXIgPSAoc2VydmVyLCBvcHRpb25zID0ge30sIG5leHQpID0+IHtcbiAgc2VydmVyLmRlcGVuZGVuY3koJ2hhcGktc2VxdWVsaXplJyk7XG5cbiAgb3B0aW9ucy5wcmVmaXggPSBvcHRpb25zLnByZWZpeCB8fCAnLyc7XG4gIG9wdGlvbnMubmFtZSA9IG9wdGlvbnMubmFtZSB8fCAnZGInO1xuXG4gIGNvbnN0IGRiID0gc2VydmVyLnBsdWdpbnNbJ2hhcGktc2VxdWVsaXplJ11bb3B0aW9ucy5uYW1lXTtcbiAgY29uc3QgbW9kZWxzID0gZGIuc2VxdWVsaXplLm1vZGVscztcblxuICBjb25zdCBvblJlcXVlc3QgPSBmdW5jdGlvbiAocmVxdWVzdCwgcmVwbHkpIHtcbiAgICBjb25zdCB1cmkgPSByZXF1ZXN0LnJhdy5yZXEudXJsO1xuICAgIGNvbnN0IHBhcnNlZCA9IHVybC5wYXJzZSh1cmksIGZhbHNlKTtcbiAgICBwYXJzZWQucXVlcnkgPSBxcy5wYXJzZShwYXJzZWQucXVlcnkpO1xuICAgIHJlcXVlc3Quc2V0VXJsKHBhcnNlZCk7XG5cbiAgICByZXR1cm4gcmVwbHkuY29udGludWUoKTtcbiAgfTtcblxuICBzZXJ2ZXIuZXh0KHtcbiAgICB0eXBlOiAnb25SZXF1ZXN0JyxcbiAgICBtZXRob2Q6IG9uUmVxdWVzdCxcbiAgfSk7XG5cbiAgZm9yIChjb25zdCBtb2RlbE5hbWUgb2YgT2JqZWN0LmtleXMobW9kZWxzKSkge1xuICAgIGNvbnN0IG1vZGVsID0gbW9kZWxzW21vZGVsTmFtZV07XG4gICAgY29uc3QgeyBwbHVyYWwsIHNpbmd1bGFyIH0gPSBtb2RlbC5vcHRpb25zLm5hbWU7XG4gICAgbW9kZWwuX3BsdXJhbCA9IHBsdXJhbC50b0xvd2VyQ2FzZSgpO1xuICAgIG1vZGVsLl9zaW5ndWxhciA9IHNpbmd1bGFyLnRvTG93ZXJDYXNlKCk7XG4gICAgbW9kZWwuX1BsdXJhbCA9IHBsdXJhbDtcbiAgICBtb2RlbC5fU2luZ3VsYXIgPSBzaW5ndWxhcjtcblxuICAgIC8vIEpvaW4gdGFibGVzXG4gICAgaWYgKG1vZGVsLm9wdGlvbnMubmFtZS5zaW5ndWxhciAhPT0gbW9kZWwubmFtZSkgY29udGludWU7XG5cblxuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG1vZGVsLmFzc29jaWF0aW9ucykpIHtcbiAgICAgIGNvbnN0IGFzc29jaWF0aW9uID0gbW9kZWwuYXNzb2NpYXRpb25zW2tleV07XG4gICAgICBjb25zdCB7IHNvdXJjZSwgdGFyZ2V0IH0gPSBhc3NvY2lhdGlvbjtcblxuICAgICAgY29uc3Qgc291cmNlTmFtZSA9IHNvdXJjZS5vcHRpb25zLm5hbWU7XG5cbiAgICAgIGNvbnN0IG5hbWVzID0gKHJldikgPT4ge1xuICAgICAgICBjb25zdCBhcnIgPSAgW3tcbiAgICAgICAgICBwbHVyYWw6IHNvdXJjZU5hbWUucGx1cmFsLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgc2luZ3VsYXI6IHNvdXJjZU5hbWUuc2luZ3VsYXIudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICBvcmlnaW5hbDogc291cmNlTmFtZSxcbiAgICAgICAgfSwge1xuICAgICAgICAgIHBsdXJhbDogYXNzb2NpYXRpb24ub3B0aW9ucy5uYW1lLnBsdXJhbC50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgIHNpbmd1bGFyOiBhc3NvY2lhdGlvbi5vcHRpb25zLm5hbWUuc2luZ3VsYXIudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICBvcmlnaW5hbDogYXNzb2NpYXRpb24ub3B0aW9ucy5uYW1lLFxuICAgICAgICB9XTtcblxuICAgICAgICByZXR1cm4gcmV2ID8geyBiOiBhcnJbMF0sIGE6IGFyclsxXSB9IDogeyBhOiBhcnJbMF0sIGI6IGFyclsxXSB9O1xuICAgICAgfTtcblxuICAgICAgY29uc3QgdGFyZ2V0QXNzb2NpYXRpb25zID0gdGFyZ2V0LmFzc29jaWF0aW9uc1tzb3VyY2VOYW1lLnBsdXJhbF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCB0YXJnZXQuYXNzb2NpYXRpb25zW3NvdXJjZU5hbWUuc2luZ3VsYXJdO1xuICAgICAgY29uc3Qgc291cmNlVHlwZSA9IGFzc29jaWF0aW9uLmFzc29jaWF0aW9uVHlwZSxcbiAgICAgICAgdGFyZ2V0VHlwZSA9ICh0YXJnZXRBc3NvY2lhdGlvbnMgfHwge30pLmFzc29jaWF0aW9uVHlwZTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHNvdXJjZVR5cGUgPT09ICdCZWxvbmdzVG8nICYmICh0YXJnZXRUeXBlID09PSAnQmVsb25nc1RvJyB8fCAhdGFyZ2V0VHlwZSkpIHtcbiAgICAgICAgICBhc3NvY2lhdGlvbnMub25lVG9PbmUoc2VydmVyLCBzb3VyY2UsIHRhcmdldCwgbmFtZXMoKSwgb3B0aW9ucyk7XG4gICAgICAgICAgYXNzb2NpYXRpb25zLm9uZVRvT25lKHNlcnZlciwgdGFyZ2V0LCBzb3VyY2UsIG5hbWVzKDEpLCBvcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzb3VyY2VUeXBlID09PSAnQmVsb25nc1RvJyAmJiB0YXJnZXRUeXBlID09PSAnSGFzTWFueScpIHtcbiAgICAgICAgICBhc3NvY2lhdGlvbnMub25lVG9PbmUoc2VydmVyLCBzb3VyY2UsIHRhcmdldCwgbmFtZXMoKSwgb3B0aW9ucyk7XG4gICAgICAgICAgYXNzb2NpYXRpb25zLm9uZVRvT25lKHNlcnZlciwgdGFyZ2V0LCBzb3VyY2UsIG5hbWVzKDEpLCBvcHRpb25zKTtcbiAgICAgICAgICBhc3NvY2lhdGlvbnMub25lVG9NYW55KHNlcnZlciwgdGFyZ2V0LCBzb3VyY2UsIG5hbWVzKDEpLCBvcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzb3VyY2VUeXBlID09PSAnQmVsb25nc1RvTWFueScgJiYgdGFyZ2V0VHlwZSA9PT0gJ0JlbG9uZ3NUb01hbnknKSB7XG4gICAgICAgICAgYXNzb2NpYXRpb25zLm9uZVRvT25lKHNlcnZlciwgc291cmNlLCB0YXJnZXQsIG5hbWVzKCksIG9wdGlvbnMpO1xuICAgICAgICAgIGFzc29jaWF0aW9ucy5vbmVUb09uZShzZXJ2ZXIsIHRhcmdldCwgc291cmNlLCBuYW1lcygxKSwgb3B0aW9ucyk7XG5cbiAgICAgICAgICBhc3NvY2lhdGlvbnMub25lVG9NYW55KHNlcnZlciwgc291cmNlLCB0YXJnZXQsIG5hbWVzKCksIG9wdGlvbnMpO1xuICAgICAgICAgIGFzc29jaWF0aW9ucy5vbmVUb01hbnkoc2VydmVyLCB0YXJnZXQsIHNvdXJjZSwgbmFtZXMoMSksIG9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXNzb2NpYXRpb25zLmFzc29jaWF0ZShzZXJ2ZXIsIHNvdXJjZSwgdGFyZ2V0LCBuYW1lcygpLCBvcHRpb25zKTtcbiAgICAgICAgYXNzb2NpYXRpb25zLmFzc29jaWF0ZShzZXJ2ZXIsIHRhcmdldCwgc291cmNlLCBuYW1lcygxKSwgb3B0aW9ucyk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIFRoZXJlIG1pZ2h0IGJlIGNvbmZsaWN0cyBpbiBjYXNlIG9mIG1vZGVscyBhc3NvY2lhdGVkIHdpdGggdGhlbXNlbHZlcyBhbmQgc29tZSBvdGhlclxuICAgICAgICAvLyByYXJlIGNhc2VzLlxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIGJ1aWxkIHRoZSBtZXRob2RzIGZvciBlYWNoIG1vZGVsIG5vdyB0aGF0IHdlJ3ZlIGRlZmluZWQgYWxsIHRoZVxuICAvLyBhc3NvY2lhdGlvbnNcbiAgT2JqZWN0LmtleXMobW9kZWxzKS5mb3JFYWNoKChtb2RlbE5hbWUpID0+IHtcbiAgICBjb25zdCBtb2RlbCA9IG1vZGVsc1ttb2RlbE5hbWVdO1xuICAgIGNydWQoc2VydmVyLCBtb2RlbCwgb3B0aW9ucyk7XG4gIH0pO1xuXG4gIHJldHVybiBuZXh0KCk7XG59O1xuXG5yZWdpc3Rlci5hdHRyaWJ1dGVzID0ge1xuICBwa2c6IHJlcXVpcmUoJy4uL3BhY2thZ2UuanNvbicpLFxufTtcblxuZXhwb3J0IHsgcmVnaXN0ZXIgfTtcbiJdfQ==