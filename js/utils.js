// Filename: utils.js
define([
	'jquery',
	'serialize',
	'underscore',
	'backbone',
	'view/header',
	'view/navigation',
	'errors'
], function($, Serialize, _, Backbone, Header, Navigation, Errors) {

	Utils = {

		/*-------------------- Navigation --------------------*/

		navigation:{
			activate:function(){ Navigation.activate.apply(Navigation,arguments); },
			hide:function(){ Navigation.hide.apply(Navigation,arguments); },
			setBadge:function(){ Navigation.setBadge.apply(Navigation,arguments); }
		},

		/*-------------------- Header --------------------*/

		header:{
			setLeftButton:function(){ Header.setLeftButton.apply(Header,arguments); },
			setRightButton:function(){ Header.setRightButton.apply(Header,arguments); }
		},

		/*-------------------- Session --------------------*/

		session:{
			
			check:function(params){
				var obj = params || {};
					
				obj.valid = obj.valid || function(){};
				obj.expired = obj.expired || function(){};

				if(null != Utils.storage.get('token',false)) obj.valid();
				else obj.expired();
			}

		},


		/*-------------------- Storage --------------------*/
		
		storage:{

			set:function(row,key,value,persistent){

				var type = (persistent)? localStorage : sessionStorage,
					action = (persistent)? 'localStorage' : 'sessionStorage';
				if(type){
					/* get previously stored row */
					var data = Utils.storage.get(row,persistent) || {};
					/* Add key / value pair or update */
					data[key] = value;
					/* Update stored data */
					type.setItem(row,JSON.stringify(data));
					if(DEBUG) console.log(key+' value of '+row+' stored in '+action);
					return true;
				};
				return false;

			},

			get:function(row,persistent){
				
				var type = (persistent)? localStorage : sessionStorage,
					action = (persistent)? 'localStorage' : 'sessionStorage';
				if(type){
					var data = type.getItem(row);
					if(DEBUG) console.log(row+' read from '+action);
					return JSON.parse(data);
				};
				return false;

			},

			destroy:function(row,persistent){
				
				var type = (persistent)? localStorage : sessionStorage,
					action = (persistent)? 'localStorage' : 'sessionStorage',
					rows = ('string' == typeof row)? [row] : row;
				if(type){
					for(var i=0; i<rows.length; i++){
						type.removeItem(rows[i]);
						if(DEBUG) console.log(rows[i]+' removed from '+action);
					};
				};

			},

			clear:function(persistent){
				
				var type = (persistent)? localStorage : sessionStorage,
					action = (persistent)? 'localStorage' : 'sessionStorage';
				if(type){
					type.clear();
					if(DEBUG) console.log(action+' cleared');
				};

			},

			

		},

		/*-------------------- Service Call --------------------*/

		service:{
			call:function(params){
				
				if (DEBUG) console.log("CallService");
				if (DEBUG) console.log(Utils.storage.get('token'));
				if (DEBUG) console.log("params.data > ",params);

				var params = params || {},
					isDir = ('/' == params.name.charAt(params.name.length-1)),
					ext = (ISLOCAL && !isDir)? '.json' : '';
					$(".inner").addClass('loading');

				$.ajax({
				
				    url: SITEURL + 'proxy.php?url='+ encodeURIComponent(CMSURL+params.name+ext) +'&mode=native&full_headers=0&full_status=0',
					//url:CMSURL+params.name+ext,
					cache:false,
					dataType:'json',
					type:'POST',
					data:JSON.stringify(params.data) || {},
					success:params.success || function(){},
					error:function(response){
						if(response.status !=404){
							var err = {};
							try{
								var err = eval('(' + response.responseText + ')');
							}catch(e){
								//if (DEBUG) console.log('ERROR ON SERVER RESPONSE');
								if(response.status == 500){
									Errors.trigger({errorKey: 'server.error'} , false);
								}
									err.crached =  true;
							}
							
							if(! err.crached)
								Errors.trigger(err.error , false); 
						}else{
							Utils.popin.unable();
						}
						//if(params.error) params.error(response); else Utils.popin.offline;

						Utils.service.finish();// remove class loading
					}
				});

			},
			finish: function(){
				$(".loading").removeClass('loading');
			}
		},

		/*-------------------- Form validation --------------------*/

		form:{

			modelMemorize:function(field){
				var root = field.getAttribute('data-root') || field.form.getAttribute('data-root') || false,
					key = field.name,
					value = ('checkbox' == field.type)? field.checked : $(field).val(),
					obj = {};

				/* If is sub object */
				if(root){
					/* Build obj */
					obj[root] = {};
					obj[root][key] = value;
				} else {
					obj[key] = value;
				};
				/* Udpate model */
				this.set(obj);

			},

			validate:function(e,callback){

				var form = e.target,
					$fields = $('input,select,textarea',form).not('input[type="submit"]'),
					row = form.name,
					data = $(form).serializeObject(),
					errors = [],
					lastField = null;

				/* Per field check */
				$fields.each(function(){
					
					/* Memorize value */
					// Utils.form.memorize(this);

					/* Check */
					switch(this.type){
						case 'radio':
							var val = $('input[name="'+this.name+'"]').val(),
								req = ('required' == this.getAttribute('required'));
							if(undefined == val && req) errors.push(this);
							break;
						case 'checkbox':
							var req = ('required' == this.getAttribute('required')),
								checked = this.checked;
							if(req && !checked) errors.push(this);
							break;
						default:
							
							var val = this.value,
								pat = this.getAttribute('pattern') || false,
								reg = (pat)? new RegExp(pat,'ig') : false,
								req = ('required' == this.getAttribute('required'));
							
							/* Check */
							if((req || '' != val) && (pat && !reg.test(val))){
								errors.push(this);
							};
							
							/* Confirmations fields */
							if(lastField && lastField.name+'Clone' == this.name){
								if(lastField.value != this.value){
									errors.push(this);
								};
							};

							break;
					};
					lastField = this;
				});

				/* Callback on success */
				if(0 == errors.length || !VALIDATE){
					callback(data);
				/* Or display errors */
				} else {
					
					/* Message */
					Utils.popin.open({ content:'form-error', data:{} });

					for(var i=0; i<errors.length; i++){
						var field = errors[i];
						$(field).bind('focus click',Utils.form.clear).parents('.field,.sub').addClass('error');
					};
				};

				e.preventDefault();
				return false;

			},
			validatorForm: function(form){ 

				// validate mobile 10 numbers begin with : 6/7 or 06/07
				$.validator.addMethod("mobileNumber", function(value, element) {
				  return ( (value.length == 0) || (_.uniq(value.substring(2,10).split('') ).length > 1 &&  /^06|^07|^6|^7/.test(value) ) ) ? true : false;
				}, "");

				// validate password caracters / must use number(s) and letter(s)
				$.validator.addMethod("passwordValide", function(value, element) {
					return ( value.match(/([a-zA-Z])/) != null && value.match(/([0-9])/) != null ) ? true : false; 
				}, ""); 

				// validate lastname/firstname caracters
				$.validator.addMethod("lettersonly", function(value, element) {
					return this.optional(element) || /^[a-zA-Z- |à|â|æ|ç|é|è|ê|ë|î|ï|ô|œ|ù|û|ü|ÿ|ç|À|Â|Æ|Ç|É|È|Ê|Ë|Î|Ï|Ô|Œ|Ù|Û|Ü|Ÿ]+$/i.test(value);
				}, "");

				// validate Email caracters
				$.validator.addMethod("lettersonlyemail", function(value, element) {
					return this.optional(element) || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(value);//^[a-zA-Z0-9-|@|.|_]+$/i
				}, "");

				// test password status
				$('#password').keyup(function(){
					$('#result').html( Utils.form.checkStrength($('#password').val()) );
				});

				// validate date
				jQuery.validator.addMethod("DateValide", function(value, element, params) { 
					var today = new Date();

						dd = today.getDate(), 
						mm = today.getMonth() + 1,//January is 0! 
						yyyy = today.getFullYear(),
						value = value.split('/'),
						date2 = value[2] +"/"+ value[1] +"/"+ value[0]; 

						if(dd<10){dd='0'+dd} 
						if(mm<10){mm='0'+mm}

					var DateNow = yyyy + '/' + mm + '/' + dd;

					var	age = Math.abs( ( new Date( DateNow ) - new Date(date2) ) / (1000 * 60 * 60 * 24 * 365) ); 
					
				    return (  age >= 18 ) ? true : false;
				   // } 
				},'');
	 
				// form validate / step1 / step2 / step 3
				 var validator = $('form[data-root= '+form+']').validate({
					rules: {
						firstName: { 
							maxlength: 20,
							lettersonly: true
						},
						lastName: { 
							maxlength: 40,
							lettersonly: true
						},
						address: { 
							maxlength: 32
						},
						zipCode: { 
							number: true,
							minlength: 4,
							maxlength: 5
						},
						password: {
							required: true,
							minlength: 5,
							maxlength: 25,
							passwordValide: true
						},
					    passwordClone: {
					    	required: true,
					      	equalTo: "#password",
							passwordValide: true
					    },
						 email: {
							required: true,
							maxlength: 70,
							lettersonlyemail: true
						},
					    emailClone: {
					    	required: true,
					     	equalTo: "#email"
					    },
					    birthDate: {
					    	DateValide: true
					    },
					    professionnalCategory:{
					    	required: true
					    },
					    mobile: {
					    	number: true, 
							minlength: 10,
							maxlength: 10,
							mobileNumber: true
					    },
					    secretQuestionAnswer:{
					    	maxlength: 30
					    },
					    cardCode:{
					    	required: true,
					    	number: true
					    },
					    crypto:{
					    	required: true,
					    	number: true
					    }
					},
					messages: {
						firstName: "",
						lastName: "",
						zipCode: "",
						password: "",
						birthDate: "",
						professionnalCategory: "",
						mobile: "",
						secretQuestionAnswer: "",
						cardCode: ""
					},

					errorPlacement: function(error, element) {

					},

					highlight: function(element, errorClass, validClass) {
						var $item = $(element);
					    $item.parents('.field').addClass('error'); 
					},

					unhighlight: function(element, errorClass, validClass) {

					    $(element).parents('.field').removeClass('error');

					},
					invalidHandler: function(f, v) {

							Errors.loadErrorTextById( v.errorList ); 
					}
				});

				/* 
				* Trigger Error on Blur on each input text
				*/
				$('form[data-root= '+form+']').find('input').blur(function(){
					$(this).valid();
				});

			},
			checkStrength: function(password){
			    
				//initial strength
			    var strength = 0;
				
			    //if the password length is less than 5, return message.
			    if (password.length < 5) { 

					$('#result').removeClass();
					$('#result').addClass('short');
					return 'Trés faible';

				}
			    
			    //length is ok, lets continue.
				
				//if length is 6 characters or more, increase strength value
				if (password.length > 5) strength += 1;
				
				//if password contains both lower and uppercase characters, increase strength value
				if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))  strength += 1;
				
				//if it has numbers and characters, increase strength value
				if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/))  strength += 1;
				
				//if it has one special character, increase strength value
			    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~,",',(,-,è,ç,à,),=,+,°])/))  strength += 1;
				
				//if it has two special characters, increase strength value
			    if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1;
				
				//now we have calculated strength value, we can return messages
				
				//if value is less than 2
				if (strength < 2 ) {

					$('#result').removeClass();
					$('#result').addClass('weak');
					return 'Faible';

				} else if (strength == 2 ) {

					$('#result').removeClass();
					$('#result').addClass('good');
					return 'Moyen';

				} else {

					$('#result').removeClass();
					$('#result').addClass('strong');
					return 'Fort';

				}

			},

			clear:function(){
				$(this).unbind('focus click',Utils.form.clear).parents('.field,.sub').removeClass('error');
			}

		},

		/*-------------------- File --------------------*/
		file:{
			check:function(){
				
			},
			load:function(){

			}
		},

		/*-------------------- Popin --------------------*/
		popin:{
			opened:null,
			open:function(data){				

				require(['view/popin'],function(Popin){
					Popin.load(data);
				});

			},
			offline:function(){
				
				Utils.router.navigate('popin/content/connexion-error',{ trigger:true });

			},
			unable:function(){
				
				Utils.popin.open({ data:{ title:'Erreur', content:'Impossible de charger cette ressource.' } });
				
			}
		}

	};

	/*-------------------- Deffered router - Circular dependencie --------------------*/

	require(['router'],function(Router){
		
		Utils.router = {
			navigate:function(){ Router.navigate.apply(Router,arguments); }
		}

	});


	return Utils;

});
