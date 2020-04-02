const state = () => ({ menu: [],hotPlace:[]})

const mutations = {
  setMenu(state, val) {
    state.menu = val;
  },
  setHotplace(state, val) {
    state.hotPlace = val;
  }
};

const actions = {
  setMenu: ({ commit }, menu) => {
    commit("setMenu", menu);
  },
  setHotplace: ({ commit }, hotPlace) => {
    commit("setHotplace", hotPlace);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
