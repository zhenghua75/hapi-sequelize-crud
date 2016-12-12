'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _getConfigForMethod = require('./get-config-for-method.js');

var _getConfigForMethod2 = _interopRequireDefault(_getConfigForMethod);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_ava2.default.beforeEach(t => {
  t.context.models = ['MyModel'];

  t.context.scopes = ['aScope'];

  t.context.attributeValidation = {
    myKey: _joi2.default.any()
  };

  t.context.associationValidation = {
    include: _joi2.default.array().items(_joi2.default.string().valid(t.context.models))
  };

  t.context.config = {
    cors: {}
  };
});

(0, _ava2.default)('validate.query seqeulizeOperators', t => {
  _getConfigForMethod.whereMethods.forEach(method => {
    const configForMethod = (0, _getConfigForMethod2.default)({ method });
    const { query } = configForMethod.validate;

    t.truthy(query, `applies query validation for ${ method }`);

    Object.keys(_getConfigForMethod.sequelizeOperators).forEach(operator => {
      t.ifError(query.validate({ [operator]: true }).error, `applies sequelize operator "${ operator }" in validate.where for ${ method }`);
    });

    t.truthy(query.validate({ notAThing: true }).error, 'errors on a non-valid key');
  });
});

(0, _ava2.default)('validate.query attributeValidation', t => {
  const { attributeValidation } = t.context;

  _getConfigForMethod.whereMethods.forEach(method => {
    const configForMethod = (0, _getConfigForMethod2.default)({ method, attributeValidation });
    const { query } = configForMethod.validate;

    Object.keys(attributeValidation).forEach(key => {
      t.ifError(query.validate({ [key]: true }).error, `applies attributeValidation (${ key }) to validate.query`);
    });

    t.truthy(query.validate({ notAThing: true }).error, 'errors on a non-valid key');
  });
});

(0, _ava2.default)('query attributeValidation w/ config as plain object', t => {
  const { attributeValidation } = t.context;
  const config = {
    validate: {
      query: {
        aKey: _joi2.default.boolean()
      }
    }
  };

  _getConfigForMethod.whereMethods.forEach(method => {
    const configForMethod = (0, _getConfigForMethod2.default)({
      method,
      attributeValidation,
      config
    });
    const { query } = configForMethod.validate;

    const keys = [...Object.keys(attributeValidation), ...Object.keys(config.validate.query)];

    keys.forEach(key => {
      t.ifError(query.validate({ [key]: true }).error, `applies ${ key } to validate.query`);
    });

    t.truthy(query.validate({ notAThing: true }).error, 'errors on a non-valid key');
  });
});

(0, _ava2.default)('query attributeValidation w/ config as joi object', t => {
  const { attributeValidation } = t.context;
  const queryKeys = {
    aKey: _joi2.default.boolean()
  };
  const config = {
    validate: {
      query: _joi2.default.object().keys(queryKeys)
    }
  };

  _getConfigForMethod.whereMethods.forEach(method => {
    const configForMethod = (0, _getConfigForMethod2.default)({
      method,
      attributeValidation,
      config
    });
    const { query } = configForMethod.validate;

    const keys = [...Object.keys(attributeValidation), ...Object.keys(queryKeys)];

    keys.forEach(key => {
      t.ifError(query.validate({ [key]: true }).error, `applies ${ key } to validate.query`);
    });

    t.truthy(query.validate({ notAThing: true }).error, 'errors on a non-valid key');
  });
});

(0, _ava2.default)('validate.query associationValidation', t => {
  const { attributeValidation, associationValidation, models } = t.context;

  _getConfigForMethod.includeMethods.forEach(method => {
    const configForMethod = (0, _getConfigForMethod2.default)({
      method,
      attributeValidation,
      associationValidation
    });
    const { query } = configForMethod.validate;

    Object.keys(attributeValidation).forEach(key => {
      t.ifError(query.validate({ [key]: true }).error, `applies attributeValidation (${ key }) to validate.query when include should be applied`);
    });

    Object.keys(associationValidation).forEach(key => {
      t.ifError(query.validate({ [key]: models }).error, `applies associationValidation (${ key }) to validate.query when include should be applied`);
    });

    t.truthy(query.validate({ notAThing: true }).error, 'errors on a non-valid key');
  });
});

(0, _ava2.default)('query associationValidation w/ config as plain object', t => {
  const { associationValidation, models } = t.context;
  const config = {
    validate: {
      query: {
        aKey: _joi2.default.boolean()
      }
    }
  };

  _getConfigForMethod.includeMethods.forEach(method => {
    const configForMethod = (0, _getConfigForMethod2.default)({
      method,
      associationValidation,
      config
    });
    const { query } = configForMethod.validate;

    Object.keys(associationValidation).forEach(key => {
      t.ifError(query.validate({ [key]: models }).error, `applies ${ key } to validate.query`);
    });

    Object.keys(config.validate.query).forEach(key => {
      t.ifError(query.validate({ [key]: true }).error, `applies ${ key } to validate.query`);
    });

    t.truthy(query.validate({ notAThing: true }).error, 'errors on a non-valid key');
  });
});

(0, _ava2.default)('query associationValidation w/ config as joi object', t => {
  const { associationValidation, models } = t.context;
  const queryKeys = {
    aKey: _joi2.default.boolean()
  };
  const config = {
    validate: {
      query: _joi2.default.object().keys(queryKeys)
    }
  };

  _getConfigForMethod.includeMethods.forEach(method => {
    const configForMethod = (0, _getConfigForMethod2.default)({
      method,
      associationValidation,
      config
    });
    const { query } = configForMethod.validate;

    Object.keys(associationValidation).forEach(key => {
      t.ifError(query.validate({ [key]: models }).error, `applies ${ key } to validate.query`);
    });

    Object.keys(queryKeys).forEach(key => {
      t.ifError(query.validate({ [key]: true }).error, `applies ${ key } to validate.query`);
    });

    t.truthy(query.validate({ notAThing: true }).error, 'errors on a non-valid key');
  });
});

(0, _ava2.default)('validate.payload associationValidation', t => {
  const { attributeValidation } = t.context;

  _getConfigForMethod.payloadMethods.forEach(method => {
    const configForMethod = (0, _getConfigForMethod2.default)({ method, attributeValidation });
    const { payload } = configForMethod.validate;

    Object.keys(attributeValidation).forEach(key => {
      t.ifError(payload.validate({ [key]: true }).error, `applies attributeValidation (${ key }) to validate.payload`);
    });

    t.truthy(payload.validate({ notAThing: true }).error, 'errors on a non-valid key');
  });
});

(0, _ava2.default)('payload attributeValidation w/ config as plain object', t => {
  const { attributeValidation } = t.context;
  const config = {
    validate: {
      payload: {
        aKey: _joi2.default.boolean()
      }
    }
  };

  _getConfigForMethod.payloadMethods.forEach(method => {
    const configForMethod = (0, _getConfigForMethod2.default)({
      method,
      attributeValidation,
      config
    });
    const { payload } = configForMethod.validate;

    const keys = [...Object.keys(attributeValidation), ...Object.keys(config.validate.payload)];

    keys.forEach(key => {
      t.ifError(payload.validate({ [key]: true }).error, `applies ${ key } to validate.payload`);
    });

    t.truthy(payload.validate({ notAThing: true }).error, 'errors on a non-valid key');
  });
});

(0, _ava2.default)('payload attributeValidation w/ config as joi object', t => {
  const { attributeValidation } = t.context;
  const payloadKeys = {
    aKey: _joi2.default.boolean()
  };
  const config = {
    validate: {
      payload: _joi2.default.object().keys(payloadKeys)
    }
  };

  _getConfigForMethod.payloadMethods.forEach(method => {
    const configForMethod = (0, _getConfigForMethod2.default)({
      method,
      attributeValidation,
      config
    });
    const { payload } = configForMethod.validate;

    const keys = [...Object.keys(attributeValidation), ...Object.keys(payloadKeys)];

    keys.forEach(key => {
      t.ifError(payload.validate({ [key]: true }).error, `applies ${ key } to validate.payload`);
    });

    t.truthy(payload.validate({ notAThing: true }).error, 'errors on a non-valid key');
  });
});

(0, _ava2.default)('validate.params scopeParamsMethods', t => {
  const { scopes } = t.context;

  _getConfigForMethod.scopeParamsMethods.forEach(method => {
    const configForMethod = (0, _getConfigForMethod2.default)({ method, scopes });
    const { params } = configForMethod.validate;

    scopes.forEach(key => {
      t.ifError(params.validate({ scope: key }).error, `applies "scope: ${ key }" to validate.params`);
    });

    t.truthy(params.validate({ scope: 'notAthing' }).error, 'errors on a non-valid key');
  });
});

(0, _ava2.default)('params scopeParamsMethods w/ config as plain object', t => {
  const { scopes } = t.context;
  const config = {
    validate: {
      params: {
        aKey: _joi2.default.boolean()
      }
    }
  };

  _getConfigForMethod.scopeParamsMethods.forEach(method => {
    const configForMethod = (0, _getConfigForMethod2.default)({
      method,
      scopes,
      config
    });
    const { params } = configForMethod.validate;

    scopes.forEach(key => {
      t.ifError(params.validate({ scope: key }).error, `applies "scope: ${ key }" to validate.params`);
    });

    Object.keys(config.validate.params).forEach(key => {
      t.ifError(params.validate({ [key]: true }).error, `applies ${ key } to validate.params`);
    });

    t.truthy(params.validate({ notAThing: true }).error, 'errors on a non-valid key');
  });
});

(0, _ava2.default)('params scopeParamsMethods w/ config as joi object', t => {
  const { scopes } = t.context;
  const paramsKeys = {
    aKey: _joi2.default.boolean()
  };
  const config = {
    validate: {
      params: _joi2.default.object().keys(paramsKeys)
    }
  };

  _getConfigForMethod.scopeParamsMethods.forEach(method => {
    const configForMethod = (0, _getConfigForMethod2.default)({
      method,
      scopes,
      config
    });
    const { params } = configForMethod.validate;

    scopes.forEach(key => {
      t.ifError(params.validate({ scope: key }).error, `applies "scope: ${ key }" to validate.params`);
    });

    Object.keys(paramsKeys).forEach(key => {
      t.ifError(params.validate({ [key]: true }).error, `applies ${ key } to validate.params`);
    });

    t.truthy(params.validate({ notAThing: true }).error, 'errors on a non-valid key');
  });
});

(0, _ava2.default)('validate.payload idParamsMethods', t => {
  _getConfigForMethod.idParamsMethods.forEach(method => {
    const configForMethod = (0, _getConfigForMethod2.default)({ method });
    const { params } = configForMethod.validate;

    t.ifError(params.validate({ id: 'aThing' }).error, 'applies id to validate.params');
  });
});

(0, _ava2.default)('validate.query restrictMethods', t => {
  _getConfigForMethod.restrictMethods.forEach(method => {
    const configForMethod = (0, _getConfigForMethod2.default)({ method });
    const { query } = configForMethod.validate;
    const restrictKeys = ['limit', 'offset'];

    restrictKeys.forEach(key => {
      t.ifError(query.validate({ [key]: 0 }).error, `applies restriction (${ key }) to validate.query`);
    });

    t.ifError(query.validate({ order: ['thing', 'DESC'] }).error, 'applies `order` to validate.query');

    t.truthy(query.validate({ notAThing: true }).error, 'errors on a non-valid key');
  });
});

(0, _ava2.default)('validate.query restrictMethods w/ config as plain object', t => {
  const config = {
    validate: {
      query: {
        aKey: _joi2.default.boolean()
      }
    }
  };

  _getConfigForMethod.restrictMethods.forEach(method => {
    const configForMethod = (0, _getConfigForMethod2.default)({
      method,
      config
    });
    const { query } = configForMethod.validate;

    const keys = [...Object.keys(config.validate.query)];

    keys.forEach(key => {
      t.ifError(query.validate({ [key]: true }).error, `applies ${ key } to validate.query`);
    });

    t.truthy(query.validate({ notAThing: true }).error, 'errors on a non-valid key');
  });
});

(0, _ava2.default)('validate.query restrictMethods w/ config as joi object', t => {
  const queryKeys = {
    aKey: _joi2.default.boolean()
  };
  const config = {
    validate: {
      query: _joi2.default.object().keys(queryKeys)
    }
  };

  _getConfigForMethod.whereMethods.forEach(method => {
    const configForMethod = (0, _getConfigForMethod2.default)({
      method,
      config
    });
    const { query } = configForMethod.validate;

    const keys = [...Object.keys(queryKeys)];

    keys.forEach(key => {
      t.ifError(query.validate({ [key]: true }).error, `applies ${ key } to validate.query`);
    });

    t.truthy(query.validate({ notAThing: true }).error, 'errors on a non-valid key');
  });
});

(0, _ava2.default)('does not modify initial config on multiple passes', t => {
  const { config } = t.context;
  const originalConfig = _extends({}, config);

  _getConfigForMethod.whereMethods.forEach(method => {
    (0, _getConfigForMethod2.default)(_extends({ method }, t.context));
  });

  t.deepEqual(config, originalConfig, 'does not modify the original config object');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9nZXQtY29uZmlnLWZvci1tZXRob2QudGVzdC5qcyJdLCJuYW1lcyI6WyJiZWZvcmVFYWNoIiwidCIsImNvbnRleHQiLCJtb2RlbHMiLCJzY29wZXMiLCJhdHRyaWJ1dGVWYWxpZGF0aW9uIiwibXlLZXkiLCJhbnkiLCJhc3NvY2lhdGlvblZhbGlkYXRpb24iLCJpbmNsdWRlIiwiYXJyYXkiLCJpdGVtcyIsInN0cmluZyIsInZhbGlkIiwiY29uZmlnIiwiY29ycyIsImZvckVhY2giLCJtZXRob2QiLCJjb25maWdGb3JNZXRob2QiLCJxdWVyeSIsInZhbGlkYXRlIiwidHJ1dGh5IiwiT2JqZWN0Iiwia2V5cyIsIm9wZXJhdG9yIiwiaWZFcnJvciIsImVycm9yIiwibm90QVRoaW5nIiwia2V5IiwiYUtleSIsImJvb2xlYW4iLCJxdWVyeUtleXMiLCJvYmplY3QiLCJwYXlsb2FkIiwicGF5bG9hZEtleXMiLCJwYXJhbXMiLCJzY29wZSIsInBhcmFtc0tleXMiLCJpZCIsInJlc3RyaWN0S2V5cyIsIm9yZGVyIiwib3JpZ2luYWxDb25maWciLCJkZWVwRXF1YWwiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQVdBLGNBQUtBLFVBQUwsQ0FBaUJDLENBQUQsSUFBTztBQUNyQkEsSUFBRUMsT0FBRixDQUFVQyxNQUFWLEdBQW1CLENBQUMsU0FBRCxDQUFuQjs7QUFFQUYsSUFBRUMsT0FBRixDQUFVRSxNQUFWLEdBQW1CLENBQUMsUUFBRCxDQUFuQjs7QUFFQUgsSUFBRUMsT0FBRixDQUFVRyxtQkFBVixHQUFnQztBQUM5QkMsV0FBTyxjQUFJQyxHQUFKO0FBRHVCLEdBQWhDOztBQUlBTixJQUFFQyxPQUFGLENBQVVNLHFCQUFWLEdBQWtDO0FBQ2hDQyxhQUFTLGNBQUlDLEtBQUosR0FBWUMsS0FBWixDQUFrQixjQUFJQyxNQUFKLEdBQWFDLEtBQWIsQ0FBbUJaLEVBQUVDLE9BQUYsQ0FBVUMsTUFBN0IsQ0FBbEI7QUFE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QWI7O0FBSUFSLFNBQUtQLE9BQUwsQ0FBY1ksR0FBRCxJQUFTO0FBQ3BCM0IsUUFBRXdCLE9BQUYsQ0FDRU4sTUFBTUMsUUFBTixDQUFlLEVBQUUsQ0FBQ1EsR0FBRCxHQUFPLElBQVQsRUFBZixFQUFnQ0YsS0FEbEMsRUFFSyxZQUFVRSxHQUFJLHFCQUZuQjtBQUlELEtBTEQ7O0FBT0EzQixNQUFFb0IsTUFBRixDQUNFRixNQUFNQyxRQUFOLENBQWUsRUFBRU8sV0FBVyxJQUFiLEVBQWYsRUFBb0NELEtBRHRDLEVBRUksMkJBRko7QUFJRCxHQXRCRDtBQXVCRCxDQWpDRDs7QUFvQ0EsbUJBQUssbURBQUwsRUFBMkR6QixDQUFELElBQU87QUFDL0QsUUFBTSxFQUFFYSxNQUFGLEtBQWFiLEVBQUVDLE9BQXJCO0FBQ0EsUUFBTXVDLDhCQUFzQjNCLE1BQXRCLENBQU47O0FBRUEsbUNBQWFFLE9BQWIsQ0FBc0JDLE1BQUQsSUFBWTtBQUMvQixpREFBcUJBLE1BQXJCLElBQWdDaEIsRUFBRUMsT0FBbEM7QUFDRCxHQUZEOztBQUlBRCxJQUFFeUMsU0FBRixDQUNFNUIsTUFERixFQUVJMkIsY0FGSixFQUdJLDRDQUhKO0FBS0QsQ0FiRCIsImZpbGUiOiJnZXQtY29uZmlnLWZvci1tZXRob2QudGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0ZXN0IGZyb20gJ2F2YSc7XG5pbXBvcnQgam9pIGZyb20gJ2pvaSc7XG5pbXBvcnRcbiAgZ2V0Q29uZmlnRm9yTWV0aG9kLCB7XG4gIHdoZXJlTWV0aG9kcyxcbiAgaW5jbHVkZU1ldGhvZHMsXG4gIHBheWxvYWRNZXRob2RzLFxuICBzY29wZVBhcmFtc01ldGhvZHMsXG4gIGlkUGFyYW1zTWV0aG9kcyxcbiAgcmVzdHJpY3RNZXRob2RzLFxuICBzZXF1ZWxpemVPcGVyYXRvcnMsXG59IGZyb20gJy4vZ2V0LWNvbmZpZy1mb3ItbWV0aG9kLmpzJztcblxudGVzdC5iZWZvcmVFYWNoKCh0KSA9PiB7XG4gIHQuY29udGV4dC5tb2RlbHMgPSBbJ015TW9kZWwnXTtcblxuICB0LmNvbnRleHQuc2NvcGVzID0gWydhU2NvcGUnXTtcblxuICB0LmNvbnRleHQuYXR0cmlidXRlVmFsaWRhdGlvbiA9IHtcbiAgICBteUtleTogam9pLmFueSgpLFxuICB9O1xuXG4gIHQuY29udGV4dC5hc3NvY2lhdGlvblZhbGlkYXRpb24gPSB7XG4gICAgaW5jbHVkZTogam9pLmFycmF5KCkuaXRlbXMoam9pLnN0cmluZygpLnZhbGlkKHQuY29udGV4dC5tb2RlbHMpKSxcbiAgfTtcblxuICB0LmNvbnRleHQuY29uZmlnID0ge1xuICAgIGNvcnM6IHt9LFxuICB9O1xufSk7XG5cbnRlc3QoJ3ZhbGlkYXRlLnF1ZXJ5IHNlcWV1bGl6ZU9wZXJhdG9ycycsICh0KSA9PiB7XG4gIHdoZXJlTWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHtcbiAgICBjb25zdCBjb25maWdGb3JNZXRob2QgPSBnZXRDb25maWdGb3JNZXRob2QoeyBtZXRob2QgfSk7XG4gICAgY29uc3QgeyBxdWVyeSB9ID0gY29uZmlnRm9yTWV0aG9kLnZhbGlkYXRlO1xuXG4gICAgdC50cnV0aHkoXG4gICAgICBxdWVyeSxcbiAgICAgIGBhcHBsaWVzIHF1ZXJ5IHZhbGlkYXRpb24gZm9yICR7bWV0aG9kfWBcbiAgICApO1xuXG4gICAgT2JqZWN0LmtleXMoc2VxdWVsaXplT3BlcmF0b3JzKS5mb3JFYWNoKChvcGVyYXRvcikgPT4ge1xuICAgICAgdC5pZkVycm9yKFxuICAgICAgICBxdWVyeS52YWxpZGF0ZSh7IFtvcGVyYXRvcl06IHRydWUgfSkuZXJyb3JcbiAgICAgICAgLCBgYXBwbGllcyBzZXF1ZWxpemUgb3BlcmF0b3IgXCIke29wZXJhdG9yfVwiIGluIHZhbGlkYXRlLndoZXJlIGZvciAke21ldGhvZH1gXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgdC50cnV0aHkoXG4gICAgICBxdWVyeS52YWxpZGF0ZSh7IG5vdEFUaGluZzogdHJ1ZSB9KS5lcnJvclxuICAgICAgLCAnZXJyb3JzIG9uIGEgbm9uLXZhbGlkIGtleSdcbiAgICApO1xuICB9KTtcbn0pO1xuXG50ZXN0KCd2YWxpZGF0ZS5xdWVyeSBhdHRyaWJ1dGVWYWxpZGF0aW9uJywgKHQpID0+IHtcbiAgY29uc3QgeyBhdHRyaWJ1dGVWYWxpZGF0aW9uIH0gPSB0LmNvbnRleHQ7XG5cbiAgd2hlcmVNZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuICAgIGNvbnN0IGNvbmZpZ0Zvck1ldGhvZCA9IGdldENvbmZpZ0Zvck1ldGhvZCh7IG1ldGhvZCwgYXR0cmlidXRlVmFsaWRhdGlvbiB9KTtcbiAgICBjb25zdCB7IHF1ZXJ5IH0gPSBjb25maWdGb3JNZXRob2QudmFsaWRhdGU7XG5cbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVWYWxpZGF0aW9uKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIHQuaWZFcnJvcihcbiAgICAgICAgcXVlcnkudmFsaWRhdGUoeyBba2V5XTogdHJ1ZSB9KS5lcnJvclxuICAgICAgICAsIGBhcHBsaWVzIGF0dHJpYnV0ZVZhbGlkYXRpb24gKCR7a2V5fSkgdG8gdmFsaWRhdGUucXVlcnlgXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgdC50cnV0aHkoXG4gICAgICBxdWVyeS52YWxpZGF0ZSh7IG5vdEFUaGluZzogdHJ1ZSB9KS5lcnJvclxuICAgICAgLCAnZXJyb3JzIG9uIGEgbm9uLXZhbGlkIGtleSdcbiAgICApO1xuICB9KTtcbn0pO1xuXG50ZXN0KCdxdWVyeSBhdHRyaWJ1dGVWYWxpZGF0aW9uIHcvIGNvbmZpZyBhcyBwbGFpbiBvYmplY3QnLCAodCkgPT4ge1xuICBjb25zdCB7IGF0dHJpYnV0ZVZhbGlkYXRpb24gfSA9IHQuY29udGV4dDtcbiAgY29uc3QgY29uZmlnID0ge1xuICAgIHZhbGlkYXRlOiB7XG4gICAgICBxdWVyeToge1xuICAgICAgICBhS2V5OiBqb2kuYm9vbGVhbigpLFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xuXG4gIHdoZXJlTWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHtcbiAgICBjb25zdCBjb25maWdGb3JNZXRob2QgPSBnZXRDb25maWdGb3JNZXRob2Qoe1xuICAgICAgbWV0aG9kLFxuICAgICAgYXR0cmlidXRlVmFsaWRhdGlvbixcbiAgICAgIGNvbmZpZyxcbiAgICB9KTtcbiAgICBjb25zdCB7IHF1ZXJ5IH0gPSBjb25maWdGb3JNZXRob2QudmFsaWRhdGU7XG5cbiAgICBjb25zdCBrZXlzID0gW1xuICAgICAgLi4uT2JqZWN0LmtleXMoYXR0cmlidXRlVmFsaWRhdGlvbiksXG4gICAgICAuLi5PYmplY3Qua2V5cyhjb25maWcudmFsaWRhdGUucXVlcnkpLFxuICAgIF07XG5cbiAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgdC5pZkVycm9yKFxuICAgICAgICBxdWVyeS52YWxpZGF0ZSh7IFtrZXldOiB0cnVlIH0pLmVycm9yXG4gICAgICAgICwgYGFwcGxpZXMgJHtrZXl9IHRvIHZhbGlkYXRlLnF1ZXJ5YFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHQudHJ1dGh5KFxuICAgICAgcXVlcnkudmFsaWRhdGUoeyBub3RBVGhpbmc6IHRydWUgfSkuZXJyb3JcbiAgICAgICwgJ2Vycm9ycyBvbiBhIG5vbi12YWxpZCBrZXknXG4gICAgKTtcbiAgfSk7XG59KTtcblxudGVzdCgncXVlcnkgYXR0cmlidXRlVmFsaWRhdGlvbiB3LyBjb25maWcgYXMgam9pIG9iamVjdCcsICh0KSA9PiB7XG4gIGNvbnN0IHsgYXR0cmlidXRlVmFsaWRhdGlvbiB9ID0gdC5jb250ZXh0O1xuICBjb25zdCBxdWVyeUtleXMgPSB7XG4gICAgYUtleTogam9pLmJvb2xlYW4oKSxcbiAgfTtcbiAgY29uc3QgY29uZmlnID0ge1xuICAgIHZhbGlkYXRlOiB7XG4gICAgICBxdWVyeTogam9pLm9iamVjdCgpLmtleXMocXVlcnlLZXlzKSxcbiAgICB9LFxuICB9O1xuXG4gIHdoZXJlTWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHtcbiAgICBjb25zdCBjb25maWdGb3JNZXRob2QgPSBnZXRDb25maWdGb3JNZXRob2Qoe1xuICAgICAgbWV0aG9kLFxuICAgICAgYXR0cmlidXRlVmFsaWRhdGlvbixcbiAgICAgIGNvbmZpZyxcbiAgICB9KTtcbiAgICBjb25zdCB7IHF1ZXJ5IH0gPSBjb25maWdGb3JNZXRob2QudmFsaWRhdGU7XG5cbiAgICBjb25zdCBrZXlzID0gW1xuICAgICAgLi4uT2JqZWN0LmtleXMoYXR0cmlidXRlVmFsaWRhdGlvbiksXG4gICAgICAuLi5PYmplY3Qua2V5cyhxdWVyeUtleXMpLFxuICAgIF07XG5cbiAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgdC5pZkVycm9yKFxuICAgICAgICBxdWVyeS52YWxpZGF0ZSh7IFtrZXldOiB0cnVlIH0pLmVycm9yXG4gICAgICAgICwgYGFwcGxpZXMgJHtrZXl9IHRvIHZhbGlkYXRlLnF1ZXJ5YFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHQudHJ1dGh5KFxuICAgICAgcXVlcnkudmFsaWRhdGUoeyBub3RBVGhpbmc6IHRydWUgfSkuZXJyb3JcbiAgICAgICwgJ2Vycm9ycyBvbiBhIG5vbi12YWxpZCBrZXknXG4gICAgKTtcbiAgfSk7XG59KTtcblxudGVzdCgndmFsaWRhdGUucXVlcnkgYXNzb2NpYXRpb25WYWxpZGF0aW9uJywgKHQpID0+IHtcbiAgY29uc3QgeyBhdHRyaWJ1dGVWYWxpZGF0aW9uLCBhc3NvY2lhdGlvblZhbGlkYXRpb24sIG1vZGVscyB9ID0gdC5jb250ZXh0O1xuXG4gIGluY2x1ZGVNZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuICAgIGNvbnN0IGNvbmZpZ0Zvck1ldGhvZCA9IGdldENvbmZpZ0Zvck1ldGhvZCh7XG4gICAgICBtZXRob2QsXG4gICAgICBhdHRyaWJ1dGVWYWxpZGF0aW9uLFxuICAgICAgYXNzb2NpYXRpb25WYWxpZGF0aW9uLFxuICAgIH0pO1xuICAgIGNvbnN0IHsgcXVlcnkgfSA9IGNvbmZpZ0Zvck1ldGhvZC52YWxpZGF0ZTtcblxuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZVZhbGlkYXRpb24pLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgdC5pZkVycm9yKFxuICAgICAgICBxdWVyeS52YWxpZGF0ZSh7IFtrZXldOiB0cnVlIH0pLmVycm9yXG4gICAgICAgICwgYGFwcGxpZXMgYXR0cmlidXRlVmFsaWRhdGlvbiAoJHtrZXl9KSB0byB2YWxpZGF0ZS5xdWVyeSB3aGVuIGluY2x1ZGUgc2hvdWxkIGJlIGFwcGxpZWRgXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgT2JqZWN0LmtleXMoYXNzb2NpYXRpb25WYWxpZGF0aW9uKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIHQuaWZFcnJvcihcbiAgICAgICAgcXVlcnkudmFsaWRhdGUoeyBba2V5XTogbW9kZWxzIH0pLmVycm9yXG4gICAgICAgICwgYGFwcGxpZXMgYXNzb2NpYXRpb25WYWxpZGF0aW9uICgke2tleX0pIHRvIHZhbGlkYXRlLnF1ZXJ5IHdoZW4gaW5jbHVkZSBzaG91bGQgYmUgYXBwbGllZGBcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICB0LnRydXRoeShcbiAgICAgIHF1ZXJ5LnZhbGlkYXRlKHsgbm90QVRoaW5nOiB0cnVlIH0pLmVycm9yXG4gICAgICAsICdlcnJvcnMgb24gYSBub24tdmFsaWQga2V5J1xuICAgICk7XG4gIH0pO1xufSk7XG5cbnRlc3QoJ3F1ZXJ5IGFzc29jaWF0aW9uVmFsaWRhdGlvbiB3LyBjb25maWcgYXMgcGxhaW4gb2JqZWN0JywgKHQpID0+IHtcbiAgY29uc3QgeyBhc3NvY2lhdGlvblZhbGlkYXRpb24sIG1vZGVscyB9ID0gdC5jb250ZXh0O1xuICBjb25zdCBjb25maWcgPSB7XG4gICAgdmFsaWRhdGU6IHtcbiAgICAgIHF1ZXJ5OiB7XG4gICAgICAgIGFLZXk6IGpvaS5ib29sZWFuKCksXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG5cbiAgaW5jbHVkZU1ldGhvZHMuZm9yRWFjaCgobWV0aG9kKSA9PiB7XG4gICAgY29uc3QgY29uZmlnRm9yTWV0aG9kID0gZ2V0Q29uZmlnRm9yTWV0aG9kKHtcbiAgICAgIG1ldGhvZCxcbiAgICAgIGFzc29jaWF0aW9uVmFsaWRhdGlvbixcbiAgICAgIGNvbmZpZyxcbiAgICB9KTtcbiAgICBjb25zdCB7IHF1ZXJ5IH0gPSBjb25maWdGb3JNZXRob2QudmFsaWRhdGU7XG5cbiAgICBPYmplY3Qua2V5cyhhc3NvY2lhdGlvblZhbGlkYXRpb24pLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgdC5pZkVycm9yKFxuICAgICAgICBxdWVyeS52YWxpZGF0ZSh7IFtrZXldOiBtb2RlbHMgfSkuZXJyb3JcbiAgICAgICAgLCBgYXBwbGllcyAke2tleX0gdG8gdmFsaWRhdGUucXVlcnlgXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgT2JqZWN0LmtleXMoY29uZmlnLnZhbGlkYXRlLnF1ZXJ5KS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIHQuaWZFcnJvcihcbiAgICAgICAgcXVlcnkudmFsaWRhdGUoeyBba2V5XTogdHJ1ZSB9KS5lcnJvclxuICAgICAgICAsIGBhcHBsaWVzICR7a2V5fSB0byB2YWxpZGF0ZS5xdWVyeWBcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICB0LnRydXRoeShcbiAgICAgIHF1ZXJ5LnZhbGlkYXRlKHsgbm90QVRoaW5nOiB0cnVlIH0pLmVycm9yXG4gICAgICAsICdlcnJvcnMgb24gYSBub24tdmFsaWQga2V5J1xuICAgICk7XG4gIH0pO1xufSk7XG5cbnRlc3QoJ3F1ZXJ5IGFzc29jaWF0aW9uVmFsaWRhdGlvbiB3LyBjb25maWcgYXMgam9pIG9iamVjdCcsICh0KSA9PiB7XG4gIGNvbnN0IHsgYXNzb2NpYXRpb25WYWxpZGF0aW9uLCBtb2RlbHMgfSA9IHQuY29udGV4dDtcbiAgY29uc3QgcXVlcnlLZXlzID0ge1xuICAgIGFLZXk6IGpvaS5ib29sZWFuKCksXG4gIH07XG4gIGNvbnN0IGNvbmZpZyA9IHtcbiAgICB2YWxpZGF0ZToge1xuICAgICAgcXVlcnk6IGpvaS5vYmplY3QoKS5rZXlzKHF1ZXJ5S2V5cyksXG4gICAgfSxcbiAgfTtcblxuICBpbmNsdWRlTWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHtcbiAgICBjb25zdCBjb25maWdGb3JNZXRob2QgPSBnZXRDb25maWdGb3JNZXRob2Qoe1xuICAgICAgbWV0aG9kLFxuICAgICAgYXNzb2NpYXRpb25WYWxpZGF0aW9uLFxuICAgICAgY29uZmlnLFxuICAgIH0pO1xuICAgIGNvbnN0IHsgcXVlcnkgfSA9IGNvbmZpZ0Zvck1ldGhvZC52YWxpZGF0ZTtcblxuICAgIE9iamVjdC5rZXlzKGFzc29jaWF0aW9uVmFsaWRhdGlvbikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICB0LmlmRXJyb3IoXG4gICAgICAgIHF1ZXJ5LnZhbGlkYXRlKHsgW2tleV06IG1vZGVscyB9KS5lcnJvclxuICAgICAgICAsIGBhcHBsaWVzICR7a2V5fSB0byB2YWxpZGF0ZS5xdWVyeWBcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBPYmplY3Qua2V5cyhxdWVyeUtleXMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgdC5pZkVycm9yKFxuICAgICAgICBxdWVyeS52YWxpZGF0ZSh7IFtrZXldOiB0cnVlIH0pLmVycm9yXG4gICAgICAgICwgYGFwcGxpZXMgJHtrZXl9IHRvIHZhbGlkYXRlLnF1ZXJ5YFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHQudHJ1dGh5KFxuICAgICAgcXVlcnkudmFsaWRhdGUoeyBub3RBVGhpbmc6IHRydWUgfSkuZXJyb3JcbiAgICAgICwgJ2Vycm9ycyBvbiBhIG5vbi12YWxpZCBrZXknXG4gICAgKTtcbiAgfSk7XG59KTtcblxudGVzdCgndmFsaWRhdGUucGF5bG9hZCBhc3NvY2lhdGlvblZhbGlkYXRpb24nLCAodCkgPT4ge1xuICBjb25zdCB7IGF0dHJpYnV0ZVZhbGlkYXRpb24gfSA9IHQuY29udGV4dDtcblxuICBwYXlsb2FkTWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHtcbiAgICBjb25zdCBjb25maWdGb3JNZXRob2QgPSBnZXRDb25maWdGb3JNZXRob2QoeyBtZXRob2QsIGF0dHJpYnV0ZVZhbGlkYXRpb24gfSk7XG4gICAgY29uc3QgeyBwYXlsb2FkIH0gPSBjb25maWdGb3JNZXRob2QudmFsaWRhdGU7XG5cbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVWYWxpZGF0aW9uKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIHQuaWZFcnJvcihcbiAgICAgICAgcGF5bG9hZC52YWxpZGF0ZSh7IFtrZXldOiB0cnVlIH0pLmVycm9yXG4gICAgICAgICwgYGFwcGxpZXMgYXR0cmlidXRlVmFsaWRhdGlvbiAoJHtrZXl9KSB0byB2YWxpZGF0ZS5wYXlsb2FkYFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHQudHJ1dGh5KFxuICAgICAgcGF5bG9hZC52YWxpZGF0ZSh7IG5vdEFUaGluZzogdHJ1ZSB9KS5lcnJvclxuICAgICAgLCAnZXJyb3JzIG9uIGEgbm9uLXZhbGlkIGtleSdcbiAgICApO1xuICB9KTtcbn0pO1xuXG50ZXN0KCdwYXlsb2FkIGF0dHJpYnV0ZVZhbGlkYXRpb24gdy8gY29uZmlnIGFzIHBsYWluIG9iamVjdCcsICh0KSA9PiB7XG4gIGNvbnN0IHsgYXR0cmlidXRlVmFsaWRhdGlvbiB9ID0gdC5jb250ZXh0O1xuICBjb25zdCBjb25maWcgPSB7XG4gICAgdmFsaWRhdGU6IHtcbiAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgYUtleTogam9pLmJvb2xlYW4oKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcblxuICBwYXlsb2FkTWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHtcbiAgICBjb25zdCBjb25maWdGb3JNZXRob2QgPSBnZXRDb25maWdGb3JNZXRob2Qoe1xuICAgICAgbWV0aG9kLFxuICAgICAgYXR0cmlidXRlVmFsaWRhdGlvbixcbiAgICAgIGNvbmZpZyxcbiAgICB9KTtcbiAgICBjb25zdCB7IHBheWxvYWQgfSA9IGNvbmZpZ0Zvck1ldGhvZC52YWxpZGF0ZTtcblxuICAgIGNvbnN0IGtleXMgPSBbXG4gICAgICAuLi5PYmplY3Qua2V5cyhhdHRyaWJ1dGVWYWxpZGF0aW9uKSxcbiAgICAgIC4uLk9iamVjdC5rZXlzKGNvbmZpZy52YWxpZGF0ZS5wYXlsb2FkKSxcbiAgICBdO1xuXG4gICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIHQuaWZFcnJvcihcbiAgICAgICAgcGF5bG9hZC52YWxpZGF0ZSh7IFtrZXldOiB0cnVlIH0pLmVycm9yXG4gICAgICAgICwgYGFwcGxpZXMgJHtrZXl9IHRvIHZhbGlkYXRlLnBheWxvYWRgXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgdC50cnV0aHkoXG4gICAgICBwYXlsb2FkLnZhbGlkYXRlKHsgbm90QVRoaW5nOiB0cnVlIH0pLmVycm9yXG4gICAgICAsICdlcnJvcnMgb24gYSBub24tdmFsaWQga2V5J1xuICAgICk7XG4gIH0pO1xufSk7XG5cbnRlc3QoJ3BheWxvYWQgYXR0cmlidXRlVmFsaWRhdGlvbiB3LyBjb25maWcgYXMgam9pIG9iamVjdCcsICh0KSA9PiB7XG4gIGNvbnN0IHsgYXR0cmlidXRlVmFsaWRhdGlvbiB9ID0gdC5jb250ZXh0O1xuICBjb25zdCBwYXlsb2FkS2V5cyA9IHtcbiAgICBhS2V5OiBqb2kuYm9vbGVhbigpLFxuICB9O1xuICBjb25zdCBjb25maWcgPSB7XG4gICAgdmFsaWRhdGU6IHtcbiAgICAgIHBheWxvYWQ6IGpvaS5vYmplY3QoKS5rZXlzKHBheWxvYWRLZXlzKSxcbiAgICB9LFxuICB9O1xuXG4gIHBheWxvYWRNZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuICAgIGNvbnN0IGNvbmZpZ0Zvck1ldGhvZCA9IGdldENvbmZpZ0Zvck1ldGhvZCh7XG4gICAgICBtZXRob2QsXG4gICAgICBhdHRyaWJ1dGVWYWxpZGF0aW9uLFxuICAgICAgY29uZmlnLFxuICAgIH0pO1xuICAgIGNvbnN0IHsgcGF5bG9hZCB9ID0gY29uZmlnRm9yTWV0aG9kLnZhbGlkYXRlO1xuXG4gICAgY29uc3Qga2V5cyA9IFtcbiAgICAgIC4uLk9iamVjdC5rZXlzKGF0dHJpYnV0ZVZhbGlkYXRpb24pLFxuICAgICAgLi4uT2JqZWN0LmtleXMocGF5bG9hZEtleXMpLFxuICAgIF07XG5cbiAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgdC5pZkVycm9yKFxuICAgICAgICBwYXlsb2FkLnZhbGlkYXRlKHsgW2tleV06IHRydWUgfSkuZXJyb3JcbiAgICAgICAgLCBgYXBwbGllcyAke2tleX0gdG8gdmFsaWRhdGUucGF5bG9hZGBcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICB0LnRydXRoeShcbiAgICAgIHBheWxvYWQudmFsaWRhdGUoeyBub3RBVGhpbmc6IHRydWUgfSkuZXJyb3JcbiAgICAgICwgJ2Vycm9ycyBvbiBhIG5vbi12YWxpZCBrZXknXG4gICAgKTtcbiAgfSk7XG59KTtcblxudGVzdCgndmFsaWRhdGUucGFyYW1zIHNjb3BlUGFyYW1zTWV0aG9kcycsICh0KSA9PiB7XG4gIGNvbnN0IHsgc2NvcGVzIH0gPSB0LmNvbnRleHQ7XG5cbiAgc2NvcGVQYXJhbXNNZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuICAgIGNvbnN0IGNvbmZpZ0Zvck1ldGhvZCA9IGdldENvbmZpZ0Zvck1ldGhvZCh7IG1ldGhvZCwgc2NvcGVzIH0pO1xuICAgIGNvbnN0IHsgcGFyYW1zIH0gPSBjb25maWdGb3JNZXRob2QudmFsaWRhdGU7XG5cbiAgICBzY29wZXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICB0LmlmRXJyb3IoXG4gICAgICAgIHBhcmFtcy52YWxpZGF0ZSh7IHNjb3BlOiBrZXkgfSkuZXJyb3JcbiAgICAgICAgLCBgYXBwbGllcyBcInNjb3BlOiAke2tleX1cIiB0byB2YWxpZGF0ZS5wYXJhbXNgXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgdC50cnV0aHkoXG4gICAgICBwYXJhbXMudmFsaWRhdGUoeyBzY29wZTogJ25vdEF0aGluZycgfSkuZXJyb3JcbiAgICAgICwgJ2Vycm9ycyBvbiBhIG5vbi12YWxpZCBrZXknXG4gICAgKTtcbiAgfSk7XG59KTtcblxudGVzdCgncGFyYW1zIHNjb3BlUGFyYW1zTWV0aG9kcyB3LyBjb25maWcgYXMgcGxhaW4gb2JqZWN0JywgKHQpID0+IHtcbiAgY29uc3QgeyBzY29wZXMgfSA9IHQuY29udGV4dDtcbiAgY29uc3QgY29uZmlnID0ge1xuICAgIHZhbGlkYXRlOiB7XG4gICAgICBwYXJhbXM6IHtcbiAgICAgICAgYUtleTogam9pLmJvb2xlYW4oKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcblxuICBzY29wZVBhcmFtc01ldGhvZHMuZm9yRWFjaCgobWV0aG9kKSA9PiB7XG4gICAgY29uc3QgY29uZmlnRm9yTWV0aG9kID0gZ2V0Q29uZmlnRm9yTWV0aG9kKHtcbiAgICAgIG1ldGhvZCxcbiAgICAgIHNjb3BlcyxcbiAgICAgIGNvbmZpZyxcbiAgICB9KTtcbiAgICBjb25zdCB7IHBhcmFtcyB9ID0gY29uZmlnRm9yTWV0aG9kLnZhbGlkYXRlO1xuXG4gICAgc2NvcGVzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgdC5pZkVycm9yKFxuICAgICAgICBwYXJhbXMudmFsaWRhdGUoeyBzY29wZToga2V5IH0pLmVycm9yXG4gICAgICAgICwgYGFwcGxpZXMgXCJzY29wZTogJHtrZXl9XCIgdG8gdmFsaWRhdGUucGFyYW1zYFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIE9iamVjdC5rZXlzKGNvbmZpZy52YWxpZGF0ZS5wYXJhbXMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgdC5pZkVycm9yKFxuICAgICAgICBwYXJhbXMudmFsaWRhdGUoeyBba2V5XTogdHJ1ZSB9KS5lcnJvclxuICAgICAgICAsIGBhcHBsaWVzICR7a2V5fSB0byB2YWxpZGF0ZS5wYXJhbXNgXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgdC50cnV0aHkoXG4gICAgICBwYXJhbXMudmFsaWRhdGUoeyBub3RBVGhpbmc6IHRydWUgfSkuZXJyb3JcbiAgICAgICwgJ2Vycm9ycyBvbiBhIG5vbi12YWxpZCBrZXknXG4gICAgKTtcbiAgfSk7XG59KTtcblxudGVzdCgncGFyYW1zIHNjb3BlUGFyYW1zTWV0aG9kcyB3LyBjb25maWcgYXMgam9pIG9iamVjdCcsICh0KSA9PiB7XG4gIGNvbnN0IHsgc2NvcGVzIH0gPSB0LmNvbnRleHQ7XG4gIGNvbnN0IHBhcmFtc0tleXMgPSB7XG4gICAgYUtleTogam9pLmJvb2xlYW4oKSxcbiAgfTtcbiAgY29uc3QgY29uZmlnID0ge1xuICAgIHZhbGlkYXRlOiB7XG4gICAgICBwYXJhbXM6IGpvaS5vYmplY3QoKS5rZXlzKHBhcmFtc0tleXMpLFxuICAgIH0sXG4gIH07XG5cbiAgc2NvcGVQYXJhbXNNZXRob2RzLmZvckVhY2goKG1ldGhvZCkgPT4ge1xuICAgIGNvbnN0IGNvbmZpZ0Zvck1ldGhvZCA9IGdldENvbmZpZ0Zvck1ldGhvZCh7XG4gICAgICBtZXRob2QsXG4gICAgICBzY29wZXMsXG4gICAgICBjb25maWcsXG4gICAgfSk7XG4gICAgY29uc3QgeyBwYXJhbXMgfSA9IGNvbmZpZ0Zvck1ldGhvZC52YWxpZGF0ZTtcblxuICAgIHNjb3Blcy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIHQuaWZFcnJvcihcbiAgICAgICAgcGFyYW1zLnZhbGlkYXRlKHsgc2NvcGU6IGtleSB9KS5lcnJvclxuICAgICAgICAsIGBhcHBsaWVzIFwic2NvcGU6ICR7a2V5fVwiIHRvIHZhbGlkYXRlLnBhcmFtc2BcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBPYmplY3Qua2V5cyhwYXJhbXNLZXlzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIHQuaWZFcnJvcihcbiAgICAgICAgcGFyYW1zLnZhbGlkYXRlKHsgW2tleV06IHRydWUgfSkuZXJyb3JcbiAgICAgICAgLCBgYXBwbGllcyAke2tleX0gdG8gdmFsaWRhdGUucGFyYW1zYFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHQudHJ1dGh5KFxuICAgICAgcGFyYW1zLnZhbGlkYXRlKHsgbm90QVRoaW5nOiB0cnVlIH0pLmVycm9yXG4gICAgICAsICdlcnJvcnMgb24gYSBub24tdmFsaWQga2V5J1xuICAgICk7XG4gIH0pO1xufSk7XG5cblxudGVzdCgndmFsaWRhdGUucGF5bG9hZCBpZFBhcmFtc01ldGhvZHMnLCAodCkgPT4ge1xuICBpZFBhcmFtc01ldGhvZHMuZm9yRWFjaCgobWV0aG9kKSA9PiB7XG4gICAgY29uc3QgY29uZmlnRm9yTWV0aG9kID0gZ2V0Q29uZmlnRm9yTWV0aG9kKHsgbWV0aG9kIH0pO1xuICAgIGNvbnN0IHsgcGFyYW1zIH0gPSBjb25maWdGb3JNZXRob2QudmFsaWRhdGU7XG5cbiAgICB0LmlmRXJyb3IoXG4gICAgICBwYXJhbXMudmFsaWRhdGUoeyBpZDogJ2FUaGluZycgfSkuZXJyb3JcbiAgICAgICwgJ2FwcGxpZXMgaWQgdG8gdmFsaWRhdGUucGFyYW1zJ1xuICAgICk7XG4gIH0pO1xufSk7XG5cbnRlc3QoJ3ZhbGlkYXRlLnF1ZXJ5IHJlc3RyaWN0TWV0aG9kcycsICh0KSA9PiB7XG4gIHJlc3RyaWN0TWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHtcbiAgICBjb25zdCBjb25maWdGb3JNZXRob2QgPSBnZXRDb25maWdGb3JNZXRob2QoeyBtZXRob2QgfSk7XG4gICAgY29uc3QgeyBxdWVyeSB9ID0gY29uZmlnRm9yTWV0aG9kLnZhbGlkYXRlO1xuICAgIGNvbnN0IHJlc3RyaWN0S2V5cyA9IFsnbGltaXQnLCAnb2Zmc2V0J107XG5cbiAgICByZXN0cmljdEtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICB0LmlmRXJyb3IoXG4gICAgICAgIHF1ZXJ5LnZhbGlkYXRlKHsgW2tleV06IDAgfSkuZXJyb3JcbiAgICAgICAgLCBgYXBwbGllcyByZXN0cmljdGlvbiAoJHtrZXl9KSB0byB2YWxpZGF0ZS5xdWVyeWBcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICB0LmlmRXJyb3IoXG4gICAgICBxdWVyeS52YWxpZGF0ZSh7IG9yZGVyOiBbJ3RoaW5nJywgJ0RFU0MnXSB9KS5lcnJvclxuICAgICAgLCAnYXBwbGllcyBgb3JkZXJgIHRvIHZhbGlkYXRlLnF1ZXJ5J1xuICAgICk7XG5cbiAgICB0LnRydXRoeShcbiAgICAgIHF1ZXJ5LnZhbGlkYXRlKHsgbm90QVRoaW5nOiB0cnVlIH0pLmVycm9yXG4gICAgICAsICdlcnJvcnMgb24gYSBub24tdmFsaWQga2V5J1xuICAgICk7XG4gIH0pO1xufSk7XG5cbnRlc3QoJ3ZhbGlkYXRlLnF1ZXJ5IHJlc3RyaWN0TWV0aG9kcyB3LyBjb25maWcgYXMgcGxhaW4gb2JqZWN0JywgKHQpID0+IHtcbiAgY29uc3QgY29uZmlnID0ge1xuICAgIHZhbGlkYXRlOiB7XG4gICAgICBxdWVyeToge1xuICAgICAgICBhS2V5OiBqb2kuYm9vbGVhbigpLFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xuXG4gIHJlc3RyaWN0TWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHtcbiAgICBjb25zdCBjb25maWdGb3JNZXRob2QgPSBnZXRDb25maWdGb3JNZXRob2Qoe1xuICAgICAgbWV0aG9kLFxuICAgICAgY29uZmlnLFxuICAgIH0pO1xuICAgIGNvbnN0IHsgcXVlcnkgfSA9IGNvbmZpZ0Zvck1ldGhvZC52YWxpZGF0ZTtcblxuICAgIGNvbnN0IGtleXMgPSBbXG4gICAgICAuLi5PYmplY3Qua2V5cyhjb25maWcudmFsaWRhdGUucXVlcnkpLFxuICAgIF07XG5cbiAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgdC5pZkVycm9yKFxuICAgICAgICBxdWVyeS52YWxpZGF0ZSh7IFtrZXldOiB0cnVlIH0pLmVycm9yXG4gICAgICAgICwgYGFwcGxpZXMgJHtrZXl9IHRvIHZhbGlkYXRlLnF1ZXJ5YFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHQudHJ1dGh5KFxuICAgICAgcXVlcnkudmFsaWRhdGUoeyBub3RBVGhpbmc6IHRydWUgfSkuZXJyb3JcbiAgICAgICwgJ2Vycm9ycyBvbiBhIG5vbi12YWxpZCBrZXknXG4gICAgKTtcbiAgfSk7XG59KTtcblxudGVzdCgndmFsaWRhdGUucXVlcnkgcmVzdHJpY3RNZXRob2RzIHcvIGNvbmZpZyBhcyBqb2kgb2JqZWN0JywgKHQpID0+IHtcbiAgY29uc3QgcXVlcnlLZXlzID0ge1xuICAgIGFLZXk6IGpvaS5ib29sZWFuKCksXG4gIH07XG4gIGNvbnN0IGNvbmZpZyA9IHtcbiAgICB2YWxpZGF0ZToge1xuICAgICAgcXVlcnk6IGpvaS5vYmplY3QoKS5rZXlzKHF1ZXJ5S2V5cyksXG4gICAgfSxcbiAgfTtcblxuICB3aGVyZU1ldGhvZHMuZm9yRWFjaCgobWV0aG9kKSA9PiB7XG4gICAgY29uc3QgY29uZmlnRm9yTWV0aG9kID0gZ2V0Q29uZmlnRm9yTWV0aG9kKHtcbiAgICAgIG1ldGhvZCxcbiAgICAgIGNvbmZpZyxcbiAgICB9KTtcbiAgICBjb25zdCB7IHF1ZXJ5IH0gPSBjb25maWdGb3JNZXRob2QudmFsaWRhdGU7XG5cbiAgICBjb25zdCBrZXlzID0gW1xuICAgICAgLi4uT2JqZWN0LmtleXMocXVlcnlLZXlzKSxcbiAgICBdO1xuXG4gICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIHQuaWZFcnJvcihcbiAgICAgICAgcXVlcnkudmFsaWRhdGUoeyBba2V5XTogdHJ1ZSB9KS5lcnJvclxuICAgICAgICAsIGBhcHBsaWVzICR7a2V5fSB0byB2YWxpZGF0ZS5xdWVyeWBcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICB0LnRydXRoeShcbiAgICAgIHF1ZXJ5LnZhbGlkYXRlKHsgbm90QVRoaW5nOiB0cnVlIH0pLmVycm9yXG4gICAgICAsICdlcnJvcnMgb24gYSBub24tdmFsaWQga2V5J1xuICAgICk7XG4gIH0pO1xufSk7XG5cblxudGVzdCgnZG9lcyBub3QgbW9kaWZ5IGluaXRpYWwgY29uZmlnIG9uIG11bHRpcGxlIHBhc3NlcycsICh0KSA9PiB7XG4gIGNvbnN0IHsgY29uZmlnIH0gPSB0LmNvbnRleHQ7XG4gIGNvbnN0IG9yaWdpbmFsQ29uZmlnID0geyAuLi5jb25maWcgfTtcblxuICB3aGVyZU1ldGhvZHMuZm9yRWFjaCgobWV0aG9kKSA9PiB7XG4gICAgZ2V0Q29uZmlnRm9yTWV0aG9kKHsgbWV0aG9kLCAuLi50LmNvbnRleHQgfSk7XG4gIH0pO1xuXG4gIHQuZGVlcEVxdWFsKFxuICAgIGNvbmZpZ1xuICAgICwgb3JpZ2luYWxDb25maWdcbiAgICAsICdkb2VzIG5vdCBtb2RpZnkgdGhlIG9yaWdpbmFsIGNvbmZpZyBvYmplY3QnXG4gICk7XG59KTtcbiJdfQ==