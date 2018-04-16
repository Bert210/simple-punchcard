<template>
  <div class="col-8 text-center">
    <h4>{{ days[dayIndex] }}</h4>
    <div>
      <time-range></time-range>
      {{ times }}
    </div>
    <button @click="addNewTime">Add New Time</button>
  </div>
</template>

<script>
import TimeRange from './TimeRange';

export default {
  data: function () {
    return ({
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    })
  },
  components: { TimeRange },
  computed: {
    dayIndex: {
      get() {
        return this.$store.state.Day.activeDay;
      }
    },
    times: {
      get () {
        let di = this.dayIndex;
        return this.$store.state.Time.times.filter(function(e){ return e.dayID === di});
      }
    },
  },
  methods: {
    addNewTime: function() {
      this.$store.commit("createNewTime", {
        dayID: this.dayIndex,
        inTime: Date.now(),
        outTime: Date.now() + 100000
      })
    }
  }
}
</script>

