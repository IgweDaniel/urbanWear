import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as BinIcon } from "../assets/svg/bin.svg";
import { sizes } from "../data";
// import Select from "react-dropdown-select";
const ItemInfo = styled.div`
  height: 150px;
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
    border-bottom: 2px solid #000;
    line-height: 1;
    width: fit-content;
  }
  .quantitysize {
  }
  .price {
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
    font-size: 1.1rem;
    border-bottom: 2px solid #000;
    line-height: 1;
    margin-right: 10px;
  }
`;

const UpdateItem = styled.div`
  margin-bottom: 20px;
  .input {
    margin: 0 0 10px;
  }
  select {
    width: 100%;
    height: 36px;
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
    display: block;
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
  margin: 0 10px;
  border-bottom: 1px solid #ccc;
`;

const ICON_SIZE = 20;
export default ({ product, quantity, size }) => {
  const [editMode, setEditMode] = useState(false);
  const [itemQty, setItemQty] = useState(quantity);
  const [itemSize, setItemSize] = useState(size);

  function handleItemDelete(e) {}
  function handleItemUpdate(e) {}

  return (
    <CartItem>
      <ItemInfo>
        <div className="image">
          <img src={product.images[0]} alt="" />
        </div>
        <div className="details">
          <p className="name">{product.name}</p>
          <p className="quantitysize">
            {quantity} size {size}
          </p>
          <p className="price">£{product.price} </p>
          <p className="total">
            Total: <span className="value">£{product.price * quantity} </span>
          </p>
          {!editMode && (
            <div className="actions">
              <button className="edit" onClick={() => setEditMode(true)}>
                Edit
              </button>
              <button className="delete" onClick={handleItemDelete}>
                <BinIcon height={ICON_SIZE} width={ICON_SIZE} />
              </button>
            </div>
          )}
        </div>
      </ItemInfo>
      {editMode && (
        <UpdateItem>
          {/* <div className="input">
            <Select
              multi={false}
              values={[{ value: itemQty, label: itemQty }]}
              options={[...Array(6)].map((_, i) => ({
                label: i + 1,
                value: i + 1,
              }))}
              onChange={(values) => {
                console.log({ values });
              }}
            />
          </div> */}
          <div className="input">
            <select
              name="quantity"
              id=""
              value={itemQty}
              onChange={(e) => setItemQty(e.target.value)}
            >
              {[...Array(6)].map((_, i) => (
                <option value={i + 1}>{i + 1}</option>
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
              {sizes.map((size, i) => (
                <option value={size}>{size}</option>
              ))}
            </select>
          </div>
          <div className="actions">
            <button className="cancel" onClick={() => setEditMode(false)}>
              cancel
            </button>
            <button className="save" onClick={handleItemUpdate}>
              save
            </button>
          </div>
        </UpdateItem>
      )}
    </CartItem>
  );
};
