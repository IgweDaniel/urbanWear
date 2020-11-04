import { useHistory, useLocation, useParams } from "react-router-dom";
import { MIN_PRICE, MAX_PRICE } from "../constants";
const useFilter = () => {
  const { category = "all" } = useParams();

  let location = useLocation();
  const history = useHistory();

  let query = new URLSearchParams(location.search);
  const size = query.get("size") || "all",
    min__price = query.get("min__price") || MIN_PRICE,
    max__price = query.get("max__price") || MAX_PRICE;

  let searchParams = {};
  const updateFilterSize = (size) => {
    searchParams = {
      size,
      min__price,
      max__price,
    };
    updateLocation(searchParams);
  };
  const updateFilterPrice = (price) => {
    console.log(price);
    searchParams = {
      size,
      min__price: price[0],
      max__price: price[1],
    };
    updateLocation(searchParams);
  };

  function updateLocation(params) {
    if (params.size === "all") {
      delete params["size"];
    }
    if (params.min__price === 20 && params.max__price === 200) {
      delete params["min__price"];
      delete params["max__price"];
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
    min__price,
    max__price,
    category,
  };
};

export default useFilter;
