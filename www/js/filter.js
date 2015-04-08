var obj;
var userLang = 'he';
var jsonAnswers ={};
var recipe;

function search(){
	console.log("search");
}
function skip(){
	generate_next_sort();
}
function ajax_callBack(data){
	if (data.status == 1) {
		var jsonData = data.info;
		obj = new filterViews();
		obj.init(jsonData);
		obj.show();
	} else {
		console.log('server status code are not 1');
		return;
	}
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
	console.log(this.issues);
};
filterViews.prototype.next = function(){
	if (this.position < this.issues.length-1){
		this.position++;
		this.show();
		changeButtons();
	}else{
		disable_skip_button();
		showResults();
	}
};
filterViews.prototype.prev = function(){
	if (this.position>=1){
		this.position--;
		changeButtons();
		this.show();
		$('#categoryChecked li:last').remove();
	}
};
filterViews.prototype.show = function(){
	if (this.position!=0) toggle_goBack_button(true);
	else toggle_goBack_button(false);
	generate_next_sort(this.json[this.issues[this.position]]);
};
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
function changeButtons(){
	var changeButtons = false;
	if($("#filterPage").hasScrollBar()){
		changeButtons = true;
	}else{
		console.log('dont change buttons');
	}
	
	if (changeButtons){
		// Calc hight to margin
		var windowHeight = $(window).height();
		var top_upto_buttons = $('#categoryContainer').offset().top + $('#categoryContainer').height();
		var restSpace = windowHeight - top_upto_buttons;
		var locateIn = restSpace - 56;
		
		$('#buttonsContainer').css('position', 'relative');
		$('#buttonsContainer').css('top', locateIn+'px');
	}else{
		$('#buttonsContainer').removeAttr('style');
	}
}
function disable_skip_button(){
	$('#skipButton').css('opacity',0);
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
function showResults(){
	console.log('show results');
	$.ajax({
		type : "post",
		url : 'http://imcook.herokuapp.com/auxiliary/simpleFilter',
		async : false,
		data : jsonAnswers,
		dataType : 'json',
		success : function(data){
			if (data.status ==1){
				recipe = data.info;
				window.location.href = "results.html";
			}
		},
		error : function(objRequest, errortype) {
			console.log(errortype);
			console.log("change to error func");
		}
	});
	
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
(function($) {
    $.fn.hasScrollBar = function() {
        return this.get(0).scrollHeight > this.height();
    };
})(jQuery);