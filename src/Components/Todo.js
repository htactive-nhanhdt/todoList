import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showShield, changeStatus, editTodo, deleteTodo } from '../actions'
import { DragSource } from 'react-dnd'

import { Select, message, Button } from 'antd'
const { Option } = Select

/* Drag LOGIC*/
const todoSource = {
  beginDrag (props) {
    return props.todo
  },
  endDrag (props, monitor, component) {
    let dropPlace
    if (monitor.getDropResult() === null) {
      return
    } else {
      dropPlace = monitor.getDropResult().title
    }
    let item = { id: props.todo.id, name: props.todo.name, status: dropPlace}

    if (!monitor.didDrop()) {
      return
    }
    return props.handleDrop(item)
  }
}

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}
/*Drag LOGIC^^^*/

/*TODO Component*/
const Todo = props => {
  const [editID, setEdit] = useState(0) /* Set state để hiển thị Edit button và input Edit  */
  const { todo, defaultSelect, isDragging, connectDragSource } = props
  const dispatch = useDispatch()
  const opacity = isDragging ? 0 : 1
  const handleSelect = (id,name,newStatus) => {   
    let item= {id: id, name: name, status:newStatus}
    dispatch(changeStatus(item))
  }

  return connectDragSource(
    <div className='todo' style={{ opacity }}>   
      {todo.id !== editID && <div className="todoName"><p>{todo.name}</p></div> /* Hiển thị todo name lúc chưa EDIT*/ }
      {editID === todo.id && (
        <div className='edit-input'> 
          <input
          className="inputEdit"
            autoFocus
            placeholder={`${todo.name}`}
            onKeyUp={e => {
              if (e.key === 'Enter' && e.target.value.trim() !== '') {
                let item = { id: todo.id, name: e.target.value, status: todo.status }
                dispatch(editTodo(item))
                dispatch(showShield(false))
                setEdit(0)
              }
            }}
            onBlur={e => {
              if (e.target.value.trim() !== '') {
                let item = { id: todo.id, name: e.target.value, status: todo.status  }
                dispatch(editTodo(item))
                dispatch(showShield(false))
                setEdit(0)
              } else {
                message.error('Warning: Edit has input empty!', 2)
              }
            }}
          />        
        </div>
      ) /* Hiển thị todo name lúc EDIT*/
      }
      <div className='todo-btns'>
        <Select
          onChange={e => handleSelect(todo.id, todo.name, e)}
          value={defaultSelect}
        >
          <Option value='NEW'>NEW</Option>
          <Option value='INPROGRESS'>INPROGRESS</Option>
          <Option value='COMPLETE'>COMPLETE</Option>
        </Select>
        {editID === 0 ? (
          <Button
            onClick={() => {
              dispatch(showShield(true))
              setEdit(todo.id)
            }}
          >
            Edit
          </Button>
        ) : (
          ''
        )}
        <Button
          onClick={() => {
            let item = { ...todo }
            dispatch(deleteTodo(item))
          }}
        >
          -
        </Button>
      </div>
    </div>
  )
}
/*TODO Component*/

export default DragSource('todo', todoSource, collect)(Todo)
