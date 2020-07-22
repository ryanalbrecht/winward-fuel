<template>
  <q-page class="fuel-wrap ">

    <div class="row justify-start fuel-header">
        <flag-status></flag-status>
        <time-elapsed></time-elapsed>
        <fuel-inputs></fuel-inputs>
        <fuel-outputs></fuel-outputs>
        <fuel-control style="margin-left:auto"></fuel-control>
    </div>


    <div class="row fuel-table">
      <fuel-table></fuel-table>
    </div>


  </q-page>
</template>

<script>
import TimeElapsed from 'components/TimeElapsed'
import FuelInputs from 'components/FuelInputs'
import FuelOutputs from 'components/FuelOutputs'
import FuelControl from 'components/FuelControl'
import FlagStatus from 'components/FlagStatus'
import FuelTable from 'components/FuelTable'

export default {
  name: 'FuelStrategy',
  components: { TimeElapsed, FuelInputs, FuelOutputs, FuelControl, FlagStatus, FuelTable }
}
</script>

<style>

  .fuel-table {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 130px;
  }

  .fuel-header * {
    user-select: none;
  }
</style>
