import { createSignal, Component } from "solid-js";

interface NewTodoProps {
  onAdd?: Function;
}

const NewTodo: Component<NewTodoProps> = (props: NewTodoProps) => {
  const [todo, setTodo] = createSignal("");
  const { onAdd } = props;
  return (
    <div>
      <label for="todoInput">Tehtävä:</label>
      <input
        id="todoInput"
        value={todo()}
        onChange={(e) => setTodo(e.currentTarget.value)}
      ></input>
      <div>
        <button onClick={() => (onAdd ? onAdd(todo()) : undefined)}>
          Lisää
        </button>
        <button>Peruuta</button>
      </div>
    </div>
  );
};

export default NewTodo;
