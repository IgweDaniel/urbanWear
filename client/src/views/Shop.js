import React, { useState } from "react";
import styled from "styled-components";
import Page from "./Page";
import { ReactComponent as HangerIcon } from "../assets/svg/hanger.svg";
import { ReactComponent as FilterIcon } from "../assets/svg/filter.svg";
import { FiChevronDown } from "react-icons/fi";
import { categories, products } from "../data";
import { Link } from "react-router-dom";
import { Modal, Product, ProductFilter } from "../components";

const Banner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* font-size: 4rem; */
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

  const toggleFilterDisplay = () => setFilterDisplay(!filterDisplay);
  return (
    <>
      <Modal isOpen={filterDisplay} position="left" close={toggleFilterDisplay}>
        <ProductFilter />
      </Modal>
      <Page>
        <Banner>
          <HangerIcon height={ICON_SIZE} width={ICON_SIZE} />
          <ul className="category-links">
            {categories.map((cat) => (
              <li key={cat}>
                <Link to={`/shop/${cat}`}>{cat}</Link>
              </li>
            ))}
          </ul>
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

          <ProductList>
            {products.map((product) => (
              <Product {...product} key={product.id} />
            ))}
          </ProductList>
        </Shop>
      </Page>
    </>
  );
};
