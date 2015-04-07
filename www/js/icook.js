
var currentValue, newValue;
var categories;

$(document).ready(function() {
	updateCategories();
	initPageCss();
	$("header a").removeClass('ui-link ui-btn-left ui-btn ui-shadow ui-corner-all');
	

});
$(document).on("click", '.topImg', function() {

	if ($(this).hasClass("selectedImg")) {
		$(this).removeClass("selectedImg").css({"opacity":"0.4"});
		currentValue = $(".countLike").text();
		newValue = parseInt(currentValue, 10) ;
		 newValue=parseInt(newValue,10)- 1;
		$(".countLike").html(newValue);
	} else {
		$(this).addClass("selectedImg").css({"opacity":"1.0"});
		currentValue = $(".countLike").text();
		newValue = parseInt(currentValue , 10 );
		newValue=parseInt(newValue,10)+ 1;
		
		$(".countLike").html(newValue);
	}

});

$(window).resize(function() {
	initPageCss();
});
function search() {
	var word = $("header .search").val();
	console.log(word);
}

function initPageCss() {
	$("[data-role=content]").css("height", window.innerHeight - 52 + "px");
}


$(window).on('hashchange', function(e) {
	console.log(e.originalEvent)//oldURL newURL
	if (e.originalEvent.newURL.indexOf('#recipePage') != -1) {
		//viewRecipe();
	}
});
$(document).on("click", '[data-role=footer]', function(e) {

});

$(document).on("click", '#nav ', function (e) {
	$("[data-role=panel]").panel( "open")
});

$(function () {
	$("[data-role=panel]").enhanceWithin().panel();
});

$(document).on("pageinit", "[data-role='page']", function (event) {   
    $("[data-role='panel']").on("panelopen", function (event, ui) { 
        console.log("panel open")
        $('html').css("overflow", "hidden")
    });

    $("[data-role='panel']").on("panelclose", function (event, ui) {
        console.log("panel close")
        $('html').css("overflow", "auto")
    });
    
});
function updateCategories(){
	$.ajax({
		//url : "imcook.herokuapp.com/auxiliary/getCategories/?lang=he",
		url : "http://imcook.herokuapp.com/auxiliary/getCategories/?lang=he",
		type : 'GET',
		dataType : 'json',
		success : getCategoriesCallback,
		error : errorCallback
	});
}
function viewRecipe() {
	$.ajax({
		url : "jsons/file.json",
		type : 'post',
		dataType : 'json',
		success : viewRecipeCallback,
		error : errorCallback
	});
};
function getCategoriesCallback(data){
	categories=data.info;
	console.log("categories",categories)
	viewRecipe();
}
function viewRecipeCallback(app) {
	var r;
	var page = $("#recipePage #content");
	var container = $("<div>");
	//like Image
	container.append($("<img>").attr('src','img/smalLike.png').addClass('topImg').css({"opacity":"0.4"}));
	//who much likes
	container.append("<span class='countLike'>" + app.rate + "</span>");
	//add recipe name
	container.append("<h2 class='recipeName'>" + app.name + "</h2>");
	container.append("<h4 class='recipeDes'>" + app.description + "</h4>");
	
	var img = $('<img class="imgRecipe">');
	img.attr('src', app.images[0]);
	container.append(img);
	//check if kosher
	r=$.grep(categories.kosher.res, function(e){ return e.id == app.kosher; });
	container.append("<p class='subTitle'>" + r[0].key + " </p>");

	//check if as specialPopulations
	$.each(app.specialPopulations,function(index, val){
		r=$.grep(categories.specialPopulations.res, function(e){ return e.id == val; });
		container.append("<p class='subTitle'> "  +r[0].key	 + " </p>");
	});
	
	

	//check if dairy
	r=$.grep(categories.dairy.res, function(e){ return e.id == app.dairy; });
	container.append("<p class='subTitle'> "  +r[0].key	 + " </p>");
	
	
	container.append("</br>")
	
	
	var forWho=$("<ul>")
	$.each(app.forWho,function(index, val){
		r=$.grep(categories.forWho.res, function(e){ return e.id == val; });
		console.log(r[0])
		forWho.append("<li class='subTitle'> "  +r[0].key	 + " </li>");
		
	});
	
	forWho.append("<li class='subTitle'>:)</li>")
	container.append(forWho);
	
	//commodities
	var secCommodities = $("<section class='napkin commodities'> ");
	secCommodities.append("<h3 class=title>מצרכים</h3>");
	r=$.grep(categories.accessories.res, function(e){ return e.id == app.accessories; });
	secCommodities.append("<p class='subTitleTime'> אביזרים: "+r[0].key+"</p>")
	$.each(app.commodities, function(index, val) {
		secCommodities.append(val.name + " " + val.amount + " </br>");
	});
	container.append(secCommodities);
	
	//preparation
	var secPreparation = $("<section class='napkin preparation'> ")
	r=$.grep(categories.user.res, function(e){ return e.id == app.user; });
	secPreparation.append("<aside class=userLabal> *רמת קושי "+r[0].key+"</aside>")
	secPreparation.append("<h3 class=title>אופן הכנה</h3>");
	secPreparation.append("<p class='subTitleTime'> זמן הכנה משוער: "+app.time+" דקות </p>")
	$.each(app.preparation, function(index, val) {
		console.log(val);
		secPreparation.append((index + 1) + "." + val + " </br>");
	});
	container.append(secPreparation);
	page.append(container);
}

function errorCallback(errortype) {
	console.log(errortype)
}
