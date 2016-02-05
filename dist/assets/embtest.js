"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('embtest/adapters/application', ['exports', 'ember-data', 'ember-simple-auth/mixins/data-adapter-mixin'], function (exports, _emberData, _emberSimpleAuthMixinsDataAdapterMixin) {
	exports['default'] = _emberData['default'].RESTAdapter.extend(_emberSimpleAuthMixinsDataAdapterMixin['default'], {
		host: 'http://172.16.1.168:3000',
		authorizer: 'authorizer:custom'
	});
});
define('embtest/app', ['exports', 'ember', 'embtest/resolver', 'ember/load-initializers', 'embtest/config/environment'], function (exports, _ember, _embtestResolver, _emberLoadInitializers, _embtestConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _embtestConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _embtestConfigEnvironment['default'].podModulePrefix,
    Resolver: _embtestResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _embtestConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('embtest/authenticators/custom', ['exports', 'ember', 'ember-simple-auth/authenticators/base'], function (exports, _ember, _emberSimpleAuthAuthenticatorsBase) {
    exports['default'] = _emberSimpleAuthAuthenticatorsBase['default'].extend({
        tokenEndpoint: 'http://172.16.1.168:3000/login',
        restore: function restore(data) {
            return new _ember['default'].RSVP.Promise(function (resolve, reject) {
                if (!_ember['default'].isEmpty(data.token)) {
                    console.log('RESTORING SESSION');
                    //parse user id from token
                    //get user
                    //set user as current user
                    //set refreshed token
                    resolve(data);
                } else {
                    reject();
                }
            });
        },

        authenticate: function authenticate(options) {
            var _this = this;

            return new _ember['default'].RSVP.Promise(function (resolve, reject) {
                _ember['default'].$.ajax({
                    url: _this.tokenEndpoint,
                    type: 'POST',
                    data: JSON.stringify({
                        username: options.name,
                        password: options.password
                    }),
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json'
                }).then(function (response) {
                    _ember['default'].run(function () {
                        resolve({
                            token: response.token
                        });
                    });
                }, function (xhr, status, error) {
                    var response = xhr.responseText;
                    _ember['default'].run(function () {
                        reject(response);
                    });
                });
            });
        },

        invalidate: function invalidate() {
            console.log('invalidate...');
            return _ember['default'].RSVP.resolve();
        }
    });
});
// app/authenticators/custom.js
define('embtest/authorizers/custom', ['exports', 'ember', 'ember-simple-auth/authorizers/base'], function (exports, _ember, _emberSimpleAuthAuthorizersBase) {
	exports['default'] = _emberSimpleAuthAuthorizersBase['default'].extend({
		authorize: function authorize(data, block) {
			var token = data.token;

			//console.log(atob(data.token.split('.')[1]))
			if (!_ember['default'].isEmpty(token)) {
				block('Authorization', 'Bearer ' + token);
			}
		}
	});
});
// app/authorizers/custom.js
define('embtest/components/animated-if', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    condition: null,

    classNames: 'animated-if',

    isInverse: false,

    updateVisibilityState: (function () {
      if (this.get('condition') ^ this.isInverse) {
        this.$().show(500);
      } else {
        this.$().hide(500);
      }
    }).on('didInsertElement').observes('condition')
  });
});
define('embtest/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'embtest/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _embtestConfigEnvironment) {

  var name = _embtestConfigEnvironment['default'].APP.name;
  var version = _embtestConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('embtest/components/base-focusable', ['exports', 'ember-paper/components/base-focusable'], function (exports, _emberPaperComponentsBaseFocusable) {
  exports['default'] = _emberPaperComponentsBaseFocusable['default'];
});
define('embtest/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormholeComponentsEmberWormhole) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWormholeComponentsEmberWormhole['default'];
    }
  });
});
define('embtest/components/paper-autocomplete-highlight', ['exports', 'ember-paper/components/paper-autocomplete-highlight'], function (exports, _emberPaperComponentsPaperAutocompleteHighlight) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperAutocompleteHighlight['default'];
    }
  });
});
define('embtest/components/paper-autocomplete-item', ['exports', 'ember-paper/components/paper-autocomplete-item'], function (exports, _emberPaperComponentsPaperAutocompleteItem) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperAutocompleteItem['default'];
    }
  });
});
define('embtest/components/paper-autocomplete-list', ['exports', 'ember-paper/components/paper-autocomplete-list'], function (exports, _emberPaperComponentsPaperAutocompleteList) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperAutocompleteList['default'];
    }
  });
});
define('embtest/components/paper-autocomplete', ['exports', 'ember-paper/components/paper-autocomplete'], function (exports, _emberPaperComponentsPaperAutocomplete) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperAutocomplete['default'];
    }
  });
});
define('embtest/components/paper-backdrop', ['exports', 'ember-paper/components/paper-backdrop'], function (exports, _emberPaperComponentsPaperBackdrop) {
  exports['default'] = _emberPaperComponentsPaperBackdrop['default'];
});
define('embtest/components/paper-button', ['exports', 'ember-paper/components/paper-button'], function (exports, _emberPaperComponentsPaperButton) {
  exports['default'] = _emberPaperComponentsPaperButton['default'];
});
define('embtest/components/paper-card-content', ['exports', 'ember-paper/components/paper-card-content'], function (exports, _emberPaperComponentsPaperCardContent) {
  exports['default'] = _emberPaperComponentsPaperCardContent['default'];
});
define('embtest/components/paper-card-footer', ['exports', 'ember-paper/components/paper-card-footer'], function (exports, _emberPaperComponentsPaperCardFooter) {
  exports['default'] = _emberPaperComponentsPaperCardFooter['default'];
});
define('embtest/components/paper-card', ['exports', 'ember-paper/components/paper-card'], function (exports, _emberPaperComponentsPaperCard) {
  exports['default'] = _emberPaperComponentsPaperCard['default'];
});
define('embtest/components/paper-checkbox', ['exports', 'ember-paper/components/paper-checkbox'], function (exports, _emberPaperComponentsPaperCheckbox) {
  exports['default'] = _emberPaperComponentsPaperCheckbox['default'];
});
define('embtest/components/paper-content', ['exports', 'ember-paper/components/paper-content'], function (exports, _emberPaperComponentsPaperContent) {
  exports['default'] = _emberPaperComponentsPaperContent['default'];
});
define('embtest/components/paper-divider', ['exports', 'ember-paper/components/paper-divider'], function (exports, _emberPaperComponentsPaperDivider) {
  exports['default'] = _emberPaperComponentsPaperDivider['default'];
});
define('embtest/components/paper-grid-list', ['exports', 'ember-paper/components/paper-grid-list'], function (exports, _emberPaperComponentsPaperGridList) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperGridList['default'];
    }
  });
});
define('embtest/components/paper-grid-tile-footer', ['exports', 'ember-paper/components/paper-grid-tile-footer'], function (exports, _emberPaperComponentsPaperGridTileFooter) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperGridTileFooter['default'];
    }
  });
});
define('embtest/components/paper-grid-tile', ['exports', 'ember-paper/components/paper-grid-tile'], function (exports, _emberPaperComponentsPaperGridTile) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperGridTile['default'];
    }
  });
});
define('embtest/components/paper-icon', ['exports', 'ember-paper/components/paper-icon'], function (exports, _emberPaperComponentsPaperIcon) {
  exports['default'] = _emberPaperComponentsPaperIcon['default'];
});
define('embtest/components/paper-input', ['exports', 'ember-paper/components/paper-input'], function (exports, _emberPaperComponentsPaperInput) {
  exports['default'] = _emberPaperComponentsPaperInput['default'];
});
define('embtest/components/paper-item', ['exports', 'ember-paper/components/paper-item'], function (exports, _emberPaperComponentsPaperItem) {
  exports['default'] = _emberPaperComponentsPaperItem['default'];
});
define('embtest/components/paper-list', ['exports', 'ember-paper/components/paper-list'], function (exports, _emberPaperComponentsPaperList) {
  exports['default'] = _emberPaperComponentsPaperList['default'];
});
define('embtest/components/paper-menu-container-wrap', ['exports', 'ember-paper/components/paper-menu-container-wrap'], function (exports, _emberPaperComponentsPaperMenuContainerWrap) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperMenuContainerWrap['default'];
    }
  });
});
define('embtest/components/paper-menu-container', ['exports', 'ember-paper/components/paper-menu-container'], function (exports, _emberPaperComponentsPaperMenuContainer) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperMenuContainer['default'];
    }
  });
});
define('embtest/components/paper-menu-content-pane', ['exports', 'ember-paper/components/paper-menu-content-pane'], function (exports, _emberPaperComponentsPaperMenuContentPane) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperMenuContentPane['default'];
    }
  });
});
define('embtest/components/paper-menu-content', ['exports', 'ember-paper/components/paper-menu-content'], function (exports, _emberPaperComponentsPaperMenuContent) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperMenuContent['default'];
    }
  });
});
define('embtest/components/paper-menu-item', ['exports', 'ember-paper/components/paper-menu-item'], function (exports, _emberPaperComponentsPaperMenuItem) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperMenuItem['default'];
    }
  });
});
define('embtest/components/paper-menu', ['exports', 'ember-paper/components/paper-menu'], function (exports, _emberPaperComponentsPaperMenu) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperMenu['default'];
    }
  });
});
define('embtest/components/paper-nav-container', ['exports', 'ember-paper/components/paper-nav-container'], function (exports, _emberPaperComponentsPaperNavContainer) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperNavContainer['default'];
    }
  });
});
define('embtest/components/paper-optgroup', ['exports', 'ember-paper/components/paper-optgroup'], function (exports, _emberPaperComponentsPaperOptgroup) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperOptgroup['default'];
    }
  });
});
define('embtest/components/paper-option', ['exports', 'ember-paper/components/paper-option'], function (exports, _emberPaperComponentsPaperOption) {
  exports['default'] = _emberPaperComponentsPaperOption['default'];
});
define('embtest/components/paper-progress-circular', ['exports', 'ember-paper/components/paper-progress-circular'], function (exports, _emberPaperComponentsPaperProgressCircular) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperProgressCircular['default'];
    }
  });
});
define('embtest/components/paper-progress-linear', ['exports', 'ember-paper/components/paper-progress-linear'], function (exports, _emberPaperComponentsPaperProgressLinear) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperProgressLinear['default'];
    }
  });
});
define('embtest/components/paper-radio', ['exports', 'ember-paper/components/paper-radio'], function (exports, _emberPaperComponentsPaperRadio) {
  exports['default'] = _emberPaperComponentsPaperRadio['default'];
});
define('embtest/components/paper-select-container', ['exports', 'ember-paper/components/paper-select-container'], function (exports, _emberPaperComponentsPaperSelectContainer) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperSelectContainer['default'];
    }
  });
});
define('embtest/components/paper-select-core', ['exports', 'ember-paper/components/paper-select-core'], function (exports, _emberPaperComponentsPaperSelectCore) {
  exports['default'] = _emberPaperComponentsPaperSelectCore['default'];
});
define('embtest/components/paper-select-menu', ['exports', 'ember-paper/components/paper-select-menu'], function (exports, _emberPaperComponentsPaperSelectMenu) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperSelectMenu['default'];
    }
  });
});
define('embtest/components/paper-select-value', ['exports', 'ember-paper/components/paper-select-value'], function (exports, _emberPaperComponentsPaperSelectValue) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperComponentsPaperSelectValue['default'];
    }
  });
});
define('embtest/components/paper-select', ['exports', 'ember-paper/components/paper-select'], function (exports, _emberPaperComponentsPaperSelect) {
  exports['default'] = _emberPaperComponentsPaperSelect['default'];
});
define('embtest/components/paper-sidenav-toggle', ['exports', 'ember-paper/components/paper-sidenav-toggle'], function (exports, _emberPaperComponentsPaperSidenavToggle) {
  exports['default'] = _emberPaperComponentsPaperSidenavToggle['default'];
});
define('embtest/components/paper-sidenav', ['exports', 'ember-paper/components/paper-sidenav'], function (exports, _emberPaperComponentsPaperSidenav) {
  exports['default'] = _emberPaperComponentsPaperSidenav['default'];
});
define('embtest/components/paper-slider', ['exports', 'ember-paper/components/paper-slider'], function (exports, _emberPaperComponentsPaperSlider) {
  exports['default'] = _emberPaperComponentsPaperSlider['default'];
});
define('embtest/components/paper-subheader', ['exports', 'ember-paper/components/paper-subheader'], function (exports, _emberPaperComponentsPaperSubheader) {
  exports['default'] = _emberPaperComponentsPaperSubheader['default'];
});
define('embtest/components/paper-switch', ['exports', 'ember-paper/components/paper-switch'], function (exports, _emberPaperComponentsPaperSwitch) {
  exports['default'] = _emberPaperComponentsPaperSwitch['default'];
});
define('embtest/components/paper-toolbar', ['exports', 'ember-paper/components/paper-toolbar'], function (exports, _emberPaperComponentsPaperToolbar) {
  exports['default'] = _emberPaperComponentsPaperToolbar['default'];
});
define('embtest/components/transition-group', ['exports', 'ember-css-transitions/components/transition-group'], function (exports, _emberCssTransitionsComponentsTransitionGroup) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCssTransitionsComponentsTransitionGroup['default'];
    }
  });
});
define('embtest/components/x-file-input', ['exports', 'emberx-file-input/components/x-file-input'], function (exports, _emberxFileInputComponentsXFileInput) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberxFileInputComponentsXFileInput['default'];
    }
  });
});
define('embtest/controllers/application', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		session: _ember['default'].inject.service('session'),
		actions: {
			logout: function logout() {
				this.get('session').invalidate();
			}
		}
	});
});
define('embtest/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('embtest/controllers/dashboard', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Controller.extend({
		socketIOService: _ember['default'].inject.service('socket-io'),
		listData: _ember['default'].A([]),
		session: _ember['default'].inject.service('session'),
		selectedUser: null,
		selectedMessages: _ember['default'].computed('selectedUser', function () {
			if (this.get('selectedUser')) {

				return this.listData[this.listData.map(function (e) {
					return e.who;
				}).indexOf(this.get('selectedUser'))].msgs;
			} else {
				return [];
			}
		}),
		messagesCount: _ember['default'].computed('listData.@each.msgs', function (data) {
			return this.get('listData').map(function (chore, index) {

				return 'msglength: ' + chore.msgs.length + '!';
			});
		}),

		init: function init() {
			this._super.apply(this, arguments);

			//USER INTERACTIONS
			$(window).keydown(function (e) {
				// Auto-focus the current input when a key is typed
				if (event.ctrlKey || event.metaKey || event.altKey) {
					$('.inputMessage').focus();
				}
			});

			$("input:file").change(function (e) {

				//Get the first (and only one) file element
				//that is included in the original event
				var file = e.originalEvent.target.files[0],
				    reader = new FileReader();
				//When the file has been read...
				reader.onload = function (evt) {
					//Because of how the file was read,
					//evt.target.result contains the image in base64 format
					//Nothing special, just creates an img element
					//and appends it to the DOM so my UI shows
					//that I posted an image.
					//send the image via Socket.io

					this.sendFile(evt.target.result);
				};
				//And now, read the image and base64
				reader.readAsDataURL(file);
			});
			/*
    * 2) The next step you need to do is to create your actual socketIO.
    */
			var socket = this.get('socketIOService').socketFor('http://172.16.1.168:3001/');

			/*
    * 3) Define any event handlers
    */
			socket.on('connect', function () {
				/*
     * There are 2 ways to send messages to the server: send and emit
     */
				socket.emit('join support', {
					email: 'support@example.com'
				});
			}, this);

			/*
    * 4) It is also possible to set event handlers on specific events
    */
			socket.on('user message', this.onMessage, this);
			socket.on('support message', this.onMessage, this);

			socket.on('myCustomNamespace', function () {
				socket.emit('anotherNamespace', 'some data');
			}, this);
			//   socket.emit('addsupport' ,{})
			socket.on("new_msg", function (data) {});
			socket.on('message received', function (data) {});
			socket.on("user message", function (data) {

				socket.emit('userMsg received', data);
			});
			var self = this;
			socket.on('new user', function (data) {
				self.listData.pushObject(_ember['default'].Object.create({
					who: data.username,
					msgs: _ember['default'].A([]),
					email: data.email,
					connected: false,
					unseenMsgs: 0
				}));
			});
			socket.on('joined', function (data) {});
			socket.on('support joining', function (data) {
				console.log("SUPPORT JOINING");
			});
			socket.on('updatechat', this.updateChat, this);
			socket.on('support typing', function (data) {
				console.log("typing");
			});
			// Whenever the server emits 'stop typing', kill the typing message
			socket.on('stop typing', function (data) {});
		},
		updateChat: function updateChat(data1, data2) {

			this.listData[this.listData.map(function (e) {
				return e.who;
			}).indexOf(data2)].toggleProperty('connected');
		},

		onMessage: function onMessage(data) {
			// This is executed within the ember run loop
			var self = this;
			var selecteduser = this.listData[this.listData.map(function (e) {
				return e.who;
			}).indexOf(self.get('selectedUser'))];
			console.log(selecteduser);
			var clientUser = this.listData[this.listData.map(function (e) {
				return e.who;
			}).indexOf(data.username)];

			console.log(clientUser);
			if (data.image) {

				clientUser.msgs.pushObject({
					msg: data.buffer,
					type: true,
					image: true
				});
			} else {
				clientUser.msgs.pushObject({
					msg: data.msg,
					type: true
				});
				if (clientUser.get('who') == selecteduser.who) {
					console.log('MESSAGEUSER MATCHES SELECTEDUSER : dont add unseen messages');
				} else {

					clientUser.incrementProperty('unseenMsgs');
				}
			}
			$('.messages').animate({
				scrollTop: $('.messages').get(0).scrollHeight
			}, 100);
			//alert( data.msg );
		},
		sendFile: function sendFile(buf) {

			var message = {};

			// Prevent markup from being injected into the message
			var clientUser = this.listData[this.listData.map(function (e) {
				return e.who;
			}).indexOf(this.get('selectedUser'))];

			message.room = clientUser.email;
			message.email = clientUser.email;
			message.buffer = buf;
			message.image = true;
			message.username = clientUser.who;
			clientUser.msgs.pushObject({
				msg: message.buffer,
				image: true,
				type: false
			});
			var socket = this.get('socketIOService').socketFor('http://172.16.1.168:3001/');
			socket.emit('support image', message);
			$('.messages').animate({
				scrollTop: $('.messages').get(0).scrollHeight
			}, 100);
		},
		actions: {
			imageBuffer: function imageBuffer(evt) {
				var self = this;

				//var file = e.originalEvent.target.files[0],
				var reader = new FileReader();
				//When the file has been read...
				reader.onload = function (e) {
					//Because of how the file was read,
					//e.target.result contains the image in base64 format
					//Nothing special, just creates an img element
					//and appends it to the DOM so my UI shows
					//that I posted an image.
					//send the image via Socket.io

					self.sendFile(e.target.result);
				};
				//And now, read the image and base64
				reader.readAsDataURL(evt[0]);
			},
			triggerFile: function triggerFile() {
				$('.x-file--input').trigger('click');
			},
			sendMessage: function sendMessage(value) {
				var user = atob(this.get('session.session.content.authenticated.token').split('.')[1]);
				console.log(user);
				var message = {};
				message.msg = value;
				// Prevent markup from being injected into the message
				var clientUser = this.listData[this.listData.map(function (e) {
					return e.who;
				}).indexOf(this.get('selectedUser'))];

				message.email = user.email;
				message.room = clientUser.email;
				message.username = clientUser.who;

				//socket.emit('stop typing',message);
				var socket = this.get('socketIOService').socketFor('http://172.16.1.168:3001/');
				socket.emit('support message', message);
				$('.inputMessage').val('');
				clientUser.msgs.pushObject({
					msg: message.msg,
					type: false
				});
				$('.messages').animate({
					scrollTop: $('.messages').get(0).scrollHeight
				}, 100);
				//emit support message to selected user email
			},
			joinRoom: function joinRoom(item) {
				var user = JSON.parse(atob(this.get('session.session.content.authenticated.token').split('.')[1]));
				console.log(user);
				console.log(user.name);
				item.set('connected', true);

				var socket = this.get('socketIOService').socketFor('http://172.16.1.168:3001/');
				socket.emit('room', {
					room_name: item.email,
					email: user.email,
					username: user.name
				});

				// item.unseenMsgs = 0
				_ember['default'].set(item, 'unseenMsgs', 0);
				this.set('selectedUser', item.who);
				$('.messages').animate({
					scrollTop: $('.messages').get(0).scrollHeight
				}, 100);
			},
			testprotectedApi: function testprotectedApi() {
				var self = this;
				var user = this.store.createRecord('user', {
					name: 'asdfasdf',
					email: 'asdfasdf'

				});
			},
			socketTest: function socketTest() {
				var socket = io('http://172.16.1.168:3001');
				socket.emit('join support', {
					email: 'support@example.com'
				});
				//   socket.emit('addsupport' ,{})
				socket.on("new_msg", function (data) {
					addChatMessage(data);
				});
				socket.on('message received', function (data) {

					var a = $(".message").filter(function () {
						return $(this).text() === data.msg;
					});
					a.children('img').attr('src', 'images/ic_done_black_24px.svg');
				});
				socket.on("user message", function (data) {

					data.user = true;
					var $chatWindow = $(document.getElementById(data.userEmail));
					if ($chatWindow.length) {
						addChatMessage(data);
					} else {
						generateChatWindow(data);
					}
					socket.emit('userMsg received', data);
				});
				socket.on('new user', function (data) {
					socket.emit('room', {
						room_name: data.email
					});
				});
				socket.on('joined', function (data) {
					log('connected');
				});
				socket.on('updatechat', function (data1, data2) {
					log(data1);
					log(data2);
				});
				socket.on('support typing', function (data) {
					addChatTyping(data);
				});
				// Whenever the server emits 'stop typing', kill the typing message
				socket.on('stop typing', function (data) {
					removeChatTyping(data);
				});
			}
		}
	});
});
define('embtest/controllers/login', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    session: _ember['default'].inject.service('session'),
    authenticator: 'authenticator:custom',
    nameTouched: false,
    emailTouched: false,
    numberTouched: false,
    password1Touched: false,
    password2Touched: false,
    passServerErr: false,
    signup: false,
    notLoading: true,
    login: _ember['default'].computed.not('signup'),

    user: {
      name: '',
      email: '',
      number: '',
      password1: '',
      password2: ''
    },
    nameValidation: _ember['default'].computed('user.name', function () {

      var name = this.get('user.name');
      if (_ember['default'].isEmpty(name)) {
        return "This is required";
      } else {
        return "";
      }
    }),
    numberValidation: _ember['default'].computed('user.number', function () {
      var number = this.get('user.number');
      console.log(_ember['default'].isEmpty(number));
      console.log(!isNaN(number));
      if (_ember['default'].isEmpty(number)) {
        return "This is required";
      } else if (isNaN(number)) {
        return "Use numbers";
      } else {
        return "";
      }
    }),
    emailIsEmail: _ember['default'].computed.match('user.email', /^.+@.+\..+$/),
    passwordsMatchValidation: _ember['default'].computed('user.password1', 'user.password2', function () {
      if (this.get('user.password1') === this.get('user.password2')) {
        return "";
      } else {
        return "Passwords do not match";
      }
    }),
    passwordValidation: _ember['default'].computed('user.password1', 'passServerErr', function () {
      var pass1 = this.get('user.password1');
      if (pass1.length > 5) {
        if (this.get('passServerErr')) {
          return "Invalid password";
        } else {

          return "";
        }
      } else {
        return "Must be at least 5 characters";
      }
    }),
    emailValidation: _ember['default'].computed('user.email', function () {
      var email = this.get('user.email');
      if (email.match(/^.+@.+\..+$/)) {
        return "";
      } else {
        return "Please provide email in valid format";
      }
    }),
    actions: {
      validate: function validate() {
        //method called before register or submit
        var user = this.get('user');
        this.set('notLoading', false);

        this.toggleProperty('nameTouched');
        this.toggleProperty('emailTouched');
        this.toggleProperty('numberTouched');
        this.toggleProperty('password1Touched');
        this.toggleProperty('password2Touched');
      },
      clearForm: function clearForm() {
        //method called on toggling signup/login
        if (this.get('nameTouched')) {}
        this.set('user.name', '');
        this.set('user.email', '');
        this.set('user.number', '');
        this.set('user.password1', '');
        this.set('user.password2', '');
        if (this.get('nameTouched')) {
          this.toggleProperty('nameTouched');
        }
        if (this.get('emailTouched')) {
          this.toggleProperty('emailTouched');
        }
        if (this.get('numberTouched')) {
          this.toggleProperty('numberTouched');
        }
        if (this.get('password1Touched')) {
          this.toggleProperty('password1Touched');
        }
        if (this.get('password2Touched')) {
          this.toggleProperty('password2Touched');
        }
      },
      authenticate: function authenticate() {
        var _this = this;

        this.send('validate');
        var credentials = this.getProperties('user.name', 'user.password1');
        var self = this;
        this.get('session').authenticate('authenticator:custom', {
          name: self.get('user.name'),
          password: self.get('user.password1')
        })['catch'](function (message) {
          console.log('authentication failed');
          _this.set('passServerErr', true);
          _this.toggleProperty('password1Touched');
          _this.set('notLoading', true);
          //this.set('user.password1','');
          _this.set('errorMessage', message);
        });
      },
      togglesignup: function togglesignup() {

        this.toggleProperty('signup');
        this.send('clearForm');
      },
      registerUser: function registerUser() {
        this.send('validate');
        var self = this;
        var user = this.store.createRecord('user', {
          name: this.get('user.name'),
          email: this.get('user.email')
        });
        user.set('number', this.get('user.number'));
        user.set('password', this.get('user.password1'));
        user.save().then(function () {
          //this is basically what happens when you trigger the LoginControllerMixin's "authenticate" action
          self.get('session').authenticate('authenticator:custom', {
            name: self.get('user.name'),
            password: self.get('user.password1')
          })['catch'](function (message) {
            self.set('errorMessage', message);
          });
        });
      }
    }
  });
});
define('embtest/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('embtest/helpers/msg-length', ['exports', 'ember'], function (exports, _ember) {
	exports.msgLength = msgLength;

	function msgLength(params /*, hash*/) {
		console.log('params');
		console.log(params);
		return params[0].length;
	}

	exports['default'] = _ember['default'].Helper.helper(msgLength);
});
define('embtest/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('embtest/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('embtest/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'embtest/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _embtestConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_embtestConfigEnvironment['default'].APP.name, _embtestConfigEnvironment['default'].APP.version)
  };
});
define('embtest/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('embtest/initializers/ember-simple-auth', ['exports', 'ember', 'embtest/config/environment', 'ember-simple-auth/configuration', 'ember-simple-auth/initializers/setup-session', 'ember-simple-auth/initializers/setup-session-service'], function (exports, _ember, _embtestConfigEnvironment, _emberSimpleAuthConfiguration, _emberSimpleAuthInitializersSetupSession, _emberSimpleAuthInitializersSetupSessionService) {
  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(registry) {
      var config = _embtestConfigEnvironment['default']['ember-simple-auth'] || {};
      config.baseURL = _embtestConfigEnvironment['default'].baseURL;
      _emberSimpleAuthConfiguration['default'].load(config);

      (0, _emberSimpleAuthInitializersSetupSession['default'])(registry);
      (0, _emberSimpleAuthInitializersSetupSessionService['default'])(registry);
    }
  };
});
define('embtest/initializers/export-application-global', ['exports', 'ember', 'embtest/config/environment'], function (exports, _ember, _embtestConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_embtestConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _embtestConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_embtestConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('embtest/initializers/socket', ['exports'], function (exports) {
  exports.initialize = initialize;

  function initialize() /* application */{
    // application.inject('route', 'foo', 'service:foo');
  }

  exports['default'] = {
    name: 'socket',
    initialize: initialize
  };
});
define('embtest/instance-initializers/ember-simple-auth', ['exports', 'ember-simple-auth/instance-initializers/setup-session-restoration'], function (exports, _emberSimpleAuthInstanceInitializersSetupSessionRestoration) {
  exports['default'] = {
    name: 'ember-simple-auth',
    initialize: function initialize(instance) {
      (0, _emberSimpleAuthInstanceInitializersSetupSessionRestoration['default'])(instance);
    }
  };
});
define('embtest/mixins/transition-mixin', ['exports', 'ember-css-transitions/mixins/transition-mixin'], function (exports, _emberCssTransitionsMixinsTransitionMixin) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCssTransitionsMixinsTransitionMixin['default'];
    }
  });
});
define('embtest/models/user', ['exports', 'ember-data'], function (exports, _emberData) {
   exports['default'] = _emberData['default'].Model.extend({
      name: _emberData['default'].attr(),
      email: _emberData['default'].attr()
   });
});
define('embtest/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('embtest/router', ['exports', 'ember', 'embtest/config/environment'], function (exports, _ember, _embtestConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _embtestConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('login');
    this.route('profile');
    this.route('dashboard');
  });

  exports['default'] = Router;
});
define('embtest/routes/application', ['exports', 'ember', 'ember-simple-auth/mixins/application-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsApplicationRouteMixin) {
	exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsApplicationRouteMixin['default'], {

		actions: {
			invalidateSession: function invalidateSession() {
				this.get('session').invalidate();
			}
		}
	});
});
define('embtest/routes/dashboard', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
	exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {
		beforeModel: function beforeModel(transition) {
			var _this = this;

			this._super.apply(this, arguments);
			var token = this.get('session.session.content.authenticated.token');

			if (!_ember['default'].isEmpty(token)) {
				(function () {
					var userInfo = atob(token.split('.')[1]);
					var user_id = JSON.parse(userInfo).id;
					var self = _this;
					console.log(user_id);
					console.log('RESTORING SESSION');

					//parse user id from token
					//get user
					//set user as current user
					_this.store.findRecord('user', user_id, {
						reload: true
					})['catch'](function (reason) {
						console.log(reason);
						//If failed to authenticate token invalidate session
						//	self.get( 'session' );
						//		.invalidate()
						self.get('session').invalidate();
						if (reason.errors[0].status === '403') {
							// Do some specific error handling for 403
						} else {
								// At this point I want to call the default error handler
							}
					});
				})();
			} else {

					this.transitionTo('login');
				}
		}
	});
});
define('embtest/routes/login', ['exports', 'ember', 'ember-simple-auth/mixins/unauthenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsUnauthenticatedRouteMixin) {
  exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsUnauthenticatedRouteMixin['default'], {});
});
define('embtest/routes/profile', ['exports', 'ember', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _ember, _emberSimpleAuthMixinsAuthenticatedRouteMixin) {
	exports['default'] = _ember['default'].Route.extend(_emberSimpleAuthMixinsAuthenticatedRouteMixin['default'], {});
});
define('embtest/serializers/application', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].JSONAPISerializer.extend({
		primaryKey: '_id'
	});
});
define('embtest/serializers/user', ['exports', 'ember-data'], function (exports, _emberData) {
    exports['default'] = _emberData['default'].JSONAPISerializer.extend({
        primaryKey: '_id',
        serialize: function serialize(snapshot, options) {
            // var json = this._super(record, options);
            var json = this._super.apply(this, arguments);
            console.log(snapshot.record.password);
            json.meta = {
                typedPass: snapshot.record.password
            };
            // assuming niner isn't an attr on the model definition
            // just a value added to the model that I want to include in the meta data 
            /*var myrecord = record.record;
            console.log(record);
            json.meta = {
                typedPass: myrecord.get('password')
            };*/
            return json;
        }
    });
});
define('embtest/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('embtest/services/constants', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Service.extend({

    sniffer: _ember['default'].inject.service('sniffer'),

    webkit: _ember['default'].computed(function () {
      return (/webkit/i.test(this.get('sniffer.vendorPrefix'))
      );
    }),

    vendorProperty: function vendorProperty(name) {
      var prefix = this.get('sniffer.vendorPrefix').toLowerCase();
      return this.get('webkit') ? '-webkit-' + name.charAt(0) + name.substring(1) : name;
    },

    CSS: _ember['default'].computed('webkit', function () {
      var webkit = this.get('webkit');
      return {
        /* Constants */
        TRANSITIONEND: 'transitionend' + (webkit ? ' webkitTransitionEnd' : ''),
        ANIMATIONEND: 'animationend' + (webkit ? ' webkitAnimationEnd' : ''),

        TRANSFORM: this.vendorProperty('transform'),
        TRANSFORM_ORIGIN: this.vendorProperty('transformOrigin'),
        TRANSITION: this.vendorProperty('transition'),
        TRANSITION_DURATION: this.vendorProperty('transitionDuration'),
        ANIMATION_PLAY_STATE: this.vendorProperty('animationPlayState'),
        ANIMATION_DURATION: this.vendorProperty('animationDuration'),
        ANIMATION_NAME: this.vendorProperty('animationName'),
        ANIMATION_TIMING: this.vendorProperty('animationTimingFunction'),
        ANIMATION_DIRECTION: this.vendorProperty('animationDirection')
      };
    }),

    KEYCODE: _ember['default'].Object.create({
      ENTER: 13,
      ESCAPE: 27,
      SPACE: 32,
      LEFT_ARROW: 37,
      UP_ARROW: 38,
      RIGHT_ARROW: 39,
      DOWN_ARROW: 40,
      TAB: 9
    }),

    MEDIA: {
      'sm': '(max-width: 599px)',
      'gt-sm': '(min-width: 600px)',
      'md': '(min-width: 600px) and (max-width: 959px)',
      'gt-md': '(min-width: 960px)',
      'lg': '(min-width: 960px) and (max-width: 1199px)',
      'gt-lg': '(min-width: 1200px)'
    },
    MEDIA_PRIORITY: ['gt-lg', 'lg', 'gt-md', 'md', 'gt-sm', 'sm']
  });
});
define('embtest/services/primus', ['exports', 'ember', 'ember-websockets/helpers/primus-proxy'], function (exports, _ember, _emberWebsocketsHelpersPrimusProxy) {

  var forEach = Array.prototype.forEach;
  var filter = Array.prototype.filter;
  var isArray = _ember['default'].isArray;

  exports['default'] = _ember['default'].Service.extend({
    /*
    * Each element in the array is of the form:
    *
    * {
    *    url: 'string'
    *    socket: Primus Proxy object
    * }
    */
    sockets: null,

    init: function init() {
      this._super.apply(this, arguments);
      this.sockets = _ember['default'].A();
    },

    /*
    * socketFor returns a primus client proxy object. On this object there is a property `socket`
    * which contains the actual primus client object. This primus client object is cached based off of the url meaning
    * multiple requests for the same socket will return the same object.
    */
    socketFor: function socketFor(url) {
      var protocols = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

      var proxy = this.findSocketInCache(this.get('sockets'), url);

      if (proxy && this.primusIsNotClosed(proxy.socket)) {
        return proxy.socket;
      }

      if (!isArray(protocols)) {
        protocols = [protocols];
      }

      proxy = _emberWebsocketsHelpersPrimusProxy['default'].create({
        content: this,
        protocols: protocols,
        socket: Primus.connect(url, {
          reconnect: {
            max: Infinity,
            min: 500,
            retries: 10
          }
        })
      });

      // If there is an existing socket in place we simply update the primus client object and not
      // the whole proxy as we dont want to destroy the previous listeners.
      var existingSocket = this.findSocketInCache(this.get('sockets'), url);
      if (existingSocket) {
        existingSocket.socket.socket = proxy.socket;
        return existingSocket.socket;
      } else {
        this.get('sockets').pushObject({
          'url': url,
          socket: proxy
        });
      }

      return proxy;
    },

    /*
    * closeSocketFor closes the socket for a given url.
    */
    closeSocketFor: function closeSocketFor(url) {
      var _this = this;

      var filteredSockets = [];

      forEach.call(this.get('sockets'), function (item) {
        if (item.url === _this.normalizeURL(url)) {
          item.socket.close();
        } else {
          filteredSockets.push(item);
        }
      });
      this.set('sockets', _ember['default'].A(filteredSockets));
    },

    /*
    * The native websocket object will transform urls without a pathname to have just a /.
    * As an example: ws://localhost:8080 would actually be ws://localhost:8080/ but ws://example.com/foo would not
    * change. This function does this transformation to stay inline with the native websocket implementation.
    */
    normalizeURL: function normalizeURL(url) {
      var parsedUrl = new URI(url);

      if (parsedUrl.path() === '/' && url.slice(-1) !== '/') {
        return url + '/';
      }

      return url;
    },

    primusIsNotClosed: function primusIsNotClosed(websocket) {
      return true;
      //return websocket.socket.readyState !== window.WebSocket.CLOSED;
    },

    /*
    * Returns the socket object from the cache if one matches the url else undefined
    */
    findSocketInCache: function findSocketInCache(socketsCache, url) {
      var _this2 = this;

      var cachedResults = filter.call(socketsCache, function (websocket) {
        return websocket['url'] === _this2.normalizeURL(url);
      });

      if (cachedResults.length > 0) {
        return cachedResults[0];
      }
    }
  });
});
define('embtest/services/session', ['exports', 'ember-simple-auth/services/session'], function (exports, _emberSimpleAuthServicesSession) {
  exports['default'] = _emberSimpleAuthServicesSession['default'];
});
define('embtest/services/sniffer', ['exports', 'ember'], function (exports, _ember) {

  var isString = function isString(value) {
    return typeof value === 'string';
  };

  var lowercase = function lowercase(string) {
    return isString(string) ? string.toLowerCase() : string;
  };

  var toInt = function toInt(str) {
    return parseInt(str, 10);
  };

  exports['default'] = _ember['default'].Service.extend({
    vendorPrefix: '',
    transitions: false,
    animations: false,
    document: document,
    window: window,

    android: _ember['default'].computed('', function () {
      return toInt((/android (\d+)/.exec(lowercase((this.get('window').navigator || {}).userAgent)) || [])[1]);
    }),

    init: function init() {
      this._super.apply(this, arguments);

      var bodyStyle = this.get('document').body && this.get('document').body.style;
      var vendorPrefix;
      var vendorRegex = /^(Moz|webkit|ms)(?=[A-Z])/;

      var transitions = false;
      var animations = false;
      var match;

      if (bodyStyle) {
        for (var prop in bodyStyle) {
          if (match = vendorRegex.exec(prop)) {
            vendorPrefix = match[0];
            vendorPrefix = vendorPrefix.substr(0, 1).toUpperCase() + vendorPrefix.substr(1);
            break;
          }
        }

        if (!vendorPrefix) {
          vendorPrefix = 'WebkitOpacity' in bodyStyle && 'webkit';
        }

        transitions = !!('transition' in bodyStyle || vendorPrefix + 'Transition' in bodyStyle);
        animations = !!('animation' in bodyStyle || vendorPrefix + 'Animation' in bodyStyle);

        if (this.get('android') && (!transitions || !animations)) {
          transitions = isString(bodyStyle.webkitTransition);
          animations = isString(bodyStyle.webkitAnimation);
        }
      }

      this.set('transitions', transitions);
      this.set('animations', animations);

      this.set('vendorPrefix', vendorPrefix);
    }

  });
});
define('embtest/services/socket-io', ['exports', 'ember', 'ember-websockets/helpers/socketio-proxy'], function (exports, _ember, _emberWebsocketsHelpersSocketioProxy) {

  var filter = Array.prototype.filter;
  var forEach = Array.prototype.forEach;

  exports['default'] = _ember['default'].Service.extend({
    /*
    * Each element in the array is of the form:
    *
    * {
    *    url: 'string'
    *    socket: SocketIO Proxy object
    * }
    */
    sockets: null,

    init: function init() {
      this._super.apply(this, arguments);
      this.sockets = _ember['default'].A();
    },

    /*
    * socketFor returns a socketio proxy object. On this object there is a property `socket`
    * which contains the actual socketio object. This socketio object is cached based off of the
    * url meaning multiple requests for the same socket will return the same object.
    */
    socketFor: function socketFor(url) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var proxy = this.findSocketInCache(this.get('sockets'), url);

      if (proxy && this.socketIsNotClosed(proxy.socket)) {
        return proxy.socket;
      }

      proxy = _emberWebsocketsHelpersSocketioProxy['default'].create({
        content: this,
        socket: io(this.normalizeURL(url), options)
      });

      proxy.socket.connect();

      this.get('sockets').pushObject({
        url: this.normalizeURL(url),
        socket: proxy
      });

      return proxy;
    },

    /*
    * The native websocket object will transform urls without a pathname to have just a /.
    * As an example: ws://localhost:8080 would actually be ws://localhost:8080/ but ws://example.com/foo would not
    * change. This function does this transformation to stay inline with the native websocket implementation.
    *
    */
    normalizeURL: function normalizeURL(url) {
      var parsedUrl = new URI(url);

      if (parsedUrl.path() === '/' && url.slice(-1) !== '/') {
        return url + '/';
      }

      return url;
    },

    socketIsNotClosed: function socketIsNotClosed(socket) {
      return socket.socket.io.readyState !== 'closed';
    },

    /*
    * closeSocketFor closes the socket for a given url.
    */
    closeSocketFor: function closeSocketFor(url) {
      var _this = this;

      var filteredSockets = [];

      forEach.call(this.get('sockets'), function (item) {
        if (item.url === _this.normalizeURL(url)) {
          item.socket.close();
          item.socket.socket.removeAllListeners();
        } else {
          filteredSockets.push(item);
        }
      });

      this.set('sockets', _ember['default'].A(filteredSockets));
    },

    /*
    * Returns the socket object from the cache if one matches the url else undefined
    */
    findSocketInCache: function findSocketInCache(socketsCache, url) {
      var _this2 = this;

      var cachedResults = filter.call(socketsCache, function (websocket) {
        return websocket['url'] === _this2.normalizeURL(url);
      });

      if (cachedResults.length > 0) {
        return cachedResults[0];
      }
    }
  });
});
define('embtest/services/transition-events', ['exports', 'ember-css-transitions/services/transition-events'], function (exports, _emberCssTransitionsServicesTransitionEvents) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCssTransitionsServicesTransitionEvents['default'];
    }
  });
});
define('embtest/services/util', ['exports', 'ember'], function (exports, _ember) {

  /* global jQuery */

  var Util = _ember['default'].Service.extend({

    // Disables scroll around the passed element.
    disableScrollAround: function disableScrollAround(element) {
      var util = this,
          $document = jQuery(window.document);

      util.disableScrollAround._count = util.disableScrollAround._count || 0;
      ++util.disableScrollAround._count;
      if (util.disableScrollAround._enableScrolling) return util.disableScrollAround._enableScrolling;
      var body = $document[0].body,
          restoreBody = disableBodyScroll(),
          restoreElement = disableElementScroll();

      return util.disableScrollAround._enableScrolling = function () {
        if (! --util.disableScrollAround._count) {
          restoreBody();
          restoreElement();
          delete util.disableScrollAround._enableScrolling;
        }
      };

      // Creates a virtual scrolling mask to absorb touchmove, keyboard, scrollbar clicking, and wheel events
      function disableElementScroll() {
        var zIndex = 50;
        var scrollMask = jQuery('<div class="md-scroll-mask" style="z-index: ' + zIndex + '">' + '  <div class="md-scroll-mask-bar"></div>' + '</div>');
        body.appendChild(scrollMask[0]);

        scrollMask.on('wheel', preventDefault);
        scrollMask.on('touchmove', preventDefault);
        $document.on('keydown', disableKeyNav);

        return function restoreScroll() {
          scrollMask.off('wheel');
          scrollMask.off('touchmove');
          scrollMask[0].parentNode.removeChild(scrollMask[0]);
          $document.off('keydown', disableKeyNav);
          delete util.disableScrollAround._enableScrolling;
        };

        // Prevent keypresses from elements inside the body
        // used to stop the keypresses that could cause the page to scroll
        // (arrow keys, spacebar, tab, etc).
        function disableKeyNav(e) {
          //-- temporarily removed this logic, will possibly re-add at a later date
          return;
          if (!element[0].contains(e.target)) {
            e.preventDefault();
            e.stopImmediatePropagation();
          }
        }

        function preventDefault(e) {
          e.preventDefault();
        }
      }

      // Converts the body to a position fixed block and translate it to the proper scroll
      // position
      function disableBodyScroll() {
        var htmlNode = body.parentNode;
        var restoreHtmlStyle = htmlNode.getAttribute('style') || '';
        var restoreBodyStyle = body.getAttribute('style') || '';
        var scrollOffset = body.scrollTop + body.parentElement.scrollTop;
        var clientWidth = body.clientWidth;

        if (body.scrollHeight > body.clientHeight) {
          applyStyles(body, {
            position: 'fixed',
            width: '100%',
            top: -scrollOffset + 'px'
          });

          applyStyles(htmlNode, {
            overflowY: 'scroll'
          });
        }

        if (body.clientWidth < clientWidth) applyStyles(body, { overflow: 'hidden' });

        return function restoreScroll() {
          body.setAttribute('style', restoreBodyStyle);
          htmlNode.setAttribute('style', restoreHtmlStyle);
          body.scrollTop = scrollOffset;
        };
      }

      function applyStyles(el, styles) {
        for (var key in styles) {
          el.style[key] = styles[key];
        }
      }
    },
    enableScrolling: function enableScrolling() {
      var method = this.disableScrollAround._enableScrolling;
      method && method();
    },

    /**
     * supplant() method from Crockford's `Remedial Javascript`
     * Equivalent to use of $interpolate; without dependency on
     * interpolation symbols and scope. Note: the '{<token>}' can
     * be property names, property chains, or array indices.
     */
    supplant: function supplant(template, values, pattern) {
      pattern = pattern || /\{([^\{\}]*)\}/g;
      return template.replace(pattern, function (a, b) {
        var p = b.split('.'),
            r = values;
        try {
          for (var s in p) {
            if (p.hasOwnProperty(s)) {
              r = r[p[s]];
            }
          }
        } catch (e) {
          r = a;
        }
        return typeof r === 'string' || typeof r === 'number' ? r : a;
      });
    }
  });

  exports['default'] = Util;
});
define('embtest/services/validations', ['exports', 'ember'], function (exports, _ember) {

  var set = _ember['default'].set;

  exports['default'] = _ember['default'].Service.extend({
    init: function init() {
      set(this, 'cache', {});
    }
  });
});
define('embtest/services/websockets', ['exports', 'ember', 'ember-websockets/helpers/websocket-proxy'], function (exports, _ember, _emberWebsocketsHelpersWebsocketProxy) {

  var forEach = Array.prototype.forEach;
  var filter = Array.prototype.filter;
  var isArray = _ember['default'].isArray;

  exports['default'] = _ember['default'].Service.extend({
    /*
    * Each element in the array is of the form:
    *
    * {
    *    url: 'string'
    *    socket: WebSocket Proxy object
    * }
    */
    sockets: null,

    init: function init() {
      this._super.apply(this, arguments);
      this.sockets = _ember['default'].A();
    },

    /*
    * socketFor returns a websocket proxy object. On this object there is a property `socket`
    * which contains the actual websocket object. This websocket object is cached based off of the url meaning
    * multiple requests for the same socket will return the same object.
    */
    socketFor: function socketFor(url) {
      var protocols = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

      var proxy = this.findSocketInCache(this.get('sockets'), url);

      if (proxy && this.websocketIsNotClosed(proxy.socket)) {
        return proxy.socket;
      }

      // Websockets allows either a string or array of strings to be passed as the second argument.
      // This normalizes both cases into one where they are all arrays of strings and if you just pass
      // a single string it becomes an array of one.
      if (!isArray(protocols)) {
        protocols = [protocols];
      }

      proxy = _emberWebsocketsHelpersWebsocketProxy['default'].create({
        content: this,
        protocols: protocols,
        socket: new WebSocket(this.normalizeURL(url), protocols)
      });

      // If there is an existing socket in place we simply update the websocket object and not
      // the whole proxy as we dont want to destroy the previous listeners.
      var existingSocket = this.findSocketInCache(this.get('sockets'), url);
      if (existingSocket) {
        existingSocket.socket.socket = proxy.socket;
        return existingSocket.socket;
      } else {
        this.get('sockets').pushObject({
          url: proxy.socket.url,
          socket: proxy
        });
      }

      return proxy;
    },

    /*
    * closeSocketFor closes the socket for a given url.
    */
    closeSocketFor: function closeSocketFor(url) {
      var _this = this;

      var filteredSockets = [];

      forEach.call(this.get('sockets'), function (item) {
        if (item.url === _this.normalizeURL(url)) {
          item.socket.close();
        } else {
          filteredSockets.push(item);
        }
      });

      this.set('sockets', _ember['default'].A(filteredSockets));
    },

    /*
    * The native websocket object will transform urls without a pathname to have just a /.
    * As an example: ws://localhost:8080 would actually be ws://localhost:8080/ but ws://example.com/foo would not
    * change. This function does this transformation to stay inline with the native websocket implementation.
    */
    normalizeURL: function normalizeURL(url) {
      var parsedUrl = new URI(url);

      if (parsedUrl.path() === '/' && url.slice(-1) !== '/') {
        return url + '/';
      }

      return url;
    },

    websocketIsNotClosed: function websocketIsNotClosed(websocket) {
      return websocket.socket.readyState !== window.WebSocket.CLOSED;
    },

    /*
    * Returns the socket object from the cache if one matches the url else undefined
    */
    findSocketInCache: function findSocketInCache(socketsCache, url) {
      var _this2 = this;

      var cachedResults = filter.call(socketsCache, function (websocket) {
        return websocket['url'] === _this2.normalizeURL(url);
      });

      if (cachedResults.length > 0) {
        return cachedResults[0];
      }
    }
  });
});
define('embtest/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _emberSimpleAuthSessionStoresAdaptive) {
  exports['default'] = _emberSimpleAuthSessionStoresAdaptive['default'].extend();
});
define("embtest/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 3,
                  "column": 2
                },
                "end": {
                  "line": 5,
                  "column": 2
                }
              },
              "moduleName": "embtest/templates/application.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("		LOGOUT\n");
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
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 1
              },
              "end": {
                "line": 6,
                "column": 1
              }
            },
            "moduleName": "embtest/templates/application.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
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
          statements: [["block", "paper-button", [], ["class", "toolbar-options", "signup", false, "action", ["subexpr", "action", ["logout"], [], ["loc", [null, [3, 62], [3, 79]]]]], 0, null, ["loc", [null, [3, 2], [5, 19]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child1 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.3.0",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 8,
                    "column": 3
                  },
                  "end": {
                    "line": 10,
                    "column": 3
                  }
                },
                "moduleName": "embtest/templates/application.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("				LOGIN\n");
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
              "fragmentReason": false,
              "revision": "Ember@2.3.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 7,
                  "column": 2
                },
                "end": {
                  "line": 11,
                  "column": 2
                }
              },
              "moduleName": "embtest/templates/application.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
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
            statements: [["block", "link-to", ["login"], [], 0, null, ["loc", [null, [8, 3], [10, 15]]]]],
            locals: [],
            templates: [child0]
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 6,
                "column": 1
              },
              "end": {
                "line": 12,
                "column": 1
              }
            },
            "moduleName": "embtest/templates/application.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
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
          statements: [["block", "paper-button", [], ["class", "toolbar-options", "signup", false], 0, null, ["loc", [null, [7, 2], [11, 19]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type"]
          },
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 13,
              "column": 0
            }
          },
          "moduleName": "embtest/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
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
        statements: [["block", "if", [["get", "session.isAuthenticated", ["loc", [null, [2, 7], [2, 30]]]]], [], 0, 1, ["loc", [null, [2, 1], [12, 8]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 17,
            "column": 0
          }
        },
        "moduleName": "embtest/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "footer");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "paper-toolbar", [], ["class", "toolbar"], 0, null, ["loc", [null, [1, 0], [13, 18]]]], ["content", "outlet", ["loc", [null, [15, 0], [15, 10]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("embtest/templates/components/animated-if", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "embtest/templates/components/animated-if.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("embtest/templates/components/base-focusable", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "embtest/templates/components/base-focusable.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("embtest/templates/components/paper-autocomplete-highlight", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 13
          }
        },
        "moduleName": "embtest/templates/components/paper-autocomplete-highlight.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
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
      statements: [["content", "highlight", ["loc", [null, [1, 0], [1, 13]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("embtest/templates/components/paper-autocomplete-item", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 15
          }
        },
        "moduleName": "embtest/templates/components/paper-autocomplete-item.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
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
      statements: [["inline", "yield", [["get", "label", ["loc", [null, [1, 8], [1, 13]]]]], [], ["loc", [null, [1, 0], [1, 15]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("embtest/templates/components/paper-autocomplete", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 13,
              "column": 2
            }
          },
          "moduleName": "embtest/templates/components/paper-autocomplete.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "paper-input", [], ["type", "search", "label", ["subexpr", "@mut", [["get", "placeholder", ["loc", [null, [5, 12], [5, 23]]]]], [], []], "focus-in", "inputFocusIn", "focus-out", "inputFocusOut", "key-down", "inputKeyDown", "value", ["subexpr", "@mut", [["get", "searchText", ["loc", [null, [9, 12], [9, 22]]]]], [], []], "disabled", ["subexpr", "@mut", [["get", "disabled", ["loc", [null, [10, 15], [10, 23]]]]], [], []], "required", ["subexpr", "@mut", [["get", "required", ["loc", [null, [11, 15], [11, 23]]]]], [], []], "flex", true], ["loc", [null, [3, 4], [12, 17]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 30,
                  "column": 6
                },
                "end": {
                  "line": 32,
                  "column": 6
                }
              },
              "moduleName": "embtest/templates/components/paper-autocomplete.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("        ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              return morphs;
            },
            statements: [["inline", "paper-icon", [], ["icon", "close"], ["loc", [null, [31, 8], [31, 35]]]]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 29,
                "column": 4
              },
              "end": {
                "line": 33,
                "column": 4
              }
            },
            "moduleName": "embtest/templates/components/paper-autocomplete.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
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
          statements: [["block", "paper-button", [], ["icon-button", true, "themed", false, "action", "clear"], 0, null, ["loc", [null, [30, 6], [32, 23]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 13,
              "column": 2
            },
            "end": {
              "line": 35,
              "column": 2
            }
          },
          "moduleName": "embtest/templates/components/paper-autocomplete.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
          return morphs;
        },
        statements: [["inline", "input", [], ["type", "search", "flex", true, "placeholder", ["subexpr", "@mut", [["get", "placeholder", ["loc", [null, [16, 18], [16, 29]]]]], [], []], "value", ["subexpr", "@mut", [["get", "searchText", ["loc", [null, [17, 12], [17, 22]]]]], [], []], "focus-in", "inputFocusIn", "focus-out", "inputFocusOut", "key-down", "inputKeyDown", "autocomplete", "off", "disabled", ["subexpr", "@mut", [["get", "disabled", ["loc", [null, [22, 15], [22, 23]]]]], [], []], "required", ["subexpr", "@mut", [["get", "required", ["loc", [null, [23, 15], [23, 23]]]]], [], []], "aria-haspopup", true, "aria-autocomplete", "list", "aria-activedescendant", "", "aria-expanded", ["subexpr", "@mut", [["get", "notHidden", ["loc", [null, [27, 20], [27, 29]]]]], [], []]], ["loc", [null, [14, 4], [27, 31]]]], ["block", "if", [["get", "enableClearButton", ["loc", [null, [29, 10], [29, 27]]]]], [], 0, null, ["loc", [null, [29, 4], [33, 11]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 37,
              "column": 2
            },
            "end": {
              "line": 39,
              "column": 2
            }
          },
          "moduleName": "embtest/templates/components/paper-autocomplete.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "paper-progress-linear", ["loc", [null, [38, 4], [38, 29]]]]],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            var child0 = (function () {
              return {
                meta: {
                  "fragmentReason": false,
                  "revision": "Ember@2.3.0",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 48,
                      "column": 12
                    },
                    "end": {
                      "line": 50,
                      "column": 12
                    }
                  },
                  "moduleName": "embtest/templates/components/paper-autocomplete.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("              ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createComment("");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var morphs = new Array(1);
                  morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                  return morphs;
                },
                statements: [["inline", "yield", [["get", "searchText", ["loc", [null, [49, 22], [49, 32]]]], ["get", "item", ["loc", [null, [49, 33], [49, 37]]]], ["get", "index", ["loc", [null, [49, 38], [49, 43]]]]], [], ["loc", [null, [49, 14], [49, 45]]]]],
                locals: [],
                templates: []
              };
            })();
            var child1 = (function () {
              var child0 = (function () {
                return {
                  meta: {
                    "fragmentReason": false,
                    "revision": "Ember@2.3.0",
                    "loc": {
                      "source": null,
                      "start": {
                        "line": 51,
                        "column": 14
                      },
                      "end": {
                        "line": 53,
                        "column": 14
                      }
                    },
                    "moduleName": "embtest/templates/components/paper-autocomplete.hbs"
                  },
                  isEmpty: false,
                  arity: 0,
                  cachedFragment: null,
                  hasRendered: false,
                  buildFragment: function buildFragment(dom) {
                    var el0 = dom.createDocumentFragment();
                    var el1 = dom.createTextNode("                ");
                    dom.appendChild(el0, el1);
                    var el1 = dom.createComment("");
                    dom.appendChild(el0, el1);
                    var el1 = dom.createTextNode("\n");
                    dom.appendChild(el0, el1);
                    return el0;
                  },
                  buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                    var morphs = new Array(1);
                    morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                    return morphs;
                  },
                  statements: [["inline", "component", [["get", "itemComponent", ["loc", [null, [52, 28], [52, 41]]]]], ["searchText", ["subexpr", "@mut", [["get", "searchText", ["loc", [null, [52, 53], [52, 63]]]]], [], []], "label", ["subexpr", "@mut", [["get", "label", ["loc", [null, [52, 70], [52, 75]]]]], [], []], "index", ["subexpr", "@mut", [["get", "index", ["loc", [null, [52, 82], [52, 87]]]]], [], []]], ["loc", [null, [52, 16], [52, 89]]]]],
                  locals: [],
                  templates: []
                };
              })();
              var child1 = (function () {
                return {
                  meta: {
                    "fragmentReason": false,
                    "revision": "Ember@2.3.0",
                    "loc": {
                      "source": null,
                      "start": {
                        "line": 53,
                        "column": 14
                      },
                      "end": {
                        "line": 55,
                        "column": 14
                      }
                    },
                    "moduleName": "embtest/templates/components/paper-autocomplete.hbs"
                  },
                  isEmpty: false,
                  arity: 0,
                  cachedFragment: null,
                  hasRendered: false,
                  buildFragment: function buildFragment(dom) {
                    var el0 = dom.createDocumentFragment();
                    var el1 = dom.createTextNode("                ");
                    dom.appendChild(el0, el1);
                    var el1 = dom.createComment("");
                    dom.appendChild(el0, el1);
                    var el1 = dom.createTextNode("\n");
                    dom.appendChild(el0, el1);
                    return el0;
                  },
                  buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                    var morphs = new Array(1);
                    morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                    return morphs;
                  },
                  statements: [["inline", "paper-autocomplete-highlight", [], ["searchText", ["subexpr", "@mut", [["get", "searchText", ["loc", [null, [54, 58], [54, 68]]]]], [], []], "label", ["subexpr", "@mut", [["get", "label", ["loc", [null, [54, 75], [54, 80]]]]], [], []]], ["loc", [null, [54, 16], [54, 82]]]]],
                  locals: [],
                  templates: []
                };
              })();
              return {
                meta: {
                  "fragmentReason": false,
                  "revision": "Ember@2.3.0",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 50,
                      "column": 12
                    },
                    "end": {
                      "line": 56,
                      "column": 12
                    }
                  },
                  "moduleName": "embtest/templates/components/paper-autocomplete.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createComment("");
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
                statements: [["block", "if", [["get", "itemComponent", ["loc", [null, [51, 20], [51, 33]]]]], [], 0, 1, ["loc", [null, [51, 14], [55, 21]]]]],
                locals: [],
                templates: [child0, child1]
              };
            })();
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.3.0",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 46,
                    "column": 10
                  },
                  "end": {
                    "line": 57,
                    "column": 10
                  }
                },
                "moduleName": "embtest/templates/components/paper-autocomplete.hbs"
              },
              isEmpty: false,
              arity: 1,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createComment("");
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
              statements: [["block", "if", [["get", "hasBlock", ["loc", [null, [48, 18], [48, 26]]]]], [], 0, 1, ["loc", [null, [48, 12], [56, 19]]]]],
              locals: ["label"],
              templates: [child0, child1]
            };
          })();
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 44,
                  "column": 8
                },
                "end": {
                  "line": 59,
                  "column": 8
                }
              },
              "moduleName": "embtest/templates/components/paper-autocomplete.hbs"
            },
            isEmpty: false,
            arity: 2,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              return morphs;
            },
            statements: [["block", "paper-autocomplete-item", [], ["lookupKey", ["subexpr", "@mut", [["get", "lookupKey", ["loc", [null, [46, 47], [46, 56]]]]], [], []], "item", ["subexpr", "@mut", [["get", "item", ["loc", [null, [46, 62], [46, 66]]]]], [], []], "selectedIndex", ["subexpr", "@mut", [["get", "selectedIndex", ["loc", [null, [46, 81], [46, 94]]]]], [], []], "index", ["subexpr", "@mut", [["get", "index", ["loc", [null, [46, 101], [46, 106]]]]], [], []], "pick", "pickModel"], 0, null, ["loc", [null, [46, 10], [57, 38]]]]],
            locals: ["item", "index"],
            templates: [child0]
          };
        })();
        var child1 = (function () {
          var child0 = (function () {
            var child0 = (function () {
              return {
                meta: {
                  "fragmentReason": false,
                  "revision": "Ember@2.3.0",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 62,
                      "column": 12
                    },
                    "end": {
                      "line": 64,
                      "column": 12
                    }
                  },
                  "moduleName": "embtest/templates/components/paper-autocomplete.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("                ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("li");
                  var el2 = dom.createComment("");
                  dom.appendChild(el1, el2);
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var morphs = new Array(1);
                  morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
                  return morphs;
                },
                statements: [["inline", "yield", [["get", "searchText", ["loc", [null, [63, 28], [63, 38]]]]], ["to", "inverse"], ["loc", [null, [63, 20], [63, 53]]]]],
                locals: [],
                templates: []
              };
            })();
            var child1 = (function () {
              var child0 = (function () {
                return {
                  meta: {
                    "fragmentReason": false,
                    "revision": "Ember@2.3.0",
                    "loc": {
                      "source": null,
                      "start": {
                        "line": 65,
                        "column": 14
                      },
                      "end": {
                        "line": 67,
                        "column": 14
                      }
                    },
                    "moduleName": "embtest/templates/components/paper-autocomplete.hbs"
                  },
                  isEmpty: false,
                  arity: 0,
                  cachedFragment: null,
                  hasRendered: false,
                  buildFragment: function buildFragment(dom) {
                    var el0 = dom.createDocumentFragment();
                    var el1 = dom.createTextNode("                  ");
                    dom.appendChild(el0, el1);
                    var el1 = dom.createElement("li");
                    var el2 = dom.createComment("");
                    dom.appendChild(el1, el2);
                    dom.appendChild(el0, el1);
                    var el1 = dom.createTextNode("\n");
                    dom.appendChild(el0, el1);
                    return el0;
                  },
                  buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                    var morphs = new Array(1);
                    morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
                    return morphs;
                  },
                  statements: [["inline", "component", [["get", "notFoundComponent", ["loc", [null, [66, 34], [66, 51]]]]], ["searchText", ["subexpr", "@mut", [["get", "searchText", ["loc", [null, [66, 63], [66, 73]]]]], [], []]], ["loc", [null, [66, 22], [66, 75]]]]],
                  locals: [],
                  templates: []
                };
              })();
              var child1 = (function () {
                return {
                  meta: {
                    "fragmentReason": false,
                    "revision": "Ember@2.3.0",
                    "loc": {
                      "source": null,
                      "start": {
                        "line": 67,
                        "column": 14
                      },
                      "end": {
                        "line": 69,
                        "column": 14
                      }
                    },
                    "moduleName": "embtest/templates/components/paper-autocomplete.hbs"
                  },
                  isEmpty: false,
                  arity: 0,
                  cachedFragment: null,
                  hasRendered: false,
                  buildFragment: function buildFragment(dom) {
                    var el0 = dom.createDocumentFragment();
                    var el1 = dom.createTextNode("                  ");
                    dom.appendChild(el0, el1);
                    var el1 = dom.createElement("li");
                    var el2 = dom.createComment("");
                    dom.appendChild(el1, el2);
                    dom.appendChild(el0, el1);
                    var el1 = dom.createTextNode("\n");
                    dom.appendChild(el0, el1);
                    return el0;
                  },
                  buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                    var morphs = new Array(1);
                    morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
                    return morphs;
                  },
                  statements: [["content", "notFoundMsg", ["loc", [null, [68, 22], [68, 37]]]]],
                  locals: [],
                  templates: []
                };
              })();
              return {
                meta: {
                  "fragmentReason": false,
                  "revision": "Ember@2.3.0",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 64,
                      "column": 12
                    },
                    "end": {
                      "line": 70,
                      "column": 12
                    }
                  },
                  "moduleName": "embtest/templates/components/paper-autocomplete.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createComment("");
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
                statements: [["block", "if", [["get", "notFoundComponent", ["loc", [null, [65, 20], [65, 37]]]]], [], 0, 1, ["loc", [null, [65, 14], [69, 21]]]]],
                locals: [],
                templates: [child0, child1]
              };
            })();
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.3.0",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 60,
                    "column": 10
                  },
                  "end": {
                    "line": 71,
                    "column": 10
                  }
                },
                "moduleName": "embtest/templates/components/paper-autocomplete.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createComment("");
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
              statements: [["block", "if", [["get", "hasBlock", ["loc", [null, [62, 18], [62, 26]]]]], [], 0, 1, ["loc", [null, [62, 12], [70, 19]]]]],
              locals: [],
              templates: [child0, child1]
            };
          })();
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 59,
                  "column": 8
                },
                "end": {
                  "line": 72,
                  "column": 8
                }
              },
              "moduleName": "embtest/templates/components/paper-autocomplete.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
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
            statements: [["block", "if", [["get", "showLoadingBar", ["loc", [null, [60, 16], [60, 30]]]]], [], 0, null, ["loc", [null, [60, 10], [71, 17]]]]],
            locals: [],
            templates: [child0]
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 42,
                "column": 4
              },
              "end": {
                "line": 73,
                "column": 4
              }
            },
            "moduleName": "embtest/templates/components/paper-autocomplete.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "each", [["get", "suggestions", ["loc", [null, [44, 16], [44, 27]]]]], [], 0, 1, ["loc", [null, [44, 8], [72, 17]]]]],
          locals: [],
          templates: [child0, child1]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 41,
              "column": 2
            },
            "end": {
              "line": 74,
              "column": 2
            }
          },
          "moduleName": "embtest/templates/components/paper-autocomplete.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
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
        statements: [["block", "paper-autocomplete-list", [], ["suggestions", ["subexpr", "@mut", [["get", "suggestions", ["loc", [null, [42, 43], [42, 54]]]]], [], []], "selectedIndex", ["subexpr", "@mut", [["get", "selectedIndex", ["loc", [null, [42, 69], [42, 82]]]]], [], []], "wrapToElementId", ["subexpr", "@mut", [["get", "autocompleteWrapperId", ["loc", [null, [42, 99], [42, 120]]]]], [], []], "mouse-up", "listMouseUp", "mouse-leave", "listMouseLeave", "mouse-enter", "listMouseEnter"], 0, null, ["loc", [null, [42, 4], [73, 32]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child4 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 79,
                "column": 4
              },
              "end": {
                "line": 81,
                "column": 4
              }
            },
            "moduleName": "embtest/templates/components/paper-autocomplete.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("p");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["content", "message", ["loc", [null, [80, 11], [80, 22]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 78,
              "column": 2
            },
            "end": {
              "line": 82,
              "column": 2
            }
          },
          "moduleName": "embtest/templates/components/paper-autocomplete.hbs"
        },
        isEmpty: false,
        arity: 2,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
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
        statements: [["block", "if", [["get", "message", ["loc", [null, [79, 10], [79, 17]]]]], [], 0, null, ["loc", [null, [79, 4], [81, 11]]]]],
        locals: ["message", "index"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 84,
            "column": 0
          }
        },
        "moduleName": "embtest/templates/components/paper-autocomplete.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("md-autocomplete-wrap");
        dom.setAttribute(el1, "role", "listbox");
        dom.setAttribute(el1, "layout", "row");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("aria-status");
        dom.setAttribute(el1, "class", "md-visually-hidden");
        dom.setAttribute(el1, "role", "status");
        dom.setAttribute(el1, "aria-live", "assertive");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(6);
        morphs[0] = dom.createAttrMorph(element0, 'id');
        morphs[1] = dom.createAttrMorph(element0, 'class');
        morphs[2] = dom.createMorphAt(element0, 1, 1);
        morphs[3] = dom.createMorphAt(element0, 3, 3);
        morphs[4] = dom.createMorphAt(element0, 5, 5);
        morphs[5] = dom.createMorphAt(dom.childAt(fragment, [2]), 1, 1);
        return morphs;
      },
      statements: [["attribute", "id", ["get", "autocompleteWrapperId", ["loc", [null, [1, 27], [1, 48]]]]], ["attribute", "class", ["concat", [["subexpr", "if", [["get", "notFloating", ["loc", [null, [1, 91], [1, 102]]]], "md-whiteframe-z1"], [], ["loc", [null, [1, 86], [1, 123]]]], " ", ["subexpr", "if", [["get", "notHidden", ["loc", [null, [1, 129], [1, 138]]]], "md-menu-showing"], [], ["loc", [null, [1, 124], [1, 158]]]]]]], ["block", "if", [["get", "floating", ["loc", [null, [2, 8], [2, 16]]]]], [], 0, 1, ["loc", [null, [2, 2], [35, 9]]]], ["block", "if", [["get", "loading", ["loc", [null, [37, 8], [37, 15]]]]], [], 2, null, ["loc", [null, [37, 2], [39, 9]]]], ["block", "if", [["get", "notHidden", ["loc", [null, [41, 8], [41, 17]]]]], [], 3, null, ["loc", [null, [41, 2], [74, 9]]]], ["block", "each", [["get", "messages", ["loc", [null, [78, 10], [78, 18]]]]], [], 4, null, ["loc", [null, [78, 2], [82, 11]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4]
    };
  })());
});
define("embtest/templates/components/paper-button", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 4,
                "column": 2
              }
            },
            "moduleName": "embtest/templates/components/paper-button.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["content", "yield", ["loc", [null, [3, 4], [3, 13]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 4,
                "column": 2
              },
              "end": {
                "line": 6,
                "column": 2
              }
            },
            "moduleName": "embtest/templates/components/paper-button.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["content", "label", ["loc", [null, [5, 4], [5, 13]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type"]
          },
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 7,
              "column": 0
            }
          },
          "moduleName": "embtest/templates/components/paper-button.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
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
        statements: [["block", "if", [["get", "hasBlock", ["loc", [null, [2, 8], [2, 16]]]]], [], 0, 1, ["loc", [null, [2, 2], [6, 9]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 9,
                "column": 4
              },
              "end": {
                "line": 11,
                "column": 4
              }
            },
            "moduleName": "embtest/templates/components/paper-button.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["content", "yield", ["loc", [null, [10, 6], [10, 15]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 11,
                "column": 4
              },
              "end": {
                "line": 13,
                "column": 4
              }
            },
            "moduleName": "embtest/templates/components/paper-button.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("      ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["content", "label", ["loc", [null, [12, 6], [12, 15]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 0
            },
            "end": {
              "line": 15,
              "column": 0
            }
          },
          "moduleName": "embtest/templates/components/paper-button.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("span");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createAttrMorph(element0, 'type');
          morphs[1] = dom.createAttrMorph(element0, 'disabled');
          morphs[2] = dom.createMorphAt(element0, 1, 1);
          return morphs;
        },
        statements: [["attribute", "type", ["get", "type", ["loc", [null, [8, 15], [8, 19]]]]], ["attribute", "disabled", ["get", "disabled", ["loc", [null, [8, 33], [8, 41]]]]], ["block", "if", [["get", "hasBlock", ["loc", [null, [9, 10], [9, 18]]]]], [], 0, 1, ["loc", [null, [9, 4], [13, 11]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 15,
            "column": 7
          }
        },
        "moduleName": "embtest/templates/components/paper-button.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
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
      statements: [["block", "if", [["get", "noSpan", ["loc", [null, [1, 6], [1, 12]]]]], [], 0, 1, ["loc", [null, [1, 0], [15, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("embtest/templates/components/paper-checkbox", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 0
            },
            "end": {
              "line": 10,
              "column": 0
            }
          },
          "moduleName": "embtest/templates/components/paper-checkbox.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "md-label");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("span");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1]), 1, 1);
          return morphs;
        },
        statements: [["content", "yield", ["loc", [null, [7, 6], [7, 15]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 0
            },
            "end": {
              "line": 16,
              "column": 0
            }
          },
          "moduleName": "embtest/templates/components/paper-checkbox.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "md-label");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("span");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1]), 1, 1);
          return morphs;
        },
        statements: [["content", "label", ["loc", [null, [13, 6], [13, 15]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 17,
            "column": 0
          }
        },
        "moduleName": "embtest/templates/components/paper-checkbox.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "md-container");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "md-icon");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "hasBlock", ["loc", [null, [4, 6], [4, 14]]]]], [], 0, 1, ["loc", [null, [4, 0], [16, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("embtest/templates/components/paper-grid-list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "embtest/templates/components/paper-grid-list.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("embtest/templates/components/paper-grid-tile-footer", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "embtest/templates/components/paper-grid-tile-footer.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("figcaption");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  \n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [2, 2], [2, 11]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("embtest/templates/components/paper-grid-tile", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": false,
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "embtest/templates/components/paper-grid-tile.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("figure");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [2, 2], [2, 11]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("embtest/templates/components/paper-input", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "embtest/templates/components/paper-input.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("label");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element1, 'for');
          morphs[1] = dom.createMorphAt(element1, 0, 0);
          return morphs;
        },
        statements: [["attribute", "for", ["get", "inputElementId", ["loc", [null, [2, 17], [2, 31]]]]], ["content", "label", ["loc", [null, [2, 34], [2, 43]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 0
            },
            "end": {
              "line": 7,
              "column": 0
            }
          },
          "moduleName": "embtest/templates/components/paper-input.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "paper-icon", [], ["icon", ["subexpr", "@mut", [["get", "icon", ["loc", [null, [6, 20], [6, 24]]]]], [], []], "class", ["subexpr", "@mut", [["get", "icon-class", ["loc", [null, [6, 31], [6, 41]]]]], [], []]], ["loc", [null, [6, 2], [6, 43]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 0
            },
            "end": {
              "line": 26,
              "column": 0
            }
          },
          "moduleName": "embtest/templates/components/paper-input.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "textarea", [], ["class", "md-input", "id", ["subexpr", "@mut", [["get", "inputElementId", ["loc", [null, [10, 33], [10, 47]]]]], [], []], "placeholder", ["subexpr", "@mut", [["get", "placeholder", ["loc", [null, [10, 60], [10, 71]]]]], [], []], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [10, 78], [10, 83]]]]], [], []], "focus-in", "focusIn", "key-down", "keyDown", "focus-out", "focusOut", "disabled", ["subexpr", "@mut", [["get", "disabled", ["loc", [null, [10, 152], [10, 160]]]]], [], []], "required", ["subexpr", "@mut", [["get", "required", ["loc", [null, [10, 170], [10, 178]]]]], [], []], "autofocus", ["subexpr", "@mut", [["get", "autofocus", ["loc", [null, [10, 189], [10, 198]]]]], [], []], "name", ["subexpr", "@mut", [["get", "attr-name", ["loc", [null, [11, 11], [11, 20]]]]], [], []], "rows", ["subexpr", "@mut", [["get", "attr-rows", ["loc", [null, [12, 11], [12, 20]]]]], [], []], "cols", ["subexpr", "@mut", [["get", "attr-cols", ["loc", [null, [13, 11], [13, 20]]]]], [], []], "maxlength", ["subexpr", "@mut", [["get", "attr-maxlength", ["loc", [null, [14, 16], [14, 30]]]]], [], []], "tabindex", ["subexpr", "@mut", [["get", "attr-tabindex", ["loc", [null, [15, 15], [15, 28]]]]], [], []], "selectionEnd", ["subexpr", "@mut", [["get", "attr-selectionEnd", ["loc", [null, [16, 19], [16, 36]]]]], [], []], "selectionStart", ["subexpr", "@mut", [["get", "attr-selectionStart", ["loc", [null, [17, 21], [17, 40]]]]], [], []], "selectionDirection", ["subexpr", "@mut", [["get", "attr-selectionDirection", ["loc", [null, [18, 25], [18, 48]]]]], [], []], "wrap", ["subexpr", "@mut", [["get", "attr-wrap", ["loc", [null, [19, 11], [19, 20]]]]], [], []], "readonly", ["subexpr", "@mut", [["get", "attr-readonly", ["loc", [null, [20, 15], [20, 28]]]]], [], []], "form", ["subexpr", "@mut", [["get", "attr-form", ["loc", [null, [21, 11], [21, 20]]]]], [], []], "spellcheck", ["subexpr", "@mut", [["get", "attr-spellcheck", ["loc", [null, [22, 17], [22, 32]]]]], [], []], "enter", ["subexpr", "@mut", [["get", "event-enter", ["loc", [null, [24, 12], [24, 23]]]]], [], []]], ["loc", [null, [10, 2], [25, 4]]]]],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 26,
              "column": 0
            },
            "end": {
              "line": 55,
              "column": 0
            }
          },
          "moduleName": "embtest/templates/components/paper-input.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "input", [], ["class", "md-input", "id", ["subexpr", "@mut", [["get", "inputElementId", ["loc", [null, [27, 30], [27, 44]]]]], [], []], "placeholder", ["subexpr", "@mut", [["get", "placeholder", ["loc", [null, [27, 57], [27, 68]]]]], [], []], "type", ["subexpr", "@mut", [["get", "type", ["loc", [null, [27, 74], [27, 78]]]]], [], []], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [27, 85], [27, 90]]]]], [], []], "focus-in", "focusIn", "key-down", "keyDown", "focus-out", "focusOut", "disabled", ["subexpr", "@mut", [["get", "disabled", ["loc", [null, [27, 159], [27, 167]]]]], [], []], "required", ["subexpr", "@mut", [["get", "required", ["loc", [null, [27, 177], [27, 185]]]]], [], []], "autofocus", ["subexpr", "@mut", [["get", "autofocus", ["loc", [null, [27, 196], [27, 205]]]]], [], []], "accept", ["subexpr", "@mut", [["get", "attr-accept", ["loc", [null, [28, 13], [28, 24]]]]], [], []], "autocomplete", ["subexpr", "@mut", [["get", "attr-autocomplete", ["loc", [null, [29, 19], [29, 36]]]]], [], []], "autosave", ["subexpr", "@mut", [["get", "attr-autosave", ["loc", [null, [30, 15], [30, 28]]]]], [], []], "form", ["subexpr", "@mut", [["get", "attr-form", ["loc", [null, [31, 11], [31, 20]]]]], [], []], "formaction", ["subexpr", "@mut", [["get", "attr-formaction", ["loc", [null, [32, 17], [32, 32]]]]], [], []], "formenctype", ["subexpr", "@mut", [["get", "attr-formenctype", ["loc", [null, [33, 18], [33, 34]]]]], [], []], "formmethod", ["subexpr", "@mut", [["get", "attr-formmethod", ["loc", [null, [34, 17], [34, 32]]]]], [], []], "formnovalidate", ["subexpr", "@mut", [["get", "attr-formnovalidate", ["loc", [null, [35, 21], [35, 40]]]]], [], []], "formtarget", ["subexpr", "@mut", [["get", "attr-formtarget", ["loc", [null, [36, 17], [36, 32]]]]], [], []], "height", ["subexpr", "@mut", [["get", "attr-height", ["loc", [null, [37, 13], [37, 24]]]]], [], []], "inputmode", ["subexpr", "@mut", [["get", "attr-inputmode", ["loc", [null, [38, 16], [38, 30]]]]], [], []], "min", ["subexpr", "@mut", [["get", "attr-min", ["loc", [null, [39, 10], [39, 18]]]]], [], []], "maxlength", ["subexpr", "@mut", [["get", "attr-maxlength", ["loc", [null, [40, 16], [40, 30]]]]], [], []], "max", ["subexpr", "@mut", [["get", "attr-max", ["loc", [null, [41, 10], [41, 18]]]]], [], []], "multiple", ["subexpr", "@mut", [["get", "attr-multiple", ["loc", [null, [42, 15], [42, 28]]]]], [], []], "name", ["subexpr", "@mut", [["get", "attr-name", ["loc", [null, [43, 11], [43, 20]]]]], [], []], "pattern", ["subexpr", "@mut", [["get", "attr-pattern", ["loc", [null, [44, 14], [44, 26]]]]], [], []], "readonly", ["subexpr", "@mut", [["get", "attr-readonly", ["loc", [null, [45, 15], [45, 28]]]]], [], []], "selectionDirection", ["subexpr", "@mut", [["get", "attr-selectionDirection", ["loc", [null, [46, 25], [46, 48]]]]], [], []], "size", ["subexpr", "@mut", [["get", "attr-size", ["loc", [null, [47, 11], [47, 20]]]]], [], []], "spellcheck", ["subexpr", "@mut", [["get", "attr-spellcheck", ["loc", [null, [48, 17], [48, 32]]]]], [], []], "step", ["subexpr", "@mut", [["get", "attr-step", ["loc", [null, [49, 11], [49, 20]]]]], [], []], "tabindex", ["subexpr", "@mut", [["get", "attr-tabindex", ["loc", [null, [50, 15], [50, 28]]]]], [], []], "width", ["subexpr", "@mut", [["get", "attr-width", ["loc", [null, [51, 12], [51, 22]]]]], [], []], "enter", ["subexpr", "@mut", [["get", "event-enter", ["loc", [null, [53, 12], [53, 23]]]]], [], []]], ["loc", [null, [27, 2], [54, 4]]]]],
        locals: [],
        templates: []
      };
    })();
    var child4 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 57,
              "column": 0
            },
            "end": {
              "line": 61,
              "column": 0
            }
          },
          "moduleName": "embtest/templates/components/paper-input.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "ng-messages", "");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1, 1]);
          var morphs = new Array(4);
          morphs[0] = dom.createAttrMorph(element0, 'id');
          morphs[1] = dom.createAttrMorph(element0, 'ng-message');
          morphs[2] = dom.createAttrMorph(element0, 'class');
          morphs[3] = dom.createMorphAt(element0, 0, 0);
          return morphs;
        },
        statements: [["attribute", "id", ["concat", ["error-", ["get", "inputElementId", ["loc", [null, [59, 21], [59, 35]]]]]]], ["attribute", "ng-message", ["concat", [["get", "ng-message", ["loc", [null, [59, 53], [59, 63]]]]]]], ["attribute", "class", ["concat", [["subexpr", "if", [["get", "isInvalid", ["loc", [null, [59, 79], [59, 88]]]], "ng-enter ng-enter-active", "ng-leave ng-leave-active"], [], ["loc", [null, [59, 74], [59, 144]]]]]]], ["content", "errortext", ["loc", [null, [59, 146], [59, 159]]]]],
        locals: [],
        templates: []
      };
    })();
    var child5 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 63,
              "column": 0
            },
            "end": {
              "line": 65,
              "column": 0
            }
          },
          "moduleName": "embtest/templates/components/paper-input.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "md-char-counter");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          return morphs;
        },
        statements: [["content", "renderCharCount", ["loc", [null, [64, 33], [64, 52]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 66,
            "column": 0
          }
        },
        "moduleName": "embtest/templates/components/paper-input.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        morphs[4] = dom.createMorphAt(fragment, 8, 8, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "label", ["loc", [null, [1, 6], [1, 11]]]]], [], 0, null, ["loc", [null, [1, 0], [3, 7]]]], ["block", "if", [["get", "icon", ["loc", [null, [5, 6], [5, 10]]]]], [], 1, null, ["loc", [null, [5, 0], [7, 7]]]], ["block", "if", [["get", "textarea", ["loc", [null, [9, 6], [9, 14]]]]], [], 2, 3, ["loc", [null, [9, 0], [55, 7]]]], ["block", "unless", [["get", "hideAllMessages", ["loc", [null, [57, 10], [57, 25]]]]], [], 4, null, ["loc", [null, [57, 0], [61, 11]]]], ["block", "if", [["get", "maxlength", ["loc", [null, [63, 6], [63, 15]]]]], [], 5, null, ["loc", [null, [63, 0], [65, 7]]]]],
      locals: [],
      templates: [child0, child1, child2, child3, child4, child5]
    };
  })());
});
define("embtest/templates/components/paper-item", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 6,
                "column": 2
              }
            },
            "moduleName": "embtest/templates/components/paper-item.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "md-list-item-inner");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
            return morphs;
          },
          statements: [["content", "yield", ["loc", [null, [4, 6], [4, 15]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type"]
          },
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 7,
              "column": 0
            }
          },
          "moduleName": "embtest/templates/components/paper-item.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
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
        statements: [["block", "paper-button", [], ["class", "md-no-style", "noink", true, "action", "buttonAction", "skipProxy", true], 0, null, ["loc", [null, [2, 2], [6, 19]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 0
            },
            "end": {
              "line": 11,
              "column": 0
            }
          },
          "moduleName": "embtest/templates/components/paper-item.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "md-no-style md-list-item-inner");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createElementMorph(element0);
          morphs[1] = dom.createMorphAt(element0, 1, 1);
          return morphs;
        },
        statements: [["element", "action", ["buttonAction"], ["on", "click"], ["loc", [null, [8, 46], [8, 82]]]], ["content", "yield", ["loc", [null, [9, 4], [9, 13]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 12,
            "column": 0
          }
        },
        "moduleName": "embtest/templates/components/paper-item.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
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
      statements: [["block", "if", [["get", "action", ["loc", [null, [1, 6], [1, 12]]]]], [], 0, 1, ["loc", [null, [1, 0], [11, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("embtest/templates/components/paper-menu-container", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 35
          }
        },
        "moduleName": "embtest/templates/components/paper-menu-container.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "yield", [["get", "this", ["loc", [null, [1, 8], [1, 12]]]]], [], ["loc", [null, [1, 0], [1, 14]]]], ["inline", "paper-backdrop", [], ["tap", "toggleMenu"], ["loc", [null, [2, 0], [2, 35]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("embtest/templates/components/paper-menu-content-pane", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 14
          }
        },
        "moduleName": "embtest/templates/components/paper-menu-content-pane.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
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
      statements: [["inline", "yield", [["get", "this", ["loc", [null, [1, 8], [1, 12]]]]], [], ["loc", [null, [1, 0], [1, 14]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("embtest/templates/components/paper-menu-content", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type"]
          },
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "embtest/templates/components/paper-menu-content.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "yield", [["get", "this", ["loc", [null, [2, 10], [2, 14]]]]], [], ["loc", [null, [2, 2], [2, 16]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 0
            }
          },
          "moduleName": "embtest/templates/components/paper-menu-content.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "paper-backdrop", [], ["tap", "toggleMenu"], ["loc", [null, [5, 2], [5, 38]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 19
          }
        },
        "moduleName": "embtest/templates/components/paper-menu-content.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "paper-menu-content-pane", [], ["width", ["subexpr", "@mut", [["get", "width", ["loc", [null, [1, 33], [1, 38]]]]], [], []]], 0, null, ["loc", [null, [1, 0], [3, 28]]]], ["block", "ember-wormhole", [], ["to", "paper-wormhole"], 1, null, ["loc", [null, [4, 0], [6, 19]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("embtest/templates/components/paper-menu-item", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 4,
                "column": 2
              }
            },
            "moduleName": "embtest/templates/components/paper-menu-item.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["content", "yield", ["loc", [null, [3, 4], [3, 13]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type"]
          },
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 5,
              "column": 0
            }
          },
          "moduleName": "embtest/templates/components/paper-menu-item.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
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
        statements: [["block", "paper-button", [], ["no-span", true, "action", "action", "disabled", ["subexpr", "@mut", [["get", "disabled", ["loc", [null, [2, 56], [2, 64]]]]], [], []]], 0, null, ["loc", [null, [2, 2], [4, 19]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 0
            },
            "end": {
              "line": 7,
              "column": 0
            }
          },
          "moduleName": "embtest/templates/components/paper-menu-item.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "yield", ["loc", [null, [6, 2], [6, 11]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 0
          }
        },
        "moduleName": "embtest/templates/components/paper-menu-item.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
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
      statements: [["block", "if", [["get", "action", ["loc", [null, [1, 6], [1, 12]]]]], [], 0, 1, ["loc", [null, [1, 0], [7, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("embtest/templates/components/paper-menu", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 3,
                "column": 2
              },
              "end": {
                "line": 5,
                "column": 2
              }
            },
            "moduleName": "embtest/templates/components/paper-menu.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "yield", [], ["to", "inverse"], ["loc", [null, [4, 4], [4, 26]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 0
            }
          },
          "moduleName": "embtest/templates/components/paper-menu.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
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
        statements: [["block", "paper-menu-content", [], ["width", ["subexpr", "@mut", [["get", "width", ["loc", [null, [3, 30], [3, 35]]]]], [], []]], 0, null, ["loc", [null, [3, 2], [5, 25]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 7
          }
        },
        "moduleName": "embtest/templates/components/paper-menu.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "yield", [["get", "this", ["loc", [null, [1, 8], [1, 12]]]]], [], ["loc", [null, [1, 0], [1, 14]]]], ["block", "if", [["get", "isOpen", ["loc", [null, [2, 6], [2, 12]]]]], [], 0, null, ["loc", [null, [2, 0], [6, 7]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("embtest/templates/components/paper-nav-container", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 14
          }
        },
        "moduleName": "embtest/templates/components/paper-nav-container.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
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
      statements: [["inline", "yield", [["get", "this", ["loc", [null, [1, 8], [1, 12]]]]], [], ["loc", [null, [1, 0], [1, 14]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("embtest/templates/components/paper-optgroup", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 9
          }
        },
        "moduleName": "embtest/templates/components/paper-optgroup.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("label");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 0, 0);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "label", ["loc", [null, [1, 7], [1, 16]]]], ["content", "yield", ["loc", [null, [2, 0], [2, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("embtest/templates/components/paper-option", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 36
          }
        },
        "moduleName": "embtest/templates/components/paper-option.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "md-text");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 0, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 21], [1, 30]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("embtest/templates/components/paper-progress-circular", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 11,
            "column": 6
          }
        },
        "moduleName": "embtest/templates/components/paper-progress-circular.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "md-inner ");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "md-gap");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "md-left");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "md-half-circle");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "md-right");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "md-half-circle");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [3, 1]);
        var element3 = dom.childAt(element1, [5, 1]);
        var morphs = new Array(3);
        morphs[0] = dom.createAttrMorph(element0, 'class');
        morphs[1] = dom.createAttrMorph(element2, 'style');
        morphs[2] = dom.createAttrMorph(element3, 'style');
        return morphs;
      },
      statements: [["attribute", "class", ["concat", ["md-spinner-wrapper ", ["get", "spinnerClass", ["loc", [null, [1, 33], [1, 45]]]]]]], ["attribute", "style", ["get", "leftStyle", ["loc", [null, [5, 48], [5, 57]]]]], ["attribute", "style", ["get", "rightStyle", ["loc", [null, [8, 48], [8, 58]]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("embtest/templates/components/paper-progress-linear", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "embtest/templates/components/paper-progress-linear.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "md-container md-ready");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "md-dashed");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "md-bar md-bar1");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "md-bar md-bar2");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [3]);
        var element2 = dom.childAt(element0, [5]);
        var morphs = new Array(2);
        morphs[0] = dom.createAttrMorph(element1, 'style');
        morphs[1] = dom.createAttrMorph(element2, 'style');
        return morphs;
      },
      statements: [["attribute", "style", ["get", "bar1Style", ["loc", [null, [3, 40], [3, 49]]]]], ["attribute", "style", ["get", "bar2Style", ["loc", [null, [4, 40], [4, 49]]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("embtest/templates/components/paper-radio", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 0
            },
            "end": {
              "line": 9,
              "column": 0
            }
          },
          "moduleName": "embtest/templates/components/paper-radio.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "md-label");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["content", "yield", ["loc", [null, [7, 4], [7, 13]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 0
            },
            "end": {
              "line": 13,
              "column": 0
            }
          },
          "moduleName": "embtest/templates/components/paper-radio.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "md-label");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["content", "label", ["loc", [null, [11, 4], [11, 13]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 14,
            "column": 0
          }
        },
        "moduleName": "embtest/templates/components/paper-radio.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "md-container");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "md-off");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "md-on");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "hasBlock", ["loc", [null, [5, 6], [5, 14]]]]], [], 0, 1, ["loc", [null, [5, 0], [13, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("embtest/templates/components/paper-select-container", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 4,
              "column": 0
            }
          },
          "moduleName": "embtest/templates/components/paper-select-container.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "paper-backdrop", [], ["tap", "toggleMenu"], ["loc", [null, [3, 2], [3, 38]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 19
          }
        },
        "moduleName": "embtest/templates/components/paper-select-container.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "yield", [["get", "this", ["loc", [null, [1, 8], [1, 12]]]]], [], ["loc", [null, [1, 0], [1, 14]]]], ["block", "ember-wormhole", [], ["to", "paper-wormhole"], 0, null, ["loc", [null, [2, 0], [4, 19]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("embtest/templates/components/paper-select-core", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            var child0 = (function () {
              return {
                meta: {
                  "fragmentReason": false,
                  "revision": "Ember@2.3.0",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 6,
                      "column": 8
                    },
                    "end": {
                      "line": 8,
                      "column": 8
                    }
                  },
                  "moduleName": "embtest/templates/components/paper-select-core.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("div");
                  var el2 = dom.createComment("");
                  dom.appendChild(el1, el2);
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var morphs = new Array(1);
                  morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
                  return morphs;
                },
                statements: [["content", "paper-progress-circular", ["loc", [null, [7, 15], [7, 42]]]]],
                locals: [],
                templates: []
              };
            })();
            var child1 = (function () {
              return {
                meta: {
                  "fragmentReason": false,
                  "revision": "Ember@2.3.0",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 8,
                      "column": 8
                    },
                    "end": {
                      "line": 10,
                      "column": 8
                    }
                  },
                  "moduleName": "embtest/templates/components/paper-select-core.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("          ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createComment("");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var morphs = new Array(1);
                  morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                  return morphs;
                },
                statements: [["inline", "yield", [["get", "items", ["loc", [null, [9, 18], [9, 23]]]]], [], ["loc", [null, [9, 10], [9, 25]]]]],
                locals: [],
                templates: []
              };
            })();
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.3.0",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 5,
                    "column": 6
                  },
                  "end": {
                    "line": 11,
                    "column": 6
                  }
                },
                "moduleName": "embtest/templates/components/paper-select-core.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createComment("");
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
              statements: [["block", "if", [["get", "isLoading", ["loc", [null, [6, 14], [6, 23]]]]], [], 0, 1, ["loc", [null, [6, 8], [10, 15]]]]],
              locals: [],
              templates: [child0, child1]
            };
          })();
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 4,
                  "column": 4
                },
                "end": {
                  "line": 12,
                  "column": 4
                }
              },
              "moduleName": "embtest/templates/components/paper-select-core.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
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
            statements: [["block", "paper-content", [], ["class", "md-default-theme"], 0, null, ["loc", [null, [5, 6], [11, 24]]]]],
            locals: [],
            templates: [child0]
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 3,
                "column": 2
              },
              "end": {
                "line": 13,
                "column": 2
              }
            },
            "moduleName": "embtest/templates/components/paper-select-core.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
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
          statements: [["block", "paper-select-menu", [], [], 0, null, ["loc", [null, [4, 4], [12, 26]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 14,
              "column": 0
            }
          },
          "moduleName": "embtest/templates/components/paper-select-core.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
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
        statements: [["block", "paper-select-container", [], [], 0, null, ["loc", [null, [3, 2], [13, 29]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 14,
            "column": 7
          }
        },
        "moduleName": "embtest/templates/components/paper-select-core.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "paper-select-value", [], ["placeholder", ["subexpr", "@mut", [["get", "placeholder", ["loc", [null, [1, 33], [1, 44]]]]], [], []], "value", ["subexpr", "@mut", [["get", "label", ["loc", [null, [1, 51], [1, 56]]]]], [], []]], ["loc", [null, [1, 0], [1, 58]]]], ["block", "if", [["get", "isOpen", ["loc", [null, [2, 6], [2, 12]]]]], [], 0, null, ["loc", [null, [2, 0], [14, 7]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("embtest/templates/components/paper-select-value", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 55
          }
        },
        "moduleName": "embtest/templates/components/paper-select-value.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("span");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("span");
        dom.setAttribute(el1, "class", "md-select-icon");
        dom.setAttribute(el1, "aria-hidden", "true");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 0, 0);
        return morphs;
      },
      statements: [["content", "label", ["loc", [null, [1, 6], [1, 15]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("embtest/templates/components/paper-select", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "embtest/templates/components/paper-select.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("label");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          morphs[1] = dom.createAttrMorph(element0, 'for');
          morphs[2] = dom.createMorphAt(element0, 0, 0);
          return morphs;
        },
        statements: [["attribute", "class", ["subexpr", "if", [["get", "model", ["loc", [null, [2, 20], [2, 25]]]], "md-static", "md-placeholder"], [], ["loc", [null, [2, 15], [2, 56]]]]], ["attribute", "for", ["get", "inputElementId", ["loc", [null, [2, 63], [2, 77]]]]], ["content", "label", ["loc", [null, [2, 80], [2, 89]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 0
            },
            "end": {
              "line": 7,
              "column": 0
            }
          },
          "moduleName": "embtest/templates/components/paper-select.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "paper-icon", [], ["icon", ["subexpr", "@mut", [["get", "icon", ["loc", [null, [6, 20], [6, 24]]]]], [], []], "class", ["subexpr", "@mut", [["get", "icon-class", ["loc", [null, [6, 31], [6, 41]]]]], [], []]], ["loc", [null, [6, 2], [6, 43]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 0
            },
            "end": {
              "line": 11,
              "column": 0
            }
          },
          "moduleName": "embtest/templates/components/paper-select.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "yield", [["get", "items", ["loc", [null, [10, 10], [10, 15]]]]], [], ["loc", [null, [10, 2], [10, 17]]]]],
        locals: ["items"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 12,
            "column": 0
          }
        },
        "moduleName": "embtest/templates/components/paper-select.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "label", ["loc", [null, [1, 6], [1, 11]]]]], [], 0, null, ["loc", [null, [1, 0], [3, 7]]]], ["block", "if", [["get", "icon", ["loc", [null, [5, 6], [5, 10]]]]], [], 1, null, ["loc", [null, [5, 0], [7, 7]]]], ["block", "paper-select-core", [], ["placeholder", ["subexpr", "@mut", [["get", "placeholder", ["loc", [null, [9, 33], [9, 44]]]]], [], []], "model", ["subexpr", "@mut", [["get", "model", ["loc", [null, [9, 51], [9, 56]]]]], [], []], "disabled", ["subexpr", "@mut", [["get", "disabled", ["loc", [null, [9, 66], [9, 74]]]]], [], []], "on-open", ["subexpr", "@mut", [["get", "onOpen", ["loc", [null, [9, 83], [9, 89]]]]], [], []], "item-label-callback", ["subexpr", "@mut", [["get", "itemLabelCallback", ["loc", [null, [9, 110], [9, 127]]]]], [], []]], 2, null, ["loc", [null, [9, 0], [11, 22]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("embtest/templates/components/paper-sidenav-toggle", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 14
          }
        },
        "moduleName": "embtest/templates/components/paper-sidenav-toggle.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
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
      statements: [["inline", "yield", [["get", "this", ["loc", [null, [1, 8], [1, 12]]]]], [], ["loc", [null, [1, 0], [1, 14]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("embtest/templates/components/paper-sidenav", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 3,
                "column": 2
              },
              "end": {
                "line": 5,
                "column": 2
              }
            },
            "moduleName": "embtest/templates/components/paper-sidenav.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "paper-backdrop", [], ["locked-open", ["subexpr", "@mut", [["get", "isLockedOpen", ["loc", [null, [4, 33], [4, 45]]]]], [], []], "opaque", true, "class", "md-sidenav-backdrop", "tap", "toggleMenu"], ["loc", [null, [4, 4], [4, 104]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 0
            }
          },
          "moduleName": "embtest/templates/components/paper-sidenav.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
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
        statements: [["block", "ember-wormhole", [], ["to", "paper-wormhole"], 0, null, ["loc", [null, [3, 2], [5, 21]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 11
          }
        },
        "moduleName": "embtest/templates/components/paper-sidenav.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]], ["block", "unless", [["get", "closed", ["loc", [null, [2, 10], [2, 16]]]]], [], 0, null, ["loc", [null, [2, 0], [6, 11]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("embtest/templates/components/paper-slider", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 17,
            "column": 0
          }
        },
        "moduleName": "embtest/templates/components/paper-slider.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "md-slider-wrapper");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "md-track-container");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "md-track");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "md-track md-track-fill");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "md-track-ticks");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "md-thumb-container");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "md-thumb");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "md-focus-thumb");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "md-focus-ring");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "md-sign");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4, "class", "md-thumb-text");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "md-disabled-thumb");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1, 3]);
        var element2 = dom.childAt(element0, [3]);
        var morphs = new Array(3);
        morphs[0] = dom.createAttrMorph(element1, 'style');
        morphs[1] = dom.createAttrMorph(element2, 'style');
        morphs[2] = dom.createMorphAt(dom.childAt(element2, [7, 1]), 0, 0);
        return morphs;
      },
      statements: [["attribute", "style", ["get", "activeTrackStyle", ["loc", [null, [4, 52], [4, 68]]]]], ["attribute", "style", ["get", "thumbContainerStyle", ["loc", [null, [7, 44], [7, 63]]]]], ["content", "value", ["loc", [null, [12, 40], [12, 49]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("embtest/templates/components/paper-subheader", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 6
          }
        },
        "moduleName": "embtest/templates/components/paper-subheader.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "md-subheader-inner");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("span");
        dom.setAttribute(el2, "class", "md-subheader-content");
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 1]), 1, 1);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [3, 6], [3, 15]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("embtest/templates/components/paper-switch", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 9,
              "column": 0
            },
            "end": {
              "line": 13,
              "column": 0
            }
          },
          "moduleName": "embtest/templates/components/paper-switch.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "md-label");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["content", "yield", ["loc", [null, [11, 4], [11, 13]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 13,
              "column": 0
            },
            "end": {
              "line": 17,
              "column": 0
            }
          },
          "moduleName": "embtest/templates/components/paper-switch.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "md-label");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["content", "label", ["loc", [null, [15, 4], [15, 13]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 18,
            "column": 0
          }
        },
        "moduleName": "embtest/templates/components/paper-switch.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "md-switch-bar");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "md-container");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "md-bar");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "md-thumb-container");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "md-thumb");
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "hasBlock", ["loc", [null, [9, 6], [9, 14]]]]], [], 0, 1, ["loc", [null, [9, 0], [17, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("embtest/templates/components/transition-group", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "embtest/templates/components/transition-group.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("embtest/templates/dashboard", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 330,
              "column": 0
            },
            "end": {
              "line": 330,
              "column": 130
            }
          },
          "moduleName": "embtest/templates/dashboard.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("test protected api");
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
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 331,
              "column": 0
            },
            "end": {
              "line": 331,
              "column": 128
            }
          },
          "moduleName": "embtest/templates/dashboard.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("test socket connection");
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
    var child2 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            var child0 = (function () {
              return {
                meta: {
                  "fragmentReason": false,
                  "revision": "Ember@2.3.0",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 350,
                      "column": 22
                    },
                    "end": {
                      "line": 352,
                      "column": 22
                    }
                  },
                  "moduleName": "embtest/templates/dashboard.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("                        ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("img");
                  dom.setAttribute(el1, "class", "chatImage");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var element2 = dom.childAt(fragment, [1]);
                  var morphs = new Array(1);
                  morphs[0] = dom.createAttrMorph(element2, 'src');
                  return morphs;
                },
                statements: [["attribute", "src", ["get", "msg.msg", ["loc", [null, [351, 36], [351, 43]]]]]],
                locals: [],
                templates: []
              };
            })();
            var child1 = (function () {
              return {
                meta: {
                  "fragmentReason": false,
                  "revision": "Ember@2.3.0",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 352,
                      "column": 22
                    },
                    "end": {
                      "line": 356,
                      "column": 22
                    }
                  },
                  "moduleName": "embtest/templates/dashboard.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("                        ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("span");
                  dom.setAttribute(el1, "class", "messageBody");
                  var el2 = dom.createTextNode("\n										");
                  dom.appendChild(el1, el2);
                  var el2 = dom.createComment("");
                  dom.appendChild(el1, el2);
                  var el2 = dom.createTextNode("\n									");
                  dom.appendChild(el1, el2);
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var morphs = new Array(1);
                  morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
                  return morphs;
                },
                statements: [["content", "msg.msg", ["loc", [null, [354, 10], [354, 21]]]]],
                locals: [],
                templates: []
              };
            })();
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.3.0",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 347,
                    "column": 16
                  },
                  "end": {
                    "line": 359,
                    "column": 16
                  }
                },
                "moduleName": "embtest/templates/dashboard.hbs"
              },
              isEmpty: false,
              arity: 1,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("                  ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("li");
                var el2 = dom.createTextNode("\n                    ");
                dom.appendChild(el1, el2);
                var el2 = dom.createElement("div");
                var el3 = dom.createTextNode("\n");
                dom.appendChild(el2, el3);
                var el3 = dom.createComment("");
                dom.appendChild(el2, el3);
                var el3 = dom.createTextNode("                    ");
                dom.appendChild(el2, el3);
                dom.appendChild(el1, el2);
                var el2 = dom.createTextNode("\n                  ");
                dom.appendChild(el1, el2);
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var element3 = dom.childAt(fragment, [1]);
                var element4 = dom.childAt(element3, [1]);
                var morphs = new Array(3);
                morphs[0] = dom.createAttrMorph(element3, 'class');
                morphs[1] = dom.createAttrMorph(element4, 'class');
                morphs[2] = dom.createMorphAt(element4, 1, 1);
                return morphs;
              },
              statements: [["attribute", "class", ["concat", ["messageLi\t", ["subexpr", "if", [["get", "msg.type", ["loc", [null, [348, 44], [348, 52]]]], "lileft", ""], [], ["loc", [null, [348, 39], [348, 66]]]]]]], ["attribute", "class", ["concat", ["rightbubble message\t", ["subexpr", "if", [["get", "msg.type", ["loc", [null, [349, 57], [349, 65]]]], "leftbubble", ""], [], ["loc", [null, [349, 52], [349, 83]]]], " ", ["subexpr", "if", [["get", "msg.image", ["loc", [null, [349, 89], [349, 98]]]], "imagebubble", ""], [], ["loc", [null, [349, 84], [349, 117]]]]]]], ["block", "if", [["get", "msg.image", ["loc", [null, [350, 28], [350, 37]]]]], [], 0, 1, ["loc", [null, [350, 22], [356, 29]]]]],
              locals: ["msg"],
              templates: [child0, child1]
            };
          })();
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 346,
                  "column": 14
                },
                "end": {
                  "line": 360,
                  "column": 14
                }
              },
              "moduleName": "embtest/templates/dashboard.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
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
            statements: [["block", "each", [["get", "selectedMessages", ["loc", [null, [347, 24], [347, 40]]]]], [], 0, null, ["loc", [null, [347, 16], [359, 25]]]]],
            locals: [],
            templates: [child0]
          };
        })();
        var child1 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 360,
                  "column": 14
                },
                "end": {
                  "line": 366,
                  "column": 14
                }
              },
              "moduleName": "embtest/templates/dashboard.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("                ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("li");
              dom.setAttribute(el1, "class", "log");
              dom.setAttribute(el1, "style", "display: list-item;");
              var el2 = dom.createTextNode("\n                  ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("span");
              dom.setAttribute(el2, "class", "logText");
              var el3 = dom.createTextNode("\n							No Messages\n						");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n                ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
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
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 340,
                "column": 12
              },
              "end": {
                "line": 367,
                "column": 12
              }
            },
            "moduleName": "embtest/templates/dashboard.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("              ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            dom.setAttribute(el1, "class", "log");
            dom.setAttribute(el1, "style", "display: list-item;");
            var el2 = dom.createTextNode("\n                ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("span");
            dom.setAttribute(el2, "class", "logText");
            var el3 = dom.createTextNode("\n							Connected\n						");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n              ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 3, 3, contextualElement);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "if", [["get", "selectedMessages", ["loc", [null, [346, 20], [346, 36]]]]], [], 0, 1, ["loc", [null, [346, 14], [366, 21]]]]],
          locals: [],
          templates: [child0, child1]
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 367,
                "column": 12
              },
              "end": {
                "line": 373,
                "column": 12
              }
            },
            "moduleName": "embtest/templates/dashboard.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("              ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("li");
            dom.setAttribute(el1, "class", "log");
            dom.setAttribute(el1, "style", "display: list-item;");
            var el2 = dom.createTextNode("\n                ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("span");
            dom.setAttribute(el2, "class", "logText");
            var el3 = dom.createTextNode("\n							Not connected\n						");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n              ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
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
      var child2 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 376,
                "column": 8
              },
              "end": {
                "line": 385,
                "column": 8
              }
            },
            "moduleName": "embtest/templates/dashboard.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "inputbubble");
            var el2 = dom.createTextNode("\n            ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n          ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n\n          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "fileDiv");
            var el2 = dom.createTextNode("\n            ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("img");
            dom.setAttribute(el2, "src", "/images/ic_attachment_black_24dp_2x.png");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n          ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element1 = dom.childAt(fragment, [5]);
            var morphs = new Array(3);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
            morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
            morphs[2] = dom.createElementMorph(element1);
            return morphs;
          },
          statements: [["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "firstName", ["loc", [null, [378, 26], [378, 35]]]]], [], []], "class", "inputMessage", "placeholder", "Type a message", "enter", "sendMessage"], ["loc", [null, [378, 12], [378, 107]]]], ["inline", "x-file-input", [], ["name", "files", "multiple", false, "action", ["subexpr", "action", ["imageBuffer"], [], ["loc", [null, [381, 60], [381, 82]]]], "alt", "Choose a File"], ["loc", [null, [381, 10], [381, 104]]]], ["element", "action", ["triggerFile"], [], ["loc", [null, [382, 31], [382, 55]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 335,
              "column": 2
            },
            "end": {
              "line": 388,
              "column": 2
            }
          },
          "moduleName": "embtest/templates/dashboard.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("ul");
          dom.setAttribute(el1, "class", "pages");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("li");
          dom.setAttribute(el2, "class", "chat page");
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "chatArea");
          var el4 = dom.createTextNode("\n          ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("ul");
          dom.setAttribute(el4, "class", "messages");
          var el5 = dom.createTextNode("\n");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("          ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element5 = dom.childAt(fragment, [1, 1]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(dom.childAt(element5, [1, 1]), 1, 1);
          morphs[1] = dom.createMorphAt(element5, 3, 3);
          return morphs;
        },
        statements: [["block", "if", [["get", "selectedUser", ["loc", [null, [340, 18], [340, 30]]]]], [], 0, 1, ["loc", [null, [340, 12], [373, 19]]]], ["block", "if", [["get", "selectedUser", ["loc", [null, [376, 14], [376, 26]]]]], [], 2, null, ["loc", [null, [376, 8], [385, 15]]]]],
        locals: [],
        templates: [child0, child1, child2]
      };
    })();
    var child3 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            var child0 = (function () {
              var child0 = (function () {
                var child0 = (function () {
                  return {
                    meta: {
                      "fragmentReason": false,
                      "revision": "Ember@2.3.0",
                      "loc": {
                        "source": null,
                        "start": {
                          "line": 404,
                          "column": 14
                        },
                        "end": {
                          "line": 408,
                          "column": 16
                        }
                      },
                      "moduleName": "embtest/templates/dashboard.hbs"
                    },
                    isEmpty: false,
                    arity: 0,
                    cachedFragment: null,
                    hasRendered: false,
                    buildFragment: function buildFragment(dom) {
                      var el0 = dom.createDocumentFragment();
                      var el1 = dom.createTextNode("                ");
                      dom.appendChild(el0, el1);
                      var el1 = dom.createElement("div");
                      dom.setAttribute(el1, "class", "countDiv");
                      var el2 = dom.createTextNode("\n                  ");
                      dom.appendChild(el1, el2);
                      var el2 = dom.createComment("");
                      dom.appendChild(el1, el2);
                      var el2 = dom.createTextNode("\n                ");
                      dom.appendChild(el1, el2);
                      dom.appendChild(el0, el1);
                      var el1 = dom.createTextNode("\n");
                      dom.appendChild(el0, el1);
                      return el0;
                    },
                    buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                      var morphs = new Array(1);
                      morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
                      return morphs;
                    },
                    statements: [["content", "item.unseenMsgs", ["loc", [null, [406, 18], [406, 37]]]]],
                    locals: [],
                    templates: []
                  };
                })();
                var child1 = (function () {
                  return {
                    meta: {
                      "fragmentReason": false,
                      "revision": "Ember@2.3.0",
                      "loc": {
                        "source": null,
                        "start": {
                          "line": 408,
                          "column": 16
                        },
                        "end": {
                          "line": 411,
                          "column": 14
                        }
                      },
                      "moduleName": "embtest/templates/dashboard.hbs"
                    },
                    isEmpty: false,
                    arity: 0,
                    cachedFragment: null,
                    hasRendered: false,
                    buildFragment: function buildFragment(dom) {
                      var el0 = dom.createDocumentFragment();
                      var el1 = dom.createTextNode("                ");
                      dom.appendChild(el0, el1);
                      var el1 = dom.createElement("div");
                      dom.setAttribute(el1, "class", "connected");
                      var el2 = dom.createTextNode("\n                ");
                      dom.appendChild(el1, el2);
                      dom.appendChild(el0, el1);
                      var el1 = dom.createTextNode("\n");
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
                    "fragmentReason": false,
                    "revision": "Ember@2.3.0",
                    "loc": {
                      "source": null,
                      "start": {
                        "line": 402,
                        "column": 12
                      },
                      "end": {
                        "line": 412,
                        "column": 12
                      }
                    },
                    "moduleName": "embtest/templates/dashboard.hbs"
                  },
                  isEmpty: false,
                  arity: 0,
                  cachedFragment: null,
                  hasRendered: false,
                  buildFragment: function buildFragment(dom) {
                    var el0 = dom.createDocumentFragment();
                    var el1 = dom.createTextNode("\n");
                    dom.appendChild(el0, el1);
                    var el1 = dom.createComment("");
                    dom.appendChild(el0, el1);
                    return el0;
                  },
                  buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                    var morphs = new Array(1);
                    morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                    dom.insertBoundary(fragment, null);
                    return morphs;
                  },
                  statements: [["block", "if", [["get", "item.unseenMsgs", ["loc", [null, [404, 20], [404, 35]]]]], [], 0, 1, ["loc", [null, [404, 14], [411, 21]]]]],
                  locals: [],
                  templates: [child0, child1]
                };
              })();
              var child1 = (function () {
                return {
                  meta: {
                    "fragmentReason": false,
                    "revision": "Ember@2.3.0",
                    "loc": {
                      "source": null,
                      "start": {
                        "line": 412,
                        "column": 12
                      },
                      "end": {
                        "line": 415,
                        "column": 12
                      }
                    },
                    "moduleName": "embtest/templates/dashboard.hbs"
                  },
                  isEmpty: false,
                  arity: 0,
                  cachedFragment: null,
                  hasRendered: false,
                  buildFragment: function buildFragment(dom) {
                    var el0 = dom.createDocumentFragment();
                    var el1 = dom.createTextNode("              ");
                    dom.appendChild(el0, el1);
                    var el1 = dom.createElement("div");
                    dom.setAttribute(el1, "class", "not-connected");
                    var el2 = dom.createTextNode("\n              ");
                    dom.appendChild(el1, el2);
                    dom.appendChild(el0, el1);
                    var el1 = dom.createTextNode("\n");
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
                  "fragmentReason": false,
                  "revision": "Ember@2.3.0",
                  "loc": {
                    "source": null,
                    "start": {
                      "line": 393,
                      "column": 10
                    },
                    "end": {
                      "line": 416,
                      "column": 10
                    }
                  },
                  "moduleName": "embtest/templates/dashboard.hbs"
                },
                isEmpty: false,
                arity: 0,
                cachedFragment: null,
                hasRendered: false,
                buildFragment: function buildFragment(dom) {
                  var el0 = dom.createDocumentFragment();
                  var el1 = dom.createTextNode("            ");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createElement("div");
                  dom.setAttribute(el1, "class", "md-list-item-text");
                  var el2 = dom.createTextNode("\n              ");
                  dom.appendChild(el1, el2);
                  var el2 = dom.createElement("h3");
                  var el3 = dom.createTextNode("\n						");
                  dom.appendChild(el2, el3);
                  var el3 = dom.createComment("");
                  dom.appendChild(el2, el3);
                  var el3 = dom.createTextNode("\n					");
                  dom.appendChild(el2, el3);
                  dom.appendChild(el1, el2);
                  var el2 = dom.createTextNode("\n              ");
                  dom.appendChild(el1, el2);
                  var el2 = dom.createElement("h4");
                  var el3 = dom.createTextNode("\n						");
                  dom.appendChild(el2, el3);
                  var el3 = dom.createComment("");
                  dom.appendChild(el2, el3);
                  var el3 = dom.createTextNode("\n					");
                  dom.appendChild(el2, el3);
                  dom.appendChild(el1, el2);
                  var el2 = dom.createTextNode("\n            ");
                  dom.appendChild(el1, el2);
                  dom.appendChild(el0, el1);
                  var el1 = dom.createTextNode("\n");
                  dom.appendChild(el0, el1);
                  var el1 = dom.createComment("");
                  dom.appendChild(el0, el1);
                  return el0;
                },
                buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                  var element0 = dom.childAt(fragment, [1]);
                  var morphs = new Array(3);
                  morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 1, 1);
                  morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 1, 1);
                  morphs[2] = dom.createMorphAt(fragment, 3, 3, contextualElement);
                  dom.insertBoundary(fragment, null);
                  return morphs;
                },
                statements: [["content", "item.who", ["loc", [null, [396, 6], [396, 18]]]], ["content", "item.email", ["loc", [null, [399, 6], [399, 20]]]], ["block", "if", [["get", "item.connected", ["loc", [null, [402, 18], [402, 32]]]]], [], 0, 1, ["loc", [null, [402, 12], [415, 19]]]]],
                locals: [],
                templates: [child0, child1]
              };
            })();
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.3.0",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 392,
                    "column": 8
                  },
                  "end": {
                    "line": 418,
                    "column": 8
                  }
                },
                "moduleName": "embtest/templates/dashboard.hbs"
              },
              isEmpty: false,
              arity: 1,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("          ");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(2);
                morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
                morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
                dom.insertBoundary(fragment, 0);
                return morphs;
              },
              statements: [["block", "paper-item", [], ["class", "md-3-line", "action", ["subexpr", "action", ["joinRoom", ["get", "item", ["loc", [null, [393, 68], [393, 72]]]]], [], ["loc", [null, [393, 49], [393, 73]]]]], 0, null, ["loc", [null, [393, 10], [416, 25]]]], ["content", "paper-divider", ["loc", [null, [417, 10], [417, 27]]]]],
              locals: ["item"],
              templates: [child0]
            };
          })();
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 391,
                  "column": 6
                },
                "end": {
                  "line": 419,
                  "column": 6
                }
              },
              "moduleName": "embtest/templates/dashboard.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
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
            statements: [["block", "each", [["get", "listData", ["loc", [null, [392, 16], [392, 24]]]]], [], 0, null, ["loc", [null, [392, 8], [418, 17]]]]],
            locals: [],
            templates: [child0]
          };
        })();
        var child1 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 419,
                  "column": 6
                },
                "end": {
                  "line": 425,
                  "column": 6
                }
              },
              "moduleName": "embtest/templates/dashboard.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("        ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("li");
              dom.setAttribute(el1, "class", "log");
              dom.setAttribute(el1, "style", "display: list-item;list-style-type: none;");
              var el2 = dom.createTextNode("\n          ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("span");
              dom.setAttribute(el2, "class", "logText");
              var el3 = dom.createTextNode("\n					No Users\n				");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n        ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
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
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 390,
                "column": 4
              },
              "end": {
                "line": 426,
                "column": 4
              }
            },
            "moduleName": "embtest/templates/dashboard.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
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
          statements: [["block", "if", [["get", "listData", ["loc", [null, [391, 12], [391, 20]]]]], [], 0, 1, ["loc", [null, [391, 6], [425, 13]]]]],
          locals: [],
          templates: [child0, child1]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 389,
              "column": 2
            },
            "end": {
              "line": 427,
              "column": 2
            }
          },
          "moduleName": "embtest/templates/dashboard.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
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
        statements: [["block", "paper-list", [], [], 0, null, ["loc", [null, [390, 4], [426, 19]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 429,
            "column": 0
          }
        },
        "moduleName": "embtest/templates/dashboard.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("style");
        var el2 = dom.createTextNode("\n    .bubble {\n    position: relative;\n    /*	width: 250px;*/\n    padding: 0px;\n    background: #FCF3D2;\n    -webkit-border-radius: 5px;\n    -moz-border-radius: 5px;\n    border-radius: 5px;\n    -webkit-box-shadow: 1px 2px 6px 0px rgba(97, 97, 97, 0.23);\n    -moz-box-shadow: 1px 2px 6px 0px rgba(97, 97, 97, 0.23);\n    box-shadow: 1px 2px 6px 0px rgba(97, 97, 97, 0.23);\n  }\n\n  .pointer {\n    content: \"\";\n    position: absolute;\n    display: block;\n    width: 0;\n    z-index: 1;\n    border-color: #fff transparent;\n    border-style: solid;\n    border-width: 15px 15px 0;\n    left: 250px;\n    top: 0px;\n    border-width: 0px 0px 19px 17px;\n    border-color: transparent #e5ffcc;\n  }\n  /*rgb(216, 252, 199)*/\n\n  .rightbubble {\n    position: relative;\n    border: #bbb solid 0;\n    -webkit-border-radius: 3px;\n    -moz-border-radius: 3px;\n    border-radius: 3px 3px 3px 3px;\n    margin: 0 auto;\n    z-index: 555;\n    border-color: rgb(0, 0, 0);\n    -webkit-box-shadow: 1px 1px 1px 0px rgba(97, 97, 97, 0.48);\n    -moz-box-shadow: 1px 1px 1px 0px rgba(97, 97, 97, 0.48);\n    box-shadow: 1px 1px 1px 0px rgba(97, 97, 97, 0.48);\n    background: #F4FFE9;\n    margin-bottom: 5px;\n    padding: 7px;\n    line-height: 18px;\n    font-size: 14px;\n    font-weight: 300;\n    min-width: 50px;\n    display: inline-block;\n    padding-right: 35px;\n    padding-top: 5px;\n    float: initial;\n  }\n\n  .rightbubble:after {\n    content: \"\";\n    position: absolute;\n    display: block;\n    width: 0;\n    z-index: 1;\n    border-color: #fff transparent;\n    border-style: solid;\n    border-width: 15px 15px 0;\n    left: 100%;\n    top: 0px;\n    border-width: 0px 0px 9px 6px;\n    border-color: transparent #e5ffcc;\n  }\n\n  .rightbubble:before {\n    content: \"\";\n    position: absolute;\n    display: block;\n    width: 0;\n    z-index: 1;\n    border-color: #fff transparent;\n    border-style: solid;\n    border-width: 15px 15px 0;\n    left: 100%;\n    top: 0px;\n    border-width: 0px 0px 11px 6px;\n    border-color: transparent rgba(169, 173, 165, 0.62);\n  }\n\n  .leftbubble {\n    background: #fff;\n  }\n\n  .leftbubble:after {\n    content: \"\";\n    position: absolute;\n    top: 0px;\n    left: 0%;\n    border-style: solid;\n    border-width: -6px 2px -3px -7px;\n    display: block;\n    width: 0;\n    z-index: 1;\n    content: ' ';\n    position: absolute;\n    width: 0;\n    height: 0;\n    left: -8px;\n    right: auto;\n    top: 0px;\n    bottom: auto;\n    border: 8px solid;\n    border-color: white transparent transparent transparent;\n  }\n\n  .leftbubble:before {\n    border-color: transparent;\n  }\n\n  .imagebubble {\n    padding-right: 5px;\n    padding-bottom: 2px;\n    padding-top: 5px;\n  }\n\n  .inputbubble {\n    position: absolute;\n    bottom: 10px;\n    left: 50px;\n    width: 250px;\n    margin: auto;\n    height: 47px;\n    padding: 0px;\n    z-index: 1000;\n    background: #FFFFFF;\n    -webkit-border-radius: 5px;\n    -moz-border-radius: 5px;\n    border-radius: 5px 0px 5px 5px;\n    -webkit-box-shadow: rgba(97, 97, 97, 0.227451) 1px 2px 3px 0px;\n    -moz-box-shadow: rgba(97, 97, 97, 0.227451) 1px 2px 3px 0px;\n    box-shadow: rgba(97, 97, 97, 0.227451) 1px 2px 3px 0px;\n  }\n\n  .inputbubble:after {\n    content: \"\";\n    position: absolute;\n    top: 8px;\n    right: -15;\n    border-style: solid;\n    border-width: 15px 0 15px 15px;\n    border-color: transparent #FFFFFF;\n    display: block;\n    width: 0;\n    z-index: 1;\n    content: \"\";\n    position: absolute;\n    display: block;\n    width: 0;\n    z-index: 1;\n    border-color: #fff transparent;\n    border-style: solid;\n    border-width: 15px 15px 0;\n    left: 250px;\n    top: 0px;\n    border-width: 0px 0px 9px 7px;\n    border-color: transparent #fff;\n  }\n\n  .inputMessage {\n    border: none;\n    height: 100%;\n    width: 100%;\n    padding: 10px;\n    outline: none;\n    border-radius: 5px;\n  }\n\n  .messageLi {\n    text-align: right;\n    margin-top: 10px;\n  }\n\n  .lileft {\n    text-align: left;\n  }\n\n  .fileDiv {\n    height: 40px;\n    width: 40px;\n    position: absolute;\n    background: rgba(241, 227, 212, 0.62);\n    border-radius: 50%;\n    box-shadow: rgba(97, 97, 97, 0.227451) 1px 2px 3px 0px;\n    bottom: 10px;\n    right: 10px;\n    text-align: center;\n  }\n\n  .fileDiv img {\n    height: 56%;\n    margin-top: 9px;\n    vertical-align: bottom;\n  }\n\n  .logText {\n    background: #d4eaf4;\n    padding: 7px;\n    font-size: 10px;\n    box-shadow: rgba(97, 97, 97, 0.227451) 1px 1px 0px 0px;\n    border-radius: 4px;\n    margin-bottom: 20px;\n  }\n\n  .statusImg {\n    position: absolute;\n    /* background: red; */\n    height: 11px;\n    /* width: 13px; */\n    bottom: 3px;\n    right: 5px;\n  }\n\n  .typing {\n    padding-right: 5px;\n  }\n\n  .log {\n    margin: 25px;\n  }\n\n  .chatImage {\n    height: 150px;\n  }\n\n  .chatImageEnlarge {\n    position: fixed;\n    height: auto;\n    max-width: 90%;\n    left: 5%;\n    max-height: 100%;\n    top: 5%;\n  }\n\n  .pages {\n    height: 100%;\n  }\n\n  .chat.page {\n    display: block;\n    overflow: hidden;\n  }\n\n  .spinner {\n    width: 50px;\n    height: 20px;\n    text-align: center;\n    font-size: 10px;\n  }\n\n  .messages {\n    position: absolute;\n    top: 0;\n    bottom: 0px;\n    left: 0;\n    right: -17px;\n    overflow: auto;\n    padding-right: 32px;\n    width: auto;\n    height: 87%;\n  }\n\n  .chatArea {\n    padding-bottom: 0px;\n    background: rgba(135, 255, 145, 0.4);\n  }\n\n  .page {\n    position: relative;\n  }\n\n  .spinner > div {\n    background-color: #333;\n    height: 100%;\n    width: 3px;\n    display: inline-block;\n    margin: 3px;\n    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;\n    animation: sk-stretchdelay 1.2s infinite ease-in-out;\n  }\n\n  .spinner .rect2 {\n    -webkit-animation-delay: -1.1s;\n    animation-delay: -1.1s;\n  }\n\n  .spinner .rect3 {\n    -webkit-animation-delay: -1.0s;\n    animation-delay: -1.0s;\n  }\n\n  .spinner .rect4 {\n    -webkit-animation-delay: -0.9s;\n    animation-delay: -0.9s;\n  }\n\n  .spinner .rect5 {\n    -webkit-animation-delay: -0.8s;\n    animation-delay: -0.8s;\n  }\n\n  @-webkit-keyframes sk-stretchdelay {\n    0%,\n    40%,\n    100% {\n      -webkit-transform: scaleY(0.4)\n    }\n    20% {\n      -webkit-transform: scaleY(1.0)\n    }\n  }\n\n  @keyframes sk-stretchdelay {\n    0%,\n    40%,\n    100% {\n      transform: scaleY(0.4);\n      -webkit-transform: scaleY(0.4);\n    }\n    20% {\n      transform: scaleY(1.0);\n      -webkit-transform: scaleY(1.0);\n    }\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "dashboard");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element6 = dom.childAt(fragment, [10]);
        var morphs = new Array(6);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 8, 8, contextualElement);
        morphs[4] = dom.createMorphAt(element6, 1, 1);
        morphs[5] = dom.createMorphAt(element6, 2, 2);
        return morphs;
      },
      statements: [["block", "paper-button", [], ["class", "login-options", "raised", true, "primary", true, "signup", ["subexpr", "@mut", [["get", "login", ["loc", [null, [330, 70], [330, 75]]]]], [], []], "action", ["subexpr", "action", ["testprotectedApi"], [], ["loc", [null, [330, 83], [330, 110]]]]], 0, null, ["loc", [null, [330, 0], [330, 147]]]], ["block", "paper-button", [], ["class", "login-options", "raised", true, "primary", true, "signup", ["subexpr", "@mut", [["get", "login", ["loc", [null, [331, 70], [331, 75]]]]], [], []], "action", ["subexpr", "action", ["socketTest"], [], ["loc", [null, [331, 83], [331, 104]]]]], 1, null, ["loc", [null, [331, 0], [331, 145]]]], ["content", "outlet", ["loc", [null, [332, 0], [332, 10]]]], ["inline", "log", ["session object", ["get", "session", ["loc", [null, [333, 23], [333, 30]]]]], [], ["loc", [null, [333, 0], [333, 32]]]], ["block", "paper-content", [], ["class", "md-whiteframe-z1 list-demo dash chat-window"], 2, null, ["loc", [null, [335, 2], [388, 20]]]], ["block", "paper-content", [], ["class", "md-whiteframe-z1 list-demo dash name-list"], 3, null, ["loc", [null, [389, 2], [427, 20]]]]],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  })());
});
define("embtest/templates/login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 3,
                  "column": 2
                },
                "end": {
                  "line": 3,
                  "column": 90
                }
              },
              "moduleName": "embtest/templates/login.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("LOGIN");
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
        var child1 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.3.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 4,
                  "column": 2
                },
                "end": {
                  "line": 4,
                  "column": 93
                }
              },
              "moduleName": "embtest/templates/login.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("SIGN UP");
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
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 1
              },
              "end": {
                "line": 5,
                "column": 1
              }
            },
            "moduleName": "embtest/templates/login.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("		");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n		");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
            return morphs;
          },
          statements: [["block", "paper-button", [], ["class", "login-options", "signup", ["subexpr", "@mut", [["get", "login", ["loc", [null, [3, 47], [3, 52]]]]], [], []], "action", ["subexpr", "action", ["togglesignup"], [], ["loc", [null, [3, 60], [3, 83]]]]], 0, null, ["loc", [null, [3, 2], [3, 107]]]], ["block", "paper-button", [], ["class", "login-options", "signup", ["subexpr", "@mut", [["get", "signup", ["loc", [null, [4, 47], [4, 53]]]]], [], []], "action", ["subexpr", "action", ["togglesignup"], [], ["loc", [null, [4, 61], [4, 84]]]]], 1, null, ["loc", [null, [4, 2], [4, 110]]]]],
          locals: [],
          templates: [child0, child1]
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 8,
                "column": 1
              },
              "end": {
                "line": 12,
                "column": 1
              }
            },
            "moduleName": "embtest/templates/login.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("		");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n\n		");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
            return morphs;
          },
          statements: [["inline", "paper-input", [], ["label", "Email", "isTouched", ["subexpr", "@mut", [["get", "emailTouched", ["loc", [null, [9, 41], [9, 53]]]]], [], []], "value", ["subexpr", "@mut", [["get", "user.email", ["loc", [null, [9, 60], [9, 70]]]]], [], []], "required", true, "type", "email", "icon-class", "email", "required-errortext", "Email is required.", "errText", ["subexpr", "@mut", [["get", "emailValidation", ["loc", [null, [9, 165], [9, 180]]]]], [], []]], ["loc", [null, [9, 2], [9, 182]]]], ["inline", "paper-input", [], ["label", "Phone Number", "isTouched", ["subexpr", "@mut", [["get", "numberTouched", ["loc", [null, [11, 48], [11, 61]]]]], [], []], "type", "tel", "value", ["subexpr", "@mut", [["get", "user.number", ["loc", [null, [11, 80], [11, 91]]]]], [], []], "errText", ["subexpr", "@mut", [["get", "numberValidation", ["loc", [null, [11, 100], [11, 116]]]]], [], []]], ["loc", [null, [11, 2], [11, 118]]]]],
          locals: [],
          templates: []
        };
      })();
      var child2 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 15,
                "column": 1
              },
              "end": {
                "line": 17,
                "column": 1
              }
            },
            "moduleName": "embtest/templates/login.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("		");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "paper-input", [], ["label", "Confirm Password", "isTouched", ["subexpr", "@mut", [["get", "password2Touched", ["loc", [null, [16, 52], [16, 68]]]]], [], []], "type", "password", "value", ["subexpr", "@mut", [["get", "user.password2", ["loc", [null, [16, 92], [16, 106]]]]], [], []], "errText", ["subexpr", "@mut", [["get", "passwordsMatchValidation", ["loc", [null, [16, 115], [16, 139]]]]], [], []]], ["loc", [null, [16, 2], [16, 141]]]]],
          locals: [],
          templates: []
        };
      })();
      var child3 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.3.0",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 22,
                    "column": 1
                  },
                  "end": {
                    "line": 22,
                    "column": 68
                  }
                },
                "moduleName": "embtest/templates/login.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("Submit");
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
              "fragmentReason": false,
              "revision": "Ember@2.3.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 20,
                  "column": 1
                },
                "end": {
                  "line": 24,
                  "column": 1
                }
              },
              "moduleName": "embtest/templates/login.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("\n	");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              return morphs;
            },
            statements: [["block", "paper-button", [], ["action", ["subexpr", "action", ["authenticate"], [], ["loc", [null, [22, 24], [22, 47]]]], "primary", true], 0, null, ["loc", [null, [22, 1], [22, 85]]]]],
            locals: [],
            templates: [child0]
          };
        })();
        var child1 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.3.0",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 28,
                    "column": 1
                  },
                  "end": {
                    "line": 28,
                    "column": 70
                  }
                },
                "moduleName": "embtest/templates/login.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("Register");
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
              "fragmentReason": false,
              "revision": "Ember@2.3.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 26,
                  "column": 2
                },
                "end": {
                  "line": 29,
                  "column": 1
                }
              },
              "moduleName": "embtest/templates/login.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("\n	");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              return morphs;
            },
            statements: [["block", "paper-button", [], ["action", ["subexpr", "action", ["registerUser"], [], ["loc", [null, [28, 24], [28, 47]]]], "primary", true], 0, null, ["loc", [null, [28, 1], [28, 87]]]]],
            locals: [],
            templates: [child0]
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 19,
                "column": 0
              },
              "end": {
                "line": 30,
                "column": 1
              }
            },
            "moduleName": "embtest/templates/login.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "animated-if", [], ["condition", ["subexpr", "@mut", [["get", "login", ["loc", [null, [20, 26], [20, 31]]]]], [], []]], 0, null, ["loc", [null, [20, 1], [24, 17]]]], ["block", "animated-if", [], ["condition", ["subexpr", "@mut", [["get", "signup", ["loc", [null, [26, 27], [26, 33]]]]], [], []]], 1, null, ["loc", [null, [26, 2], [29, 17]]]]],
          locals: [],
          templates: [child0, child1]
        };
      })();
      var child4 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.3.0",
            "loc": {
              "source": null,
              "start": {
                "line": 30,
                "column": 1
              },
              "end": {
                "line": 33,
                "column": 1
              }
            },
            "moduleName": "embtest/templates/login.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("\n	");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "paper-progress-circular", [], ["class", "sm-hue-2", "size", "sm"], ["loc", [null, [32, 1], [32, 55]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type", "multiple-nodes"]
          },
          "revision": "Ember@2.3.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 35,
              "column": 0
            }
          },
          "moduleName": "embtest/templates/login.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("	");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n	");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(6);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
          morphs[2] = dom.createMorphAt(fragment, 4, 4, contextualElement);
          morphs[3] = dom.createMorphAt(fragment, 6, 6, contextualElement);
          morphs[4] = dom.createMorphAt(fragment, 8, 8, contextualElement);
          morphs[5] = dom.createMorphAt(fragment, 10, 10, contextualElement);
          dom.insertBoundary(fragment, 0);
          return morphs;
        },
        statements: [["block", "paper-toolbar", [], [], 0, null, ["loc", [null, [2, 1], [5, 19]]]], ["inline", "paper-input", [], ["label", "Name", "class", "name", "isTouched", ["subexpr", "@mut", [["get", "nameTouched", ["loc", [null, [6, 51], [6, 62]]]]], [], []], "value", ["subexpr", "@mut", [["get", "user.name", ["loc", [null, [6, 69], [6, 78]]]]], [], []], "type", "text", "errText", ["subexpr", "@mut", [["get", "nameValidation", ["loc", [null, [6, 99], [6, 113]]]]], [], []]], ["loc", [null, [6, 1], [6, 115]]]], ["block", "animated-if", [], ["condition", ["subexpr", "@mut", [["get", "signup", ["loc", [null, [8, 26], [8, 32]]]]], [], []]], 1, null, ["loc", [null, [8, 1], [12, 17]]]], ["inline", "paper-input", [], ["label", "Password", "class", "pass1", "isTouched", ["subexpr", "@mut", [["get", "password1Touched", ["loc", [null, [14, 57], [14, 73]]]]], [], []], "errText", ["subexpr", "@mut", [["get", "passwordValidation", ["loc", [null, [14, 82], [14, 100]]]]], [], []], "type", "password", "value", ["subexpr", "@mut", [["get", "user.password1", ["loc", [null, [14, 123], [14, 137]]]]], [], []]], ["loc", [null, [14, 1], [14, 139]]]], ["block", "animated-if", [], ["condition", ["subexpr", "@mut", [["get", "signup", ["loc", [null, [15, 26], [15, 32]]]]], [], []]], 2, null, ["loc", [null, [15, 1], [17, 17]]]], ["block", "if", [["get", "notLoading", ["loc", [null, [19, 6], [19, 16]]]]], [], 3, 4, ["loc", [null, [19, 0], [33, 8]]]]],
        locals: [],
        templates: [child0, child1, child2, child3, child4]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 36,
            "column": 0
          }
        },
        "moduleName": "embtest/templates/login.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
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
      statements: [["block", "paper-card", [], ["class", "login-card"], 0, null, ["loc", [null, [1, 0], [35, 15]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("embtest/templates/profile", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "embtest/templates/profile.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("profile");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [2, 0], [2, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('embtest/utils/grid-layout', ['exports', 'ember-paper/utils/grid-layout'], function (exports, _emberPaperUtilsGridLayout) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPaperUtilsGridLayout['default'];
    }
  });
});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('embtest/config/environment', ['ember'], function(Ember) {
  var prefix = 'embtest';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */
if (!runningTests) {
  require("embtest/app")["default"].create({"name":"embtest","version":"0.0.0+3c61d616"});
}
/* jshint ignore:end */
//# sourceMappingURL=embtest.map