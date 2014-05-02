var searchTable = require('./searchTable');
var searchBar = require('./searchBar');
var checkbox = require('./checkbox');
var react = require('react');
var dom = react.DOM;
var search = require('./search');
var deepMerge = require('./deep-merge');

var log = function(x) { console.log(x); return x; };

var content = react.createClass({
	getInitialState: function() {
		return {
			data: { result: [] },
			options: 
				location.hash ?
					log(search.dequeryify(location.hash.replace('#', ''))) : // Yeah, it's hackish, but I don't see any major problems with it for this application
					{
						page: 1,
						q: 'beer',
						where_not: ['is_dead', 'is_discontinued'],
						where: []
					},
		};
	},
	runSearch: function(options) { // Merges options with existing ones, sets location.string, and runs query
		var newOptions = deepMerge(this.state.options, options);
		this.setState({ options: newOptions });
		location.hash = search.queryify(newOptions); 
		search.productSearch(newOptions).then(function(res) {
			console.log(res);
			this.setState({ data: res });
		}.bind(this));
	},
	changePage: function(change) {
		if (!this.state.data.pager) return;
		this.runSearch({
			page: Math.max(1, Math.min(this.state.data.pager.final_page, this.state.options.page + change)),
			q: this.state.options.q
		});
	},
	setOrder: function(order) {
		// Only allow a single sort order for now
		this.runSearch({
			order: order
		});
	},
	componentWillMount: function() {
		this.runSearch({});
	},
	render: function() {
		return dom.div({
				className: 'content'
			},
			searchBar({
				initial: this.state.options.q,
				onChange: function(text) {
					this.runSearch({
						q: text,
						page: 1
					});
				}.bind(this)
			}),
			checkbox({
				title: 'On Sale',
				onChange: function(val) {
					this.runSearch({
						where: val ? ['has_limited_time_offer'] : [],
						page: 1
					});
				}.bind(this),
				initial: Boolean(this.state.options.where) && this.state.options.where.indexOf('has_limited_time_offer') !== -1
			}),
			searchTable({
				rows: this.state.data.result,
				page: this.state.options.page,
				maxPage: this.state.data.pager ? this.state.data.pager.final_page : '?',
				changePage: this.changePage,
				setOrder: this.setOrder,
				order: this.state.options.order || ''
			})
		);
	}
});

react.renderComponent(content({}), document.getElementById('react-container'));
