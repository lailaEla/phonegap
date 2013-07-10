// Filename: view/user/others/news.js
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'model/user/others/news',
	'text!templates/user/others/news.html'
], function($, _, Backbone, Utils, NewsModel, Tpl){

	/*-------------------- CONFIG --------------------*/

	var View = Backbone.View.extend({
		
		/*-------------------- INIT --------------------*/

		initialize:function(){

			/* View / Model association */
			var that = this;
			/* Bind model changes that need the view to refresh */
			NewsModel.bind('change',function(){ that.render(); });

		},
		/* Unlink model to prevent multiple binding and save resources */
		unlink:function(){
			NewsModel.off();
		},

		/*-------------------- EVENT --------------------*/

		events:{},

		/*-------------------- HANDLERS --------------------*/
		
		/*-------------------- RENDER --------------------*/

		render:function(){

			/* Vars */
			var compiledTemplate = _.template(Tpl, { model:NewsModel } );
			
			/* Append */
			this.$el.html(compiledTemplate);

			/* Update header */
			Utils.header.setLeftButton('Retour','back','javascript:history.back();');

		}

	});

	/*-------------------- MODULE --------------------*/

	return {
		id:'userOthersNews',
		level:41,
		view:View
	};

});
