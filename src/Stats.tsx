import { ItemProps } from "./App";

export default function Stats(items: { items: ItemProps[] }) {
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
