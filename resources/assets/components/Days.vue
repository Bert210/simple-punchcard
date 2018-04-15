<template>
  <div class="col-3 text-center" style="border-right: 1px solid #000">
        <h4 class="display-5">Days</h4>
        <div class="list-group" id="day-list">
            {{ activeDay }}
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
