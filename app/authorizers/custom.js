// app/authorizers/custom.js
import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';
export default Base.extend( {
	authorize: function( data, block ) {
		const {
			token
		} = data;
		//console.log(atob(data.token.split('.')[1]))
		if ( !Ember.isEmpty( token ) ) {
			block( 'Authorization', `Bearer ${token}` );
		}
	}
} );
