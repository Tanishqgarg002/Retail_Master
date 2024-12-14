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

function EditProduct() {
  const [searchprodname, setprodname] = useState('')
  const [showNotfound, setnf] = useState(false)
  const [showFound, setf] = useState(false)
  const [updatebtn, setupdatebtn] = useState(false)
  const [savebtn, setsavebtn] = useState(true)
  const productnameref = useRef(null)
  const searchinputref = useRef(null)
  const {state}=useLocation()

  const [refresh, setrefresh] = useState(false)

  useEffect(()=>{

      if(state.from==='viewprod'){

        setsavebtn(false)
        setupdatebtn(true)
        
        const item = state.data
        
        window.electron.ipcRenderer.send('test', `from EditProduct.jsx ${JSON.stringify(item)}`)
        window.electron.ipcRenderer.send('test', `from EditProduct.jsx ${typeof item}`)

        setformdata(
          {
            ...formdata,
            productname: item.product_name,
            productcode: item.product_code,
            gst: item.gst,
            unit: item.unit,
            id: item.id
          },
          () => {
            window.electron.ipcRenderer.send(
              'test',
              `from EditProduct.jsx ${JSON.stringify(formdata)}`
            )
          }
        )
      }
  },[])

  useEffect(() => {
    searchinputref.current.focus()
  }, [refresh])

  const [formdata, setformdata] = useState({
    productname: '',
    productcode: '',
    gst: '',
    unit: '',
    id: ''
  })

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
        unit: ''
      })
      window.electron.ipcRenderer.send('test', `printing formdata: ${JSON.stringify(formdata)}`)
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
    } catch (err) {
      window.electron.ipcRenderer.send('test', `Error occured in EditProduct.jsx,${err}`)
    }
  }

  const abc = async (e) => {
    e.preventDefault()
    try {
      const fetchedrow = await window.electron.ipcRenderer.invoke('request-data', {
        type: 'searchproductname',
        value: searchprodname
      })
      if(!fetchedrow.status){
        throw fetchedrow.error
      }
      if (fetchedrow.data.length === 0) {
        setnf(true)
        setf(false)
        setsavebtn(true)
        setupdatebtn(false)
        setformdata({
          ...formdata,
          productname: searchprodname
        })
        productnameref.current.focus()
        setTimeout(() => {
          setnf(false)
        }, 5000)
      } else {
        setnf(false)
        setf(true)
        setsavebtn(false)
        setupdatebtn(true)
        setTimeout(() => {
          setf(false)
        }, 5000)
        const item = convertNumericKeysToString(fetchedrow.data[0])
        // const item=fetchedrow
        window.electron.ipcRenderer.send(
          'test',
          `Successfully searched mobile no.,${fetchedrow.data.length} `
        )
        // const item=JSON.stringify(item1)
        window.electron.ipcRenderer.send('test', `from EditProduct.jsx ${JSON.stringify(item)}`)
        window.electron.ipcRenderer.send('test', `from EditProduct.jsx ${typeof item}`)

        setformdata(
          {
            ...formdata,
            productname: item.product_name,
            productcode: item.product_code,
            gst: item.gst,
            unit: item.unit,
            id: item.id
          },
          () => {
            window.electron.ipcRenderer.send(
              'test',
              `from EditProduct.jsx ${JSON.stringify(formdata)}`
            )
          }
        )
      }
      setprodname('')
    } catch (error) {
      window.electron.ipcRenderer.send('test', `Error15 occured in EditProduct.jsx,${error}`)
    }
  }

  return (
    <div className="border-box w-3/4 h-auto mx-auto bg-rose-100 my-6 p-3 rounded-xl shadow-2xl">
      <div className="flex">
        <h1 className="text-3xl font-medium underline m-2 p-3">Add/Edit Product</h1>
        <div className="flex items-start">
          <form onSubmit={(e) => abc(e)}>
            <div className="flex flex-col">
              <input
                className="p-1 m-1"
                type="tel"
                value={searchprodname}
                onChange={(e) => setprodname(e.target.value)}
                ref={searchinputref}
                placeholder="Search Product Name"
                required
              />
              {showNotfound && <div>No Record found</div>}
              {showFound && <div>Record found</div>}
            </div>
            <button type='submit' className="bg-red-100 p-1 rounded border-4">
              Seach
            </button>
          </form>
        </div>
      </div>
      <form onSubmit={(e) => productinfohandler(e, 'save')} className="grid grid-cols-4 gap-6">
        <div className="flex flex-col">
          <label htmlFor="productname" className="m-2 p-2 text-lg">
            Product Name
          </label>
          <input
            id="productname"
            ref={productnameref}
            type="text"
            className="w-3/4 m-2 p-2 my-1 border-2 border-red-500 rounded-xl"
            autoComplete="true"
            required
            maxLength={50}
            value={formdata.productname}
            onChange={(e) => setformdata({ ...formdata, productname: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="productcode" className="m-2 p-2 text-lg">
            Product Code
          </label>
          <input
            id="productcode"
            type="text"
            className="w-3/4 m-2 p-2 my-1 border-2 border-red-500 rounded-xl"
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
            type="number"
            className="w-3/4 m-2 p-2 my-1 border-2 border-red-500 rounded-xl"
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
            className="w-3/4 m-2 p-2 my-1 border-2 border-red-500 rounded-xl"
            required
            value={formdata.unit}
            onChange={(e) => setformdata({ ...formdata, unit: e.target.value })}
          />
        </div>

        {savebtn && (
          <button
            type="submit"
            className="w-1/2 mx-auto col-span-1 m-2 p-2 rounded-xl text-blue-500 bg-white focus:bg-blue-500  hover:bg-blue-500 focus:text-white hover:text-white border-2 border-blue-500 focus:border-white hover:border-white"
          >
            Save
          </button>
        )}
        {updatebtn && (
          <button
            onClick={(e) => productinfohandler(e, 'update')}
            className="w-1/2 mx-auto col-span-1 m-2 p-2 rounded-xl text-blue-500 bg-white focus:bg-blue-500  hover:bg-blue-500 focus:text-white hover:text-white border-2 border-blue-500 focus:border-white hover:border-white"
          >
            Update
          </button>
        )}
      </form>
    </div>
  )
}

export default EditProduct
