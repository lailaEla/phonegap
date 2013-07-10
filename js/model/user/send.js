// Filename model/user/send.js
define([
	'backbone',
	'underscore',
	'utils'
], function(Backbone, _, Utils){

	/*-------------------- CONFIG --------------------*/
	var today = new Date(); 
		dd = today.getDate(), 
		mm = today.getMonth()+1,//January is 0! 
		yyyy = today.getFullYear(); 

		if(dd<10){dd='0'+dd} 
		if(mm<10){mm='0'+mm}

	var DateNow = dd + '/' + mm + '/' + yyyy;

	var Model = Backbone.Model.extend({
			defaults:{
				completed:0,
				'@class':'transfer',
				subject:'',
				message:'',
				dateToBeExecuted: DateNow,
				recipientLogins:'',
				currencyCode:'EUR',
				//periodicity:'',
				//dayNumber:'',
				recurrenceEndDate: DateNow,				
				//recallEmail:false,
				//meanOfPaymentId:'',
				//imageBase64:'',
				amount:'',
				means:[],
				options:false,
				transfertType:'Unique',								
				transfertTypes:[
					{
						label:'Hebdomadaire',
						options:[
							{ label:'Lundi', value:'1' },
							{ label:'Mardi', value:'2' },
							{ label:'Mercredi', value:'3' },
							{ label:'Jeudi', value:'4' },
							{ label:'Vendredi', value:'5' },
							{ label:'Samedi', value:'6' },
							{ label:'Dimanche', value:'7' }
						]
					},
					{
						label:'Mensuel',
						options:[
							{ label:'Le 1er', value:'m1' },
							{ label:'Le 2', value:'m2' },
							{ label:'Le 3', value:'m3' },
							{ label:'Le 4', value:'m4' },
							{ label:'Le 5', value:'m5' },
							{ label:'Le 6', value:'m6' },
							{ label:'Le 7', value:'m7' },
							{ label:'Le 8', value:'m8' },
							{ label:'Le 9', value:'m9' },
							{ label:'Le 10', value:'m10' },
							{ label:'Le 11', value:'m11' },
							{ label:'Le 12', value:'m12' },
							{ label:'Le 13', value:'m13' },
							{ label:'Le 14', value:'m14' },
							{ label:'Le 15', value:'m15' },
							{ label:'Le 16', value:'m16' },
							{ label:'Le 17', value:'m17' },
							{ label:'Le 18', value:'m18' },
							{ label:'Le 19', value:'m19' },
							{ label:'Le 20', value:'m20' },
							{ label:'Le 21', value:'m21' },
							{ label:'Le 22', value:'m22' },
							{ label:'Le 23', value:'m23' },
							{ label:'Le 24', value:'m24' },
							{ label:'Le 26', value:'m26' },
							{ label:'Le 26', value:'m26' },
							{ label:'Le 27', value:'m27' },
							{ label:'Le 28', value:'m28' },
							{ label:'Le 29', value:'m29' },
							{ label:'Le 30', value:'m30' },
							{ label:'Le 31', value:'m31' }
						]
					}
				],
				endDate:false
			},
			/* Manual reset, preserve AJAX's updated values */
			reset:function(){
				/* Memorize AJAX's updated values */
				var means = this.get('means'),
					/* Extend defaults model with memorized values */
					updatedDefaults = $.extend(this.defaults,{ means:means });
				/* Clear model with extended defaults values, implicitly triggers change event */
				this.set(updatedDefaults);
			}
		}),
		Instance = new Model();

	/*-------------------- AJAX UPDATES --------------------*/

	Utils.service.call({
		name:'getMeanOfPaymentList/',
		data:{
			token:Utils.storage.get('token')
		},
		success:function(response){
			Instance.set({
				'means':response.meanOfPaymentList
			});
			Utils.service.finish();// remove class loading
		}
	});

	// Return the model for the module
	return Instance;

});