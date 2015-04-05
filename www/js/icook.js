$(document).ready(function () {
   initPageCss();
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
