// Filename: view/join/step1.js
define([
	'jquery',
	'jqueryvalidator',
	'underscore',
	'backbone',
	'utils',
	'model/join',
	'text!templates/join/step1.html'
], function($, jqueryvalidator, _, Backbone, Utils, JoinModel, Tpl){

	/*-------------------- CONFIG --------------------*/

	var View = Backbone.View.extend({
		initialize : function() {
	        //$(document).on('keydown', $.proxy(this.getCiytByCode, this));

	    },
		/*-------------------- EVENTS --------------------*/

		events:{
			'submit .joinForm':'validateStep',
			'change input:not([type="submit"]),select':'memorize',
			'click input[type="radio"]':'dummy',
			'keydown .zipCode':'getCiytByCode'
		},

		/*-------------------- HANDLERS --------------------*/

		dummy:function(){  },
		memorize:function(e){

			Utils.form.modelMemorize.call(JoinModel,e.target);

		},
		validateStep:function(e){
			Utils.form.validate(e,function(){
				JoinModel.set({ completed:1 });
				Utils.router.navigate('join/step2',{ trigger:true });
			});
		},
		getCiytByCode:function(e){
			var val = "",
				//arrVille = [],
				town = $('#town'),
				list = $('.listing-ville ul');

				val = $(e.target).val();
				town.val("");
				list.hide();

				setTimeout( function(){
					// test zipCode length
					if( $(e.target).val().length >= 4 ){

						// call WS getCityByZipCode
						Utils.service.call({
							name:'anon/getTownsByPostalCode/'+$(e.target).val(),
							/*data:{
								data:val
							},*/
							success:function(response){
								var resp = response;

								// TET STATUS if is 200 
								if(!resp)
									return;

								if(resp.status && resp.status.http_code !=200){
									// dispatch Erro ville 
									return ;
								}

								var arrVille = resp.towns,
									html = "";

								if( resp.contents ) arrVille = resp.contents.towns;
								
 
								// test if this array contain a lot off tows or not
								if( arrVille ){
									if( arrVille.length == 1 ){

										town.val( arrVille[0] );
										list.hide();

									}else{

										$.each( arrVille, function(indx, ville){
											html+= "<li value="+indx+">"+ville+"</li>";
										});

										if ( html.length > 0 ) list.html(html).show();

										town.val('');

										// on click listing ville
										$('.listing-ville li').click( function(){
								        	$('#town').val( $(this).text() );
								        	$('.listing-ville ul').hide();
								        });
									}
								}
								Utils.service.finish();// remove class loading

							}
						});
					}

				},2); 
		},

		/*-------------------- RENDER --------------------*/

		render:function(){

			/* Vars */
			var	compiledTemplate = _.template(Tpl, { model:JoinModel } );

			/* Append */
			this.$el.html(compiledTemplate);

			// validate form
			Utils.form.validatorForm('personalData');

			/* Update header */
			Utils.header.setLeftButton('Retour','back','#home'); // call home page // javascript:history.back();
			Utils.header.setRightButton('Aide','help','#popin/id/mtra_popup-besoin-aide');

			/* Date */
			$('#birthDate').mobiscroll().date({
				onClose: function(){
					var _this = $(this);
					setTimeout(function(){ _this.valid(); },2);
				}
			});


		}

	});

	/*-------------------- MODULE --------------------*/

	return {
		id:'joinStep1',
		level:3,
		view:View
	};

});
