/*=========================================================================================
		File Name: form-repeater.js
		Description: Repeat forms or form fields
		----------------------------------------------------------------------------------------
		Item Name: Modern Admin - Clean Bootstrap 4 Dashboard HTML Template
		Author: PIXINVENT
		Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

(function(window, document, $) {
	'use strict';

	// Default
	$('.invoiceformrepeater').repeater(	{
		defaultValues: { 'itext-input': 'foo' },
	show: function () {
$(this).slideDown();
var index = $("#invoicecontent" ).attr("index");
var newindex = parseInt(index) + 1;
var param = parseInt(index) - 1;
$("#invoicecontent" ).attr("index", newindex);
$("[name='car["+index+"][text-input]']").text(newindex);
console.log(newindex);
var soll = $('#mycompdet').attr("soll");
var haben = $('#mycompdet').attr("haben");
var sollname = $('#mycompdet').attr("sollname");
var habenname = $('#mycompdet').attr("habenname");
$("[name='car["+index+"][sollinput]']").val(sollname);
$("[name='car["+index+"][sollinput]']").attr("code", soll);
$("[name='car["+index+"][habeninput]']").val(habenname);
$("[name='car["+index+"][habeninput]']").attr("code", haben);
$("[name='car["+index+"][quantityinput]']").val("1");

},
hide: function (deleteElement) {
		if(confirm('Are you sure you want to delete this element?')) {
				$(this).slideUp(deleteElement);
				var index = $("#invoicecontent" ).attr("index");
				var newindex = parseInt(index) - 1;
				$("#invoicecontent" ).attr("index", newindex);
				//reindex
				for (var i = 1; i < parseInt(index); i++) {
					$("[name='car["+i+"][text-input]']").text(i);
				}

		}
},
	});

	$('.addressrepeater').repeater(	{
		defaultValues: { 'itext-input': 'foo' },
	show: function () {
$(this).slideDown();
var index = $(".addressrepeater" ).attr("index");
var newindex = parseInt(index) + 1;
var param = parseInt(index) - 1;
$(".addressrepeater" ).attr("index", newindex);
//$("[name='car["+index+"][text-input]']").text(newindex);
console.log(newindex);

},
hide: function (deleteElement) {
		if(confirm('Are you sure you want to delete this element?')) {
				$(this).slideUp(deleteElement);
				var index = $(".addressrepeater" ).attr("index");
				var newindex = parseInt(index) - 1;
				$(".addressrepeater" ).attr("index", newindex);
				//reindex
				/*
				for (var i = 1; i < parseInt(index); i++) {
					$("[name='car["+i+"][text-input]']").text(i);
				}
				*/

		}
},
	});

	$('.bankrepeater').repeater(	{
		defaultValues: { 'itext-input': 'foo' },
	show: function () {
$(this).slideDown();
var index = $(".bankrepeater" ).attr("index");
var newindex = parseInt(index) + 1;
var param = parseInt(index) - 1;
$(".bankrepeater" ).attr("index", newindex);
//$("[name='car["+index+"][text-input]']").text(newindex);
console.log(newindex);

},
hide: function (deleteElement) {
		if(confirm('Are you sure you want to delete this element?')) {
				$(this).slideUp(deleteElement);
				var index = $(".bankrepeater" ).attr("index");
				var newindex = parseInt(index) - 1;
				$(".bankrepeater" ).attr("index", newindex);
				//reindex
				/*
				for (var i = 1; i < parseInt(index); i++) {
					$("[name='car["+i+"][text-input]']").text(i);
				}
				*/

		}
},
	});

	$('.cryptorepeater').repeater(	{
		defaultValues: { 'itext-input': 'foo' },
	show: function () {
$(this).slideDown();
var index = $(".cryptorepeater" ).attr("index");
var newindex = parseInt(index) + 1;
var param = parseInt(index) - 1;
$(".cryptorepeater" ).attr("index", newindex);
//$("[name='car["+index+"][text-input]']").text(newindex);
console.log(newindex);

},
hide: function (deleteElement) {
		if(confirm('Are you sure you want to delete this element?')) {
				$(this).slideUp(deleteElement);
				var index = $(".cryptorepeater" ).attr("index");
				var newindex = parseInt(index) - 1;
				$(".cryptorepeater" ).attr("index", newindex);
				//reindex
				/*
				for (var i = 1; i < parseInt(index); i++) {
					$("[name='car["+i+"][text-input]']").text(i);
				}
				*/

		}
},
	});

	$('.phonerepeater').repeater(	{
		defaultValues: { 'itext-input': 'foo' },
	show: function () {
$(this).slideDown();
var index = $(".phonerepeater" ).attr("index");
var newindex = parseInt(index) + 1;
var param = parseInt(index) - 1;
$(".phonerepeater" ).attr("index", newindex);
//$("[name='car["+index+"][text-input]']").text(newindex);
console.log(newindex);

},
hide: function (deleteElement) {
		if(confirm('Are you sure you want to delete this element?')) {
				$(this).slideUp(deleteElement);
				var index = $(".phonerepeater" ).attr("index");
				var newindex = parseInt(index) - 1;
				$(".phonerepeater" ).attr("index", newindex);
				//reindex
				/*
				for (var i = 1; i < parseInt(index); i++) {
					$("[name='car["+i+"][text-input]']").text(i);
				}
				*/

		}
},
	});

	$('.emailrepeater').repeater(	{
		defaultValues: { 'itext-input': 'foo' },
	show: function () {
$(this).slideDown();
var index = $(".emailrepeater" ).attr("index");
var newindex = parseInt(index) + 1;
var param = parseInt(index) - 1;
$(".emailrepeater" ).attr("index", newindex);
//$("[name='car["+index+"][text-input]']").text(newindex);
console.log(newindex);

},
hide: function (deleteElement) {
		if(confirm('Are you sure you want to delete this element?')) {
				$(this).slideUp(deleteElement);
				var index = $(".emailrepeater" ).attr("index");
				var newindex = parseInt(index) - 1;
				$(".emailrepeater" ).attr("index", newindex);
				//reindex
				/*
				for (var i = 1; i < parseInt(index); i++) {
					$("[name='car["+i+"][text-input]']").text(i);
				}
				*/

		}
},
	});

	$('.urlrepeater').repeater(	{
		defaultValues: { 'itext-input': 'foo' },
	show: function () {
$(this).slideDown();
var index = $(".urlrepeater" ).attr("index");
var newindex = parseInt(index) + 1;
var param = parseInt(index) - 1;
$(".urlrepeater" ).attr("index", newindex);
//$("[name='car["+index+"][text-input]']").text(newindex);
console.log(newindex);

},
hide: function (deleteElement) {
		if(confirm('Are you sure you want to delete this element?')) {
				$(this).slideUp(deleteElement);
				var index = $(".urlrepeater" ).attr("index");
				var newindex = parseInt(index) - 1;
				$(".urlrepeater" ).attr("index", newindex);
				//reindex
				/*
				for (var i = 1; i < parseInt(index); i++) {
					$("[name='car["+i+"][text-input]']").text(i);
				}
				*/

		}
},
	});

	$('.customrepeater').repeater(	{
		defaultValues: { 'itext-input': 'foo' },
	show: function () {
$(this).slideDown();
var index = $(".customrepeater" ).attr("index");
var newindex = parseInt(index) + 1;
var param = parseInt(index) - 1;
$(".customrepeater" ).attr("index", newindex);
//$("[name='car["+index+"][text-input]']").text(newindex);
console.log(newindex);

},
hide: function (deleteElement) {
		if(confirm('Are you sure you want to delete this element?')) {
				$(this).slideUp(deleteElement);
				var index = $(".customrepeater" ).attr("index");
				var newindex = parseInt(index) - 1;
				$(".customrepeater" ).attr("index", newindex);
				//reindex
				/*
				for (var i = 1; i < parseInt(index); i++) {
					$("[name='car["+i+"][text-input]']").text(i);
				}
				*/

		}
},
	});

	// Default
	$('.repeater-default').repeater();

	// Custom Show / Hide Configurations
	$('.file-repeater, .contact-repeater').repeater({
		show: function () {
			$(this).slideDown();
		},
		hide: function(remove) {
			if (confirm('Are you sure you want to remove this item?')) {
				$(this).slideUp(remove);
			}
		}
	});


})(window, document, jQuery);
