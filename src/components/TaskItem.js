import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index'



class TaskItem extends Component {
    
    onUpdateStatus = () =>{
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDelete = () =>{
        this.props.onDelete(this.props.task.id);
        this.props.onCloseForm();
    }
     
    onEditTask = () =>{
        this.props.onOpenForm(); 
        this.props.onEditTask(this.props.task); 
    }

    render() {
        var {task, index} = this.props;
        return (
            <tr className = "text-center ">
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td><span 
                className = {task.status ? 'bg-success text-white rounded p-2' :'bg-danger rounded p-2 text-white'}
                onClick = {this.onUpdateStatus}>
                {task.status? 'Kích hoạt' :'Ẩn'}
                </span></td>
                <td>
                <button className="btn btn-warning mr-2 mb-1" onClick = {this.onEditTask} >Sửa <i className="fa fa-pen"></i></button>
                <button className="btn btn-danger" onClick = {this.onDelete}>Xóa <i className="fa fa-trash"></i></button>
                </td>
            </tr>
        );
  }
}

const mapStateToProps = state =>{
    return {
  
    }
  }
  
  const mapDispatchToProps = (dispatch, props) => {
    return {
       onUpdateStatus : (id) =>{
           dispatch(actions.updateStatus(id));
       },
       onDelete : (id) => {
           dispatch(actions.deleteItem(id));
       },
       onCloseForm : () => {
         dispatch(actions.closeForm());
       },
       onOpenForm : () => {
         dispatch(actions.openForm());
       },
       onEditTask : (task) =>{
           dispatch(actions.editItem(task));
       }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
