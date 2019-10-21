import React, { useState, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { Button, Form, Input, message } from 'antd'
import HTML5Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import randomId from 'random-id'
import {
  fetchTodos,
  addTodo,
  resetInput,
  handleInputAdd,
} from './actions'
import CardTodo from './Components/CardTodo'
import './App.css'

function App (props) {
  const [showAdd, setShowAdd] = useState(false)
  const shield = useSelector(state => state.shield)
  const len = 10
  const pattern = 'aA0'
  const { todos, reset, addTodo, fetchTodos, inputValue, handleInputAdd } = props
  const Status = [
    { title: 'NEW' },
    { title: 'INPROGRESS' },
    { title: 'COMPLETE' }
  ]
/*Sử dụng như componentDidmount*/
  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  /*Logic xử lí Add todo */
  const createTodo = e => {
    e.preventDefault()
    if (e.target[0].value.trim() === '') {
      return message.error('Empty todo!!', 1)
    } else {
      let content = {
        id: randomId(len, pattern),
        name: e.target[0].value,
        status: 'NEW'
      }
      addTodo(content)
      reset()
    }
  }
 /*------------------- */
 /*Logic xử lí onChangeInput update state inputValue=> dùng cho sau này reset input value */

  const handleOnChange = e => {
    return handleInputAdd(e.target.value)
  }
  /*------------------- */

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='App'>
        <div
          className='shield'
          style={shield ? { display: 'block' } : { display: 'none' }} /*sử dụng shield để lúc EDIT TODO ko
           cho thực hiện các thao tác ADD TODO*/
        /> 
        {!showAdd && (
          <Button
            type='primary'
            onClick={() => setShowAdd(true)}
            className='button-add'
          >
            New +
          </Button>   /* Logic hiển thị hoặc disable nút New*/        
          )}
        {showAdd && (
          <Form className='form-add' onSubmit={e => createTodo(e)}> 
            <Input
              type='text'
              placeholder='Add new todos'
              value={inputValue}
              onChange={e => handleOnChange(e)}    
            />
            <Button htmlType='submit'>Add</Button>
          </Form> /* Logic hiển thị hoặc disable input value*/
        )}
        <div className='cardsTodo'>
          {Status.map((item, index) => (
            <CardTodo
              key={index}
              todos={todos.filter(todo => item.title === todo.status)}
              title={item.title}
              dispatch={props.dispatch}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  )
}

const mapStateToProps = state => ({
  todos: state.listTodo.todos,
  inputValue: state.listTodo.inputValue
})
const mapDispatchToProps = dispatch => ({
  addTodo: e => dispatch(addTodo(e)),
  handleInputAdd: e => dispatch(handleInputAdd(e)),
  fetchTodos: () => dispatch(fetchTodos()),
  reset: () => dispatch(resetInput()),
  dispatch
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
