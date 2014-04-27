var react = require('react');
var dom = react.DOM;

module.exports = react.createClass({
	getInitialState: function() {
		return { value: this.props.initial };
	},
	handleKeyDown: function(e) {
		var kc = e.keyCode || e.which;
		if (kc === 13)
			this.props.onChange(this.state.value);
	},
	handleChange: function(e) {
		this.setState({ value: e.target.value });
	},
	handleClick: function(e) {
		this.props.onChange(this.state.value);
	},
	render: function() {
		return dom.div({
				className: 'search-bar',
			},
			dom.input({
				type: 'text',
				onKeyDown: this.handleKeyDown,
				onChange: this.handleChange,
				value: this.state.value
			}),
			dom.img({
				src: 'searchButton.png',
				className: 'search-button',
				onClick: this.handleClick
			})
		);
	}
});
