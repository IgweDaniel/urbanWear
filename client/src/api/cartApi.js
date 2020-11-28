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
export async function applyCoupon(code) {
  try {
    const { data } = await axios.patch(`/order/`, { code });
    return { error: null, data };
  } catch (error) {
    return { error: error.response.data, data: null };
  }
}
export async function makePayment(
  token,
  billingAddress,
  shippingAddress,
  email = "",
  password = ""
) {
  try {
    const { data } = await axios.post(`/payment/`, {
      email: email,
      password: password,
      billing: billingAddress,
      shipping: shippingAddress,
      token: token,
    });
    return { error: null, data };
  } catch (error) {
    return { error: error.response.data, data: null };
  }
}
