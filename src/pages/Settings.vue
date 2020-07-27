<template>
  <q-page padding>

    <div class="row">
      <div class="col-3">

        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >

          <q-input
            square outlined stack-label dense
            label="Car Numbers"
            lazy-rules
            v-model="settings.carNumbers"
          />

          <q-input
            square outlined stack-label dense
            label="P1TS hostname"
            lazy-rules
            v-model="settings.host"
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-input
            square outlined stack-label dense
            type="number"
            label="Update Interval"
            lazy-rules
            v-model="settings.updateInterval"
            :rules="[
              val => val !== null && val !== '' || 'Please type a number',
              val => val >= 1 && val <= 10000 || 'please type a number between 1 and 10000'
            ]"
          />


          <div>
            <q-btn label="Submit" type="submit" color="primary" />
          </div>
        </q-form>


      </div>
    </div>



  </q-page>
</template>

<script>
const cloneDeep = require('clone-deep')

export default {
  // name: 'PageName',
  data: function () {
    return {
      settings: cloneDeep(this.$store.state.settings)
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('settings/setSettings', this.settings);
      this.$q.notify({
        type: 'positive',
        message: `Settings saved.`
      })

    }
  }
}
</script>
