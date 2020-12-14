export default {
  state: {
    loading: {},
    loadingStatus: false
  },
  mutations: {
    toogleLoading (state, _url) {
      state.loading[_url] = !state.loading[_url]
      state.loadingStatus = Object.values(state.loading).indexOf(true) > -1
    }
  }
}