<template>
  <div class="flag-status-wrap" style="width:100%">

    <table>
      <thead>
        <tr>
          <td width="6.25%">lap</td>
          <td width="6.25%">session</td>
          <td width="6.25%">driver</td>
          <td width="6.25%">laptime</td>
          <td width="6.25%">fuel used</td>
          <td width="6.25%">fuel<br/>remaing</td>
          <td width="6.25%">TO EMPTY<br/>laps</td>
          <td width="6.25%">TO EMPTY<br/>time</td>
          <td width="6.25%">NEEDED<br/>fuel</td>
          <td width="6.25%">NEEDED<br/>laps</td>
          <td width="6.25%">TO END<br/>time</td>
          <td width="6.25%">TO END<br/>laps</td>
          <td width="6.25%">FUELING<br/>to end</td>
          <td width="6.25%">FUELING<br/>to full</td>
          <td width="6.25%">FUELING<br/>pit+to end</td>
          <td width="6.25%">FUELING<br/>pit+to full</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lap in car.laps" :key="lap.lap" v-bind:class="{ 'pitted' : lap.pit }">
          <td width="6.25%"
            v-bind:class="{
              red: lap.flag=='Red',
              yellow: lap.flag=='Yellow',
              green: lap.flag=='Green'
            }">
            {{ lap.lap }}
          </td>
          <td width="6.25%">{{ format(lap.session) }}</td>
          <td width="6.25%">{{ lap.driver }}</td>
          <td width="6.25%">{{ format(lap.laptime) }}</td>
          <td width="6.25%">
            <input
              type="text"
              v-bind:class="{override: !!lap.overrideFuelUsed}"
              :value="round(lap.overrideFuelUsed || lap.fuelUsed, 3)"
              v-on:keyup.enter="$event.target.blur()"
              v-on:blur="fuelUsedChange(lap, $event)"
            >
          </td>
          <td width="6.25%">
            <input
              type="text"
              v-bind:class="{override: !!lap.overrideFuelRemaining}"
              :value="round(lap.overrideFuelRemaining || lap.fuelRemaining)"
              v-on:keyup.enter="$event.target.blur()"
              v-on:blur="fuelRemainingChange(lap, $event)"
            >
          </td>
          <td width="6.25%">{{ round(lap.toEmptyLaps) }}</td>
          <td width="6.25%">{{ format(lap.toEmptyTime, false) }}</td>
          <td width="6.25%">{{ round(lap.neededFuel) }}</td>
          <td width="6.25%">{{ round(lap.neededLaps) }}</td>
          <td width="6.25%">{{ format(lap.toEndTime, false) }}</td>
          <td width="6.25%">{{ round(lap.toEndLaps) }}</td>
          <td width="6.25%">{{ round(lap.fuelingToEnd) }}</td>
          <td width="6.25%">{{ round(lap.fuelingToFull) }}</td>
          <td width="6.25%">{{ round(lap.fuelingPitToEnd) }}</td>
          <td width="6.25%">{{ round(lap.fuelingPitToFull) }}</td>
        </tr>
        <tr v-for="x in (30)" :key="x+lastLap">
          <td width="6.25%">{{x+lastLap}}</td>
          <td width="6.25%"></td>
          <td width="6.25%"></td>
          <td width="6.25%"></td>
          <td width="6.25%"></td>
          <td width="6.25%"></td>
          <td width="6.25%"></td>
          <td width="6.25%"></td>
          <td width="6.25%"></td>
          <td width="6.25%"></td>
          <td width="6.25%"></td>
          <td width="6.25%"></td>
          <td width="6.25%"></td>
          <td width="6.25%"></td>
          <td width="6.25%"></td>
          <td width="6.25%"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as time from '../lib/time'

export default {
  name: 'FuelTable',
  props: {
    car: Object
  },
  methods: {
    format: time.format,
    round: function(number, scale=1) { return number.toFixed(scale) },

    fuelUsedChange: function (lap, event) {
      if( parseFloat(lap.fuelUsed).toFixed(3) == parseFloat(event.target.value).toFixed(3) ) { return }
      let newlap = { ...lap }
      newlap.overrideFuelUsed = parseFloat(event.target.value);
      this.$store.dispatch('cars/setLap', newlap);
    },

    fuelRemainingChange: function (lap, event) {
      if( parseFloat(lap.fuelRemaining).toFixed(1) == parseFloat(event.target.value).toFixed(1) ) { return }
      let newlap = { ...lap }
      newlap.overrideFuelRemaining = parseFloat(event.target.value);
      this.$store.dispatch('cars/setLap', newlap);
    }

  },
  computed: {
    lastLap: function (){
      return this.car.laps.length
    }
  }
}
</script>

<style scoped>

  .flag-status-wrap {
    font-size: 11px;
    margin: 10px 10px;
    font-family: Calibri;
    user-select: none;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  td {
    padding: 1px 5px;
    text-align: right;
  }

  td:not(:last-child) {
    border-right: 1px solid #e3e3e3;
  }

  thead td:not(:last-child) {
    border-right: 1px solid #585858;
  }

  thead td {
    background-color: rgb(116, 116, 116) !important;
    text-align: center !important;
    color: white
  }

  tr:nth-child(odd) {
    background-color: #e3e3e3;
  }

  /* STICKY THEAD */


  thead {
    display: block; /* to take the same width as tr */
    position: absolute;
    left: 10px;
    right: 17px; /* - 17px because of the scrollbar width */
    position: absolute;
  }

  thead td {
    height: 40px !important;
  }

  tbody {
    display: block; /* to enable vertical scrolling */
    position: absolute;
    bottom: 0px;
    top: 50px;
    left: 10px;
    right: 0px;
    overflow-y: scroll; /* keeps the scrollbar even if it doesn't need it; display purpose */
  }

  tr {
    display: table; /* display purpose; th's border */
    width: 100%;
  }

  .pitted {
    background-color: rgb(252, 211, 164) !important;
  }

  input {
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    outline: none;
    font-size: 11px;
    text-align: right;
    padding-right: 2px;
    width: 100%;
  }

  input:focus {
    box-shadow: 0 0 0 2px rgb(31, 206, 15);
  }

  input.override {
    color: red;
    font-weight: bolder;
  }

  .green {
    background-color: green;
  }

  .red {
    background-color: red;
  }

  .yellow {
    background-color: yellow;
  }

</style>
