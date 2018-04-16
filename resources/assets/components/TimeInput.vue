<template>
    <span class="wrapper">
        <input class="time-input" type="number" :value="hours">
        <input class="time-input" type="number" :value="minutes">
        <span class="ampm" @click="toggleAMPM()">{{ AMPM }}</span>
    </span>
</template>

<script>
export default {
  props: ['time'],
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
                  this.toggleAMPM();
                  hour -= 12;
              }
              return hour;
          },
          set (e) {
            console.log(e);
            //   return this.$store.commit('updateTime', e);
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
      },
      updateHour: function() {
          console.log("Updating hour");
        //   this.$store.commit('');
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

