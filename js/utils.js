exports.sortBy = function(arr, fn) {
	return arr.sort(function(a, b) {
		var fa = fn(a), fb = fn(b);
		return fa === fb ? 0 :
			fa > fb ? 1 :
			-1;
	});
};

exports.find = function(arr, fn) {
	for (var i = 0; i < arr.length; i++) {
		if (fn(arr[i])) return arr[i];
	}
};

exports.objWithout = function(obj, key) {
	return Object.keys(obj).reduce(function(o, k) {
		if (k !== key) o[k] = obj[k];
		return obj;
	}, {});
};
