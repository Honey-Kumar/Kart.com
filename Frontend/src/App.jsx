import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import FilterPage from './Pages/FilterPage'
import ProductDetail from './Pages/ProductDetails'
import Signup from './Pages/Signup'
import WishlistPage from './Pages/WishlistPage'
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './ErrorBoundry/Error'
import AccountPage from './Pages/AccountPage'
import Loginpage from './Pages/Login'
import ProtectedRoutes from './ProtectedRoutes'
import ResetPasswordPage from './Pages/ResetPasswordPage'
import Cart from './Pages/Cart'
import ShippingPage from './Pages/ShippingPage'
import ConfirOrderPage from './Pages/ConfirOrderPage'
import PaymentSuccessPage from './Pages/PaymentSuccessPage'
import OrderDetailsPage from './Pages/OrderDetailsPage'
import AdminDashboard from './Pages/AdminDashboard'
import PageNotFound from './Pages/PageNotFound'
import ForgetPassword from './Pages/ForgetPassPage'


function App() {
  return (
    <>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/login' element={<Loginpage />} />
            <Route path='/reset' element={<ForgetPassword />} />
            <Route path='/register' element={<Signup />} />
            <Route path='/wishlist' element={<WishlistPage />} />
            <Route path='/product' element={<FilterPage />} />
            <Route path='/*' element={<PageNotFound />} />
            <Route
              path='/account'
              element={<ProtectedRoutes element={<AccountPage />} />}
            />
            {/* <Route path='/account' element={<AccountPage />} /> */}
            <Route path='/product/:id' element={<ProtectedRoutes element={<ProductDetail />} />} />
            <Route path='/user/password/:token' element={<ProtectedRoutes element={<ResetPasswordPage />} />} />
            <Route path='/cart' element={<ProtectedRoutes element={<ProtectedRoutes element={<Cart />} />} />} />
            <Route path='/shipping' element={<ProtectedRoutes element={<ShippingPage />} />} />
            <Route path='/confirmOrder' element={<ProtectedRoutes element={<ConfirOrderPage />} />} />
            <Route path='/payment/success' element={<ProtectedRoutes element={<PaymentSuccessPage />} />} />
            <Route path='/order/:id' element={<ProtectedRoutes element={<OrderDetailsPage />} />} />
            <Route path='/admin' element={<ProtectedRoutes isAdmin={true} element={<AdminDashboard />} />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </>
  )
}

export default App
