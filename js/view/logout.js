// Filename: view/logout.js
define([
	'jquery',
	'underscore',
	'backbone',
	'utils'
], function($, _, Backbone, Utils){

	/*-------------------- CONFIG --------------------*/

	var View = Backbone.View.extend({
		
		render:function(){
			
			var data = { token:Utils.storage.get('token') };

			/* Call service */
			Utils.service.call({
				name:'signout/',
				data:data,
				success:function(response){

					/* Kill session */
					Utils.storage.destroy('token',false);
					Utils.router.navigate('home',{ trigger:true, replace:true });

					Utils.service.finish();// remove class loading

				}
			});

		}

	});

	/*-------------------- MODULE --------------------*/

	return {
		id:'logout',
		level:-1,
		view:View
	};

});
