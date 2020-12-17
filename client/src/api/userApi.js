import axios from "axios";

export async function LoginUser(email, password) {
  try {
    const { data } = await axios.post("/jwt/create/", {
      email,
      password,
    });
    return { error: null, data };
  } catch (error) {
    return { error: error.response.data, data: null };
  }
}
export async function getUser() {
  try {
    const { data } = await axios.get("/users/me");
    return { error: null, data };
  } catch (error) {
    return { error, data: null };
  }
}

export async function updateAddress(address) {
  try {
    const { data } = await axios.post("/addresses/", {
      name: address["name"],
      lastname: address["lastname"],
      street: address["street"],
      apartment: address["apartment"],
      zip_code: address["zip_code"],
      country: address["country"],
      address_type: address["address_type"],
    });

    return { error: null, data };
  } catch (error) {
    return { error, data: null };
  }
}

export async function listOrders() {
  try {
    const { data } = await axios.get("/order/");
    return { error: null, data };
  } catch (error) {
    return { error: error.response.data, data: null };
  }
}

export async function updatePassword({ password, newPassword }) {
  try {
    const { data } = await axios.post("/users/set_password/", {
      current_password: password,
      new_password: newPassword,
    });

    return { error: null, data };
  } catch (error) {
    return { error: error.response.data, data: null };
  }
}

export async function updateEmail({ email, password }) {
  try {
    const { data } = await axios.post("/users/set_email/", {
      new_email: email,
      current_password: password,
    });

    return { error: null, data };
  } catch (error) {
    return { error: error.response.data, data: null };
  }
}
