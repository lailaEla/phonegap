// Filename: view/infos/security.js
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'text!templates/infos/security.html'
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
		id:'infosSecurity',
		level:3,
		view:View
	};

});
