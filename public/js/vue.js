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
  <span>{{ days[dayIndex] }}</span>
</template>

<script>
export default {
  data: function () {
    return ({
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    })
  },
  computed: {
    dayIndex: {
      get() {
        return this.$store.state.Day.activeDay;
      }
    }
  }
}
</script>

