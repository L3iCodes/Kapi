import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

// Context
import { AuthProvider } from './context/AuthContext'
import { ProductProvider } from './context/ProductContext'
import { useNotification } from './context/NotificationContext'


// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Notification from './components/Notification'
import ScrollToTop from './components/ScrollToTop'


// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Product from './pages/Product'
import ProductInfo from './pages/ProductInfo'
import Cart from './pages/Cart'
import Profile from './pages/Profile'



function App() {
    const {showNotification} = useNotification();

    return (
        <div className='pageWrapper'>
                <Router>
                    <ScrollToTop />
                    <AuthProvider>
                        <ProductProvider>
                                <Navbar />
                                {showNotification && (<Notification />)}
                                <Routes>
                                    <Route path='/' element={<Home />} />
                                    <Route path='/login' element={<Login />} />
                                    <Route path='/signup' element={<Signup />} />
                                    <Route path='/products/:category?' element={<Product />} />
                                    <Route path='/products/item/:productId' element={<ProductInfo />} />
                                    <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                                    <Route path='/profile/:tab?' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                                </Routes>
                        </ProductProvider>
                    </AuthProvider>
                    <Footer />
                </Router>
        </div>
    )
}

export default App
