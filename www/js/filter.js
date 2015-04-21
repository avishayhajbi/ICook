g_recipes=[];
var obj;
var jsonAnswers ={};
var getCategoriesUrl = g_domain+"auxiliary/getCategories"
var getSimpleFilterUrl = g_domain+"auxiliary/simpleFilter"

function getCategories(){
	activateLoader("...טוען")
	$.ajax({
		url : getCategoriesUrl,
		type : "GET",
		data : {lang : g_userLang, check: g_categories.check || 1},
		dataType : "json", 
		success : getCategoriesSuccess,
		error : getCategoriesError
	});
}

function getCategoriesSuccess(result){
	if (result.status == 1 || result.status == 2){
		if (result.status == 1)
			window.localStorage.setItem('g_categories',JSON.stringify(result.info));
		g_categories = JSON.parse(window.localStorage.getItem('g_categories'));
		obj = new filterViews();
		obj.init(g_categories);
	}
	console.log(result);
	deactivateLoader()
}
function getCategoriesError(xhr){
	console.log(xhr);
	deactivateLoader();
}

function filterViews(){
	this.json;
	this.issues;
	this.position=0;
}
filterViews.prototype.init = function(jsonData){
	console.log(jsonData);
	this.json = jsonData;
	this.issues = jsonData.issues;
	// init user answers
	$.each(jsonData.issues, function(i,val){
		add_to_user_answers(val ,0);
	});
	 $('#categoryChecked').html('');
	 $('#question').html('');
	 $('#categoryContainer').html('');
	 enable_skip_button();
	 this.show();
	 console.log(this.issues);
};
filterViews.prototype.next = function(){
	if (this.position < this.issues.length-1){
		this.position++;
		this.show();
	}else{
		disable_skip_button();
		showResults();
	}
};
filterViews.prototype.prev = function(){
	if (this.position>=1){
		this.position--;
		this.show();
		$('#categoryChecked li:last').remove();
	}
};
filterViews.prototype.show = function(){
	if (this.position!=0) toggle_goBack_button(true);
	else toggle_goBack_button(false);
	generate_next_sort(this.json[this.issues[this.position]]);
};

function skip(){
	generate_next_sort();
}

function generate_next_sort(questionObj){
	var question = questionObj.question;
	$('#question').text(question);
	
	// init categoryContainer
	$('#categoryContainer').empty();
	
	// Set items
	$.each(questionObj.res, function(index, item){
		// Add box
		var image = $('<section>');
		if (item.url == null || typeof item.url=='undefined'){
			image.css('background-image', "url('img/no-image.jpg')");
		}else{
			image.css('background-image', "url("+item.url+")");
		}
		image.css('background-repeat', "no-repeat");
		
		// Add name
		spanText = $('<span>');
		spanText.text(item.key);
		
		var catItem = $('<li>');
		catItem.attr('onclick', "userOnclickAnswer(this)");
		catItem.attr('class', "categoryItem");
		catItem.attr('id', 'item_'+(index+1));
		
		catItem.append(image);
		catItem.append(spanText);
		
		// Append to others
		$('#categoryContainer').append(catItem);
	});
}

function add_to_user_answers(type ,id){
	switch (type) {
		case 'forWho':
			jsonAnswers[type] = [id];
			break;
		case 'accessories':
			jsonAnswers[type] = [id];
			break;
		case 'specialPopulations':
			jsonAnswers[type] = [id];
			break;
		default:
			jsonAnswers[type] = id;
	}
}
function toggle_goBack_button(show){
	if (show){
		$('#goBack').show();
	}else{
		$('#goBack').hide();
	}
}

function disable_skip_button(){
	$('#skipButton').css('opacity',0.5);
	$('#skipButton').removeAttr('onclick');
}
function enable_skip_button(){
	$('#skipButton').removeAttr('style');
	$('#skipButton').attr('onclick', 'skip(this)');
}
function goBack(tag){
	enable_skip_button();
	obj.prev(tag);
}
function skip(tag){
	obj.next(tag);
}
function userOnclickAnswer(tag){
	childNum = parseInt( tag.id.split('_')[1] );
	typeofQuestion = obj.issues[obj.position];
	add_to_user_answers(typeofQuestion, childNum);
	
	show_bread_crumbs(tag);
	obj.next(tag);
}
function show_bread_crumbs(tag){
	var liChecked = $('<li>');
	//liChecked.id('');
	if ($('#categoryChecked').children().length > 0){
		liChecked.attr('id','other_li');
		liChecked.text(' | '+tag.children[1].innerText);
	}else{
		liChecked.attr('id','first_li');
		liChecked.text(tag.children[1].innerText);
	}
	$('#categoryChecked').append(liChecked);
}
function showResults(){
	activateLoader("...טוען")
	$.ajax({
		type : "post",
		url : getSimpleFilterUrl,
		async : false,
		data : jsonAnswers,
		dataType : 'json',
		success : function(data){
			console.log(data)
			if (data.status ==1){
				recipes = data.info;
				viewResultList(recipes);
				changePageTo("#resultListPage");
			}
			deactivateLoader();
		},
		error : function(objRequest, errortype) {
			console.log(errortype);
			console.log("change to error func");
			deactivateLoader();
		}
	});
}