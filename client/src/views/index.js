import Checkout from "./Checkout";
import Cart from "./Cart";
import Home from "./Home";
import Shop from "./Store";

const routes = [
  {
    path: "/checkout",
    component: Checkout,
  },
  {
    path: "/",
    component: Home,
  },
  {
    path: "/cart",
    component: Cart,
  },
  {
    path: "/shop",
    component: Shop,
  },
];

export default routes;
