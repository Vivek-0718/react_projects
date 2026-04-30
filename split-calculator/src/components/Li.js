export default function Li({ friends, handleSelectFriend, selectedFriend }) {
  return (
    <li
      className={
        selectedFriend !== null && selectedFriend.id === friends.id
          ? "selected"
          : ""
      }
    >
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
          ? `You owe ${friends.name} ${Math.abs(friends.balance)}₹`
          : friends.balance > 0
            ? `${friends.name} owes you ${friends.balance}₹`
            : `You and ${friends.name} are even`}
      </p>
      <button
        className="button"
        onClick={() =>
          selectedFriend !== null && selectedFriend.id === friends.id
            ? handleSelectFriend(null)
            : handleSelectFriend(friends)
        }
      >
        {selectedFriend !== null && selectedFriend.id === friends.id
          ? "Close"
          : "Select"}
      </button>
    </li>
  );
}
