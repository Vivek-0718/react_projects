export default function Li({ item, onremoveitem, onUpdateItem }) {
  return (
    <li>
      <input
        id={item.id}
        type="checkbox"
        checked={item.packed}
        onChange={() => onUpdateItem(item)} />
      <label className="li-lable" htmlFor={item.id}>
        <span className={`${item.packed ? "text-line" : ""}`}>
          {item.quantity}
        </span>
        <span className={`${item.packed ? "text-line" : ""}`}>
          {item.description}
        </span>
        <button onClick={() => onremoveitem(item)}>❌</button>
      </label>
    </li>
  );
}



