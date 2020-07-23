<template>
  <q-layout view="lHh Lpr lFf">

    <!-- <q-header :elevated=false bordered class="bg-grey-1 text-black">
      <q-bar class="q-electron-drag bg-grey-5" dense >
        <div class="q-pr-xs">Winward<span class="text-blue-8">Fuel</span></div>

        <div class="cursor-pointer q-electron-drag--exception">
            File
            <q-menu>
              <q-list dense style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section>Open</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>Save</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
        </div>
        <div class="cursor-pointer q-electron-drag--exception">
            Application
            <q-menu>
              <q-list dense style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section v-on:click="linkTo('/')">Strategy</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section v-on:click="linkTo('/settings')">Settings</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
        </div>
        <div class="cursor-pointer q-electron-drag--exception">
            Help
            <q-menu>
              <q-list dense style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section>Lol, theres no help dude...</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
        </div>

        <q-space />

        <q-btn dense flat icon="minimize" />
        <q-btn dense flat icon="crop_square" />
        <q-btn dense flat icon="close" />
      </q-bar>
    </q-header> -->

    <q-page-container>
      <keep-alive include="">
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  components: { },
  data () {
    return {
    }
  },
  methods: {
    linkTo (theRoute) {
      this.$router.push(theRoute)
    }
  }
}
</script>
