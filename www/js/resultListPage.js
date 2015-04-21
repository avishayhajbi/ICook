function viewResultList(app) {

	console.log("viewResultList" + app);

	var page = $("#resultListPage #content");
	page.empty();
	var container = $("<div>");
	container.append("<h2 class=titleFavorite>בחר מתכון</h2>")
	ulFavor = ("<ul>");
	var li;
	$.each(app, function(index, val) {
		li = ("<li id='" + index + "result' data-id=" + val.id + " class='napkin listResult'>");
		li += ("<img src='" + val.images[0] + "'>");
		li += ("<div calss=recipeListName>" + val.name + "</br>" + func(val.forWho) + "</div>");

		li += "</li>"
		ulFavor += (li);
	});
	container.append(ulFavor);

	page.append(container);
}

function func(num) {
	var forWho = ("<ul>");
	$.each(num, function(index, val) {
		r = $.grep(g_categories.forWho.res, function(e) {
			return e.id == val;
		});
		forWho += ("<li class='subTitleFavorite'> " + r[0].key + " </li>");
	});
	forWho += ("</ul>")
	return forWho;
}