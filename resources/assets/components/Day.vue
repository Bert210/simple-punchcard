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
