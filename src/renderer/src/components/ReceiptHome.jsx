/* eslint-disable prettier/prettier */
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import { useMyContext } from './ContextState'
import rmlogo from '../assets/rm_logo.webp'

// const ReceiptHome=React.memo(function ReceiptHome() {
function ReceiptHome() {
  const location = useLocation()
  const { pathname } = location
  const { rows } = useMyContext()

  const navigate = useNavigate()
  function topbuttonhandler(event) {
    // event.preventDefault()
    const value = event.target.dataset.value
    if (!localStorage.getItem('loggedin')) {
      navigate('/')
    }
    if (value === '' && pathname === '/receipt/') {
      window.electron.ipcRenderer.send('test', 'from ReceiptHOme.jsx ' + pathname)
      navigate('/home/pos')
    } else {
      navigate(`/receipt/${value}`, { state: { from: 'home' } })
    }
  }
  return (
    <div className="h-screen flex flex-col justify-between">
      {/* <div className="bg-white flex sticky top-0 items-center h-12">
         <img src="E:/retail_proj/resources/icon.png" alt="i" /> 
        <p>Sales App-Retail Edition</p>
      </div> */}
      <div className="bg-cyan-50 flex flex-row sticky top-0 items-center">
        <div className="h-9 flex items-center">
          <img className="w-8 h-8 mx-1" src={rmlogo} alt="gege" />
          <p className='text-slate-600 font-medium text-'>Retail Master</p>
        </div>
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="flex">
          <div className="flex w-10/12 bg-cyan-950">
            <button
              disabled={pathname === '/receipt/new'}
              onClick={topbuttonhandler}
              data-value="new"
              className={`w-1/6 ${pathname==='/receipt/new'?'bg-cyan-400':'bg-cyan-500'} m-1 rounded p-3 text-center text-white text-xl`}
            >
              New
            </button>
            <button
              disabled={rows.length === 0}
              onClick={() => {
                try {
                  if (pathname === '/receipt' || pathname === '/receipt/') {
                    rows.forEach(async (item) => {
                      let result = await window.electron.ipcRenderer.invoke('editinfo', {
                        type: 'deletereceipt',
                        value: item.original.receipt_id
                      })
                      if (!result.status) {
                        throw result.error
                      }
                      result = await window.electron.ipcRenderer.invoke('editinfo', {
                        type: 'deletereceiptitems',
                        value: item.original.receipt_id
                      })
                      if (!result.status) {
                        throw result.error
                      }
                    })
                  } else if (pathname === '/receipt/held' || pathname==='/receipt/held/') {
                    rows.forEach(async (item) => {
                      let result = await window.electron.ipcRenderer.invoke('editinfo', {
                        type: 'deleteheldrow',
                        value: item.original.receipt_id
                      })
                      if (!result.status) {
                        throw result.error
                      }
                    })
                  }
                  window.location.reload()
                  // setreceiptdata([...receiptdata.slice(0,row.index),...receiptdata.slice(row.index+1)])
                } catch (error) {
                  window.electron.ipcRenderer.send(
                    'test',
                    `Error occured in ReceiptHome.jsx while deleting receipt(s), ${error.message}`
                  )
                }
              }}
              data-value="delete"
              className={`w-1/6 ${rows.length===0?'bg-cyan-500':'bg-cyan-400'} m-1 rounded p-3 text-center text-xl text-white`}
            >
              Delete
            </button>
            {/* <button
              onClick={topbuttonhandler}
              data-value="print"
              className="w-1/6 bg-red-200 m-1 rounded p-3 text-center text-xl"
            >
              Print
            </button> */}
            <button
              disabled={pathname === '/receipt/held'}
              onClick={topbuttonhandler}
              data-value="held"
              className={`w-1/6  ${pathname==='/receipt/held'?'bg-cyan-400':'bg-cyan-500'} m-1 rounded p-3 text-center text-xl text-white`}
            >
              Held
            </button>
            {/* <button
              onClick={topbuttonhandler}
              data-value="copy"
              className="w-1/6 bg-red-200 m-1 rounded p-3 text-center text-xl"
            >
              Copy
            </button> */}
            {/* <button
              onClick={topbuttonhandler}
              data-value="edit"
              className="w-1/6 bg-red-200 m-1 rounded p-3 text-center text-xl"
            >
              Edit
            </button> */}
            <button
              disabled={pathname === '/receipt/' || pathname === '/receipt'}
              onClick={() => navigate('/receipt/')}
              data-value="cancel"
              className={`w-1/6 ${(pathname === '/receipt/' || pathname === '/receipt')?'bg-cyan-500':'bg-cyan-400'} m-1 rounded p-3 text-center text-xl text-white`}
            >
              Cancel
            </button>
          </div>
          <button
            onClick={topbuttonhandler}
            data-value=""
            tabIndex={-1}
            className="p-3 h-28 w-2/12 bg-cyan-500 text-white font-bold text-4xl text-center text-white"
          >
            SALES
            <br /> APP
          </button>
        </div>
        <div className="h-full">
          <Outlet />
        </div>
        <div className="flex flex-col bg-cyan-100 sticky bottom-0">
          <div>Financial Year: 24-25</div>
          <div>Financial Year: 24-25</div>
        </div>
      </div>
    </div>
  )
}

export default ReceiptHome
