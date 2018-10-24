import React, { Component } from 'react';


class TaskItem extends Component {
    
    onUpdateStatus = () =>{
        this.props.onUpdateStatus(this.props.tasks.id);
    }

    onDelete = () =>{
        this.props.onDelete(this.props.tasks.id);
    }
     
    onUpdate = () =>{
        this.props.onUpdate(this.props.tasks.id);
    }

    render() {
      var {tasks, index} = this.props;
    return (
        <tr className = "text-center ">
            <td>{index + 1}</td>
            <td>{tasks.name}</td>
            <td><span 
            className = {tasks.status ? 'bg-success text-white rounded p-2' :'bg-danger rounded p-2 text-white'}
            onClick = {this.onUpdateStatus}>
            {tasks.status? 'Kích hoạt' :'Ẩn'}
            </span></td>
            <td>
            <button className="btn btn-warning mr-2 mb-1" onClick = {this.onUpdate} >Sửa <i className="fa fa-pen"></i></button>
            <button className="btn btn-danger" onClick = {this.onDelete}>Xóa <i className="fa fa-trash"></i></button>
            </td>
        </tr>
    );
  }
}

export default TaskItem;
