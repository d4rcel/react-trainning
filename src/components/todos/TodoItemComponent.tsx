import { TodoItem, TodoItemProps } from "../../types/todos"



const TodoItemComponent: React.FC<TodoItemProps> = ({ id, checked, title, onChecked, onDelete }) => {
  return (
    <div className="flex items-center max-w-xl gap-6 mb-2">
      <input type="checkbox" checked={checked} onChange={(e) => onChecked(id, e.target.checked)} className="cursor-pointer" />
      <span onClick={() => onChecked(id, !checked)} className="cursor-pointer" >{title} </span>

      <button onClick={() => onDelete(id)} className="bg-red-400 p-1 cursor-pointer">Delete</button>

    </div>
  )
}

export default TodoItemComponent