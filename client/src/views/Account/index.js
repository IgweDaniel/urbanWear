import React from "react";
import styled from "styled-components";
import Page from "../Page";

import Addresses from "./Addresses";
import Dashboard from "./Dashboard";
import OrderList from "./OrderList";
import UserDetails from "./UserDetails";

import { NavLink, Route, Switch, useRouteMatch } from "react-router-dom";

const Account = styled.div`
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
  }
  .account__links {
    width: 100%;
  }
  .account__link {
    text-align: uppercase;
    font-variant: small-caps;
    font-weight: 700;
    font-size: 1.35rem;
    color: #b4b4b4;
  }
  .active {
    color: #000;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    .account__links {
      width: 180px;
    }
  }
`;

const routes = [
  {
    path: "",
    exact: true,
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/edit-address",
    name: "addresses",
    component: Addresses,
  },
  {
    path: "/orders",
    name: "orders",
    component: OrderList,
  },
  {
    path: "/edit-account",
    name: "account details",
    component: UserDetails,
  },
];

export default () => {
  let { path, url } = useRouteMatch();
  console.log({ url, path });
  return (
    <Page>
      <Account>
        <ul className="account__links">
          {routes.map((route) => (
            <li key={route.name}>
              <NavLink
                to={`${url}${route.path}`}
                exact={true}
                activeClassName="active"
                className="account__link"
              >
                {route.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="content">
          <Switch>
            {routes.map((route) => (
              <Route exact={true} path={`${url}${route.path}`} key={route.name}>
                {route.component}
              </Route>
            ))}
          </Switch>
        </div>
      </Account>
    </Page>
  );
};
