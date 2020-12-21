import axios from "axios";
import { PRODUCT_LIMIT } from "../constants";

export async function fetchProductsCategories() {
  try {
    const { data } = await axios.get("/categories/");
    return { error: null, data };
  } catch (error) {
    return { error, data: null };
  }
}

export async function fetchProducts(filter, page) {
  const { size, category, min_price, max_price, order_by } = filter;
  const resultLimit = PRODUCT_LIMIT;
  let query = `?offset=${
    page * resultLimit
  }&limit=${PRODUCT_LIMIT}&min_price=${min_price}&max_price=${max_price}&order_by=${order_by}`;

  if (size) query += `&size=${size}`;
  if (category) query += `&category=${category}`;

  try {
    const { data } = await axios.get("/products/" + query);
    return { error: null, data };
  } catch (error) {
    return { error, data: null };
  }
}

export async function fetchFullProduct(slug) {
  try {
    const { data } = await axios.get(`/products/${slug}/`);

    return { error: null, data };
  } catch (error) {
    return { error, data: null };
  }
}
