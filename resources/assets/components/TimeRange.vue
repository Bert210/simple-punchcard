<template>
  <div>
      <time-input :time="this.time.inTime"></time-input> -> <time-input :time="this.time.outTime"></time-input>
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
  }
}
</script>
