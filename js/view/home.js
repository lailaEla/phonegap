// Filename: view/home.js
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'model/home',
	'text!templates/home.html',
], function($, _, Backbone, Utils, HomeModel, Tpl){

	/*-------------------- CONFIG --------------------*/

	var View = Backbone.View.extend({
		
		/*-------------------- INIT --------------------*/

		initialize:function(){

			/* View / Model association */
			var that = this;
			/* Bind model changes that need the view to refresh */
			HomeModel.bind('change:type',function(){ that.render(); });

		},
		/* Unlink model to prevent multiple binding and save resources */
		unlink:function(){
			HomeModel.off();
		},

		/*-------------------- EVENTS --------------------*/

		events:{
			'click .mobileTab':'showMobile',
			'click .emailTab':'showEmail',
			'submit .logForm':'callAuth',
			'change input:not([type="submit"],[type="checkbox"]),select':'memorize'
		},

		/*-------------------- HANDLERS --------------------*/

		memorize:function(e){
			
			Utils.form.modelMemorize.call(HomeModel,e.target);

		},
		showMobile:function(){

			HomeModel.set({ type:'mobile' });

		},
		showEmail:function(){

			HomeModel.set({ type:'email' });
			
		},
		callAuth:function(e){
			
			console.log("call Auth");
			
			Utils.form.validate(e,function(serialized){

				var login = serialized.email || serialized.prefix+serialized.mobile || '',
					data = {
						password:serialized.password
					};

				/* Call service */
				
				Utils.service.call({
					name:'signin/'+login,
					data:data,
					success:function(response){
						if(DEBUG) console.log("success response");
						/* Token */
						if(response.token){
							top.location = SITEURL+'#login/'+response.token.key;
						} else {
									Utils.popin.open({ data:{ title:'Erreur', content: response.errorMessage } });
									/* Popin */
									//Utils.router.navigate('popin/content/log-error',{ trigger:true });
						};
						Utils.service.finish();// remove class loading
					}
				});

			});

		},

		/*-------------------- RENDER --------------------*/

		render:function(isGlobal){
			
			/* Vars */
			var	compiledTemplate = _.template(Tpl, { model:HomeModel });

			/* Append */
			this.$el.html(compiledTemplate);

			/* Update header */
			Utils.header.setLeftButton('Infos','infos','#infos/home');
			Utils.header.setRightButton('Demo','demo','#demo');
			
			/* Hide Navigation */
			Utils.navigation.hide();

		}

	});

	/*-------------------- MODULE --------------------*/

	return {
		id:'home',
		level:0,
		view:View
	};

});
