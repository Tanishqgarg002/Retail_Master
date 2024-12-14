/* eslint-disable prettier/prettier */
import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import path, { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import login from './Login'
import getdata from './GetData'
import editinfo from './EditInfo'
import CheckData from './CheckData'
import sqlite3 from 'sqlite3'
import fs from 'fs'

let mainWindow
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    minHeight: 800,
    minWidth: 1400,
    show: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      height: 36
    },
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}
const dbPath = path.join(app.getPath('userData'), 'mydatabase.db')

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Check if the database file exists
//   if (!fs.existsSync(dbPath)) {
//     // Create the database file with initial data
//     const db = new sqlite3.Database(dbPath, async (err) => {
//       if (err) {
//         console.error(err.message)
//       } else {
//         console.log('Database created and initialized.')
//         return await new Promise( (res, rej) => {

//             db.run(
//               `CREATE TABLE logininfo (
//                 id       INTEGER PRIMARY KEY AUTOINCREMENT,
//                 username TEXT    UNIQUE
//                 NOT NULL,
//                 password TEXT    NOT NULL
//                 )
//                 `,
//                 (err) => {
//               if (err) {
//                 console.error(err.message)
//                 rej()
//               } else {
//                 console.log('logininfo Table created successfully.')
//                 res(1)
//               }
//             }
//           )
        
//       })
        
//           .then((data) => {
//             db.run(
//               'insert into logininfo(id,username,password) values (?,?,?)',
//               [
//                 1,
//                 '$2a$12$JmqGbkXWjuXw6Ue9JXkd8eWH5foKf6V9.zpocgtRJ36uI5cRC/kfy',
//                 '$2a$12$hTYb7bWBDhUoq99I3qei1ujzUP70A80/exZHE1N3CTvD1yaWiC/q6'
//               ],
//               (err) => {
//                 if (err) {
//                   console.error(err.message)
//                   throw err
//                 } else {
//                   console.log('logindata inserted successfully')
//                   return data
//                 }
//               }
//             )
//           })
//           .then((data) => {
//             db.run(
//               `CREATE TABLE custaccn (
//     custid     INTEGER PRIMARY KEY ON CONFLICT ABORT AUTOINCREMENT
//                        UNIQUE ON CONFLICT ABORT
//                        NOT NULL ON CONFLICT ABORT,
//     clientname TEXT    NOT NULL ON CONFLICT ABORT,
//     gstin      TEXT    NOT NULL ON CONFLICT ABORT
//                        CHECK (length(gstin) = 15) 
//                        UNIQUE ON CONFLICT ABORT,
//     address    TEXT,
//     mobileno   TEXT    NOT NULL ON CONFLICT ABORT
//                        CHECK (length(mobileno) = 10),
//     state      TEXT    NOT NULL ON CONFLICT ABORT,
//     emailid    TEXT,
//     clienttype TEXT,
//     notes      TEXT
// )
// `,
//               (err) => {
//                 if (err) {
//                   console.error(err.message)
//                   throw err
//                 } else {
//                   console.log('custaccn Table created successfully.')
//                   return data
//                 }
//               }
//             )
//           })
          
//           .then((data) => {
//             db.run(
//   `CREATE TABLE held_receipt (
//     receipt_id           TEXT,
//     receipt_status       TEXT    NOT NULL ON CONFLICT ABORT,
//     receipt_type         TEXT    NOT NULL ON CONFLICT ABORT,
//     createdtime          TEXT    NOT NULL ON CONFLICT ABORT,
//     createddate          TEXT    NOT NULL ON CONFLICT ABORT,
//     items                TEXT    NOT NULL ON CONFLICT ABORT,
//     comments             TEXT,
//     custid               INTEGER REFERENCES custaccn (custid) 
//                                  NOT NULL ON CONFLICT ABORT,
//     shipping_addr        TEXT,
//     shipping_client_name TEXT,
//     shipping_vehicle_no  TEXT,
//     id                   INTEGER PRIMARY KEY AUTOINCREMENT
// )

// `,
//               (err) => {
//                 if (err) {
//                   console.error(err.message)
//                   throw err
//                 } else {
//                   console.log('held_receipt Table created successfully.')
//                   return data
//                 }
//               }
//             )
//           })
//           .then((data) => {
//             db.run(
//               `CREATE TABLE product (
//     id           INTEGER PRIMARY KEY ON CONFLICT ABORT AUTOINCREMENT
//                          UNIQUE ON CONFLICT ABORT
//                          NOT NULL ON CONFLICT ABORT,
//     product_name TEXT    NOT NULL
//                          UNIQUE ON CONFLICT ABORT,
//     product_code TEXT    UNIQUE
//                          NOT NULL ON CONFLICT ABORT,
//     gst          REAL    NOT NULL ON CONFLICT ABORT,
//     unit         TEXT    NOT NULL ON CONFLICT ABORT,
//     mrp          REAL    NOT NULL ON CONFLICT ABORT,
//     quantity     REAL    NOT NULL ON CONFLICT ABORT
// );

// `,
//               (err) => {
//                 if (err) {
//                   console.error(err.message)
//                   throw err
//                 } else {
//                   console.log('Product Table created successfully.')
//                   return data
//                 }
//               }
//             )
//           })
//           .then((data) => {
//             db.run(
//               `CREATE TABLE receipt (
//     receipt_id           TEXT    PRIMARY KEY ON CONFLICT ABORT
//                                  UNIQUE ON CONFLICT ABORT
//                                  NOT NULL ON CONFLICT ABORT,
//     createddate          TEXT    NOT NULL ON CONFLICT ABORT,
//     createdtime          TEXT    NOT NULL ON CONFLICT ABORT,
//     lastupdateddate      TEXT    NOT NULL ON CONFLICT ABORT,
//     lastupdatedtime      TEXT    NOT NULL ON CONFLICT ABORT,
//     mrp_total            REAL    NOT NULL ON CONFLICT ABORT,
//     receipt_status       TEXT    NOT NULL ON CONFLICT ABORT,
//     receipt_type         TEXT    NOT NULL ON CONFLICT ABORT,
//     total_items          INTEGER NOT NULL ON CONFLICT ABORT,
//     total_amount         REAL    NOT NULL ON CONFLICT ABORT,
//     store_id             TEXT,
//     tax_amount           REAL    NOT NULL ON CONFLICT ABORT,
//     notes                TEXT,
//     custid               INTEGER REFERENCES custaccn (custid) 
//                                  NOT NULL ON CONFLICT ABORT,
//     shipping_addr        TEXT,
//     shipping_client_name TEXT,
//     shipping_vehicle_no  TEXT,
//     productnames         TEXT    NOT NULL ON CONFLICT ABORT
// )
// `,
//               (err) => {
//                 if (err) {
//                   console.error(err.message)
//                   throw err
//                 } else {
//                   console.log('Receipt Table created successfully.')
//                   return data
//                 }
//               }
//             )
//           })
//           .then((data) => {
//             db.run(
//               `CREATE TABLE receipt_counter (
//     count TEXT PRIMARY KEY
//              UNIQUE
//              NOT NULL
// )
// `,
//               (err) => {
//                 if (err) {
//                   console.error(err.message)
//                   throw err
//                 } else {
//                   console.log('receipt_counter Table created successfully.')
//                   db.run('insert into receipt_counter (count) values (?)', ['2020400'], (err) => {
//                     if (err) {
//                       console.error(err.message)
//                       throw err
//                     } else {
//                       console.log('receipt_counter data inserted successfully.')
//                       return data
//                     }
//                   })
//                   return data
//                 }
//               }
//             )
//           })
          
//           .then((data) => {
//             db.run(
//               `CREATE TABLE receipt_items (
//     id            INTEGER PRIMARY KEY ON CONFLICT ABORT AUTOINCREMENT
//                           UNIQUE ON CONFLICT ABORT
//                           NOT NULL ON CONFLICT ABORT,
//     selling_price REAL    NOT NULL ON CONFLICT ABORT,
//     quantity      REAL    NOT NULL ON CONFLICT ABORT,
//     receipt_id    TEXT    REFERENCES receipt (receipt_id) 
//                           NOT NULL ON CONFLICT ABORT,
//     inventory_id  INTEGER REFERENCES product (id) 
//                           NOT NULL ON CONFLICT ABORT,
//     mrp           REAL    NOT NULL,
//     product_name  TEXT    NOT NULL ON CONFLICT ABORT,
//     product_code  TEXT    NOT NULL ON CONFLICT ABORT,
//     unit          TEXT    NOT NULL ON CONFLICT ABORT,
//     gst           REAL    NOT NULL ON CONFLICT ABORT
// )
// `,
//               (err) => {
//                 if (err) {
//                   console.error(err.message)
//                   throw err
//                 } else {
//                   console.log('Receipt_items Table created successfully.')
//                   return data
//                 }
//               }
//             )
//           })
//           .then((data) => {
//             db.run(
//               `CREATE TABLE firminfo (
//     id        INTEGER PRIMARY KEY AUTOINCREMENT,
//     name      TEXT    NOT NULL,
//     addr      TEXT    NOT NULL,
//     state     TEXT    NOT NULL,
//     gstin     TEXT    NOT NULL,
//     email     TEXT    NOT NULL,
//     phoneno   TEXT    NOT NULL,
//     bankname  TEXT    NOT NULL,
//     branch    TEXT    NOT NULL,
//     bankaccno TEXT    NOT NULL,
//     ifsccode  TEXT    NOT NULL,
//     statecode INTEGER NOT NULL ON CONFLICT ABORT
// )
// `,
//               (err) => {
//                 if (err) {
//                   console.error(err.message)
//                   throw err
//                 } else {
//                   console.log('firminfo Table created successfully.')
//                   db.run(
//                     'insert into firminfo (id,name,addr,state,gstin,email,phoneno,bankname,branch,bankaccno,ifsccode,statecode) values (?,?,?,?,?,?,?,?,?,?,?,?)',
//                     [
//                       1,
//                       'S.K. Enterprises',
//                       'Sadar Bazar, Sirsa Sadar Bazar, Sirsa Sadar Bazar, Sirsa Sadar Bazar, Sirsa Sadar Bazar, Sirsa',
//                       'haryana',
//                       '06AAAP81KJL81ZE',
//                       'tanishqgarg06@gmail.com',
//                       '9896100789',
//                       'HDFC',
//                       'Sirsa, Haryana',
//                       '025486507',
//                       'HDFC000008545',
//                       6
//                     ],
//                     (err) => {
//                       if (err) {
//                         console.error(err.message)
//                         throw err
//                       } else {
//                         console.log('firmdata inserted successfully.')
//                         return data
//                       }
//                     }
//                   )
//                   return(data)
//                 }
//               }
//             )
//           })
          
         
        
        
//         .catch((err)=>{
//           dialog.showMessageBox(mainWindow, {
//             message: `Error while initializing dbs): , ${err.message}`,
//             buttons: []
//           })
//         })
//       }
//     })
//   }

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  // ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('test', (_, data) => {
  console.log(data)
})

ipcMain.handle('request-data', async (_, data) => {
  console.log('printing data here: ', data)
  try {
    const dataa = await getdata(data)
    return { status: true, data: dataa }
  } catch (error) {
    dialog.showMessageBox(mainWindow, {
      message: `Error in GetData.js (${data}): , ${error.message}`,
      buttons: []
    })
    return { status: false, error: error }
  }
})

ipcMain.handle('editinfo', async (_, data) => {
  try {
    console.log('reporting fine here problem here')
    const result = await editinfo(data)
    console.log('reporting fine here problem here2')
    console.log(`printing result of ${data.type}: ${result}`)
    return { status: true }
  } catch (err) {
    dialog.showMessageBox(mainWindow, {
      message: `Error in EditInfo.js (${data}): , ${err.message}`,
      buttons: []
    })
    return { status: false, error: err }
  }
})

ipcMain.on('test', (_, data) => {
  console.log(data)
})

ipcMain.handle('check-data', async (_, data) => {
  try {
    const result = await CheckData(data)
    return result
  } catch (error) {
    dialog.showMessageBox(mainWindow, {
      message: `Error in CheckData.js (${data}): , ${error.message}`,
      buttons: []
    })
    return null
  }
})

ipcMain.handle('login', async (_, data) => {
  console.log(data)
  try {
    const result = await login(data)
    console.log('in login handle, result: ', result)

    if (result) {
      // show dialog to tell about login success
      dialog.showMessageBox(mainWindow, {
        message: 'login successful',
        buttons: []
      })
      // localStorage.setItem('loggedin',true)
      return true
    } else {
      dialog.showMessageBox(mainWindow, {
        message: `login Unsuccessful`,
        buttons: []
      })
      // localStorage.setItem('loggedin',false)
      return false
    }
  } catch (err) {
    dialog.showMessageBox(mainWindow, {
      message: `login Unsuccessful, ${err.message}`,
      buttons: []
    })
    // localStorage.setItem('loggedin',false)
    return false
  }
})

ipcMain.on('exitapp', async () => {
  console.log('here___---1')
  const res = await dialog.showMessageBox(mainWindow, {
    type: 'question',
    buttons: ['Yes', 'No'],
    title: 'Confirm Exit',
    message: 'Are you sure you want to quit?'
  })

  console.log(JSON.stringify(res))
  if (res.response === 0) {
    console.log('here quiting app_____')
    app.quit()
  } else {
    console.log('or here in wrong side_----------------')
  }
})
