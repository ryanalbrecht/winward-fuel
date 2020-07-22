<template>
  <div class="fuel-output-wrap" :style="{width: width || '150px'}">
    <div class="col">
      <div class="row">
        <div class="col">max time</div>
        <div class="col">00:00:00</div>
      </div>
      <div class="row">
        <div class="col">max laps</div>
        <div class="col">0</div>
      </div>
      <div class="row">
        <div class="col">fuel time</div>
        <div class="col">0</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FuelOutputs',
  props: {
    width: Number
  }
}
</script>

<style scoped>


  .fuel-output-wrap {
    font-size: var(--fuel-font-size);
    margin: 5px 10px;
  }


  .col:nth-child(1) {
    text-align: right;
    padding-right:3px;
  }

  .col:nth-child(2) {
    width: 80px;
    background: rgb(64, 211, 142);
    border: 1px solid rgb(64, 211, 142);
    padding-right: 3px;
  }

</style>
