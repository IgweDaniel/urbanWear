import React, { useState } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as BagIcon } from "../assets/svg/bag.svg";
import { ReactComponent as MenuIcon } from "../assets/svg/menu-button.svg";
import Modal from "./Modal";
import QuickCart from "./QuickCart";

const Header = styled.header`
  position: absolute;
  top: 0;
  z-index: 500;
  width: 100%;
  height: 60px;
  background: ${({ theme }) => theme.colors.ash};
  background: transparent;

  .header__content {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    height: 100%;
  }

  .nav {
    display: flex;
    width: 100%;
    align-items: center;
  }

  .nav .actions,
  .nav .links,
  .nav .log0 {
    display: flex;
    align-items: center;
  }

  .nav .logo {
    width: 20%;
  }
  .nav .logo img {
    --logo-size: 40px;
    height: var(--logo-size);
    width: var(--logo-size);
  }

  .nav .links {
    width: 60%;
    text-transform: uppercase;
    font-variant: small-caps;
    font-weight: bold;
    justify-content: center;
  }
  .nav .actions {
    width: 20%;
    justify-content: flex-end;
  }
  .nav .actions li,
  .nav .links li {
    margin-left: 10px;
  }
  .nav .actions li.cart {
    position: relative;
  }
  .nav .actions li.cart .label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    font-size: 0.9rem;
    z-index: -1;
  }
  .nav .links li .link-active {
    text-decoration: line-through;
  }
  @media (min-width: 969px) {
    height: 70px;
    .nav .links {
      display: flex;
    }
  }
`;

export default () => {
  const [openCart, setOpenCart] = useState(false);

  const closeQuickCart = () => setOpenCart(false);

  return (
    <>
      <Modal isOpen={openCart} position="right" close={closeQuickCart}>
        <QuickCart closeQuickCart={closeQuickCart} />
      </Modal>
      <Header>
        <div className="header__content">
          <nav className="nav">
            <div className="logo">
              <img src={require("../assets/logo.webp")} alt="logo" />
            </div>
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

            <ul className="actions">
              <li>
                <button>Search</button>
              </li>
              <li>
                <button>WishList</button>
              </li>
              <li className="cart">
                <span className="label">{0}</span>
                <button onClick={() => setOpenCart(!openCart)}>
                  <BagIcon />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </Header>
    </>
  );
};
