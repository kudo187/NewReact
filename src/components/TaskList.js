import React, { Component } from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import * as actions from '../actions/index'
import { filter } from 'lodash';

class TaskList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            filterName: '',
            filterStatus: -1
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        var filter = {
            name: name === 'filterName' ? value : this.state.filterName,
            status: name === 'filterStatus' ? value : this.state.filterStatus
        }
        this.props.onFilterTable(filter)
        this.setState({
            [name]: value
        })
    }

    render() {
        var { tasks, filterTable, keyword, sort } = this.props;

        var { filterName, filterStatus } = this.state

        //filter ontable
        if (filterTable.name) {
            // tasks = tasks.filter((task)=>{
            //   return task.name.toLowerCase().indexOf(filterTable.name) !== -1;
            // });
            tasks = filter(tasks, (task) => {
                return task.name.toLowerCase().indexOf(filterTable.name) !== -1;
            })
        }
        tasks = tasks.filter((task) => {
            if (filterTable.status === -1) {
                return task
            } else {
                return task.status === (filterTable.status === 1 ? true : false)
            }
        })
        //Sort
        if (sort.by === 'name') {
            tasks.sort((a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return sort.value;
                else if (a.name < b.name) return - sort.value;
                else return 0;
            })
        } else {
            tasks.sort((a, b) => {
                if (a.status > b.status) return -sort.value;
                else if (a.status < b.status)
                    return sort.value;
                else return 0;
            })
        }

        //Search
        if (keyword !== '') {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword) !== -1;
            });
        }
        // Render item
        var elmTasks = tasks.map((tasks, index) => {
            return <TaskItem
                key={tasks.id}
                index={index}
                task={tasks}
            />
        })
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
                        <td><input type="text" name="filterName" className="form-control" onChange={this.onChange} value={filterName} /></td>
                        <td><select name="filterStatus" id="" value={filterStatus} onChange={this.onChange}>
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

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        filterTable: state.filterTable,
        keyword: state.search,
        sort: state.sort
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTable: (filter) => {
            dispatch(actions.filterTask(filter))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
