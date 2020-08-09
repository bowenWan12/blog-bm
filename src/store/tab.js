export default {
  state: {
    menu: [],
    currentMenu: null
  },
  mutations: {
    selectMenu(state, val) {
      // if(val.name !== 'home'){
      //   state.currentMenu = val;
      // } else {
      //   state.currentMenu = null;
      // }
      val.name === "home"
        ? (state.currentMenu = null)
        : (state.currentMenu = val);
    }
  },
  actions: {}
};
