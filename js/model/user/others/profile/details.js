// Filename model/user/actions/details.js
define([
	'backbone',
	'underscore',
	'utils',
	'model/user/others/profile/history',
], function(Backbone, _, Utils, ListModel){

	/*-------------------- CONFIG --------------------*/

	var Model = Backbone.Model.extend({
			
			defaults:{
				loading:true,
				error:false,
				head:'',
				index:-1,
			},

			/* Get transfert détails */
			getDetails:function(index){
				alert("+++++++++++++++++++++++");
				var that = this/*,
					state = ListModel.get('state'),
					model = ListModel.attributes[state.cat].models[index]*/,
					id = model.get('id') || model.get('ids')[0];

				console.log(model);
				
				/* Enable loading state */
				that.set({ loading:true });

				Utils.service.call({
					name:'getTransferDetail/'+index,
					data:{
						token:Utils.storage.get('token')
						},
					success:function(response){
						
						console.log("********************",response);
						
						/* Disable loading state */
						that.set({ loading:false });

						/* got transfert informations */
						if(response.transferDetail){
							
							console.log(response.transferDetail);
							
							that.set({ index:index });
							var datas = response.transferDetail || {};
							that.set(datas);

						/* Error */
						} else {

							that.set({ error:'error' });

						}
						Utils.service.finish();// remove class loading
					},
					error:function(){
						
						that.set({ error:'connexion' });
						Utils.service.finish();// remove class loading

					}
				});

			}

		});
	
	// Return the model for the module
	return Model;

});