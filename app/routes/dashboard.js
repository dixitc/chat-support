import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend( AuthenticatedRouteMixin, {
	beforeModel(transition) {
		this._super(...arguments)
		let token = this.get( 'session.session.content.authenticated.token' )

		if ( !Ember.isEmpty( token ) ) {
			let userInfo = atob( token.split( '.' )[ 1 ] );
			let user_id = JSON.parse( userInfo )
				.id;
			let self = this;
			console.log( user_id );
			console.log( 'RESTORING SESSION' );

			//parse user id from token
			//get user
			//set user as current user
			this.store.findRecord( 'user', user_id, {
					reload: true
				} )
				.catch( function( reason ) {
					console.log( reason );
					//If failed to authenticate token invalidate session
				//	self.get( 'session' );
				//		.invalidate()
					self.get('session').invalidate();
					if ( reason.errors[ 0 ].status === '403' ) {
						// Do some specific error handling for 403
					} else {
						// At this point I want to call the default error handler
					}
				} );

		} else {

			this.transitionTo('login')


		}
	}
} );
