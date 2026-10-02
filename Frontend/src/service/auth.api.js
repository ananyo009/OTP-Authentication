import axios from "axios";

const api = axios.create({
  baseURL: "https://otp-authentication-xt1d.onrender.com/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: true,
});

export const login = async (username, password) => {
  try {
    const response = await api.post("/login", { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await api.post("/register", { username, email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async ( otp, email ) => {
  try {
        const response = await api.post("/verify-email", { otp, email } ); 
    return response.data;
  } catch (error) {
    throw error;
  } 
};
