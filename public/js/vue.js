<!--
<template>
  div
    what the {{message}}
</template>

<script>
  export default {
    data () {
      return {
        message: "hello world!"
      }
    }
  }
// </script>
-->

<template>
    <div>
        {{ message }}
    </div>
</template>

<script>
    export default {
        data () {
            return({
                message: "hello"
            })
        }
    }
</script>