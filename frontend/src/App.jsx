import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

// Context
import { AuthProvider } from './context/AuthContext'
import { ProductProvider } from './context/ProductContext'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Product from './pages/Product'
import ProductInfo from './pages/ProductInfo'
import Cart from './pages/Cart'

function App() {

    return (
        <div className='pageWrapper'>
                <Router>
                    <AuthProvider>
                        <ProductProvider>
                            <Navbar />
                            <Routes>
                                <Route path='/' element={<Home />} />
                                <Route path='/login' element={<Login />} />
                                <Route path='/signup' element={<Signup />} />
                                <Route path='/products' element={<Product />} />
                                <Route path='/products/:productId' element={<ProductInfo />} />
                                <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                            </Routes>
                        </ProductProvider>
                    </AuthProvider>
                    <Footer />
                </Router>
        </div>
    )
}

export default App
