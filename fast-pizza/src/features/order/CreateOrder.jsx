import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { store } from "./../../store";
import { createOrder } from "../../service/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { getCart, clearCart } from "./../cart/cartSlice";
import EmptyCart from "./../cart/EmptyCart";
import { fetchAddress, getCurrentAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const cart = useSelector(getCart);
  const errors = useActionData();
  const { username } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const address = useSelector(getCurrentAddress);
  if (!cart.length) return <EmptyCart></EmptyCart>;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              defaultValue={username}
              className="input grow"
              type="text"
              name="customer"
              required
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {errors?.phone && (
              <p className="text-xs text-red-500">{errors.phone}</p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              value={address}
            />
          </div>
          <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
            <Button type="small" onClick={() => dispatch(fetchAddress())}>
              Address
            </Button>
          </span>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div className="">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting ? "Placing order.." : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;

export async function action({ request }) {
  const data = await request.formData();
  let orderDetails = Object.fromEntries(data);
  orderDetails = {
    ...orderDetails,
    priority: orderDetails.priority === "on",
    cart: orderDetails.cart ? JSON.parse(orderDetails.cart) : [],
  };

  const errors = {};
  if (!isValidPhone(orderDetails.phone)) {
    errors["phone"] = "Enter a valid mobile number";
    return errors;
  }
  const newOrder = await createOrder(orderDetails);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
