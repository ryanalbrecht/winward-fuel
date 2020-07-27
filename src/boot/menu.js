const { remote, shell } = require('electron')
const { Menu, dialog } = remote
const fs = require('fs');

import * as files from '../lib/files';


export default ( boot ) => {

  const isMac = process.platform === 'darwin'
  const menuTemplate = [

    // File
    {
      label: 'File',
      submenu: [
        isMac ? { role: 'close' } : { role: 'quit' },
        {
          label: 'Save',
          click: () => {
            files.saveReplay(boot.store)
          }
        },
        {
          label: 'Open',
          click: () => {
            files.openReplay(boot.store)
          }
        },

      ]
    },

    // Application
    {
      label: 'Application',
      submenu: [
        {
          label: 'Strategy',
          click: async () => {
            boot.router.push('/').catch( ()=>{} );
          }
        },
        {
          label: 'Settings',
          click: async () => {
            boot.router.push('/settings').catch( ()=>{} );
          }
        },

      ]
    },



    // Window
    {
      label: 'Window',
      submenu: [
        { role: 'togglefullscreen' },
        {
            label: 'Toggle Dev Tools',
            click: async () => { remote.getCurrentWindow().toggleDevTools()  }
        },
        { role: 'minimize' },
        { role: 'zoom' },
        ...(isMac ? [
          { type: 'separator' },
          { role: 'front' },
          { type: 'separator' },
          { role: 'window' }
        ] : [
          { role: 'close' }
        ])
      ]
    },

    // About
    {
      role: 'help',
      submenu: [
        {
          label: 'sorry there is no help yet...',
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);


}
