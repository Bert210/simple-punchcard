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

