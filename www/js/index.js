document.addEventListener('deviceready', onDeviceReady, false);

/* global vars */
g_loading = false;
g_domain = "http://imcook.herokuapp.com/";
g_userLang = 'he';
g_categories= {};
g_user = {};
// TODO add notification, google login, console, device plugins

function onDeviceReady() {
	navigator.splashscreen.hide();
	document.addEventListener("backbutton", onBackKeyDown, false);
	if (navigator.notification) {// Override default HTML alert with native dialog
		window.alert = function(message) {
			navigator.notification.alert(
			message, // message
			null, // callback
			"Lecturus", // title
			'OK' // buttonName
			);
		};
		window.confirm = function(message,title,callback) {
			navigator.notification.confirm(
			    message, // message
			    callback, // callback to invoke with index of button pressed
			    title, // title
			    ['NO','YES'] // buttonLabels
			);
		}
	}
	trySilentLogin();
}

function onBackKeyDown() {
	/*if (window.location.hash.indexOf("#welcomePage") != -1 || window.location.hash.indexOf("") != -1){ 
		confirm("האם לצאת מהאפליציה?" , "Lecturus" , function(ans){
			if (ans == 2){
				navigator.app.exitApp();
			}
		});
		return;
	}
	window.history.back();*/
}
function exitApp(){
	confirm("האם לצאת מהאפליציה?" , "ICook" , function(ans){
		if (ans == 2){
			navigator.app.exitApp();
		}
	});
}

$(document).on("click", '[data-role=footer]', function (e) {
	//window.history.go(0);
}); 

$(document).ready(function() {
	initPageCss();
	initUserAndCategories();
});

$(window).resize(function() {
	initPageCss();
});

function initPageCss() {
	$("[data-role=content]").css("height", window.innerHeight - 104 + "px");
}

$(window).on('hashchange', function(e) {
	//if (e.originalEvent.newURL.indexOf('#filterPage') != -1) {}
	
});

function changePageTo(page){
	$.mobile.changePage(page, {
		transition : "none",
		changeHash : true
	});
}
function activateLoader(text){
	g_loading = true;
	console.log("start loading");
	$.mobile.loading( 'show', {
		text: text,
		textVisible: true,
		theme: 'b',
		html: ""
	});
}
function deactivateLoader(){
	g_loading = false;
	console.log("stop loading");
	$.mobile.loading( "hide" );
}

$(document).on("click", '#nav ', function(e) {
	$("[data-role=panel]").panel("open")
});

$(function() {
	$("[data-role=panel]").enhanceWithin().panel();
});

$(document).on("pageinit", "[data-role='page']", function(event) {
	$("[data-role='panel']").on("panelopen", function(event, ui) {
		console.log("panel open")
		//$('html').css("overflow", "hidden")
	});

	$("[data-role='panel']").on("panelclose", function(event, ui) {
		console.log("panel close")
		//$('html').css("overflow", "hidden")
	});
});

function initUserAndCategories(){
	if (window.localStorage.getItem('g_user') != null){
		g_user = JSON.parse(window.localStorage.getItem('g_user'));
		changePageTo("#filterPage");
	}
	if (window.localStorage.getItem('g_categories') != null){
		g_categories = JSON.parse(window.localStorage.getItem('g_categories'));
	}
	getCategories();
} 

function keyWasPressed(e) {
	if (e.which != 13)
		return;
	var temp = $('#search_text_area').val();
	console.log(temp)
	//freeSearch(temp);
}

function freeSearch(temp) {
	alert("search")
	$.ajax({
		type : "post",
		url : "http://imcook.herokuapp.com/auxiliary/nameFilter",
		data : {
			name : temp
		},
		//contentType : "applecation/json",
		dataType : 'json',
		success : function(data) {
			console.log(data)
			if (data.status == 0 || data.info.length == 0)
				return;
			recipe = data.info;
			viewResultList(data.info);
			$.mobile.changePage("#resultListPage", {
				transition : "none",
				changeHash : true
			});
		},
		error : function(objRequest, errortype) {
			console.log(errortype);
			console.log("change to error func");
		}
	});
}