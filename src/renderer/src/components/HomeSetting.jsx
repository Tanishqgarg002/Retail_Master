/* eslint-disable prettier/prettier */
import { Outlet, useNavigate } from 'react-router-dom'

function HomeSetting(){
  const navigate=useNavigate()
  return (
    <div style={{ height: '100%' }} className="flex flex-row flex-1 h-8/12">
      <div style={{ height: '100%' }} className="flex flex-col w-10/12">
        {/* <div className="flex flex-row justify-start">
          <button className="bg-green-400 m-1 p-1 rounded">← Backward</button>
          <button className="bg-green-400 m-1 p-1 rounded">Forward →</button>
          <button className="bg-green-400 m-1 p-1 rounded">Refresh ↻</button>
          <button className="bg-green-400 m-1 p-1 rounded">Stop ▣</button>
        </div> */}
        <div className="p-3 flex flex-row w-full flex-1 overflow-y-auto">
          <Outlet />
        </div>
        <div className="flex flex-row bg-cyan-50">
          <div>hello</div>
        </div>
      </div>
      <div style={{ height: '100%' }} className="bg-cyan-900 w-2/12 flex flex-col">
        <button onClick={()=>navigate('/home/setting/userinfo')} className="bg-cyan-500 m-1 p-1 rounded">User info</button>
        <button className="bg-cyan-500 m-1 p-1 rounded">Bill settings</button>
        <button className="bg-cyan-500 m-1 p-1 rounded">About</button>
      </div>
    </div>
  )
}

export default HomeSetting
