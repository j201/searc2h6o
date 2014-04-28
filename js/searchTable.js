var react = require('react');
var dom = react.DOM;

var cols = ['Name', 'Price', 'Package', 'Origin', 'Category', 'Servings', 'Per Serving'];

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
		return dom.tr({},
			dom.td({className: 'text'},
				dom.a({ href: LCBOURL(this.props.id), target: "_blank" },
					this.props.name)),
			dom.td({className: 'numeric'}, formatPrice(this.props.regular_price_in_cents)),
			dom.td({className: 'text'}, this.props.package),
			dom.td({className: 'text'}, this.props.origin),
			dom.td({className: 'text'}, formatCategories(this.props.secondary_category, this.props.tertiary_category)),
			dom.td({className: 'numeric'}, units(this.props.alcohol_content, this.props.volume_in_milliliters)),
			dom.td({className: 'numeric'}, formatPrice(costPerUnit(this.props.price_per_liter_of_alcohol_in_cents)))
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
		return dom.div({
				className: 'search-table'
			},
			dom.table({},
				dom.thead({}, ths),
				dom.tbody({}, trs)
			),
			dom.div({
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
			)
		);
	}
});
