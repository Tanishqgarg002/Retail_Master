/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom'

function HomeIndex(){

  // const navigate = useNavigate()
  function exithandler() {
    localStorage.setItem('loggedin',false)
    window.electron.ipcRenderer.send('exitapp','exitapp')
    
  }
  return (
    <div style={{ height: '100%' }} className="flex flex-row flex-1 h-8/12">
      <div style={{ height: '100%' }} className="flex flex-col w-10/12">
        {/* <div className="flex flex-row bg-green-100 justify-start">
          <button className="bg-green-400 m-1 p-1 rounded">← Backward</button>
          <button className="bg-green-400 m-1 p-1 rounded">Forward →</button>
          <button className="bg-green-400 m-1 p-1 rounded">Refresh ↻</button>
          <button className="bg-green-400 m-1 p-1 rounded">Stop ▣</button>
        </div> */}
        <div className="p-3 flex flex-row w-full bg-white flex-1 overflow-y-auto">
          <div className='font-work text-9xl font-medium italic'>Welcome </div>
        </div>
        <div className="flex flex-row bg-cyan-50">
          <div className='p-1'>USER: ___</div>
        </div>
      </div>
      <div style={{ height: '100%' }} className="bg-cyan-800 w-2/12 flex flex-col">
        <button onClick={exithandler} className="bg-cyan-500 m-1 p-1 rounded">
          Exit
        </button>
      </div>
    </div>
  )
}

export default HomeIndex
