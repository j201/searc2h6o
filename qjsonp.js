var q = require('q');

module.exports = function(url) {
	var callbackKey = 'qjsonp' + String(Math.random()).slice(2);
	var deferred = q.defer();
	window[callbackKey] = function(text) {
		deferred.resolve(text);
		delete window[callbackKey];
	};
	var script = document.createElement('script');
	script.src = url.replace('callback=?', 'callback=' + callbackKey);
	document.body.appendChild(script);
	return deferred.promise;
};
