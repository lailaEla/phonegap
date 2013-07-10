// Filename: view/join/step3.js
define([
	'jquery',
	'jqueryvalidator',
	'underscore',
	'backbone',
	'utils',
	'model/join',
	'text!templates/join/step3.html'
], function($, jqueryvalidator, _, Backbone, Utils, JoinModel, Tpl){

	/*-------------------- CONFIG --------------------*/

	var View = Backbone.View.extend({
		
		/*-------------------- EVENTS --------------------*/

		events:{
			'submit .joinForm':'validateStep',
			'change input:not([type="submit"],[type="checkbox"]),select':'memorize'
		},

		/*-------------------- HANDLERS --------------------*/

		memorize:function(e){

			Utils.form.modelMemorize.call(JoinModel,e.target);

		},
		validateStep:function(e){
			Utils.form.validate(e,function(){
				JoinModel.set({ completed:3 });
				Utils.router.navigate('join/final',{ trigger:true });
			});
		},

		/*-------------------- RENDER --------------------*/

		render:function(){

			/* Prevent direct access */
			var auth = (2 == JoinModel.get('completed'))
			if(!auth) Utils.router.navigate('join/step1',{ trigger:true, replace:true });

			/* Vars */
			var	compiledTemplate = _.template(Tpl, { model:JoinModel } );

			/* Append */
			this.$el.html(compiledTemplate);

			
			// validate form step 1
			Utils.form.validatorForm('bankData');

			/* Update header */
			Utils.header.setLeftButton('Retour','back','#join/step2'); // call step2 javascript:history.back();
			Utils.header.setRightButton('Aide','help','#popin/id/mtra_popup-besoin-aide');

		}

	});

	/*-------------------- MODULE --------------------*/

	return {
		id:'joinStep3',
		level:5,
		view:View
	};

});
