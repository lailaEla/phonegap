// Filename: view/user/others/profile/bank.js
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'model/user/others/profile/bank',
	'text!templates/user/others/profile/bank.html'
], function($, _, Backbone, Utils, BankModel, Tpl){

	/*-------------------- CONFIG --------------------*/

	var View = Backbone.View.extend({
		
		/*-------------------- INIT --------------------*/

		initialize:function(){

			/* View / Model association */
			var that = this;
			/* Bind model changes that need the view to refresh */
			BankModel.bind('change',function(){ that.render(); });

		},
		/* Unlink model to prevent multiple binding and save resources */
		unlink:function(){
			BankModel.off();
		},

		/*-------------------- EVENT --------------------*/

		events:{
			'click input[type="radio"]':'dummy'
		},

		/*-------------------- HANDLERS --------------------*/

		dummy:function(){},
		
		/*-------------------- RENDER --------------------*/

		render:function(){

			/* Vars */
			var	compiledTemplate = _.template(Tpl, { model:BankModel } );
			
			/* Append */
			this.$el.html(compiledTemplate);
			
			/* Update header */
			Utils.header.setLeftButton('Retour','back','javascript:history.back();');

		}

	});

	/*-------------------- MODULE --------------------*/

	return {
		id:'userOthersProfileBank',
		level:42,
		view:View
	};

});
