const { remote, shell } = require('electron')
const { Menu } = remote
const fs = require('fs');


export default ( boot ) => {

  const isMac = process.platform === 'darwin'
  const menuTemplate = [

    // File
    {
      label: 'File',
      submenu: [
        isMac ? { role: 'close' } : { role: 'quit' }
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
          label: 'lol, sorry there is no help',
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);


}
