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
    // headers: {'Content-Type': 'multipart/form-data'},
    url: `/admin/system/user/add`,
    method: "post",
    data: formdata
  });
}