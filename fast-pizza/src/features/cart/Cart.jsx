import BackButton from "../../ui/BackButton";
import CartItem from "./CartItem";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.user);
  const cart = useSelector(getCart);
  function handleClear() {
    dispatch(clearCart());
  }
  return (
    <div className="px-4 py-3">
      <BackButton to="/menu">&larr; Back to menu</BackButton>
      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
      {Boolean(cart.length) ? (
        <>
          <ul className="mt-3 divide-y divide-stone-200 border-b">
            {cart.map((item) => {
              return <CartItem key={item.name} item={item} />;
            })}
          </ul>
          <div className="mt-6 space-x-2">
            <Button to="/order/new" type="primary">
              Order pizzas
            </Button>
            <button
              onClick={() => handleClear()}
              className="inline-block rounded-full border-2 border-stone-300 px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed md:px-6 md:py-3.5"
            >
              Clear cart
            </button>
          </div>
        </>
      ) : (
        <>Your cart is still empty. Start adding some pizzas :)</>
      )}
    </div>
  );
}

export default Cart;
