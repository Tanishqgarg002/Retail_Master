/* eslint-disable prettier/prettier */
import { app } from 'electron'
import sqlite from 'sqlite3'
import path from 'path'

let db
function isDBopen() {
    console.log('call here 1')
     return new Promise((res)=> {
      console.log('call here 2')
      db.exec('select 1', (err) => {
        if (err) {
          console.log(`printing error during testing, ${err.message}`)
          res(false)
        } else {
          console.log('call here 3')
          res(true)
        }
      })
    })
    .catch(()=>{
      return false
    })
  }

function CheckData(data){
    console.log('tracking here 1')
    const dbPath = path.join(app.getPath('userData'), 'mydatabase.db')

  return new Promise((resolvee, rejectt) => {
    db = new sqlite.Database("E:/projsept/databases/userssales.db", async (err) => {
      if (err) {
        rejectt(err)
      } else {
        try{

          console.log('tracking here 2')
          let sql
        let values
        if(data.type==='checkreceiptcounter'){
            sql='select exists (select 1 from receipt where receipt_id=?)'
            values=[data.value]
        }
        console.log('tracking here 3 ', sql)
        db.get(sql,values, (err,row) => {
          if (err) {
            rejectt(err)
          } else {
            if(row===1){
                resolvee(true)
            }
            else{
                resolvee(false)
            }
          }
        })
      }
      catch(err){
        rejectt(err)
      }
      }
    })
  })
  .finally(async() => {
    const returnedvalue = await isDBopen()
    console.log('returnedvalue', returnedvalue)
    if (returnedvalue === true) {
      db.close((err) => {
        if (err) {
          console.error(`printing error of here: ${err.message}`)
          // throw err
        } else {
          
          console.log('printing this also: Database connection closed')
        }
      })
    } else {
      console.log('db not opened')
    }
  })
}

export default CheckData