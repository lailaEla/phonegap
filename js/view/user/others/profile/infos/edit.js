// Filename: view/user/others/profile/infos/edit.js
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'model/user/others/profile/infos',
	'text!templates/user/others/profile/infos/edit.html'
], function($, _, Backbone, Utils, ProfileModel, Tpl){

	/*-------------------- CONFIG --------------------*/

	var View = Backbone.View.extend({
		
		/*-------------------- INIT --------------------*/

		initialize:function(){

			/* View / Model association */
			var that = this;
			/* Bind model changes that need the view to refresh */
			ProfileModel.bind('change',function(){ that.render(); });

		},
		/* Unlink model to prevent multiple binding and save resources */
		unlink:function(){
			ProfileModel.off();
		},
		
		updateInfos:function(e){
			
			/* Format data for request */
			var attr = ProfileModel.attributes,
				data = {
					token:Utils.storage.get('token',false),
					parameter:$.extend(attr,{})
				};
				
				//console.log(parameter);
			
			/* Call service */
			Utils.service.call({
				name:'setCurrentUserInformation/',
				data:data,
				success:function(response){

					Utils.router.navigate('user/others/home',{ trigger:true });

					Utils.service.finish();// remove class loading

				}
			});
			
			e.preventDefault();
			return false;
			
		},

		/*-------------------- EVENTS --------------------*/

		events:{
			'submit .editform':'updateInfos'
		},

		/*-------------------- HANDLERS --------------------*/
		
		/*-------------------- RENDER --------------------*/

		render:function(){

			/* Vars */
			var	compiledTemplate = _.template(Tpl, { model:ProfileModel } );
			
			/* Append */
			this.$el.html(compiledTemplate);
			
			/* Update header */
			Utils.header.setLeftButton('Retour','back','javascript:history.back();');

		}

	});

	/*-------------------- MODULE --------------------*/

	return {
		id:'userOthersProfileInfosEdit',
		level:43,
		view:View
	};

});
