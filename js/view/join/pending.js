// Filename: view/join/pending.js
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'model/join',
	'text!templates/join/pending.html'
], function($, _, Backbone, Utils, JoinModel, Tpl){

	/*-------------------- CONFIG --------------------*/

	var View = Backbone.View.extend({
		
		/*-------------------- INIT --------------------*/

		initialize:function(){

			/* View / Model association */
			var that = this;
			/* Bind model changes that need the view to refresh */
			JoinModel.bind('change:pending',function(){ that.render(); });

		},
		/* Unlink model to prevent multiple binding and save resources */
		unlink:function(){
			JoinModel.off();
		},
		
		/*-------------------- EVENTS --------------------*/

		events:{
			'submit .pendingForm':'callCodeCheck',
			'change input:not([type="submit"],[type="checkbox"]),select':'memorize',
			'click input[type="radio"]':'dummy'
		},

		/*-------------------- HANDLERS --------------------*/

		dummy:function(){  },
		memorize:function(e){

			Utils.form.modelMemorize.call(JoinModel,e.target);

		},
		callCodeCheck:function(e){
			
			Utils.form.validate(e,function(serialized){

				if(DEBUG) console.log('callCodeCheck');

				Utils.router.navigate('join/step1',{ trigger:true, replace:true });

				return;

				/* Call service */
				Utils.service.call({
					name:'signin/'+login,
					data:data,
					success:function(response){
						Utils.service.finish();// remove class loading
						

					}
				});

			});

		},

		/*-------------------- RENDER --------------------*/

		render:function(){
			
			/* Vars */
			var	compiledTemplate = _.template(Tpl, { model:JoinModel });
			
			/* Append */
			this.$el.html(compiledTemplate);

			/* Update header */
			Utils.header.setLeftButton('Retour','back','javascript:history.back();');
			Utils.header.setRightButton('Aide','help','#popin/id/mtra_popup-besoin-aide');

		}

	});

	/*-------------------- MODULE --------------------*/

	return {
		id:'joinPending',
		level:2,
		view:View
	};

});
