// Filename: view/user/send/summary.js
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'collection/contacts',
	'model/user/send',
	'text!templates/user/contact.html'
], function($, _, Backbone, Utils, ContactsCollection, SendModel, Tpl){

	/*-------------------- CONFIG --------------------*/

	var View = Backbone.View.extend({
		
		/*-------------------- INIT --------------------*/

		initialize:function(){

			/* View / Model association */
			var that = this;
			/* Bind collection changes that need the view to refresh */
			// ContactsCollection.bind('change',function(){ that.render(); });

		},
		/* Unlink model to prevent multiple binding and save resources */
		unlink:function(){
			// ContactsCollection.off();
		},

		/*-------------------- EVENT --------------------*/

		events:{
			'click .coords li':'setIndentifier'
		},

		/*-------------------- HANDLERS --------------------*/

		setIndentifier:function(e){
			
			var coord = e.target.getAttribute('data-identifier') || $(e.target).parents('li').attr('data-identifier'),
				currents = SendModel.get('recipientLogins'),
				recipients = ('' == currents)? [] : currents.split(','),
				already = false;

			/* Check if entry already exist */
			for(var i=0; i<recipients.length; i++){
				if(coord.toLowerCase() == recipients[i].toLowerCase()){
					already = true;
					break;
				};
			};

			if(!already){
				recipients.push(coord);
				var value = (recipients.length > 1)? recipients.join(',') : recipients[0];
				SendModel.set({ recipientLogins:value },{ silent:true });
				Utils.router.navigate('user/send/form',{ trigger:true });
			} else {
				Utils.popin.open({ data:{ title:'Information', content:'Ce contact déjà présent dans la liste de destinataire !' } });
			}

		},

		/*-------------------- RENDER --------------------*/

		render:function(isGlobal){

			/* Vars */
			var	compiledTemplate = _.template(Tpl, { contactMod:'send', model:ContactsCollection.active });
			
			/* Append */
			this.$el.html(compiledTemplate);

			/* Update header */
			Utils.header.setLeftButton('Retour','back','javascript:history.back();');
			Utils.header.setRightButton('Déconnexion','logout','#logout');

		}

	});

	/*-------------------- MODULE --------------------*/

	return {
		id:'userSendContact',
		level:12,
		view:View
	};

});
