import { Link } from "react-router-dom";
import BackButton from "../../ui/BackButton";
import CartItem from "./CartItem";

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const cart = fakeCart;

  return (
    <div className="px-4 py-3">
      <BackButton to="/menu">&larr; Back to menu</BackButton>
      <h2 className="mt-7 text-xl font-semibold">Your cart, %NAME%</h2>
      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => {
          return <CartItem key={item.name} item={item} />;
        })}
      </ul>
      <div className="mt-6 space-x-2">
        <Link
          to="/order/new"
          className="inline-block rounded-full bg-yellow-400 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed md:px-6 md:py-4"
        >
          Order pizzas
        </Link>
        <button className="inline-block rounded-full border-2 border-stone-300 px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed md:px-6 md:py-3.5">
          Clear cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
