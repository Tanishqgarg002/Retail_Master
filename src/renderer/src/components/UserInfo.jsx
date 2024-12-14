/* eslint-disable prettier/prettier */

import { useEffect, useState } from 'react'

function UserInfo() {
  const [optype, setoptype] = useState('show')
  const [showupdate,setshowupdate]=useState(false)
  const [formdata, setformdata] = useState({
    firmname: '',
    firmaddr: '',
    firmstate: '',
    firmgst: '',
    firmemail: '',
    firmmobile: '',
    firmbankn: '',
    firmbankbr: '',
    firmbankacc: '',
    firmbankifsc: ''
  })

  const abc=async()=>{
    try{
      const result=await window.electron.ipcRenderer.invoke('request-data',{type:'firmdata'})
      if(!result.status){
        throw result.error
      }
      window.electron.ipcRenderer.send('test',` in UserInfo.jsx, ${JSON.stringify(result.data)}`)

      setformdata({
        ...formdata,
        firmname:result.data[0].name,
        firmaddr:result.data[0].addr,
        firmstate:(result.data[0].statecode.toString().length===1?"0"+result.data[0].statecode:result.data[0].statecode)+"-"+result.data[0].state.toUpperCase(),
        firmgst:result.data[0].gstin,
        firmemail:result.data[0].email,
        firmmobile:result.data[0].phoneno,
        firmbankn:result.data[0].bankname,
        firmbankbr:result.data[0].branch,
        firmbankacc:result.data[0].bankaccno,
        firmbankifsc:result.data[0].ifsccode
      })
      
    }
    catch(error){
      window.electron.ipcRenderer.send('test',`Error in UserInfo.jsx, ${error.message}`)
    }
  }

  useEffect(()=>{
    abc()
    window.electron.ipcRenderer.send('test',`__________== in UserInfo.jsx, ${JSON.stringify(formdata)}`)

  },[])

  const updatehandler=async(e)=>{
    e.preventDefault()
      try{
        const result=await window.electron.ipcRenderer.invoke('editinfo',{type:'firminfo',value:formdata})
        if(!result.status){
          throw result.error
        }
        setformdata({
          ...formdata,
          firmname:'',
          firmaddr:'',
          firmstate:'',
          firmgst:'',
          firmemail:'',
          firmmobile:'',
          firmbankn:'',
          firmbankbr:'',
          firmbankacc:'',
          firmbankifsc:''
        })
        setshowupdate(true)
        setoptype('show')
        abc()
        setTimeout(() => {
          setshowupdate(false)
        }, 3000);
      }
      catch(error){
        window.electron.ipcRenderer.send('test',`Error in UserInfo.jsx while updating firminfo, ${error.message}`)
      }
  }

  return (
    <div>
      <div>
        <input checked={optype==='edit'} type="radio" id='optype' onClick={()=>{optype==='edit'?setoptype('show'):setoptype('edit')}} />
        <label htmlFor="optype">Edit</label>
      </div>
      <form onSubmit={(e)=>updatehandler(e)} className="grid grid-cols-3 gap-4 bg-cyan-50 p-1">
        <div className="flex flex-col">
          <label htmlFor="firmname" className="m-2 p-2 text-lg">Firm Name: </label>
          <input
          disabled={optype==='show'}
          required
            className="w-3/4 m-2 p-2 my-1 border-2 border-cyan-500 rounded-xl"
            type="text"
            id="firmname"
            value={formdata.firmname}
            onChange={(e) => setformdata({ ...formdata, firmname: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label className="m-2 p-2 text-lg" htmlFor="firmaddr">
            Firm Addr.:
          </label>
          <input
          disabled={optype==='show'}
          required
            className="w-3/4 m-2 p-2 my-1 border-2 border-cyan-500 rounded-xl"
            type="text"
            id="firmaddr"
            value={formdata.firmaddr}
            onChange={(e) => setformdata({ ...formdata, firmaddr: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="state" className="m-2 p-2 text-lg">
            State
          </label>
          <select
          disabled={optype==='show'}
          required
            id="state"
            value={formdata.firmstate}
            onChange={(e) => {
              setformdata({ ...formdata, firmstate: e.target.value })
            }}
            className="w-3/4 m-2 p-2 my-1 border-2 border-cyan-500 rounded-xl"
            autoComplete="true"
          >
            <option value={''}>Select State</option>
            <option value={'01-JAMMU AND KASHMIR'}>01-JAMMU AND KASHMIR</option>
            <option value={'02-HIMACHAL PRADESH'}>02-HIMACHAL PRADESH</option>
            <option value={'03-PUNJAB'}>03-PUNJAB</option>
            <option value={'04-CHANDIGARH'}>04-CHANDIGARH</option>
            <option value={'05-UTTARAKHAND'}>05-UTTARAKHAND</option>
            <option value={'06-HARYANA'}>06-HARYANA</option>
            <option value={'07-DELHI'}>07-DELHI</option>
            <option value={'08-RAJASTHAN'}>08-RAJASTHAN</option>
            <option value={'09-UTTAR PRADESH'}>09-UTTAR PRADESH</option>
            <option value={'10-BIHAR'}>10-BIHAR</option>
            <option value={'11-SIKKIM'}>11-SIKKIM</option>
            <option value={'12-ARUNACHAL PRADESH'}>12-ARUNACHAL PRADESH</option>
            <option value={'13-NAGALAND'}>13-NAGALAND</option>
            <option value={'14-MANIPUR'}>14-MANIPUR</option>
            <option value={'15-MIZORAM'}>15-MIZORAM</option>
            <option value={'16-TRIPURA'}>16-TRIPURA</option>
            <option value={'17-MEGHALAYA'}>17-MEGHALAYA</option>
            <option value={'18-ASSAM'}>18-ASSAM</option>
            <option value={'19-WEST BENGAL'}>19-WEST BENGAL</option>

            <option value={'20-JHARKHAND'}>20-JHARKHAND</option>
            <option value={'21-ODISHA'}>21-ODISHA</option>
            <option value={'22-CHATTISGARH'}>22-CHATTISGARH</option>
            <option value={'23-MADHYA PRADESH'}>23-MADHYA PRADESH</option>
            <option value={'24-GUJARAT'}>24-GUJARAT</option>
            <option value={'26-DADRA AND NAGAR HAVELI AND DAMAN AND DIU'}>
              26-DADRA AND NAGAR HAVELI AND DAMAN AND DIU
            </option>
            <option value={'27-MAHARASHTRA'}>27-MAHARASHTRA</option>
            <option value={'29-KARNATAKA'}>29-KARNATAKA</option>

            <option value={'30-GOA'}>30-GOA</option>
            <option value={'31-LAKSHADWEEP'}>31-LAKSHADWEEP</option>
            <option value={'32-KERELA'}>32-KERELA</option>
            <option value={'33-TAMIL NADU'}>33-TAMIL NADU</option>
            <option value={'34-PUDUCHERRY'}>34-PUDUCHERRY</option>
            <option value={'35-ANDAMAN AND NICOBAR ISLANDS'}>35-ANDAMAN AND NICOBAR ISLANDS</option>
            <option value={'36-TELANGANA'}>36-TELANGANA</option>
            <option value={'37-ANDHRA PRADESH'}>37-ANDHRA PRADESH</option>
            <option value={'38-LADAKH'}>38-LADAKH</option>
            <option value={'97-OTHER TERRITORY'}>97-OTHER TERRITORY</option>
            <option value={'99-CENTRE JURISDICTION'}>99-CENTRE JURISDICTION</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="m-2 p-2 text-lg" htmlFor="firmgst">
            Firm GSTIN:
          </label>
          <input
          disabled={optype==='show'}
          required
            className="w-3/4 m-2 p-2 my-1 border-2 border-cyan-500 rounded-xl"
            type="text"
            id="firmgst"
            value={formdata.firmgst}
            onChange={(e) => setformdata({ ...formdata, firmgst: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label className="m-2 p-2 text-lg" htmlFor="firmemail">
            Firm E-Mail:{' '}
          </label>
          <input
          disabled={optype==='show'}
          required
            className="w-3/4 m-2 p-2 my-1 border-2 border-cyan-500 rounded-xl"
            type="email"
            id="firmemail"
            value={formdata.firmemail}
            onChange={(e) => setformdata({ ...formdata, firmemail: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label className="m-2 p-2 text-lg" htmlFor="firmmobile">
            Firm Mobile No.:
          </label>
          <input
          disabled={optype==='show'}
          required
            className="w-3/4 m-2 p-2 my-1 border-2 border-cyan-500 rounded-xl"
            type="number"
            id="firmmobile"
            value={formdata.firmmobile}
            onChange={(e) => setformdata({ ...formdata, firmmobile: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label className="m-2 p-2 text-lg" htmlFor="firmbank">
            Firm Bank Name:{' '}
          </label>
          <input
          disabled={optype==='show'}
          required
            className="w-3/4 m-2 p-2 my-1 border-2 border-cyan-500 rounded-xl"
            type="text"
            id="firmbank"
            value={formdata.firmbankn}
            onChange={(e) => setformdata({ ...formdata, firmbankn: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label className="m-2 p-2 text-lg" htmlFor="firmbankbranch">
            Firm Bank Branch:{' '}
          </label>
          <input
          disabled={optype==='show'}
          required
            className="w-3/4 m-2 p-2 my-1 border-2 border-cyan-500 rounded-xl"
            type="text"
            id="firmbankbranch"
            value={formdata.firmbankbr}
            onChange={(e) => setformdata({ ...formdata, firmbankbr: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label className="m-2 p-2 text-lg" htmlFor="firmbankacc">
            Firm Bank Accn.:
          </label>
          <input
          disabled={optype==='show'}
          required
            className="w-3/4 m-2 p-2 my-1 border-2 border-cyan-500 rounded-xl"
            type="text"
            id="firmbankacc"
            value={formdata.firmbankacc}
            onChange={(e) => setformdata({ ...formdata, firmbankacc: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label className="m-2 p-2 text-lg" htmlFor="firmbankifsc">
            Firm Bank IFSC:{' '}
          </label>
          <input
          disabled={optype==='show'}
          required
            className="w-3/4 m-2 p-2 my-1 border-2 border-cyan-500 rounded-xl"
            type="text"
            id="firmbankifsc "
            value={formdata.firmbankifsc}
            onChange={(e) => setformdata({ ...formdata, firmbankifsc: e.target.value })}
          />
        </div>
        {/* <div className="flex">
          <label htmlFor="firmstatecode">Firm State Code: </label>
          <input
            type="number"
            id="firmstatecode"
            value={formdata.firmstatecode}
            onChange={(e) => setformdata({ ...formdata, firmstatecode: e.target.value })}
          />
        </div> */}
        {/* <div className="flex">

</div>
<div className="flex">

</div>
<div className="flex">

</div> */}

        {optype==='edit' && <button type='submit' className="rounded bg-cyan-200 w-1/2 p-2 border-2 border-black">Update</button>}
      </form>
        {showupdate && <div>User Info Updated Successfully☑</div>}
      
    </div>
  )
}

export default UserInfo
