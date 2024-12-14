/* eslint-disable prettier/prettier */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import rmlogo from '../assets/rm_logo.webp'

function Login() {
  const navigate = useNavigate()
  const [Usern, setUsern] = useState('')
  const [Passw, setPassw] = useState('')

  const loginhandler = async (event) => {
    event.preventDefault()
    const newu = Usern.trim()
    const newp = Passw.trim()
    const data = { newu, newp }

    console.log(data)
    // IPC to main process, to send request to backend for validation

    try {
      const result = await window.electron.ipcRenderer.invoke('login', data)

      if (result) {
        localStorage.setItem('loggedin', true)
        navigate('/home')
      } else {
        localStorage.setItem('loggedin', false)
        throw new Error('Login failed')
      }
    } catch (e) {
      localStorage.setItem('loggedin', false)
      window.electron.ipcRenderer.send('test', `in Login.jsx result: ,${JSON.stringify(e)}`)
    }
  }

  return (
    <div className='h-screen flex flex-col h-screen'>
      <div className="bg-white flex flex-row sticky top-0 items-center">
        <div className="h-9">
        </div>
      </div>
      <div>
        <div className="flex items-center h-32 bg-pink-900 text-white">
        <img className='w-32 h-32 mr-8' src={rmlogo} alt="gege" />

          <div className="font-bold text-7xl">RETAIL MASTER</div>
        </div>
        <div className="font-work text-pink-900 text-9xl m-3">WELCOME</div>
        <div className="box-border bg-white-100 border-pink-500 shadow-2xl text-black font-medium h-auto w-1/4 mx-auto my-6 p-3">
         
          <form action="" onSubmit={loginhandler}>
            <label htmlFor="usernameid" className="m-3 p-2 text-xl">
              Username
            </label>
            <br />
            <input
              id="usernameid"
              type="text"
              className="w-3/4 m-3 p-2 my-1 border-2 border-pink-100 rounded-xl"
              autoComplete="true"
              required
              placeholder="Username"
              value={Usern}
              onChange={(e) => setUsern(e.target.value)}
            />
            <br />

            <label htmlFor="passwordid" className="m-3 p-2 my-1 text-xl">
              Password
            </label>
            <br />

            <input
              id="passwordid"
              type="password"
              className="w-3/4 m-3 p-2 my-1 mb-2 border-2 border-pink-100 rounded-xl"
              required
              placeholder="Password"
              value={Passw}
              onChange={(e) => setPassw(e.target.value)}
            />
            <br />

            <button
              type="submit"
              // target="_blank"
              className="m-3 p-2 rounded-xl text-pink-900 bg-white focus:bg-pink-900  hover:bg-pink-900 focus:text-white hover:text-white border-2 border-pink-900 focus:border-white hover:border-white"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
