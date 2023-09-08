import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.tsx'
import Login from './components/pages/Login.tsx'
import Instructor_User_Page from './components/pages/Instructor_User_Page.tsx'
import Dashboard from './components/pages/Dashboard.tsx'


function App() {

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/user" element={<Instructor_User_Page />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )

  
}

export default App