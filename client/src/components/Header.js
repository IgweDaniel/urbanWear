import React from "react";
import styled from "styled-components";
import { Link, NavLink, useHistory } from "react-router-dom";
import { ReactComponent as BagIcon } from "../assets/svg/bag.svg";
import { ReactComponent as UserIcon } from "../assets/svg/user.svg";
import { FiSearch } from "react-icons/fi";
import { GoThreeBars } from "react-icons/go";
import { useSelector } from "react-redux";
import useModal from "../hooks/useModal";
import SearchBox from "./SearchBox";

const Header = styled.header`
  position: fixed;
  top: 0;
  z-index: 4000;
  width: 100%;
  height: 70px;
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
    /* width: 100px; */

    /* justify-content: center; */
  }
  .nav .logo img {
    --logo-size: 40px;
    height: var(--logo-size);
    width: var(--logo-size);
  }
  .menu-button {
    /* width: 50%; */
    flex: 1;
  }

  .nav .links {
    width: 60%;
    text-transform: uppercase;
    font-variant: small-caps;
    font-weight: bold;
    justify-content: center;
    display: none;
  }
  .nav .actions {
    flex: 1;
    justify-content: flex-end;
  }
  .nav .actions li,
  .nav .links li {
    margin-left: 10px;
  }
  .nav .actions li {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .nav .actions li.cart {
    position: relative;
  }

  .nav .actions li.cart .label {
    position: absolute;

    right: -12px;

    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.9rem;
    z-index: 1;
  }
  .nav .links li .link-active {
    text-decoration: line-through;
  }

  @media (min-width: 969px) {
    .menu-button {
      display: none;
    }
    height: 90px;
    .nav .logo {
      width: 20%;
    }
    .nav .links {
      width: 60%;
    }
    .nav .actions {
      width: 20%;
    }
    .nav .links {
      display: flex;
    }
  }
`;

const ICON_SIZE = 20;
export default () => {
  const history = useHistory();

  const user = useSelector((state) => state.auth.user);
  const qty = useSelector((state) => state.cart.qty);
  const display = useModal();

  function handleAction(action) {
    display({
      type: action,
    });
  }

  function showSearch() {
    display({
      type: "OPEN",
      component: <SearchBox />,
      position: "top",
    });
  }
  return (
    <>
      <Header>
        <div className="header__content">
          <nav className="nav">
            <div className="menu-button">
              <button>
                <GoThreeBars
                  size={ICON_SIZE}
                  onClick={() => handleAction("SIDEBAR")}
                />
              </button>
            </div>

            <div className="logo">
              <Link to="/">
                <img src={require("../assets/logo.webp")} alt="logo" />
              </Link>
            </div>
            <ul className="links">
              <li>
                <NavLink to="/" activeClassName="link-active" exact>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  isActive={(match, location) =>
                    location.pathname.includes("/shop")
                  }
                  to="/shop/all"
                  activeClassName="link-active"
                >
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
                <button onClick={showSearch}>
                  <FiSearch size={ICON_SIZE} />
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (!user) {
                      handleAction("LOGIN");
                    } else {
                      history.push({
                        pathname: "/account",
                      });
                    }
                  }}
                >
                  <UserIcon width={ICON_SIZE} height={ICON_SIZE} />
                </button>
              </li>
              <li className="cart">
                {qty > 0 && <span className="label">{qty}</span>}
                <button onClick={() => handleAction("CART")}>
                  <BagIcon width={ICON_SIZE} height={ICON_SIZE} />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </Header>
    </>
  );
};
