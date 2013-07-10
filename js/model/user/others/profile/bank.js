// Filename model/user/others/bank.js
define([
	'backbone',
	'underscore',
	'utils'
], function(Backbone, _, Utils){

	/*-------------------- CONFIG --------------------*/

	var Model = Backbone.Model.extend({
			defaults:{
				loading:true,
				means:new Backbone.Collection()
			},
			/* Get informations */
			getInformations:function(){

				/* Enable loading state */
				this.set({ loading:true });

				var that = this;
				Utils.service.call({
					name:'getMeanOfPaymentList/',
					data:{
						token:Utils.storage.get('token')
					},					
					success:function(response){
						
						that.get('means').update(response.meanOfPaymentList);
						
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