<template>
  <div :class="{active: isActive}" @click="echo()"><slot></slot></div>
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

<template>
  <div class="col-3 text-center" style="border-right: 1px solid #000">
        <h4 class="display-5">Days</h4>
        <div class="list-group" id="day-list">
            <Day 
                class="list-group-item" 
                v-for='(day, index) in days' 
                :key='day' 
                :index="index"
                @test="echo($event)"
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
        }
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
    <input type="number">
    <input type="number">
    <span>AM</span>
</template>

<template>
  <div>
      <input type="text"> -> <input type="text">
  </div>
</template>

<script>
export default {
  
}
</script>

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

