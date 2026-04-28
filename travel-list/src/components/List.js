import { useState } from "react";
import Li from "./Li";
export default function List({ item, onremoveitem, onClearItems, onUpdateItem }) {
  let [sort, setSort] = useState("byInput");
  let sortedItems = [];

  if (sort === "byInput") {
    sortedItems = item;
  } else if (sort === "byItems") {
    sortedItems = [...item].sort((a, b) =>
      a.description.localeCompare(b.description),
    );
  } else if (sort === "byPackedstatus") {
    sortedItems = [...item].sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => {
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
        <select name="" id="" onChange={(e) => setSort(e.target.value)}>
          <option value="byInput">Sort by input order</option>
          <option value="byItems">Sort by items</option>
          <option value="byPackedstatus">Sort by packed status</option>
        </select>
        <button onClick={() => onClearItems()}>Clear List</button>
      </div>
    </div>
  );
}