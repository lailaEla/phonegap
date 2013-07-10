// Filename model/user/others/profile.js
define([
	'backbone',
	'underscore',
	'utils'
], function(Backbone, _, Utils){

	/*-------------------- CONFIG --------------------*/

	var Model = Backbone.Model.extend({
			defaults:{
				loading:true,
				content:''
			},
			/* Get informations */
			getInformations:function(){

				/* Enable loading state */
				this.set({ loading:true });

				var that = this;
				Utils.service.call({
					name:'getContent/mtra_actualite',
					success:function(response){
						
						that.set(response);

						/* Disable loading state */
						that.set({ loading:false });

						Utils.service.finish();// remove class loading
						
					}
				});

			}

		}),
		Instance = new Model();

	Instance.getInformations();
	
	// Return the model for the module
	return Instance;

});