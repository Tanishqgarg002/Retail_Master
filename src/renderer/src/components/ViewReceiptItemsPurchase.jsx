/* eslint-disable prettier/prettier */
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { Button } from '../@/components/ui/button'
import { DataTable } from './DataTable'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function convertNumericKeysToString(data) {
  // window.electron.ipcRenderer.send('test', `_____======_in Viewinvaccn.jsx,${JSON.stringify(data)}`)

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

function ViewReceiptItemsPurchase() {
  const navigate = useNavigate()
  const { state } = useLocation()

  const columns = [
    {
      accessorKey: 'Serialno',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Sr. No.
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div>{row.index + 1}</div>
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
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div>{row.getValue('createddate')}</div>
      }
    },
    {
      accessorKey: 'createdtime',
      header: 'Time',
      cell: ({ row }) => {
        return <div>{row.getValue('createdtime')}</div>
      }
    },
    {
      accessorKey: 'receipt_id',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Receipt Id
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const rid = row.getValue('receipt_id')
        // const r=row.original.createddate

        const rd =
          'HA/' +
          (rid.substring(2, 4) - 1) +
          '-' +
          rid.substring(2, 4) +
          '/' +
          row.original.createddate.substring(3, 5) +
          '/' +
          rid.substring(4)
        return <div>{rd}</div>
      }
    },
    {
      accessorKey: 'quantity',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Quantity
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div>{row.getValue('quantity')}</div>
      }
    },
    {
      accessorKey: 'selling_price',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Price(₹)
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div>{row.getValue('selling_price')}</div>
      }
    },
    {
      accessorKey: 'clientname',
      header: 'Cust. Name',
      cell: ({ row }) => {
        return <div>{row.getValue('clientname')}</div>
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
            <DropdownMenuContent className='bg-slate-100 p-2 m-2 rounded' align="end">
              <DropdownMenuItem
                onClick={() => {
                  navigate('/home/stock/purchasehistory', {
                    state: {
                      filtervalue: [{ filter: 'receipt_id', value: row.getValue('receipt_id') }]
                    }
                  })
                }}
              >
                View Receipt
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]
  const [invdata, setinvdata] = useState([])

  const abc = async () => {
    try {
      
      const fetchedData = await window.electron.ipcRenderer.invoke('request-data', {
        type: 'receiptitemspurchasedata',
        value: state.invid
      })
      if (!fetchedData.status) {
        throw fetchedData.error
      }
      // window.electron.ipcRenderer.send('test', `____in Viewinvaccn.jsx,${JSON.stringify(typeof fetchedData)}`)
      const md = convertNumericKeysToString(fetchedData.data)
      // window.electron.ipcRenderer.send('test', `____in Viewinvaccn.jsx this,${JSON.stringify(md)}`)

      setinvdata(md)
    } catch (error) {
      window.electron.ipcRenderer.send(
        'test',
        `Error occured in ViewReceiptItemsPurchase.jsx,${error}`
      )
    }
  }
  useEffect(() => {
    abc()
  }, [])

  return (
    <>
      <DataTable
        columns={columns}
        data={invdata}
        filters={['receipt_id', 'clientname']}
        filtervalue={[]}
      />
    </>
  )
}

export default ViewReceiptItemsPurchase
