/* eslint-disable prettier/prettier */
import ViewReceipt from './ViewReceipt'

  function ReceiptIndex(props){

  return (
    <div style={{ height: '100%' }} className="flex flex-row flex-1 h-8/12">
      <div style={{ height: '100%' }} className="flex flex-col w-10/12">
        <div className="p-3 flex flex-row w-full flex-1 overflow-y-auto">
          <ViewReceipt data={props.data} />
        </div>
        
      </div>
      <div style={{ height: '100%' }} className="bg-cyan-800 w-2/12 flex flex-col">
      
      </div>
    </div>
  )
}

export default ReceiptIndex
