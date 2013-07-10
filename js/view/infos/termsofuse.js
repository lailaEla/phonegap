// Filename: view/infos/legals.js
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'text!templates/infos/termsofuse.html'
], function($, _, Backbone, Utils, Tpl){

	/*-------------------- CONFIG --------------------*/

	var View = Backbone.View.extend({
		
		/*-------------------- EVENTS --------------------*/

		events:{},

		/*-------------------- HANDLERS --------------------*/

		/*-------------------- RENDER --------------------*/

		render:function(){

			/* Vars */
			var	compiledTemplate = _.template(Tpl, {} );
			
			/* Append */
			this.$el.html(compiledTemplate);

			/* Update header */
			Utils.header.setLeftButton('Retour','back','javascript:history.back();');
			Utils.header.setRightButton();

		}

	});

	/*-------------------- MODULE --------------------*/

	return {
		id:'termOfUse',
		level:3,
		view:View
	};

});
