<template>
  <div class="time-elapsed-wrap" :style="{width: width || '130px'}">
    <div class="row">
      <div class="col" style="font-size: var(--fuel-font-size); text-align:center">
        Remaining
      </div>
    </div>
    <div class="row">
      <div class="col time-remaining">
        00.00.00
      </div>
    </div>
    <div class="row">
      <div class="col">Local</div>
      <div class="col">00.00.00</div>
    </div>
    <div class="row">
      <div class="col">Start</div>
      <div class="col">00.00.00</div>
    </div>
    <div class="row">
      <div class="col">Session</div>
      <div class="col">00.00.00</div>
    </div>
    <div class="row">
      <div class="col">Length</div>
      <div class="col">00.00.00</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimeElapsed',
  props: {
    width: Number
  }
}
</script>

<style scoped>
  .col:nth-child(2) {
    text-align: right;
  }
</style>

<style>
  .time-elapsed-wrap {
    font-size: var(--fuel-font-size);
    margin: 5px 10px;
  }

  .time-remaining {
    font-size: 20px;
    text-align: center;
    background-color: rgb(197, 217, 241);
  }
</style>
