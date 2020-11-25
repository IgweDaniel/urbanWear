import axios from "axios";

export async function addToCart(size, productId, quantity) {
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
    const { data } = await axios.get("/order/?status=active");
    return { error: null, data };
  } catch (error) {
    return { error, data: null };
  }
}

export async function updateCartItem(id, size, quantity) {
  try {
    const { data } = await axios.put(`/orderitem/${id}`, {
      size,
      quantity,
    });
    return { error: null, data };
  } catch (error) {
    return { error, data: null };
  }
}
export async function deleteCartItem(id) {
  try {
    const { data } = await axios.delete(`/orderitem/${id}`);
    return { error: null, data };
  } catch (error) {
    return { error, data: null };
  }
}
