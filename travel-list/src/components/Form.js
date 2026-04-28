import { useState } from "react";

export default function Form({ onAdditems }) {
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
          onChange={(e) => setDec(e.target.value)} />
        <button>Add</button>
      </div>
    </form>
  );
}
