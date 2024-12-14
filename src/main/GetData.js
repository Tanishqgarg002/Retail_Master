/* eslint-disable prettier/prettier */
import { app } from 'electron'
import sqlite from 'sqlite3'
import path from 'path'

let db
function isDBopen() {
  console.log('call here 1')
  return new Promise((res) => {
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
  }).catch(() => {
    return false
  })
}

function getdata(data) {
  console.log('tracking here 1')
  const dbPath = path.join(app.getPath('userData'), 'mydatabase.db')

  return new Promise((resolvee, rejectt) => {
    db = new sqlite.Database("E:/projsept/databases/userssales.db", async (err) => {
      if (err) {
        rejectt(err)
      } else {
        console.log('tracking here 2')
        let sql
        if (data.type === 'custdata') {
          sql = 'select * from custaccn'
        } else if (data.type === 'receiptitems') {
          sql = 'select article_name from shoe'
        } else if (data.type === 'receiptdata') {
          sql = 'select receipt.receipt_id,receipt.createddate,receipt.createdtime,receipt.receipt_status,receipt.receipt_type,receipt.total_items,receipt.total_amount,custaccn.clientname,receipt.tax_amount,receipt.productnames,custaccn.gstin,custaccn.address,custaccn.custid,custaccn.state,receipt.notes,receipt.shipping_vehicle_no,receipt.shipping_client_name,receipt.shipping_addr from receipt left join custaccn on receipt.custid=custaccn.custid'
       } else if (data.type === 'receiptcounter') {
          sql = 'select count from receipt_counter limit 1'
        } else if (data.type === 'productdata') {
          sql = 'select * from product'
        } else if (data.type === 'searchproductname') {
          sql = `select * from product where product_name="${data.value}"`
        } else if (data.type === 'clientdata') {
          sql = 'select * from custaccn'
        } else if (data.type === 'searchgstin') {
          sql = `select * from custaccn where gstin="${data.value}"`
        }
        else if(data.type==='helddata'){
          sql='select held_receipt.id,held_receipt.createddate,held_receipt.receipt_status,held_receipt.receipt_type,custaccn.state,custaccn.clientname,custaccn.gstin,custaccn.address,held_receipt.shipping_client_name,held_receipt.shipping_addr,held_receipt.shipping_vehicle_no,custaccn.custid,held_receipt.items,held_receipt.comments from held_receipt left join custaccn on held_receipt.custid=custaccn.custid'
        }
        else if(data.type==='receiptdataforupdate'){
          sql=`select receipt_items.selling_price,receipt_items.quantity,receipt_items.inventory_id,receipt_items.product_name,receipt_items.mrp,receipt_items.product_code,receipt_items.gst,receipt_items.unit from receipt_items where receipt_items.receipt_id='${data.value}'`
        }
        else if(data.type==='firmdata'){
          sql='select * from firminfo limit 1'
        }
        else if(data.type==='receiptitemspurchasedata'){
          sql=`select receipt.createddate,receipt.createdtime,receipt_items.receipt_id,receipt_items.quantity,receipt_items.selling_price,custaccn.clientname from receipt_items left join receipt on receipt.receipt_id=receipt_items.receipt_id left join custaccn on receipt.custid=custaccn.custid where receipt_items.inventory_id='${data.value}'`
        }
        

        if (data.type === 'searchproductmrpinv') {
          new Promise((res, rej) => {
            db.all(
              `select * from inventory left join product on product.id=inventory.product_id where product.product_name="${data.value.prodname}" and inventory.mrp="${data.value.mrp}"`,
              (err, rows) => {
                if (err) {
                  rejectt(err)
                } else {
                  if (rows.length) {
                    resolvee({ exist: true, data: rows })
                  } else {
                    res()
                  }
                }
              }
            )
          })
            .then(() => {
              db.all(
                `select * from product where product_name="${data.value.prodname}"`,
                (err, rows) => {
                  if (err) {
                    rejectt(err)
                  } else {
                    resolvee({ exist: false, data: rows })
                  }
                }
              )
            })
            .catch((err) => {
              rejectt(err)
            })
        } else {
          console.log('tracking here 3 ', sql)
          db.all(sql, (err, rows) => {
            if (err) {
              rejectt(err)
            } else {
              resolvee(rows)
            }
          })
        }
      }
    })
  }).finally(async () => {
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

export default getdata
