// Filename model/join.js
define([
	'backbone',
	'underscore',
	'utils'
], function(Backbone, _, Utils){

	/*-------------------- CONFIG --------------------*/

	var Model = Backbone.Model.extend({
			defaults:{
				
				/* Overall */
				completed:0,
				pending:'',
				code:'',
				prefixs:[
					{ label:'+33', value:'+33' },
					{ label:'+34', value:'+34' }
				],
				questions:[],
				
				/* Personal Data */
				personalData:{

					civility:'M',
					lastname:'',
					firstName:'',
					birthDate:'',
					address:'',
					zipCode:'',
					town:'',
					countryCode:'FR',
					professionnalCategory:''

				},
				
				/* Security Data */
				securityData:{

					email:'',
					emailClone:'',
					prefix:'',
					mobile:'',
					password:'',
					passwordClone:'',
					secretQuestion:'',
					secretQuestionAnswer:'',
					optin:false,
					termsOfServiceAccepted:false

				},

				/* Bank Data */
				bankData:{

					typecarte:'',
					cardCode:'',
					expMonth:'',
					expYear:'',
					crypto:'',
					cb:''

				}

			},

			/*-------------------- Methods --------------------*/

			getSecretQuestions:function(){
				
				var model = this;

				/* Call for secret questions list */
				Utils.service.call({
					name:'anon/getSecretQuestions/'/*+model.get('personalData').countryCode*/,
					/*data:{
						token:Utils.storage.get('token')
					},*/
					success:function(response){
						model.set({ questions:response.secretQuestions }); 
						$(".loading").removeClass('loading');
						Utils.service.finish();// remove class loading
					}
				});
			},

			reset:function(){
				this.set(this.defaults);
			}
		}),
		Instance = new Model();

	// Return the model for the module
	return Instance;

});