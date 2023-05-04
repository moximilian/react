
import "./style.css"
import { useState } from 'react'






export default function App() {
  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState([])

  

  /*function SaveTodos() {

    todos.map(todo => {
      db.query("INSERT INTO `todo`(id,title,completed) VALUES(?,?,?)", [todo.id, todo.title, todo.completed])
    })

  }*/

  function handleSubmit(e) {
    e.preventDefault()
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        {
          id: crypto.randomUUID(), title: newItem, completed:
            false
        },
      ]
    })
    console.log(setTodos)
    setNewItem('')
  }
  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }
        return todo
      })
    })
  }
  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }
  function deleteCheckedTodos() {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.completed == false)
    })
    return todos
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New item</label>
          <input
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            type="text"
            id="item"
          />
        </div>
        <button className="btn"> Add</button>
        <button type='button' onClick={() => deleteCheckedTodos()} className="btn btn-danger"> Delete Checked</button>
      </form>
      <h1 className='header'>To Do list</h1>
      <ul className="list">
        {todos.map(todo => {
          return <li key={todo.id}>
            <label>
              <input type="checkbox" checked={todo.
                completed}
                onChange={e => toggleTodo(todo.id, e.target.checked)} />
              {todo.title}
            </label>
            <button onClick={() => deleteTodo(todo.id)} className='btn btn-danger'>Delete</button>        </li>
        })}
      </ul>
    </>
  )
}