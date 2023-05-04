
import "./style.css"
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'




export default function App() {
  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState([])
  
  const [state, setState] = useState(0);
  const renderCount = useRef(0);
  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });

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
          id: renderCount.current, title: newItem, completed:
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
    SortToDosById()
    SortToDos()
  }
  function SortToDosById(){
    setTodos(currentTodos =>{
      return currentTodos.sort((a, b) => {
        if(b.id <= a.id && a.completed===false) {
          return 1;
        }
        return -1;
      });
    })
  }
  function SortToDos(){
    setTodos(currentTodos =>{
      return currentTodos.sort((a, b) => {
        if(!b.completed) {
          return 1;
        }
        return -1;
      });
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
          return <li key={todo.id} id = {todo.id} >
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