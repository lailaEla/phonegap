// Filename: view/user/others/settings.js
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'vtools',
	'model/user/others/settings',
	'text!templates/user/others/settings.html'
], function($, _, Backbone, Utils, vtools, SettingsModel, Tpl){

	/*-------------------- CONFIG --------------------*/


	var View = Backbone.View.extend({
		
		/*-------------------- INIT --------------------*/
		
			ModelUITrigger: function(e){
				var _this = e.currentTarget;
				// updates UI by click on checkbox
				if($(_this).hasClass('active') && ! $(_this).parents('p.input').length){
					$(_this).removeClass('active');
				}else{
					$(_this).parents('p.input').find('.check').removeClass('active');
					 $(_this).addClass('active');
				}

				this.updateModel();
			},

		initialize:function(){

			/* View / Model association */
			var that = this;
			/* Bind model changes that need the view to refresh */
			//SettingsModel.bind('change',function(){ that.render(); });

			that.render();

			// Check on LocalStorage for App Setting
			vtools.UpdateLocalSettingByModel(SettingsModel , false);

			// defaut initialize 
			SettingsModel.bind('change',function(e){
				// on Module Change Syncronise change with LocalStorage
			});

			//console.log('the lcoal storgae::::>'  + vtools.localval(SettingsModel).contactshow);

		},

		// initialize the checkbox by vals
		reposeLayout : function(){

		},
		/* Unlink model to prevent multiple binding and save resources */
		unlink:function(){
			SettingsModel.off();
		},

		/*-------------------- EVENT --------------------*/

		//events:{'click .check' : 'updateData'},
		initDomEvents : function(){
			$('.check').on('click',$.proxy(this.ModelUITrigger , this));
		},
		/*-------------------- HANDLERS --------------------*/

		/*-------------------- RENDER --------------------*/


		render:function(){

			/* Vars */
			var compiledTemplate = _.template(Tpl, { model:SettingsModel } );
			
			/* Append */
			this.$el.html(compiledTemplate);

			/* Update header */
			Utils.header.setLeftButton('Retour','back','javascript:history.back();');

			// Listen to Events 
						// init Dom Events
			this.initDomEvents();

			// init UI BY localStorage
			vtools.setUI(SettingsModel , this.$el);
		},
		// update Model on view UI changes

		updateModel : function(){
			var el = this.$el;
			vtools.setModelKey(SettingsModel,el);
		}

	});

	/*-------------------- MODULE --------------------*/

	return {
		id:'userOthersSettings',
		level:41,
		view:View
	};

});
