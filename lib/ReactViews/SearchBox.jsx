'use strict';
var DataCatalogItem = require('./DataCatalogItem.jsx');
var CatalogItemNameSearchProviderViewModel = require('../ViewModels/CatalogItemNameSearchProviderViewModel.js');
var when = require('terriajs-cesium/Source/ThirdParty/when');

var SearchBox = React.createClass({
  getInitialState: function() {
    return {
      value: '',
      dataCatalogresult: []
    };
  },
  handleChange: function(event) {
    this.setState({
      value: event.target.value
    });
    var search = new CatalogItemNameSearchProviderViewModel(this.props);
    var that = this;

    //this is a promise
    when(search.search(event.target.value)).then(function(){
      that.setState({
        dataCatalogresult: search.searchResults
      })
    })
  },

  render: function() {
    var value = this.state.value;
    var result = this.state.dataCatalogresult;
    var searchingClass = 'search-data-search '+ (this.state.value.length > 0 ? 'searching': '');
    return (
      <div className={searchingClass}>
      <form className='search-data-form relative'>
      <label htmlFor='search' className='hide'> Type keyword to search </label>
      <i className='fa fa-search'></i>
      <input id='search' type='text' name='search' value={value} onChange={this.handleChange} className='search__field field' placeholder='Search'/>
      </form>
      <ul className = 'list-reset search-result'>
      {result.map(function(group, i) {
        return (<DataCatalogItem item={group.catalogItem} key={i} />);
      }, this)}
      </ul>
      </div>
    );
  }
});
module.exports = SearchBox;
