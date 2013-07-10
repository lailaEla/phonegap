// Filename: header.js
define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone){

	/*-------------------- CONFIG --------------------*/

	var HeaderView = Backbone.View.extend({
		
		el:$('header'),

		setLeftButton:function(text,css,href){
			// Remove previous buttons
			this.$el.find('.leftButton').remove();
			// Append new button if has
			if(text && css && href)	this.$el.append('<a href="'+href+'" class="leftButton '+css+'">'+text+'</a>').find('.leftButton');
		},

		setRightButton:function(text,css,href){
			// Remove previous buttons
			this.$el.find('.rightButton').remove();
			// Append new button if has
			if(text && css && href)	this.$el.append('<a href="'+href+'" class="rightButton '+css+'">'+text+'</a>').find('.rightButton');
		}


	});

	/*-------------------- INIT --------------------*/

	if(DEBUG) console.log('Header initialized');

	/* Instanciate the view */
	var Header = new HeaderView();

	return Header;

});
