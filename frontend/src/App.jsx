import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'

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
                    </Routes>
                    </AuthProvider>
                    <Footer />
                </Router>
        </div>
    )
}

export default App
