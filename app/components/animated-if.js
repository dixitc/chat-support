import Ember from 'ember';

export default Ember.Component.extend({
	 condition: null,
  
  classNames: 'animated-if',
  
  isInverse: false,
  
  updateVisibilityState: function() {
    if (this.get('condition') ^ this.isInverse) {
      this.$().show(500);
    } else {
      this.$().hide(500);
    }
  }.on('didInsertElement').observes('condition')
});
