/* eslint-disable prettier/prettier */
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import rmlogo from '../assets/rm_logo.webp'
// import { useMyContext } from './ContextState'

function Home() {
  const location = useLocation()
  const { pathname } = location
  const navigate = useNavigate()
  // const { isDis, setDis } = useMyContext()
  // const [isDisabled,setDis]=useState('')
  function topbuttonhandler(event) {
    const value = event.target.dataset.value
    // setDis(value)
    const loginstate = localStorage.getItem('loggedin')
    if (!loginstate) {
      navigate('/')
    }
    window.electron.ipcRenderer.send('test', 'from pathname.jsx ' + JSON.stringify(pathname))

    if (value === 'back') {
      const newp = pathname.substring(0, pathname.lastIndexOf('/'))
      window.electron.ipcRenderer.send('test', 'from pathname.jsx ' + JSON.stringify(newp))
      if (newp === '') {
        navigate('/home')
      } else {
        navigate(newp)
      }
    } else {
      navigate(`/home/${value}`)
    }
  }
  return (
    <div className="h-screen flex flex-col h-screen justify-between">
      <div className="bg-cyan-50 flex flex-row sticky top-0 items-center">
        <div className="h-9 flex items-center">
          <img className="w-8 h-8 mx-1" src={rmlogo} alt="gege" />
          <p className="text-slate-600 font-medium text-">Retail Master</p>
        </div>
      </div>
      <div className="flex flex-row sticky top-9">
        <div className="flex flex-row w-10/12 bg-cyan-950">
          <button
            onClick={topbuttonhandler}
            disabled={pathname.substring(0,9) === '/home/pos'}
            data-value="pos"
            className={`w-1/6 ${pathname.substring(0,9) === '/home/pos' ? 'bg-cyan-500 ' : 'bg-cyan-700'}  text-white m-1 rounded p-3 text-center text-xl`}
          >
            <span className="underline">P</span>oint of Sale (POS)
          </button>
          <button
            disabled={pathname.substring(0,11) === '/home/stock'}
            onClick={topbuttonhandler}
            data-value="stock"
            className={`w-1/6 ${pathname.substring(0,11) === '/home/stock' ? 'bg-cyan-500 ' : 'bg-cyan-700'} text-white m-1 rounded p-3 text-center text-xl`}
          >
            Manage Stock
          </button>
          <button
            disabled={pathname.substring(0,10) === '/home/cust'}
            onClick={topbuttonhandler}
            data-value="cust"
            className={`w-1/6 ${pathname.substring(0,10) === '/home/cust' ? 'bg-cyan-500 ' : 'bg-cyan-700'} text-white m-1 rounded p-3 text-center text-xl`}
          >
            Manage C<span className="underline">u</span>stomer Accns
          </button>
          <button
            disabled={pathname.substring(0,13) === '/home/setting'}
            onClick={topbuttonhandler}
            data-value="setting"
            className={`w-1/6 ${pathname.substring(0,13) === '/home/setting' ? 'bg-cyan-500 ' : 'bg-cyan-700'} text-white m-1 rounded p-3 text-center text-xl`}
          >
            S<span className="underline">e</span>ttings
          </button>
          <button
            // disabled={pathname.substring(0,13) === '/home/setting'}
            onClick={topbuttonhandler}
            data-value="insights"
            className="w-1/6 bg-cyan-700 text-white m-1 rounded p-3 text-center text-xl"
          >
            GenAI Insights
          </button>
        </div>
        <button
          onClick={topbuttonhandler}
          data-value="back"
          tabIndex={-1}
          className="p-3 h-28 w-2/12 bg-cyan-700 text-white font-bold text-4xl text-center"
        >
          RETAIL 
          <br /> MASTER
        </button>
      </div>
      <Outlet />
    </div>
  )
}

export default Home
