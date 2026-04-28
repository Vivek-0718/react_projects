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
    setItems([]);
  }

  function filterByName() {
    let a = item.sort();
    console.log(a);
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
        filterByName={filterByName}
      ></List>
      <Stats item={item}></Stats>
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

function List({
  item,
  onremoveitem,
  onClearItems,
  onUpdateItem,
  filterByName,
}) {
  return (
    <div className="list">
      <ul>
        {item.map((item) => {
          return (
            <Li
              item={item}
              key={item.id}
              onremoveitem={onremoveitem}
              onUpdateItem={onUpdateItem}
            ></Li>
          );
        })}
      </ul>
      <div className="actions">
        {/* <select
          name=""
          id=""
          onChange={(e) => (e.target.value === "byItems" ? filterByName() : "")}
        >
          <option value="byInput">Sort by input order</option>
          <option value="byItems">Sort by items</option>
          <option value="byPackedstatus">Sort by packed status</option>
        </select> */}
        <button onClick={() => onClearItems()}>Clear List</button>
      </div>
    </div>
  );
}

function Li({ item, onremoveitem, onUpdateItem }) {
  return (
    <li className={`${item.packed ? "text-line" : ""}`}>
      <input
        id={item.id}
        type="checkbox"
        checked={item.packed}
        onChange={() => onUpdateItem(item)}
      />
      <label className="li-lable" htmlFor={item.id}>
        <span>{item.quantity}</span>
        <span>{item.description}</span>
        <button onClick={() => onremoveitem(item)}>❌</button>
      </label>
    </li>
  );
}

function Stats({ item }) {
  let packedItems = item.reduce((agg, val) => {
    return val.packed ? agg + 1 : agg;
  }, 0);
  if (packedItems === 0) {
    return <em className="stats">✅Start Packing</em>;
  }
  return (
    <>
      {packedItems / item.length !== 1 ? (
        <em className="stats">
          💼 You have {item.length} items on your list, and you already packed{" "}
          {packedItems} (
          {packedItems && item.length
            ? Math.round((packedItems / item.length) * 100)
            : 0}
          %)
        </em>
      ) : (
        <em className="stats">You got everything. Happy Travel.✈️</em>
      )}
    </>
  );
}
