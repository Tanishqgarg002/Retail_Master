/* eslint-disable prettier/prettier */
import { useState } from 'react'

function Insights() {
  const [receiptdata, setrd] = useState(false)
  const [ins, setins] = useState(false)
  const [insins,setinss]=useState(false)
  return (
    <div style={{ height: '100%' }} className="flex flex-row flex-1 h-8/12">
      <div style={{ height: '100%' }} className="flex flex-col w-10/12">
        <div className="p-3 bg-cyan-100 flex flex-col w-full flex-1 overflow-y-auto text-xl">
          <p>Welcome to Generative AI insights for the purchase and stock data</p>
          <div className="flex m-2">
            <button onClick={() => setrd(!receiptdata)}>Feed receipt/Sales Data</button>
            {receiptdata && <p>✔</p>}
          </div>
          <div className="flex m-3">
            <button
              onClick={() => {
                
                setins(true)
                setTimeout(() => {
                  setins(false)
                  setinss(true)
                }, 5000)
              }}
            >
              Give Insights
            </button>
            {ins && <p>🔄</p>}
          </div>
          {insins && (<div className='m-3'>
            <p className='m-3'>
              Product PPC is consistently sold out during the holiday season. Consider increasing
              stock levels by 20% during this period.
            </p>
            <p className='m-3'>
              Customer segment retailers is highly responsive to email marketing campaigns. Consider
              targeting them with personalized offers.
            </p>
            <p className='m-3'>
              Product OPC has been slow-moving for the past three weeks. Consider offering a discount
              to stimulate demand.
            </p>
            <p className='m-3'>
              There is a significant correlation between purchases of product PPC and product PPC1.
              Consider bundling these products for a discount.
            </p>
            <p className='m-3'>
              The average order value for customers in region Haryana is 20% higher than the overall
              average. Explore opportunities to target this region with special promotions.
            </p>
          </div>)}
        </div>
        <div className="flex flex-row bg-cyan-50">
          <div>hello</div>
        </div>
      </div>
      <div style={{ height: '100%' }} className="bg-cyan-900 w-2/12 flex flex-col"></div>
    </div>
  )
}

export default Insights
