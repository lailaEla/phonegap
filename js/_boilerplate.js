// Filename: view/xxx.js
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'model/XXX',
	'text!templates/XXX'
], function($, _, Backbone, Utils, Model, Tpl){

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
			var	compiledTemplate = _.template(Tpl, { model:Model} );
			
			/* Append */
			this.$el.html(compiledTemplate);

			/* Update header */
			Utils.header.setLeftButton();
			Utils.header.setRightButton('Déconnexion','logout','#logout');

		}

	});

	/*-------------------- MODULE --------------------*/

	return {
		id:'uniqueId',
		level:0,
		view:View
	};

});
