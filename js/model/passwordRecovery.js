// Filename model/passwordRecovery.js
define([
	'backbone',
	'underscore',
	'utils'
], function(Backbone, _, Utils){

	/*-------------------- CONFIG --------------------*/

	var Model = Backbone.Model.extend({
			defaults:{
				'@class':'sendPassword',
				step:1,
				question:'',
				answer:'',
				email:''
			},
			reset:function(){
				this.set(this.defaults);
			}
		}),
		Instance = new Model();

	// Return the model for the module
	return Instance;

});