// Filename: view/user/others/profile/infos.js
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'model/user/others/profile/infos',
	'text!templates/user/others/profile/infos.html'
], function($, _, Backbone, Utils, ProfileModel, Tpl){

	/*-------------------- CONFIG --------------------*/

	var View = Backbone.View.extend({
		
		/*-------------------- INIT --------------------*/

		initialize:function(){

			/* View / Model association */
			var that = this;
			/* Bind model changes that need the view to refresh */
			ProfileModel.bind('change',function(){ that.render(); });

		},
		/* Unlink model to prevent multiple binding and save resources */
		unlink:function(){
			ProfileModel.off();
		},

		/*-------------------- EVENT --------------------*/

		events:{},

		/*-------------------- HANDLERS --------------------*/
		
		/*-------------------- RENDER --------------------*/

		render:function(){

			/* Vars */
			var	compiledTemplate = _.template(Tpl, { model:ProfileModel } );
			
			/* Append */
			this.$el.html(compiledTemplate);
			
			/* Update header */
			Utils.header.setLeftButton('Retour','back','javascript:history.back();');

		}

	});

	/*-------------------- MODULE --------------------*/

	return {
		id:'userOthersProfileInfos',
		level:42,
		view:View
	};

});
