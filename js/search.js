var q = require('q');
var qjsonp = require('./qjsonp');

function productSearchURL(options) {
	console.log(options);
	return "http://lcboapi.com/products?" +
		Object.keys(options).map(function(el) {
			return el + '=' + encodeURIComponent(options[el]);
		}).join('&') +
		"&callback=?";
}

exports.productSearch = function(options) {
	return qjsonp(productSearchURL(options));
};
