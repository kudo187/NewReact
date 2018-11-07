import { createStore } from 'redux';
import {status, sort} from './actions/index';
import myReducer from './reducers/index';


const store = createStore(myReducer);
console.log('Default : ',store.getState());
// Thực hiện công việc thay đổi sattus

store.dispatch(status());

console.log(store.getState());

//Thuc hien cong viec sap xep name z-a

store.dispatch(sort({
    by : 'name',
    value : -1
}))
console.log('Sort: ', store.getState());