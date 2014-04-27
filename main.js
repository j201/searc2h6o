var searchTable = require('./searchTable');
var searchBar = require('./searchBar');
var react = require('react');
var dom = react.DOM;
var search = require('./search');

var content = react.createClass({
	getInitialState: function() {
		return {
			data: { result: [] },
		};
	},
	runSearch: function(options) {
		search.productSearch(options).then(function(res) {
			console.log(res);
			this.setState({ data: res });
		}.bind(this));
	},
	componentWillMount: function() {
		this.runSearch({ q: 'beer' });
	},
	render: function() {
		return dom.div({
				className: 'content'
			},
			searchBar({
				initial: 'beer',
				onChange: function(text) {
					this.runSearch({ q: text });
				}.bind(this)
			}),
			searchTable({ rows: this.state.data.result })
		);
	}
});

react.renderComponent(content({}), document.getElementById('react-container'));
