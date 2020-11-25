import React from "react";
import styled from "styled-components";
import Page from "../Page";

import Addresses from "./Addresses";
import Dashboard from "./Dashboard";
import OrderList from "./OrderList";
import UserDetails from "./UserDetails";

import { Spinner, NotContent } from "../../components";

import { NavLink, Route, Switch, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";

const Account = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0;
  .content {
  }
  .account__links {
    width: 100%;
    margin: 40px 0 10px;
    /* flex: 1; */
  }

  .account__link {
    text-align: uppercase;
    font-variant: small-caps;
    font-weight: 600;
    font-size: 1.3rem;
    color: #b4b4b4;
    margin: 0;
    padding: 2px 0;
    display: block;
    flex: 1;
  }

  .active {
    color: #000;
    font-weight: 700;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    .content {
      flex: 1;
    }
    .account__links {
      width: 180px;
      margin: 0px;
      /* margin-right: 20px; */
    }
    .account__link {
      margin: 0;
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
  let { url } = useRouteMatch();
  const user = useSelector((state) => state.auth.user);

  return (
    <Page>
      {!user ? (
        <NotContent offset={200}>
          <Spinner />
        </NotContent>
      ) : (
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
                <Route
                  exact={route.exact}
                  path={`${url}${route.path}`}
                  key={route.name}
                  component={route.component}
                />
              ))}
            </Switch>
          </div>
        </Account>
      )}
    </Page>
  );
};
