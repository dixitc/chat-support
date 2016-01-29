import Ember from 'ember';

export default Ember.Controller.extend( {
	session: Ember.inject.service( 'session' ),
	authenticator: 'authenticator:custom',
    signup : false,
    login : Ember.computed('params.[]', function(){
        return !this.get('signup');
    }).property('signup'),
	actions: {
        authenticate: function() {
            var credentials = this.getProperties('name', 'password');
            this.get('session').authenticate('authenticator:custom', credentials).catch((message) => {
                this.set('errorMessage', message);
            });
        },
        togglesignup : function(){
            this.toggleProperty('signup');
        }
	}
});
