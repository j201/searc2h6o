var react = require('react');
var dom = react.DOM;

var cols = ['Name', 'Price', 'Package', 'Per Drink'];

function formatPrice(cents) {
	return '$' + (cents / 100).toFixed(2);
}

function LCBOURL(id) {
	return 'http://lcbo.com/lcbo-ear/lcbo/product/details.do?language=EN&itemNumber=' + id;
}

function perStandardDrink(alcoholPerL) {
	return alcoholPerL * 0.17; // 17mL per standard drink
}

var tableRow = react.createClass({
	render: function() {
		return dom.tr({},
			dom.td({className: 'text'},
				dom.a({ href: LCBOURL(this.props.id), target: "_blank" },
					this.props.name)),
			dom.td({className: 'numeric'}, formatPrice(this.props.regular_price_in_cents)),
			dom.td({className: 'text'}, this.props.package),
			dom.td({className: 'numeric'}, formatPrice(perStandardDrink(this.props.price_per_liter_of_alcohol_in_cents)))
		);
	}
});

module.exports = react.createClass({
	render: function() {
		var ths = cols.map(function(col) {
			return dom.th({}, col);
		});
		var trs = this.props.rows.map(function(obj) {
			return tableRow(obj);
		});
		return dom.table({
				className: 'search-table'
			},
			dom.thead({}, ths),
			dom.tbody({}, trs));
	}
});
