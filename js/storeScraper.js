var qjsonp = require('./qjsonp');

function getStores(page) {
	return qjsonp("http://lcboapi.com/stores?page=" + page + "&per_page=100&callback=?");
}

function processStores(stores) {
	return stores.result.map(function(store) {
		return {
			name: store.name,
			city: store.city,
			id: store.id
		};
	});
}

[1,2,3,4,5,6,7].reduce(function(acc, el) {
	return acc.then(function(previous) {
		return getStores(el)
			.then(function(data) {
				return previous.concat(processStores(data));
			});
	});
}, { then: function(f) { return f([]); } })
	.then(function(allStores) {
		console.log(JSON.stringify(allStores));
	});
