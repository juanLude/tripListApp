import { useState } from "react";
import { ItemProps } from "./App";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onDeleteAllItems,
}: {
  items: ItemProps[];
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
  onDeleteAllItems: () => void;
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems: ItemProps[] = [];

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.item.description.localeCompare(b.item.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.item.packed) - Number(b.item.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.item.id}
            item={item.item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sory by input order</option>
          <option value="description">Sory by description</option>
          <option value="packed">Sory by packed status</option>
        </select>
        <button onClick={onDeleteAllItems}>Clear list</button>
      </div>
    </div>
  );
}
