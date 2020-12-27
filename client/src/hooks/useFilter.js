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
    max_price = query.get("max_price") || MAX_PRICE,
    q = query.get("q");
  let searchParams = { q, size, min_price, max_price };

  const updateFilterSize = (newSize) => {
    searchParams["size"] = newSize;
    updateLocation(category, searchParams);
  };
  const updateFilterPrice = (price) => {
    searchParams["min_price"] = price[0];
    searchParams["max_price"] = price[1];
    updateLocation(category, searchParams);
  };

  function updateLocation(category, params) {
    if (params.size === "all") {
      delete params["size"];
    }
    if (params.min_price === MIN_PRICE && params.max_price === MAX_PRICE) {
      delete params["min_price"];
      delete params["max_price"];
    }
    if (q == null) {
      delete params["q"];
    }
    history.push({
      pathname: `/shop/${category}`,
      search: "?" + new URLSearchParams({ ...params }).toString(),
    });
  }

  function updateCategory(category) {
    updateLocation(category, searchParams);
  }

  return {
    updateFilterSize,
    updateFilterPrice,
    size,
    min_price,
    max_price,
    category: activeCategory,
    updateCategory,
    q,
  };
};

export default useFilter;
