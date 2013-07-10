// Filename: passwordRecovery.js
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'model/passwordRecovery',
	'text!templates/passwordRecovery.html'
], function($, _, Backbone, Utils, PasswordModel, PasswordTpl){

	/*-------------------- CONFIG --------------------*/

	var View = Backbone.View.extend({
		
		/*-------------------- INIT --------------------*/

		initialize:function(){

			/* View / Model association */
			var that = this;
			/* Bind model changes that need the view to refresh */
			PasswordModel.bind('change:step',function(){ that.render(); });

		},
		/* Unlink model to prevent multiple binding and save resources */
		unlink:function(){
			PasswordModel.off();
		},
		/*-------------------- EVENTS --------------------*/
		events:{
		
			//'submit .emailForm':'gotoSecretQuestion',
			'submit .emailForm':'getSecretQuestion',
			'submit .answerForm':'sendPassword',
			'change input:not([type="submit"],[type="checkbox"])':'memorize'
		},
		/*-------------------- HANDLERS --------------------*/
		memorize:function(e){
			Utils.form.modelMemorize.call(PasswordModel,e.target);
		},
		// gotoSecretQuestion:function(e){ PasswordModel.set({ step:2, email:  emailForm.email.value}); },
		getSecretQuestion:function(e){
			alert(PasswordModel.get('email'));
				/* Validation */
				Utils.form.validate(e,function(data){
					/* Call service */
					Utils.service.call({
						name:'getUserSecretQuestion/'+PasswordModel.get('email'),
						success:function(response){
							/* Success */
							if(response.secretQuestion){
								PasswordModel.set({
									step:2,
									email: PasswordModel.get('email'),
									question:response.secretQuestion.label
								});
							/* Error */
							} else {};

							Utils.service.finish();// remove class loading
						}
					});
				});
			e.preventDefault();
			return false;
		},
		sendPassword:function(e){
			
			var view = this;

			/* Validation */
			Utils.form.validate(e,function(data){
				
				/* Call service */
				Utils.service.call({
					name:'sendPassword/',
					data:PasswordModel.attributes,
					success:function(response){
						PasswordModel.set({	step:3 });

						Utils.service.finish();// remove class loading
					}
				});

			});

		},

		/*-------------------- RENDER --------------------*/

		render:function(isGlobal){

			/* Is rendering operation called from Router */
			if(isGlobal) PasswordModel.reset();

			/* Vars */
			var	compiledTemplate = _.template(PasswordTpl, { model:PasswordModel });
			
			/* Append */
			this.$el.html(compiledTemplate);

			/* Update header */
			Utils.header.setLeftButton('Retour','back','javascript:history.back();');
			Utils.header.setRightButton('Aide','help','#popin/id/mtra_popup-besoin-aide');

		}

	});

	/*-------------------- MODULE --------------------*/

	return {
		id:'passwordRecovery',
		level:1,
		view:View
	};

});
