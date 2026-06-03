import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import Button from "./../../ui/Button";
import { addItem, getCart } from "./../cart/cartSlice";
import ItemCounter from "../../ui/ItemCounter";
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const cart  = useSelector(getCart);
  const clickedItem = cart.find((item) => item.pizzaId === id)
  function handleAddtoCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      price: unitPrice,
      totalPrice: unitPrice,
    };
    dispatch(addItem(newItem));
  }
  return (
    <li className="flex gap-4 py-2">
      <img
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
        src={imageUrl}
        alt={name}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-semibold">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {clickedItem?.quantity >= 1 ? (
            <ItemCounter
              pizzaId={clickedItem.pizzaId}
              quantity={clickedItem.quantity}
              totalPrice={clickedItem.totalPrice}
            ></ItemCounter>
          ) : (
            !soldOut && (
              <Button onClick={() => handleAddtoCart()} type="small">
                Add to cart
              </Button>
            )
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
