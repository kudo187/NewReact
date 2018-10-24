import React, { Component } from 'react';


class Sort extends Component {
    onSort(sortBy, sortValue){
        this.props.onSort(sortBy,sortValue);
    }
  
    render() {
        var {sort} = this.props
        return (
            <div className="col-md-6">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" 
                    data-toggle="dropdown"
                    id = "dropdownMenu1">Sắp xếp<i className="fa fa-caret-square-o-down" aria-hidden="true"></i>
                    </button>
                    <div className="dropdown-menu">
                        <div className = {(sort.by === 'name' && sort.value === 1) ? 'dropdown-item active' : 'dropdown-item'} onClick = {() => this.onSort('name',1)}><span className="fa-sort-alpha-asc pr-5">Tên A-Z</span></div>
                        <div className = {(sort.by === 'name' && sort.value === -1) ? 'dropdown-item active' : 'dropdown-item'} onClick = {() => this.onSort('name',-1)}><span className="fa-sort-alpha-desc pr-5">Tên Z-A</span></div>
                        <hr/>
                        <div className = {(sort.by === 'status' && sort.value === -1) ? 'dropdown-item active' : 'dropdown-item'} onClick = {() => this.onSort('status',-1)}><span className="pr-5">Trạng thái Ẩn</span></div>
                        <div className = {(sort.by === 'status' && sort.value === 1) ? 'dropdown-item active' : 'dropdown-item'} onClick = {() => this.onSort('status',1)}><span className="pr-5">Trạng thái Kích hoạt</span></div>
                    </div>
                </div>
            </div>
        );
  }
}

export default Sort;
