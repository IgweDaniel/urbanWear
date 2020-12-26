import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Page from "./Page";
import { ReactComponent as HangerIcon } from "../assets/svg/hanger.svg";
import { ReactComponent as FilterIcon } from "../assets/svg/filter.svg";

import { Link, useHistory } from "react-router-dom";
import {
  Product,
  ProductFilter,
  Spinner,
  NotContent,
  Dropdown,
} from "../components";
import { useFilter, useUpdateEffect, useOnScreen } from "../hooks";

import * as Api from "../api";
import { useSelector } from "react-redux";
import useModal from "../hooks/useModal";

import { useInfiniteQuery } from "react-query";
import { PRODUCT_LIMIT } from "../constants";

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
    /* flex: 1; */
    display: flex;
    font-weight: bold;
    font-size: 0.95rem;
    text-transform: uppercase;
  }
  .meta .filter {
    width: 100px;
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

  .content {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .product-list-end {
    display: flex;
    justify-content: center;
    /* align-items: center; */
    margin-bottom: 100px;
  }
  .list-end {
    text-transform: uppercase;
    font-variant: small-caps;
    font-weight: bold;
  }
  @media (min-width: 768px) {
    .meta .filter,
    .meta .sort {
      flex: 1;
    }
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
const options = [
  {
    label: "SORT BY LASTEST",
    value: "date",
  },
  {
    label: "SORT PRICE: HIGH TO LOW",
    value: "price-desc",
  },
  {
    label: "SORT PRICE: LOW TO HIGH",
    value: "price",
  },
];
/**
 * HANDLE SCROLL RESTORATION FOR PRODUCT PAGE
 */

export default () => {
  const categories = useSelector((state) => state.global.categories);

  const { size, category, min_price, max_price, q } = useFilter();
  const history = useHistory();
  const display = useModal();
  const loader = React.useRef(null);
  const isOnScreen = useOnScreen(loader, "100px");
  const [selected, setSelected] = useState(options[0]);

  const fetchProducts = async ({ pageParam = 0 }) => {
    const { data, error } = await Api.fetchProducts(
      {
        size: size === "all" ? null : size,
        category: category === "all" ? null : category,
        min_price,
        max_price,
        order_by: selected.value,
        q,
      },
      pageParam
    );
    if (error) {
      throw Error(error);
    }
    return data;
  };

  const {
    data,

    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isError,
    isLoading,
    refetch,
  } = useInfiniteQuery(
    `products-${category}-${size}-${min_price}-${max_price}-${q}`,
    fetchProducts,
    {
      getNextPageParam: (lastPage, pages) => {
        return pages.length * PRODUCT_LIMIT >= lastPage.count
          ? false
          : pages.length;
      },
    }
  );

  useEffect(() => {
    if (category) {
      const validCategory = categories.find(
        (item) => item.name === category || category === "all"
      );
      if (!validCategory) {
        history.push("/404");
      } else {
        refetch();
      }
    }

    // eslint-disable-next-line
  }, [category, size, min_price, max_price, selected, q]);

  useUpdateEffect(() => {
    if (isOnScreen && hasNextPage) {
      fetchNextPage();
    }
  }, [isOnScreen]);

  let productCount,
    totalProductCount = null;
  let content = (
    <NotContent>
      <Spinner top={60} />
    </NotContent>
  );

  if (status === "success") {
    let products = data.pages.map((page) => page.results).flat();
    productCount = products.length;
    totalProductCount = data.pages[0].count;
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

  return (
    <Page>
      <Banner>
        {q ? (
          <h1>Search results: ''{q}''</h1>
        ) : category === "all" ? (
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
          {totalProductCount > 0 && totalProductCount > 0 ? (
            <div className="results-info">
              SHOWING 1–{productCount} OF {totalProductCount} RESULTS
            </div>
          ) : (
            <div className="results-info">SHOWING 0 RESULTS</div>
          )}
          <div className="sort">
            <Dropdown
              options={options}
              value={selected}
              onSelect={(option) => setSelected(option)}
            />
          </div>
        </div>

        <div className="content">{content}</div>

        <div className="loader" ref={loader}></div>
        {!isLoading && !isError && (
          <div className="product-list-end" ref={loader}>
            {isFetchingNextPage && <Spinner />}
            {/* {isFetchingNextPage && <h3>fetching more!</h3>} */}
            {!hasNextPage && data.pages[0].count !== 0 && (
              <p className="list-end">No more Products</p>
            )}
          </div>
        )}
      </Shop>
    </Page>
  );
};
