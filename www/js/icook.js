var recipeId;
var user;
var currentValue, newValue;
var user = {
	email : "guest@gmail.com",
	fullName : "guest"
};
categories = null ;

$(document).ready(function() {
	updateCategories();
	initPageCss();
	$("header a").removeClass('ui-link ui-btn-left ui-btn ui-shadow ui-corner-all');
	$('.toFilterPage').on('click', function() {
		$.mobile.changePage("#filterPage", {
			transition : "none",
			changeHash : true
		});
	});
	/*
	 $('#searchByIngredients').on('click', function() {
	 $.mobile.changePage("#searchIngredients", {
	 transition : "none",
	 changeHash : true
	 });
	 });*/
	$('#toRegistrationPage').on('click', function() {
		$.mobile.changePage("#registrationPage", {
			transition : "none",
			changeHash : true
		});
	});
});
function keyWasPressed(e) {
	if (e.which != 13)
		return;
	var temp = $('#search_text_area').val();
	console.log(temp)
	freeSearch(temp);
}

function freeSearch(temp) {
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


$(document).on("click", 'li.listResult', function() {

	var id = $(this).attr("id");
	console.log(id);
	id = parseInt(id, 10);
	console.log(id);
	viewRecipeCallback(recipe[id]);

});
$(document).on("click", 'li.listFavorite', function() {

	var id = $(this).attr("id");
	console.log(id);
	id = parseInt(id, 10);
	console.log(id);
	viewRecipeCallback(recipe[id]);

});

$(document).on("click", '.topImg', function() {

	if ($(this).hasClass("selectedImg")) {
		$(this).removeClass("selectedImg").css({
			"opacity" : "0.4"
		});
		currentValue = $(".countLike").text();
		newValue = parseInt(currentValue, 10);
		newValue = parseInt(newValue, 10) - 1;
		$(".countLike").html(newValue);
	} else {
		$(this).addClass("selectedImg").css({
			"opacity" : "1.0"
		});
		currentValue = $(".countLike").text();
		newValue = parseInt(currentValue, 10);
		newValue = parseInt(newValue, 10) + 1;

		$(".countLike").html(newValue);
	}
});
$(document).on("click", '.topImgStar', function() {
	if ($(this).hasClass("selectedImgStar")) {
		$(this).removeClass("selectedImgStar").attr("src", "img/star.png");
	} else {
		$(this).addClass("selectedImgStar").attr("src", "img/yellohStar.png");
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
	if (e.originalEvent.newURL.indexOf('#filterPage') != -1) {
		console.log('need to update the page with ajax');
		$.ajax({
			type : "GET",
			url : 'http://imcook.herokuapp.com/auxiliary/getCategories/?lang=' + userLang,
			async : false,
			dataType : 'json',
			success : ajax_callBack,
			error : function(objRequest, errortype) {
				console.log(errortype);
				console.log("change to error func");
			}
		});

	} else if (e.originalEvent.newURL.indexOf('#recipePage') != -1) {
		viewRecipeCallback();
	} else if (e.originalEvent.newURL.indexOf('#registrationPage') != -1) {
		viewRegistration();
	} else if (e.originalEvent.newURL.indexOf('#favoritePage') != -1) {
		viewFavorite();
	} else if (e.originalEvent.newURL.indexOf('#myRecipesPage') != -1) {
		viewMyRecipes();
	} else if (e.originalEvent.newURL.indexOf('#resultListPage') != -1) {
		viewResultList(recipe);
	} else if (e.originalEvent.newURL.indexOf('#addRecipePage') != -1) {
		updateLang(categories);
	}
});

function viewRegistration() {

}


$(document).on("click", '[data-role=footer]', function(e) {

});

$(document).on("click", '#nav ', function(e) {
	$("[data-role=panel]").panel("open")
});

$(function() {
	$("[data-role=panel]").enhanceWithin().panel();
});

$(document).on("pageinit", "[data-role='page']", function(event) {
	$("[data-role='panel']").on("panelopen", function(event, ui) {
		console.log("panel open")
		$('html').css("overflow", "hidden")
	});

	$("[data-role='panel']").on("panelclose", function(event, ui) {
		console.log("panel close")
		$('html').css("overflow-x", "hidden")
		initPageCss();
	});

});
function updateCategories() {
	$.ajax({
		//url : "imcook.herokuapp.com/auxiliary/getCategories/?lang=he",
		url : "http://imcook.herokuapp.com/auxiliary/getCategories/?lang=he",
		type : 'GET',
		dataType : 'json',
		success : getCategoriesCallback,
		error : errorCallback
	});
}

function updateRate() {
	var rate = parseInt($('.countLike')[0].innerHTML, 10);
	$.ajax({
		//url : "imcook.herokuapp.com/auxiliary/getCategories/?lang=he",
		url : "http://imcook.herokuapp.com/icook/updateRate",
		type : 'post',
		data : {
			rate : rate,
			recipeId : recipeId
		},
		dataType : 'json',
		success : setRateCallback,
		error : errorCallback
	});
}

function updateFavorites() {
	$.ajax({
		//url : "imcook.herokuapp.com/auxiliary/getCategories/?lang=he",
		url : "http://imcook.herokuapp.com/icook/updateFavorite",
		type : 'post',
		data : {
			email : user.email,
			recipeId : recipeId
		},
		dataType : 'json',
		success : setFavoriteCallback,
		error : errorCallback
	});
}

/*
 function viewRecipe() {
 console.log(recipe);
 viewRecipeCallback(recipe);
 // $.ajax({
 // url : "http://imcook.herokuapp.com/icook/getRecipeById",
 // type : 'post',
 // data:{recipeId:recipeId},
 // contantType:"application/json",
 // dataType : 'json',
 // success : viewRecipeCallback,
 // error : errorCallback
 // });
 };*/

function viewFavorite() {
	console.log();
	$.ajax({
		url : "http://imcook.herokuapp.com/icook/getUserFavorites",
		type : 'post',
		data : {
			email : user.email
		},
		contantType : "application/json",
		dataType : 'json',
		success : viewFavoriteCallback,
		error : errorCallback
	});
}

function viewMyRecipes() {
	console.log();
	$.ajax({
		url : "http://imcook.herokuapp.com/icook/getUserRecipes",
		type : 'post',
		data : {
			email : user.email
		},
		contantType : "application/json",
		dataType : 'json',
		success : viewMyRecipesCallback,
		error : errorCallback
	});
}

function setFavoriteCallback(data) {
	console.log(data)
}

function setRateCallback(data) {
	console.log(data)
}

function getCategoriesCallback(data) {
	categories = data.info;
	window.localStorage.setItem("categories", JSON.stringify(data.info));
	console.log("categories", categories)
	//viewRecipe();
	//viewFavorite();
	//viewMyRecipes();
}

function viewRecipeCallback(app) {
	//if(app.status==0)return;
	$.mobile.changePage("#recipePage", {
		transition : "none",
		changeHash : true
	});
	recipeId = app.id;
	console.log(app)
	var r;
	var page = $("#recipePage #content");
	page.empty();
	var container = $("<div>");
	//like Image

	container.append($("<img>").attr('src', 'img/star.png').addClass('topImgStar'));
	container.append($("<img>").attr('src', 'img/smalLike.png').addClass('topImg').css({
		"opacity" : "0.4"
	}));
	//who much likes
	container.append("<span class='countLike'>" + app.rate + "</span>");
	//add recipe name
	container.append("<h2 class='recipeName'>" + app.name + "</h2>");
	container.append("<h4 class='recipeDes'>" + app.description + "</h4>");

	container.append("<p class='subTitle'> הועלה על ידי- " + app.user + " </p>");

	var img = $('<img class="imgRecipe">');
	img.attr('src', app.images[0]);
	container.append(img);
	//check if kosher
	r = $.grep(categories.kosher.res, function(e) {
		return e.id == app.kosher;
	});
	container.append("<p class='subTitle'>" + r[0].key + " </p>");

	//check if as specialPopulations
	$.each(app.specialPopulations, function(index, val) {
		r = $.grep(categories.specialPopulations.res, function(e) {
			return e.id == val;
		});
		container.append("<p class='subTitle'> " + r[0].key + " </p>");
	});

	//check if dairy
	r = $.grep(categories.dairy.res, function(e) {
		return e.id == app.dairy;
	});
	container.append("<p class='subTitle'> " + r[0].key + " </p>");

	container.append("</br>")

	var forWho = $("<ul>")
	$.each(app.forWho, function(index, val) {
		r = $.grep(categories.forWho.res, function(e) {
			return e.id == val;
		});
		console.log(r[0])
		forWho.append("<li class='subTitle'> " + r[0].key + " </li>");

	});

	forWho.append("<li class='subTitle'>:)</li>")
	container.append(forWho);

	//commodities
	var secCommodities = $("<section class='napkin commodities'> ");
	secCommodities.append("<h3 class=title>מצרכים</h3>");
	r = $.grep(categories.accessories.res, function(e) {
		return e.id == app.accessories;
	});
	secCommodities.append("<p class='subTitleTime'> אביזרים: " + r[0].key + "</p>")
	$.each(app.commodities, function(index, val) {
		secCommodities.append(val.name + " " + val.amount + " </br>");
	});
	container.append(secCommodities);

	//preparation
	var secPreparation = $("<section class='napkin preparation'> ")
	r = $.grep(categories.user.res, function(e) {
		return e.id == app.user;
	});
	secPreparation.append("<aside class=userLabal> *רמת קושי " + r[0].key + "</aside>")
	secPreparation.append("<h3 class=title>אופן הכנה</h3>");
	secPreparation.append("<p class='subTitleTime'> זמן הכנה משוער: " + app.time + " דקות </p>")
	$.each(app.preparation, function(index, val) {
		console.log(val);
		secPreparation.append((index + 1) + "." + val + " </br>");
	});
	var label = ("<p>ובתאבון..</p>");
	secPreparation.append(label);
	container.append(secPreparation);

	//commentes
	/*var commentSection = "<section class='SecComment'> ";
	 commendSection+=("<h2 class=titleComment>תגובות</h2>");
	 commendSection+=("<img src='img/iconComment.png' class=imgComment></section>");
	 container.append(commentSection);

	 var commentsList =$("<section class='napkin comments'> ")
	 var ul = $("<ul class='listComment'>");
	 $.each(app.comments, function(index, val) {
	 ul.append("<li>"+val.email+": "+val.comment+"</li>");
	 });
	 commentsList.append(ul);
	 container.append(commentsList);

	 var form=$("<form>").attr({"method":"post","action":"#","id":"commentform"}).addClass("formcomment");
	 var inputComment=$('<input>').attr({"name":"comments","type":"text"}).addClass("inputComment");
	 var inputSubmit=$('<input>').attr({"type":"submit","value":"שלח"}).addClass("inputSubmit");
	 form.append(inputComment);
	 form.append(inputSubmit);

	 container.append(form);*/

	page.append(container);
}


$("#commentform").submit(function(e) {
	e.preventDefault();
});
//Registration page
function viewPageRegistration() {
	console.log("register")
	var page = $("#registrationPage #content");
	var container = $("<div>");
	var logoImg = $("<img>").attr("src", "img/logo.png");
	container.append(logoImg);
	/*var regDiv=$("<div>").addClass("regDiv");
	 regDiv.append("<h3>הירשם</h3>");
	 container.append(regDiv);
	 var userRegDiv=$("<div>").addClass("regDiv");
	 userRegDiv.append("<h3>משתמש רשום</h3>");
	 container.append(userRegDiv);*/
	page.append(container);
}

function viewFavoriteCallback(data) {

	data = data.info;
	var page = $("#favoritePage #content");
	page.empty();
	var container = $("<div>");
	container.append("<h2 class=titleFavorite>המועדפים שלי</h2>")
	ulFavor = ("<ul>");
	var li;
	var img;
	var div;
	$.each(data, function(index, val) {
		li = ("<li class='napkin listFavorite'>");
		li += ("<img src='" + val.images[0] + "'>");
		li += ("<div calss=recipeListName>" + val.name + "</br>" + func(val.forWho) + "</div>");
		li += "</li>"
		ulFavor += (li);
	});
	container.append(ulFavor);

	page.append(container);
}

//myRecipesPage
function viewMyRecipesCallback(data) {

	data = data.info;

	var page = $("#myRecipesPage #content");
	page.empty();
	var container = $("<div>");
	container.append("<h2 class=titleFavorite>המתכונים שלי</h2>")
	ulFavor = ("<ul>");
	var li;
	var img;
	var div;
	$.each(data, function(index, val) {
		li = ("<li class='napkin listFavorite'>");
		li += ("<img src='" + val.images[0] + "'>");
		li += ("<div calss=recipeListName>" + val.name + "</br>" + func(val.forWho) + "</div>");

		li += "</li>"
		ulFavor += (li);
	});
	container.append(ulFavor);

	page.append(container);
}

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
		r = $.grep(categories.forWho.res, function(e) {
			return e.id == val;
		});
		forWho += ("<li class='subTitleFavorite'> " + r[0].key + " </li>");
	});
	forWho += ("</ul>")
	return forWho;
}

function errorCallback(errortype) {
	categories = JSON.parse(window.localStorage.getItem('categories'));
	console.log(errortype)
}

// Signin Google-plus
function signinCallback(authResult) {
	//console.log('signinCallback '+ authResult);
	if (authResult['status']['signed_in']) {
		// Update the app to reflect a signed in user
		// Hide the sign-in button now that the user is authorized, for example:
		document.getElementById('signinButton').setAttribute('style', 'display: none');

		gapi.client.load('plus', 'v1', function() {
			var request = gapi.client.plus.people.get({
				'userId' : 'me'
			});
			request.execute(function(resp) {
				//console.log(resp);
				// find the primary email of user's account
				user.email = getPrimaryEmail(resp);
				user.fullName = resp.displayName;
				create_user(user);
			});
		});
	} else {
		/*	Update the app to reflect a signed out user
		 Possible error values:
		 "user_signed_out" - User is signed-out
		 "access_denied" - User denied access to your app
		 "immediate_failed" - Could not automatically log in the user */
		console.log('Sign-in state: ' + authResult['error']);

	}
}

//mail, fullName
function create_user(user){
	$.ajax({
		type : "post",
		url : "http://imcook.herokuapp.com/icook/insertUser",
		data : user,
		//contentType : "applecation/json",
		dataType : 'json',
		success : function(data) {console.log(data); debugger;
			if (data.status == 0) return;
			$.mobile.changePage( "#filterPage", { transition: "none", changeHash: true });
		},
		error : function(objRequest, errortype) {
			console.log(errortype);
			console.log("change to error func");
		}
	});
}
function getPrimaryEmail(resp) {
	var primaryEmail;
	for ( i = 0; i < resp.emails.length; i++) {
		if (resp.emails[i].type === 'account')
			primaryEmail = resp.emails[i].value;
	}
	return primaryEmail;
}
