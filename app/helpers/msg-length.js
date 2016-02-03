import Ember from 'ember';

export function msgLength(params/*, hash*/) {
	console.log('params')
	console.log(params)
  return params[0].length;
}

export default Ember.Helper.helper(msgLength);
