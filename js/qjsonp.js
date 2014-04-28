var q = require('q');

module.exports = function(url) {
	var callbackKey = 'qjsonp' + String(Math.random()).slice(2);
	var deferred = q.defer();
	var scriptSrc = url.replace('callback=?', 'callback=' + callbackKey);
	window[callbackKey] = function(text) {
		deferred.resolve(text);
		delete window[callbackKey];
		document.body.removeChild(document.querySelector('script[src="' + scriptSrc + '"]'));
	};
	var script = document.createElement('script');
	script.src = scriptSrc;
	document.body.appendChild(script);
	return deferred.promise;
};
