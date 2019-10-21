import { combineReducers } from 'redux'
import {SHOW_SHIELD } from '../actions'
import todosReducers from "./todosReducers"



const shield= (state=false,action)=>{
  switch(action.type){
    case SHOW_SHIELD:
      return action.payload;
    default:
      return state;
  }

}
const allReducer = combineReducers({
  listTodo: todosReducers,
  shield: shield
})
export default allReducer


