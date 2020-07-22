<template>
  <q-page class="fuel-wrap ">

    <p class="q-pa-lg" v-if="cars.length == 0">No car numbers have been added</p>
    <fuel-strategy v-else></fuel-strategy>


  </q-page>
</template>

<script>
import FuelStrategy from 'components/FuelStrategy'

export default {
  name: 'PageIndex',
  components: { FuelStrategy },
  computed: {
    cars () {
      return this.$store.state.settings.carNumbers.split(',')
    }
  }
}
</script>



<style>

</style>
