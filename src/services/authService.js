import http from "./httpService";
import jwtDecode from "jwt-decode";
import {
  getTomorrowDate,
  getTodaysDate,
  getTimeAfterTenMinutes,
} from "../components/common/date";
const tokenKey = "token";
const apiEndpoint = "/auth";

http.setJwt(getJwt());

export async function login(email, password, rememberMe) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });

  localStorage.setItem(tokenKey, jwt);
  rememberMe
    ? localStorage.setItem("TTL", getTomorrowDate())
    : localStorage.setItem("TTL", getTimeAfterTenMinutes());
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem("TTL");
}

export function getCurrentUser() {
  try {
    const TTL = localStorage.getItem("TTL");
    if (TTL > getTodaysDate) {
      const jwt = localStorage.getItem(tokenKey);
      const user = jwtDecode(jwt);
      return user;
    } else {
      logout();
      // return null;
    }
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};
