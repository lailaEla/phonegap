// Filename collection/contacts.js
define([
	'backbone',
	'underscore',
	'utils'
], function(Backbone, _, Utils){

	/*-------------------- CONFIG --------------------*/

	var Collection = Backbone.Collection.extend({
			initialized:false,
			active:null,
			/* Search */
			search:function(string){

				var result,
					string = no_accent(string);



				return result;

			},
			getContacts:function(){
				
				if(DEBUG) console.log('GetModels call');

				/* Service fetch */
				// Utils.service.call({
				// 	name:'getContactList/',
				// 	success:function(response){
				// 		console.log(response);
				// 	}
				// });

				/* Phongap - Fetch */
				if(PHONEGAP && !this.initialized){
					this.initialized = true;
					
					var that = this,
						options = new ContactFindOptions(),
						fields = ['displayName','name','photos','phoneNumbers','emails'];
					options.multiple = true;
					
					console.log('sis1');
					if(DEBUG) console.log('navigator.contacts.find call');
					
					navigator.contacts.find(fields, function(contacts){
						
						if(DEBUG) console.log('navigator.contacts.find back');
						
						/*  */
						that.update(contacts);
						that.trigger('change');

						/* Encode photos from file system */
						$(that.models).each(function(){
								
							var contact = this,
								id = contact.get('id'),
								photos = contact.get('photos');

							/* Force string */
							contact.set('id',id+'');							

							if(photos){

								var	directContent = (-1 != photos[0].value.indexOf('content://')),
									protocol = (directContent)? '' : 'file://'
									filePath = protocol+photos[0].value;

								/* On Android, direct content:// seems to work */
								if(directContent){
	
									$('#avatar'+id).attr('src',filePath);
	
								/* Use phonegap file reader to retrieve image data, buggy on Android */
								} else {
	
									resolveLocalFileSystemURI(filePath, function(fileEntry){
										fileEntry.file(function(file){
											var reader = new FileReader();
											reader.onloadend = function(evt) {
												var encoded = evt.target.result,
													id = contact.get('id');
	
												contact.set({ photos:encoded },{ silent:true });
												$('#avatar'+id).attr('src',encoded);
											};
											reader.readAsDataURL(file);
										});
									});
	
								};

							};

						});

					}, function(){
						alert('Error');
					}, options);

				};

			}
		}),
		Instance = new Collection();

		/* Automatic sorter */
		Instance.comparator = function(contact){
			var name = contact.get('name');
			return name.familyName || name.formatted;
		};

	// Return the collection for the module
	return Instance;

});