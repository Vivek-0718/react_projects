export default function Stats({ item }) {
  let packedItems = item.reduce((agg, val) => {
    return val.packed ? agg + 1 : agg;
  }, 0);
  if (packedItems === 0) {
    return <em className="stats">✅ Start Packing</em>;
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
