export default {
  state: {
    menu: [],
    currentMenu: null,
    tabList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "home"
      }
    ]
  },
  mutations: {
    selectMenu(state, val) {
      if (val.name !== "home") {
        state.currentMenu = val;
        let result = state.tabList.findIndex(item => item.name === val.name);
        result === -1 ? state.tabList.push(val) : "";
      } else {
        state.currentMenu = null;
      }
      // val.name === "home"
      //   ? (state.currentMenu = null)
      //   : (state.currentMenu = val);
    },
    closeTab(state, val) {
      let result = state.tabList.findIndex(item => item.name === val.name);
      state.tabList.splice(result, 1);
    }
  },
  actions: {}
};
