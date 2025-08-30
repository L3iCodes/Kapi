import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

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
                    <Navbar />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<Signup />} />
                        <Route path='/products' element={<Product />} />
                    </Routes>
                    </AuthProvider>
                    <Footer />
                </Router>
        </div>
    )
}

export default App
