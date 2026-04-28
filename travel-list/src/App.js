import { useState } from "react";
import "./App.css";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

export default function App() {
  let [item, setItems] = useState(initialItems);
  function handleAdditems(newItem) {
    setItems((pre) => [...pre, newItem]);
  }
  function handleRemoveItem(item) {
    setItems((prev)=>prev.filter((e)=>e.id!==item.id))
  }
  function handleClearItems() {
    setItems([]);
  }
  return (
    <div className="app">
      <h1>Travel List</h1>
      <Form onAdditems={handleAdditems}></Form>
      <List
        item={item}
        onremoveitem={handleRemoveItem}
        onClearItems={handleClearItems}
      ></List>
      <Stats></Stats>
    </div>
  );
}

function Form({ onAdditems }) {
  let [description, setDec] = useState("");
  let [quantity, setQuantity] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();
    if (!description) return;
    let newItem = { id: Date.now(), description, quantity, packed: false };
    onAdditems(newItem);

    setDec("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for the '😍' trip?</h3>
      <div className="formElements">
        <select
          name="itemCount"
          value={quantity}
          onChange={(e) => {
            setQuantity(Number(e.target.value));
          }}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((val) => {
            return (
              <option value={val} key={val}>
                {val}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          name="add items"
          placeholder="item"
          value={description}
          onChange={(e) => setDec(e.target.value)}
        />
        <button>Add</button>
      </div>
    </form>
  );
}

function List({ item, onremoveitem, onClearItems }) {
  return (
    <div className="list">
      <ul>
        {item.map((item) => {
          return (
            <Li item={item} key={item.id} onremoveitem={onremoveitem}></Li>
          );
        })}
      </ul>
      <div className="actions">
        {/* <select name="" id="">
          Sort by
        </select> */}
        <button onClick={() => onClearItems()}>Clear List</button>
      </div>
    </div>
  );
}

function Li({ item, onremoveitem }) {
  const [ispack, setPack] = useState(item.packed);
  return (
    <li className={`${ispack ? "text-line" : ""}`}>
      <input
        type="checkbox"
        name=""
        id=""
        checked={ispack}
        onChange={() => setPack((ref) => !ispack)}
      />
      <span>{item.quantity}</span>
      <span>{item.description}</span>
      <button onClick={() => onremoveitem(item)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <em className="stats">
      💼 Happy Travel
    </em>
  );
}
