import 'bootstrap/dist/css/bootstrap.min.css'
import './Dashboard.css'

import React from 'react'
import Classroom from '../Classroom'

function Dashboard() {
  const [classrooms, setClassrooms] = React.useState<Classroom[]>([])
  const [selectedClassroom, setSelectedClassroom] = React.useState<Classroom | null>(null)

  React.useEffect( () => {
    console.log("Gotten classrooms")
    getClassrooms()
  }, [])

  const classroomIsSelected = () => {
    if (selectedClassroom === null) {
      return "Select a Classroom on the left"
    }
    else {
      return selectedClassroom.name
    }
  }

  return (
    <>
      <div className="dash-container">

        <main className="main-content text-white">
          <h3>{classroomIsSelected()}</h3>
        </main>

        <section className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark">
              <h2>Classrooms</h2>
              <hr />
              <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                  <a href="#" className="nav-link active" aria-current="page">
                    <svg className="bi pe-none me-2" width="16" height="16"><use href="#home"></use></svg>
                    Full Student Roster
                  </a>
                </li>
                {
                  classrooms.map( classroom => 
                    <li className="nav-item">
                      <a href="#" className="nav-link text-white" aria-current="page">
                        <svg className="bi pe-none me-2" width="16" height="16"><use href="#home"></use></svg>
                        {classroom.name}
                      </a>
                    </li>
                  )
                }
                <li className="nav-item">
                  <a href="#" className="nav-link text-white" aria-current="page">
                    <svg className="bi pe-none me-2" width="16" height="16"><use href="#home"></use></svg>
                    + Add a Classroom
                  </a>
                </li>
              </ul>
              <hr />
              <div className="dropdown">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                  <strong>mdo</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                  <li><a className="dropdown-item" href="#">New project...</a></li>
                  <li><a className="dropdown-item" href="#">Settings</a></li>
                  <li><a className="dropdown-item" href="#">Profile</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Sign out</a></li>
                </ul>
              </div>
        </section>

        <aside className="right-sidebar">Right sidebar</aside>

        <footer className="footer">
          <footer className="footer d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div className="col-md-4 d-flex align-items-center">
              <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
                <svg className="bi" width="30" height="24"><use href="#bootstrap"></use></svg>
              </a>
              <span className="mb-3 mb-md-0 text-body-secondary"></span>
            </div>

            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
              <li className="ms-3"><a className="text-body-secondary" href="#"><svg className="bi" width="24" height="24"><use href="#twitter"></use></svg></a></li>
              <li className="ms-3"><a className="text-body-secondary" href="#"><svg className="bi" width="24" height="24"><use href="#instagram"></use></svg></a></li>
              <li className="ms-3"><a className="text-body-secondary" href="#"><svg className="bi" width="24" height="24"><use href="#facebook"></use></svg></a></li>
            </ul>
          </footer>
        </footer>
      </div>
    </>
  )

  /* API Requests */
  async function getClassrooms() {
    fetch("http://localhost:5000/classrooms")
    .then( response => response.json() )
    .then( data => { setClassrooms(data) } )
  }
}

export default Dashboard