<template>
  <div class="fuel-input-wrap" :style="{width: width || '280px'}">

    <div class="row">
      <div class="col">

        <div class="row">
          <div class="col">threshold</div>
          <div class="col"> <input type="text"> </div>
        </div>
        <div class="row">
          <div class="col">laptime</div>
          <div class="col"> <input type="text"> </div>
        </div>
        <div class="row">
          <div class="col">fuel/lap</div>
          <div class="col"> <input type="text"> </div>
        </div>
        <div class="row">
          <div class="col">capacity</div>
          <div class="col"> <input type="text"> </div>
        </div>
        <div class="row">
          <div class="col">start cap</div>
          <div class="col"> <input type="text"> </div>
        </div>
        <div class="row">
          <div class="col">factor</div>
          <div class="col"> <input type="text"> </div>
        </div>

      </div>
      <div class="col q-pl-sm">
        <div class="row">
          <div class="col">car #</div>
          <div class="col"><input type="text" class="car"> </div>
        </div>
        <div class="row">
          <div class="col">pit delta</div>
          <div class="col"> <input type="text"> </div>
        </div>
        <div class="row">
          <div class="col">ltr/sec</div>
          <div class="col"> <input type="text"> </div>
        </div>
        <div class="row">
          <div class="col">slope</div>
          <div class="col"> <input type="text"> </div>
        </div>
        <div class="row">
          <div class="col">slope</div>
          <div class="col"> <input type="text"> </div>
        </div>
        <div class="row">
          <div class="col">intercept</div>
          <div class="col"> <input type="text"> </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: 'FuelInputs',
  props: {
    width: Number
  }
}
</script>

<style scoped>

  .col:nth-child(1) {
    text-align: right;
    padding-right:3px;
  }

  .fuel-input-wrap {
    font-size: var(--fuel-font-size);
    margin: 5px 10px;
  }

  input {
    border: none;
    padding: 0;
    margin: 0;
    outline: none;
    font-size: var(--fuel-font-size);
    text-align: right;
    background: rgb(64, 152, 211);
    border: 1px solid rgb(64, 152, 211);
    padding-right: 3px;
    width: 80px;
  }

  input.car {
    background: #f86666;
    border: 1px solid #f86666;

  }

  input:focus {
    border: 1px solid rgb(8, 102, 0);
  }

</style>
