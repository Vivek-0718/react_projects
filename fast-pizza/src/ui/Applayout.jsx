import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";
function Applayout() {
  const { state } = useNavigation();
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {state === "loading" && <Loader></Loader>}
      <Header></Header>
      <div className="overflow-auto">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      <CartOverview></CartOverview>
    </div>
  );
}

export default Applayout;
