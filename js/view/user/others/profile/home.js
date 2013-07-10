// Filename: view/user/others/profile/home.js
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'text!templates/user/others/profile/home.html'
], function($, _, Backbone, Utils, Tpl){

	/*-------------------- CONFIG --------------------*/

	var View = Backbone.View.extend({
		
		/*-------------------- RENDER --------------------*/

		render:function(){

			/* Vars */
			var compiledTemplate = _.template(Tpl, {} );
			
			/* Append */
			this.$el.html(compiledTemplate);
			
			/* Update header */
			Utils.header.setLeftButton('Retour','back','javascript:history.back();');

		}

	});

	/*-------------------- MODULE --------------------*/

	return {
		id:'userOthersProfileHome',
		level:41,
		view:View
	};

});
