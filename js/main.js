var searchTable = require('./searchTable');
var searchBar = require('./searchBar');
var react = require('react');
var dom = react.DOM;
var search = require('./search');

var log = function(x) { console.log(x); return x; };

var content = react.createClass({
	getInitialState: function() {
		return {
			data: { result: [] },
			options: {
				page: 1,
				q: 'beer'
			}
		};
	},
	runSearch: function(options) {
		this.setState({ options: options });
		search.productSearch(options).then(function(res) {
			console.log(res);
			this.setState({ data: res });
		}.bind(this));
	},
	queryChange: function(query) {
		this.runSearch({
			q: query,
			page: 1
		});
	},
	changePage: function(change) {
		if (!this.state.data.pager) return;
		this.runSearch({
			page: Math.max(1, Math.min(this.state.data.pager.final_page, this.state.options.page + change)),
			q: this.state.options.q
		});
	},
	componentWillMount: function() {
		this.runSearch(this.state.options);
	},
	render: function() {
		return dom.div({
				className: 'content'
			},
			searchBar({
				initial: 'beer',
				onChange: function(text) {
					this.queryChange(text);
				}.bind(this)
			}),
			searchTable({
				rows: this.state.data.result,
				page: this.state.options.page,
				maxPage: this.state.data.pager ? this.state.data.pager.final_page : '?',
				changePage: this.changePage
			})
		);
	}
});

react.renderComponent(content({}), document.getElementById('react-container'));
