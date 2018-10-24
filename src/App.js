import React, { Component } from 'react';
// import logo from './logo.svg';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import './App.css';
import {findIndex, filter} from 'lodash';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      tasksEditting : null,
      filters: {
        name: '',
        status: -1
      },
      keyword : '',
      sort : {
        by : 'name',
        value : 1
      } 
    }
  }
  componentWillMount(){
    if (localStorage && localStorage.getItem('tasks'))
    {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks : tasks
      })
    }
  }
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

  s4(){
    return Math.floor((1+Math.random()) *0x10000).toString(16).substring(1);
  }

  generateId(){
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4()+this.s4()
  }

  onToggleForm = () => {
    if(this.state.isDisplayForm && this.state.tasksEditting !== null)
    {
      this.setState({
        tasksEditting : null,
      })  
    }else{
      this.setState({
        isDisplayForm : !this.state.isDisplayForm,
        tasksEditting : null,
      })
    }
  }

  onCloseForm = () =>{
    this.setState({
      isDisplayForm : false,
      tasksEditting : null
    })
  }

  onShowForm = () =>{
    this.setState({
      isDisplayForm : true
    })
  }


  onSubmit = (data) =>{
    console.log(data)
    var {tasks} = this.state;
    if(data.id === ''){
      data.id = this.generateId();
      tasks.push(data);
    }
    else{
      // var index = this.findIndex(data.id); 
      var index = findIndex(tasks,(task)=>{
        return task.id === data.id;
      })
      tasks[index] = data;
    }
    this.setState({
      tasks : tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
  } 

  onUpdateStatus = (id) =>{
    var {tasks} = this.state;
    // var index =  this.findIndex(id);
    var index = findIndex(tasks,(task)=>{
      return task.id === id
    })
    if(index !== -1){
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      })
      localStorage.setItem('tasks' , JSON.stringify(tasks));
    }
    
  }

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

  onDelete = (id) =>{
    var {tasks} = this.state;
    var index = findIndex(tasks,(task)=>{
      return task.id === id;
    })
    if(index !== -1){
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      })
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    this.onCloseForm();
  }

  onUpdate = (id) =>{
    this.setState({
      isDisplayForm : true
    })
    var {tasks}  = this.state;
    var index = findIndex(tasks,(task)=>{
      return task.id === id;
    })
    this.onShowForm();
    this.setState({
      tasksEditting : tasks[index]
    })
  }

  onFilter = (filterName, filterStatus)=>{
    filterStatus = parseInt(filterStatus,10);
    this.setState({
      filters : {
        name : filterName.toLowerCase(),
        status : filterStatus
      }
    })
  }

  onSearch = (key) =>{
    this.setState({
      keyword: key
    })
  }

  onSort = (sortBy , sortValue) =>{
    this.setState({
      sort : {
        by : sortBy,
        value : sortValue
      }
    })
  }

  render() {
    var {tasks , isDisplayForm, filters, keyword, sort} = this.state; //var tasks = this.state.tasks
    
    if(filters){
      if(filters.name){
        // tasks = tasks.filter((task)=>{
        //   return task.name.toLowerCase().indexOf(filter.name) !== -1;
        // });
        tasks = filter(tasks, (task)=>{
          return task.name.toLowerCase().indexOf(filters.name) !== -1;
        })
      }
      tasks = tasks.filter((task)=>{
        if(filters.status === -1){
          return task
        }else{
          return task.status === (filters.status === 1 ? true : false)
        }
      })
    }
    if(keyword){
      tasks = tasks.filter((task)=>{
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }
    if(sort.by === 'name'){
      tasks = tasks.sort((a,b)=>{
        if(a.name.toLowerCase() > b.name.toLowerCase()) return sort.value;
        else if(a.name < b.name) return - sort.value;
        else return 0;
      })
    }else{
      tasks = tasks.sort((a,b)=>{
        if(a.status > b.status) return -sort.value;
        else if(a.status < b.status)
         return sort.value;
        else return 0;
      })
    }

    var elmTaskForm = isDisplayForm ? 
    <TaskForm onSubmit = {this.onSubmit} onCloseForm = {this.onCloseForm} tasksEditting = {this.state.tasksEditting}/> : '';

    return (
      <div className="App container">
      <h1 className="text-center text-danger">Quản Lý Công Việc</h1>
    <hr/>
    <div className="content">
      <div className="row">
        <div className={isDisplayForm ? 'col-4' : '' }>
          {elmTaskForm}
        </div>
        <div className= {isDisplayForm ? 'col-8 text-left': 'col-12 text-left'}>
          <div className="btn btn-primary" onClick = {this.onToggleForm}><i className="fa fa-plus"></i> Thêm Công Việc</div>
          
            {/* Control */}
            <Control sort = {sort} onSort = {this.onSort} onSearch = {this.onSearch}/>
          <div className="tabledata mt-4">
          {/* data */}
            <TaskList tasks = {tasks} 
            onUpdateStatus = {this.onUpdateStatus} 
            onDelete = {this.onDelete} 
            onUpdate = {this.onUpdate}
            onFilter = {this.onFilter}/>
          </div>
        </div>
      </div>
    </div>
      </div>
    );
  }
}

export default App;
