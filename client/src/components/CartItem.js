import React, { useState } from "react";
import styled from "styled-components";

import { CURRENCY } from "../constants";
import { MdEdit, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import * as Api from "../api";
import { updateCart } from "../ducks/cart";
import { useDispatch } from "react-redux";
import { Spinner } from ".";

const ItemInfo = styled.div`
  min-height: 150px;
  display: flex;

  .image {
    height: 100%;
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  img {
    height: 90%;
    width: 80%;
  }
  .details {
    flex: 1;
    margin: 10px 0;
  }
  .name {
    font-weight: bold;
    font-size: 1rem;
    width: fit-content;
  }
  .total {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .total .value,
  .price {
    font-weight: bold;
    font-size: 1rem;
  }
  .actions {
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .actions button.edit {
    margin-right: 10px;
  }
`;

const UpdateItem = styled.div`
  margin: 10px 0;
  .input {
    margin: 0 0 10px;
  }
  select {
    width: 100%;
    height: 40px;
    border: 1px solid #ccc;
    background: transparent;
    outline: none;
    font-weight: bold;
  }
  /* select:ou{} */
  .actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .actions button {
    width: 40%;
    height: 35px;
    text-transform: uppercase;
    font-variant: small-caps;
  }
  .cancel {
    border: 1px solid #777;
  }
  .save {
    border: 1px solid #000;
    background: #000;
    color: #fff;
  }
`;

const CartItem = styled.div`
  margin: 0 10px 20px;
  border-bottom: 1px solid #ccc;
  transition: height 0.3s ease-in-out;
  &:last-of-type {
    /* border-bottom: none; */
  }
`;

const ICON_SIZE = 20;
export default ({ id, product, quantity, size }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [itemQty, setItemQty] = useState(quantity);
  const [itemSize, setItemSize] = useState(size);
  const productlink = `/product/${product.slug}`;
  const [updateStatus, setUpdateStatus] = useState("done");
  const [deleteStatus, setDeleteStatus] = useState("done");

  async function handleItemDelete(e) {
    setDeleteStatus("loading");
    const { data, error } = await Api.deleteCartItem(id);
    setDeleteStatus("done");
    if (error) {
      console.log(error.response.data);
      return;
    }
    dispatch(updateCart(data));
  }
  async function handleItemUpdate() {
    setUpdateStatus("loading");
    const { data, error } = await Api.updateCartItem(id, itemSize, itemQty);
    setUpdateStatus("done");
    if (error) {
      console.log(error.response.data);
      return;
    }
    dispatch(updateCart(data));

    setEditMode(false);
  }

  return (
    <CartItem>
      <ItemInfo>
        <Link className="image" to={productlink}>
          <img src={product.images[0]} alt="" />
        </Link>
        <div className="details">
          <p className="name">{product.name}</p>
          <p className="quantitysize">
            {quantity} size {size}
          </p>
          <p className="price">£{product.price} </p>
          <p className="total">
            Total:
            <span className="value">
              {CURRENCY}
              {product.price * quantity}{" "}
            </span>
          </p>
          {!editMode && (
            <div className="actions">
              <button className="edit" onClick={() => setEditMode(true)}>
                <MdEdit size={ICON_SIZE} />
              </button>
              {deleteStatus === "loading" ? (
                <Spinner variant="action" size={18} />
              ) : (
                <button className="delete" onClick={handleItemDelete}>
                  <MdDelete size={ICON_SIZE} />
                </button>
              )}
            </div>
          )}
        </div>
      </ItemInfo>
      {editMode && (
        <UpdateItem>
          <div className="input">
            <select
              name="quantity"
              id=""
              value={itemQty}
              onChange={(e) => setItemQty(e.target.value)}
            >
              {[...Array(10)].map((_, i) => (
                <option value={i + 1} key={i}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="input">
            <select
              name="size"
              id=""
              value={itemSize}
              onChange={(e) => setItemSize(e.target.value)}
            >
              {product.sizes.map((size, i) => (
                <option value={size} key={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div className="actions">
            <button className="cancel" onClick={() => setEditMode(false)}>
              cancel
            </button>
            <button
              className={`save button ${
                updateStatus === "loading" ? "loading" : ""
              }`}
              onClick={handleItemUpdate}
              disabled={updateStatus === "loading"}
            >
              save
            </button>
          </div>
        </UpdateItem>
      )}
    </CartItem>
  );
};
