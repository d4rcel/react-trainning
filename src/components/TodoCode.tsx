import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import styled from "@emotion/styled";
import { AddInput } from "./components/AddInput";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { Header } from "./components/Header";

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 300,
});

/**
* This is the initial todo state.
* Instead of loading this data on every reload,
* we should save the todo state to local storage,
* and restore on page load. This will give us
* persistent storage.
*/
const initialData: Todo[] = [
  {
    id: uuid(),
    label: "Buy groceries",
    checked: false,
    created_at: Date.now()
  },
  {
    id: uuid(),
    label: "Reboot computer",
    checked: false,
    created_at: Date.now()
  },
  {
    id: uuid(),
    label: "Ace CoderPad interview",
    checked: true,
    created_at: Date.now(),
    completed_at: Date.now()
  },
];

function App() {
  const [todos, setTodos] = useState<Todo[]>(initialData);

  const addTodo = useCallback((label: string) => {
    setTodos((prev) => [
      {
        id: uuid(),
        label,
        checked: false,
        created_at: Date.now()
      },
      ...prev,
    ]);

  }, []);



  const handleChange = useCallback((checked: boolean, id: String) => {
    let checkedIndex = -1
    const newTodos = todos.map((todo, index) => {
      if (todo.id === id) {
        checkedIndex = index
        return { ...todo, checked, completed_at: checked ? Date.now() : undefined, }
      } else return todo
    })



    if (checkedIndex !== -1) {
      const checkedTodo = newTodos[checkedIndex]
      let filterTodos = newTodos.filter((_, index) => index !== checkedIndex)

      filterTodos = [...filterTodos, checkedTodo]
      setTodos(filterTodos)
    } else setTodos(todos)

    // setTodos((prevTodos) => prevTodos.map((todo, index) =>
    //   todo.id === id ? { ...todo, checked } : todo
    // ))

  }, [todos]);

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.checked && b.checked) {
      return (a.completed_at || 0) - (b.completed_at || 0); // Completed: ascending
    }
    if (!a.checked && !b.checked) {
      return (b.created_at || 0) - (a.created_at || 0); // Active: descending
    }
    return a.checked ? 1 : -1;
  });

  const handleDelete = useCallback((id: String) => {
    console.log("MICHTO ::: 111", id)
    setTodos((prevTodos) =>
      prevTodos.filter((todo, index) => todo.id !== id)
    )
  }, [])

  return (
    <Wrapper>
      <Header>Todo List</Header>
      <AddInput onAdd={addTodo} />
      <TodoList>
        {todos.map((todo, index) => (
          <TodoItem key={index} {...todo} onChange={handleChange} onDelete={handleDelete} />
        ))}
      </TodoList>
    </Wrapper>
  );
}

export default App;
