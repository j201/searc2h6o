function isPlainObject(val) {
	return typeof val === 'object' && Object.getPrototypeOf(val) === Object.prototype || (val && val.constructor && val.constructor.prototype === Object.prototype);
}

function deepMergeOn(from, to) {
	return Object.keys(from).reduce(function(to, el) {
		to[el] = isPlainObject(to[el]) ? deepMergeOn(from[el], to[el]) : from[el];
		return to;
	}, to);
}

// Naive deep merge - checks for plain objects and uses Object.keys
module.exports = function(o1, o2) {
	return deepMergeOn(o2, deepMergeOn(o1, {}));
};
