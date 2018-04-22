<template>
  <div class="col-8 text-center">
    <h4>{{ days[dayIndex] }}</h4>
    <div class="time-wrapper" v-if="!empty">
      <time-range class="time-range" v-for="(time,index) in times" v-bind:key="index" :time='time'></time-range>
      <div>Total Time: {{ `${totalTime.hours}:${totalTime.minutes}` }}</div>
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
    },
    totalTime: {
      get () {
        if(!this.empty){
          // Loop through each time for this day
          let totalMinutes = this.times.reduce((time, aggTime) => {
            return time + (aggTime.outTime - aggTime.inTime);
          }, 0);

          return {
            hours: Math.floor(totalMinutes / 60),
            minutes: Math.round(totalMinutes % 60)
          }
        }
        return {hours: 0, minutes:0}
      }
    }
  },
  methods: {
    addNewTime: function() {
      this.$store.commit("createNewTime", {
        dayID: this.dayIndex,
        inTime: 0,
        outTime: 0
      })
    }
  }
}
</script>

<style>
.time-range {
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom: 1px dotted lightgray;

}
.time-wrapper > div:nth-last-child(2){
  border: none !important;
  /* background-color: magenta; */
}
</style>

