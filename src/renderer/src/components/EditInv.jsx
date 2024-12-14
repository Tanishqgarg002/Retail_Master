/* eslint-disable prettier/prettier */
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

function convertNumericKeysToString(data) {
  if (typeof data === 'object') {
    if (Array.isArray(data)) {
      return data.map(convertNumericKeysToString)
    } else {
      return Object.fromEntries(
        Object.entries(data).map(([key, value]) => [String(key), convertNumericKeysToString(value)])
      )
    }
  } else if (typeof data === 'number') {
    return data.toString()
  } else {
    return data
  }
}

function EditInv() {
  const [searchprodname, setprodname] = useState('')
  const [showNotfound, setnf] = useState(false)
  const [showFound, setf] = useState(false)
  const [savetype, setsavetype] = useState('save')
  const { state } = useLocation()
  const [optype, setoptype] = useState('add')
  const prodnameref = useRef(null)
  const searchinputref = useRef(null)
  const [formdata, setformdata] = useState({
    productname: '',
    productcode: '',
    gst: '',
    unit: '',
    id: '',
    quantity: '',
    mrp: ''
  })

  useEffect(() => {
    if (state.from === 'viewprod') {
      setsavetype('update')
      setoptype('edit')
      const item = state.data

      window.electron.ipcRenderer.send('test', `from EditInv.jsx ${JSON.stringify(item)}`)
      window.electron.ipcRenderer.send('test', `from EditInv.jsx ${typeof item}`)

      setformdata({
        // ...formdata,
        productname: item.product_name,
        productcode: item.product_code,
        gst: item.gst,
        unit: item.unit,
        quantity: item.quantity,
        mrp: item.mrp,
        id: item.id
      })
      prodnameref.current.focus()
    } else if (state.from === 'normalroute') {
      setprodname('')
      // setsearchmrp('')
      setnf(false)
      setf(false)
      setsavetype('save')
      setformdata({
        ...formdata,
        productname: '',
        productcode: '',
        gst: '',
        unit: '',
        id: '',
        quantity: '',
        mrp: ''
      })
    }
    window.electron.ipcRenderer.send('test', `from EditInv.jsx ${JSON.stringify(formdata)}`)
  }, [])
  useEffect(() => {
    if (optype === 'edit' && state.from==='normalroute') {
      searchinputref.current.focus()
    }
  }, [optype])

  const productinfohandler = async (event, operation) => {
    event.preventDefault()
    try {
      const formdatacopy = formdata
      window.electron.ipcRenderer.send(
        'test',
        `printing formdata: ${JSON.stringify(formdata)}, printing formdatacopy: ${JSON.stringify(formdatacopy)}`
      )
      const v1 = formdatacopy.productname
      const value1 = v1.trim().toLowerCase()
      formdatacopy.productname = value1
      const v2 = formdatacopy.productcode
      const value2 = v2.trim().toLowerCase()
      formdatacopy.productcode = value2
      const v3 = formdatacopy.unit
      const value3 = v3.trim().toLowerCase()
      formdatacopy.unit = value3

      window.electron.ipcRenderer.send(
        'test',
        `printing formdatacopy: ${JSON.stringify(formdatacopy)}`
      )

      setformdata({
        ...formdata,
        productname: '',
        productcode: '',
        gst: '',
        unit: '',
        id: '',
        quantity: '',
        mrp: ''
      })
      window.electron.ipcRenderer.send('test', `printing formdata: ${JSON.stringify(formdata)}`)
      if (optype === 'add') {
        const result = await window.electron.ipcRenderer.invoke('editinfo', {
          type: 'addproductinfo',
          value: formdatacopy
        })
      } else if (optype === 'edit') {
        if (operation === 'update') {
          const result = await window.electron.ipcRenderer.invoke('editinfo', {
            type: 'editproductinfo',
            value: formdatacopy
          })
          //implement notifying user about success
        } else if (operation === 'save') {
          const result = await window.electron.ipcRenderer.invoke('editinfo', {
            type: 'addproductinfo',
            value: formdatacopy
          })
        }
      }
    } catch (err) {
      window.electron.ipcRenderer.send('test', `Error occured in EditInv.jsx,${err}`)
    }
  }

  const abc = async (e) => {
    e.preventDefault()
    try {
      // setformdata({
      //   ...formdata,
      //   productname: '',
      //   productcode: '',
      //   gst: '',
      //   unit: '',
      //   id: '',
      //   quantity: '',
      //   mrp: ''
      // })
      window.electron.ipcRenderer.send('test', `here ${JSON.stringify(formdata)}`)
      let fetched
      // if (optype === 'edit') {
      //   fetched = await window.electron.ipcRenderer.invoke('request-data', {
      //     type: 'searchproductmrpinv',
      //     value: { prodname: searchprodname, mrp: searchmrp }
      //   })
      // } else if (optype === 'add') {
      fetched = await window.electron.ipcRenderer.invoke('request-data', {
        type: 'searchproductname',
        value: searchprodname
      })
      // }
      window.electron.ipcRenderer.send(
        'test',
        `Successfully searched product_name, ${JSON.stringify(fetched)}} `
      )
      if (!fetched.status) {
        throw fetched.error
      }
      // if (optype === 'add') {
      //   const item = convertNumericKeysToString(fetched[0])
      //   window.electron.ipcRenderer.send(
      //     'test',
      //     `Successfully searched product_name, ${JSON.stringify(item)},${JSON.stringify(item.gst)} `
      //   )
      //   setformdata({
      //     ...formdata,
      //     productname: item.product_name,
      //     productcode: item.product_code,
      //     gst: item.gst,
      //     unit: item.unit,
      //     id: item.id,
      //     mrp: '',
      //     quantity: ''
      //   })
      //   mrpref.current.focus()

      // setprodname('')
      // } else if (optype === 'edit') {
      if (!fetched.data.length) {
        setnf(true)
        setf(false)
        setsavetype('save')

        // const item = convertNumericKeysToString(fetched.data[0])
        // window.electron.ipcRenderer.send(
        //   'test',
        //   `Successfully searched product_name, ${JSON.stringify(item)},${JSON.stringify(item.gst)} `
        // )
        setformdata({
          ...formdata,
          productname: searchprodname
          //   productcode: item.product_code,
          //   gst: item.gst,
          //   unit: item.unit,
          //   id: item.id,
          //   mrp: item.mrp,
          //   quantity: item.quantity
        })
        prodnameref.current.focus()
        // mrpref.current.focus()
        setTimeout(() => {
          setnf(false)
        }, 5000)
      } else {
        setnf(false)
        setf(true)
        setsavetype('update')
        setTimeout(() => {
          setf(false)
        }, 5000)
        const item = convertNumericKeysToString(fetched.data[0])
        window.electron.ipcRenderer.send(
          'test',
          `Successfully searched mobile no.,${fetched.data.length} `
        )
        // const item=JSON.stringify(item1)
        window.electron.ipcRenderer.send('test', `from EditInv.jsx ${JSON.stringify(item)}`)
        window.electron.ipcRenderer.send('test', `from EditInv.jsx ${typeof item}`)

        setformdata({
          ...formdata,
          productname: item.product_name,
          productcode: item.product_code,
          gst: item.gst,
          unit: item.unit,
          quantity: item.quantity,
          mrp: item.mrp,
          id: item.id
        })
        // mrpref.current.focus()
        setTimeout(() => {
          setf(false)
        }, 5000)
      }
      // setprodname('')
      // setsearchmrp('')
      // }
    } catch (error) {
      window.electron.ipcRenderer.send('test', `Error15 occured in EditInv.jsx,${error}`)
    }
  }

  return (
    <div className="border-box w-3/4 h-auto mx-auto bg-cyan-100 my-6 p-3 rounded-xl shadow-2xl">
      <div className="flex">
        <div>
          <div>
            <input
              checked={optype === 'add'}
              id="addradio"
              defaultChecked
              type="radio"
              name="optype"
              value="add"
              onChange={() => setoptype('add')}
            />
            <label htmlFor="addradio">Add Product</label>
          </div>
          <div>
            <input
              checked={optype === 'edit'}
              id="editradio"
              type="radio"
              name="optype"
              value="edit"
              onChange={() => {
                setoptype('edit')
                setTimeout(() => {
                  searchinputref.current.focus()
                }, 70)
              }}
            />
            <label htmlFor="editradio">Edit Product</label>
          </div>
        </div>
        <h1 className="text-3xl font-medium underline m-2 p-3">{optype} Product</h1>
        {
          optype === 'edit' && (
            <div className="flex items-start">
              <form
                onSubmit={(e) => {
                  // setformdata({
                  //   productname: '',
                  //   productcode: '',
                  //   gst: '',
                  //   unit: '',
                  //   id: '',
                  //   quantity: '',
                  //   mrp: ''
                  // })
                  abc(e)
                }}
              >
                <div className="flex flex-col">
                  <input
                    className="p-1 m-1"
                    type="text"
                    value={searchprodname}
                    onChange={(e) => setprodname(e.target.value)}
                    ref={searchinputref}
                    placeholder="Type Product"
                    required
                  />
                  {/* <input
                  className="p-1 m-1"
                  type="text"
                  value={searchmrp}
                  onChange={(e) => setsearchmrp(e.target.value)}
                  placeholder="Type Mrp"
                  required
                /> */}
                  {showNotfound && <div>No Record found</div>}
                  {showFound && <div>Record found</div>}
                </div>
                <button type="submit" className="bg-cyan-800 text-white p-1 rounded ">
                  Seach
                </button>
              </form>
            </div>
          )
          // : (
          //   <div className="flex items-start">
          //     <form onSubmit={(e) => {
          //       // setformdata({
          //       //   productname: '',
          //       //   productcode: '',
          //       //   gst: '',
          //       //   unit: '',
          //       //   id: '',
          //       //   quantity: '',
          //       //   mrp: ''
          //       // })
          //       abc(e)}}>
          //       <div className="flex flex-col">
          //         <input
          //           className="p-1 m-1"
          //           type="text"
          //           value={searchprodname}
          //           onChange={(e) => setprodname(e.target.value)}
          //           ref={searchinputref}
          //           placeholder="Type Product"
          //           required
          //         />

          //         {showNotfound && <div>No Record found</div>}
          //         {showFound && <div>Record found</div>}
          //       </div>
          //       <button type="submit" className="bg-red-100 p-1 rounded border-4">
          //         Seach
          //       </button>
          //     </form>
          //   </div>
          // )
        }
      </div>
      <form onSubmit={(e) => productinfohandler(e, savetype)} className="grid grid-cols-4 gap-6">
        <div className="flex flex-col">
          <label htmlFor="productname" className="m-2 p-2 text-lg">
            Product Name
          </label>
          <input
            ref={prodnameref}
            id="productname"
            type="text"
            className="w-3/4 m-2 p-2 my-1 border-2 border-cyan-500 rounded-xl"
            autoComplete="true"
            required
            maxLength={50}
            value={formdata.productname}
            onChange={(e) => {
              window.electron.ipcRenderer.send('test', `${e.target.value}`)
              setformdata({ ...formdata, productname: e.target.value })
            }}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="productcode" className="m-2 p-2 text-lg">
            Product Code
          </label>
          <input
            id="productcode"
            type="text"
            className="w-3/4 m-2 p-2 my-1 border-2 border-cyan-500 rounded-xl"
            autoComplete="true"
            maxLength={50}
            value={formdata.productcode}
            onChange={(e) => setformdata({ ...formdata, productcode: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="gst" className="m-2 p-2 text-lg">
            GST (%)
          </label>
          <input
            id="gst"
            type="text"
            className="w-3/4 m-2 p-2 my-1 border-2 border-cyan-500 rounded-xl"
            required
            maxLength={2}
            minLength={1}
            value={formdata.gst}
            onChange={(e) => setformdata({ ...formdata, gst: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="unit" className="m-2 p-2 text-lg">
            Unit Name
          </label>
          <input
            id="unit"
            type="text"
            className="w-3/4 m-2 p-2 my-1 border-2 border-cyan-500 rounded-xl"
            required
            value={formdata.unit}
            onChange={(e) => setformdata({ ...formdata, unit: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="mrp" className="m-2 p-2 text-lg">
            MRP (₹)
          </label>
          <input
            id="mrp"
            type="text"
            className="w-3/4 m-2 p-2 my-1 border-2 border-cyan-500 rounded-xl"
            required
            // ref={mrpref}
            value={formdata.mrp}
            onChange={(e) => setformdata({ ...formdata, mrp: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="quantity" className="m-2 p-2 text-lg">
            quantity
          </label>
          <input
            id="quantity"
            type="text"
            className="w-3/4 m-2 p-2 my-1 border-2 border-cyan-500 rounded-xl"
            required
            value={formdata.quantity}
            onChange={(e) => setformdata({ ...formdata, quantity: e.target.value })}
          />
        </div>

        {/* {savebtn && ( */}
        <button
          type="submit"
          className="w-1/2 mx-auto col-span-1 m-2 p-2 rounded-xl text-cyan-500 bg-white focus:bg-cyan-500  hover:bg-cyan-500 focus:text-white hover:text-white border-2 border-cyan-500 focus:border-white hover:border-white"
        >
          {savetype.charAt(0).toUpperCase() + savetype.slice(1)}
        </button>
        {/* )} */}
        {/* {updatebtn && (
          <button
            onClick={(e) => productinfohandler(e, 'update')}
            className="w-1/2 mx-auto col-span-1 m-2 p-2 rounded-xl text-blue-500 bg-white focus:bg-blue-500  hover:bg-blue-500 focus:text-white hover:text-white border-2 border-blue-500 focus:border-white hover:border-white"
          >
            Update
          </button>
        )} */}
      </form>
    </div>
  )
}

export default EditInv
