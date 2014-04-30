var q = require('q');
var qjsonp = require('./qjsonp');

function productSearchURL(options) {
	console.log(options);
	return "http://lcboapi.com/products?" + exports.queryify(options) + "&callback=?";
}

exports.queryify = function(options) {
	return Object.keys(options).filter(function(el) {
		return options[el].length > 0;
	}).map(function(el) {
		return el + '=' + encodeURIComponent(options[el]);
	}).join('&');
};

function numOrString(x) {
	return isNaN(x) ? x : Number(x);
}

exports.dequeryify = function(str) {
	return str.split('&').map(function(param) {
		var split = decodeURIComponent(param).split('=');
		return [split[0], split[1].indexOf(',') !== -1 ?
			split[1].split(',').map(numOrString) :
			numOrString(split[1])];
	}).reduce(function(acc, el) {
		acc[el[0]] = el[1];
		return acc;
	}, {});
};

exports.productSearch = function(options) {
	return qjsonp(productSearchURL(options));
};
