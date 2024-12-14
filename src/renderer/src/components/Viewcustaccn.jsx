/* eslint-disable prettier/prettier */
import { DataTable } from './DataTable'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

import { Button } from '../@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../@/components/ui/dropdown-menu'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

function Viewcustaccn() {
  const [custdata, setCustdata] = useState([])
  const navigate=useNavigate()

  const columns = [
    // return [
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
        return <div >{row.index + 1}</div>
      }
    },
    {
      accessorKey: 'clientname',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Client Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div >{row.getValue('clientname')}</div>
      }
    },
    {
      accessorKey: 'gstin',
      header: 'GSTIN',
      cell: ({ row }) => {
        return <div >{row.getValue('gstin')}</div>
      }
    },
    {
      accessorKey: 'mobileno',
      header: 'Mobile No.',
      cell: ({ row }) => {
        return <div >{row.getValue('mobileno')}</div>
      }
    },
    {
      accessorKey: 'emailid',
      header: 'Email-Id',
      cell: ({ row }) => {
        return <div >{row.getValue('emailid')}</div>
      }
    },
    {
      accessorKey: 'address',
      header: 'Address',
      cell: ({ row }) => {
        return <div >{row.getValue('address')}</div>
      }
    },
    {
      accessorKey: 'clienttype',
      header: 'clienttype',
      cell: ({ row }) => {
        return <div >{row.getValue('clienttype')}</div>
      }
    },
    {
      accessorKey: 'state',
      header: 'State',
      cell: ({ row }) => {
        return <div >{row.getValue('state')}</div>
      }
    },
    {
      accessorKey: 'notes',
      header: 'Notes',
      cell: ({ row }) => {
        return <div>{row.getValue('notes')}</div>
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
            <DropdownMenuContent align="end" className="bg-slate-100">
              <DropdownMenuItem onClick={() => {navigate('/home/cust/editaddcustomeraccn',{state:{from:'viewcust',data:row.original}})}}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/home/cust/purchasehistory',{state:{filtervalue:[{filter:'clientname',value:row.getValue('clientname')}]}})}>View Purchases</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]

  const abc = async () => {
    try {
      const fetchedData = await window.electron.ipcRenderer.invoke('request-data', {
        type: 'clientdata'
      })
      if (!fetchedData.status) {
        throw fetchedData.error
      }
      const md = convertNumericKeysToString(fetchedData.data)
      setCustdata(md)
    } catch (error) {
      window.electron.ipcRenderer.send('test', `Error occured in Viewcustaccn.jsx,${error}`)
    }
  }
  useEffect(() => {
    abc()
  }, [])

  return (
    <>
      <DataTable columns={columns} data={custdata} filters={['clientname', 'mobileno']} filtervalue={[]} />
    </>
  )
}

export default Viewcustaccn
