import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

let items = [
  {
    id: 1,
    product: { name: "", price: 20, img: "" },
    qty: 2,
    total: 40,
  },
];

items = [];

const Item = styled.div``;

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
    width: 80%;
  }
`;

const QuickCart = styled.div`
  height: 100vh;
  width: 350px;
`;

export default ({ closeQuickCart }) => {
  const history = useHistory();
  return (
    <QuickCart>
      {items.length <= 0 ? (
        <EmptyCart>
          <div className="content">
            <h4>CART IS EMPTY</h4>
            <p>Check out all the available products and buy some in the shop</p>
            <Link to="/shop">
              <button
                className="button"
                onClick={() => {
                  closeQuickCart();
                  history.push("/shop");
                }}
              >
                Go shopping
              </button>
            </Link>
          </div>
        </EmptyCart>
      ) : (
        items.map((item) => (
          <Item>
            <p>Hello</p>
          </Item>
        ))
      )}
    </QuickCart>
  );
};
