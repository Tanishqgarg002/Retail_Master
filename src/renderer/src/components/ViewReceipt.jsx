/* eslint-disable prettier/prettier */
import { DataTable } from './DataTable'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

import { Button } from '../@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '../@/components/ui/dropdown-menu'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Checkbox } from '../@/components/ui/checkbox'

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

function ViewReceipt(props) {
  window.electron.ipcRenderer.send('test', ` in ViewReceipt.jsx,${JSON.stringify(props)}`)
  const navigate = useNavigate()
  const { state } = useLocation()
  const [filtervalues, setfvs] = useState([])
  window.electron.ipcRenderer.send('test', ` in ViewReceipt.jsx,22`)

  const completeinvoicehandler = async (row) => {
    window.electron.ipcRenderer.send('test', ` in ViewReceipt.jsx,here bro}`)

    try {
      const result = await window.electron.ipcRenderer.invoke('editinfo', {
        type: 'deleteheldrow',
        value: row.original.id
      })
      if (!result.status) {
        throw result.error
      }
      window.electron.ipcRenderer.send(
        'test',
        ` in ViewReceipt.jsx,held row deleted, ${JSON.stringify(row)}`
      )
    } catch (error) {
      window.electron.ipcRenderer.send('test', `error from ViewReceipt.jsx,${error}`)
    }
    navigate('/receipt/new', { state: { from: 'held', row: row.original } })
    window.electron.ipcRenderer.send('test', ` in ViewReceipt.jsx,here bro}`)
  }

  const [receiptdata, setreceiptdata] = useState([])

  const columns = [
    {
      id: "select",
      header: "Select",
      cell: ({ row }) => (
        <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'receipt_id',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Receipt ID
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const rid=(row.getValue('receipt_id'))
            

            const rd="HA/"+(rid.substring(2,4)-1)+"-"+rid.substring(2,4)+"/"+(row.original.createddate).substring(3,5)+"/"+rid.substring(4)
            return <div >{rd}</div>
      }
    },
    {
      accessorKey: 'createddate',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Date
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div >{row.getValue('createddate')}</div>
      }
    },
    {
      accessorKey: 'receipt_status',
      header: 'Receipt Status',
      cell: ({ row }) => {
        return <div >{row.getValue('receipt_status')}</div>
      }
    },
    {
      accessorKey: 'receipt_type',
      header: 'Receipt Type',
      cell: ({ row }) => {
        return <div >{row.getValue('receipt_type')}</div>
      }
    },
    {
      accessorKey: 'total_items',
      header: 'No. of Items',
      cell: ({ row }) => {
        return <div>{row.getValue('total_items')}</div>
      }
    },
    {
      accessorKey: 'productnames',
      header: 'Product(s)',
      cell: ({ row }) => {
        return <div>{row.getValue('productnames')}</div>
      }
    },
    {
      accessorKey: 'tax_amount',
      header: 'Tax Amt.(₹)',
      cell: ({ row }) => {
        return <div>{row.getValue('tax_amount')}</div>
      }
    },

    {
      accessorKey: 'total_amount',
      header: 'Total+Round(₹)',
      cell: ({ row }) => {
        return <div>{row.getValue('total_amount')}</div>
      }
    },
    {
      accessorKey: 'clientname',
      header: 'Cust. Name',
      cell: ({ row }) => {
        return <div>{`${row.getValue('clientname')}`}</div>
      }
    },

    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-50">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  navigate('/receipt/new', { state: { from: 'editinvoice', row: row.original } })
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  navigate('/receipt/new', { state: { from: 'viewinvdetails', row: row.original } })
                }}
              >
                View details
              </DropdownMenuItem>
              {/* <DropdownMenuItem
                onClick={async() => {
                  try{

                    const result=await window.electron.ipcRenderer.invoke('editinfo',{type:'deletereceipt',value:row.original.receipt_id})
                    if(!result.status){
                      throw result.error
                    }
                    setreceiptdata([...receiptdata.slice(0,row.index),...receiptdata.slice(row.index+1)])
                  }
                  catch(error){
                    window.electron.ipcRenderer.send('test',`Error occured in ViewReceipt.jsx while deleting receipt, ${error.message}`)
                  }

                }}
              >
                Delete
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]

  const columnsheld = [
    {
      id: "select",
      header: "Select",
      cell: ({ row }) => (
        <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'id',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            ID
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div>{row.getValue('id')}</div>
      }
    },
    {
      accessorKey: 'createddate',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Date
            <ArrowUpDown className="ml-1 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div>{row.getValue('createddate')}</div>
      }
    },
    {
      accessorKey: 'receipt_status',
      header: 'Receipt Status',
      cell: ({ row }) => {
        return <div>{row.getValue('receipt_status')}</div>
      }
    },
    {
      accessorKey: 'receipt_type',
      header: 'Receipt Type',
      cell: ({ row }) => {
        return <div>{row.getValue('receipt_type')}</div>
      }
    },
    {
      accessorKey: 'clientname',
      header: 'Cust. Name',
      cell: ({ row }) => {
        return <div>{`${row.getValue('clientname')}`}</div>
      }
    },

    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  completeinvoicehandler(row)
                }}
              >
                Complete Voucher
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]

  const abc = async () => {
    try {
      window.electron.ipcRenderer.send('test', `here__in ViewReceipt.jsx,1`)

      let fetchedData
      if (props.data === 'receipt' || props.data === 'purchasehistory') {
        fetchedData = await window.electron.ipcRenderer.invoke('request-data', {
          type: 'receiptdata'
        })
      } else if (props.data === 'held') {
        fetchedData = await window.electron.ipcRenderer.invoke('request-data', { type: 'helddata' })
      }
      window.electron.ipcRenderer.send('test', `here__in ViewReceipt.jsx,2`)

      if (!fetchedData.status) {
        throw fetchedData.error
      }
      window.electron.ipcRenderer.send('test', `here__in ViewReceipt.jsx,3`)

      const md = convertNumericKeysToString(fetchedData.data)
      window.electron.ipcRenderer.send('test', `here__in ViewReceipt.jsx,4`)
      setreceiptdata(md)
      window.electron.ipcRenderer.send('test', `here__in ViewReceipt.jsx,5,`)
    } catch (error) {
      window.electron.ipcRenderer.send('test', `Error occured in ViewReceipt.jsx,${error}`)
    }
  }

  useEffect(() => {
    if (props.data === 'purchasehistory') {
      setfvs(state.filtervalue)
    }
    abc()
    window.electron.ipcRenderer.send(
      'test',
      `Error occured in ViewReceipt.jsx,${JSON.stringify(filtervalues)}`
    )
  }, [props.data])

  return (
    <>
      <DataTable
        columns={
          props.data === 'receipt' || props.data === 'purchasehistory' ? columns : columnsheld
        }
        data={receiptdata}
        filters={['receipt_id', 'clientname']}
        filtervalue={filtervalues}
      />
    </>
  )
}

export default ViewReceipt
