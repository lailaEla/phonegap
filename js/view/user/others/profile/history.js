// Filename: view/user/others/profile/history.js
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'model/user/others/profile/history',
	'text!templates/user/others/profile/history.html'
], function($, _, Backbone, Utils, ListModel, Tpl){

	/*-------------------- CONFIG --------------------*/

	var View = Backbone.View.extend({
		
		/*-------------------- INIT --------------------*/

		initialize:function(){

			/* View / Model association */
			var that = this;
			/* Bind collection changes that need the view to refresh */
			ListModel.bind('change',function(){ that.render(); });

		},
		/* Unlink model to prevent multiple binding and save resources */
		unlink:function(){
			ListModel.off();
		},

		/*-------------------- EVENT --------------------*/

		render:function(isGlobal){

			// Vars
			var	compiledTemplate = _.template(Tpl, { model:ListModel } );
			
			// Append
			this.$el.html(compiledTemplate);

			/* Update header */
			Utils.header.setLeftButton('Retour','back','javascript:history.back();');
			Utils.header.setRightButton('Déconnexion','logout','#logout');


		}

	});

	/*-------------------- MODULE --------------------*/

	return {
		id:'userOthersProfileHistory',
		level:42,
		view:View
	};

});
