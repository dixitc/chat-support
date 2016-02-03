define('embtest/tests/adapters/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - adapters');
  QUnit.test('adapters/application.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass jshint.');
  });
});
define('embtest/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('app.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('embtest/tests/authenticators/custom.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - authenticators');
  QUnit.test('authenticators/custom.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'authenticators/custom.js should pass jshint.\nauthenticators/custom.js: line 37, col 38, \'error\' is defined but never used.\nauthenticators/custom.js: line 37, col 30, \'status\' is defined but never used.\n\n2 errors');
  });
});
define('embtest/tests/authorizers/custom.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - authorizers');
  QUnit.test('authorizers/custom.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'authorizers/custom.js should pass jshint.');
  });
});
define('embtest/tests/components/animated-if.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - components');
  QUnit.test('components/animated-if.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/animated-if.js should pass jshint.');
  });
});
define('embtest/tests/controllers/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/application.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass jshint.');
  });
});
define('embtest/tests/controllers/dashboard.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/dashboard.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/dashboard.js should pass jshint.\ncontrollers/dashboard.js: line 17, col 57, Missing semicolon.\ncontrollers/dashboard.js: line 24, col 36, \'index\' is defined but never used.\ncontrollers/dashboard.js: line 22, col 69, \'data\' is defined but never used.\ncontrollers/dashboard.js: line 61, col 37, Missing semicolon.\ncontrollers/dashboard.js: line 60, col 41, \'data\' is defined but never used.\ncontrollers/dashboard.js: line 62, col 12, Missing semicolon.\ncontrollers/dashboard.js: line 63, col 50, \'data\' is defined but never used.\ncontrollers/dashboard.js: line 73, col 12, Missing semicolon.\ncontrollers/dashboard.js: line 81, col 18, Missing semicolon.\ncontrollers/dashboard.js: line 85, col 12, Missing semicolon.\ncontrollers/dashboard.js: line 86, col 40, \'data\' is defined but never used.\ncontrollers/dashboard.js: line 88, col 12, Missing semicolon.\ncontrollers/dashboard.js: line 89, col 57, Missing semicolon.\ncontrollers/dashboard.js: line 90, col 48, \'data\' is defined but never used.\ncontrollers/dashboard.js: line 92, col 16, Missing semicolon.\ncontrollers/dashboard.js: line 94, col 45, \'data\' is defined but never used.\ncontrollers/dashboard.js: line 104, col 62, Missing semicolon.\ncontrollers/dashboard.js: line 114, col 68, Missing semicolon.\ncontrollers/dashboard.js: line 123, col 32, Missing semicolon.\ncontrollers/dashboard.js: line 125, col 47, Missing semicolon.\ncontrollers/dashboard.js: line 131, col 48, Missing semicolon.\ncontrollers/dashboard.js: line 134, col 17, \'self\' is defined but never used.\ncontrollers/dashboard.js: line 135, col 17, \'user\' is defined but never used.\ncontrollers/dashboard.js: line 150, col 39, Missing semicolon.\ncontrollers/dashboard.js: line 151, col 16, Missing semicolon.\ncontrollers/dashboard.js: line 159, col 51, Missing semicolon.\ncontrollers/dashboard.js: line 162, col 68, Missing semicolon.\ncontrollers/dashboard.js: line 165, col 42, Missing semicolon.\ncontrollers/dashboard.js: line 169, col 43, Missing semicolon.\ncontrollers/dashboard.js: line 171, col 47, Missing semicolon.\ncontrollers/dashboard.js: line 174, col 16, Missing semicolon.\ncontrollers/dashboard.js: line 179, col 16, Missing semicolon.\ncontrollers/dashboard.js: line 180, col 44, \'data\' is defined but never used.\ncontrollers/dashboard.js: line 182, col 16, Missing semicolon.\ncontrollers/dashboard.js: line 184, col 29, Missing semicolon.\ncontrollers/dashboard.js: line 186, col 16, Missing semicolon.\ncontrollers/dashboard.js: line 189, col 20, Missing semicolon.\ncontrollers/dashboard.js: line 144, col 26, \'io\' is not defined.\ncontrollers/dashboard.js: line 150, col 17, \'addChatMessage\' is not defined.\ncontrollers/dashboard.js: line 169, col 21, \'addChatMessage\' is not defined.\ncontrollers/dashboard.js: line 156, col 25, \'$\' is not defined.\ncontrollers/dashboard.js: line 158, col 34, \'$\' is not defined.\ncontrollers/dashboard.js: line 167, col 35, \'$\' is not defined.\ncontrollers/dashboard.js: line 171, col 21, \'generateChatWindow\' is not defined.\ncontrollers/dashboard.js: line 181, col 17, \'log\' is not defined.\ncontrollers/dashboard.js: line 184, col 17, \'log\' is not defined.\ncontrollers/dashboard.js: line 185, col 17, \'log\' is not defined.\ncontrollers/dashboard.js: line 188, col 21, \'addChatTyping\' is not defined.\ncontrollers/dashboard.js: line 192, col 17, \'removeChatTyping\' is not defined.\n\n49 errors');
  });
});
define('embtest/tests/controllers/login.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/login.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/login.js should pass jshint.\ncontrollers/login.js: line 71, col 44, Missing semicolon.\ncontrollers/login.js: line 70, col 17, \'user\' is defined but never used.\ncontrollers/login.js: line 105, col 17, \'credentials\' is defined but never used.\ncontrollers/login.js: line 139, col 64, Missing semicolon.\n\n4 errors');
  });
});
define('embtest/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('embtest/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/destroy-app.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('embtest/tests/helpers/ember-simple-auth', ['exports', 'ember-simple-auth/authenticators/test'], function (exports, _emberSimpleAuthAuthenticatorsTest) {
  exports.authenticateSession = authenticateSession;
  exports.currentSession = currentSession;
  exports.invalidateSession = invalidateSession;

  var TEST_CONTAINER_KEY = 'authenticator:test';

  function ensureAuthenticator(app, container) {
    var authenticator = container.lookup(TEST_CONTAINER_KEY);
    if (!authenticator) {
      app.register(TEST_CONTAINER_KEY, _emberSimpleAuthAuthenticatorsTest['default']);
    }
  }

  function authenticateSession(app, sessionData) {
    var container = app.__container__;

    var session = container.lookup('service:session');
    ensureAuthenticator(app, container);
    session.authenticate(TEST_CONTAINER_KEY, sessionData);
    return wait();
  }

  ;

  function currentSession(app) {
    return app.__container__.lookup('service:session');
  }

  ;

  function invalidateSession(app) {
    var session = app.__container__.lookup('service:session');
    if (session.get('isAuthenticated')) {
      session.invalidate();
    }
    return wait();
  }

  ;
});
define('embtest/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'embtest/tests/helpers/start-app', 'embtest/tests/helpers/destroy-app'], function (exports, _qunit, _embtestTestsHelpersStartApp, _embtestTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _embtestTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        (0, _embtestTestsHelpersDestroyApp['default'])(this.application);

        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }
      }
    });
  };
});
define('embtest/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/module-for-acceptance.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('embtest/tests/helpers/msg-length.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/msg-length.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/msg-length.js should pass jshint.\nhelpers/msg-length.js: line 4, col 26, Missing semicolon.\nhelpers/msg-length.js: line 5, col 24, Missing semicolon.\n\n2 errors');
  });
});
define('embtest/tests/helpers/resolver', ['exports', 'embtest/resolver', 'embtest/config/environment'], function (exports, _embtestResolver, _embtestConfigEnvironment) {

  var resolver = _embtestResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _embtestConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _embtestConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('embtest/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/resolver.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('embtest/tests/helpers/start-app', ['exports', 'ember', 'embtest/app', 'embtest/config/environment'], function (exports, _ember, _embtestApp, _embtestConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _embtestConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _embtestApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('embtest/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/start-app.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('embtest/tests/helpers/validate-properties', ['exports', 'ember', 'ember-qunit'], function (exports, _ember, _emberQunit) {
  exports.testValidPropertyValues = testValidPropertyValues;
  exports.testInvalidPropertyValues = testInvalidPropertyValues;

  var run = _ember['default'].run;

  function validateValues(object, propertyName, values, isTestForValid) {
    var promise = null;
    var validatedValues = [];

    values.forEach(function (value) {
      function handleValidation(errors) {
        var hasErrors = object.get('errors.' + propertyName + '.firstObject');
        if (hasErrors && !isTestForValid || !hasErrors && isTestForValid) {
          validatedValues.push(value);
        }
      }

      run(object, 'set', propertyName, value);

      var objectPromise = null;
      run(function () {
        objectPromise = object.validate().then(handleValidation, handleValidation);
      });

      // Since we are setting the values in a different run loop as we are validating them,
      // we need to chain the promises so that they run sequentially. The wrong value will
      // be validated if the promises execute concurrently
      promise = promise ? promise.then(objectPromise) : objectPromise;
    });

    return promise.then(function () {
      return validatedValues;
    });
  }

  function testPropertyValues(propertyName, values, isTestForValid, context) {
    var validOrInvalid = isTestForValid ? 'Valid' : 'Invalid';
    var testName = validOrInvalid + ' ' + propertyName;

    (0, _emberQunit.test)(testName, function (assert) {
      var object = this.subject();

      if (context && typeof context === 'function') {
        context(object);
      }

      // Use QUnit.dump.parse so null and undefined can be printed as literal 'null' and
      // 'undefined' strings in the assert message.
      var valuesString = QUnit.dump.parse(values).replace(/\n(\s+)?/g, '').replace(/,/g, ', ');
      var assertMessage = 'Expected ' + propertyName + ' to have ' + validOrInvalid.toLowerCase() + ' values: ' + valuesString;

      return validateValues(object, propertyName, values, isTestForValid).then(function (validatedValues) {
        assert.deepEqual(validatedValues, values, assertMessage);
      });
    });
  }

  function testValidPropertyValues(propertyName, values, context) {
    testPropertyValues(propertyName, values, true, context);
  }

  function testInvalidPropertyValues(propertyName, values, context) {
    testPropertyValues(propertyName, values, false, context);
  }
});
define('embtest/tests/initializers/socket.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - initializers');
  QUnit.test('initializers/socket.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'initializers/socket.js should pass jshint.');
  });
});
define('embtest/tests/integration/components/animated-if-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('animated-if', 'Integration | Component | animated if', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });"

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 15
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'animated-if', ['loc', [null, [1, 0], [1, 15]]]]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:"
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'fragmentReason': false,
            'revision': 'Ember@2.3.0',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'fragmentReason': {
            'name': 'missing-wrapper',
            'problems': ['wrong-type']
          },
          'revision': 'Ember@2.3.0',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'animated-if', [], [], 0, null, ['loc', [null, [2, 4], [4, 20]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('embtest/tests/integration/components/animated-if-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - integration/components');
  QUnit.test('integration/components/animated-if-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/animated-if-test.js should pass jshint.');
  });
});
define('embtest/tests/models/user.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/user.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/user.js should pass jshint.');
  });
});
define('embtest/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('resolver.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('embtest/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('router.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('embtest/tests/routes/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/application.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass jshint.');
  });
});
define('embtest/tests/routes/dashboard.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/dashboard.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/dashboard.js should pass jshint.\nroutes/dashboard.js: line 6, col 34, Missing semicolon.\nroutes/dashboard.js: line 7, col 78, Missing semicolon.\nroutes/dashboard.js: line 38, col 39, Missing semicolon.\nroutes/dashboard.js: line 5, col 17, \'transition\' is defined but never used.\n\n4 errors');
  });
});
define('embtest/tests/routes/login.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/login.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/login.js should pass jshint.');
  });
});
define('embtest/tests/routes/profile.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/profile.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/profile.js should pass jshint.');
  });
});
define('embtest/tests/serializers/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - serializers');
  QUnit.test('serializers/application.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'serializers/application.js should pass jshint.');
  });
});
define('embtest/tests/serializers/user.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - serializers');
  QUnit.test('serializers/user.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'serializers/user.js should pass jshint.\nserializers/user.js: line 10, col 10, Missing semicolon.\nserializers/user.js: line 4, col 35, \'options\' is defined but never used.\n\n2 errors');
  });
});
define('embtest/tests/test-helper', ['exports', 'embtest/tests/helpers/resolver', 'ember-qunit'], function (exports, _embtestTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_embtestTestsHelpersResolver['default']);
});
define('embtest/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('test-helper.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('embtest/tests/unit/adapters/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('adapter:application', 'Unit | Adapter | application', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });
});
define('embtest/tests/unit/adapters/application-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/adapters');
  QUnit.test('unit/adapters/application-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/application-test.js should pass jshint.');
  });
});
define('embtest/tests/unit/controllers/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:application', 'Unit | Controller | application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('embtest/tests/unit/controllers/application-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers');
  QUnit.test('unit/controllers/application-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/application-test.js should pass jshint.');
  });
});
define('embtest/tests/unit/controllers/dashboard-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:dashboard', 'Unit | Controller | dashboard', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('embtest/tests/unit/controllers/dashboard-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers');
  QUnit.test('unit/controllers/dashboard-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/dashboard-test.js should pass jshint.');
  });
});
define('embtest/tests/unit/controllers/login-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:login', 'Unit | Controller | login', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('embtest/tests/unit/controllers/login-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers');
  QUnit.test('unit/controllers/login-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/login-test.js should pass jshint.');
  });
});
define('embtest/tests/unit/helpers/msg-length-test', ['exports', 'embtest/helpers/msg-length', 'qunit'], function (exports, _embtestHelpersMsgLength, _qunit) {

  (0, _qunit.module)('Unit | Helper | msg length');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _embtestHelpersMsgLength.msgLength)([42]);
    assert.ok(result);
  });
});
define('embtest/tests/unit/helpers/msg-length-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/helpers');
  QUnit.test('unit/helpers/msg-length-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/helpers/msg-length-test.js should pass jshint.');
  });
});
define('embtest/tests/unit/initializers/socket-test', ['exports', 'ember', 'embtest/initializers/socket', 'qunit'], function (exports, _ember, _embtestInitializersSocket, _qunit) {

  var application = undefined;

  (0, _qunit.module)('Unit | Initializer | socket', {
    beforeEach: function beforeEach() {
      _ember['default'].run(function () {
        application = _ember['default'].Application.create();
        application.deferReadiness();
      });
    }
  });

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    _embtestInitializersSocket['default'].initialize(application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });
});
define('embtest/tests/unit/initializers/socket-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/initializers');
  QUnit.test('unit/initializers/socket-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/initializers/socket-test.js should pass jshint.');
  });
});
define('embtest/tests/unit/models/user-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('user', 'Unit | Model | user', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('embtest/tests/unit/models/user-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/user-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/user-test.js should pass jshint.');
  });
});
define('embtest/tests/unit/routes/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:application', 'Unit | Route | application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('embtest/tests/unit/routes/application-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/application-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/application-test.js should pass jshint.');
  });
});
define('embtest/tests/unit/routes/dashboard-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:dashboard', 'Unit | Route | dashboard', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('embtest/tests/unit/routes/dashboard-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/dashboard-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/dashboard-test.js should pass jshint.');
  });
});
define('embtest/tests/unit/routes/login-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:login', 'Unit | Route | login', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('embtest/tests/unit/routes/login-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/login-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/login-test.js should pass jshint.');
  });
});
define('embtest/tests/unit/routes/profile-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:profile', 'Unit | Route | profile', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('embtest/tests/unit/routes/profile-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/profile-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/profile-test.js should pass jshint.');
  });
});
define('embtest/tests/unit/serializers/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('application', 'Unit | Serializer | application', {
    // Specify the other units that are required for this test.
    needs: ['serializer:application']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('embtest/tests/unit/serializers/application-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers');
  QUnit.test('unit/serializers/application-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/application-test.js should pass jshint.');
  });
});
define('embtest/tests/unit/serializers/user-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('user', 'Unit | Serializer | user', {
    // Specify the other units that are required for this test.
    needs: ['serializer:user']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('embtest/tests/unit/serializers/user-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/serializers');
  QUnit.test('unit/serializers/user-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/user-test.js should pass jshint.');
  });
});
define('embtest/tests/unit/services/session-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('service:session', 'Unit | Service | session', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('embtest/tests/unit/services/session-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/services');
  QUnit.test('unit/services/session-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/session-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('embtest/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map