export default {
  namespaced: true,
  state: {
    bluepipleStart: false,
    yellowpipleStart: false,
  },
  mutations: {
    mutateBlueState(state, bool) {
      state.bluepipleStart = bool
    },
    mutateYellowState(state, bool) {
      state.yellowpipleStart = bool
    },
  }
}
