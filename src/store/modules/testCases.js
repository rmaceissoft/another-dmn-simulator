
// initial state
const state = () => ({
  all: []
})

// getters
const getters = {}

// actions
const actions = {
  async getAllTestCases ({ commit }) {
    // const testCases = await api.getTestCases()
    const testCases = []
    commit('setTestCases', testCases)
  }
}

// mutations
const mutations = {
  setTestCases (state, testCases) {
    state.all = testCases
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}