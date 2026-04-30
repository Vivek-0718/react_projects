import { useState } from "react";
import Li from "./Li";
import Addsection from "./Addsection";

export default function Sidebar({
  handleFriendList,
  currFriendsList,
  handleSelectFriend,
  selectedFriend,
}) {
  let [addFormIsOpen, setaddFormOpen] = useState(false);
  return (
    <div className="sidebar">
      <ul>
        {currFriendsList.map((e) => (
          <Li
            friends={e}
            key={e.id}
            handleSelectFriend={handleSelectFriend}
            selectedFriend={selectedFriend}
          ></Li>
        ))}
      </ul>
      {addFormIsOpen && (
        <Addsection
          handleFriendList={handleFriendList}
          setaddFormOpen={setaddFormOpen}
        ></Addsection>
      )}
      <button className="button" onClick={() => setaddFormOpen((pre) => !pre)}>
        {addFormIsOpen ? "Close" : "Add Friend"}
      </button>
    </div>
  );
}
