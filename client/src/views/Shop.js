import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Page from "./Page";
import { ReactComponent as HangerIcon } from "../assets/svg/hanger.svg";
import { ReactComponent as FilterIcon } from "../assets/svg/filter.svg";
import { FiChevronDown } from "react-icons/fi";

import { Link, useHistory } from "react-router-dom";
import { Product, ProductFilter, Spinner, NotContent } from "../components";
import { useFilter, useUpdateEffect } from "../hooks";

import * as Api from "../api";
import { useSelector } from "react-redux";
import useModal from "../hooks/useModal";
import { useRef } from "react";

const Banner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* font-size: 4rem; */
  margin: 100px 0 50px;
  .currentcategory {
    text-transform: capitalize;
    font-size: 2.7rem;
  }

  .category-links {
    margin-top: 10px;
    display: none;

    width: 100%;
  }

  .category-links li {
    text-align: center;
    flex-basis: 100px;
    font-size: 14px;
    margin: 10px;
    padding-bottom: 5px;
    text-transform: uppercase;
    border-bottom: 1px solid rgb(238, 238, 238);
    font-weight: bold;
  }
  @media (min-width: 768px) {
    /* margin: 100px 0 50px; */
    .category-links {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
    }
  }
`;

const Shop = styled.div`
  .meta {
    display: flex;
  }

  .meta .filter,
  .meta .sort {
    flex: 1;

    display: flex;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.95rem;
  }
  .meta .filter {
    justify-content: flex-start;
  }
  .meta .filter .icon {
    margin-right: 5px;
  }
  .meta .results-info {
    display: none;
    flex: 1;
    text-align: center;
  }

  .meta .sort {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .meta .sort span {
  }
  .content {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  @media (min-width: 768px) {
    .meta .filter {
      width: 100px;
    }
    .meta .results-info {
      display: block;
    }
    .meta .sort {
      width: 200px;
    }
  }
`;

const ProductList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);

  grid-gap: 30px;
  margin: 30px 0;

  @media (min-width: 420px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ICON_SIZE = 75;
/**
 * HANDLE SCROLL RESTORATION FOR PRODUCT PAGE
 */
export default () => {
  const mounted = useRef(false);
  const categories = useSelector((state) => state.global.categories);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const { size, category, min_price, max_price } = useFilter();
  const history = useHistory();

  async function getProducts() {
    const { data, error } = await Api.fetchProducts(
      size === "all" ? null : size,
      category === "all" ? null : category
    );

    if (error) {
      console.log(error);
      setStatus("error");
    }
    if (mounted.current) {
      setProducts(data);
    }
  }

  useEffect(() => {
    mounted.current = true;
    const validCategory = categories.find(
      (item) => item.name === category || category === "all"
    );
    if (!validCategory) {
      history.push("/404");
    }
    setStatus("loading");
    getProducts();

    return () => {
      mounted.current = false;
    };
    // eslint-disable-next-line
  }, [category, size, min_price, max_price]);

  useUpdateEffect(() => {
    if (products === null) {
      setStatus("error");
    } else {
      setStatus("done");
    }
  }, [products]);

  let content = (
    <NotContent>
      <Spinner top={60} />
    </NotContent>
  );
  if (status === "done") {
    content =
      products.length > 0 ? (
        <ProductList>
          {products.map((product) => (
            <Product {...product} key={product.id} />
          ))}
        </ProductList>
      ) : (
        <NotContent>
          <h3>No Products Mathching this filters</h3>
        </NotContent>
      );
  }
  if (status === "error")
    content = (
      <NotContent>
        <h3>Error fetching products</h3>
      </NotContent>
    );

  const display = useModal();
  return (
    <Page>
      <Banner>
        {category === "all" ? (
          <>
            <HangerIcon height={ICON_SIZE} width={ICON_SIZE} />
            <ul className="category-links">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link to={`/shop/${category.name}`}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <h1 className="currentcategory">{category}</h1>
        )}
      </Banner>
      <Shop>
        <div className="meta">
          <button
            className="filter"
            onClick={() => {
              display({
                type: "OPEN",
                component: <ProductFilter />,
                position: "left",
              });
            }}
          >
            <span className="icon">
              <FilterIcon height={20} width={20} />
            </span>
            <span className="icon-label">filter</span>
          </button>
          <div className="results-info">SHOWING 1–20 OF 96 RESULTS</div>
          <div className="sort">
            <span>SORT BY LASTEST</span>
            <span className="icon">
              <FiChevronDown size={20} />
            </span>
          </div>
        </div>

        <div className="content">{content}</div>
      </Shop>
    </Page>
  );
};
