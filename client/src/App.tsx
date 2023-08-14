import { useState, useEffect } from 'react'
import Classroom from './components/Classroom'
import { Status, Student } from './components/Student'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.tsx'
import Login from './components/pages/Login.tsx'
import Instructor_User_Page from './components/pages/Instructor_User_Page.tsx'


function App() {
  const [displayedClass, setDisplayedClass] = useState<Classroom | null>(null)

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/user" element={<Instructor_User_Page />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )

  
}

export default App