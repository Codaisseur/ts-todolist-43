import React from "react";
import { Item } from "../model";

type TodoItemProps = {
  item: Item;
  toggleDone: (id: number) => void;
  invert?: boolean;
};

export default function TodoItem(props: TodoItemProps) {
  const {
    item: { id, isDone, text, tags },
    toggleDone,
  } = props;

  return (
    <li style={{ display: "flex" }} key={id}>
      <input type='checkbox' checked={isDone} onChange={() => toggleDone(id)} />
      <h3 style={{ textDecoration: isDone ? "line-through" : "" }}>{text}</h3>
      <p>({tags.join(", ")})</p>
    </li>
  );
}
