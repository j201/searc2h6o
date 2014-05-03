// set-like functions for operating on arrays (inefficiently)

exports.add = function(el, arr) {
	var i = arr.indexOf(el);
	return i === -1 ?
		arr.concat([el]) :
		arr;
};

exports.remove = function(el, arr) {
	var i = arr.indexOf(el);
	return i === -1 ?
		arr :
		arr.slice(0, i).concat(arr.slice(i + 1));
};
