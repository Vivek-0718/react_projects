import { useState } from "react";
import "./../App.css";
import Stats from "./Stats";
import List from "./List";
import Form from "./Form";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Charger", quantity: 12, packed: false },
];

export default function App() {
  let [item, setItems] = useState(initialItems);
  function handleAdditems(newItem) {
    setItems((pre) => [...pre, newItem]);
  }
  function handleUpdateItem(item) {
    setItems((prev) =>
      prev.map((ele) => {
        return ele.id === item.id ? { ...ele, packed: !item.packed } : ele;
      }),
    );
  }
  function handleRemoveItem(item) {
    setItems((prev) => prev.filter((e) => e.id !== item.id));
  }
  function handleClearItems() {
    if (window.confirm("Are you sure you want to delete all items?")) {
      setItems([]);
    }
  }
  return (
    <div className="app">
      <h1>Travel List</h1>
      <Form onAdditems={handleAdditems}></Form>
      <List
        item={item}
        onremoveitem={handleRemoveItem}
        onClearItems={handleClearItems}
        onUpdateItem={handleUpdateItem}
      ></List>
      <Stats item={item}></Stats>
    </div>
  );
}
