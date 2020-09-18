import request from "@/request/config.js";

export function login(username, password, verifycode, rememberMe) {
  const data = {
    username,
    password,
    rememberMe,
    verifycode
  };
  return request({
    url: "/login/main",
    method: "post",
    data
  });
}
export function refreshCode() {
  return request({
    url: "/genCaptcha",
    method: "get"
  });
}
export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}

// export function getUserInfo() {
//   return request({
//     url: '/users/currentUser',
//     method: 'get'
//   })
// }

// export function register(account, nickname, password) {
//   const data = {
//     account,
//     nickname,
//     password
//   }
//   return request({
//     url: '/register',
//     method: 'post',
//     data
//   })
// }
