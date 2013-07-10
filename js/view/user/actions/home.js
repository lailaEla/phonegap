// Filename: view/user/actions/home.js
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'model/user/actions/list',
	'text!templates/user/actions/home.html'
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
			
			// Activate Navigation
			Utils.navigation.activate(2);

			/* Update header */
			Utils.header.setLeftButton();
			Utils.header.setRightButton('Déconnexion','logout','#logout');

		}

	});

	/*-------------------- MODULE --------------------*/

	return {
		id:'userActionsHome',
		level:30,
		view:View
	};

});
