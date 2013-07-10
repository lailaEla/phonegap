// Filename: view/user/ask/success.js
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'model/user/ask',
	'text!templates/user/ask/success.html'
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

		events:{},

		/*-------------------- HANDLERS --------------------*/

		dummy:function(){ },

		/*-------------------- RENDER --------------------*/

		render:function(isGlobal){
			
			/* Vars */
			var	compiledTemplate = _.template(Tpl, { model:AskModel });
			
			/* Append */
			this.$el.html(compiledTemplate);

			/* Update header */
			Utils.header.setLeftButton();
			Utils.header.setRightButton('Déconnexion','logout','#logout');

			AskModel.reset();

		}

	});

	/*-------------------- MODULE --------------------*/

	return {
		id:'userAskSuccess',
		level:22,
		view:View
	};

});
