import axios from "axios";

export async function LoginUser(email, password) {
  try {
    const { data } = await axios.post("/jwt/create/", {
      email,
      password,
    });

    return { error: null, data };
  } catch (error) {
    return { error, data: null };
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
      street: "my billing address",
      apartment: "josey",
      zip_code: "260101",
      country: "NG",
      address_type: "B",
    });

    return { error: null, data };
  } catch (error) {
    return { error, data: null };
  }
}
