// Filename model/home.js
define([
	'backbone',
	'underscore',
	'utils'
], function(Backbone, _, Utils){

	/*-------------------- CONFIG --------------------*/

	var Model = Backbone.Model.extend({
			defaults:{
				type:'mobile',
				prefix:'',
				prefixs:[
					{ label:'+33', value:'+33' },
					{ label:'+34', value:'+34' }
				],
				mobile:'',
				email:'',
				store:false,
				password:''
			},
			reset:function(){
				this.set(this.defaults);
			}
		}),
		Instance = new Model();

	// Return the model for the module
	return Instance;

});