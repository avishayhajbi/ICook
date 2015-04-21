$(document).ready(function() {	
	 getCategories();
});

var lang = "he";
console.log("var lang! init!)");
function getCategories(){
	if ($("#language_en")[0].checked == true){
		lang = "en";
	}
	else {
		lang = "he";
	}
	
	console.log("in getCategories)");
	console.log("lang = " + lang);

	$.ajax({
		url : "http://imcook.herokuapp.com/auxiliary/getCategories/?lang="+lang,
		type : 'get',
		dataType : 'json',
		contentType: "application/json",
		success : createForm,
		error :  function(objRequest, errortype) {
	      console.log("ERROR" + errortype)
		}
	});
}

function updateLang(data){
	// ignored -- user!
	//data= categories;
	// Hebrew
	if (data.info.lang == "he"){	
		// Choose rtl for hebrew, otherwise - ltr
		$("#newRecipeForm")[0].dir = "rtl";
		
		// Update titles
		$("#langT")[0].innerText="שפת המתכון";
		$("#heT")[0].innerText="עברית";
		$("#enT")[0].innerText="אנגלית";
		$("#categoryT")[0].innerText="קטגוריה";
		$("#nameT")[0].innerText = "שם המנה";
		$("#nameV")[0].placeholder = "לדוג': פסטה בסגנון ים-תיכוני";
		$("#descriptionT")[0].innerText = "תאור המנה";
		$("#ingredientsT")[0].innerText = "מצרכים";
		$("#preparationT")[0].innerText = "תהליך ההכנה";
		$("#levelT")[0].innerText = "רמת קושי (1-10)";
		$("#dairyT")[0].innerText = "פרטים נוספים";
		$("#timeT")[0].innerText = "זמן הכנה";
		$("#specialpopulationT")[0].innerText = "התאמה לאוכלוסיות מיוחדות";
		$("#accessoriesT")[0].innerText = "אביזרים מיוחדים";
		$("#forWhoT")[0].innerText = "יכול לעניין...";
		$("#timeT")[0].innerText = "זמן הכנה (בדקות)";
	}
	// English
	else {
				// Choose rtl for hebrew, otherwise - ltr
		$("#newRecipeForm")[0].dir = "ltr";
		
		// Update titles
		$("#langT")[0].innerText="Language";
		$("#heT")[0].innerText="Hebrew";
		$("#enT")[0].innerText="English";
		$("#categoryT")[0].innerText="Category";
		$("#nameT")[0].innerText = "Meal name";
		$("#nameV")[0].placeholder = "example: Strawberry pie...";
		$("#descriptionT")[0].innerText = "Meal description";
		$("#ingredientsT")[0].innerText = "Ingredients";
		$("#preparationT")[0].innerText = "Meal making process";
		$("#levelT")[0].innerText = "Level of difficulty (1 to 10)";
		$("#dairyT")[0].innerText = "Additional details";
		$("#timeT")[0].innerText = "duration of making";
		$("#specialpopulationT")[0].innerText = "Special populations";
		$("#accessoriesT")[0].innerText = "Accessories";
		$("#forWhoT")[0].innerText = "Also for...";
		
	}
	
		
	    // category
	    console.log(data.info.category.res);
	    console.log(data.info.category.res.length);
	    console.log($("#categorySelect"));
	    $("#categorySelect")[0].innerHTML = "";
	    for (var i=0; i < data.info.category.res.length; i++){
	    	console.log("category " + i);
	    	$("#categorySelect").append('<option value="' + data.info.category.res[i].id + '">' + data.info.category.res[i].key + '</option>');
	    }

		// specialPopulations - checkbox
		$("#specialpopulation")[0].innerHTML = "";	
		for (var i=0; i < data.info.specialPopulations.res.length; i++){
			
	    	$("#specialpopulation").append('<input type="checkbox" name="specialPopulations"  id="sp' + i + '" class="custom" value="' + data.info.specialPopulations.res[i].id + 
	    	'" data-inline="true">');
	    	$("#specialpopulation").append('<label for="sp' + i + '">' + data.info.specialPopulations.res[i].key + '</label>');
	    	
	    }
		
		// accessories - checkbox
		$("#accessories")[0].innerHTML = "";	
		for (var i=0; i < data.info.accessories.res.length; i++){			
	    	$("#accessories").append('<input type="checkbox" name="accessories"  id="acc' + i + '" class="custom" value="' + data.info.accessories.res[i].id + 
	    	'" data-inline="true">');
	    	$("#accessories").append('<label for="acc' + i + '">' + data.info.accessories.res[i].key + '</label>');	    	
	    }
	    
	    
		
		// forWho - checkbox
		$("#forWho")[0].innerHTML = "";	
		for (var i=0; i < data.info.forWho.res.length; i++){			
	    	$("#forWho").append('<input type="checkbox" name="forWho"  id="fh' + i + '" class="custom" value="' + data.info.forWho.res[i].id + 
	    	'" data-inline="true">');
	    	$("#forWho").append('<label for="fh' + i + '">' + data.info.forWho.res[i].key + '</label>');	    	
	    }
		
			    
	    $("[type=checkbox]").checkboxradio();
		$("[data-role=controlgroup]").controlgroup("refresh");
		
		
}

function createForm(data){
	//console.log(categories)
	//data = JSON.parse(window.localStorage.getItem("categories"));
	console.log("in CREATE FORM");
	updateLang(data);
	console.log(data)
	console.log(data.info.category.res)
	var max_fields = 20;
	//maximum input boxes allowed
	var outer_wrapper = $(".ingredients_wrap");
	var wrapper = $(".ingredients_i");
	var firstIngredient = $(".firstIngredient");
	
	var x = 1;
	$(firstIngredient).focus(function(e){ //on add input button click
		e.preventDefault();
		console.log("focus " + x);
		if (x < max_fields) { //max input box allowed
			x++;
			$(this).off('focus');
					$(outer_wrapper).append('<div style="text-align: center;margin: auto;position: relative;align-content: center;"><input id="newChild' + x + '" class="ingredients_i gapper ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset newChild" style="text-align:center;margin:auto;width:80%" type="text" placeholder="מצרך" name="ingredients[]"><input type="text" name="amount[]" style="width:75%;padding:5px 0 5px 0" placeholder="כמות" class="firstAmount amounts_i" id="firstAmount"><a href="#" class="remove_field"> X </a></div>');	
		}
	});
	
	$(outer_wrapper).on("focus", ".newChild", function(e) {//on add input button click
				wrapper = $(".ingredients_i");
				console.log(wrapper[wrapper.length-1]);
				console.log(wrapper[wrapper.length-1].id);
				if (this.id == wrapper[wrapper.length-1].id){				
					 console.log("focus " + x);
					 x++;
					 
					$(outer_wrapper).append('<div style="text-align: center;margin: auto;position: relative;align-content: center;"><input id="newChild' + x + '" class="ingredients_i gapper ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset newChild" style="text-align:center;margin:auto;width:80%" type="text" placeholder="מצרך" name="ingredients[]"><input type="text" name="amount[]" style="width:75%;padding:5px 0 5px 0" placeholder="כמות" class="firstAmount amounts_i" id="firstAmount"><a href="#" class="remove_field"> X </a></div>');	
				}
			});		
	
			$(outer_wrapper).on("click", ".remove_field", function(e) {//on add input button click			
				e.preventDefault(); 
				$(this).parent('div').remove(); 
			});
}

function validateMyForm(obj)
{
  	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	
	var yyyy = today.getFullYear();
	if(dd<10){
	    dd='0'+dd
	} 
	if(mm<10){
	    mm='0'+mm
	} 
		
	var today = dd+'/'+mm+'/'+yyyy;
	$("#date").val(today);
	
	var prep = $("#preparation").val().split("\n");
	$("#preparation").val(prep);
	
	// Commodities
	var wrapper = $(".ingredients_i");
	var amounts = $(".amounts_i");
	var comms = new Array();
	for (var i = 0; i < wrapper.length; i++){
		console.log(i);
		
		var comm = {};
		if (wrapper[i].value.trim() != ''){
			comm['name'] = wrapper[i].value;
			comm["amount"] = amounts[i].value;
			comms.push(comm);
		}
	}
	$("#commodities").val(comms);

//console.log($("#commodities"));
//console.log(comms);
  
  //
  	// $.ajax({
		// url : "http://imcook.herokuapp.com/icook/insertRecipe",
		// type : 'post',
		// dataType : 'json',
		// data: newRecipeForm,
		// contentType: "application/json",
		// success : function(a){console.log("submitted!");console.log(a);},
		// error :  function(objRequest, errortype) {
	      // console.log(errortype)
		// }
	// });
	
	//  ------------
	
	// //$("#newRecipeForm").ajaxSubmit({url: 'http://imcook.herokuapp.com/icook/insertRecipe', type: 'post'})
	// console.log($("#newRecipeForm"));
	var my_url = "http://imcook.herokuapp.com/icook/insertRecipe"; // the script where you handle the form input.
// 
    // $.ajax({
           // type: "POST",
           // url: url,
           // data: obj, // serializes the form's elements.
           // success: function(data)
           // {
               // console.log(data); // show response from the php script.
           // }
         // });
         
	
	
	


         var new_data = { "date": "8/4/2015",
    "email": "guest@gmail.com",
    "username": "guest",
    "category": 1,
    "commodities": [
        {
            "name": "בורי",
            "amount": "1"
        },
        {
            "name": "חופן כוסרה",
            "amount": "1"
        },
        {
            "name": "כפית גינגר קצוץ",
            "amount": "2"
        },
        {
            "name": " מ''ל שמן זית איכותי",
            "amount": "50"
        },
        {
            "name": " כפית כוסברה",
            "amount": "1/2"
        },
        {
            "name": "פלפל לבן חתוך",
            "amount": "1/2"
        },
        {
            "name": "מלח",
            "amount": "1/2"
        }
    ],
    "name": "קציצות בורי עסיסיות ",
    "description": "קציצות מעולות ומאוד טעימות ",
    "preparation": [
        "לערבב את כל המצרכים ביחד בקערה",
        "ליצור קציצות שטוחות בגודל 50גרם ליחידה",
        "לטגן כל צד 2 דקות במחבת עם שמן זית",
        "ומעל יוגוט מעט לימון וועשבי תיבול טריים"
    ],
    "rate": 0,
    "comments": [
        {
            "email": "",
            "comment": ""
        }
    ],
    "user": 1,
    "images": [
        "http://www.labiondatlv.com/AllSites/1362/Assets/buri.jpg"
    ],
    "accessories": [
        3
    ],
    "kosher": 1,
    "dairy": 3,
    "time": 30,
    "specialPopulations": [
        2,
        5
    ],
    "level": 5,
    "remarks": "",
    "book": {
        "book": false,
        "name": "",
        "author": ""
    },
    "forWho": [
        2,
        4
    ],
    "public": true,
    "language": "he"};
         
         var test = date.value;
         console.log("$ " + test);
         
         // do loops on - forWho, specialPopulations, accessories
        var sp = new Array();
		$("input:checkbox[name=specialPopulations]:checked").each(function()
		{
		    sp.push(parseInt($(this).val()));
		});
		
		var fw = new Array();
		$("input:checkbox[name=forWho]:checked").each(function()
		{
		    fw.push(parseInt($(this).val()));
		});

		var acc = new Array();
		$("input:checkbox[name=accessories]:checked").each(function()
		{
		    acc.push(parseInt($(this).val()));
		});

    var kosh;
    if (kosher_y.checked) {
        kosh = 1; 
     } 
     else {
     	kosh = 0;
     	}
    
    
    var parsed_data = { "date": date.value,
    "email": email.value,
    "username": username.value,
    "category": parseInt(categorySelect.value),
    "commodities": comms,
    "name": nameV.value,
    "description": description.value,
    "preparation": prep,
    "rate": 0,
    "comments": [
        {
            "email": "",
            "comment": ""
        }
    ],
    "user": 1,
    "images": [
        "http://www.labiondatlv.com/AllSites/1362/Assets/buri.jpg"
    ],
    "accessories": acc,
    "kosher": kosh,
    "dairy": 1,
    "time": parseInt(time.value),
    "specialPopulations": sp,
    "level": parseInt(level.value),
    "remarks": "",
    "book": {
        "book": false,
        "name": "",
        "author": ""
    },
    "forWho": fw,
    "public": true,
    "language": "he"};
    
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4");
    console.log(parsed_data);
         //var formData = new FormData(obj);// yourForm: form selector  
         //console.log("formData:");
         //console.log(formData);  
         //console.log("obj:");
         //console.log(obj);      
         console.log(parsed_data);
            $.ajax({
                type: "POST",
                url: "http://imcook.herokuapp.com/icook/insertRecipe",// where you wanna post
                data: JSON.stringify(parsed_data),
                dataType: "json",
                //processData:false,
                contentType: "application/json",
                error: function(jqXHR, textStatus, errorMessage) {
                  
    				
      					 $( "#popupBasic" ).popup();
      					 window.location.href = "index.html";

  					  
                },
                success: function(data) {
$( "#popupBasic" ).popup();         
      					 window.location.href = "index.html";       
} 
            });



  return false;
}

