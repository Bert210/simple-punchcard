<template>
    <span class="wrapper">
        <input class="time-input" type="number" :value="hours" @change="updateHour">
        <input class="time-input" type="number" :value="minutes" @change="updateMinute">
        <span class="ampm" @click="toggleAMPM()">{{ AMPM }}</span>
    </span>
</template>

<script>
export default {
  props: ['time', 'timeID'],
  data () {
      return ({
          AMPM: 'AM'
      });
  },
  computed: {
      hours: {
          get () {
              let hour = Math.floor(this.time / 60);
              if(hour > 12) {
            //       this.toggleAMPM();
                  hour -= 12;
              }
              return hour;
          }
      },
      minutes: {
          get () {
              return Math.round(this.time % 60);
          }
      },
  },

  methods: {
      toggleAMPM: function() {
          if(this.AMPM === 'AM'){
              this.AMPM = 'PM';
          }else {
              this.AMPM = 'AM';
          }
          this.$emit('ampmChanged', this.AMPM);
      },
      updateHour: function(e) {
        this.$emit('hourChanged', parseInt(e.target.value));
      },

      updateMinute: function(e) {
        this.$emit('minuteChanged', parseInt(e.target.value));
      }
  }
}
</script>

<style lang="scss" scoped>
    wrapper {
        box-sizing: border-box;
    }
    .time-input { 
        width: 4rem;
    }
    .ampm {
        cursor: pointer;
        padding: 3px 6px;
        &:hover {
            background-color: gray;
        }
    }
</style>

