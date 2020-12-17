import Cart from "./Cart";
import Home from "./Home";
import Shop from "./Shop";
import Checkout from "./Checkout";
import Account from "./Account";
import PaymentComplete from "./PaymentComplete";

import ProductDetail from "./ProductDetail";
import PageNotFound from "./PageNotFound";

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
    component: PageNotFound,
  },
];

export default routes;
