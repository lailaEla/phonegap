// Filename: view/user/send/form.js
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'model/user/send',
	'text!templates/user/send/form.html'
], function($, _, Backbone, Utils, SendModel, Tpl){

	/*-------------------- CONFIG --------------------*/

	var View = Backbone.View.extend({
		
		/*-------------------- INIT --------------------*/

		initialize:function(){

			/* View / Model association */
			var that = this;
			/* Bind model changes that need the view to refresh */
			SendModel.bind('change:means',function(){ that.render(); });
			SendModel.bind('change:options',function(){ that.render(); });
			SendModel.bind('change:transfertType',function(){ that.render(); });
			SendModel.bind('change:endDate',function(){ that.render(); });

		},
		/* Unlink model to prevent multiple binding and save resources */
		unlink:function(){
			SendModel.off();
		},

		/*-------------------- EVENT --------------------*/

		events:{
			'submit form':'validate',
			'change input:not([type="submit"],[type="checkbox"]),.toggle,select,textarea':'memorize',
			'click input[type="reset"]':'clearForm',
			'click .folder':'toggleOptions',
			'click .photoLib':'choosePhoto',
			'click .photoCam':'takePhoto',
			'click .toggle':'dummy'
		},

		/*-------------------- HANDLERS --------------------*/

		dummy:function(){ },
		memorize:function(e){
			
			Utils.form.modelMemorize.call(SendModel, e.target);

		},
		toggleOptions:function(e){

			var open = SendModel.get('options');
			SendModel.set({ options:!open });

		},
		clearForm:function(){

			SendModel.reset();

		},
		validate:function(e){
			
			Utils.form.validate(e,function(serialized){
				
				SendModel.set({ completed:1 });
				Utils.router.navigate('user/send/summary',{ trigger:true });

			});
		},
		choosePhoto:function(){
			navigator.camera.getPicture(function(data){
				console.log('photo success');
				Utils.popin.open({ data:{ title:'Output', content:'<img src="data:image/jpeg;base64,'+data+'" />' } });
			},function(){
				console.log('photo error');
			},{ destinationType:Camera.DestinationType.DATA_URL, correctOrientation:true, saveToPhotoAlbum:true, targetWidth:150, sourceType:Camera.PictureSourceType.PHOTOLIBRARY });
		},
		takePhoto:function(){
			navigator.camera.getPicture(function(data){
				console.log('photo success');
				Utils.popin.open({ data:{ title:'Output', content:'<img src="data:image/jpeg;base64,'+data+'" />' } });
			},function(){
				console.log('photo error');
			},{ destinationType:Camera.DestinationType.DATA_URL, correctOrientation:true, saveToPhotoAlbum:true, targetWidth:150, sourceType:Camera.PictureSourceType.CAMERA });
		},

		/*-------------------- RENDER --------------------*/

		render:function(isGlobal){

			/* Vars */
			var	compiledTemplate = _.template(Tpl, { model:SendModel} );
			
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
			Utils.navigation.activate(0);

		}

	});

	/*-------------------- MODULE --------------------*/

	return {
		id:'userSendForm',
		level:10,
		view:View
	};

});
