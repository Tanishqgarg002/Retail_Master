/* eslint-disable prettier/prettier */
// 'use client'
import * as React from 'react'

import {
  flexRender,
  // SortingState,
  // ColumnFiltersState,
  getFilteredRowModel,
  getSortedRowModel,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel
} from '@tanstack/react-table'
import { Input } from '../@/components/ui/input'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../@/components/ui/table'
import { Button } from '../@/components/ui/button'
import { useMyContext } from './ContextState'

export function DataTable({ columns, data, filters, filtervalue }) {
  // window.electron.ipcRenderer.send('test', `here__in DataTable.jsx,1${JSON.stringify(filtervalue)}`)

  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const {setrows} = useMyContext()
  const [rowSelection, setRowSelection]=React.useState({})

  // window.electron.ipcRenderer.send('test', `printing filters prop,${filters}`)
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,

    }
  })
  React.useEffect(()=>{
    // window.electron.ipcRenderer.send('test', `printing filters prop,${JSON.stringify(filtervalue)}`)

      // setTimeout(() => {
        
        filtervalue.forEach((item) => {
          table.getColumn(item.filter)?.setFilterValue(item.value)
          // window.electron.ipcRenderer.send('test', `printing filters prop,${table.getColumn(item.filter)?.getFilterValue()}`)
          
        });
      // }, 10);

  },[filtervalue])
  React.useEffect(()=>{
    setrows(table.getFilteredSelectedRowModel().rows)
  },[table.getFilteredSelectedRowModel().rows])

  return (
    <div style={{ height: '550px', maxWidth: '1200px' }} className="bg-white p-3">
      {/*h-3/4*/}
      <div className="flex items-center py-4">
        {filters.map((item,index) => {
          // window.electron.ipcRenderer.send('test',`printing filters prop element,${item}`)

          return (
            <Input
              key={index}
              placeholder={`Filter ${item}`}
              value={table.getColumn(item)?.getFilterValue() ?? ''}
              onChange={(event) => table.getColumn(item)?.setFilterValue(event.target.value)}
              className="max-w-sm mx-2"
            />
          )
        })}
      </div>
      <div
        style={{ maxHeight: '80%', maxWidth: '100%' }}
        className="rounded-md border overflow-y-auto overflow-x-auto"
      >
        {/*h-3/5*/}
        <Table>
          {/* <div className="static"> */}
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
          {/* </div> */}
          {/* <div className="h-full overflow-y-auto max-h-96"> */}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {/* </div> */}
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
