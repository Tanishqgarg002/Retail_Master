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

function editinfo(data){
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
        if(data.type==='editproductinfo'){
            sql='update product set product_name=?, product_code=?, gst=?,unit=?, mrp=?,quantity=? where id=?'
            values=[data.value.productname,data.value.productcode,data.value.gst,data.value.unit,data.value.mrp,data.value.quantity,data.value.id]
        }
        else if(data.type==='addproductinfo'){
          sql='insert into product (product_name,product_code,gst,unit,mrp,quantity) values (?,?,?,?,?,?)'
            values=[data.value.productname,data.value.productcode,data.value.gst,data.value.unit,data.value.mrp,data.value.quantity]
        }
        else if(data.type==='newcustaccn'){
          sql='insert into custaccn (clientname,gstin,address,mobileno,state,emailid,clienttype,notes) values (?,?,?,?,?,?,?,?)'
          values=[data.value.clientname,data.value.gstin,data.value.address,data.value.mobileno,data.value.state,data.value.emailid,data.value.clienttype,data.value.notes]
        }
        else if(data.type==='editcustaccn'){
          sql='update custaccn set clientname=?, gstin=?, address=?, mobileno=?, state=?, emailid=?, clienttype=?, notes=? where custid=?'
          values=[data.value.clientname,data.value.gstin,data.value.address,data.value.mobileno,data.value.state,data.value.emailid,data.value.clienttype,data.value.notes,data.value.id]
        }
        else if(data.type==='resetreceiptcounter'){
          sql='update receipt_counter set count=?'
          values=[data.value]
        }
        else if(data.type==='savereceipt'){
          sql='insert into receipt(receipt_id,createddate,createdtime,lastupdateddate,lastupdatedtime,mrp_total,receipt_status,receipt_type,total_items,total_amount,tax_amount,notes,custid,shipping_addr,shipping_client_name,shipping_vehicle_no,productnames) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
          values=[data.value.invoiceid,data.value.createddate,data.value.createdtime,data.value.lastupdateddate,data.value.lastupdatedtime,data.value.mrptotal,data.value.receiptstatus,data.value.receipttype,data.value.totalitems,data.value.grandTotal,data.value.taxamt,data.value.comments,data.value.custid,data.value.shipaddr,data.value.shipfname,data.value.shipvn,data.value.productnames]
          console.log(values)
        }
        else if(data.type==='savereceiptitems'){
          sql='insert into receipt_items(selling_price,quantity,receipt_id,inventory_id,mrp,product_name,product_code,unit,gst) values (?,?,?,?,?,?,?,?,?)',
          values=[data.value.row.price,data.value.row.quantity,data.value.rid,data.value.row.inv_id,data.value.row.mrp,data.value.row.product_name,data.value.row.product_code,data.value.row.unit,data.value.row.gst]
        }
        else if(data.type==='updatereceipt'){
          sql='update receipt set lastupdateddate=?,lastupdatedtime=?,mrp_total=?,receipt_type=?,total_items=?,total_amount=?,notes=?,tax_amount=?,custid=?,shipping_addr=?,shipping_client_name=?,shipping_vehicle_no=?,productnames=? where receipt_id=?'
          values=[data.value.lastupdateddate,data.value.lastupdatedtime,data.value.mrptotal,data.value.receipttype,data.value.totalitems,data.value.grandTotal,data.value.comments,data.value.taxamt,data.value.custid,data.value.shipaddr,data.value.shipfname,data.value.shipvn,data.value.productnames,data.value.receipt_id]
        }
        else if(data.type==='holdreceipt'){
          sql='insert into held_receipt (receipt_id,receipt_status,receipt_type,createdtime,createddate,items,comments,custid,shipping_addr,shipping_client_name,shipping_vehicle_no) values (?,?,?,?,?,?,?,?,?,?,?)'
          values=[data.value.receipt_id,data.value.receipt_status,data.value.receipt_type,data.value.createdtime,data.value.createddate,data.value.items,data.value.comments,data.value.custid,data.value.shipaddr,data.value.shipfname,data.value.shipvn]
        }
        else if(data.type==='deleteheldrow'){
          sql='delete from held_receipt where id=?'
          values=[data.value]
        }
        else if(data.type==='deletereceiptitems'){
          sql='delete from receipt_items where receipt_id=?'
          values=[data.value]
        }
        else if(data.type==='firminfo'){
          sql='update firminfo set name=?,addr=?,state=?,gstin=?,email=?,phoneno=?,bankname=?,branch=?,bankaccno=?,ifsccode=?,statecode=?'
          values=[data.value.firmname,data.value.firmaddr,data.value.firmstate.slice(3).toLowerCase(),data.value.firmgst,data.value.firmemail,data.value.firmmobile,data.value.firmbankn,data.value.firmbankbr,data.value.firmbankacc,data.value.firmbankifsc,data.value.firmstate.substring(0,2)]
        }
        else if(data.type==='deletereceipt'){
          sql='delete from receipt where receipt_id=?'
          values=[data.value]
        }
        console.log('tracking here 3 ', sql)
        db.run(sql,values, (err) => {
          if (err) {
            rejectt(err)
          } else {
            resolvee(true)
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

export default editinfo