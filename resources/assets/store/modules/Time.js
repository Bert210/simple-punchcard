const state = {
    currentID: 0,
    times: []
  }
  
  const mutations = {
    createNewTime (state, data) {
      data.id = ++state.currentID;
      state.times.push(data)
    },
    updateTime (state, data) {
      let newTimes = state.times.map(function(e){
        if(e.id === data.id){
          return data;
        }
        return e;
      });

      state.times = newTimes;
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