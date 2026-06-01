import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Cart from "./features/cart/Cart";
import Menu, { MenuLoader } from "./features/menu/Menu";
import CreateOrder, { action as createNewOrder} from "./features/order/CreateOrder";
import Order, {loader as orderdetails} from "./features/order/Order";
import Applayout from "./ui/Applayout";
import Error from "./ui/Error";
const router = createBrowserRouter([
  {
    element: <Applayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: MenuLoader,
        errorElement: <Error />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createNewOrder,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderdetails,
        errorElement: <Error />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
