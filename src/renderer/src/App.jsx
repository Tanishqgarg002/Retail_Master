/* eslint-disable prettier/prettier */
import { Routes, Route, HashRouter } from 'react-router-dom'
import Login from './components/Login'
import RouteAuth from './components/RouteAuth'
import Home from './components/Home'
import HomeIndex from './components/HomeIndex'
import HomePos from './components/HomePos'
import OutletIndex from './components/OutletIndex'
import Invoice from './components/Invoice'
import HomeCust from './components/HomeCust'
import Viewcustaccn from './components/Viewcustaccn'
import HomeSetting from './components/HomeSetting'
import ReceiptHome from './components/ReceiptHome'
import ReceiptIndex from './components/ReceiptIndex'
import HomeStock from './components/HomeStock'
import ViewInventory from './components/ViewInventory'
import EditInv from './components/EditInv'
import EditaddCustaccn from './components/EditaddCustaccn'
import NewInvoice from './components/NewInvoice'
import Invoicedata from './components/Invoicedata'
import ViewReceipt from './components/ViewReceipt'
import ViewReceiptItemsPurchase from './components/ViewReceiptItemsPurchase'
import UserInfo from './components/UserInfo'
import Insights from './components/Insights'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route
            path="home"
            element={
              <RouteAuth>
                <Home />
              </RouteAuth>
            }
          >
            <Route index element={<HomeIndex />} />
            <Route path="pos" element={<HomePos />}>
              <Route index element={<OutletIndex />} />
              <Route path="receipt" element={<Invoice />} />
            </Route>
            <Route path='stock' element={<HomeStock/>}>
              <Route index element={<ViewInventory/>}/>
              <Route path='editinv' element={<EditInv/>}/>
              <Route path='viewpurchases' element={<ViewReceiptItemsPurchase/>}/>
              <Route path='purchasehistory' element={<ViewReceipt data={'purchasehistory'}/>}/>
            </Route>
            <Route path="cust" element={<HomeCust />}>
              <Route index element={<OutletIndex />} />
              <Route path="editaddcustomeraccn" element={<EditaddCustaccn from={'normalroute'} />} />
              <Route path="viewcustomeraccn" element={<Viewcustaccn />} />
              <Route path='purchasehistory' element={<ViewReceipt data={'purchasehistory'}/>}/>
            </Route>
            <Route path="setting" element={<HomeSetting />}>
              <Route index element={<OutletIndex />} />
              <Route path="userinfo" element={<UserInfo />} />
            </Route>
            <Route path='insights' element={<Insights/>}>
              {/* <Route index element={<OutletIndex/>}/>
              <Route path='insights' element={<Insightscomp/>}/> */}
            </Route>
          </Route>
          <Route
            path="receipt"
            element={
              <RouteAuth>
                <ReceiptHome />
              </RouteAuth>
            }
          >
            <Route index element={<ReceiptIndex data={'receipt'}/>}/>
            <Route path='new' element={<NewInvoice/>}/>
            <Route path='held' element={<ReceiptIndex data={'held'}/>}/>
            <Route path='invoice' element={<Invoicedata/>}/>
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
