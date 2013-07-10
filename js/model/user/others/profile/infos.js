// Filename model/user/others/profile.js
define([
	'backbone',
	'underscore',
	'utils'
], function(Backbone, _, Utils){

	/*-------------------- CONFIG --------------------*/

	var Model = Backbone.Model.extend({
			defaults:{
				'@class':'setInformationUser',
				loading:true
			},
			/* Get informations */
			getInformations:function(){

				this.set({ loading:true });

				var that = this;
				Utils.service.call({
					name:'getCurrentUserInformation/',
					data:{
					token:Utils.storage.get('token')
				},
					success:function(response){
						
						that.set({ loading:false });
						that.set(response.currentUserInformation);

					}
				});

			}

		}),
		Instance = new Model();

	Instance.getInformations();
	
	// Return the model for the module
	return Instance;

});