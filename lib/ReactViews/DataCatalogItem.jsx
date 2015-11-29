'use strict';

var DataCatalogItem = React.createClass({

  getInitialState: function() {
    return {
      isPreviewed: false
    };
  },

  addToPreview: function(event){
    event.preventDefault();
    this.setState({
      isPreviewed: true
    });
    previewUpdate.raiseEvent(this.props.item);
  },

  addToMap: function(event){
    event.preventDefault();
    this.props.item.isEnabled = !this.props.item.isEnabled;
    nowViewingUpdate.raiseEvent();
    //update preview as well
    previewUpdate.raiseEvent(this.props.item);
  },

  render: function(){
    var item = this.props.item;
    var iconClass = "fa " + (this.props.item.isEnabled === true ? "fa-minus-circle red" : "fa-plus-circle blue");
    return (
      <li className="clearfix data-catalog-item"><button onClick={this.addToPreview} className="btn data-item-title col col-11 relative">{item.name}</button><button onClick={this.addToMap} className="btn col col-1 relative"><i className={iconClass}> </i></button></li>
      ) ;
  }
});

module.exports = DataCatalogItem;
