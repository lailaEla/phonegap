// Filename: view/user/others/home.js
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'text!templates/user/others/home.html'
], function($, _, Backbone, Utils, Tpl){

	/*-------------------- CONFIG --------------------*/

	var View = Backbone.View.extend({
		
		/*-------------------- RENDER --------------------*/

		render:function(){

			/* Vars */
			var compiledTemplate = _.template(Tpl, {} );
			
			/* Append */
			this.$el.html(compiledTemplate);

			/* Activate Navigation */
			Utils.navigation.activate(3);
			
			/* Update header */
			Utils.header.setLeftButton();
			Utils.header.setRightButton('Déconnexion','logout','#logout');

		}

	});

	/*-------------------- MODULE --------------------*/

	return {
		id:'userOthersHome',
		level:40,
		view:View
	};

});
