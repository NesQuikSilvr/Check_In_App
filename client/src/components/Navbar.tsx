import 'bootstrap/dist/css/bootstrap.min.css'
import './pages/Dashboard.css'

function Navbar() {
  return (
    <>
        <header className="header">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li><a href="/home" className="nav-link px-2 text-secondary">Home</a></li>
                    <li><a href="/user" className="nav-link px-2 text-white">User</a></li>
                </ul>

                <div className="text-end">
                    <a href="/login"><button type="button" className="btn btn-outline-light me-2">Login</button></a>
                    <button type="button" className="btn btn-warning">Sign-up</button>
                </div>
            </div>
        </header>
    </>
  )
}

export default Navbar