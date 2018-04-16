const state = {
    currentID: 0,
    times: []
  }
  
  const mutations = {
    // addFile (state, file) {
    //   state.list.push(file)
    // },
    createNewTime (state, data) {
      data.id = ++state.currentID;
      state.times.push(data)
    },
    updateTime (state, data) {
      console.log(data);
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