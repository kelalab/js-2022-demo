import { MouseEventHandler, useState } from "react";

interface NewTodoProps {
  onAdd?: Function;
}

const NewTodo = (props: NewTodoProps) => {
  const [todo, setTodo] = useState("");
  const { onAdd } = props;
  return (
    <>
      <label htmlFor="todoInput">Tehtävä:</label>
      <input
        id="todoInput"
        value={todo}
        onChange={(e) => setTodo(e.currentTarget.value)}
      ></input>
      <div>
        <button onClick={() => (onAdd ? onAdd(todo) : undefined)}>Lisää</button>
        <button>Peruuta</button>
      </div>
    </>
  );
};

export default NewTodo;
