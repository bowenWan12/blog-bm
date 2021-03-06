import Cookie from "js-cookie";
export default {
  state: {
    menu: [],
    role: [],
    currentMenu: null,
    isCollapse: false,
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
    setMenu(state, val) {
      state.menu = val;
      Cookie.set("menu", JSON.stringify(val));
    },
    setUserRole(state, val) {
      state.role = val;
      Cookie.set("role", JSON.stringify(val));
    },
    clearUserRole(state) {
      state.role = [];
      Cookie.remove("role");
    },
    getUserRole(state) {
      if (Cookie.get("role")) {
        let role = JSON.parse(Cookie.get("role"));
        state.role = role;
      }
    },
    clearMenu(state) {
      state.menu = [];
      Cookie.remove("menu");
    },
    addMenu(state, router) {
      if (!Cookie.get("menu")) {
        return;
      }
      let menu = JSON.parse(Cookie.get("menu"));
      // if (!menu) {
      //   return
      // }
      state.menu = menu;
      let currentMenu = [
        {
          path: "/",
          component: () => import("@/views/Main"),
          children: []
        }
      ];
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            item.component = () => import(`@/views/${item.url}`);
            return item;
          });
          currentMenu[0].children.push(...item.children);
        } else {
          item.component = () => import(`@/views/${item.url}`);
          currentMenu[0].children.push(item);
        }
      });
      // console.log(currentMenu, 'curr')
      router.addRoutes(currentMenu);
    },
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
    getMenu(state) {
      if (Cookie.get("tagList")) {
        // console.log('haha')
        let tagList = JSON.parse(Cookie.get("tagList"));
        state.tabsList = tagList;
      }
    },
    closeTab(state, val) {
      let result = state.tabList.findIndex(item => item.name === val.name);
      state.tabList.splice(result, 1);
    },
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    }
  },
  actions: {}
};
