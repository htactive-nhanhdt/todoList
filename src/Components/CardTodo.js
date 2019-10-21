import React from 'react'
import { Card } from 'antd'
import Todo from './Todo'
import { DropTarget } from 'react-dnd'
import { changeStatus } from "../actions"

/* LOGIC CỦA DROP ITEM */
function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    todo: monitor.getItem(),
    monitor: monitor
  }
}
const spec= {
  drop(props, monitor, component){
   return props
  } 
}
/* LOGIC CỦA DROP ITEM ^^^^*/

/* Card TODO Component-start */
const CardTodo = props => {
  const {
    dispatch,
    title,
    todos,
    connectDropTarget,  
  } = props
  
  const handleDrop= (item) => {
    dispatch(changeStatus(item))
}
  return connectDropTarget(
    <div className='todoItems'>
      <Card
        title={`${title} has ${todos.length} items`}
        bordered={false}
        style={{ width: "32%" }}
      >
        {todos.map(todo => (
          <Todo
          handleDrop={(item)=> handleDrop(item)}
            defaultSelect={title}
            key={todo.id}
            todo={todo}
            className='todo'
            dispatch={dispatch}           
          />
        ))}
      </Card>
    </div>
  )
}
/* Card TODO Component-end */
export default DropTarget('todo',spec, collect)(CardTodo)
