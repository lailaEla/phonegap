// Filename: app.js
define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'view/popin',
	'text!templates/popin.html'
], function($, _, Backbone, Router, Popin, Tpl){

	/* Backbone overrides */
	var OriginalModel = Backbone.Model;
	Backbone.Model = Backbone.Model.extend({
		set:function(attributes, options){
			
			/* Check each values */
			if('object' == typeof attributes && !$.isArray(attributes)){
				for(var i in attributes){
					
					/* If passed value is an object, then try to extend existing object */
					if('object' == typeof attributes[i] && !$.isArray(attributes[i])){
						/* Merge */
						var obj = this.get(i);
						attributes[i] = $.extend(true,obj,attributes[i]);
					};

				};
			};

			return OriginalModel.prototype.set.call(this, attributes, options);
		}
	});


	/* Defered requirment */
	require(['mobiscroll'],function(){

		/* Mobiscroll configuration */
		$.mobiscroll.setDefaults({
			lang:'fr',
			theme:'ios',
			display: 'bottom',
			mode: 'scroller'
		});
		
		$.mobiscroll.i18n.fr = $.extend($.mobiscroll.i18n.fr, {
			cancelText:'Annuler',
			setText:'Valider',
			dateFormat: 'dd/mm/yyyy',
			dateOrder: 'ddMMyy',
			dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
			dayNamesShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
			dayText: 'Jour',
			hourText: 'Heure',
			minuteText: 'Minute',
			monthNames: ['Janvier', 'Févier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
			monthNamesShort: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
			monthText: 'Mois',
			secText: 'Seconde',
			timeFormat: 'HH:ii',
			timeWheels: 'HHii',
			yearText: 'Année'
    	});

	});

	/* Initialiazed the History record */
	Backbone.history.start();

});