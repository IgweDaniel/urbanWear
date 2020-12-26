import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { Range } from "rc-slider";
import "rc-slider/assets/index.css";

import { useFilter, useUpdateEffect } from "../hooks";

import { SIZES } from "../constants";
import { useSelector } from "react-redux";

const ProductFilter = styled.div`
  height: 100vh;
  height: var(--vh);
  width: calc(var(--vw) * 0.8);
  max-width: 350px;
  .content {
    width: 80%;
    margin: 40px auto;
  }
  .subtext {
    text-transform: uppercase;
    font-variant: small-caps;
    font-size: 0.9rem;
  }
  .categories {
  }
  .categories ul {
    text-transform: uppercase;
    font-variant: small-caps;
  }
  .categories ul li {
    cursor: pointer;
  }
  .price__inner,
  .sizes ul,
  .categories ul {
    width: 100%;
  }
  .categories .category {
    margin: 7px 0;
  }

  .sizes .size,
  .categories .category {
    font-size: 0.9rem;
    text-transform: uppercase;
    font-variant: small-caps;
  }
  .sizes ul {
    display: flex;
    align-items: center;
    /* justify-content: center; */
    flex-wrap: wrap;
  }

  .sizes .size {
    flex-basis: 60px;
    margin: 6px;
    margin-left: 0;
    /* border: 1px solid #000; */
    background: #000;
    color: #fff;
  }
  .sizes .size button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
  .size.active {
    background: ${({ theme }) => theme.colors.primary};
  }
  .category.active {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
  }
  .price {
    height: 120px;
    border: 1px solid #ccc;
    border-left: none;
    border-right: none;
    display: flex;
    align-items: center;
    margin: 20px 0;
  }
`;

export default () => {
  const history = useHistory();
  const categories = useSelector((state) => state.global.categories);
  const {
    updateFilterSize,
    updateFilterPrice,
    category: activeCategory,
    size: activeSize,
    min_price,
    max_price,
    q,
    updateCategory,
  } = useFilter();

  const [price, setPrice] = useState([min_price, max_price]);

  useUpdateEffect(() => {
    setPrice([min_price, max_price]);
  }, [min_price, max_price]);

  function categoryNavigaton(category) {
    if (q) {
      updateCategory(category);
    } else {
      history.push({
        pathname: `/shop/${category}`,
      });
    }
  }

  return (
    <ProductFilter>
      <div className="content">
        <div className="categories">
          <h3 className="subtext">categories</h3>
          <ul>
            <li className="category" onClick={() => categoryNavigaton("all")}>
              {/* <Link
                to={`/shop/all`}
                className={`category ${
                  activeCategory === "all" ? "active" : ""
                }`}
              >
                all
              </Link> */}
              all
            </li>
            {categories.map((category) => (
              <li
                key={category.id}
                className={`category ${
                  activeCategory === category.name ? "active" : ""
                }`}
                onClick={() => categoryNavigaton(category.name)}
              >
                {category.name}
                {/* <Link to={`/shop/${category.name}`}>{category.name}</Link> */}
              </li>
            ))}
          </ul>
        </div>
        <div className="price">
          <div className="price__inner">
            <h3 className="subtext">filter by price</h3>
            <Range
              max={20}
              trackStyle={[{ backgroundColor: "#000" }]}
              handleStyle={[{ borderColor: "#000" }, { borderColor: "#000" }]}
              onChange={(price) => setPrice(price)}
              value={price}
              onAfterChange={updateFilterPrice}
            />

            <div className="value">
              ${price[0]}-{price[1]}
            </div>
          </div>
        </div>

        <div className="sizes">
          <h3 className="subtext">filter by size</h3>

          <ul>
            <li
              className={`size ${
                activeSize.toLowerCase() === "all" ? "active" : ""
              }`}
            >
              <button onClick={() => updateFilterSize("all")}>all</button>
            </li>
            {SIZES.map((size) => (
              <li
                key={size}
                className={`size ${
                  activeSize.toLowerCase() === size.toLowerCase()
                    ? "active"
                    : ""
                }`}
              >
                <button onClick={() => updateFilterSize(size)}>{size}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ProductFilter>
  );
};
