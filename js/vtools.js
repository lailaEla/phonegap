//*
/*  vtools 
**/

define(['jquery' ,'underscore','backbone','utils'] , function($,_,Backbone ,tool){


		// STOP DEBUG
		DEBUG = false;
		var vtools = {},
		processingUpdate = false;

		// check if the setting Object Exist on LocalStorage
		vtools.rowExist = function(row){
			return tool.storage.get(row ,true) ? true : false;
		};

		// return the row on stroge by Module
		vtools.localval = function(model){
			return tool.storage.get(model.get('parent_rows'),true);

		}

		// update ModelVal by Key
		vtools.setModelKey = function(model ,el){
			for(k in model.attributes){
				if($('.'+ k ).length){
					val = $('.'+k).hasClass('active') ? true : false;
					model.set(k , val);	
				}
			}
			// trigger event Model Change Events
			vtools.UpdateLocalSettingByModel(model, true);
		}
		// setUI
		vtools.setUI = function(model ,el){
			var currentRow = vtools.localval(model);
			for(k in currentRow){
				var $k= el.find('.'+k);
				
				if($k.length){
					
					if(Boolean(currentRow[k]) === true){
						$k.addClass('active');
					}else{
						$k.removeClass('active');
					}
				}
			}
		}

		vtools.UpdateLocalSettingByModel = function(model , forceupdate){
			// if the value is forceupdate 
			// the settings will saved on localstorage aginst 
			if(processingUpdate)
				return;
			processingUpdate = true;
			var currentRow = model.get('parent_rows');

			if((! vtools.rowExist(currentRow) )|| forceupdate){
				// The raw object not exist on LocalStorage or update stasus
				for(k in model.attributes){
					tool.storage.set(currentRow,k,model.attributes[k],true);
				}
			}else{
				// read From LocalStorage
				var row = tool.storage.get(currentRow , true);
				for(k in row){
					model.set(k,row[k]);
				}
			}

			// Update task end 
			processingUpdate = false;
		}

		return vtools;
});