import Ember from 'ember';

export default Ember.Controller.extend( {
	actions: {
		testprotectedApi: function() {
			var self = this;
			var user = this.store.createRecord( 'user', {
				name: 'asdfasdf',
				email: 'asdfasdf'

			} );
			
			user.save()
				.then( function() {
					//this is basically what happens when you trigger the LoginControllerMixin's "authenticate" action

				} );
		}
	}
} );
