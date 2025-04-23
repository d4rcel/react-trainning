import { useState } from "react"
import TodoItemComponent from "./TodoItemComponent"
import { TodoItem } from "../../types/todos"
import InputForm from "./InputForm"
import { v4 as uuid } from "uuid";


const TodoList = () => {

  const [todos, setTodos] = useState<TodoItem[]>([])

  const handleSubmit = (todoTitle: string) => {
    console.log("TODO ELEMENT :::: ", todoTitle);

    setTodos(prevTodos => ([
      ...prevTodos,
      {
        id: uuid(),
        checked: false,
        title: todoTitle
      }
    ]))

  }


  const handleCheck = (id: string, checked: boolean) => {
    setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? { ...todo, checked } : todo))
  }

  const handleDelete = (id: string) => {
    setTodos(prevTodos=> prevTodos.filter(todo => todo.id !== id ) )
  }

  return (
    <div className="bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-2xl">
      <InputForm onAdd={handleSubmit} />
      {todos.map((todo, index) => (
        <div key={index}>
          <TodoItemComponent id={todo.id} checked={todo.checked} title={todo.title} onChecked={handleCheck} onDelete={handleDelete} />

        </div>
      ))}
    </div>
  )
}

export default TodoList