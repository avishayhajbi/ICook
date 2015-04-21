var apiKEY = "681927667878-illkum100eh60c0fe3smrqrg3028v2ia.apps.googleusercontent.com";

function isAvailable() {
	window.plugins.googleplus.isAvailable(function(avail) {
		alert(avail)
	});
}

function login() {
	if (window.localStorage.getItem('g_user') != null){
		trySilentLogin();
	}
	else window.plugins.googleplus.login({
		'iOSApiKey' : apiKEY
	}, function(obj) {
		updateGlobalUser(obj)
	}, function(msg) {
		alert(msg)
	});
}

function trySilentLogin() {
	window.plugins.googleplus.trySilentLogin({
		'iOSApiKey' : apiKEY
	}, function(obj) {
		updateGlobalUser(obj)
	}, function(msg) {
		alert(msg);
	});
}

function logout() {
	
	window.plugins.googleplus.logout(function(msg) {
		
	});
}

function disconnect() {
	window.plugins.googleplus.disconnect(function(msg) {
		alert(msg);
	});
}


window.onerror = function(what, line, file) {
	alert(what + '; ' + line + '; ' + file);
};

function handleOpenURL(url) {
	alert(url)
}

function updateGlobalUser(user){
	//imageUrl , displayName , email
	g_user=user;
	window.localStorage.setItem('g_user',JSON.stringify(g_user));
	changePageTo("#filterPage");
}
