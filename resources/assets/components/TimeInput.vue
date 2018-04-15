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

