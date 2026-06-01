import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../service/apiRestaurant";

import MenuItem from "./MenuItem";

function Menu() {
  const menuList = useLoaderData();
  return (
    <ul className="divide-y divide-stone-200 py-4">
      {menuList.map((menu) => {
        return <MenuItem pizza={menu} key={menu.id}></MenuItem>;
      })}
    </ul>
  );
}

export default Menu;

export async function MenuLoader() {
  const menu = await getMenu();
  return menu;
}
