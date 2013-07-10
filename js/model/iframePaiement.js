// Filename model/passwordRecovery.js
define([
	'backbone',
	'underscore',
	'utils'
], function(Backbone, _, Utils){

	/*-------------------- CONFIG --------------------*/

	var Model = Backbone.Model.extend({
			defaults:{
				url:''
			}
		}),
		Instance = new Model();

	// Return the model for the module
	return Instance;

});