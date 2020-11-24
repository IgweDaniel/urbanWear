import axios from "axios";

export async function addToCart(size, productId, quantity = 1) {
  try {
    const { data } = await axios.post("/order/", {
      size: size,
      product: productId,
      quantity: quantity,
    });

    return { error: null, data };
  } catch (error) {
    return { error, data: null };
  }
}
export async function fetchCart() {
  try {
    const { data } = await axios.get("/order/");
    return { error: null, data };
  } catch (error) {
    return { error, data: null };
  }
}
