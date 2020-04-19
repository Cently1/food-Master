const state = () => ({ getProduct: [] });

const mutations = {
  setGetProduct(state, val) {
    state.getProduct = val;
  }
};

const actions = {
  setGetProduct: ({ commit }, getProduct) => {
    commit("setGetProduct", getProduct);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
