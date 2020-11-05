import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Page from "./Page";
import { ReactComponent as HangerIcon } from "../assets/svg/hanger.svg";
import { ReactComponent as FilterIcon } from "../assets/svg/filter.svg";
import { FiChevronDown } from "react-icons/fi";
import { categories, products as productdata } from "../data";
import { Link } from "react-router-dom";
import {
  Modal,
  Product,
  ProductFilter,
  Spinner,
  NotContent,
} from "../components";
import { useFilter, useUpdateEffect } from "../hooks";

const Banner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* font-size: 4rem; */
  .currentcategory {
    text-transform: capitalize;
    font-size: 2.7rem;
  }
  margin: 100px 0 50px;
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
    margin: 100px 0 100px;
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

export default () => {
  const [filterDisplay, setFilterDisplay] = useState(false);

  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const { size, category, min_price, max_price } = useFilter();

  const toggleFilterDisplay = () => setFilterDisplay(!filterDisplay);

  function getProducts(data) {
    console.log("fetching for category " + category);
    return data
      .filter((product) =>
        category.toLowerCase() === "all"
          ? true
          : product.category.toLowerCase() === category.toLowerCase()
      )
      .filter((product) =>
        size === "all" ? true : product.sizes.includes(size)
      )
      .filter(
        (product) =>
          product.final_price >= min_price && product.final_price <= max_price
      );
  }

  useEffect(() => {
    setStatus("loading");
    const activeproducts = getProducts(productdata);

    let timeout = setTimeout(() => {
      setProducts(activeproducts);
    }, 1000);
    return () => clearTimeout(timeout);
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
        <h3>Eror fetching products</h3>
      </NotContent>
    );

  return (
    <>
      <Modal isOpen={filterDisplay} position="left" close={toggleFilterDisplay}>
        <ProductFilter />
      </Modal>
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
            <button className="filter" onClick={toggleFilterDisplay}>
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
    </>
  );
};
