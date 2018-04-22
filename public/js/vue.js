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

<template>
  <div class="col-3 text-center" style="border-right: 1px solid #000">
        <h4 class="display-5">Days</h4>
        <div class="list-group" id="day-list">
            <Day 
                class="list-group-item" 
                v-for='(day, index) in days' 
                :key='day' 
                :index="index"
            >
                {{ day }}
            </Day>
        </div>
    </div>
</template>

<script>
import Day from './Day';

export default {
    data: () => ({
        // activeDay: 1,
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    }),
    computed: {
        activeDay: {
            get () { return this.$store.state.Day.activeDay; }
        },
    },
    components: { Day },
    methods: {
        echo: function(data) {
            this.activeDay = data;
        }
    }
};
</script>

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
      <span class="btn btn-danger btn-sm" @click="deleteTime(time)">&times;</span>
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
    updateMinuteOut: function(e){
       //Get the hours
      const hours = Math.floor(this.time.outTime / 60);

      // Explode the old time and replace the "in time" with the new "in time"
      let newTime = {
        ...this.time,
        outTime: (hours * 60) + e
      }
      // Pass to updateTime so it can handle all the sending to the store
      this.updateTime(newTime);
    },
    updateAMPMIn:function(e){
      let hours = Math.floor(this.time.inTime / 60);
      const minutes = Math.round(this.time.inTime % 60);

      if(e === 'AM'){
        hours -= 12;
      } else {
        hours += 12;
      }

      let newTime = {
        ...this.time,
        inTime: (hours * 60) + minutes
      }

      this.updateTime(newTime);
    },
    updateAMPMOut:function(e){
      let hours = Math.floor(this.time.outTime / 60);
      const minutes = Math.round(this.time.outTime % 60);

      if(e === 'AM'){
        hours -= 12;
      } else {
        hours += 12;
      }

      let newTime = {
        ...this.time,
        outTime: (hours * 60) + minutes
      }

      this.updateTime(newTime);
    },
    deleteTime: function(e){
      this.$store.commit('deleteTime', e.id);
    }
  }
}
</script>

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


<template>
  <div class="total-time-wrapper">
      Total Time: {{`${total.hours}h ${total.minutes}m`}}
  </div>
</template>

<script>
export default {
  computed: {
      total: {
          get () {
              let tt = this.$store.state.Time.times.reduce( (currentTotal, item) => currentTotal + (item.outTime - item.inTime), 0);
              return { 
                hours: Math.floor(tt / 60),
                minutes: Math.round(tt % 60)
              }
          }
      }
  }
}
</script>


<style>
    .total-time-wrapper {
        width: 100%;
        text-align: center;
        font-size: 3rem;
    }
</style>

