import 'bootstrap/dist/css/bootstrap.min.css'
import './Dashboard.css'

import React from 'react'
import Classroom from '../Classroom'
import { Student, StudentRosterRow } from '../Student'

function Dashboard() {
  const [studentList, setStudentList] = React.useState<Student[]>([])
  const [classrooms, setClassrooms] = React.useState<Classroom[]>([])
  const [selectedClassroom, setSelectedClassroom] = React.useState<Classroom | null>(null)

  React.useEffect( () => {
    getClassrooms()
  }, [])

  React.useEffect( () => {
    getStudents()
  }, [selectedClassroom])

  return (
    <>
      <div className="dash-container">

        <main className="main-content text-white">
          <div style={{display: "flex", justifyContent: "space-between", padding: "0rem 1rem 1rem"}}>
            <h3>{classroomIsSelected()}</h3>
            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
              <input type="search" className="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search" />
            </form>
          </div>

          <div style={{padding: "1rem"}}>
            {handleDisplayClassroom()}
          </div>

        </main>

        <section className="text-bg-dark">
              <h2>Classrooms</h2>
              <hr />
              <ul className="nav nav-pills flex-column mb-auto" style={{paddingBottom: "2rem"}}>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" onClick={ () => {setSelectedClassroom(null)}} >
                    Full Student Roster
                  </a>
                </li>
                {
                  classrooms.map( classroom => 
                    <li className="nav-item" key={classroom.id}>
                      <a className="nav-link text-white" aria-current="page" onClick={ () => {handleSelectClassroom(classroom)} }>
                        {classroom.name}
                      </a>
                    </li>
                  )
                }
                <li className="nav-item">
                  <a className="nav-link text-white" aria-current="page">
                    + Add a Classroom
                  </a>
                </li>
              </ul>
              <hr />
              <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                  <a className="nav-link text-white" aria-current="page">
                    Options
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" aria-current="page">
                    Extras
                  </a>
                </li>
              </ul>
              
              <div className="dropdown">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
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

  /* Functions */
  function classroomIsSelected() {
    if (selectedClassroom === null) {
      return "All Students"
    }
    else {
      return selectedClassroom.name
    }
  }

  function handleSelectClassroom(classroom: Classroom) {
    setSelectedClassroom(classroom)
  }

  function handleDisplayClassroom() {
    if (selectedClassroom === null) {
      return (
        <table className="table table-striped table-hover">
          <thead>
              <tr className="table-dark">
                  <th scope="col">ID</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Status</th>
              </tr>
          </thead>
          <tbody>
              {
                studentList.map( student =>
                  <StudentRosterRow p_student={student} toggleStatus={() => {}} />
                )
              }
          </tbody>
        </table>
      )
    }
    else {
      return (
        <>
          <table className="table table-striped table-hover">
                <thead>
                    <tr className="table-dark">
                      <th scope="col">ID</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                {
                  studentList.map( student =>
                    <StudentRosterRow p_student={student} toggleStatus={() => {}}/>
                  )
                }
                </tbody>
            </table>
        </>
      )
    }
  }

  /* API Requests */
  async function getClassrooms() {
    fetch("http://localhost:5000/classrooms")
    .then( response => response.json() )
    .then( data => { setClassrooms(data) } )
  }

  async function getStudents() {
    if (selectedClassroom === null) {
      fetch("http://localhost:5000/students")
      .then( response => response.json() )
      .then( data => { setStudentList(data) } )
    }
    else {
      console.log("Gotten from class: " + selectedClassroom.name)
      fetch(`http://localhost:5000/classrooms/${selectedClassroom.id}`)
      .then( response => response.json() )
      .then( data => { setStudentList(data) } )
    }
  }
}

export default Dashboard