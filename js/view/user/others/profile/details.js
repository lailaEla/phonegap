// Filename: view/user/others/profile/details.js
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'model/user/others/profile/history',
	'model/user/others/profile/details',
	'text!templates/user/others/profile/details.html'
], function($, _, Backbone, Utils, ListModel, DetailModel, Tpl){

	/*-------------------- CONFIG --------------------*/

	var View = Backbone.View.extend({
		
		/*-------------------- INIT --------------------*/

		initialize:function(){
			/* View / Model association */

			
			var that = this,
				/* Get current state index to retrieve transaction ID */
				state = ListModel.get('state'),
				cat = state.cat,
				index = state.index,
				type = state.type; 

			DetailModel = ListModel.attributes[type].models[index];
			DetailModel.attributes.type= type;
			
		},
		/* Unlink model to prevent multiple binding and save resources */
		unlink:function(){
			if(this.details) this.details.off();
		},

		/*-------------------- EVENT --------------------*/

		events:{ }, 

		/*-------------------- RENDER --------------------*/
		render:function(isGlobal){
			
			/* Vars */
			var	compiledTemplate = _.template(Tpl, { model:DetailModel } );
			
			//console.log("********* this.details ***********",this.details);
			
			/* Append */
			this.$el.html(compiledTemplate);

			/* Update header */
			Utils.header.setLeftButton('Retour','back','javascript:history.back();');
		}
	});

	/*-------------------- MODULE --------------------*/

	return {
		id:'userOthersProfileDetail',
		level:32,
		view:View
	};

});
