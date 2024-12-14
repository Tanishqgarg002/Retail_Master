/* eslint-disable prettier/prettier */
import { Outlet, useNavigate } from 'react-router-dom'

function HomeStock(){
  const navigate = useNavigate()
  function sidebuttonhandler(event) {
    const value = event.target.dataset.value
    window.electron.ipcRenderer.send('test',value)
    window.electron.ipcRenderer.send('test',localStorage.getItem('loggedin'))

    // if (!localStorage.getItem('loggedin')) {
    //   navigate('/')
    // } else {
      navigate(`/home/stock/${value}`,{state:{from:'normalroute'}})
    // }
  }

  
  

  return (
    <div style={{ height: '100%' }} className="flex flex-row flex-1 h-8/12">
      <div style={{ height: '100%' }} className="flex flex-col w-10/12">
        <div className="flex flex-row justify-start">
          {/* <button className="bg-green-400 m-1 p-1 rounded">← Backward</button> */}
          {/* <button className="bg-green-400 m-1 p-1 rounded">Forward →</button> */}
          <button onClick={()=>{window.location.reload()}} className="btn bg-cyan-400 m-1 p-1 rounded">Refresh ↻</button>
          {/* <button className="bg-green-400 m-1 p-1 rounded">Stop ▣</button> */}
        </div>
        <div className="p-3 flex flex-row w-full flex-1 overflow-y-auto">
          <Outlet />
        </div>
        <div className="flex flex-row bg-cyan-50">
          <div>hello</div>
        </div>
      </div>
      <div style={{ height: '100%' }} className="bg-cyan-900 w-2/12 flex flex-col">
        <button
          data-value="editinv"
          onClick={sidebuttonhandler}
          className="bg-cyan-500 text-white m-1 p-1 rounded"
        >
          Add/Edit Product
        </button>
        
      </div>
    </div>
  )
}

export default HomeStock
