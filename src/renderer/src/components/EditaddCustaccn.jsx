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

function EditaddCustaccn(props) {
  const [searchgstin, setgstin] = useState('')
  const [showNotfound, setnf] = useState(false)
  const [showFound, setf] = useState(false)
  const [savetype, setsavetype] = useState('save')
  const clientnameref = useRef(null)
  const searchinputref = useRef(null)
  const { state } = useLocation()
  window.electron.ipcRenderer.send('test', `printing filters prop,${Object.keys(props).length}, ${state}`)

  useEffect(() => {
    searchinputref.current.focus()
    if (props.from === 'normalroute') {
      if (state.from === 'viewcust') {
        setsavetype('update')

        const item = state.data

        window.electron.ipcRenderer.send('test', `from EditaddCustaccn.jsx ${JSON.stringify(item)}`)

        setformdata({
          ...formdata,
          clientname: item.clientname,
          mobileno: item.mobileno,
          emailid: item.emailid,
          clienttype: item.clienttype,
          gstin: item.gstin,
          address: item.address,
          state: item.state,
          notes: item.notes,
          id: item.custid
        })
      }
    }
  }, [])

  const [formdata, setformdata] = useState({
    clientname: '',
    mobileno: '',
    emailid: '',
    clienttype: '',
    gstin: '',
    address: '',
    state: '',
    notes: '',
    id: ''
  })

  const custinfohandler = async (event, operation) => {
    event.preventDefault()
    try {
      const formdatacopy = formdata
      window.electron.ipcRenderer.send(
        'test',
        `printing formdata: ${JSON.stringify(formdata)}, printing formdatacopy: ${JSON.stringify(formdatacopy)}`
      )
      let v1 = formdatacopy.clientname
      let value1 = v1.trim().toLowerCase()
      formdatacopy.clientname = value1.charAt(0).toUpperCase() + value1.slice(1)
      v1 = formdatacopy.emailid
      formdatacopy.emailid = v1.trim().toLowerCase()
      v1 = formdatacopy.clienttype
      value1 = v1.trim().toLowerCase()
      formdatacopy.clienttype = value1.charAt(0).toUpperCase() + value1.slice(1)
      v1 = formdatacopy.gstin
      formdatacopy.gstin = v1.trim().toLowerCase()
      v1 = formdatacopy.address
      formdatacopy.address = v1.trim().toLowerCase()
      v1 = formdatacopy.address
      value1 = v1.trim().toLowerCase()
      formdatacopy.notes = value1.charAt(0).toUpperCase() + value1.slice(1)
      const statewithcode = formdatacopy.state
      setformdata({
        ...formdata,
        clientname: '',
        mobileno: '',
        emailid: '',
        clienttype: '',
        gstin: '',
        address: '',
        state: '',
        notes: '',
        id: ''
      })
      setgstin('')
      if (operation === 'save') {
        const result = await window.electron.ipcRenderer.invoke('editinfo', {
          type: 'newcustaccn',
          value: formdatacopy
        })
        if (props.from === 'fromreceipt') {
          props.setcustid(formdatacopy.id)
          props.setcustgstin(formdatacopy.gstin)
          props.setcustfullname(formdatacopy.clientname)
          props.setcustaddr(formdatacopy.address)
          props.setcuststatecode(statewithcode)
          props.backBtnRef.current.focus()

        }
      } else if (operation === 'update') {
        const result = await window.electron.ipcRenderer.invoke('editinfo', {
          type: 'editcustaccn',
          value: formdatacopy
        })
        if (props.from === 'fromreceipt') {
          props.setcustid(formdatacopy.id)
          props.setcustgstin(formdatacopy.gstin)
          props.setcustfullname(formdatacopy.clientname)
          props.setcustaddr(formdatacopy.address)
          props.setcuststatecode(statewithcode)
          props.backBtnRef.current.focus()
        }
      }
    } catch (err) {
      window.electron.ipcRenderer.send('test', `Error occured in EditaddCustaccn.jsx,${err}`)
    }
  }

  const abc = async (e) => {
    e.preventDefault()
    // if (searchgstin.length === 15) {
    try {
      const fetchedrow = await window.electron.ipcRenderer.invoke('request-data', {
        type: 'searchgstin',
        value: searchgstin
      })
      if (!fetchedrow.status) {
        throw fetchedrow.error
      }
      window.electron.ipcRenderer.send(
        'test',
        `from EditaddCustaccn.jsx ${JSON.stringify(fetchedrow)}`
      )
      if (fetchedrow.data.length === 0) {
        setnf(true)
        setf(false)
        setsavetype('save')
        setformdata({
          ...formdata,
          gstin: searchgstin
        })
        clientnameref.current.focus()
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
        const item = convertNumericKeysToString(fetchedrow.data[0])

        window.electron.ipcRenderer.send('test', `from EditaddCustaccn.jsx ${JSON.stringify(item)}`)

        setformdata({
          ...formdata,
          clientname: item.clientname,
          mobileno: item.mobileno,
          emailid: item.emailid,
          clienttype: item.clienttype,
          gstin: item.gstin,
          address: item.address,
          state: item.state,
          notes: item.notes,
          id: item.custid
        })
        if (props.from === 'fromreceipt') {
          props.setcustid(item.custid)
          props.setcustgstin(item.gstin)
          props.setcustfullname(item.clientname)
          props.setcustaddr(item.address)
          props.setcuststatecode(item.state)
          props.backBtnRef.current.focus()

        }
      }
      // setgst('')
    } catch (error) {
      window.electron.ipcRenderer.send('test', `Error15 occured in EditaddCustaccn.jsx,${error}`)
    }
    // }
  }

  // const updatebtnhandler = async (event) => {
  //   event.preventDefault()
  //   const formdatacopy = formdata
  //   setformdata({
  //     ...formdata,
  //     firstname: '',
  //     lastname: '',
  //     mobileno: '',
  //     gender: '',
  //     agegroup: '',
  //     dob: '',
  //     anniversary: '',
  //     emailid: '',
  //     custtype: '',
  //     region: ''
  //   })
  //   try {
  //     const result = await window.electron.ipcRenderer.invoke('updatecustaccn', formdatacopy)
  //     if (result) {
  //       props.setcustid(formdatacopy.custid)

  //       props.setcustphno(formdatacopy.mobileno)
  //       props.setcustfullname(formdatacopy.firstname + ' ' + formdatacopy.lastname)
  //       props.setcusttype(formdatacopy.custtype)
  //       props.setcustagegroup(formdatacopy.agegroup)
  //     }
  //   } catch (err) {
  //     window.electron.ipcRenderer.send('test', `Error occured in NewCustaccn.jsx,${err}`)
  //   }
  // }

  // const handleSearchChange = (event) => {
  //   setphno(event.target.value)
  //   const regex = new RegExp(`^${searchphno}.`)
  //   const filteredData = Custdata.filter((row) => {
  //     return regex.test(row.mobileno) // Test the pattern against the search phone number
  //   })
  //   setsearchResults(filteredData)
  //   window.electron.ipcRenderer.send('test', 'from NewInvoice.jsx ' + JSON.stringify(searchphno))
  //   window.electron.ipcRenderer.send('test', 'from NewInvoice.jsx ' + JSON.stringify(searchResults))
  // }

  return (
    <div className="border-box w-3/4 h-auto mx-auto bg-cyan-50 my-6 p-3 rounded-xl shadow-2xl">
      <div className="flex">
        <h1 className="text-3xl font-medium underline m-2 p-3">New Customer account</h1>
        <div className="flex items-start">
          <form onSubmit={(e) => abc(e)}>
            <div className="flex flex-col">
              <input
                className="p-1 m-1"
                type="tel"
                value={searchgstin}
                onChange={(e) => setgstin(e.target.value)}
                maxLength={15}
                minLength={15}
                ref={searchinputref}
                required
              />
              {showNotfound && <div>No Record found</div>}
              {showFound && <div>Record found</div>}
            </div>
            <button type="submit" className="bg-cyan-800 text-white p-1 rounded">
              Seach
            </button>
          </form>
        </div>
      </div>
      <form onSubmit={(e) => custinfohandler(e, savetype)} className="grid grid-cols-4 gap-6">
        <div className="flex flex-col">
          <label htmlFor="clientname" className="m-2 p-2 text-lg">
            Client Name
          </label>
          <input
            id="clientname"
            ref={clientnameref}
            type="text"
            className="w-3/4 m-2 p-2 my-1 border-2 border-cyan-500 rounded-xl"
            autoComplete="true"
            required
            maxLength={50}
            value={formdata.clientname}
            onChange={(e) => setformdata({ ...formdata, clientname: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="gstin" className="m-2 p-2 text-lg">
            GSTIN
          </label>
          <input
            id="gstin"
            type="text"
            value={formdata.gstin}
            className="w-3/4 m-2 p-2 my-1 border-2 border-cyan-500 rounded-xl"
            minLength={15}
            maxLength={15}
            required
            onChange={(e) => setformdata({ ...formdata, gstin: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="mobileno" className="m-2 p-2 text-lg">
            Mobile No.
          </label>
          <input
            id="mobileno"
            type="tel"
            className="w-3/4 m-2 p-2 my-1 border-2 border-cyan-500 rounded-xl"
            required
            maxLength={10}
            minLength={10}
            value={formdata.mobileno}
            onChange={(e) => setformdata({ ...formdata, mobileno: e.target.value })}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="emailid" className="m-2 p-2 text-lg">
            Email-ID
          </label>
          <input
            id="emailid"
            type="email"
            value={formdata.emailid}
            className="w-3/4 m-2 p-2 my-1 border-2 border-cyan-500 rounded-xl"
            autoComplete="true"
            onChange={(e) => setformdata({ ...formdata, emailid: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address" className="m-2 p-2 text-lg">
            Address
          </label>
          <input
            id="address"
            type="text"
            value={formdata.address}
            className="w-3/4 m-2 p-2 my-1 border-2 border-cyan-500 rounded-xl"
            autoComplete="true"
            required
            onChange={(e) => setformdata({ ...formdata, address: e.target.value })}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="clienttype" className="m-2 p-2 text-lg">
            Client Type
          </label>
          <input
            id="clienttype"
            type="text"
            value={formdata.clienttype}
            className="w-3/4 m-2 p-2 my-1 border-2 border-cyan-500 rounded-xl"
            autoComplete="true"
            onChange={(e) => {
              setformdata({ ...formdata, clienttype: e.target.value })
              window.electron.ipcRenderer.send('test', `${e.target.value}, ${formdata.clienttype}`)
            }}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="state" className="m-2 p-2 text-lg">
            State
          </label>
          <select
            id="state"
            value={formdata.state}
            onChange={(e) => {
              setformdata({ ...formdata, state: e.target.value })
              // setTimeout(() => {

              // window.electron.ipcRenderer.send('test', `${e.target.value}, ${formdata.state}`)
              // }, 60000);
            }}
            className="w-3/4 m-2 p-2 my-1 border-2 border-cyan-500 rounded-xl"
            autoComplete="true"
          >
            <option value={''}>Select State</option>
            <option value={'01-JAMMU AND KASHMIR'}>01-JAMMU AND KASHMIR</option>
            <option value={'02-HIMACHAL'}>02-HIMACHAL PRADESH</option>
            <option value={'03-PUNJAB'}>03-PUNJAB</option>
            <option value={'04-CHANDIGARH'}>04-CHANDIGARH</option>
            <option value={'05-UTTARAKHAND'}>05-UTTARAKHAND</option>
            <option value={'06-HARYANA'}>06-HARYANA</option>
            <option value={'07-DELHI'}>07-DELHI</option>
            <option value={'08-RAJASTHAN'}>08-RAJASTHAN</option>
            <option value={'09-UTTAR PRADESH'}>09-UTTAR PRADESH</option>
            <option value={'10-BIHAR'}>10-BIHAR</option>
            <option value={'11-SIKKIM'}>11-SIKKIM</option>
            <option value={'12-ARUNACHAL PRADESH'}>12-ARUNACHAL PRADESH</option>
            <option value={'13-NAGALAND'}>13-NAGALAND</option>
            <option value={'14-MANIPUR'}>14-MANIPUR</option>
            <option value={'15-MIZORAM'}>15-MIZORAM</option>
            <option value={'16-TRIPURA'}>16-TRIPURA</option>
            <option value={'17-MEGHALAYA'}>17-MEGHALAYA</option>
            <option value={'18-ASSAM'}>18-ASSAM</option>
            <option value={'19-WEST BENGAL'}>19-WEST BENGAL</option>

            <option value={'20-JHARKHAND'}>20-JHARKHAND</option>
            <option value={'21-ODISHA'}>21-ODISHA</option>
            <option value={'22-CHATTISGARH'}>22-CHATTISGARH</option>
            <option value={'23-MADHYA PRADESH'}>23-MADHYA PRADESH</option>
            <option value={'24-GUJARAT'}>24-GUJARAT</option>
            <option value={'26-DADRA AND NAGAR HAVELI AND DAMAN AND DIU'}>
              26-DADRA AND NAGAR HAVELI AND DAMAN AND DIU
            </option>
            <option value={'27-MAHARASHTRA'}>27-MAHARASHTRA</option>
            <option value={'29-KARNATAKA'}>29-KARNATAKA</option>

            <option value={'30-GOA'}>30-GOA</option>
            <option value={'31-LAKSHADWEEP'}>31-LAKSHADWEEP</option>
            <option value={'32-KERELA'}>32-KERELA</option>
            <option value={'33-TAMIL NADU'}>33-TAMIL NADU</option>
            <option value={'34-PUDUCHERRY'}>34-PUDUCHERRY</option>
            <option value={'35-ANDAMAN AND NICOBAR ISLANDS'}>35-ANDAMAN AND NICOBAR ISLANDS</option>
            <option value={'36-TELANGANA'}>36-TELANGANA</option>
            <option value={'37-ANDHRA PRADESH'}>37-ANDHRA PRADESH</option>
            <option value={'38-LADAKH'}>38-LADAKH</option>
            <option value={'97-OTHER TERRITORY'}>97-OTHER TERRITORY</option>
            <option value={'99-CENTRE JURISDICTION'}>99-CENTRE JURISDICTION</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="notes" className="m-2 p-2 text-lg">
            Notes
          </label>
          <textarea
            id="notes"
            value={formdata.notes}
            className="w-3/4 m-2 p-2 my-1 border-2 border-cyan-500 rounded-xl"
            onChange={(e) => setformdata({ ...formdata, notes: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="w-1/2 mx-auto col-span-1 m-2 p-2 rounded-xl text-cyan-500 bg-white focus:bg-cyan-500  hover:bg-cyan-500 focus:text-white hover:text-white border-2 border-cyan-500 focus:border-white hover:border-white"
        >
          {savetype.charAt(0).toUpperCase() + savetype.slice(1)}
        </button>
      </form>
    </div>
  )
}

export default EditaddCustaccn
