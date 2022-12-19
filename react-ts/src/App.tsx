import { useEffect, useState } from "react";
import "./App.css";
import Modal from "./components/Modal";
import NewTodo from "./components/NewTodo";
import { TrashIcon } from "@heroicons/react/24/outline";

type Todo = {
  id: number;
  todo: string;
  DONE: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [addModal, setAddModal] = useState(false);

  const getTodos = async () => {
    const result = await fetch("/todos", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await result.json();
    console.log("todo_json", json);
    setTodos(json);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleClick = async (todo: Todo) => {
    todo.DONE = !todo.DONE;
    await updateTodo(todo);
    await getTodos();
    /* let idx = todos.indexOf(todo);
    let _todos = [...todos].filter((t) => t.id !== todo.id);
    _todos.splice(idx, 0, todo);
    setTodos(_todos);*/
    //setTodos([..._todos, todo]);
  };

  const openAddModal = () => {
    console.log("clicked");
    setAddModal(true);
  };

  const handleAddTodo = async (todo: string) => {
    console.log("adding todo", todo);
    const _todos = [...todos];
    let newId = 1;
    if (todos.length > 0) {
      newId = _todos[_todos.length - 1].id + 1;
    }
    _todos.push({ id: newId, todo: todo, DONE: false });
    let todo_res = await fetch("/todos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ todo: todo, DONE: false }),
    });
    let todo_json = await todo_res.json();
    console.log("add todo_json", todo_json);
    await getTodos();
    //setTodos(_todos);
    setAddModal(false);
  };

  const removeTodo = async (todo: Todo) => {
    console.log("removing", todo);
    await fetch("/todos", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    await getTodos();
  };

  const updateTodo = async (todo: Todo) => {
    console.log("updating", todo);
    await fetch("/todos", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    await getTodos();
  };

  return (
    <div className="App w-full flex-1">
      <div className="text-left w-full flex-1">
        <h1 className="mb-8">Simple todo app</h1>
        <div className="border-slate-500 border-2 p-2">
          <div className="flex mb-4 border-b-2 pb-2">
            <div className="flex-auto">Tehtävä</div>
            <div className="flex-initial basis-60 items-start">Tehty</div>
            <div className="flex-initial basis-10">Poista</div>
          </div>
          {todos.map((todo, idx) => {
            return (
              <div key={`row-${idx}`} className="flex mb-4 border-b-2 pb-2">
                <div className="flex-auto">{todo.todo}</div>
                <div className="flex-initial basis-60 text-left">
                  <input
                    type="checkbox"
                    checked={todo.DONE}
                    onChange={() => handleClick(todo)}
                  ></input>
                </div>
                <div className="flex-initial basis-10">
                  <button
                    className="py-0 px-1"
                    onClick={() => removeTodo(todo)}
                  >
                    <TrashIcon className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <button className="mt-8" onClick={() => openAddModal()}>
          Add todo
        </button>
        {addModal && (
          <Modal close={() => setAddModal(false)} title="Lisää tehtävä">
            <NewTodo onAdd={handleAddTodo}></NewTodo>
          </Modal>
        )}
      </div>
      <div>&copy; Kelalab 2022</div>
    </div>
  );
}

export default App;
