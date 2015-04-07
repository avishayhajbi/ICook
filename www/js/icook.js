$(document).ready(function () {
   initPageCss();
   $("header a").removeClass('ui-link ui-btn-left ui-btn ui-shadow ui-corner-all');
});
$(window).resize(function() {
	initPageCss();
});
function search(){
	var word = $("header .search").val();
	console.log(word);
}
function initPageCss() {
	$("[data-role=content]").css("height", window.innerHeight-53 + "px");
}
$(window).on('hashchange', function(e) {
  //console.log(e.originalEvent) //oldURL newURL
});
$(document).on("click", '[data-role=footer]', function (e) {
		
});
  
$(function () {
	$("[data-role=panel]").enhanceWithin().panel();
});

$(document).on("pageinit", "[data-role='page']", function (event) {   
    $("[data-role='panel']").on("panelopen", function (event, ui) { 
        //$('body').css("overflow", "hidden").on("touchmove", false);
        $('html').css("overflow-x", "hidden")
    });

    $("[data-role='panel']").on("panelclose", function (event, ui) {
        //$('body').css("overflow", "auto").off("touchmove");
        $('html').css("overflow", "auto")
    });
    
});