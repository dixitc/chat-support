$( function() {
	var FADE_TIME = 150; // ms
	var TYPING_TIMER_LENGTH = 400; // ms
	var USER_ID = Math.floor( Math.random() * 10000 );
	var COLORS = [ '#e21400', '#91580f', '#f8a700', '#f78b00', '#58dc00', '#287b00', '#a8f07a', '#4ae8c4', '#3b88eb', '#3824aa', '#a700ff', '#d300e7' ];
	// Initialize variables
	var $window = $( window );
	var $usernameInput = $( '.usernameInput' ); // Input for username
	var $messages = $( '.messages' ); // Messages area
	var $inputMessage = $( '.inputMessage' ); // Input message input box
	var $loginPage = $( '.login.page' ); // The login page
	var $chatPage = $( '.chat.page' ); // The chatroom page
	// Prompt for setting a username
	var clog = console.log;
	var username;
	var connected = false;
	var typing = false;
	var lastTypingTime;
	var $currentInput = $usernameInput.focus();

	var socket = io( 'http://172.16.1.168:3001' )
	setUsername();
	socket.emit( 'join support', {
		email: 'support@example.com'
	} );
	//   socket.emit('addsupport' ,{})
	socket.on( "new_msg", function( data ) {
		addChatMessage( data )
	} )
	socket.on( 'message received', function( data ) {

		console.log( "message received" );
		console.log( data );
		var a = $( ".message" )
			.filter( function() {
				return ( $( this )
					.text() === data.msg )
			} );
		a.children( 'img' )
			.attr( 'src', 'images/ic_done_black_24px.svg' )
	} );
	socket.on( "user message", function( data ) {
		console.log( 'new ping' )
		data.user = true;
		var $chatWindow = $( document.getElementById( data.userEmail ) );
		if ( $chatWindow.length ) {
			addChatMessage( data )
		} else {
			generateChatWindow( data )
		}
		socket.emit( 'userMsg received', data );
	} )
	socket.on( 'new user', function( data ) {
		socket.emit( 'room', {
			room_name: data.email
		} );
	} )
	socket.on( 'joined', function( data ) {
		log( 'connected' );
	} )
	socket.on( 'updatechat', function( data1, data2 ) {
		log( data2 );
	} )
	socket.on( 'support typing', function( data ) {
			addChatTyping( data );
		} )
		// Whenever the server emits 'stop typing', kill the typing message
	socket.on( 'stop typing', function( data ) {
		removeChatTyping( data );
	} );

	//USER INTERACTIONS
	$( '#mainInput' )
		.keydown( function( event ) {
			// 
			// Auto-focus the current input when a key is typed
			if ( !( event.ctrlKey || event.metaKey || event.altKey ) ) {
				$currentInput.focus();
			}
			// When the client hits ENTER on their keyboard
			if ( event.which === 13 ) {
				if ( username ) {
					//  sendMessage();
					sendSupportMessage();
				} else {
					setUsername();
				}
			} else {
				updateTyping();
			}
		} );
	$( '.usernameInput' )
		.keydown( function( event ) {
			//
			if ( !( event.ctrlKey || event.metaKey || event.altKey ) ) {
				$currentInput.focus();
			}
			// When the client hits ENTER on their keyboard
			if ( event.which === 13 ) {
				setUsername();
			}
		} );
	//FUNCTIONS
	// Sets the client's username
	function setUsername() {
		username = 'support';
		// If the username is valid
		if ( username ) {
			$loginPage.fadeOut();
			$chatPage.show();
			$loginPage.off( 'click' );
			$currentInput = $inputMessage.focus();
			// Tell the server your username
			//  socket.emit('add user', username);
		}
	}
	// Sends a chat message
	function sendSupportMessage( msg, email ) {
		var message = {}
		message.msg = $inputMessage.val();
		// Prevent markup from being injected into the message
		message.msg = cleanInput( msg );
		message.userEmail = email
		message.username = username
			//socket.emit('stop typing',message);
		$inputMessage.val( '' );
		socket.emit( 'support message', message );
		addChatMessage( message );
	}
	// Sends a chat message
	function sendMessage() {
		var message = {}
		message.msg = $inputMessage.val();
		// Prevent markup from being injected into the message
		message.msg = cleanInput( message.msg );
		message.id = USER_ID;
		// if there is a non-empty message and a socket connection
		if ( message && connected ) {
			$inputMessage.val( '' );
			addChatMessage( {
				username: username,
				message: message,
				id: USER_ID
			} );
			// tell server to execute 'new message' and send along one parameter
			socket.emit( 'new message', message );
		}
	}
	// Log a message
	function log( message, options ) {
		//var $el = $('<li>').addClass('log').text(message);
		var $el = $( '<li>' )
			.addClass( 'log' )
			.append( '<span class="logText">' + message + '</span>' );
		addMessageElement( $el, options );
	}
	//Generate chat window
	function generateChatWindow( data ) {
		// Don't fade the message in if there is an 'X was typing'
		var $typingMessages = getTypingMessages( data );
		var $chatWindowDiv = $( '<div class="chatWindow"><ul class="messages" id=' + data.userEmail + "" + '/></div>' );
		log( 'connected to ' + data.username );
		var $chatArea = $( '.chatArea' );
		$chatArea.append( $chatWindowDiv );
		var $inputDiv = $( '<input class="inputMessage indimsg" name=' + data.userEmail + ' placeholder="Reply to ' + data.username + '.">' )
			.text( "" );
		var $fileDiv = $( '<input type="file" id="imagefile" name=' + data.userEmail + ' />' );
		//USER INTERACTIONS
		$fileDiv.on( 'change', function( e ) {
			//Get the first (and only one) file element
			//that is included in the original event
			var file = e.originalEvent.target.files[ 0 ],
				reader = new FileReader();
			//When the file has been read...
			reader.onload = function( evt ) {
				//Because of how the file was read,
				//evt.target.result contains the image in base64 format
				//Nothing special, just creates an img element
				//and appends it to the DOM so my UI shows
				//that I posted an image.
				//send the image via Socket.io
				console.log( evt.target.result )
				var mydata = {};
				mydata.user = false;
				mydata.userEmail = data.userEmail;
				mydata.buffer = evt.target.result;
				mydata.image = true;
				mydata.username = 'support';
				addChatMessage( mydata );
				socket.emit( 'support image', mydata );
			};
			//And now, read the image and base64
			reader.readAsDataURL( file );
		} );
		$inputDiv.focusin( function( event ) {
			console.log( 'a' );
			if ( $( this )
				.val() != '' ) {
				console.log( 'b' );
				socket.emit( 'typing', {
					userEmail: data.userEmail,
					username: data.username
				} );
			}
		} )
		$inputDiv.focusout( function( event ) {
			socket.emit( 'stop typing', {
				userEmail: data.userEmail,
				username: data.username
			} );
		} )
		$inputDiv.keydown( function( event ) {
			// When the client hits ENTER on their keyboard
			if ( event.which === 13 ) {
				if ( username ) {
					sendSupportMessage( $( this )
						.val(), $( this )
						.attr( 'name' ) );
					$( this )
						.val( '' );
					socket.emit( 'stop typing', {
						userEmail: data.userEmail,
						username: data.username
					} );
					typing = false;
				}
			} else if ( $( this )
				.val() != '' || $( this )
				.val() != 'undefined' ) {
				socket.emit( 'typing', {
					userEmail: data.userEmail,
					username: data.username
				} )
			}
		} );
		var typingClass = data.typing ? 'typing' : '';
		$chatWindowDiv.append( $inputDiv, $fileDiv );
		addChatMessage( data );
	}
	// Adds the visual chat message to the message list
	function addChatMessage( data, options ) {
		// Don't fade the message in if there is an 'X was typing'
		var $typingMessages = getTypingMessages( data );
		options = options || {};
		if ( $typingMessages.length !== 0 ) {
			options.fade = false;
			$typingMessages.remove();
		}
		$typingMessages.remove();
		var $usernameDiv = $( '<span class="username"/>' )
			.text( data.username )
			.css( 'color', getUsernameColor( data.username ) );
		var $typingDiv = $( '    <div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div></div>' )
		var $messageBodyDiv = $( '<span class="messageBody">' )
			.text( data.msg );
		var typingClass = options.typing ? 'typing' : '';
		var liClass = data.user ? 'lileft' : '';
		var imageClass = data.image ? 'imagebubble' : '';
		var divClass = data.user ? 'leftbubble' : '';
		if ( options.typing ) {
			var $messageDiv = $( '<div class="rightbubble leftbubble message"/>' )
				.addClass( typingClass )
				.data( 'username', data.username )
				.append( $typingDiv );
		} else if ( data.image ) {
			var $imageDiv = $( '<img class="chatImage" src="' + data.buffer + '"/>' )
			var $messageDiv = $( '<div class="rightbubble message"/>' )
				.addClass( divClass )
				.addClass( imageClass )
				.data( 'username', data.username )
				.append( $imageDiv );
			$imageDiv.click( function() {
				$( this )
					.addClass( 'chatImageEnlarge' )
			} )
		} else {
			var $messageDiv = $( '<div class="rightbubble message"/>' )
				.addClass( typingClass )
				.addClass( divClass )
				.data( 'username', data.username )
				.append( $messageBodyDiv )
			if ( !data.user ) {
				$messageDiv.append( '<img class="statusImg" src="images/ic_schedule_black_24px.svg">' )
			}

		}
		var $liDiv = $( '<li class="messageLi">' )
			.data( 'username', data.username )
			.addClass( liClass )
			.append( $messageDiv );
		var $chatWindow = $( document.getElementById( data.userEmail ) );
		addMessageElementToWindow( $liDiv, $chatWindow, options )
			// addMessageElement($messageDiv,  options);
	}
	// Adds the visual chat typing message
	function addChatTyping( data ) {
		data.typing = true;
		data.user = true;
		data.msg = 'is typing';
		var options = {};
		options.typing = true;
		addChatMessage( data, options );
	}
	// Removes the visual chat typing message
	function removeChatTyping( data ) {
		$( 'li .typing' )
			.remove();
		$( 'li .typing' )
			.fadeOut( function() {
				$( this )
					.remove();
			} )
		getTypingMessages( data )
			.fadeOut( function() {
				$( this )
					.remove();
			} );
	}

	function addMessageElementToWindow( el, chatWindow, options ) {
		var $el = $( el );
		var $chatWindow = $( chatWindow );
		// Setup default options
		if ( !options ) {
			options = {};
		}
		// Apply options
		if ( typeof options.fade === 'undefined' ) {
			options.fade = true;
		}
		if ( typeof options.prepend === 'undefined' ) {
			options.prepend = false;
		}
		// Apply options
		if ( options.fade ) {
			$el.hide()
				.fadeIn( FADE_TIME );
		}
		if ( options.prepend ) {
			$chatWindow.prepend( $el );
		} else {
			$chatWindow.append( $el );
		}
		$chatWindow.append( $el );
		$messages[ 0 ].scrollTop = $messages[ 0 ].scrollHeight;
	}
	// Adds a message element to the messages and scrolls to the bottom
	// el - The element to add as a message
	// options.fade - If the element should fade-in (default = true)
	// options.prepend - If the element should prepend
	//   all other messages (default = false)
	function addMessageElement( el, options ) {
		var $el = $( el );
		// Setup default options
		if ( !options ) {
			options = {};
		}
		if ( typeof options.fade === 'undefined' ) {
			options.fade = true;
		}
		if ( typeof options.prepend === 'undefined' ) {
			options.prepend = false;
		}
		// Apply options
		if ( options.fade ) {
			$el.hide()
				.fadeIn( FADE_TIME );
		}
		if ( options.prepend ) {
			$messages.prepend( $el );
		} else {
			$messages.append( $el );
		}
		$messages[ 0 ].scrollTop = $messages[ 0 ].scrollHeight;
	}
	// Prevents input from having injected markup
	function cleanInput( input ) {
		return $( '<div/>' )
			.text( input )
			.text();
	}
	// Updates the typing event
	function updateTyping() {
		if ( connected ) {
			if ( !typing ) {
				typing = true;
				socket.emit( 'typing' );
				setTimeout( stopTyping(), 500 );
			}
		}
	}

	function stopTyping() {}
	// Gets the 'X is typing' messages of a user
	function getTypingMessages( data ) {
		return $( '.typing.message' )
			.filter( function( i ) {
				return $( this )
					.data( 'username' ) === data.username;
			} );
	}
	// Gets the color of a username through our hash function
	function getUsernameColor( username ) {
		// Compute hash code
		var hash = 7;
		for ( var i = 0; i < username.length; i++ ) {
			hash = username.charCodeAt( i ) + ( hash << 5 ) - hash;
		}
		// Calculate color
		var index = Math.abs( hash % COLORS.length );
		return COLORS[ index ];
	}
	// Recognizes first time users and generates
	function setChatWindow( data ) {
		var message = '';
		message += "Connected to " + data.username + ".";
		log( message );
	}
} )
