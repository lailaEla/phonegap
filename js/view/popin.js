// Filename: view/popin.js
define([
	'jquery',
	'underscore',
	'backbone',
	'utils',
	'text!templates/popin.html'
], function($, _, Backbone, Utils, Tpl){

	/*-------------------- CONFIG --------------------*/

	var PopinView = Backbone.View.extend({

		className:'popin',

		events:{
			'click .close':'close',
			'click .cancel':'cancel',
			'click .valid':'valid'
		},

		/* Handlers */

		close:function(){

			var that = this;
			that.$el.removeClass('display');
			setTimeout(function(){
				that.destroy();
			},500);

		},
		valid:function(){ this.close(); },
		cancel:function(){ this.close(); },

		/* Init and render */
		
		initialize:function(params){

			/* Binds callbacks */
			if(!params.contentid && !params.content) this.back = this.close;
			if(params.data.valid && true != params.data.valid) this.valid = params.data.valid;
			if(params.data.cancel && true != params.data.cancel) this.cancel = params.data.cancel;

			/* Render */
			this.render(params);

		},

		render:function(params){

			/* Vars */
			var	that = this,
				params = params || { data:{ }},
				compiledTemplate = _.template(Tpl, params );

			// Append
			that.$el.html(compiledTemplate).appendTo(document.body);
			setTimeout(function(){ that.$el.addClass('display'); },0);

		},

		destroy:function(){
			this.unbind();
			this.remove();
		}

	});

	/*-------------------- METHODS --------------------*/

	if(DEBUG) console.log('Popin module loaded');

	var load = function(params){
			/* Call AJAX if has a contentid */
			if(params.contentid){
				ext = (ISLOCAL && !isDir)? '.json' : '';
				$.ajax({
					url: SITEURL + 'proxy.php?url='+ encodeURIComponent(CMSURL + 'anon/getContent/' + params.contentid + ext) +'&mode=native&full_headers=0&full_status=0',
					//url:CMSURL+'anon/getContent/' + params.contentid + ext,
					cache:false,
					dataType:'json',
					type:'POST',
					data:JSON.stringify(params.data) || {},
					success:params.success || function(response){ 
																		if(response.error){
																			getLocal(params);
																		} else {
																			params.data.content = response.content;
																			create(params);
																		}
																}, error:function(response){ }
				});
			/* IF has a local content, get local version  and if the forcemessage is false if not the*/
			} else if(params.content && !(params.forcemessage)) {
				getLocal(params);
			/* Else just build popin with passed parameters */
			} else {
				create(params);
			};
		},
		getLocal = function(params){
			
			var file = params.contentid || params.content;
			require(['text!templates/popin/'+file+'.html'],function(tpl){
				
				/* Store content data */
				if('' != tpl) params.data.content = tpl;
				create(params);

			} //,Utils.popin.unable
			); 

		},
		create = function(params){
			/* Instanciate the view 

			test if the Popin is Already Loaded */

		if(!$(document.body).find('.popin').length)
			var Popin = new PopinView(params);
		};

	return {
		load:load,
		create : create,
		getLocal : getLocal
	};

});
