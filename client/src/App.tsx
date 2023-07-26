import { useState, useEffect } from 'react'
import Roster from './components/Roster'
import Classroom from './components/Classroom'
import { Status, Student } from './components/Student'

function App() {

  const [classrooms, setClassrooms] = useState<Classroom[]>([])
  const [dbData, setdbData] = useState<Student[]>([])

  useEffect( () => {
    fetch("http://localhost:5000/students")
    .then( response => response.json() )
    .then( data => { setdbData(data) } )
  }, [])

  useEffect( () => {
    fetch("http://localhost:5000/classrooms")
    .then( response => response.json() )
    .then( data => { setClassrooms(data) } )
  }, [])

  useEffect( () => {
    if (classrooms.length > 0) {
      console.log(classrooms);
    }
  }, [classrooms])

  useEffect( () => {
    if (dbData.length > 0) {
      console.log(dbData);
    }
  }, [dbData])

  /* "Database" */
  const [studentList, setStudentList] = useState<Student[]>([
    { id: "1234", first_name: "Johnny", last_name: "Nguyen", status: Status.PRESENT },
    { id: "0022", first_name: "Peter", last_name: "Parker", status: Status.PRESENT },
    { id: "1111", first_name: "Miles", last_name: "Morales", status: Status.PRESENT },
    { id: "9999", first_name: "Gwen", last_name: "Stacy", status: Status.PRESENT },
    { id: "4444", first_name: "Peni", last_name: "Parker", status: Status.CHECKED_OUT },
    { id: "2099", first_name: "Miguel", last_name: "O'Hara", status: Status.ABSENT }
  ])

  const [displayedClass, setDisplayedClass] = useState<Classroom | null>(null)

  /* Data Update Callbacks */

  /* Check out a PRESENT student or check in a CHECKED_OUT student */
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

  return (
    <div className="main">
      {/* API Request Testing */}

      

      {/* Classes dropdown list */}
      {
        classrooms.length > 0 &&
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
          <li><a className="dropdown-item" href="#">Show all classrooms</a></li>
        </ul>
      </div>
      }
      

      {/* roster display */}
      {displayedClass != null && <Roster classroom={displayedClass} toggleStatus={toggleStatus}/>}

    </div>
  )
}

export default App