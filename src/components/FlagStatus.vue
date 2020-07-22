<template>
  <div class="flag-status-wrap" style="width:115px">

    <div class="column">
      <div class="col flag" :style='{backgroundColor: flagColor}'>{{flagName}}</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'FlagStatus',
  props: {
    flag: String
  },
  computed: {
    flagName: function () {
      return (this.flag || 'finished').toUpperCase()
    },
    flagColor: function () {
      switch (this.flagName.toLowerCase()) {
        case 'green' :
          return 'lime'
        case 'yellow' :
          return '#ffea00'
        case 'red' :
          return '#ff4334'
        case 'finished' :
          return '#aaa'
      }

      return 'white'
    }
  }
}
</script>

<style scoped>

  .flag-status-wrap {
    font-size: var(--fuel-font-size);
    margin: 10px 10px;
    font-family: Consolas;
  }


  .flag {
    height: 115px;
    line-height: 115px;
    font-size: 15px;
    text-align: center;
    border:1px solid #bbb;
  }

</style>
