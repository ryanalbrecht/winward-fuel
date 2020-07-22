<template>
  <q-page padding>

    <div class="row">
      <div class="col-3">

        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input
            square outlined stack-label dense
            label="P1TS hostname"
            lazy-rules
            v-model="settings.host"
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-input
            square outlined stack-label dense
            label="P1TS Username"
            lazy-rules
            v-model="settings.username"
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-input
            square outlined stack-label dense
            label="P1TS Password"
            type="password"
            lazy-rules
            v-model="settings.password"
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />


          <q-input
            square outlined stack-label dense
            type="number"
            label="Update Interval"
            lazy-rules
            v-model="settings.updateInterval"
            :rules="[
              val => val !== null && val !== '' || 'Please type your age',
              val => val > 0 && val < 100 || 'Please type a real age'
            ]"
          />


          <div>
            <q-btn label="Submit" type="submit" color="primary" v-on:click="submit" />
          </div>
        </q-form>


      </div>
    </div>



  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data: function () {
    return {
      settings: {
        host: 'pit1.winwardpit.com',
        username: 'winward',
        password: '123456',
        updateInterval: 10
      }
    }
  },
  methods: {
    submit () {
      console.log('submitted')
    }
  }
}
</script>
