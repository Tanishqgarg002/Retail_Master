/* eslint-disable prettier/prettier */
import { useLocation } from 'react-router-dom'

function Invoicedata() {
  const { state } = useLocation()
  const invoiceinfo = state.data
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
                <td className="border px-0.5 text-right max-w-12">{item.quantity.toFixed(2)}</td>
                <td className="border px-0.5 max-w-9 break-words">{item.unit}</td>
                <td className="border px-0.5 text-right max-w-16">{item.price.toFixed(2)}</td>
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
            <div className='w-28'>In Words: </div>
            <div className=''>
              {Inwords(
                invoiceinfo.items.reduce((acc, item) => {
                  return (
                    acc +
                    (item.price * item.quantity + item.price * item.quantity * (item.gst / 100) ||
                      0)
                  )
                }, 0)
              ).slice(1)}{' Rupees Only'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Invoicedata
