import axios from "axios";

export async function fetchProductsCategories() {
  try {
    const { data } = await axios.get("/categories/");
    return { error: null, data };
  } catch (error) {
    return { error, data: null };
  }
}
export async function fetchProducts(size, category) {
  let query = "?";
  if (size) query += `size=${size}`;
  if (category) query += `&category=${category}`;
  try {
    const { data } = await axios.get("/products" + query);
    return { error: null, data };
  } catch (error) {
    return { error, data: null };
  }
}

export async function fetchFullProduct(slug) {
  try {
    const { data } = await axios.get(`/products/${slug}`);

    return { error: null, data };
  } catch (error) {
    return { error, data: null };
  }
}
