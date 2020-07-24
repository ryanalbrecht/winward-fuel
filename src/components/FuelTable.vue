<template>
  <div class="flag-status-wrap" style="width:100%">

    <table>
      <thead>
        <tr>
          <td width="6.666%">
            lap / flag
            <q-tooltip>Lap number</q-tooltip>
          </td>
          <td width="6.666%">
            driver
            <q-tooltip>The driver who was in the car at the END of the lap</q-tooltip>
          </td>
          <td width="6.666%">
            laptime
            <q-tooltip>The laptime of the lap duhh...</q-tooltip>
          </td>
          <td width="6.666%" style="background-color: #888 !important">
            fuel used
            <q-tooltip>The calculate amount of fuel that was used during this lap. If function = true, then it will use the straight line formula</q-tooltip>
          </td>
          <td width="6.666%" style="background-color: #888 !important">
            fuel<br/>remaing
            <q-tooltip>The amount of fuel that is the tank at the end of the lap</q-tooltip>
          </td>
          <td width="6.666%" style="background-color: #d98686 !important">
            <q-tooltip>The number of laps that can be completed with the remaining fuel in the car</q-tooltip>
            TO EMPTY<br/>laps            
          </td>
          <td width="6.666%" style="background-color: #d98686 !important">
            <q-tooltip>The amount of time that can be driven with the remaing fuel in the car</q-tooltip>
            TO EMPTY<br/>time
          </td>
          <td width="6.666%" style="background-color: #CCCC00 !important">
            <q-tooltip>The amount of fuel needed to be able to finish the race</q-tooltip>
            NEEDED<br/>fuel
          </td>
          <td width="6.666%" style="background-color: #CCCC00 !important">
            <q-tooltip>The number of laps needed in addition to the fuel in the car. Eg. Thomas! I need you to squeeze 4 for more laps out of the tank</q-tooltip>
            NEEDED<br/>laps  
          </td>
          <td width="6.666%" style="background-color:	#6fc96f  !important">
            <q-tooltip>The time remaining in the race</q-tooltip>
            TO END<br/>time            
          </td>
          <td width="6.666%" style="background-color:	#6fc96f  !important">
            <q-tooltip>The number of laps remaining in the race using the average configured laptime</q-tooltip>
            TO END<br/>laps              
          </td>
          <td width="6.666%" style="background-color: #c17dd1 !important">
            <q-tooltip>The number of seconds of fuel needed to be put in into the car to finish the race</q-tooltip> 
            FUELING<br/>to end             
          </td>
          <td width="6.666%" style="background-color: #c17dd1 !important">
            <q-tooltip>The number of seconds of fuel needed to be put in into the car to fill it up</q-tooltip>
            FUELING<br/>to full             
          </td>
          <td width="6.666%" style="background-color: 	#7497d6 !important">
            <q-tooltip>The number of seconds of fuel needed to be put in into the car to finish the race AND to traverse pit lane</q-tooltip> 
            FUELING<br/>pit+to end</td>           
          <td width="6.666%" style="background-color: 	#7497d6 !important">
            <q-tooltip>The number of seconds of fuel needed to be put in into the car to fill it up AND to traverse pit lane</q-tooltip> 
            FUELING<br/>pit+to full</td>            
        </tr>
      </thead>
      <tbody>
        <tr v-for="lap in car.laps" :key="lap.lap" v-bind:class="{ 'pitted' : lap.pit }">
          <td width="6.666%"
            v-bind:class="{
              red: lap.flag=='Red',
              yellow: lap.flag=='Yellow',
              green: lap.flag=='Green'
            }">
            {{ lap.lap }}
          </td>
          <td width="6.666%">{{ lap.driver }}</td>
          <td width="6.666%">{{ format(lap.laptime) }}</td>
          <td width="6.666%">
            <input
              type="text"
              v-bind:class="{override: !!lap.overrideFuelUsed}"
              :value="round(lap.overrideFuelUsed || lap.fuelUsed, 3)"
              v-on:keyup.enter="$event.target.blur()"
              v-on:blur="fuelUsedChange(lap, $event)"
            >
          </td>
          <td width="6.666%">
            <input
              type="text"
              v-bind:class="{override: !!lap.overrideFuelRemaining}"
              :value="round(lap.overrideFuelRemaining || lap.fuelRemaining)"
              v-on:keyup.enter="$event.target.blur()"
              v-on:blur="fuelRemainingChange(lap, $event)"
            >
          </td>
          <td width="6.666%">{{ round(lap.toEmptyLaps) }}</td>
          <td width="6.666%">{{ format(lap.toEmptyTime, false) }}</td>
          <td width="6.666%">{{ round(lap.neededFuel) }}</td>
          <td width="6.666%">{{ round(lap.neededLaps) }}</td>
          <td width="6.666%">{{ format(lap.toEndTime, false) }}</td>
          <td width="6.666%">{{ round(lap.toEndLaps) }}</td>
          <td width="6.666%">{{ round(lap.fuelingToEnd) }}</td>
          <td width="6.666%">{{ round(lap.fuelingToFull) }}</td>
          <td width="6.666%">{{ round(lap.fuelingPitToEnd) }}</td>
          <td width="6.666%">{{ round(lap.fuelingPitToFull) }}</td>
        </tr>
        <tr v-for="x in (30)" :key="x+lastLap">
          <td width="6.666%">{{x+lastLap}}</td>
          <td width="6.666%"></td>
          <td width="6.666%"></td>
          <td width="6.666%"></td>
          <td width="6.666%"></td>
          <td width="6.666%"></td>
          <td width="6.666%"></td>
          <td width="6.666%"></td>
          <td width="6.666%"></td>
          <td width="6.666%"></td>
          <td width="6.666%"></td>
          <td width="6.666%"></td>
          <td width="6.666%"></td>
          <td width="6.666%"></td>
          <td width="6.666%"></td>
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
    background-color: rgb(168, 168, 168) !important;
    text-align: center !important;
    color: black
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
    box-shadow: 0 0 0 2px rgb(255, 0, 0);
  }

  input.override {
    color: red;
    font-weight: bolder;
  }

  .green {
    background-color: rgb(158, 238, 158);
    border-bottom:1px solid rgb(184, 184, 184)
  }

  .red {
    background-color: #e9b6b3;
    border-bottom:1px solid rgb(184, 184, 184)
  }

  .yellow {
    background-color: rgb(243, 231, 166);
    border-bottom:1px solid rgb(184, 184, 184)
  }

  tr:not(:first-child):hover {
    background-color: rgb(158, 197, 197) !important
  }

</style>
