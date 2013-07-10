// Filename model/user/others/profile.js
define([
	'backbone',
	'underscore',
	'utils'
], function(Backbone, _, Utils){

	/*-------------------- CONFIG --------------------*/

	var Model = Backbone.Model.extend({
			defaults:{
				loading:false,
						parent_rows : 'applicationSetting',   // the parent rows on LocalStorage 
						contactshowfirstname :true,						// show contacts by first name (true) or last name (false)
						contactshowlastname :false,						// show contacts by first name (true) or last name (false)
						contactfilterfirstname : true,					// filter by first name (true) of last name (false)  
						contactfilterlastname : false,					// filter by first name (true) of last name (false)  
						profilenewsletter :false, 				// receve the newsletter or partenaires kwixo
						profile_transfer_info_email : true,  	// information transfert money (sms & email)
						profile_transfer_info_sms : false,
						profile_rapple2days : true , 			// transfert action alert days-2  befor 2 days 
						profile_conxprofilekwixo : true,		// connect to kwiox's profil
						profile_editable_email : true,	
						profile_editable_sms : false,			// CHange the identication password etc
						profile_deliveryinfo_email : true, 		
						profile_deliveryinfo_sms: false,
						problemsnotifier_email : true,
						problemsnotifier_sms : false	
			}


		}),
		Instance = new Model();

	//Instance.getInformations();
	
	// Return the model for the module
	return Instance;

});