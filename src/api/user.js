import request from "@/request/config.js";

export function getUserList(pageParam,name) {
  return request({
    url: `/admin/system/user/getUser`,
    method: "get",
    params: {
        page: pageParam.page,
        limit: pageParam.total,
        name
      }
  });
}
export function createUser(formdata) {
  return request({
    url: `/admin/system/user/add`,
    method: "post",
    data: formdata
  });
}
export function editUser(formdata) {
  return request({
    url: `/admin/system/user/edit`,
    method: "post",
    data: formdata
  });
}
export function deleteUser(formdata) {
  return request({
    // headers: {'Content-Type': 'application/x-www-form-urlencoded '},
    url: `/admin/system/user/delete`,
    method: "post",
    data: formdata
  });
}