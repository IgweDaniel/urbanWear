import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { TiTimes } from "react-icons/ti";

const SideBar = styled.div`
  height: var(--vh);
  width: calc(var(--vw) * 0.9);
  max-width: 400px;
  background: #fff;

  button.close {
    margin-left: auto;
  }
  .content {
    width: 80%;
    margin: 50px auto;
  }
  .links {
    text-transform: uppercase;
    font-variant: small-caps;
    font-weight: bold;
    font-size: 1.15rem;
    padding: 20px 0;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  .links li,
  .other-links li {
    margin: 10px 0;
  }
  .links li .link-active {
    text-decoration: line-through;
  }
  .other-links {
    font-size: 1.1rem;
    margin: 20px 0;
    text-transform: capitalize;
  }
`;

export default ({ close }) => {
  return (
    <SideBar>
      <button className="button close" onClick={close}>
        <TiTimes size={20} />
      </button>
      <div className="content">
        <ul className="links">
          <li>
            <NavLink to="/" activeClassName="link-active" exact>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" activeClassName="link-active">
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/pages" activeClassName="link-active">
              Pages
            </NavLink>
          </li>
        </ul>
        <ul className="other-links">
          <li>Order Tracking</li>
          <li>My Account</li>
          <li>Return Policy</li>
        </ul>
      </div>
    </SideBar>
  );
};
