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
