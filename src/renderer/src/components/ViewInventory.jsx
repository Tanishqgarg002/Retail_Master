/* eslint-disable prettier/prettier */
import { DataTable } from './DataTable'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

import { Button } from '../@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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

function ViewInventory(){
  const [invdata, setinvdata] = useState([])
  const navigate=useNavigate()

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
        accessorKey: 'product_name',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Product Name
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        // header:"First Name",
        cell: ({ row }) => {
          return <div >{row.getValue('product_name')}</div>
        }
      },
      {
        accessorKey: 'product_code',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Product Code
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => {
          return <div >{row.getValue('product_code')}</div>
        }
      },
      {
        accessorKey: 'gst',
        header: 'GST',
        cell: ({ row }) => {
          return <div >{row.getValue('gst')}</div>
        }
      },
      {
        accessorKey: 'unit',
        header: 'Unit',
        cell: ({ row }) => {
          return <div >{row.getValue('unit')}</div>
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
          return <div >{row.getValue('quantity')}</div>
        }
      },
      {
        accessorKey: 'mrp',
        header: 'MRP(₹)',
        cell: ({ row }) => {
          return <div >{row.getValue('mrp')}</div>
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
                <DropdownMenuItem onClick={() => {navigate('/home/stock/editinv',{state:{from:'viewprod',data:row.original}})}}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/home/stock/viewpurchases',{state:{invid:row.original.id}})}>View Purchases</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        }
      }
    ]

  const abc = async () => {
    try {
      const fetchedData = await window.electron.ipcRenderer.invoke('request-data',{type:'productdata'})
      if(!fetchedData.status){
        throw fetchedData.error
      }
      const md = convertNumericKeysToString(fetchedData.data)
      setinvdata(md)
    } catch (error) {
      window.electron.ipcRenderer.send('test', `Error occured in Viewinvaccn.jsx,${error}`)
    }
  }
  useEffect(() => {
    abc()
  }, [])

  return (
    <>
      <DataTable columns={columns} data={invdata} filters={['product_name', 'product_code']} filtervalue={[]} />
    </>
  )
}

export default ViewInventory
