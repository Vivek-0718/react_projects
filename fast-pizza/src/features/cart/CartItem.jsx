import { formatCurrency } from "../../utils/helpers";
import Button from "./../../ui/Button";
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p>{formatCurrency(totalPrice)}</p>
        <div className="flex items-center gap-2 md:gap-3">
          <Button type="small">-</Button>
          <span className="text-sm font-medium">2</span>
          <Button type="small">+</Button>
        </div>
        <Button type="primary">Delete</Button>
      </div>
    </li>
  );
}

export default CartItem;
