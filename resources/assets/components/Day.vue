<template>
  <div :class="{active: isActive, 'has-time': worked}" @click="echo()"><slot></slot> <span class="total-time" v-if="worked">- {{ `${totalTime.hours}:${totalTime.minutes}` }}</span></div>
</template>

<script>
export default {
  props: ['index'],
  computed: {
      dayIndex: function(){
          if(this.index !== null) {
              return this.index;
          }

          return 'error';
      },
      isActive: function() {
          return this.$store.state.Day.activeDay === this.dayIndex;
      },
      worked: {
          get () {
              return this.$store.state.Time.times.filter(d => { return d.dayID === this.dayIndex}).length > 0;
          }
      },
      totalTime: {
          get () {
            if(this.worked){
                let times = this.$store.state.Time.times.filter(d => { return d.dayID === this.dayIndex});
                // Loop through each time for this day
                let totalMinutes = times.reduce((time, aggTime) => {
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
      echo: function() {
        //   this.$emit('test', this.dayIndex);
        this.$store.commit('setActiveDay', this.dayIndex);
      }
  }
}
</script>

<style>
  .total-time {
    font-size: 10px;
  }
  .has-time {
    font-weight: bold;
  }
</style>
