const cloneDeep = require('clone-deep');
const fs = require('fs')
const { remote, shell } = require('electron')
const { dialog } = remote

import { Loading } from 'quasar'

export function saveReplay(store, path){

  Loading.show({
    message: 'Saving data. Please wait...',
    delay: 0
  })

  dialog.showSaveDialog({
    title: 'Save replay file',
    properties: [
      'showOverwriteConfirmation'
    ],
    defaultPath: 'replay01.wwf',
    filters: [
      {name: 'WinwardFuel Files', extensions: ['wwf']}
    ]
  })
  .then(obj => {
    if(!obj.canceled){
      let state = cloneDeep(store.state);
      delete state.app;
      let stateJson = JSON.stringify(state);
      fs.writeFileSync(obj.filePath, stateJson);
      console.log(`Saved replay file - ${obj.filePath}`);
    }

    Loading.hide();
  })
}

export function openReplay(store, app){

  Loading.show({
    message: 'Loading data. Please wait...',
    delay: 0
  })


  let paths = dialog.showOpenDialog({
    title: 'Open replay file',
    properties: ['openFile'],
    filters: [
      {name: 'WinwardFuel Files', extensions: ['wwf']}
    ]
  }).then(obj => {

    if(!obj.canceled){
      let data = fs.readFileSync(obj.filePaths[0]);
      let dataStr = data.toString();
      let state = JSON.parse(dataStr);

      store.dispatch('app/setUpdating', false)
      store.dispatch('app/setActiveCar', state.cars[0].number)
      store.dispatch('cars/resetState', state.cars);
      store.dispatch('race/resetState', state.race);
      store.dispatch('settings/setSettings', state.settings);

      console.log('loaded state ' + obj.filePaths[0])
    }

    Loading.hide();
  })





}
