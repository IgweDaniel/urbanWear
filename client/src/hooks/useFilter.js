import { useHistory, useLocation, useParams } from "react-router-dom";

import { MIN_PRICE, MAX_PRICE } from "../constants";

const useFilter = () => {
  let location = useLocation();
  const history = useHistory();

  let category =
    location.pathname.replace("/shop/", "") === "/shop"
      ? "all"
      : location.pathname.replace("/shop/", "");

  const { activeCategory = category } = useParams();

  let query = new URLSearchParams(location.search);
  const size = query.get("size") || "all",
    min_price = query.get("min_price") || MIN_PRICE,
    max_price = query.get("max_price") || MAX_PRICE;

  let searchParams = {};
  const updateFilterSize = (size) => {
    searchParams = {
      size,
      min_price,
      max_price,
    };
    updateLocation(searchParams);
  };
  const updateFilterPrice = (price) => {
    searchParams = {
      size,
      min_price: price[0],
      max_price: price[1],
    };
    updateLocation(searchParams);
  };

  function updateLocation(params) {
    if (params.size === "all") {
      delete params["size"];
    }
    if (params.min_price === 20 && params.max_price === 200) {
      delete params["min_price"];
      delete params["max_price"];
    }
    history.push({
      pathname: `/shop${category === "all" ? "" : `/${category}`}`,
      search: "?" + new URLSearchParams(params).toString(),
    });
  }

  return {
    updateFilterSize,
    updateFilterPrice,
    size,
    min_price,
    max_price,
    category: activeCategory,
  };
};

export default useFilter;
