// Filename: main.js

/* Require config */
require.config({
	catchError:true,
	paths: {
		jquery: 'lib/jquery/jquery-min',
		serialize: 'lib/jquery/jquery-serialize',
		mobiscroll: 'lib/mobiscroll/mobiscroll.custom-2.4.2.min',
		underscore: 'lib/underscore/underscore-min',
		backbone: 'lib/backbone/backbone-min',
		templates: '../templates'
	}
});

require(['app']);

/* OVERALL */
if(!console) console = {};
if(!console.log) console.log = function(msg){ alert(msg); };

// No accent 
// http://xuxu.fr/2006/05/20/supprimer-les-accents-d-une-chaine-javascript/
// http://xuxu.fr/2006/05/20/preg-replace-javascript/
function no_accent(my_string){
	var	new_string = '',
		pattern_accent = new Array('é', 'è', 'ê', 'ë', 'ç', 'à', 'â', 'ä', 'î', 'ï', 'ù', 'ô', 'ó', 'ö'),
		pattern_replace_accent = new Array('e', 'e', 'e', 'e', 'c', 'a', 'a', 'a', 'i', 'i', 'u', 'o', 'o', 'o');
	if (my_string && my_string!= '') {
		new_string = preg_replace (pattern_accent, pattern_replace_accent, my_string);
	};
	return new_string;
}
function preg_replace (array_pattern, array_pattern_replace, my_string){
	var new_string = String (my_string);
	for (i=0; i<array_pattern.length; i++) {
		var	reg_exp= RegExp(array_pattern[i], 'gi'),
			val_to_replace = array_pattern_replace[i];
		new_string = new_string.replace (reg_exp, val_to_replace);
	};
	return new_string;
}

var	Utils = {},
	DEBUG = true,
	PHONEGAP = false,
	VALIDATE = false,
	ISLOCAL = true,
	SITEURL = 'http://kwixo.local/',
	//SITEURL = 'http://10.32.68.66/Kwixo/www/',
	CMSURL = 'http://kwixo.local/CMS/json/',
	//CMSURL = 'http://recette.kwixo.com/homebows/json/',
	//CMSURL = 'http://10.32.68.66/Kwixo/www/CMS/json/',
	ISTOUCH = 'ontouchstart' in window,
	STARTEVENT = (ISTOUCH)? 'touchstart' : 'mousedown',
	MOVEEVENT = (ISTOUCH)? 'touchmove' : 'mousemove',
	ENDEVENT = (ISTOUCH)? 'touchend' : 'mouseup';
	ORIENTATIONEVENT = ('onorientationchange' in window)? 'orientationchange' : 'resize';

/* Test if Cordova loaded and inside a webview */
document.addEventListener("deviceready", function(){
	PHONEGAP = true;
}, false);