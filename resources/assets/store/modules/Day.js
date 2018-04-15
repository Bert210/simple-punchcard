const state = {
    activeDay: 0
  }
  
  const mutations = {
    // addFile (state, file) {
    //   state.list.push(file)
    // },
    setActiveDay (state, dayIndex) {
        state.activeDay = dayIndex;
    }
  }
  
  const actions = {
    // someAsyncTask ({ commit }) {
    //   // do something async
    //   commit('INCREMENT_MAIN_COUNTER')
    // }
  }
  
  export default {
    state,
    mutations,
    actions
  }