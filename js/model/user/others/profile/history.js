// Filename model/user/actions/history.js
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
					cat:'history',
					index:0
				},
				wording:{
					historyDemand:{
						title:'en cours'
					},
					historyDonation:{
						title:'archivées'
					}
				},
				
				historyDemand : new Backbone.Collection(),
				historyDonation : new Backbone.Collection()
			},

			collections:[
				{ name:'historyDemand', service:'getTransferList/finishedDemand/100' },
				{ name:'historyDonation', service:'getTransferList/finishedDonation/100' }
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
							var list  = response.transactionList;
							that.attributes[collection.name].update(list);  
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
						if('history' != collection.name) count += that.attributes[collection.name].length;
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