// Filename: view/join/final.js
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'model/join',
	'text!templates/join/final.html'
], function($, _, Backbone, Utils, JoinModel, Tpl){

	/*-------------------- CONFIG --------------------*/

	var View = Backbone.View.extend({
		
		/*-------------------- EVENTS --------------------*/

		events:{},

		/*-------------------- HANDLERS --------------------*/

		/*-------------------- RENDER --------------------*/

		render:function(){

			/* Prevent direct access */
			var auth = (3 == JoinModel.get('completed'));
			
			if(!auth) Utils.router.navigate('join/step1',{ trigger:true, replace:true });

			/* Vars */
			var	compiledTemplate = _.template(Tpl, { model:JoinModel } );

			/* Clear session storage */
			JoinModel.reset();

			/* Append */
			this.$el.html(compiledTemplate);

			/* Update header */
			Utils.header.setLeftButton();
			Utils.header.setRightButton('Aide','help','#popin/id/mtra_popup-besoin-aide');

		}

	});

	/*-------------------- MODULE --------------------*/

	return {
		id:'joinFinal',
		level:6,
		view:View
	};

});
