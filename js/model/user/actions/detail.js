// Filename model/user/actions/details.js
define([
	'backbone',
	'underscore',
	'utils',
	'model/user/actions/list',
], function(Backbone, _, Utils, ListModel){

	/*-------------------- CONFIG --------------------*/

	var Model = Backbone.Model.extend({
			
			defaults:{
				'@class':'transferAcceptance',
				meanOfPaymentId:'',
				loading:true,
				error:false,
				head:'',
				index:-1,
			},

			/* Get transfert détails */
			getDetails:function(index){

				var that = this,
					state = ListModel.get('state'),
					model = ListModel.attributes[state.cat].models[index],
					id = model.get('id') || model.get('ids')[0];

				console.log(model);
				
				/* Enable loading state */
				that.set({ loading:true });

				Utils.service.call({
					name:('awaiting' == state.cat)? 'getPaymentDetail/'+id : 'getTransferDetail/'+id,
					data:{
						token:Utils.storage.get('token')
						},
					success:function(response){
						
						console.log("********************",response);
						
						/* Disable loading state */
						that.set({ loading:false });

						/* got transfert informations */
						if(response.transferDetail || response.paymentDetail){
							
							console.log(response.transferDetail);
							
							that.set({ index:index });
							var datas = response.transferDetail || response.paymentDetail || {};
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

			},

			operationSuccess:function(operation){
				
				/* Get model reference */
				var state = ListModel.get('state'),
					model = ListModel.attributes[state.cat].models[this.get('index')];
				
				/* Remove model from collection and update badge count */
				ListModel.attributes[state.cat].remove(model);
				ListModel.setNavigationBadge();

				/* Go back to previous screen */
				history.back();

				/* Display confirmation */
				var text = '';
				switch(operation){
					case 'approval':
						text = 'Vous avez accepté d\'envoyer '+this.get('amount')+'€ à '+this.get('creditor')+'<br /><br />Le destinataire en a été informé.';
						break;
					case 'refusal':
						text = 'Vous avez refusé d\'envoyer '+this.get('amount')+'€ à '+this.get('creditor')+'<br /><br />Le destinataire en a été informé.';
						break;
					case 'delivered':
						text = 'Livraison validée !';
						break;
				};

				Utils.popin.open({
					data:{
						content:text
					}
				});
			}

		});
	
	// Return the model for the module
	return Model;

});