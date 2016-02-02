import Ember from 'ember';
export default Ember.Controller.extend( {
	session: Ember.inject.service( 'session' ),
	authenticator: 'authenticator:custom',
	nameTouched: false,
	emailTouched: false,
	numberTouched: false,
	password1Touched: false,
	password2Touched: false,
	signup: false,
	notLoading: true,
	login: Ember.computed.not( 'signup' ),
	user: {
		name: '',
		email: '',
		number: '',
		password1: '',
		password2: ''
	},
	nameValidation: Ember.computed( 'user.name', function() {

		
		let name = this.get( 'user.name' );
		if ( Ember.isEmpty( name ) ) {
			return "This is required";
		} else {
			return "";
		}

	} ),
	numberValidation: Ember.computed( 'user.number', function() {
		let number = this.get( 'user.number' );
		console.log( Ember.isEmpty( number ) );
		console.log( !isNaN( number ) );
		if ( Ember.isEmpty( number ) ) {
			return "This is required";
		} else if ( isNaN( number ) ) {
			return "Use numbers";
		} else {
			return "";
		}
	} ),
	emailIsEmail: Ember.computed.match( 'user.email', /^.+@.+\..+$/ ),
	passwordsMatchValidation: Ember.computed( 'user.password1', 'user.password2', function() {
		if ( this.get( 'user.password1' ) === this.get( 'user.password2' ) ) {
			return "";
		} else {
			return "Passwords do not match";
		}
	} ),
	passwordValidation: Ember.computed( 'user.password1', function() {
		let pass1 = this.get( 'user.password1' );
		if ( pass1.length > 5 ) {
			return "";
		} else {
			return "Must be at least 5 characters";
		}
	} ),
	emailValidation: Ember.computed( 'user.email', function() {
		let email = this.get( 'user.email' );
		if ( email.match( /^.+@.+\..+$/ ) ) {
			return "";
		} else {
			return "Please provide email in valid format";
		}
	} ),
	actions: {
		validate: function() {
			//method called before register or submit
			let user = this.get( 'user' );
			this.set( 'notLoading', false )

			this.toggleProperty( 'nameTouched' );
			this.toggleProperty( 'emailTouched' );
			this.toggleProperty( 'numberTouched' );
			this.toggleProperty( 'password1Touched' );
			this.toggleProperty( 'password2Touched' );
		},
		clearForm: function() {
			//method called on toggling signup/login
			if ( this.get( 'nameTouched' ) ) {}
			this.set( 'user.name', '' );
			this.set( 'user.email', '' );
			this.set( 'user.number', '' );
			this.set( 'user.password1', '' );
			this.set( 'user.password2', '' );
			if ( this.get( 'nameTouched' ) ) {
				this.toggleProperty( 'nameTouched' );
			}
			if ( this.get( 'emailTouched' ) ) {
				this.toggleProperty( 'emailTouched' );
			}
			if ( this.get( 'numberTouched' ) ) {
				this.toggleProperty( 'numberTouched' );
			}
			if ( this.get( 'password1Touched' ) ) {
				this.toggleProperty( 'password1Touched' );
			}
			if ( this.get( 'password2Touched' ) ) {
				this.toggleProperty( 'password2Touched' );
			}
		},
		authenticate: function() {
			this.send( 'validate' );
			let credentials = this.getProperties( 'user.name', 'user.password1' );
			let self = this;
			this.get( 'session' )
				.authenticate( 'authenticator:custom', {
					name: self.get( 'user.name' ),
					password: self.get( 'user.password1' )
				} )
				.catch( ( message ) => {
					this.set( 'errorMessage', message );
				} );
		},
		togglesignup: function() {

			this.toggleProperty( 'signup' );
			this.send( 'clearForm' );
		},
		registerUser: function() {
			this.send( 'validate' );
			var self = this;
			var user = this.store.createRecord( 'user', {
				name: this.get( 'user.name' ),
				email: this.get( 'user.email' )
			} );
			user.set( 'number', this.get( 'user.number' ) );
			user.set( 'password', this.get( 'user.password1' ) );
			user.save()
				.then( function() {
					//this is basically what happens when you trigger the LoginControllerMixin's "authenticate" action
					self.get( 'session' )
						.authenticate( 'authenticator:custom', {
							name: self.get( 'user.name' ),
							password: self.get( 'user.password1' )
						} )
						.catch( ( message ) => {
							self.set( 'errorMessage', message )
						} );
				} );
		}
	}
} );
