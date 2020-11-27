import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Spinner } from ".";
import { ReactComponent as CartAddIcon } from "../assets/svg/cart-add.svg";
import { CURRENCY } from "../constants";
import { addCartItem } from "../ducks/cart";
import { TiTick } from "react-icons/ti";
import { FaListUl } from "react-icons/fa";

const Product = styled.div`
  width: 100%;
  overflow-x: hidden;
  .product__display {
    position: relative;
    display: block;
  }
  .product__images {
    display: block;
    height: 400px;
    width: 100%;
    position: relative;
    perspective: 600px;
    cursor: pointer;
    transition: transform 0.5s ease-in-out;
    transition: transform 0.5s linear;
    transform-style: preserve-3d;
  }

  .product__images:hover {
    transform: rotateY(-180deg);
  }
  .product__images .product__image {
    position: absolute;
    top: 0;
    backface-visibility: hidden;
    width: 100%;
    height: 100%;
  }
  .product__images img {
    width: 100%;
    height: 100%;
  }

  .product__images .product__image:nth-of-type(2) {
    transform: rotateY(180deg);
  }

  .product__image img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
  .product__action {
    position: absolute;
    z-index: 4;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
  }
  .icon,
  .cartadd,
  .options {
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cartadd,
  .options {
    background: #fff;
  }

  .icon {
    background: #b39964;
  }
  .product__name a:hover {
    text-decoration: underline;
    transition: all 0.2s ease-in;
  }
  .product__category {
    text-transform: uppercase;
    font-variant: small-caps;
    font-size: 0.9rem;
    color: #000;
  }
  .product__category:hover {
    color: #000;
  }
  .product__price {
    font-weight: bold;
  }
  .product__price .actual__price {
    text-decoration: line-through;
    color: #ccc;
    margin-right: 5px;
    font-size: 1.1rem;
  }
  @media (min-width: 420px) {
    .product__images {
      height: 260px;
    }
  }
  @media (min-width: 600px) {
    .product__images {
      height: 350px;
    }
  }
  @media (min-width: 768px) {
    .product__images {
      height: 250px;
    }
  }
  @media (min-width: 969px) {
    .product__images {
      height: 250px;
    }
  }
  @media (min-width: 1024px) {
    .product__images {
      height: 260px;
    }
  }
`;

export default (props) => {
  const dispatch = useDispatch();
  const {
    id,
    images,
    price,
    discount,
    final_price,
    category,
    name,
    sizes,
    slug,
  } = props;
  const product_images =
    images.length < 2 ? images.push(images[0]) : images.slice(0, 2);

  const productlink = `/product/${slug}`;

  const [status, setStatus] = useState("done");
  const items = useSelector((state) => state.cart.items);
  const inCart = items.find((item) => item.product.id === id);

  const hasOptions = !["bottoms", "foot wear", "accessories"].includes(
    category
  );

  function addToCart() {
    setStatus("loading");
    dispatch(addCartItem(sizes[0], id)).then(() => setStatus("done"));
  }

  return (
    <Product>
      <div className="product__display">
        <div className="product__action">
          {inCart && (
            <span className=" icon in-cart">
              <TiTick size={20} color="#fff" />
            </span>
          )}
          {hasOptions ? (
            <Link to={productlink} className="options">
              <FaListUl width={25} />
            </Link>
          ) : (
            <button className="cartadd" onClick={addToCart}>
              {status === "loading" ? (
                <Spinner variant="action" size={24} />
              ) : (
                <CartAddIcon height={20} width={25} />
              )}
            </button>
          )}
        </div>

        <Link className="product__images" to={productlink}>
          {product_images.map((image, i) => (
            <div className="product__image" key={i}>
              <img src={image} alt={name} key={i} />
            </div>
          ))}
        </Link>
      </div>
      <div className="product__info">
        <h5 className="product__category">
          <Link to={`/shop/${category}`}>{category}</Link>
        </h5>
        <p className="product__name">
          <Link to={productlink}> {name}</Link>
        </p>
        <p className="product__price">
          {discount && (
            <span className="actual__price">
              {CURRENCY}
              {price}.00
            </span>
          )}
          <span className="discount__price">
            {CURRENCY}
            {discount ? final_price : price}.00
          </span>
        </p>
      </div>
    </Product>
  );
};
