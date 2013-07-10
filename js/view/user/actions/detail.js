// Filename: view/user/actions/home.js
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'model/user/actions/list',
	'model/user/actions/detail',
	'text!templates/user/actions/detail.html'
], function($, _, Backbone, Utils, ListModel, DetailModel, Tpl){

	/*-------------------- CONFIG --------------------*/

	var View = Backbone.View.extend({
		
		/*-------------------- INIT --------------------*/

		initialize:function(){

			/* View / Model association */
			var that = this,
				/* Get current state index to retrieve transaction ID */
				state = ListModel.get('state'),
				cat = state.cat,
				index = state.index;

			that.details = new DetailModel({ head:ListModel.get('wording')[cat].title });
			
			console.log();
			
			that.details.getDetails(index);
			/* Bind collection changes that need the view to refresh */
			that.details.bind('change',function(){ that.render(); });

		},
		/* Unlink model to prevent multiple binding and save resources */
		unlink:function(){
			if(this.details) this.details.off();
		},

		/*-------------------- EVENT --------------------*/

		events:{
			'submit form':'blocker',
			'click input[name="acceptDemand"]':'acceptDemand',
			'click input[name="refuseDemand"]':'refuseDemand',
			'click input[name="confirmDelivery"]':'confirmDelivery'
		},

		/*-------------------- HANDLERS --------------------*/
		blocker:function(e){
			e.preventDefault();
			return false;
		},
		
		/* Demand's handlers */

		acceptDemand:function(){			
			
			var that = this,
				id = that.details.get('ids');
				
				console.log(that.details);
				
				console.log("l'id de la transaction",id);
				
			var attr = that.details.attributes,
			
			data = {
				token:Utils.storage.get('token',false),
				parameter:$.extend(attr,{
					/*recipientLogins:attr.recipientLogins.split(',')*/
				})
			};				

			Utils.service.call({
				name:'acceptTransferDemand/'+id,
				data:data,
				success:function(){
					that.details.operationSuccess('approval');

					Utils.service.finish();// remove class loading
				}
			});

		},
		refuseDemand:function(){
			
			var that = this,
				id = that.details.get('ids');

			Utils.popin.open({
				content:'confirm-refusal',
				data:{
					nobuttons:true,
					valid:function(){
						
						var popin = this,
							blacklist = $('#blacklist').get(0).checked;

						/* Call blacklist service */
						if(blacklist){
							
						};

						/* Call refusal service */
						Utils.service.call({
							name:'refuseTransferDemand/'+id,
							data:{token:Utils.storage.get('token')},
							success:function(){
								
								popin.close();
								that.details.operationSuccess('refusal');

								Utils.service.finish();// remove class loading
							}
						});

					}
				}
			});

		},

		/* Delivery's handlers */

		confirmDelivery:function(){

			var that = this,
				id = that.details.get('ids');

			Utils.popin.open({
				content:'confirm-delivery',
				data:{
					nobuttons:true,
					valid:function(){

						var popin = this;
						
						/* Call refusal service */
						Utils.service.call({
							name:'validateEndOfPayment/'+id,
							data:{token:Utils.storage.get('token')},
							success:function(){
								
								popin.close();
								that.details.operationSuccess('delivered');

								Utils.service.finish();// remove class loading
							}
						});

					}
				}
			});


		},


		/*-------------------- RENDER --------------------*/

		render:function(isGlobal){
			
			console.log(this.details);
			
			/* Vars */
			var	compiledTemplate = _.template(Tpl, { model:this.details } );
			
			console.log("********* this.details ***********",this.details);
			
			/* Append */
			this.$el.html(compiledTemplate);

			/* Update header */
			Utils.header.setLeftButton('Retour','back','javascript:history.back();');
			Utils.header.setRightButton('Déconnexion','logout','#logout');

		}

	});

	/*-------------------- MODULE --------------------*/

	return {
		id:'userActionsDetail',
		level:32,
		view:View
	};

});
