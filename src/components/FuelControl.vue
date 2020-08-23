<template>
  <div class="fuel-control-wrap">

    <div class="row" style="width: 200px">
      <div class="col">
        <q-btn unelevated  color="grey-8" size="12px" label="Start Update" />
      </div>
      <div class="col">
        <q-btn unelevated  color="grey-8" size="12px" label="Clear Data" />
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'FuelControl',
  props: {
  },
}
</script>

<style scoped>

  .column {
    text-align: center;
  }

  .q-btn {
    border-radius: 0;
  }

  .fuel-control-wrap {
    font-size: var(--fuel-font-size);
    margin: 10px 10px;
  }

  .col {
    padding: 5px
  }

</style>
