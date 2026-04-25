import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

let root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header></Header>
      <Menu></Menu>
      <Footer></Footer>
    </div>
  );
}
function Header() {
  return (
    <header className="header">
      <h1>Pizza Place</h1>
    </header>
  );
}

function Menu() {
  return (
    <main className="menu">
      {pizzaData.length ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our tone oven, all organic, all delicious.
          </p>
          <h2 className="">Our Menu</h2>
          <ul className="pizzas">
            {pizzaData.map((pizza, i) => (
              <Pizza obj={pizza} key={i} />
            ))}
          </ul>
        </>
      ) : (
        <p>We're working on our menu. Please wait.</p>
      )}
    </main>
  );
}
function Pizza({ obj }) {
  return (
    <li className={`pizza ${obj.soldOut ? "sold-out" : ""}`}>
      <img src={obj.photoName} alt={`${obj.photoName} pizza`}></img>
      <div>
        <h3>{obj.name}</h3>
        <p>{obj.ingredients}</p>
        { !obj.soldOut ? <span>{obj.price}</span> : <span>Sold out</span>}
      </div>
    </li>
  );
}
function Footer() {
  let currHour = new Date().getHours();
  let openHour = 12;
  let closeHour = 23;
  let isOpen = currHour >= openHour && currHour < closeHour;
  return (
    <footer className="footer order">
      {isOpen ? (
        <Order closeHour={closeHour} openHour={openHour}></Order>
      ) : (
        <p>We're closed</p>
      )}
    </footer>
  );
}

function Order({ closeHour, openHour }) {
  return (
    <>
      <p>
        We're open from {openHour}:00 to {closeHour}:00. Visit us or order
        online now.
      </p>
      <button className="btn">Order Now</button>
    </>
  );
}
