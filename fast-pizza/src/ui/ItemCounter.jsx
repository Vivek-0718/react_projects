import { formatCurrency } from "./../utils/helpers";
import Button from "./../ui/Button";
import { increaseItemCount, decreaseItemCount, deleteItem } from "./../features/cart/cartSlice";
import { useDispatch } from "react-redux";
function ItemCounter({ pizzaId, quantity, totalPrice }) {
  const dispatch = useDispatch();
  function handleDecrease() {
    dispatch(decreaseItemCount(pizzaId));
  }
  function handleIncrease() {
    dispatch(increaseItemCount(pizzaId));
  }
  function handleDelete() {
    dispatch(deleteItem(pizzaId));
  }
  return (
    <div className="flex items-center justify-between gap-6">
      <p>{formatCurrency(totalPrice)}</p>
      <div className="flex items-center gap-2 md:gap-3">
        <Button onClick={() => handleDecrease()} type="round">
          -
        </Button>
        <span className="text-sm font-medium">{quantity}</span>
        <Button onClick={() => handleIncrease()} type="round">
          +
        </Button>
      </div>
      <Button onClick={() => handleDelete()} type="small">
        Delete
      </Button>
    </div>
  );
}

export default ItemCounter
