import Ember from 'ember';

export default Ember.Controller.extend( {
	socketIOService: Ember.inject.service( 'socket-io' ),
	actions: {
		testprotectedApi: function() {
			var self = this;
			var user = this.store.createRecord( 'user', {
				name: 'asdfasdf',
				email: 'asdfasdf'

			} );


		},
		socketTest: function() {
			var socket = io( 'http://172.16.1.168:3001' );
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
		}
	}
} );
