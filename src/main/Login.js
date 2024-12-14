/* eslint-disable prettier/prettier */
import sqlite3 from 'sqlite3'
import bcrypt from 'bcrypt'
import { app } from 'electron'
import path from 'path'



function isDBopen(db) {
  try {
    db.exec('select 1', (err) => {
      if (err) {
        return false
      } else {
        return true
      }
    })
  } catch (err) {
    return false
  }
}

const login = (body) => {
  let db
  return new Promise((resolve, reject) => {
    const usern = body.newu
    const pass = body.newp
    const dbPath = path.join(app.getPath('userData'), 'mydatabase.db')
    console.log('printing dbpath: ',dbPath)
    db = new sqlite3.Database("E:/projsept/databases/userssales.db", (err) => {
      if (err) {
        reject(err)
      } else {
          db.get('select * from logininfo', (err, user) => {
            if (err) {
              reject(err)
            } else if (!user) {              
              throw new Error("no username password is stored in table logininfo")
            } else {
              
              if (
                bcrypt.compareSync(usern, user.username) &&
                bcrypt.compareSync(pass, user.password)
              ) {
                // const payload = {
                //   isloggedin: true,
                //   username: user.username
                // }
                // console.log(payload, secretkey)
                // const token = jwt.sign(payload, secretkey, { expiresIn: '12h' })
                // console.log(token)

                // setting "authtoken" the value of JWT received from backend, its payload contains : bool isLoggedIn, String Username;
                // state.securestore.set('authtoken', token)
                // console.log(state.securestore.has('authtoken'))
                
                // console.log(state.securestore.get('authtoken'))

                // console.log(state.securestore.has('authtoken'))

                // setting LoggedIn state of main process that will be used to attend message of 'get-login-status' from renderer
                // state.loggedIn = true
                resolve(true)
                
              } else {

                throw new Error("Wrong username or password")
              }
            }
          })
      }
    })
  })
    .finally(() => {
      if (isDBopen(db)) {
        db.close((err) => {
          if (err) {
            console.error(err.message)
            throw err
          } else {
            console.log('Database connection closed')
          }
        })
      }
      else{
        console.log("db not opened")
      }
    })
}

export default login
