// Filename: view/user/send/summary.js
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'collection/contacts',
	'model/user/send',
	'text!templates/user/contacts.html'
], function($, _, Backbone, Utils, ContactsCollection, SendModel, Tpl){

	/*-------------------- CONFIG --------------------*/

	var View = Backbone.View.extend({
		
		/*-------------------- INIT --------------------*/

		initialize:function(){

			/* View / Model association */
			var that = this;
			setTimeout(function(){
				ContactsCollection.getContacts();
			},500);
			/* Bind collection changes that need the view to refresh */
			ContactsCollection.bind('change',function(){ that.render(); });

		},
		/* Unlink model to prevent multiple binding and save resources */
		unlink:function(){
			ContactsCollection.off();
		},

		/*-------------------- EVENT --------------------*/

		events:{},

		/*-------------------- HANDLERS --------------------*/

		dummy:function(){ },

		/*-------------------- RENDER --------------------*/

		render:function(isGlobal){
					   
			/* Vars */
			var	compiledTemplate = _.template(Tpl, { contactMod:'send', collection:ContactsCollection });
			
			/* Append */
			this.$el.html(compiledTemplate);

			/* Update header */
			Utils.header.setLeftButton('Retour','back','javascript:history.back();');
			Utils.header.setRightButton('Déconnexion','logout','#logout');

		}

	});

	/*-------------------- MODULE --------------------*/

	return {
		id:'userSendContacts',
		level:11,
		view:View
	};

});
