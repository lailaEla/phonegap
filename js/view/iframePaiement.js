// Filename: iframePaiement.js
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'model/iframePaiement',
	'text!templates/iframePaiement.html'
], function($, _, Backbone, Utils, iframePaiement, iframeTpl){

	/*-------------------- CONFIG --------------------*/

	var View = Backbone.View.extend({
		
		/*-------------------- INIT --------------------*/

		initialize:function(){

			/* View / Model association */
			var that = this;
			/* Bind model changes that need the view to refresh */
			iframePaiement.bind('change',function(){ that.render(); });

		},
		/* Unlink model to prevent multiple binding and save resources */
		unlink:function(){
			iframePaiement.off();
		},

		/*-------------------- EVENTS --------------------*/

		events:{},

		/*-------------------- HANDLERS --------------------*/
		 

		/*-------------------- RENDER --------------------*/

		render:function(isGlobal){ 
			console.log()
			/* Vars */
			var	compiledTemplate = _.template(iframeTpl, { model:iframePaiement });
			
			/* Append */
			this.$el.html(compiledTemplate);

			Utils.service.call({
				name:'getRegisterUserIframeUrl/',
				success:function(response){ 
					/* Success */
					if( response.iframeReturn.url ) iframePaiement.set(response.iframeReturn); 
				}
				Utils.service.finish();// remove class loading
			});

			/* Update header */
			Utils.header.setLeftButton('Retour','back','javascript:history.back();');
			Utils.header.setRightButton('Aide','help','#popin/id/mtra_popup-besoin-aide');

		}

	});

	/*-------------------- MODULE --------------------*/

	return {
		id:'iframePaiement',
		level:1,
		view:View
	};

});
