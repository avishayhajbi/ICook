var dairy = {
	"1" : "חלבי",
	"2" : "בשרי",
	"3" : "פרווה"
};
var kosher = {
	"true" : "כשר",
	"false" : "לא כשר"
};
var specialPopulations = {
	"1" : "טבעוני",
	"2" : "צמחוני",
	"3" : "ללא סוכר",
	"4" : "ללא גלוטן",
	"5" : "מופחת קלוריות"
};
$(document).ready(function() {
	initPageCss();
	$("header a").removeClass('ui-link ui-btn-left ui-btn ui-shadow ui-corner-all');
});
$(window).resize(function() {
	initPageCss();
});
function search() {
	var word = $("header .search").val();
	console.log(word);
}

function initPageCss() {
	$("[data-role=content]").css("height", window.innerHeight - 53 + "px");
}


$(window).on('hashchange', function(e) {
	console.log(e.originalEvent)//oldURL newURL
	if (e.originalEvent.newURL.indexOf('#recipePage') != -1) {
		viewRecipe();
	}
});
$(document).on("click", '[data-role=footer]', function(e) {

});

$(function() {
	$("[data-role=panel]").enhanceWithin().panel();
});

$(document).on("pageinit", "[data-role='page']", function(event) {
	$("[data-role='panel']").on("panelopen", function(event, ui) {
		//$('body').css("overflow", "hidden").on("touchmove", false);
		$('html').css("overflow-x", "hidden")
	});

	$("[data-role='panel']").on("panelclose", function(event, ui) {
		//$('body').css("overflow", "auto").off("touchmove");
		$('html').css("overflow", "auto")
	});
});

function viewRecipe() {
	$.ajax({
		url : "jsons/file.json",
		type : 'post',
		dataType : 'json',
		success : viewRecipeCallback,
		error : errorCallback
	});
};
viewRecipe();
function viewRecipeCallback(data) {
	console.log(data)
	var app = data;
	var page = $("#recipePage #content");
	var container=$("<div>");
	container.append("<h2 class='recipeName'>" + data.name + "</h2>");
	//check if kosher
	container.append("<p class='subTitle'>" + kosher[app.kosher] + " </p>");
	
	//check if as specialPopulations
	console.log(app.specialPopulations);
	$.each(app.specialPopulations, function(index, val) {
		
		container.append("<p class='subTitle'>- " + specialPopulations[val] + " -</p>");
	});
	
	//check if dairy
	container.append("<p class='subTitle'> " + dairy[app.dairy] + " </p>");
	container.append("<div class='napkin'> ");
	container.append();
	page.append(container);
}

function errorCallback(errortype) {
	console.log(errortype)
}