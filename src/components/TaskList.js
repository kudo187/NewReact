import React, { Component } from 'react';
import TaskItem from './TaskItem'

class TaskList extends Component {

    constructor(props){
        super(props)
        this.state = {
            filterName: '',
            filterStatus: -1
        }
    }

    onUpdateStatus = (id)=>{
        this.props.onUpdateStatus(id);
    }

    onDelete = (id) =>{
        this.props.onDelete(id);
    }

    onUpdate = (id) =>{
        this.props.onUpdate(id);
    }

    onChange = (event) =>{
        var target = event.target;
        var name = target.name;
        var value = target.value
        this.props.onFilter(name === 'filterName' ? value : this.state.filterName,
        name === 'filterStatus' ? value : this.state.filterStatus)
        this.setState({
            [name] : value
        })
    }
  
    render() {
    var {tasks} = this.props;
    var elmTasks = tasks.map((tasks, index)=>{
        return <TaskItem 
        key = {tasks.id} 
        index = {index} 
        tasks = {tasks}
        onUpdateStatus = {this.props.onUpdateStatus}
        onDelete = {this.onDelete}
        onUpdate = {this.onUpdate}/>
    })
    var {filterName, filterStatus} = this.state
    return (
        <table className="table table-bordered table-hover">
            <thead>
            <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
            </tr>
            </thead>
            <tbody> 
            <tr>
                <td></td>
                <td><input type="text" name="filterName" className="form-control" onChange = {this.onChange} value = {filterName}/></td>
                <td><select name="filterStatus" id="" value = {filterStatus} onChange = {this.onChange}>
                <option value={-1}>Tất cả</option>
                <option value={0}>Ẩn</option>
                <option value={1}>Hoạt động</option>
                </select></td>
                <td></td>
            </tr>
           {elmTasks}
            </tbody>
        </table>
    );
  }
}

export default TaskList;
