import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 12, packed: true },
// ];

type ItemType = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
};
interface ItemProps {
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
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🪅🪅🪅 Far Away 🪅🪅🪅</h1>;
}

function Form({ onAddItems }: { onAddItems: (item: ItemType) => void }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
}: {
  items: ItemProps[];
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
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
      </div>
    </div>
  );
}

function Item({
  item,
  onDeleteItem,
  onToggleItem,
}: {
  item: ItemType;
  onDeleteItem: (id: number) => void;
  onToggleItem: (id: number) => void;
}) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description} {item.quantity}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
function Stats(items: { items: ItemProps[] }) {
  if (!items.items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list.</em>
      </p>
    );
  const numItems = items.items.length;
  const numPacked = items.items.filter((item) => item.item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything ready to go!"
          : `You have ${numItems} items on your list, and you already packed
        ${numPacked} ${percentage} (%)`}
      </em>
    </footer>
  );
}
