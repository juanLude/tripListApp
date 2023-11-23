import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export type ItemType = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
};
export interface ItemProps {
  item: ItemType;
}

export default function App() {
  const [items, setItems] = useState<ItemProps[]>([]);

  function handleAddItems(item: ItemType) {
    setItems((items) => [...items, { item }]);
  }
  function handleDeleteItem(id: number) {
    setItems((items) => items.filter((item) => item.item.id !== id));
  }
  function handleToggleItem(id: number) {
    setItems((items) =>
      items.map((item) =>
        item.item.id === id
          ? { ...item, item: { ...item.item, packed: !item.item.packed } }
          : item
      )
    );
  }
  function handleDeleteAllItems() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onDeleteAllItems={handleDeleteAllItems}
      />
      <Stats items={items} />
    </div>
  );
}
