import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
const OrderDetails = styled.div`
  margin: 40px 0;
  table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ccc;
  }
  thead tr {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
  }
  thead th {
    padding: 10px;
    text-align: start;
    text-transform: uppercase;
    font-variant: small-caps;
  }
  tbody td {
    padding: 10px;
  }
`;

export default () => {
  const { items, qty, total } = useSelector((state) => ({
    items: state.cart.items,
    total: state.cart.total,
    qty: state.cart.qty,
  }));
  return (
    <OrderDetails className="order-details">
      <table>
        <thead>
          <tr>
            <th>product</th>
            <th>subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ product, quantity }) => (
            <tr key={product.id}>
              <td data-label="product">
                {product.name} x {quantity}
              </td>
              <td data-label="subtotal">{product.price * quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </OrderDetails>
  );
};
