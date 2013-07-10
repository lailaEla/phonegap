// Filename: view/join/home.js
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'text!templates/join/home.html'
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
			Utils.header.setLeftButton('Infos','infos','#infos/home');
			Utils.header.setRightButton('Demo','demo','#demo');

		}

	});

	/*-------------------- MODULE --------------------*/

	return {
		id:'joinHome',
		level:1,
		view:View
	};

});
