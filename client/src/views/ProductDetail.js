import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { products, sizes } from "../data";
import Page from "./Page";
import { Spinner, QuantityInput, Tabs, ProductCarousel } from "../components";

const Image = styled.div`
  height: 100%;
  width: 100%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
    transition: opacity 0.5s;
  }
  @media (min-width: 768px) {
    background-image: ${({ url }) => `url(${url})`};
    cursor: zoom-in;

    &:hover img {
      opacity: 0;
    }
  }
`;

const ProductDetail = styled.div`
  margin: 100px 0;

  .productdetail__info {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .productdetail__images,
  .productdetail__content {
    width: 100%;
  }
  .productdetail__images {
    height: 400px;
  }

  .productdetail__content {
    margin-top: 20px;
  }
  .productdetail__content .product__name {
    text-align: center;
  }
  .productdetail__content .product__price {
    text-align: center;
    text-transform: capitalize;
    font-size: 1.1rem;
  }
  .productdetail__content .actual-price {
    margin-right: 5px;
  }

  .product__sizes {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 20px 0 0;
  }
  .product__sizes .size {
    text-align: center;
    flex-basis: 60px;
    font-size: 14px;
    margin: 5px 0;
    height: 30px;
    text-transform: uppercase;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .product__sizes button {
    display: block;
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
    border: 1px solid #ccc;
  }

  .product__sizes button:disabled:after {
    height: 2px;
    width: 200px;
    content: "";
    z-index: 4;
    left: 0;
    top: 0;
    position: absolute;
    background: #ccc;
    transform: rotateZ(15deg);
    transform-origin: left;
  }
  .product__sizes .size button:not(:disabled):hover {
    background: #303030;
    color: #fff;
    border-color: #000;
  }
  .product__sizes .size.active button {
    color: #fff;
    background: #000;
    border-color: #000;
  }

  .productdetail__content .figure {
    font-size: 1.2rem;
  }

  .product__action {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 20px auto;
  }
  .product__action .qty {
    width: 100px;
    margin-right: 15px;
  }
  .product__action .button {
    flex: 1;
  }
  .meta-info {
    border: 1px solid #777;
  }
  .meta-info .info {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #777;
    justify-content: center;
  }

  .meta-info .info:last-of-type {
    border-bottom: none;
  }
  .meta-info .info span {
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex: 1;
  }
  .meta-info .info span:first-of-type {
    border-right: 1px solid #777;
    font-weight: bold;
  }
  @media (min-width: 300px) {
    .productdetail__images {
      height: 500px;
    }
  }
  @media (min-width: 520px) {
    .productdetail__images {
      height: 600px;
    }
  }

  @media (min-width: 768px) {
    .productdetail__info {
      height: 500px;
      flex-direction: row;
    }
    .productdetail__images,
    .productdetail__content {
      height: 100%;
    }
    .productdetail__images {
      width: 50%;
    }
    .productdetail__content {
      width: 50%;
      margin-top: 100px;
      padding: 0 30px;
    }
    .product__sizes .size {
      flex-basis: 70px;
    }
  }
  @media (min-width: 1024px) {
    .productdetail__info {
      height: 600px;
    }
  }
  @media (min-width: 1200px) {
    .product__sizes .size {
      flex-basis: 100px;
    }
  }
`;

export default () => {
  let { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [chosenSize, setChosenSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let currProduct = products.find(
      (product) => product.name === slug.replaceAll("-", " ")
    );

    let timeout = setTimeout(() => {
      setProduct(currProduct);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [slug]);

  useEffect(() => {
    if (product !== null) {
      setStatus("done");
    }
  }, [product]);

  function addToCart() {
    let cartItem = {
      product,
      size: chosenSize,
      quantity: qty,
    };
    console.log(cartItem);
  }

  function zoom(e) {
    var zoomer = e.currentTarget;
    const x = (e.pageX / zoomer.offsetWidth) * 100;
    const y = ((e.pageY - 100) / zoomer.offsetHeight) * 100;
    zoomer.style.backgroundPosition = x + "% " + y + "%";
  }

  if (status === "loading") {
    return (
      <div
        style={{
          marginTop: 200,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Spinner />
      </div>
    );
  } else if (status === "error") {
    return (
      <Page>
        <h2> error</h2>
      </Page>
    );
  }

  return (
    <Page>
      <ProductDetail>
        <div className="productdetail__info">
          <div className="productdetail__images">
            <ProductCarousel>
              {product.images.map((image, i) => (
                <Image
                  thumb={image}
                  className="image-wrap"
                  key={i}
                  onMouseMove={zoom}
                  url={image.replace("700", "1300")}
                >
                  <img src={image} key={i} alt={`${product.name}-${i}`} />
                </Image>
              ))}
            </ProductCarousel>
          </div>
          <div className="productdetail__content">
            <h1 className="product__name">{product.name}</h1>
            <p className="product__price">
              {product.discount && (
                <span className="actual-price">
                  was $<span className="figure">{product.price}</span>
                </span>
              )}
              <span className="final-price">
                {product.discount ? "Now" : "Buy for"}$
                <span className="figure">{product.final_price}</span>
              </span>
            </p>
            <ul className="product__sizes">
              {sizes.map((size, i) => (
                <li
                  role="button"
                  key={i}
                  className={`size  ${chosenSize === size ? "active" : ""}`}
                >
                  <button
                    onClick={() => setChosenSize(size)}
                    disabled={!product.sizes.includes(size)}
                  >
                    {size}
                  </button>
                </li>
              ))}
            </ul>
            <div className="product__action">
              <div className="qty">
                <QuantityInput
                  value={qty}
                  min={1}
                  max={10}
                  onChange={(val) => setQty(val)}
                />
              </div>

              <button className="button cart-add" onClick={addToCart}>
                add to cart
              </button>
            </div>
          </div>
        </div>

        <Tabs>
          <div label="Description">{product.desc}</div>
          <div label="additional info">
            <div className="meta-info">
              <div className="info">
                <span className="key">Weight</span>
                <span className="value">60kg</span>
              </div>
              <div className="info">
                <span className="key">Material</span>
                <span className="value">100% cotton</span>
              </div>
            </div>
          </div>
          <div label="reviews">mamam</div>
        </Tabs>
      </ProductDetail>
    </Page>
  );
};
