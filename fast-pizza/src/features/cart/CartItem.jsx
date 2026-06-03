import ItemCounter from "../../ui/ItemCounter";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <ItemCounter
        pizzaId={pizzaId}
        quantity={quantity}
        totalPrice={totalPrice}
      ></ItemCounter>
    </li>
  );
}

export default CartItem;
