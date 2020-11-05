import Checkout from "./Checkout";
import Cart from "./Cart";
import Home from "./Home";
import Shop from "./Shop";

import Account from "./Account";

import ProductDetail from "./ProductDetail";

const routes = [
  {
    path: "/checkout",
    component: Checkout,
  },
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/cart",
    component: Cart,
  },
  {
    path: "/shop/",
    component: Shop,
    exact: true,
  },
  {
    path: "/shop/:category",
    component: Shop,
  },
  {
    path: "/product/:slug",
    component: ProductDetail,
  },
  {
    path: "/account",
    authRequired: true,
    component: Account,
  },
];

export default routes;
