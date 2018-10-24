import React, { Component } from 'react';
import Search from './Search'
import Sort  from './Sort'


class Control extends Component {
  onSearch = (key) =>{
    this.props.onSearch(key);
  }

  onSort = (sortBy , sortValue) =>{
    this.props.onSort(sortBy , sortValue)
  }

  render() {
    return (
        <div className="row mt-4">
            {/* Search */}
            <Search onSearch = {this.onSearch}/>
            {/* Sort */}
            <Sort sort = {this.props.sort} onSort = {this.onSort}/>
      </div>
    );
  }
}

export default Control;
