/*
*  Error Systeme Manager
* 
***/
define(['jquery' ,'underscore','backbone','view/popin'] , function($,_,Backbone ,Popin){

	var Erros = {
		/*
		* Extract the Error From key code
		**/

		error : function(err){
		
		if (DEBUG) console.log("ERREUR > ",err);
			err = err.errorKey;
			var arr = err.split('.') || [],
				obj = {};
				obj.technical = ( err === "technical" ) ? true :false;
			if( (arr.length > 1)  && ! obj.technical){
				obj = { space : arr[0] , name :arr[1]};
			}else if(!obj.technical){
				obj.unknown = true;
			}
			return obj;
		},

		/*
		*  Error 404 // on load ressoures
		*/
		unable : function(){
			Popin.load({ data:{ title:'Erreur', content:'Impossible de charger cette ressource.' } });
		},

		/*
		* Return the file path by keycode 
		*/
		path : function(obj){
				//return obj.space+'/'+obj.name;
				return obj.space;
		},

		/*
		* Load Error from Local
		*/
		getLocal : function(er){
			var obj = this.error(er);
			if(obj.technical){
				this.trigger(er,true);
			}else if(obj.space && obj.name){
				this.localLoad({content : er.errorKey});
			}
		},
		trigger : function(err , status){
			if(err && err.errorKey){
				var params = {
						forcemessage : (err.errorKey == 'technical') ? true :false,
						content : err.errorMessage || '',
						title : err.errorKey || 'Error',
					};
				if(status){
					Popin.create({data :params});
				}else{
					this.getLocal(err);
				}
			}else{
				this.unable();
			}
		},
		/*
		*  Load the Error Message on errors.html by keyCode
		*/
		localLoad : function(params){
				var that = this;
			require(['text!templates/popin/errors-ws/errors.html'],function(tpl){
				/* Store content data */
				var errorText = $(tpl).find('*[data-error-class="'+ params.content +'"]').length ?
								$(tpl).find('*[data-error-class="'+ params.content +'"]').html() : 
								$(tpl).find('*[data-error-class="system.errors.keynotfouned"]').html();

				Popin.create({data : {content : errorText}});

			},that.unable); 
		},

		loadErrorTextById : function(items){
			var that = this;
			require(['text!templates/popin/errors-forms.html'],function(tpl){
				var finalMsg = '';
					$.each(items,function(i, item){
						var el = item.element.name,
							val = item.element.value,
						    ttpl = $(tpl).find('.'+ el),
							$class = ttpl.find(val.length == 0 ? '.empty' : '.error'),
							errorText = $(tpl).find('.'+ el).length ? $class.html() : $(tpl).find('.notfouned').html();

							errorText = errorText.replace('__Type__' , el);
							finalMsg += "- " + errorText + "<br>";

					});
		 
				Popin.create({data : {content : finalMsg}});

			},that.unable); 
		}
	};


	return Erros;
});