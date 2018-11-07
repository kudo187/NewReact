import React, { Component } from 'react';
// import logo from './logo.svg';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import './App.css';
// import {findIndex, filter} from 'lodash';
import { connect } from 'react-redux';
import * as actions from './actions/index';

class App extends Component {
  
  // onGenerateData = () =>{
  //   var task = [
  //     {
  //       id: this.generateId() ,
  //       name: 'Hoc lap trinh',
  //       status:true
  //     },
  //     {
  //       id: this.generateId(),
  //       name: 'Hoc angular',
  //       status: false
  //     },{
  //       id: this.generateId(),
  //       name: 'Ngu',
  //       status: true
  //     },


  //   ]
  //   this.setState({
  //     tasks : task
  //   });
  //   localStorage.setItem('tasks', JSON.stringify(task));
  // }

  

  onToggleForm = () => {
    if(this.props.itemEditting && this.props.itemEditting.id)
    {
      this.props.onClearTask({
        id : '',
        name : '',
        status : false
      });
    }else{
      this.props.onToggleForm();
    }
  }
  // onUpdateStatus = (id) =>{
  //   var {tasks} = this.state;
  //   // var index =  this.findIndex(id);
  //   var index = findIndex(tasks,(task)=>{
  //     return task.id === id
  //   })
  //   if(index !== -1){
  //     tasks[index].status = !tasks[index].status;
  //     this.setState({
  //       tasks: tasks
  //     })
  //     localStorage.setItem('tasks' , JSON.stringify(tasks));
  //   }
    
  // }

  // findIndex = (id) =>{
  //   var {tasks} = this.state;
  //   var result = -1;
  //   tasks.forEach((tasks,index)=>{
  //     if(tasks.id === id){
  //       result = index;
  //     }
  //   })
  //   return result;
  // }


  // onUpdate = (id) =>{
  //   this.setState({
  //     isDisplayForm : true
  //   })
  //   var {tasks}  = this.state;
  //   var index = findIndex(tasks,(task)=>{
  //     return task.id === id;
  //   })
  //   this.onShowForm();
  //   this.setState({
  //     tasksEditting : tasks[index]
  //   })
  // }


  render() {
    var { isDisplayForm } = this.props;
    return (
      <div className="App container">
      <h1 className="text-center text-danger">Quản Lý Công Việc</h1>
    <hr/>
    <div className="content">
      <div className="row">
        <div className={isDisplayForm ? 'col-4' : '' }>
        <TaskForm />
        </div>
        <div className= {isDisplayForm ? 'col-8 text-left': 'col-12 text-left'}>
          <div className="btn btn-primary" onClick = {this.onToggleForm}><i className="fa fa-plus"></i> Thêm Công Việc</div>
          
            {/* Control */}
            <Control/>
          <div className="tabledata mt-4">
          {/* data */}
            <TaskList />
          </div>
        </div>
      </div>
    </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
    isDisplayForm : state.isDisplayForm,
    itemEditting : state.itemEditting
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm : () => {
      dispatch(actions.toggleForm());
    },
    onClearTask : (task) => {
      dispatch(actions.editItem(task))
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps) (App) ;
