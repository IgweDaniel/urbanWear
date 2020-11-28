import React from "react";
import styled from "styled-components";
import { CURRENCY } from "../../constants";

import { useSelector } from "react-redux";

const OrderList = styled.div`
  .actions {
    display: flex;
    justify-content: space-between;
  }
  .actions .button {
    width: 48%;
  }
  table {
    padding: 20px;
    border: 1px solid #b4b4b4;
    width: 100%;
  }

  thead tr {
    text-transform: uppercase;
    font-variant: small-caps;
  }
  tr {
    text-align: left;
  }
  .order-item {
    margin: 20px;
    padding: 20px 0;
  }
  @media only screen and (max-width: 760px),
    (min-device-width: 768px) and (max-device-width: 1024px) {
    table,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }

    /* Hide table headers (but not display: none;, for accessibility) */
    thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }
    tbody tr {
      padding: 10px 0;
    }

    td {
      /* Behave  like a "row" */
      border: none;
      position: relative;
      padding: 5px;
      padding-left: 40%;
      /* overflow-x: auto; */
      font-size: 0.95rem;
    }
    /* tbody {
    overflow: scroll;
  } */
    td:before {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 6px;
      width: 45%;
      padding-right: 10px;
      white-space: nowrap;
      content: attr(data-label);
      text-transform: capitalize;
      font-weight: 700;
    }
  }
`;

export default () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <OrderList>
      <table cellSpacing="15">
        <thead>
          <tr>
            <th>order</th>
            <th>date</th>
            <th>status</th>
            <th>total</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {user.orders.map((order) => (
            <tr key={order.id} className="order-item">
              <td data-label="order">{order.id}</td>
              <td data-label="date">
                {new Date(order.payment.timestamp).toDateString()}
              </td>
              <td data-label="status">
                {order.delivered ? "DELIVERED" : "PENDING"}
              </td>
              <td data-label="total">
                {CURRENCY}
                {order.total}
              </td>
              <td className="actions" data-label="actions">
                <button className="button">view</button>
                <button className="button">cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </OrderList>
  );
};
