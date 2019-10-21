import {
  FETCH_TODOS,
  ADD_TODO,
  CHANGE_STATUS,
  RESET_INPUT,
  HANDLE_INPUT,
  EDIT_TODO,
  DELETE_TODO
} from '../actions'
const initialState = {
  todos: [],
  inputValue: ''
}

const todosReducers = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_TODOS:
        console.log("fetching..");
      return {
        ...state,
        todos: action.payload
      }

    case ADD_TODO:
      let todosList = [...state.todos]
      todosList.push(action.payload)
      return {
        ...state,
        todos: todosList
      }
    case HANDLE_INPUT:
      return {
        ...state,
        inputValue: action.payload
      }
    case RESET_INPUT:
      return {
        ...state,
        inputValue: ''
      }
    case CHANGE_STATUS:
        console.log(action.payload,"change")
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload.id) {
            return Object.assign({}, todo, {
              status: action.payload.status
            })
          }
          return todo
        })
      }
    case EDIT_TODO:
      console.log(action.payload,"edit")
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload.id) {
            return Object.assign({}, todo, {
              name: action.payload.name
            })
          }
          return todo
        })
      }
    case DELETE_TODO:
      let todoList = [...state.todos]
      todoList = todoList.filter(item => item.id !== action.payload.id)
      return {
        ...state,
        todos: todoList
      }
    default:
      return state
  }
}
export default todosReducers
