// Filename: view/user/send/summary.js
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'model/user/send',
	'text!templates/user/send/summary.html'
], function($, _, Backbone, Utils, SendModel, Tpl){

	/*-------------------- CONFIG --------------------*/
	var sendinvitation = false,
		 View = Backbone.View.extend({
		
		/*-------------------- INIT --------------------*/
	
		initialize:function(){

			/* View / Model association */
			var that = this;
			/* Bind model changes that need the view to refresh */
			// Model.bind('change:XXX',function(){ that.render(); });

		},
		/* Unlink model to prevent multiple binding and save resources */
		unlink:function(){
			// Model.off();
		},

		/*-------------------- EVENT --------------------*/

		events:{
			'submit form':'submitTransfert'
		},

		/*-------------------- HANDLERS --------------------*/

		dummy:function(){ },
		UIEvetns : function(e){
			var _this = e.currentTarget;
			_this = $(_this).find('.check');
				if($(_this).hasClass('active')){
					$(_this).removeClass('active');
					sendinvitation = false;
				}
				else{
					$(_this).addClass('active');
					sendinvitation = true;
				}
					
		},
		initDomEvents : function(){
			this.$el.find('p.input').on('click',$.proxy(this.UIEvetns , this));
		},
		submitTransfert:function(e){

			/* Format data for request */
			var attr = SendModel.attributes,
				that = this;
				data = {
					token:Utils.storage.get('token',false),
					parameter:$.extend(attr,{
						// temp desctive
						//recipientLogins:attr.recipientLogins.split(',')
					})
				};
			/* Call service */
			Utils.service.call({
				name:'makeTransferDonation/'+attr.amount,
				data:data,
				success:function(response){
					
					//send Invitation to add Contact to Web Server if the check box is checked
					if(sendinvitation){
						Utils.service.call({
							name : 'makeInvitation/'+SendModel.get('recipientLogins'),
							data : data,
							success : function(response){
								// if the invitation sended sccuesfuly  to web service to Email
								Utils.router.navigate('user/send/success',{ trigger:true });

								Utils.service.finish();// remove class loading
							}
						});
					}

				}
			});

			e.preventDefault();
			return false;

		},

		/*-------------------- RENDER --------------------*/

		render:function(isGlobal){
			
			/* Prevent direct access */
			var auth = (1 == SendModel.get('completed'))
			if(!auth) Utils.router.navigate('user/send/form',{ trigger:true, replace:true });

			/* Vars */
			var	compiledTemplate = _.template(Tpl, { model:SendModel });
			
			/* Append */
			this.$el.html(compiledTemplate);

			/* Update header */
			Utils.header.setLeftButton('Retour','back','javascript:history.back();');
			Utils.header.setRightButton('Déconnexion','logout','#logout');

			this.initDomEvents();
		}

	});

	/*-------------------- MODULE --------------------*/

	return {
		id:'userSendSummary',
		level:11,
		view:View
	};

});
