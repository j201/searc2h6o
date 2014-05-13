var searchTable = require('./searchTable');
var searchBar = require('./searchBar');
var checkbox = require('./checkbox');
var react = require('react');
var dom = react.DOM;
var search = require('./search');
var deepMerge = require('./deep-merge');
var arrSet = require('./arr-set');
var storePicker = require('./storePicker');

var log = function(x) { console.log(x); return x; };

function wrapArray(arr) {
	return Array.isArray(arr) ? arr : [arr];
}

function getHashOptions() {
	var result = location.hash ?
		log(deepMerge({page: 1, q: ''}, search.dequeryify(location.hash.replace('#', '')))) : // Yeah, it's hackish, but I don't see any major problems with it for this application
		{
			page: 1,
			q: 'beer',
			where_not: ['is_dead', 'is_discontinued'],
			where: []
		};
	if ('where_not' in result) result.where_not = wrapArray(result.where_not);
	if ('where' in result) result.where = wrapArray(result.where);
	return result;
}

var content = react.createClass({
	getInitialState: function() {
		var _this = this;
		addEventListener('hashchange', function() {
			search.productSearch(getHashOptions()).then(function(res) {
				console.log(res);
				_this.setState({ data: res });
			});
		});
		return {
			data: { result: [] },
		};
	},
	runSearch: function(options) { // Merges options with existing ones and sets location.hash, which runs the query
		var newOptions = deepMerge(getHashOptions(), options);
		location.hash = search.queryify(newOptions); 
	},
	changePage: function(change) {
		if (!this.state.data.pager) return;
		var options = getHashOptions();
		this.runSearch({
			page: Math.max(1, Math.min(this.state.data.pager.final_page, options.page + change)),
			q: options.q
		});
	},
	setOrder: function(order) {
		// Only allow a single sort order for now
		this.runSearch({
			order: order
		});
	},
	componentWillMount: function() {
		var _this = this;
		search.productSearch(getHashOptions()).then(function(res) {
				console.log(res);
				_this.setState({ data: res });
			});
	},
	render: function() {
		var options = getHashOptions();

		return dom.div({
				className: 'content'
			},
			searchBar({
				initial: options.q,
				onChange: function(text) {
					this.runSearch({
						q: text,
						page: 1
					});
				}.bind(this)
			}),
			dom.div({
				className: 'search-options'
			},
				checkbox({
					title: 'On Sale',
					onChange: function(val) {
						var where = options.where || [];
						this.runSearch({
							where: val ? arrSet.add('has_limited_time_offer', where) : arrSet.remove('has_limited_time_offer', where),
							page: 1
						});
					}.bind(this),
					checked: Boolean(options.where) && options.where.indexOf('has_limited_time_offer') !== -1
				}),
				checkbox({
					title: 'VQA',
					onChange: function(val) {
						var where = options.where || [];
						this.runSearch({
							where: val ? arrSet.add('is_vqa', where) : arrSet.remove('is_vqa', where),
							page: 1
						});
					}.bind(this),
					checked: Boolean(options.where) && options.where.indexOf('is_vqa') !== -1
				}),
				storePicker({
					handleChange: function(storeID) {
						this.runSearch({ store: storeID });
					}.bind(this)
				})
			),
			searchTable({
				rows: this.state.data.result,
				page: options.page || '1',
				maxPage: this.state.data.pager ? this.state.data.pager.final_page : '?',
				changePage: this.changePage,
				setOrder: this.setOrder,
				order: options.order || ''
			})
		);
	}
});

react.renderComponent(content({}), document.getElementById('react-container'));
