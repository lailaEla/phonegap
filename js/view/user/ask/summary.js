// Filename: view/user/ask/summary.js
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'model/user/ask',
	'text!templates/user/ask/summary.html'
], function($, _, Backbone, Utils, AskModel, Tpl){

	/*-------------------- CONFIG --------------------*/

	var View = Backbone.View.extend({
		
		/*-------------------- INIT --------------------*/

		initialize:function(){

			/* View / Model association */
			var that = this;
			/* Bind model changes that need the view to refresh */
			// Model.bind('change:XXX',function(){ that.render(); });

		},
		/* Unlink model to prevent multiple binding and save resources */
		unlink:function(){
			// Model.off();
		},

		/*-------------------- EVENT --------------------*/

		events:{
			'submit form':'submitTransfert'
		},

		/*-------------------- HANDLERS --------------------*/

		dummy:function(){ },
		submitTransfert:function(e){

			/* Format data for request */
			var attr = AskModel.attributes,
				data = {
					token:Utils.storage.get('token',false),
					parameter:$.extend(attr,{
						recipientLogins:attr.recipientLogins.split(',')
					})
				};
			
			/* Call service */
			Utils.service.call({
				name:'makeTransferDemand/'+attr.amount,
				data:data,
				success:function(response){

					Utils.router.navigate('user/ask/success',{ trigger:true });

					Utils.service.finish();// remove class loading

				}
			});

			e.preventDefault();
			return false;

		},

		/*-------------------- RENDER --------------------*/

		render:function(isGlobal){
			
			/* Vars */
			var	compiledTemplate = _.template(Tpl, { model:AskModel});
			
			/* Append */
			this.$el.html(compiledTemplate);

			/* Update header */
			Utils.header.setLeftButton('Retour','back','javascript:history.back();');
			Utils.header.setRightButton('Déconnexion','logout','#logout');

		}

	});

	/*-------------------- MODULE --------------------*/

	return {
		id:'userAskSummary',
		level:21,
		view:View
	};

});
