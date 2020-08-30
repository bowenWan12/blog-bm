import Cookie from "js-cookie";
import { getToken, setToken, removeToken } from "@/request/token";
import Vue from "vue";
export default {
  state: {
    token: ""
  },
  mutations: {
    // 前端 登出
    fedLogOut({ commit }) {
      return new Promise((resolve, reject) => {
        commit("SET_TOKEN", "");
        commit("SET_ACCOUNT", "");
        commit("SET_NAME", "");
        commit("SET_AVATAR", "");
        commit("SET_ID", "");
        removeToken();
        resolve();
      }).catch(error => {
        // eslint-disable-next-line no-undef
        reject(error);
      });
    },
    setToken(state, val) {
      state.token = val;
      Cookie.set("token", val);
    },
    clearToken(state) {
      state.token = "";
      Cookie.remove("token");
    },
    getToken(state) {
      state.token = Cookie.get("token");
    }
  },
  actions: {}
};
