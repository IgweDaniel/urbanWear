import Checkout from "./Checkout";
import Cart from "./Cart";
import Home from "./Home";
import Shop from "./Shop";

import ProductDetail from "./ProductDetail";

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
    path: "/shop/",
    component: Shop,
  },
  {
    path: "/shop/:category",
    component: Shop,
  },
  {
    path: "/product/:slug",
    component: ProductDetail,
  },
];

export default routes;
