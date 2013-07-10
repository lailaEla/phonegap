// Filename: view/user/actions/list.js
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'model/user/actions/list',
	'text!templates/user/actions/list.html'
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


		}

	});

	/*-------------------- MODULE --------------------*/

	return {
		id:'userActionsList',
		level:31,
		view:View
	};

});
