var react = require('react');
var dom = react.DOM;
var qjsonp = require('./qjsonp');

module.exports = react.createClass({
	getInitialState: function() {
		return {
			data: [],
			q: ""
		};
	},
	componentWillMount: function() {
		qjsonp("http://lcboapi.com/stores?q=" + this.state.q + "&callback=?")
			.then(function(data) {
				this.setState({ data: data.result });
			});
	}
});
