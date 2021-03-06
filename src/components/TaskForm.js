import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
// import logo from './logo.svg';
// import './App.css';

class TaskForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            id : '',
            name : '',
            status: false,

        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount(){
      if(this.props.tasksEditting && this.props.tasksEditting.id !== null){
        this.setState({
          id : this.props.tasksEditting.id,
          name : this.props.tasksEditting.name,
          status : this.props.tasksEditting.status
        })
      }else{
        this.onClear();
      }
    }

    componentWillReceiveProps(nextProps){
      if(nextProps && nextProps.tasksEditting){
        this.setState({
          id : nextProps.tasksEditting.id,
          name : nextProps.tasksEditting.name,
          status : nextProps.tasksEditting.status
        })
      }else{
        this.onClear();
      }
    }

    onCloseForm = () =>{
        this.props.onCloseForm();
        
    }

    
    onChange(event) {
        var target  =  event.target;
        var name = target.name;
        var value = target.value;
        if(name === 'status')
        {
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name] : value 
        })
    }

    onSubmit(event){
        event.preventDefault(); 
        this.props.onAddTask(this.state)
        this.onClear();
        this.onCloseForm();
    }

    onClear = () =>{
        this.setState({
            name : '',
            status : false
        })
    }

  render() {
    var {id} = this.state;
    if(!this.props.isDisplayForm) return ''
    return (
      <div className="TaskForm">
        <div className="card text-left">
            <div className="card-header bg-warning font-weight-bold">
              {id === '' ? 'Thêm công việc' : 'Sửa công việc'}
              <span className="close float-right" onClick = {this.onCloseForm}>&times;</span>
            </div>
            <div className="card-body">
              <form onSubmit = {this.onSubmit}>
                <div className="form-group">
                  <label>Tên:</label>
                  <input 
                  id="name" name="name" 
                  value = {this.state.name} 
                  onChange = {this.onChange}
                  className="form-control" type="text"/>
                </div>
                <div className="form-group">
                  <label>Trạng thái:</label>
                  <select name="status" id="" 
                  value = {this.state.status} 
                  onChange = {this.onChange}
                  className="form-control">
                    <option value={true}>Kích hoạt</option>
                    <option value={false}>Ẩn</option>
                  </select>
                </div>
                <div className="form-group">
                  <button type = "submit" className="btn btn-warning mr-2 mb-1"><i className="fa fa-save mr-2"></i>Lưu lại</button>
                  <button type = "button" className="btn btn-danger" onClick = {this.onClear}><i className="fa fa-close"></i>Hủy bỏ</button >
                </div>
              </form>
            </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
    isDisplayForm : state.isDisplayForm,
    tasksEditting : state.itemEditting
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
      onAddTask : (task) => {
        dispatch(actions.addTask(task))
      },
      onCloseForm : () => {
        dispatch(actions.closeForm());
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
