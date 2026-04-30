import { useState } from "react";

export default function Addsection({ handleFriendList, setaddFormOpen }) {
  let [currname, setName] = useState("");
  let [img, setimg] = useState("https://i.pravatar.cc/48");
  let frdId = Math.floor(Math.random() * 99999);
  function createFrienObj(e) {
    e.preventDefault();
    // const newImg = `https://i.pravatar.cc/48/?u=${frdId}`;
    if (!currname|| !img) return;
    let obj = {
      name: currname,
      id: frdId,
      image: `${img}/?u=${frdId}`,
      balance: 0,
    };
    handleFriendList(obj);
    setName("");
    setaddFormOpen(false);
  }
  return (
    <form className="form-add-friend" onSubmit={(e) => createFrienObj(e)}>
      <label htmlFor="name">Friend name</label>
      <input
        id="name"
        type="text"
        value={currname}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="image">Image URL</label>
      <input
        type="text"
        id="image"
        value={img}
        onChange={(e) => setimg(e.target.value)}
      />
      <button className="button">Add</button>
    </form>
  );
}
