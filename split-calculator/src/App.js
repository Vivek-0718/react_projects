import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Sidebar from "./components/Sidebar";
import Spilitbillform from "./components/Spilitbillform";

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
  let [currFriendsList, setFriendsList] = useLocalStorage(
    "friendsList",
    initialFriends,
  );
  let [selectedFriend, setSelectedFriend] = useState(null);
  function handleFriendList(e) {
    setFriendsList((pre) => [...currFriendsList, e]);
  }

  function handleSelectFriend(friend) {
    setSelectedFriend(friend);
  }

  function handleUpdateFriend(updatedFriend) {
    setFriendsList((prev) =>
      prev.map((f) => (f.id === updatedFriend.id ? updatedFriend : f)),
    );
    setSelectedFriend(null); 
  }
  return (
    <div className="app">
      <Sidebar
        handleFriendList={handleFriendList}
        currFriendsList={currFriendsList}
        handleSelectFriend={handleSelectFriend}
        selectedFriend={selectedFriend}
      ></Sidebar>
      <Spilitbillform
        currFriendsList={currFriendsList}
        selectedFriend={selectedFriend}
        setSelectedFriend={setSelectedFriend}
        handleUpdateFriend={handleUpdateFriend}
      ></Spilitbillform>
    </div>
  );
}
