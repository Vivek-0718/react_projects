import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
export default function App() {
  let [currFriendsList, setFriendsList] = useState(initialFriends);
  let [selectedFriend, setSelectedFriend] = useState(null);
  function handleFriendList(e) {
    setFriendsList((pre) => [...currFriendsList, e]);
  }

  function handleSelectFriend(friend) {
    setSelectedFriend(friend);
  }
  return (
    <div className="app">
      <Sidebar
        handleFriendList={handleFriendList}
        currFriendsList={currFriendsList}
        handleSelectFriend={handleSelectFriend}
      ></Sidebar>
      <Spilitbillform
        currFriendsList={currFriendsList}
        selectedFriend={selectedFriend}
      ></Spilitbillform>
    </div>
  );
}

function Sidebar({ handleFriendList, currFriendsList, handleSelectFriend }) {
  let [addFormIsOpen, setaddFormOpen] = useState(false);
  return (
    <div className="sidebar">
      <ul>
        {currFriendsList.map((e) => (
          <Li
            friends={e}
            key={e.id}
            handleSelectFriend={handleSelectFriend}
          ></Li>
        ))}
      </ul>
      {addFormIsOpen ? (
        <>
          <Addsection
            handleFriendList={handleFriendList}
            setaddFormOpen={setaddFormOpen}
          ></Addsection>
          <button className="button" onClick={() => setaddFormOpen(false)}>
            Close
          </button>
        </>
      ) : (
        <button className="button" onClick={() => setaddFormOpen(true)}>
          Add Friend
        </button>
      )}
    </div>
  );
}

function Li({ friends, handleSelectFriend }) {
  return (
    <li>
      <img src={`${friends.image}`} alt="" />
      <h3>{friends.name}</h3>
      <p
        className={
          friends.balance < 0
            ? "red"
            : friends.balance > 0
              ? "green"
              : `You and ${friends.name} are even`
        }
      >
        {friends.balance < 0
          ? `You owe ${friends.name} ${Math.abs(friends.balance)}$`
          : friends.balance > 0
            ? `${friends.name} owes you ${friends.balance}$`
            : `You and ${friends.name} are even`}
      </p>
      <button className="button" onClick={() => handleSelectFriend(friends)}>
        Select
      </button>
    </li>
  );
}

function Addsection({ handleFriendList, setaddFormOpen }) {
  let [currname, setName] = useState("");
  let frdId = Math.floor(Math.random() * 99999);
  function createFrienObj(e) {
    e.preventDefault();
    const newImg = `https://i.pravatar.cc/48/?u=${frdId}`;
    let obj = { name: currname, id: frdId, image: newImg, balance: 0 };
    handleFriendList(obj);
    setName("");
    setaddFormOpen(false);
  }
  return (
    <form className="form-add-friend" onSubmit={(e) => createFrienObj(e)}>
      <label htmlFor="name">👫 Friend name</label>
      <input
        id="name"
        type="text"
        value={currname}
        required
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="image">🌄 Image URL</label>
      <input type="text" id="image" defaultValue="https://i.pravatar.cc/48" />
      <button className="button">
        Add
      </button>
    </form>
  );
}

function Spilitbillform({ currFriendsList, selectedFriend }) {
  let [bill, setBill] = useState(0);
  let [expence, setyourexpence] = useState(0);
  let [youPaid, setwhopaid] = useState(true);

  return (
    <>
      {selectedFriend && (
        <form class="form-split-bill">
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
            onChange={(e) => setyourexpence(Number(e.target.value))}
          />
          <label>👫 {selectedFriend.name}'s expense</label>
          <input type="number" disabled value={bill - expence} />
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
        </form>
      )}
    </>
  );
}
