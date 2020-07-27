<template>
  <q-page class="fuel-wrap">

    <div class="row justify-start q-gutter-md" style="padding: 10px 10px 5px 10px">
      <div class="col-1" v-for="car in cars" :key="car.number+'btn'">
        <q-btn
          unelevated
          class="full-width"
          v-bind:class="{ 'activeCar': activeCar.number === car.number }"
          color="secondary"
          size="11px"
          :label="'car '+car.number"
          v-on:click="setCar(car.number)"
        />
      </div>

      <div class="col-3" style="margin-left:auto">
        <q-btn unelevated  color="grey-8" size="12px" label="Clear Data" class="q-mr-xs" v-on:click="clearData" />

        <q-btn v-if="!updating" unelevated  color="grey-8" size="12px" label="Start Update" class="q-mr-xs" v-on:click="startUpdate" />
        <q-btn v-else unelevated  size="12px" label="Stop Update" class="q-mr-xs pulse-green" v-on:click="stopUpdate" />
      </div>
    </div>

    <p class="q-pa-lg" v-if="cars.length == 0">No car numbers have been added</p>
    <fuel-strategy :car="activeCarNumber" ></fuel-strategy>

  </q-page>
</template>

<script>
import FuelStrategy from 'components/FuelStrategy'
import { P1ts } from '../lib/p1ts'

const { remote, shell } = require('electron')
const { dialog } = remote

const axios = require('axios').default;

export default {
  name: 'PageIndex',
  components: { FuelStrategy },

  mounted: function () {
    let config = this.$store.state.settings;
    let p1ts = new P1ts(config.host, config.username, config.password)
    this.$store.dispatch('app/setP1ts', p1ts)
  },

  methods: {

    setCar (number) {
      if (number !== this.activeCar.number) {
        this.$store.dispatch('app/setActiveCar', number)
      }
    },

    addLap () {
      this.$store.dispatch('cars/getP1tsData',   {
        number: 4,
        lap:1,
        session:118894,
        driver:'Russell',
        pit:false,
        flag:'green',
        laptime:118894
      })
    },

    startUpdate () {
      this.$store.dispatch('app/setUpdating', true);
      this.doUpdate()
    },

    stopUpdate () {
      clearTimeout(this.updateTimeout);
      this.$store.dispatch('app/setUpdating', false);
    },

    clearData () {

      dialog.showMessageBox({
        type:'question',
        buttons: ['OK', 'Cancel'],
        title: 'Confirm',
        message: 'Are you sure you wish to clear the data for this car?'
      })
      .then(obj => {
        if(obj.response === 0){
          this.$store.dispatch('cars/clearLaps');
        }
      })
    },

    doUpdate () {

      if(this.$store.state.app.updating == false) return;

      let cars = this.$store.state.cars;
      let p1ts = this.$store.state.app.p1ts

      p1ts.fetchHeartbeat()
      .then( data => {
        return this.$store.dispatch('race/setRaceState', data)
      })
      .then( ()=>{
        //Fetch car laps
        for(let car of cars){
          p1ts.fetchCarData(car.number)
          .then(data => {
            this.$store.dispatch('cars/addNewLaps', {
              laps: data,
              number: car.number
            })
          })
          .catch(err => {
            console.log(err)
          })
        }

        if(this.$store.state.app.updating){
          this.updateTimeout = setTimeout(this.doUpdate, this.$store.state.settings.updateInterval*1000)
        }

      })

    }

  },
  computed: {
    cars () {
      return this.$store.state.cars
    },
    activeCarNumber () {
      return this.$store.state.app.activeCar
    },
    activeCar () {
      return this.cars.find(c => c.number === this.$store.state.app.activeCar) || 0
    },
    updating () {
      return this.$store.state.app.updating
    }
  }
}
</script>



<style>

  .fuel-wrap {
    position: static;
  }

  .q-btn {
    border-radius: 0;
  }

  .activeCar {
    box-shadow: 0 0 0 3px rgb(231, 66, 66);
  }


  /* The animation code */
  @keyframes example {
    0% {background-color: rgb(151, 151, 151);}
    49% {background-color: rgb(151, 151, 151);}
    50% {background-color: rgb(26, 221, 0);}
    100% {background-color: rgb(26, 221, 0);}
  }

  /* The element to apply the animation to */
  .pulse-green {
    animation: example 1s infinite
  }

</style>
