import DS from 'ember-data';
export default DS.JSONAPISerializer.extend({
	primaryKey: '_id',
    serialize: function(snapshot, options) {
       // var json = this._super(record, options);
        var json = this._super(...arguments);
        console.log(snapshot.record.password);
        json.meta = {
        	typedPass:  snapshot.record.password
        }
        // assuming niner isn't an attr on the model definition
        // just a value added to the model that I want to include in the meta data  
        /*var myrecord = record.record;
        console.log(record);
        json.meta = {
            typedPass: myrecord.get('password')
        };*/
        return json;
    }
});