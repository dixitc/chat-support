// app/authenticators/custom.js
import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
export default Base.extend({
    tokenEndpoint: 'http://172.16.1.168:3000/login',
    restore: function(data) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            if (!Ember.isEmpty(data.token)) {
                console.log('RESTORING SESSION');
                //parse user id from token
                //get user
                //set user as current user
                resolve(data);
            } else {
                reject();
            }
        });
    },

    authenticate: function(options) {
        return new Ember.RSVP.Promise((resolve, reject) => {
            Ember.$.ajax({
                url: this.tokenEndpoint,
                type: 'POST',
                data: JSON.stringify({
                    username: options.name,
                    password: options.password
                }),
                contentType: 'application/json;charset=utf-8',
                dataType: 'json'
            }).then(function(response) {
                Ember.run(function() {
                    resolve({
                        token: response.token
                    });
                });
            }, function(xhr, status, error) {
                var response = xhr.responseText;
                Ember.run(function() {
                    reject(response);
                });
            });
        });
    },

    invalidate: function() {
        console.log('invalidate...');
        return Ember.RSVP.resolve();
    }
});