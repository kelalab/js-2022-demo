import { createSignal, Component, For, Show, onMount } from "solid-js";
import "./App.css";
import Modal from "./components/Modal";
import NewTodo from "./components/NewTodo";
import { HiOutlineTrash as TrashIcon } from "solid-icons/hi";
import type { AppRouter } from "../../server/index";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

type Todo = {
  id: number;
  todo: string;
  DONE: boolean;
};

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/trpc",
    }),
  ],
});

const App: Component = () => {
  const [todos, setTodos] = createSignal<Todo[]>([
    { id: 0, todo: "esimerkki", DONE: false },
  ]);
  const [addModal, setAddModal] = createSignal(false);

  const handleClick = async (todo: Todo) => {
    todo.DONE = !todo.DONE;
    await updateTodo(todo);
    /*let idx = todos().indexOf(todo);
    let _todos = [...todos()].filter((t) => t.id !== todo.id);
    _todos.splice(idx, 0, todo);
    setTodos(_todos);*/
    //setTodos([..._todos, todo]);
  };

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

  const getTodosTrpc = async () => {
    const result = await trpc.todos.list.query();
    console.log("trpc_todo_json", result);
    // convert typing
    const todo_arr: Todo[] = [];
    result.forEach((r) =>
      todo_arr.push({ id: r.id, todo: r.todo, DONE: Boolean(r.DONE) })
    );
    setTodos(todo_arr);
  };

  const openAddModal = () => {
    console.log("clicked");
    setAddModal(true);
  };

  const handleAddTodo = async (todo: string) => {
    console.log("adding todo", todo);
    /*let todo_res = await fetch("/todos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ todo: todo, DONE: false }),
    });
    let todo_json = await todo_res.json();
    console.log("add todo_json", todo_json);
    await getTodos();*/
    await addTodoTrpc(todo);
    setAddModal(false);
  };

  const addTodoTrpc = async (todo: string) => {
    let res = await trpc.todos.create.mutate({ todo: todo, DONE: false });
    console.log("trpc_create_res", res);
    await getTodos();
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
    await removeTodoTrpc(todo);
    await getTodos();
  };

  const removeTodoTrpc = async (todo: Todo) => {
    await trpc.todos.delete.mutate(todo);
  };

  const updateTodo = async (todo: Todo) => {
    console.log("updating", todo);
    /*await fetch("/todos", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(todo),
    });*/
    await updateTodoTrpc(todo);
    await getTodos();
  };

  const updateTodoTrpc = async (todo: Todo) => {
    await trpc.todos.update.mutate(todo);
  };

  onMount(() => {
    getTodos();
    getTodosTrpc();
  });

  return (
    <div class="App w-full flex-1">
      <div class="text-left w-full flex-1">
        <h1 class="mb-8">Simple todo app</h1>
        <div class="border-slate-500 border-2 p-2">
          <div class="flex mb-4 border-b-2 pb-2">
            <div class="flex-auto">Tehtävä</div>
            <div class="flex-initial basis-60 items-start">Tehty</div>
            <div class="flex-initial basis-10">Poista</div>
          </div>
          <For each={todos()}>
            {(todo, idx) => {
              return (
                <div class="flex mb-4 border-b-2 pb-2">
                  <div class="flex-auto">{todo.todo}</div>
                  <div class="flex-initial basis-60 text-left">
                    <input
                      type="checkbox"
                      checked={todo.DONE}
                      onChange={() => handleClick(todo)}
                    ></input>
                  </div>
                  <div class="flex-initial basis-10">
                    <button class="py-0 px-1" onClick={() => removeTodo(todo)}>
                      <TrashIcon class="h-5 w-5 text-white" />
                    </button>
                  </div>
                </div>
              );
            }}
          </For>
        </div>
        <button class="mt-8" onClick={() => openAddModal()}>
          Add todo
        </button>
        <Show when={addModal()}>
          <Modal close={() => setAddModal(false)} title="Lisää tehtävä">
            <NewTodo onAdd={handleAddTodo}></NewTodo>
          </Modal>
        </Show>
      </div>
      <div>&copy; Kelalab 2022</div>
    </div>
  );
};

export default App;
