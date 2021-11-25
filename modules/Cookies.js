export {setCookie, getCookie, deleteCookie}

function setCookie(name, value, expirationMinutes){
	var expireTime = expirationMinutes * 60;
	document.cookie = `${name}=${value};max-age=${expireTime}';path=/;secure`;
}

function getCookie(name) {
	let cookie = {};
	document.cookie.split(';').forEach(function(el) {
		let [key,value] = el.split('=');
		cookie[key.trim()] = value;
	})
	return cookie[name];
}

function deleteCookie(name) {
	document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}