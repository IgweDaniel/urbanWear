import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { CURRENCY } from "../constants";
import { ReactComponent as BagAlt } from "../assets/svg/bag-alt.svg";
import CartItem from "./CartItem";
import { TiTimes } from "react-icons/ti";
import useModal from "../hooks/useModal";

const FullCart = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 10px;
  overflow-y: auto;
  position: relative;

  button.close {
    position: absolute;
    top: 20px;
    right: 10px;
  }
  .meta {
    padding: 15px 0;
    text-transform: capitalize;
    font-weight: bold;
  }

  .items {
    width: 100%;
  }
  .actions {
    padding: 0px 0 20px;
  }
  .actions .button.checkout {
    width: 100%;
    background: ${({ theme }) => theme.colors.success};
  }
  .summary {
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    text-transform: capitalize;
  }
  .real-total {
    display: inline-block;
    margin: 0 10px;
    text-decoration: line-through;

    color: #888;
  }
  .discount-total {
    font-size: 1.2rem;
  }
  .emph {
    font-weight: bold;
    text-transform: none;
    font-variant: normal;
  }
  .coupon {
    background: #eee;
    text-transform: uppercase;
    font-variant: small-caps;
    padding: 5px;
    font-size: 0.9rem;
  }
  .discount {
    display: inline-block;
    margin-left: auto;
    font-weight: bold;
  }
`;

const EmptyCart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  .content {
    width: 80%;
    margin: 0 auto;
  }
  .button {
    margin: 20px auto;
  }
`;

const QuickCart = styled.div`
  height: var(--vh);
  width: calc(var(--vw) * 0.9);
  max-width: 400px;
`;

export default () => {
  const history = useHistory();
  const items = useSelector((state) => state.cart.items);
  const qty = useSelector((state) => state.cart.qty);
  const total = useSelector((state) => state.cart.total);
  const coupon = useSelector((state) => state.cart.coupon);
  const discountAmount = useSelector((state) => state.cart.discountAmount);
  const display = useModal();

  function closeQuickCart() {
    display({ type: "CLOSE" });
  }

  return (
    <QuickCart height={window.innerHeight}>
      {items && items.length <= 0 ? (
        <EmptyCart>
          <div className="content">
            <BagAlt height={40} width={40} />
            <h4>CART IS EMPTY</h4>
            <p>Check out all the available products and buy some in the shop</p>
            <Link to="/shop/all">
              <button
                className="button"
                onClick={() => {
                  closeQuickCart();
                  // history.push("/shop/all/");
                }}
              >
                Go shopping
              </button>
            </Link>
          </div>
        </EmptyCart>
      ) : (
        <FullCart>
          <button className="close" onClick={closeQuickCart}>
            <TiTimes size={20} />
          </button>
          <div className="meta">my Bag({qty})</div>
          <div className="items">
            {items && items.map((item) => <CartItem {...item} key={item.id} />)}
          </div>
          <div className="actions">
            <div className="summary">
              <span className="total">total to pay:</span>
              <span className="total-value">
                {coupon && (
                  <span className="real-total">
                    {CURRENCY}
                    {total + discountAmount}
                  </span>
                )}
                <span className="discount-total">
                  {CURRENCY}
                  {total}
                </span>
              </span>
            </div>
            {coupon && (
              <p className="coupon">
                coupon <span className="emph">{coupon}</span> applied
                <span className="discount">
                  - {CURRENCY}
                  {discountAmount}
                </span>{" "}
                from total purchase
              </p>
            )}

            <button
              className="button checkout"
              onClick={() => {
                closeQuickCart();
                history.push("/checkout");
              }}
            >
              checkout
            </button>
          </div>
        </FullCart>
      )}
    </QuickCart>
  );
};
