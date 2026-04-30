import { useState } from "react";

export default function Spilitbillform({
  currFriendsList,
  selectedFriend,
  setSelectedFriend,
  handleUpdateFriend,
}) {
  let [bill, setBill] = useState(0);
  let [expence, setyourexpence] = useState(0);
  let [youPaid, setwhopaid] = useState(true);
  let expenceDiff = bill - expence;
  function handleSplit(e) {
    e.preventDefault();
    if (!bill) return;
    const balanceChange = youPaid ? expenceDiff : -expence;

    const updatedFriend = {
      ...selectedFriend,
      balance: selectedFriend.balance + balanceChange,
    };

    handleUpdateFriend(updatedFriend);
    setBill(0);
    setyourexpence(0);
    setwhopaid(true);
  }
  function clearPastBalance() {
    const clearedFriend = {
      ...selectedFriend,
      balance: 0,
    };
    handleUpdateFriend(clearedFriend);
  }
  return (
    <>
      {selectedFriend && (
        <form className="form-split-bill" onSubmit={(e) => handleSplit(e)}>
          <h2>Split a bill with {selectedFriend.name}</h2>
          <label>💰 Bill value</label>
          <input
            type="number"
            value={String(Number(bill))}
            onChange={(e) => setBill(Number(e.target.value))}
          />
          <label>🧍Your expense</label>
          <input
            type="number"
            max={bill}
            value={String(Number(expence))}
            onChange={(e) =>
              setyourexpence(
                Number(e.target.value) <= bill
                  ? Number(e.target.value)
                  : String(Number(expence)),
              )
            }
          />
          <label>👫 {selectedFriend.name}'s expense</label>
          <input type="number" disabled value={expenceDiff} />
          <label>🤑 Who is paying the bill</label>
          <select
            name=""
            id=""
            onChange={(e) =>
              setwhopaid(e.target.value === "you" ? true : false)
            }
          >
            <option value="you">You</option>
            <option value="friend">{selectedFriend.name}</option>
          </select>
          <div className="buttonList">
            <button className="button" onClick={() => clearPastBalance()}>
              Clear Past Account
            </button>
            <button className="button">Split Bill</button>
          </div>
        </form>
      )}
    </>
  );
}
