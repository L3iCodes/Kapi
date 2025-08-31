import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

// Context
import { AuthProvider } from './context/AuthContext'
import { ProductProvider } from './context/ProductContext'

// Components
import Navbar from './components/Navbar'
import Product from './pages/Product'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

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
                            </Routes>
                        </ProductProvider>
                    </AuthProvider>
                    <Footer />
                </Router>
        </div>
    )
}

export default App
