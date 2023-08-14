import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
        <div>Navbar</div>
        <ul>
            <li>
                <Link to="/user">User</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    </>
  )
}

export default Navbar