// Filename model/user/actions/list.js
define([
	'backbone',
	'underscore',
	'utils'
], function(Backbone, _, Utils){

	/*-------------------- CONFIG --------------------*/

	var timer = null,
		Model = Backbone.Model.extend({
			defaults:{
				loading:true,
				state:{
					cat:null,
					index:0
				},
				wording:{
					validable:{
						title:'Accepter une demande'
					},
					claim:{
						title:'Relancer une demande'
					},
					relaunchable:{
						title:'Relancer un envoi'
					},
					awaiting:{
						title:'Valider une livraison'
					},
					notification:{
						title:'Notifications'
					}
				},
				validable:new Backbone.Collection(),
				claim:new Backbone.Collection(),
				relaunchable:new Backbone.Collection(),
				awaiting:new Backbone.Collection(),
				notification:new Backbone.Collection()
			},

			collections:[
				{ name:'validable', service:'getTransferList/validableDemands/100' },
				{ name:'claim', service:'getTransferList/relaunchableDemands/100' },
				{ name:'relaunchable', service:'getTransferList/relaunchableDonations/100' },
				{ name:'awaiting', service:'getPaymentList/awaitingDelivery/100' },
				{ name:'notification', service:'getEventMessageList' }
			],
			
			/* Update datas */
			udpate:function(){

				/* Vars */
				var that = this;
				
				/* Enable loading state */
				that.set({ loading:true });

				/* Call service for each colelction */
				$(this.collections).each(function(i,collection){
					
					Utils.service.call({
						name:collection.service,
						data:{token:Utils.storage.get('token')},
						success:function(response){
							var list = ('notification' == collection.name)? response.notificationList : response.transactionList;
							that.attributes[collection.name].update(list);
							console.dir(response);
							that.setNavigationBadge();
							Utils.service.finish();// remove class loading
						}
					});

				});

			},

			setNavigationBadge:function(){
				
				clearTimeout(timer);
				var that = this;
				timer = setTimeout(function(){
					
					/* Disable loading state */
					that.set({ loading:false });

					var count = 0;
					$(that.collections).each(function(i,collection){
						/*if('notification' != collection.name) */count += that.attributes[collection.name].length;
					});
					Utils.navigation.setBadge(2,count);	

				},200);

			}

		}),
		Instance = new Model();
	
	/*-------------------- DEFERED --------------------*/
	Instance.udpate();
	
	// Return the model for the module
	return Instance;

});