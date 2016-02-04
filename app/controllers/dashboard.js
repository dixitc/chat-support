import Ember from 'ember';

export default Ember.Controller.extend( {
	socketIOService: Ember.inject.service( 'socket-io' ),
	listData: Ember.A( [] ),
	selectedUser: null,
	selectedMessages: Ember.computed( 'selectedUser', function() {
		if(this.get('selectedUser')){

		console.log( this.listData[ this.listData.map( function( e ) {
				return e.who;
			} )
			.indexOf( this.get('selectedUser') )  ].msgs );
		return this.listData[ this.listData.map( function( e ) {
				return e.who;
			} )
			.indexOf( this.get('selectedUser') )  ].msgs
		}else{
			return [];
		}
	} ),
	messagesCount: Ember.computed( 'listData.@each.msgs', function( data ) {
		return this.get( 'listData' )
			.map( function( chore, index ) {
				console.log( chore );
				return `msglength: ${chore.msgs.length}!`;
			} );
	} ),

	init: function() {
		this._super.apply( this, arguments );
		console.log( 'INIT SOCKET' );
		/*
		 * 2) The next step you need to do is to create your actual socketIO.
		 */
		var socket = this.get( 'socketIOService' )
			.socketFor( 'http://localhost:3001/' );

		/*
		 * 3) Define any event handlers
		 */
		socket.on( 'connect', function() {
			/*
			 * There are 2 ways to send messages to the server: send and emit
			 */
			socket.emit( 'join support', {
				email: 'support@example.com'
			} );
		}, this );

		/*
		 * 4) It is also possible to set event handlers on specific events
		 */
		socket.on( 'user message', this.onMessage, this );

		socket.on( 'myCustomNamespace', function() {
			socket.emit( 'anotherNamespace', 'some data' );
		}, this );
		//   socket.emit('addsupport' ,{})
		socket.on( "new_msg", function( data ) {
			console.log( 'new_msg' )
		} )
		socket.on( 'message received', function( data ) {

			console.log( "message received" );

		} );
		socket.on( "user message", function( data ) {
			console.log( 'new ping' );


			socket.emit( 'userMsg received', data );
		} )
		let self = this;
		socket.on( 'new user', function( data ) {
			self.listData.pushObject( Ember.Object.create( {
				who: data.username,
				msgs: Ember.A( [] ),
				email: data.email,
				connected: false
			} ) )
			console.log( 'new user' );
			console.log( data );

		} )
		socket.on( 'joined', function( data ) {
			console.log( 'connected' );
		} )
		socket.on( 'updatechat', this.updateChat, this )
		socket.on( 'support typing', function( data ) {
				console.log( 'support typing' );
			} )
			// Whenever the server emits 'stop typing', kill the typing message
		socket.on( 'stop typing', function( data ) {
			console.log( 'stop typing' );
		} );
	},
	updateChat: function( data1, data2 ) {
		console.log( data1 );
		console.log( data2 );
		this.listData[ this.listData.map( function( e ) {
				return e.who;
			} )
			.indexOf( data2 ) ].toggleProperty( 'connected' )

	},

	onMessage: function( data ) {
		// This is executed within the ember run loop 
		console.log( data.username );
		this.listData[ this.listData.map( function( e ) {
				return e.who;
			} )
			.indexOf( data.username ) ].msgs.pushObject( data.msg )
		console.log( this.listData.map( function( e ) {
				return e.who;
			} )
			.indexOf( data.username ) );
		//alert( data.msg );
	},
	actions: {
		joinRoom: function( item ) {
			console.log( item )
			item.set( 'connected', true );
			console.log( item.get( 'email' ) )
			var socket = this.get( 'socketIOService' )
				.socketFor( 'http://localhost:3001/' );
			socket.emit( 'room', {
				room_name: item.email
			} );
			this.set('selectedUser' , item.who)
		},
		testprotectedApi: function() {
			var self = this;
			var user = this.store.createRecord( 'user', {
				name: 'asdfasdf',
				email: 'asdfasdf'

			} );


		},
		socketTest: function() {
			var socket = io( 'http://localhost:3001' );
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
				log( data1 )
				log( data2 );
			} )
			socket.on( 'support typing', function( data ) {
					addChatTyping( data );
				} )
				// Whenever the server emits 'stop typing', kill the typing message
			socket.on( 'stop typing', function( data ) {
				removeChatTyping( data );
			} );
		}
	}
} );
