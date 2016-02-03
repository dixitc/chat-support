import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
	host: 'http://172.16.1.168:3000',
	authorizer : 'authorizer:custom'
} );
