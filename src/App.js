import React, {  useEffect, useMemo, useState } from 'react'
import './styles/App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import Products from './components/Products';
import Search from './components/Search';
import Cart from './components/Cart';
import Login from './components/Login';
import CartBox from './components/CartBox';
import Account from './components/Account';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './slices/userSlice';
import { ToastContainer } from 'react-toastify';
import Protected from './components/Protected';
import UpdatePro from './components/UpdatePro';
import UpdatePassword from './components/UpdatePassword';
import ForgPassword from './components/ForgPassword';
import SetNewPassword from './components/SetNewPassword';

import Shipping from './components/Shipping';
import ConfirmOrder from './components/ConfirmOrder';
import StripeCompo from './components/StripeCompo';
import axios from 'axios';
import WLcompo from './components/WLcompo.jsx';
import OrderPlaced from './components/OrderPlaced';
import MyOrders from './components/MyOrders';
import OrderDetail from './components/OrderDetail';

import DashBoard from './components/DashBoard';
import AdminPro from './components/Admin/AdminPro';
import NewProduct from './components/Admin/NewProduct';
import AdminOrders from './components/Admin/AdminOrders';
import AdminOrderUpdate from './components/Admin/AdminOrderUpdate';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import AdminUsers from './components/Admin/AdminUsers';
import AdminUserUpdate from './components/Admin/AdminUserUpdate';
import AdminReview from './components/Admin/AdminReview';
import AdminComp from './components/Admin/AdminComp';
import AdminUpdateProduct from './components/Admin/AdminUpdateProduct';
const server = process.env.REACT_APP_BACKEND_URL;
const App = () => {

  const [stripeApiKey, setStripeApiKey] = useState("")
  const { isAuthenticated, userData } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useMemo(async function () {
    const { data } = await axios.get(`${server}/stripe/api/key`, { withCredentials: true });
    setStripeApiKey(data.stripeApiKey);
  }, [isAuthenticated]);
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <  >

      <Router >
        <Navbar isAuth={isAuthenticated} />


        <Routes>
          <Route path='/' element={<Homepage />}></Route>

          <Route path='/product/:id' element={<ProductDetail></ProductDetail>}></Route>
          <Route path='/products/:keyword' element={<Products></Products>} />
          <Route path='/products' element={<Products></Products>} />
          <Route path='/Search' element={<Search></Search>} />
          <Route path='/login' element={<Login></Login>} />
          <Route path='/account' element={
            <Protected isAuth={isAuthenticated}>
              <Account />
            </Protected>
          } />
          <Route path='/edit/profile' element={
            <Protected isAuth={isAuthenticated} ><UpdatePro /></Protected>
          } />
          <Route path='/update/password' element={<Protected isAuth={isAuthenticated}><UpdatePassword></UpdatePassword></Protected>} />
          <Route path='/forgot/password' element={<ForgPassword />} />
          <Route path='/password/reset/:resetToken' element={<SetNewPassword />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/wishList' element={<WLcompo />} />
          <Route path='/CartBox' element={<CartBox />} />

          <Route path='/shipping' element={
            <Shipping />
          }
          />
          <Route path='/order/confirm' element={
            <Protected isAuth={isAuthenticated} > <ConfirmOrder /></Protected>
          } />

          <Route path='/payment' element={
            <Protected isAuth={isAuthenticated} >      {stripeApiKey !== "" ? <StripeCompo stripeApiKey={stripeApiKey} /> : null}</Protected>
          } />

          <Route path='/order/success' element={<OrderPlaced />} > </Route>

          <Route path='/orders' element={
            <Protected isAuth={isAuthenticated} ><MyOrders /></Protected>
          } />


          <Route path='/order/:id' element={
            <Protected isAuth={isAuthenticated} >  <OrderDetail /></Protected>} />
          <Route path='/admin' element={
            <Protected isAuth={isAuthenticated} role={userData?.role} isAdmin={true} >
              <AdminComp />
            </Protected>
          }>
            <Route path='dashboard' element={
              <Protected isAuth={isAuthenticated} role={userData?.role} isAdmin={true} children={<DashBoard />} />
            }></Route>
            <Route path='products' element={<Protected isAuth={isAuthenticated} role={userData?.role} isAdmin={true} children={<AdminPro />} />}></Route>
            <Route path='orders' element={<Protected isAuth={isAuthenticated} role={userData?.role} isAdmin={true} children={<AdminOrders />} />}></Route>
            <Route path='users' element={<Protected isAuth={isAuthenticated} role={userData?.role} isAdmin={true} children={<AdminUsers />} />}></Route>
            <Route path='new/product' element={<Protected isAuth={isAuthenticated} role={userData?.role} isAdmin={true} children={<NewProduct />} />}></Route>
            <Route path='update/product/:id' element={<Protected isAuth={isAuthenticated} role={userData?.role} isAdmin={true} children={<AdminUpdateProduct />} />}></Route>
            <Route path='reviews' element={<Protected isAuth={isAuthenticated} role={userData?.role} isAdmin={true} children={<AdminReview />} />}></Route>
            <Route path='update/order/:id' element={<Protected isAuth={isAuthenticated} role={userData?.role} isAdmin={true} children={<AdminOrderUpdate />} />}></Route>
            <Route path='update/user/:id' element={<Protected isAuth={isAuthenticated} role={userData?.role} isAdmin={true} children={<AdminUserUpdate />} />}></Route>
          </Route>
        </Routes>

        <Footer></Footer>
        <ToastContainer

          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"


        ></ToastContainer>

      </Router>
    </>

  )
}

export default App
