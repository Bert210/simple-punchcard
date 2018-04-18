<template>
  <div>
      <time-input 
        :time="this.time.inTime" 
        @hourChanged="updateHourIn"
        @minuteChanged="updateMinuteIn"
        @ampmChanged="updateAMPMIn"
      ></time-input>
       -> 
      <time-input 
        :time="this.time.outTime"
        @hourChanged="updateHourOut"
        @minuteChanged="updateMinuteOut"
        @ampmChanged="updateAMPMOut"
      ></time-input>
      <span>{{ `${this.timeDiff.hours}:${this.timeDiff.minutes}` }}</span>
  </div>
</template>

<script>
import TimeInput from './TimeInput';

export default {
  props: ['time'],
  components: { TimeInput },
  computed: {
    timeDiff: {
      get() {
        let time = this.time.outTime - this.time.inTime;
        return {
          hours: Math.floor(time / 60),
          minutes: Math.round(time % 60)
        }
      }
    }
  },

  methods: {
    updateTime: function(e) {
      this.$store.commit('updateTime', e);
    },
    updateHourIn: function (e){
      //Get the minutes
      const minutes = Math.round(this.time.inTime % 60);
      // Explode the old time and replace the "in time" with the new "in time"
      let newTime = {
        ...this.time,
        inTime: (e * 60) + minutes
      }
      // Pass to updateTime so it can handle all the sending to the store
      this.updateTime(newTime);
    },

    updateHourOut: function(e) {
      //Get the minutes
      const minutes = Math.round(this.time.outTime % 60);
      // Explode the old time and replace the "in time" with the new "in time"
      let newTime = {
        ...this.time,
        outTime: (e * 60) + minutes
      }
      // Pass to updateTime so it can handle all the sending to the store
      this.updateTime(newTime);
    },
    updateMinuteIn: function(e){
      //Get the hours
      const hours = Math.floor(this.time.inTime / 60);

      // Explode the old time and replace the "in time" with the new "in time"
      let newTime = {
        ...this.time,
        inTime: (hours * 60) + e
      }
      // Pass to updateTime so it can handle all the sending to the store
      this.updateTime(newTime);
    },
    updateMinuteOut: function(e){},
    updateAMPMIn:function(e){},
    updateAMPMOut:function(e){}
  }
}
</script>
