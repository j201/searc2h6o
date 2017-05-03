var react = require('react');
var dom = react.DOM;
var qjsonp = require('./qjsonp');
var utils = require('./utils');

function storeDisplay(store) {
	return store.city + " - " + store.name;
}

var storeData = utils.sortBy(require('./storeData'), storeDisplay);

module.exports = react.createClass({
	getInitialState: function() {
		return {
			id: this.props.initial
		};
	},
	handleChange: function(e) {
		var id = e.target.value === "-1" ? null : e.target.value;
		this.setState({ id: id });
		if (this.props.handleChange)
			this.props.handleChange(id);
	},
	render: function() {
		var options = [
			dom.option({
				value: -1
			}, "All stores")
		].concat(storeData.map(function(store) {
			return dom.option({
				value: store.id
			}, storeDisplay(store));
		}.bind(this)));
		return dom.select({
			className: "store-picker",
			onChange: this.handleChange,
			placeholder: "Choose store",
			value: this.state.id
		}, options);
	}
});
