import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            keyword: ''
        }
    }

    onChange = (event)=>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name] : value
        })
    }

    onSearch = () =>{
        this.props.onSearch(this.state.keyword);
    }

  render() {
      var {keyword} = this.state;
    return (
        <div className="col-md-6">
            <div className="input-group">
            <input type="text" className="form-control" name ="keyword" value = {keyword} onChange={this.onChange} placeholder="Nhập từ khóa..." aria-label="key-research"/>
            <div className="input-group-append">
                <span className="input-group-bnt btn btn-primary" onClick = {this.onSearch} id="basic-addon2"><i className="fa fa-search mr-1"></i>Tìm</span>
            </div>
            </div>
        </div>
    );
  }
}

const mapStateToProps = state =>{
    return {
    }
  }
  
  const mapDispatchToProps = (dispatch, props) => {
    return {
        onSearch : (keyword) => {
          dispatch(actions.searchTask(keyword))
        }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Search);
