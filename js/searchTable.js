var react = require('react');
var dom = react.DOM;

var cols = [{
		name: 'Name',
		order: null,
		text: function(props) {
			return dom.a({ href: LCBOURL(props.id), target: "_blank" }, props.name);
		},
		class: 'text'
	}, {
		name: 'Price',
		order: 'price_in_cents',
		text: function(props) {
			return formatPrice(props.regular_price_in_cents);
		},
		class: 'numeric'
	}, {
		name: 'Package',
		order: 'total_package_volume_in_milliliters',
		text: function(props) {
			return props.package;
		},
		class: 'text'
	}, {
		name: 'Origin',
		order: null,
		text: function(props) {
			return props.origin;
		},
		class: 'text'
	}, {
		name: 'Category',
		order: null,
		text: function(props) {
			return formatCategories(props.secondary_category, props.tertiary_category);
		},
		class: 'text'
	}, {
		name: 'Servings',
		order: null,
		text: function(props) {
			return units(props.alcohol_content, props.volume_in_milliliters);
		},
		class: 'numeric'
	}, {
		name: 'Per Serving',
		order: 'price_per_liter_of_alcohol_in_cents',
		text: function(props) {
			return formatPrice(costPerUnit(props.price_per_liter_of_alcohol_in_cents));
		},
		class: 'numeric'
	}];

function formatPrice(cents) {
	return '$' + (cents / 100).toFixed(2);
}

function formatCategories() {
	return Array.prototype.slice.call(arguments).filter(function(x) { return x; }).join(' - ');
}

function LCBOURL(id) {
	return 'http://lcbo.com/lcbo-ear/lcbo/product/details.do?language=EN&itemNumber=' + id;
}

function costPerUnit(costPerL) {
	return costPerL * 0.172; // 17.2mL per standard drink, plus the service seems to multiply by 10
}

function units(alcoholContent, mL) {
	return (mL * (alcoholContent / 10000) / 17.2).toFixed(1);
}

var tableRow = react.createClass({
	render: function() {
		var tds = cols.map(function(col) {
			return dom.td({className: col.class}, col.text(this.props));
		}.bind(this));
		return dom.tr({}, tds);
	}
});

var pageSwitcher = react.createClass({
	render: function() {
		return dom.div({
				className: 'page-index'
			},
			dom.span({
				className: 'page-arrow',
				onClick: this.props.changePage.bind(null, -1)
			}, "◀"),
			dom.span({
				className: 'page-index-text'
			}, "Page " + this.props.page + "/" + this.props.maxPage),
			dom.span({
				className: 'page-arrow',
				onClick: this.props.changePage.bind(null, 1)
			}, "▶")
		);
	}
});

module.exports = react.createClass({
	render: function() {
		var ths = cols.map(function(col) {
			return dom.th({}, col.name);
		});
		var trs = this.props.rows.map(function(obj) {
			return tableRow(obj);
		});
		return dom.div({
				className: 'search-table'
			},
			dom.table({},
				dom.thead({}, ths),
				dom.tbody({}, trs)
			),
			pageSwitcher({
				page: this.props.page,
				changePage: this.props.changePage,
				maxPage: this.props.maxPage
			})
		);
	}
});
