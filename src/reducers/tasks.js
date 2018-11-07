import * as types from './../constants/ActionTypes';
import {findIndex} from 'lodash';

var index;

var s4 = () =>{
    return Math.floor((1+Math.random()) *0x10000).toString(16).substring(1);
  }

var generateId = () => {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
  }
var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];

var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.LIST_ALL:
            return state;
        case types.ADD_TASK:
            console.log(action);
             var newTask = {
                id : action.task.id,
                name : action.task.name,
                status : action.task.status 
            }
            if(!newTask.id){
                newTask.id = generateId();
                state.push(newTask);
            }else{
                index = findIndex(state,(task)=>{
                    return task.id === action.task.id;
                })
                console.log(index)
                state[index] = newTask;
                
            }
            localStorage.setItem('tasks',JSON.stringify(state));
            return [...state];
        case types.UPDATE_STATUS:
            index = findIndex(state,(task)=>{
                return task.id === action.id
            })
            if(index !== -1){
                state[index] = {
                    ...state[index],
                    status : !state[index].status
                };
                localStorage.setItem('tasks' , JSON.stringify(state));
            }
            return [...state];
        case types.DELETE_ITEM :
            var id = action.id;
            index = findIndex(state,(task)=>{
                return task.id === id
            })
            if(index !== -1){
                state.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(state));
            }
            return [...state];
        default: return state;
    }
}


export default myReducer;