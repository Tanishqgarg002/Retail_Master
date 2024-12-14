/* eslint-disable prettier/prettier */
import { useEffect, useRef, useState } from 'react'
import NewCustaccn from './EditaddCustaccn'
import { useLocation, useNavigate } from 'react-router-dom'
import ReactDOMServer from 'react-dom/server'
// import Modal from 'react-modal'

function Invoicedata({ invoiceinfo }) {
  const Inwords = (totalvalue) => {
    if (totalvalue === 0) {
      return ' Zero'
    }
    const tens = [
      '',
      '',
      'Twenty',
      'Thirty',
      'Forty',
      'Fifty',
      'Sixty',
      'Seventy',
      'Eighty',
      'Ninty'
    ]
    const upto20 = [
      '',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine',
      'Ten',
      'Eleven',
      'Twelve',
      'Thirteen',
      'Fourteen',
      'Fifteen',
      'Sixteen',
      'Seventeen',
      'Eighteen',
      'Nineteen'
    ]
    if (totalvalue >= 10000000) {
      return Inwords(Math.floor(totalvalue / 10000000)) + ' Crore' + Inwords(totalvalue % 10000000)
    } else if (totalvalue >= 100000) {
      return Inwords(Math.floor(totalvalue / 100000)) + ' Lakh' + Inwords(totalvalue % 100000)
    } else if (totalvalue >= 1000) {
      return Inwords(Math.floor(totalvalue / 1000)) + ' Thousand' + Inwords(totalvalue % 1000)
    } else if (totalvalue >= 100) {
      return Inwords(Math.floor(totalvalue / 100)) + ' Hundred' + Inwords(totalvalue % 100)
    } else if (totalvalue >= 20) {
      return ' ' + tens[Math.floor(totalvalue / 10)] + ' ' + upto20[Math.floor(totalvalue % 10)]
    } else if (totalvalue >= 0) {
      return ' ' + upto20[Math.floor(totalvalue)]
    } else {
      return ''
    }
  }

  return (
    <div className="mx-auto A4 p-2 bg-white">
      <div className="flex justify-between mb-4">
        <div className="flex flex-col w-1/2">
          <div className="font-bold text-4xl mb-4">{invoiceinfo.firmname}</div>
          <div className="text-base mb-1">Address: {invoiceinfo.firmaddr}</div>
          <div className="mb-1">
            State: {invoiceinfo.firmstate.charAt(0).toUpperCase() + invoiceinfo.firmstate.slice(1)}
          </div>
          <div className="mb-1">GSTIN: {invoiceinfo.firmgstin} </div>
          <div className="mb-1">E-Mail: {invoiceinfo.firmemail}</div>
          <div>Contact: {invoiceinfo.firmphoneno}</div>
        </div>
        <div className="flex flex-col w-1/3">
          <div className="font-bold text-4xl mb-4">Invoice</div>
          <div className="flex mb-2">
            <div className="w-1/2">Invoice Type:</div>
            <div className="w-1/2">{invoiceinfo.invoicetype}</div>
          </div>
          <div className="flex mb-2">
            <div className="w-1/2">Invoice No.:</div>
            <div className="w-1/2">{invoiceinfo.invoiceno}</div>
          </div>
          <div className="flex mb-2">
            <div className="w-1/2">Invoice Date:</div>
            <div className="w-1/2">{invoiceinfo.invoicedate}</div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mb-4">
        <div className="flex flex-col w-1/2">
          <div className="text-xl mb-2">Bill to:</div>
          <div>{invoiceinfo.billtoname}</div>
          <div>Address: {invoiceinfo.billtoaddr}</div>
          <div>
            State:{' '}
            {invoiceinfo.billtostatewithcode.slice(3).charAt(0) +
              invoiceinfo.billtostatewithcode.slice(3).slice(1).toLowerCase()}
          </div>
          <div>GSTIN: {invoiceinfo.billtogstin}</div>
        </div>
        <div className="flex flex-col w-1/2 mx-auto">
          <div className="text-xl mb-2">Ship to:</div>
          <div>{invoiceinfo.shiptoname}</div>
          <div className="mb-2">Address: {invoiceinfo.shiptoaddr}</div>
          <div>Vehicle Number: {invoiceinfo.shipvehicle}</div>
        </div>
      </div>
      <div className="mb-4">
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border px-0.5 w-8">Sr.</th>
              <th className="border px-0.5 w-36">Product Desc.</th>
              <th className="border px-0.5">HSN Code</th>
              <th className="border px-0.5">Qty.</th>
              <th className="border px-0.5">Unit</th>
              <th className="border px-0.5">Rate</th>
              <th className="border px-0.5">Amount</th>
              <th className="border px-0.5">GST</th>
              <th className="border px-0.5">GST Amt.</th>
              <th className="border px-0.5">Amt.</th>
            </tr>
          </thead>
          <tbody>
            {invoiceinfo.items.map((item, index) => (
              <tr key={index}>
                <td className="border px-0.5 max-w-8">{index + 1}</td>
                <td className="border px-0.5 max-w-36 break-words">{item.product_name}</td>
                <td className="border px-0.5 max-w-20 break-words">{item.product_code}</td>
                <td className="border px-0.5 text-right max-w-12">
                  {Number(item.quantity).toFixed(2)}
                </td>
                <td className="border px-0.5 max-w-9 break-words">{item.unit}</td>
                <td className="border px-0.5 text-right max-w-16">
                  {Number(item.price).toFixed(2)}
                </td>
                <td className="border px-0.5 text-right max-w-20">
                  {(item.price * item.quantity).toFixed(2)}
                </td>
                <td className="border px-0.5 text-right max-w-8">{item.gst}%</td>
                <td className="border px-0.5 text-right max-w-16">
                  {(item.price * item.quantity * (item.gst / 100)).toFixed(2)}
                </td>
                <td className="border px-0.5 text-right max-w-16">
                  {(
                    item.price * item.quantity +
                    item.price * item.quantity * (item.gst / 100)
                  ).toFixed(2)}
                </td>
              </tr>
            ))}
            <tr>
              <td className="border-t-4" colSpan={2}>
                {invoiceinfo.items.length} Items
              </td>
              <td className="border-l-4 border-t-4" colSpan={4}>
                Total:
              </td>
              <td colSpan={1} className="text-right px-0.5 border-t-4">
                {invoiceinfo.items
                  .reduce((acc, item) => {
                    return acc + (item.price * item.quantity || 0)
                  }, 0)
                  .toFixed(2)}
              </td>
              <td colSpan={2} className="text-right px-0.5 border-t-4">
                {invoiceinfo.items
                  .reduce((acc, item) => {
                    return acc + (item.price * item.quantity * (item.gst / 100) || 0)
                  }, 0)
                  .toFixed(2)}
              </td>
              <td className="text-right px-0.5 border-t-4">
                {invoiceinfo.items
                  .reduce((acc, item) => {
                    return (
                      acc +
                      (item.price * item.quantity + item.price * item.quantity * (item.gst / 100) ||
                        0)
                    )
                  }, 0)
                  .toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <div className="flex flex-col justify-between w-1/2">
          <div className="w-full mb-2">
            <div className="mb-2 text-xl">Bank Details:</div>
            <div className="flex w-full">
              <div className="w-32">Bank Name:</div>
              <div className="w-full">{invoiceinfo.bankname}</div>
            </div>
            <div className="flex">
              <div className="w-32">Bank Branch:</div>
              <div className="w-full">{invoiceinfo.branch}</div>
            </div>
            <div className="flex">
              <div className="w-32">Accn. no.:</div>
              <div className="w-full">{invoiceinfo.bankaccn}</div>
            </div>
            <div className="flex">
              <div className="w-32">IFSC Code:</div>
              <div className="w-full">{invoiceinfo.ifsccode}</div>
            </div>
          </div>
          <div className="text-xs">
            <p>1. E & OE</p>
            <p>2. All Disputes..</p>
          </div>
        </div>
        <div className="flex flex-col border-black border-2 p-2">
          <div className="flex">
            <div className="w-28">Amount:₹</div>
            <div className="text-right w-32">
              {invoiceinfo.items
                .reduce((acc, item) => {
                  return acc + (item.price * item.quantity || 0)
                }, 0)
                .toFixed(2)}
            </div>
          </div>
          {invoiceinfo.firmstatecode === Number(invoiceinfo.billtostatewithcode.substr(0, 2)) ? (
            <div>
              <div className="flex">
                <div className="w-28">SGST:₹</div>
                <div className="text-right w-32">
                  {(
                    invoiceinfo.items.reduce((acc, item) => {
                      return acc + (item.price * item.quantity * (item.gst / 100) || 0)
                    }, 0) / 2
                  ).toFixed(2)}
                </div>
              </div>
              <div className="flex">
                <div className="w-28">CGST:₹</div>
                <div className="w-32 text-right">
                  {(
                    invoiceinfo.items.reduce((acc, item) => {
                      return acc + (item.price * item.quantity * (item.gst / 100) || 0)
                    }, 0) / 2
                  ).toFixed(2)}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex">
                <div className="w-28">IGST:₹</div>
                <div className="text-right w-32">
                  {invoiceinfo.items
                    .reduce((acc, item) => {
                      return acc + (item.price * item.quantity * (item.gst / 100) || 0)
                    }, 0)
                    .toFixed(2)}
                </div>
              </div>
            </div>
          )}
          <hr />
          <div className="flex">
            <div className="w-28">Grand Total:₹</div>
            <div className="w-32 text-right">
              {invoiceinfo.items
                .reduce((acc, item) => {
                  return (
                    acc +
                    (item.price * item.quantity + item.price * item.quantity * (item.gst / 100) ||
                      0)
                  )
                }, 0)
                .toFixed(2)}
            </div>
          </div>
          <div className="flex flex-col mt-4 w-60">
            <div className="w-28">In Words: </div>
            <div className="">
              {Inwords(
                invoiceinfo.items.reduce((acc, item) => {
                  return (
                    acc +
                    (item.price * item.quantity + item.price * item.quantity * (item.gst / 100) ||
                      0)
                  )
                }, 0)
              ).slice(1)}
              {' Rupees Only'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function NewInvoice() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const helddata = state
  // window.electron.ipcRenderer.send(
  //   'test',
  //   `printing formdata copy from fine here, ${JSON.stringify(helddata)}`
  // )
  const [items, setItems] = useState(new Array(1).fill({}))
  const [totalitems, settotalitems] = useState(0)
  const [receipttype, setreceipttype] = useState('Sales')
  const [roundamt, setroundamt] = useState(0)
  const [totaldisc, settotaldisc] = useState(0)
  const [totalamt, settotalamt] = useState(0)
  const [totalfloatamt, settotalfloatamt] = useState(0)
  const [time, settime] = useState(new Date())
  const [custinfodialog, setcustdialog] = useState(false)
  const [custid, setcustid] = useState('')
  const [custgstin, setcustgstin] = useState('')
  const [custfullname, setcustfullname] = useState('')
  const [custaddr, setcustaddr] = useState('')
  const [custstatewithcode, setcuststatewithcode] = useState('')
  const [receipt_counter, setreceiptcounter] = useState('')
  const [comment, setcomment] = useState('')
  const [taxamt, settaxamt] = useState(0)
  const [shipaddr, setshipaddr] = useState('')
  const [shipaddrcheckb, setshipaddrcheckb] = useState(false)
  const [shipfname, setshipfname] = useState('')
  const [shipvehicleno, setshipvehicleno] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [stockdata, setstockdata] = useState([])
  const productCellRef = useRef(null)
  const rtyperef = useRef(null)
  const [savepopup, setsavepopup] = useState({ show: false })
  const [optype, setoptype] = useState('new')

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        /* new item object */
      }
    ])

    productCellRef.current.focus()
  }
  useEffect(() => {
    settotalitems(() =>
      items.reduce((acc, item) => acc + (item.product_name != null), 0).toString()
    )
    //this is comment for this code here;
    settotalamt(() =>
      parseInt(items.reduce((acc, item) => acc + (parseFloat(item.price * item.quantity) || 0), 0))
    )
    settotalfloatamt(() =>
      items.reduce((acc, item) => acc + parseFloat(parseFloat(item.price) * item.quantity || 0), 0)
    )

    settotaldisc(
      parseFloat(
        items.reduce(
          (acc, item) => acc + parseFloat(parseFloat(item.mrp) * item.quantity || 0),
          0
        ) -
          items.reduce(
            (acc, item) => acc + parseFloat(parseFloat(item.price) * item.quantity || 0),
            0
          )
      )
    )
    setroundamt(
      parseInt(
        items.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity || 0), 0)
      ) -
        items.reduce(
          (acc, item) => acc + parseFloat(parseFloat(item.price) * item.quantity || 0),
          0
        )
    )
    settaxamt(
      Number(
        items
          .reduce(
            (acc, item) =>
              acc + parseFloat(parseFloat(item.price) * item.quantity * (item.gst / 100) || 0),
            0
          )
          .toFixed(2)
      )
    )

    window.electron.ipcRenderer.send(
      'test',
      `total amount is: ${totalamt}, total float amt is: ${totalfloatamt}, round amt is: ${taxamt}, ${typeof taxamt}`
    )
  }, [items])

  const funcsetitems = async (receipt_id) => {
    try {
      const o1 = await window.electron.ipcRenderer.invoke('request-data', {
        type: 'receiptdataforupdate',
        value: receipt_id
      })
      if (!o1.status) {
        throw o1.error
      }
      const o2data = o1.data.reduce((acc, item) => {
        const ob = {
          product_name: item.product_name,
          product_code: item.product_code,
          inv_id: item.inventory_id,
          mrp: item.mrp,
          price: item.selling_price,
          gst: item.gst,
          quantity: item.quantity,
          unit: item.unit
        }
        acc.push(ob)
        return acc
      }, [])
      setItems(o2data)
      window.electron.ipcRenderer.send(
        'test',
        `Printing here___________???????,${JSON.stringify(items)}`
      )
    } catch (error) {
      window.electron.ipcRenderer.send(
        'test',
        `Error occured in NewInvoice.jsx while getting items for update rendering,${error}`
      )
    }
  }

  useEffect(() => {
    if (
      helddata.from === 'held' ||
      helddata.from === 'editinvoice' ||
      helddata.from === 'viewinvdetails'
    ) {
      setreceipttype(helddata.row.receipt_type)
      setcustfullname(helddata.row.clientname)
      setcustgstin(helddata.row.gstin)
      setcustaddr(helddata.row.address)
      setshipfname(helddata.row.shipping_client_name)
      setshipaddr(helddata.row.shipping_addr)
      setshipvehicleno(helddata.row.shipping_vehicle_no)
      setcomment(helddata.row.notes)
      setcustid(helddata.row.custid)
      setcuststatewithcode(helddata.row.state)
      if (helddata.from === 'held') {
        setoptype('new')
        setItems(JSON.parse(helddata.row.items))
      } else if (helddata.from === 'editinvoice' || helddata.from === 'viewinvdetails') {
        setreceiptcounter(helddata.row.receipt_id)
        setoptype('update')
        funcsetitems(helddata.row.receipt_id)
      }
      window.electron.ipcRenderer.send(
        'test',
        `Printing here___________this one,${JSON.stringify(items)}`
      )
    }
  }, [])

  const setcustid1 = (data) => {
    setcustid(data)
  }
  const setcustgstin1 = (data) => {
    setcustgstin(data)
  }
  const setcustaddr1 = (data) => {
    setcustaddr(data)
  }
  const setcustfullname1 = (data) => {
    setshipfname(data)
    setcustfullname(data)
  }
  const setcuststatecode1 = (data) => {
    setcuststatewithcode(data)
  }

  const handleRemoveItem = (e, index) => {
    // e.preventDefault()
    window.electron.ipcRenderer.send('test', `before ${JSON.stringify(items[index])}`)
    // if(index>0){
    setItems([...items.slice(0, index), ...items.slice(index + 1)])
    setremovestate(false)
    setTimeout(() => {
      setremovestate(true)
    }, 10)

    window.electron.ipcRenderer.send('test', `after ${JSON.stringify(items[index])}`)
  }
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRowIndex, setselectedRowIndex] = useState(0)
  const handleInputChange = (event, index) => {
    const updatedItems = [...items]
    if (event.target.name === 'quantity' || event.target.name === 'price') {
      updatedItems[index][event.target.name] = Number(
        event.target.value.toString().replace(/^0+/, '')
      )
      // window.electron.ipcRenderer.send('test', `after ${Number(event.target.value.toString().replace(/^0+/, ''))}`)
      updatedItems[index][event.target.name] = updatedItems[index][event.target.name]
        .toString()
        .replace(/^0+/, '')
    } else {
      updatedItems[index][event.target.name] = event.target.value
    }
    setItems(updatedItems)
  }
  const productkeydown = (event, index) => {
    // event.preventDefault()
    switch (event.key) {
      case 'F9': {
        if (event.target.name === 'product_name') {
          handleRemoveItem(event, index)
        }
        break
      }
      case 'Enter': {
        if (event.target.name === 'product_name') {
          window.electron.ipcRenderer.send('test', items)
          setselectedRowIndex(index)
          setIsModalOpen(true)
          document.getElementById('searchterminput').focus()
        }
        break
      }
      // case 'ArrowLeft': {
      //   if (event.target.previousElementSibling) {
      //     window.electron.ipcRenderer.send('test', 'listening receipt table events left')

      //     event.target.previousElementSibling.focus()
      //   }
      //   break
      // }
      // case 'ArrowRight': {
      //   if (event.target.nextElementSibling) {
      //     window.electron.ipcRenderer.send('test', 'listening receipt table events right')

      //     event.target.nextElementSibling.focus()
      //   }
      //   break
      // }
    }
    // event.preventDefault()
  }
  const handlekeydown = (event, index) => {
    if (event.key === 'Enter' && index === items.length - 1) {
      handleAddItem()
    }
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    const regex = new RegExp(`^${searchTerm.toLowerCase()}.`)
    const filteredData = stockdata.filter((row) => {
      const articleName = row.product_name.toLowerCase() // Get product_name in lowercase
      return regex.test(articleName) // Test the pattern against the lowercase article name
    })
    setSearchResults(filteredData)
    window.electron.ipcRenderer.send('test', 'from NewInvoice.jsx ' + JSON.stringify(searchTerm))
    window.electron.ipcRenderer.send('test', 'from NewInvoice.jsx ' + JSON.stringify(searchResults))
  }
  const handleSelectItem = (item, index = selectedRowIndex) => {
    window.electron.ipcRenderer.send('test', `from handleselectitem ${JSON.stringify(item)}`)
    items[index].product_name = item.product_name
    items[index].product_code = item.product_code
    items[index].mrp = item.mrp
    items[index].quantity = 1
    items[index].inv_id = item.id
    items[index].gst = item.gst
    items[index].unit = item.unit

    setIsModalOpen(false)
    setSearchTerm('')
    setSearchResults([])
    handleAddItem()
  }

  function givethisfy() {
    const thisdate = new Date()
    const month = thisdate.getMonth() + 1
    if (month >= 4 && month <= 12) {
      return thisdate.getFullYear() + 1
    } else {
      return thisdate.getFullYear()
    }
  }

  async function verifyreceiptcounter(data) {
    window.electron.ipcRenderer.send('test', 'from NewInvoice.jsx ' + typeof data)

    const rcyear = data.substring(0, 4)
    const rcyearint = parseInt(rcyear)
    const thisfy = givethisfy()
    if (rcyearint === thisfy) {
      return data
    } else {
      try {
        const final = thisfy.toString() + '1'
        await window.electron.ipcRenderer.invoke('editinfo', {
          type: 'resetreceiptcounter',
          value: final
        })
        return final
      } catch (err) {
        window.electron.ipcRenderer.send('test', `Error occured in NewInvoice.jsx,${err}`)
        return null //handle this error condition(if it occurs)
      }
    }
  }

  const stockd = async () => {
    try {
      let row = await window.electron.ipcRenderer.invoke('request-data', { type: 'receiptcounter' })
      if (!row.status) {
        throw row.error
      }
      let rc = row.data[0].count
      rc = await verifyreceiptcounter(rc)

      let goodtogo = await window.electron.ipcRenderer.invoke('check-data', {
        type: 'checkreceiptcounter',
        value: rc
      })
      // while (goodtogo === false) {
      //   row = await window.electron.ipcRenderer.invoke('request-data', { type: 'receiptcounter' })
      //   rc = row[0].count
      //   newcounter = givethisfy().toString() + (parseInt(rc.slice(4)) + 1).toString()
      //   await window.electron.ipcRenderer.invoke('editinfo', {
      //     type: 'resetreceiptcounter',
      //     value: newcounter
      //   })
      //   goodtogo = await window.electron.ipcRenderer.invoke('check-data', {
      //     type: 'checkreceiptcounter',
      //     value: rc
      //   })
      // }
      window.electron.ipcRenderer.send('test', 'from NewInvoice.jsx ' + JSON.stringify(rc))
      if (state.from != 'editinvoice' && state.from != 'viewinvdetails') {
        setreceiptcounter(rc)
      }
      const stockda = await window.electron.ipcRenderer.invoke('request-data', {
        type: 'productdata'
      })
      if (!stockda.status) {
        throw stockda.error
      }
      window.electron.ipcRenderer.send('test', 'from NewInvoice.jsx ' + JSON.stringify(stockda))

      setstockdata(stockda.data)
    } catch (error) {
      window.electron.ipcRenderer.send('test', `Error occured in NewInvoice.jsx,${error}`)
    }
  }
  useEffect(() => {
    stockd()

    rtyperef.current.focus()
    const settimeid = setInterval(() => {
      settime(new Date())
    }, 1000)
    return () => clearInterval(settimeid)
  }, [])

  const handleResultListKeyPress = (event) => {
    // event.preventDefault()
    window.electron.ipcRenderer.send('test', 'In new Invoice.jsx, event listening')

    // const resultList = document.getElementById('firstResultItem')
    // const selectedItem = resultList.querySelector('.border-4')
    switch (event.key) {
      case 'ArrowDown': {
        window.electron.ipcRenderer.send('test', 'In new Invoice.jsx, arrowdown event listening')
        // if (selectedItem) {
        const nextItem = event.target.nextElementSibling
        if (nextItem) {
          event.target.classList.remove('border-4')
          nextItem.classList.add('border-4')
          nextItem.focus()
        }
        // }
        // else {
        //   const firstItem = resultList.firstChild
        //   if (firstItem) {
        //     firstItem.classList.add('border-4')
        //     firstItem.focus()
        //   }
        // }
        break
      }
      case 'ArrowUp': {
        window.electron.ipcRenderer.send('test', 'In new Invoice.jsx, arrowup event listening')

        // if (selectedItem) {
        const prevItem = event.target.previousElementSibling
        if (prevItem) {
          event.target.classList.remove('border-4')
          prevItem.classList.add('border-4')
          prevItem.focus()
        }
        // }
        break
      }
    }
    // event.preventDefault()
  }
  const ModalWindSearchBar = useRef(null)

  useEffect(() => {
    if (isModalOpen) {
      ModalWindSearchBar.current.focus()
      const handleModalWindSearchBarKeyPress = (event) => {
        if (event.key === 'Escape') {
          setIsModalOpen(false) // Close modal on Esc key press
        }
      }

      document.addEventListener('keydown', handleModalWindSearchBarKeyPress)

      return () => {
        document.removeEventListener('keydown', handleModalWindSearchBarKeyPress)
      }
    }
  }, [isModalOpen])

  const handleSearchSelectItem = (event, item) => {
    if (event.key === 'Enter') {
      window.electron.ipcRenderer.send('test', 'sending event listening signal from here')
      handleSelectItem(item)
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      handleResultListKeyPress(event)
    }
  }

  const custbuthandler = () => {
    window.electron.ipcRenderer.send('test', JSON.stringify(items))
    setcustdialog(true)
  }
  const [showpop, setshowpop] = useState(false)
  const [removestate, setremovestate] = useState(true)

  useEffect(() => {
    if (savepopup.show === true) {
      setItems(new Array(1).fill({}))
    }
  }, [savepopup])

  const pendingfunc = async (data) => {
    let newcounter
    if (data === 'save') {
      // if (state.from === 'held') {
      //   let row = await window.electron.ipcRenderer.invoke('request-data', {
      //     type: 'receiptcounter'
      //   })
      //   if (!row.status) {
      //     throw row.error
      //   }
      //   let rc = row.data[0].count
      //   rc = await verifyreceiptcounter(rc)
      //   newcounter = rc
      // } else {
        newcounter =
          givethisfy().toString() + (parseInt(receipt_counter.toString().slice(4)) + 1).toString()
        await window.electron.ipcRenderer.invoke('editinfo', {
          type: 'resetreceiptcounter',
          value: newcounter
        })
      // }
    } else if (data === 'update') {
      let row = await window.electron.ipcRenderer.invoke('request-data', {
        type: 'receiptcounter'
      })
      if (!row.status) {
        throw row.error
      }
      window.electron.ipcRenderer.send('test', `coming till here: ::::::::::5`)

      newcounter = row.data[0].count
      newcounter = await verifyreceiptcounter(newcounter)
    }
    setreceiptcounter(newcounter)

    rtyperef.current.focus()
    if (data === 'update' || state.from==='held') {
      navigate('/receipt/new', { state: { from: 'home' } })
    }
    window.electron.ipcRenderer.send('test', `here at end of ()000000000`)
  }

  const savebtnhandler = async (e, data) => {
    e.preventDefault()
    setreceipttype(receipttype.trim())
    setcustgstin(custgstin.trim())
    setcustfullname(custfullname.trim())
    setcustaddr(custaddr.trim())
    setshipfname(shipfname.trim())
    setshipaddr(shipaddr.trim())
    setshipvehicleno(shipvehicleno.trim())
    const newarr = items.reduce((acc, item) => {
      if (Object.keys(item).length === 8) {
        let check = true
        Object.keys(item).forEach((key) => {
          if (item[key] === '') {
            check = false
            // return
          }
          // else{
          //   window.electron.ipcRenderer.send('test', `all fine here_____________${item[key]} ${check}`)

          // }
        })
        if (check === true) {
          acc.push(item)
        }
      }
      return acc
    }, [])
    if (
      newarr.length === 0 ||
      receipttype === '' ||
      custgstin === '' ||
      custfullname === '' ||
      custaddr === '' ||
      shipfname === '' ||
      shipaddr === '' ||
      shipvehicleno === ''
    ) {
      setshowpop(true)
      setTimeout(() => {
        setshowpop(false)
      }, 3000)
      return
    }
    window.electron.ipcRenderer.send('test', `reached here`)

    const prdnames = newarr.reduce((acc, item) => acc + item.product_name + ', ', '')
    if (data === 'save') {
      window.electron.ipcRenderer.send('test', `reached here then`)

      window.electron.ipcRenderer.send('test', `${JSON.stringify(newarr)}`)

      const formdata = {
        receiptstatus: 'completed',
        receipttype: receipttype,
        invoiceid: receipt_counter,
        createdtime: time.toLocaleTimeString(),
        createddate: time.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }),
        totalitems: totalitems,
        mrptotal: totalfloatamt,
        totaldisc: totaldisc,
        grandTotal: totalamt,
        comments: comment,
        lastupdatedtime: time.toLocaleTimeString(),
        lastupdateddate: time.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }),
        taxamt: taxamt,
        custid: custid,
        shipaddr: shipaddr,
        shipfname: shipfname,
        shipvn: shipvehicleno,
        productnames: prdnames.substring(0, prdnames.length - 2)
      }
      window.electron.ipcRenderer.send(
        'test',
        `printing formdata copy from fine here, ${JSON.stringify(formdata)}`
      )

      try {
        window.electron.ipcRenderer.send(
          'test',
          `printing formdata copy from fine here, ${JSON.stringify(formdata)}`
        )

        const output = await window.electron.ipcRenderer.invoke('editinfo', {
          value: formdata,
          type: 'savereceipt'
        })
        if (output.status === false) throw output.error

        newarr.forEach(async (item) => {
          await window.electron.ipcRenderer.invoke('editinfo', {
            value: { row: item, rid: receipt_counter },
            type: 'savereceiptitems'
          })
        })
        // setShowModal(true)
        setsavepopup({ show: true, data: 'Saved' })
        window.electron.ipcRenderer.send('test', `here before settimeout)000000000`)

        setTimeout(() => {
          setsavepopup({ show: false })
        }, 3000)
        window.electron.ipcRenderer.send('test', `here after settimeout)000000000`)
        printhandler()
        pendingfunc(data)

        window.electron.ipcRenderer.send('test', `log to console ${JSON.stringify(items)}`)
      } catch (err) {
        window.electron.ipcRenderer.send('test', `error from here: ${err}`)
      }
    } else if (data === 'update') {
      const formdata = {
        receipt_id: receipt_counter,
        receipttype: receipttype,
        lastupdatedtime: time.toLocaleTimeString(),
        lastupdateddate: time.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }),
        totalitems: totalitems,
        mrptotal: totalfloatamt,
        grandTotal: totalamt,
        comments: comment,
        taxamt: taxamt,
        custid: custid,
        shipaddr: shipaddr,
        shipfname: shipfname,
        shipvn: shipvehicleno,
        productnames: prdnames.substring(0, prdnames.length - 2)
      }
      try {
        window.electron.ipcRenderer.send('test', `coming till here: ::::::::::1`)

        const o1 = await window.electron.ipcRenderer.invoke('editinfo', {
          value: receipt_counter,
          type: 'deletereceiptitems'
        })
        if (!o1.status) {
          throw o1.error
        }
        window.electron.ipcRenderer.send('test', `coming till here: ::::::::::2`)

        const o2 = await window.electron.ipcRenderer.invoke('editinfo', {
          value: formdata,
          type: 'updatereceipt'
        })
        if (!o2.status) {
          throw o2.error
        }
        window.electron.ipcRenderer.send('test', `coming till here: ::::::::::3`)

        newarr.forEach(async (item) => {
          const o3 = await window.electron.ipcRenderer.invoke('editinfo', {
            value: { row: item, rid: receipt_counter },
            type: 'savereceiptitems'
          })
          if (!o3.status) {
            throw o3.error
          }
        })
        // setShowModal(true)
        setsavepopup({ show: true, data: 'Updated' })

        setTimeout(() => {
          setsavepopup({ show: false })
        }, 3000)
        printhandler()
        pendingfunc(data)
      } catch (err) {
        window.electron.ipcRenderer.send('test', `error: ${err}`)
      }
    } else if (data === 'hold') {
      const formdata = {
        receipt_status: 'held',
        receipt_type: receipttype,
        // receipt_id: receipt_counter,
        createdtime: time.toLocaleTimeString(),
        createddate: time.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }),
        items: JSON.stringify(newarr),

        comments: comment,
        custid: custid,
        shipaddr: shipaddr,
        shipfname: shipfname,
        shipvn: shipvehicleno
      }
      try {
        window.electron.ipcRenderer.send(
          'test',
          `printing formdata copy from fine here, ${JSON.stringify(formdata)}`
        )

        const output = await window.electron.ipcRenderer.invoke('editinfo', {
          value: formdata,
          type: 'holdreceipt'
        })
        if (output.status === false) throw output.error

        // let newcounter =
        //   givethisfy().toString() + (parseInt(receipt_counter.toString().slice(4)) + 1).toString()
        // await window.electron.ipcRenderer.invoke('editinfo', {
        //   type: 'resetreceiptcounter',
        //   value: newcounter
        // })
        // setreceiptcounter(newcounter)
        setreceipttype('Sales')
        settotalitems(0)
        settotalamt(0)
        settotaldisc(0)
        settotalfloatamt(0)
        settaxamt(0)
        setcustid('')
        setshipaddr('')
        setshipfname('')
        setshipvehicleno('')
        setcustfullname('')
        setcustgstin('')
        setselectedRowIndex(0)
        setcomment('')
        setcustaddr('')
        setItems(new Array(0).fill({}))
        setshipaddrcheckb(false)
        setsavepopup({ show: true, data: 'Held' })
        setTimeout(() => {
          setsavepopup({ show: false })
        }, 3000)
        rtyperef.current.focus()
        navigate('/receipt/new', { state: { from: 'home' } })
      } catch (err) {
        window.electron.ipcRenderer.send('test', `error while holding: ${err}`)
      }
    }
  }
  // const [invoiceshow, setis] = useState(true)

  const printhandler = async () => {
    window.electron.ipcRenderer.send('test', 'at start of printhandler++++++++++++++++++++++++++')
    try {
      const result1 = await window.electron.ipcRenderer.invoke('request-data', {
        type: 'firmdata'
      })
      if (!result1.status) {
        throw result1.error
      }
      const newarr = items.reduce((acc, item) => {
        if (Object.keys(item).length != 0) {
          acc.push(item)
        }
        return acc
      }, [])
      window.electron.ipcRenderer.send('test', `printing ----+==: ${JSON.stringify(result1.data)}`)
      const result = result1.data[0]
      const invoiceinfo = {
        firmname: result.name,
        firmaddr: result.addr,
        firmstate: result.state,
        firmstatecode: result.statecode,
        firmgstin: result.gstin,
        firmemail: result.email,
        firmphoneno: result.phoneno,
        bankname: result.bankname,
        branch: result.branch,
        bankaccn: result.bankaccno,
        ifsccode: result.ifsccode,
        invoiceno: `HA/${givethisfy().toString().slice(2) - 1}-${givethisfy().toString().slice(2)}/
        ${new Date().getMonth() + 1}/${receipt_counter.slice(4)}`,
        items: newarr,
        billtoname: custfullname,
        billtoaddr: custaddr,
        billtogstin: custgstin,
        shiptoname: shipfname,
        shiptoaddr: shipaddr,
        shipvehicle: shipvehicleno,
        invoicetype: receipttype,
        billtostatewithcode: custstatewithcode
      }
      if (optype === 'new') {
        invoiceinfo.invoicedate = time.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })
      } else if (optype === 'update') {
        invoiceinfo.invoicedate = state.row.createddate
      }
      window.electron.ipcRenderer.send(
        'test',
        `printing invoiceinfo____????__----+==: ${JSON.stringify(invoiceinfo)}`
      )

      const invoicehtml = ReactDOMServer.renderToString(<Invoicedata invoiceinfo={invoiceinfo} />)
      window.electron.ipcRenderer.send(
        'test',
        `printing invoicehtml//////: ${JSON.stringify(invoicehtml)}`
      )
      const originalContents = document.body.innerHTML
      document.body.innerHTML = invoicehtml

      window.print()
      document.body.innerHTML = originalContents
      window.electron.ipcRenderer.send('test', `in print handler, here before pendingfunc???????`)
      // pendingfunc(optype === 'new' ? 'save' : 'update')
      window.electron.ipcRenderer.send('test', `in print handler, here after pendingfunc???????`)

      window.location.reload()

      // navigate('/receipt/invoice', { state: { data: invoiceinfo } })
    } catch (error) {
      window.electron.ipcRenderer.send(
        'test',
        `Error occured in NewInvoice.jsx while requesting firmdata, ${error.message}`
      )
    }
  }

  const custDialogBackBtnRef = useRef(null)

  return (
    <div id="thisinvoice" className="flex items-stretch h-full ">
      <div className="flex items-stretch w-10/12 h-full">
        <div className="bg-cyan-950 m-1 p-1 w-6">
          <p className="p-1 mt-20 text-white font-bold" style={{ transform: 'rotate(-90deg)' }}>
            APP
          </p>
          <p className="p-1 mt-10 text-white font-bold" style={{ transform: 'rotate(-90deg)' }}>
            SALES
          </p>
        </div>
        {custinfodialog ? (
          <div>
            <button
              disabled={state.from === 'viewinvdetails'}
              onClick={() => setcustdialog(false)}
              className=" rounded p-1 m-1"
              ref={custDialogBackBtnRef}
            >
              ←Back
            </button>
            <NewCustaccn
              from={'fromreceipt'}
              setcustid={setcustid1}
              setcustgstin={setcustgstin1}
              setcustfullname={setcustfullname1}
              setcustaddr={setcustaddr1}
              setcuststatecode={setcuststatecode1}
              backBtnRef={custDialogBackBtnRef}
            />
          </div>
        ) : (
          <div className="flex w-full">
            <div className="flex flex-col m-1 w-4/5 bg-cyan-50">
              <div className="flex h-1/3 items-end m-1 w-full">
                <div className=" flex flex-col w-4/12">
                  {showpop && <p className="bg-red-400">Some fields are not filled!</p>}
                  <div className="flex bg-cyan-200 p-1 mb-1 border-2 w-3/4">
                    <label className="mr-2 w-max text-right">Receipt Type: </label>
                    <select
                      disabled={state.from === 'viewinvdetails'}
                      ref={rtyperef}
                      value={receipttype}
                      className="rounded h-max border border-black"
                      onChange={(e) => {
                        setreceipttype(e.target.value)
                        window.electron.ipcRenderer.send(
                          'test',
                          `in onchange ${e.target.value}, ${receipttype}`
                        )
                      }}
                    >
                      <option selected value="Sales">
                        Sales
                      </option>
                      <option value="Return">Return</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="bg-cyan-100 border-2 p-1 w-full ">
                    <button
                      disabled={state.from === 'viewinvdetails'}
                      className="underline border border-black"
                      onClick={custbuthandler}
                    >
                      Customer Info
                    </button>
                    <div className="flex flex-col">
                      <div>Bill to GSTIN </div>
                      <input value={custgstin} disabled />
                    </div>
                    <div className="flex flex-col">
                      <div>Bill to Full Name: </div>
                      <input value={custfullname} disabled />
                    </div>
                  </div>
                </div>
                <div className=" ml-1 flex flex-col w-3/12">
                  <div className="bg-cyan-200 border-2 flex mb-1 p-1 flex-col w-full">
                    <div>Bill to Addr: </div>
                    <input className="h-20" value={custaddr} disabled />
                  </div>
                  <div className="bg-cyan-200 border-2 flex p-1 flex-col w-full">
                    <label htmlFor="shipfulln">Ship to Full Name: </label>
                    <input
                      disabled={state.from === 'viewinvdetails'}
                      value={shipfname}
                      onChange={(e) => {
                        setshipfname(e.target.value)
                      }}
                      className="text-sm"
                      type="text"
                    />
                  </div>
                </div>
                <div className="ml-1 flex flex-col w-4/12">
                  <div className="w-full flex">
                    <input
                      disabled={state.from === 'viewinvdetails'}
                      checked={shipaddrcheckb}
                      onChange={() => {
                        if (shipaddrcheckb === true) {
                          setshipaddr('')
                        } else {
                          setshipaddr(custaddr)
                        }
                        setshipaddrcheckb(!shipaddrcheckb)
                      }}
                      className="mr-1"
                      type="checkbox"
                      id="shipcheckb"
                    />
                    <label htmlFor="shipcheckb">Shipping Addr. same as Billing Addr.</label>
                  </div>
                  <div className="bg-cyan-200 border-2 flex mt-1 p-1 flex-col w-11/12">
                    <div>Ship to Addr: </div>
                    <textarea
                      disabled={state.from === 'viewinvdetails'}
                      value={shipaddr}
                      onChange={(e) => setshipaddr(e.target.value)}
                      className="p-1 text-sm max-h-20 min-h-20"
                    />
                  </div>
                  <div className="bg-cyan-200 flex p-1 mt-1 border-2 w-11/12">
                    <label className="w-3/5" htmlFor="shipvehicleno">
                      Shipng. Vehicle No.
                    </label>
                    <input
                      disabled={state.from === 'viewinvdetails'}
                      value={shipvehicleno}
                      onChange={(e) => setshipvehicleno(e.target.value)}
                      className="w-2/5 ml-1 text-sm"
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="mx-1 mb-0 mt-2 pb-0 max-w-4xl max-h-12">
                <div className="flex bg-cyan-600 w-full space-x-0.5">
                  <div className="border border-black text-white px-1 w-1/12">Prod.</div>
                  <div className="border border-black text-white px-1 w-1/12">Pr. Code</div>
                  <div className="border border-black text-white px-1 w-1/12">Qty.</div>
                  <div className="border border-black text-white px-1 w-1/12">MRP ₹</div>
                  <div className="border border-black text-white px-1 w-1/12">Price ₹</div>
                  <div className="border border-black text-white px-1 w-2/12">Amt. ₹</div>
                  <div className="border border-black text-white px-1 w-1/12">Disc. ₹</div>
                  <div className="border border-black text-white px-1 w-1/12">Disc.</div>
                  <div className="border border-black text-white px-1 w-1/12">GST %</div>
                  <div className="border border-black text-white px-1 w-1/12">GST ₹</div>
                  {state.from != 'viewinvdetails' && (
                    <div className="border border-black text-white px-1 w-1/12">Action</div>
                  )}
                </div>
              </div>
              <div className=" bg-white mb-1 mx-1 max-h-52 max-w-4xl overflow-y-auto w-full overflow-x-auto">
                <table className="flex flex-col overflow-x-auto w-full">
                  <tbody className="flex flex-col w-full">
                    {removestate &&
                      items.map((item, index) => {
                        return (
                          <tr className="flex space-x-0.5 overflow-x-auto w-full " key={index}>
                            <td className=" w-1/12 ">
                              <input
                                type="hidden"
                                value={item.inv_id}
                                onChange={(e) => handleInputChange(e, index)}
                              />
                              <input
                                disabled={state.from === 'viewinvdetails'}
                                className="w-full border border-black px-1 text-sm"
                                ref={productCellRef}
                                readOnly
                                type="text"
                                name="product_name"
                                value={item.product_name}
                                onChange={(e) => handleInputChange(e, index)}
                                onKeyDown={(e) => productkeydown(e, index)}
                              />
                            </td>
                            <td className="w-1/12">
                              <input
                                className="w-full border border-black px-1 text-sm"
                                tabIndex={0}
                                disabled
                                type="text"
                                name="product_code"
                                value={item.product_code}
                              />
                            </td>
                            <td className="flex w-1/12">
                              <input
                                disabled={state.from === 'viewinvdetails'}
                                className="w-full border border-black px-1 text-sm text-right"
                                tabIndex={0}
                                type="number"
                                name="quantity"
                                value={item.quantity}
                                onChange={(e) => handleInputChange(e, index)}
                              />
                              <p className="text-xs">{item.unit}</p>
                            </td>
                            <td className="w-1/12">
                              <input
                                className="w-full border border-black px-1 text-sm text-right"
                                disabled
                                type="number"
                                name="mrp"
                                value={item.mrp}
                              />
                            </td>
                            <td className="w-1/12">
                              <input
                                disabled={state.from === 'viewinvdetails'}
                                className="w-full border border-black px-1 text-sm text-right"
                                type="number"
                                name="price"
                                value={item.price}
                                onChange={(e) => handleInputChange(e, index)}
                                onKeyDown={(e) => handlekeydown(e, index)}
                              />
                            </td>
                            <td className="w-2/12">
                              <input
                                className="w-full border border-black px-1 text-sm text-right"
                                disabled
                                type="number"
                                value={(item.price * item.quantity)?.toFixed(2)}
                              />
                            </td>
                            <td className="w-1/12">
                              <input
                                className="w-full border border-black px-1 text-sm text-right"
                                disabled
                                type="number"
                                name="discount"
                                value={((item.mrp - item.price) * item.quantity).toFixed(2)}
                              />
                            </td>
                            <td className="w-1/12">
                              <input
                                className="w-full border border-black px-1 text-sm text-right"
                                disabled
                                type="number"
                                name="discountpercent"
                                value={Math.ceil(((item.mrp - item.price) * 100) / item.mrp)}
                              />
                            </td>
                            <td className="w-1/12">
                              <input
                                className="w-full border border-black px-1 text-sm text-right"
                                disabled
                                type="number"
                                name="gst"
                                value={item.gst}
                              />
                            </td>
                            <td className="w-1/12">
                              <input
                                type="number"
                                disabled
                                className="w-full border border-black px-1 text-sm text-right"
                                value={(((item.price * item.gst) / 100) * item.quantity).toFixed(2)}
                              />
                            </td>
                            {state.from != 'viewinvdetails' && (
                              <td className="w-1/12">
                                <button
                                  className="button w-full"
                                  tabIndex={-1}
                                  onClick={(e) => handleRemoveItem(e, index)}
                                >
                                  Remove
                                </button>
                              </td>
                            )}
                          </tr>
                        )
                      })}
                  </tbody>
                  {state.from != 'viewinvdetails' && (
                    <tfoot>
                      <tr>
                        <td>
                          <button onClick={handleAddItem}>Add Item</button>
                        </td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
              {isModalOpen && state.from != 'viewinvdetails' ? (
                <div className="h-20 w-3/4">
                  <table className="flex flex-col w-full">
                    <tbody className="flex flex-col w-auto" tabIndex={0}>
                      <input
                        tabIndex={-1}
                        ref={ModalWindSearchBar}
                        className="border-4"
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyDown={handleResultListKeyPress}
                      />
                      {searchResults.map((item) => {
                        return (
                          <tr
                            tabIndex={0}
                            key={item.id}
                            className="flex w-auto"
                            // onSelect={handleSelectItem(item)}
                            onClick={() => handleSelectItem(item)}
                            onKeyDown={(e) => handleSearchSelectItem(e, item)}
                          >
                            {/* <input type="hidden" /> */}
                            <td className="border-2 p-1 w-1/12">{item.product_name}</td>
                            {/* <td className="border-2 p-1 m-2">{item.product_code}</td> */}
                            {/* <td className="border-2 p-1 m-2">{item.mrp}</td> */}
                            <td className="border-2 p-1 w-1/12">{item.quantity}</td>
                            {/* <td className="border-2 p-1 m-2">{item.gst}</td> */}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex flex-col items-end max-h-40 overflow-y-auto w-full ">
                  <div className="w-full">
                    <div className="flex flex-col items-start bg-cyan-200 p-1 m-1 border-2 w-1/2">
                      <p>Comments</p>
                      <textarea
                        disabled={state.from === 'viewinvdetails'}
                        className="p-1 mt-1 w-full max-h-14 min-h-14 overflow-y-auto"
                        placeholder="Type Comment here.."
                        value={comment}
                        onChange={(e) => setcomment(e.target.value)}
                      />
                    </div>
                  </div>
                  {state.from === 'viewinvdetails' && (
                    <div className="flex justify-end w-1/2">
                      <button
                        onClick={() => printhandler()}
                        className="bg-cyan-800 text-white font-medium border-2 m-1 p-1 rounded"
                      >
                        Print
                      </button>
                      {/* <button>See Invoice</button> */}
                    </div>
                  )}

                  {state.from != 'viewinvdetails' &&
                    (state.from === 'home' || state.from==='held' ? (
                      <div className="flex justify-end w-1/2">
                        <button
                          onClick={(e) => savebtnhandler(e, 'save')}
                          className="bg-cyan-800 text-white font-medium border-2 m-1 p-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={(e) => savebtnhandler(e, 'hold')}
                          className="bg-cyan-800 text-white font-medium border-2 m-1 p-1 rounded"
                        >
                          Hold
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-end w-1/2">
                        <button
                          onClick={(e) => savebtnhandler(e, 'update')}
                          className="bg-cyan-800 text-white font-medium border-2 m-1 p-1 rounded"
                        >
                          Update
                        </button>
                      </div>
                    ))}
                </div>
              )}
              {/* <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Print Confirmation"
                className="h-80 w-80 mx-auto my-auto bg-blue-100"
              >
                <p>Do you want to print the invoice?</p>
                <button onClick={() => printhandler()}>Print</button>
                <button
                  onClick={() => {
                    pendingfunc(optype === 'new' ? 'save' : 'update')

                    setShowModal(false)
                  }}
                >
                  Cancel
                </button>
              </Modal> */}
              {savepopup.show && <p>Invoice {savepopup.data} Successfully ☑</p>}
            </div>
            <div className="flex flex-col my-1 mr-1 bg-cyan-50 w-1/5">
              <div className="bg-cyan-100 grid grid-rows-2 p-1 mx-1 mt-1 border-2 w-11/12 max-h-44">
                <div>Document Info</div>
                {optype != 'update' && (
                  <div className="flex">
                    <div className="pr-2 w-20 text-right">Time: </div>
                    <div>{time.toLocaleTimeString()}</div>
                  </div>
                )}
                {optype != 'update' && (
                  <div className="flex">
                    <div className="pr-2 w-20 text-right">Date: </div>
                    <div>
                      {time.toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                )}
                {optype === 'update' && (
                  <div className="flex">
                    <div className="pr-2 w-20 text-right">Time Cr.: </div>
                    <div>{state.row.createdtime}</div>
                  </div>
                )}
                {optype === 'update' && (
                  <div className="flex">
                    <div className="pr-2 w-20 text-right">Date Cr.: </div>
                    <div>{state.row.createddate}</div>
                  </div>
                )}
                {optype === 'update' && (
                  <div className="flex">
                    <div className="pr-2 w-20 text-right">Inv. No.: </div>
                    <div>
                      HA/{givethisfy().toString().slice(2) - 1}-{givethisfy().toString().slice(2)}/
                      {new Date().getMonth() + 1}/{state.row.receipt_id.slice(4)}
                    </div>
                  </div>
                )}
                {(state.from === 'home' || state.from==='held') && (
                  <div className="flex">
                    <div className="pr-2 w-20 text-right">Inv. No.: </div>
                    <div>
                      HA/{givethisfy().toString().slice(2) - 1}-{givethisfy().toString().slice(2)}/
                      {new Date().getMonth() + 1}/{receipt_counter.slice(4)}
                    </div>
                  </div>
                )}
                {state.from != 'viewinvdetails' && (
                  <div className="flex">
                    <div className="pr-2 w-20 text-right">Store: </div>
                    <div>Sector 16, Chandigarh</div>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-end bg-cyan-200 p-1 mx-1 mt-1 border-2 w-11/12">
                <div className="flex pr-2">total+Round: </div>
                <div className="text-4xl">{(totalamt + taxamt).toFixed(2)}</div>
              </div>

              <div className="flex w-full  mx-1 mt-1">
                <div className="flex flex-col items-end bg-cyan-200  p-1 w-4/6 border-2">
                  <div className="flex pr-2">total disc.: </div>
                  <div className="text-4xl">{totaldisc.toFixed(2)}</div>
                </div>
                <div className="flex flex-col bg-cyan-200 w-1/5 ml-1 p-1 border-2">
                  <div className="flex pr-1">no. of items: </div>
                  <div>{totalitems}</div>
                </div>
              </div>

              <div className="flex flex-col bg-cyan-400 mx-1 p-1 mt-1 border-2 w-11/12">
                <b className="p-1">Totals</b>
                <div className="flex mt-1">
                  <div className="pr-2 w-28 text-right">Price: ₹</div>
                  <div className="text-right w-24">{totalfloatamt.toFixed(2)}</div>
                </div>
                <div className="flex mt-1">
                  <div className="pr-2 w-28 text-right">GST: ₹</div>
                  <div className="text-right w-24"> {taxamt.toFixed(2)}</div>
                </div>
                <hr />
                <div className="flex mt-1">
                  <div className="pr-2 w-28 text-right">Grand Total: ₹</div>
                  <div className="text-right w-24"> {(totalfloatamt + taxamt).toFixed(2)}</div>
                </div>
                {/* <div className="flex mt-1">
                  <div className="pr-2 w-28 text-right">Round amt.: ₹</div>
                  <div className="text-right w-24">{roundamt.toFixed(2)}</div>
                </div> */}
                {/* <hr />
                <div className="flex mt-1">
                  <div className="pr-2 w-28 text-right">Grand Total: ₹</div>
                  <div className="text-right w-24"> {(totalamt).toFixed(2)}</div>
                </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="bg-cyan-800 w-2/12 flex flex-col h-full">
        {state.from != 'viewinvdetails' && (
          <button onClick={custbuthandler} className="bg-cyan-400 m-1 p-1 rounded">
            Cust info
          </button>
        )}
      </div>
    </div>
  )
}

export default NewInvoice
