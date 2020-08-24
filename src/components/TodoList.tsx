// src/components/TodoList.tsx
import React, { useState } from "react";

import { Item } from "../model"; // we need to import the typ

import TodoItem from "./TodoItem";

export default function TodoList() {
  // note the <Item[]> syntax!
  const [requiredTags, setRequiredTags] = useState<string[]>([]);
  const [list, setList] = useState<Item[]>([
    {
      id: 0,
      text: "Make this app",
      tags: ["react", "typescript"],
      isDone: false,
    },
    {
      id: 1,
      text: "Fall in love with TypeScript",
      tags: ["romantic", "typescript"],
      isDone: false,
    },
  ]); // [["react", "typescript"], ["romantic", "typescript"]] => .flat
  // => ["react", "typescript", "romantic", "typescript"

  // SET["react", "typescript", "romantic"]
  //

  const toggleDone = (id: number) => {
    // map over it to update
    const updatedItems = list.map(item =>
      item.id === id ? { ...item, isDone: !item.isDone } : item
    ); // [{}, {*}, {}]

    setList(updatedItems);
  };

  const tags = Array.from(new Set(list.map(item => item.tags).flat()));

  const toggleTagFilter = (tag: string) => {
    // check if its there, if it is, remove, if not add.
    const isThere = requiredTags.includes(tag);

    if (isThere) {
      const newTags = requiredTags.filter(tagName => tagName !== tag);
      setRequiredTags(newTags);
    } else {
      setRequiredTags([...requiredTags, tag]);
    }
  };
  console.log(requiredTags);

  const filteredList =
    requiredTags.length === 0
      ? list
      : list.filter(item => item.tags.some(tag => requiredTags.includes(tag)));
  // check the item tags
  //item.tags => []
  // filteredTags => []

  // see if any of them are in the filtered array
  // include or exclude based on this.

  return (
    <div>
      <div>
        {tags.map(tag => (
          <button
            style={{
              margin: 5,
              backgroundColor: requiredTags.includes(tag) ? "red" : "",
            }}
            onClick={() => toggleTagFilter(tag)}
            key={tag}
          >
            {tag}
          </button>
        ))}
      </div>
      <span>Active filters: {requiredTags.join(" -- ")}</span>
      <ul>
        {filteredList.map(item => (
          <TodoItem item={item} toggleDone={toggleDone} />
        ))}
      </ul>
    </div>
  );
}
