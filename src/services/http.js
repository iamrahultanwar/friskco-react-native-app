import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Http = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
});

Http.interceptors.request.use(async function (config) {
  try {
    const value = await AsyncStorage.getItem("token");
    if (value !== null) {
      config.headers.token = `${value}`;
    }
    return config;
  } catch (e) {
    return config;
  }
});

Http.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      return Promise.reject("Unauthorized access");
    }
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      return Promise.reject("Unauthorized access");
    }
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  }
);
export const GetCurrentUser = async () => {
  return Http.get("/user/me");
};

export const LoginUser = (email, password) => {
  return Http.post("/user/login", { email, password });
};

export const GetUserDrives = async () => {
  return Http.get("/drive");
};

export const GetUserDriveFiles = async (driveId) => {
  return Http.get("/drive/files/" + driveId);
};
