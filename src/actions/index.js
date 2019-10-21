import axios from "axios"
export const FETCH_TODOS = "FETCH_TODOS"
export const ADD_TODO = "ADD_TODO"
export const CHANGE_STATUS= "CHANGE_STATUS"
export const EDIT_TODO= "EDIT_TODO"
export const DELETE_TODO= "DELETE_TODO"
export const SHOW_SHIELD= "SHOW_SHIELD"
export const RESET_INPUT= "RESET_INPUT"
export const HANDLE_INPUT = "HANDLE_INPUT"


export const fetchTodos=()=> (dispatch) =>{
    axios.get(" http://localhost:3001/todos")    
    .then(res=> dispatch({
      type: FETCH_TODOS,
      payload: res.data
    })) 
}
export const addTodo =(content)=> (dispatch) =>{
axios({   
      method: "post"  ,
      url: " http://localhost:3001/todos",
      headers: {
        "content-type": "application/json"
      },
      data: content
  }) 
  .then(res=> 
    dispatch({
    type: ADD_TODO,
    payload: res.data
})
)}

export const changeStatus =(item)=> (dispatch) =>{
  axios({   
        method: "put"  ,
        url: `http://localhost:3001/todos/${item.id}`,
        headers: {
          "content-type": "application/json"
        },
        data: item
    }) 
    .then(res=> dispatch({
      type: CHANGE_STATUS,
      payload: item
  }))}

export const editTodo  = (item) => (dispatch) => {
  axios({   
    method: "put"  ,
    url: `http://localhost:3001/todos/${item.id}`,
    headers: {
      "content-type": "application/json"
    },
    data: item
}) 
.then(()=> dispatch({
  type: EDIT_TODO,
  payload: item
})
)
}  

export const deleteTodo = (item) => dispatch => {
  axios({   
    method: "delete"  ,
    url: `http://localhost:3001/todos/${item.id}`,
    headers: {
      "content-type": "application/json"
    }    
}) 
.then(()=> dispatch({
  type: DELETE_TODO,
  payload: item
})
)
}

export const showShield= (value) => ({
  type:  SHOW_SHIELD ,
  payload: value
 })
 export const handleInputAdd= (text)=>({
   type: "HANDLE_INPUT", 
   payload: text
 })
 export const resetInput = () => ({
   type: RESET_INPUT
 })