var react = require('react');
var dom = react.DOM;

module.exports = react.createClass({
	getInitialState: function() {
		return { checked: this.props.initial || false };
	},
	handleChange: function(e) {
		this.setState({ checked: e.target.checked });
		this.props.onChange(e.target.checked);
	}, render: function() {
		return dom.span({
			className: 'checkbox-container'
		}, dom.input({
			type: 'checkbox',
			onChange: this.handleChange,
			checked: this.state.checked
		}), dom.span({
			className: 'checkbox-title'
		}, this.props.title));
	}
});
