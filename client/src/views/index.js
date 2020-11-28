import Cart from "./Cart";
import Home from "./Home";
import Shop from "./Shop";

import Checkout from "./Checkout";
import Account from "./Account";
import PaymentComplete from "./PaymentComplete";

import ProductDetail from "./ProductDetail";
import _4o4 from "./4o4";

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
  {
    path: "/payment-complete",
    component: PaymentComplete,
  },
  {
    path: "*",
    exact: true,
    component: _4o4,
  },
];

export default routes;
