<template>
  <div class="col-8 text-center">
    <h4>{{ days[dayIndex] }}</h4>
    <div v-if="!empty">
      <time-range v-for="(time,index) in times" v-bind:key="index" :time='time'></time-range>
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
    empty: {
      get () {
        return this.times.length == 0;
      }
    }
  },
  methods: {
    addNewTime: function() {
      this.$store.commit("createNewTime", {
        dayID: this.dayIndex,
        inTime: 8*60+23,
        outTime: (1+12)*60+55
      })
    }
  }
}
</script>

