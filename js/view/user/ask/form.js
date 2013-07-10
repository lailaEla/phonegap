// Filename: view/user/ask/form.js
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'model/user/ask',
	'text!templates/user/ask/form.html'
], function($, _, Backbone, Utils, AskModel, Tpl){

	/*-------------------- CONFIG --------------------*/

	var View = Backbone.View.extend({
		
		/*-------------------- INIT --------------------*/

		initialize:function(){

			/* View / Model association */
			var that = this;
			/* Bind model changes that need the view to refresh */
			AskModel.bind('change:means',function(){ that.render(); });
			AskModel.bind('change:options',function(){ that.render(); });
			AskModel.bind('change:transfertType',function(){ that.render(); });
			AskModel.bind('change:endDate',function(){ that.render(); });

		},
		/* Unlink model to prevent multiple binding and save resources */
		unlink:function(){
			AskModel.off();
		},

		/*-------------------- EVENT --------------------*/

		events:{
			'submit form':'validate',
			'change input:not([type="submit"],[type="checkbox"]),.toggle,select,textarea':'memorize',
			'click input[type="reset"]':'clearForm',
			'click .folder':'toggleOptions',
			'click .toggle':'dummy'
		},

		/*-------------------- HANDLERS --------------------*/

		dummy:function(){ },
		memorize:function(e){
			
			Utils.form.modelMemorize.call(AskModel, e.target);

		},
		toggleOptions:function(e){

			var open = AskModel.get('options');
			AskModel.set({ options:!open });

		},
		clearForm:function(){

			AskModel.reset();

		},
		validate:function(e){
			
			Utils.form.validate(e,function(serialized){
				
				Utils.router.navigate('user/ask/summary',{ trigger:true });

			});
		},

		/*-------------------- RENDER --------------------*/

		render:function(isGlobal){

			/* Vars */
			var	compiledTemplate = _.template(Tpl, { model:AskModel } );
			
			/* Append */
			this.$el.html(compiledTemplate);

			/* Periodicity */
			var concatValue = function(){

					var value = $(this).val(),
						$opt = $(':selected',this),
						optgLabel = $opt.parent().attr('label'),
						$dummy = $('#'+this.id+'_dummy'),
						display = (optgLabel)? optgLabel+' ('+$opt.html()+')' : $opt.html();
					$dummy.val(display);

				};

			$('#periodicity').mobiscroll().select({
				group: true,
				inputClass:'select',
				label: '',
				groupLabel: 'Périodicité',
				onSelect:concatValue
			}).each(concatValue);

			/* Dates */
			var d = new Date(),
				y = d.getFullYear();

			$('#recurrenceEndDate,#dateToBeExecuted').mobiscroll().date({
				startYear:y,
				endYear:y+10
			});

			/* Update header */
			Utils.header.setLeftButton();
			Utils.header.setRightButton('Déconnexion','logout','#logout');

			/* Activate Navigation */
			Utils.navigation.activate(1);

		}

	});

	/*-------------------- MODULE --------------------*/

	return {
		id:'userAskForm',
		level:20,
		view:View
	};

});
