import Ember from 'ember';

export default Ember.Controller.extend( {
	session: Ember.inject.service( 'session' ),
	authenticator: 'authenticator:custom',
	signup: false,
	login: Ember.computed( 'params.[]', function() {
			return !this.get( 'signup' );
		} )
		.property( 'signup' ),
	actions: {
		authenticate: function() {
			var credentials = this.getProperties( 'name', 'password' );
			this.get( 'session' )
				.authenticate( 'authenticator:custom', credentials )
				.catch( ( message ) => {
					this.set( 'errorMessage', message );
				} );
		},
		togglesignup: function() {
			this.toggleProperty( 'signup' );
		},
		registerUser: function() {
			var self = this;
			var user = this.store.createRecord( 'user', {
				name: this.get( 'name' ),
				email: this.get( 'email' )

			} );
			user.set( 'number', this.get( 'number' ) );
			user.set( 'typedPass', this.get( 'password' ) );
			user.save()
				.then( function() {
					//this is basically what happens when you trigger the LoginControllerMixin's "authenticate" action
					self.get( 'session' )
						.authenticate( 'authenticator:custom', {
							name: self.get( 'name' ),
							password: self.get( 'password' )
						} ).catch((message) => {
							self.set('errorMessage' , message)
						});
				} );
		}
	}
} );
