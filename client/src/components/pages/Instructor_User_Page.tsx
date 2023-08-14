import React from 'react'
import Classroom from '../Classroom'
import Roster from '../Roster'
import { Student, Status } from '../Student'


function Instructor_User_Page() {
  const [classrooms, setClassrooms] = React.useState<Classroom[]>([])
  const [studentList, setStudentList] = React.useState<Student[]>([])

  const [displayedClass, setDisplayedClass] = React.useState<Classroom | null>(null)

  React.useEffect( () => {
    getClassrooms()
  }, [])

  return (
    <div className="main">

      {/* Classes dropdown list */}
      <div className="btn-group">
        <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown">
          Classrooms
        </button>
        <ul className="dropdown-menu">
          {
            classrooms.map( classroom =>
              <li key={classroom.id}>
                <a className="dropdown-item" href="#" onClick={() => setDisplayedClass(classroom)}>
                  {classroom.name}
                </a>
              </li>
            )
          }
          <li><hr className="dropdown-divider"/></li>
          <li><a className="dropdown-item" href="#">Show full student list</a></li>
        </ul>
      </div>
      

      {/* roster display */}
      {displayedClass != null && <Roster classroom={displayedClass} toggleStatus={toggleStatus}/>}

    </div>
  )

  /* Callbacks */
  function toggleStatus(id: string) {
    let newList = studentList.map( student => {
      if (student.id === id) {
        if (student.status === Status.PRESENT) {
          student.status = Status.CHECKED_OUT
        }
        else if (student.status === Status.CHECKED_OUT) {
          student.status = Status.PRESENT
        }
      }
      return student
    })
    setStudentList(newList)
  }

  /* API Requests */
  async function getClassrooms() {
    fetch("http://localhost:5000/classrooms")
    .then( response => response.json() )
    .then( data => { setClassrooms(data) } )
  }
}

export default Instructor_User_Page