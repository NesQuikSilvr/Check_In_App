import { useState, useEffect } from 'react'
import Roster from './components/Roster'
import Classroom from './components/Classroom'
import { Status, Student } from './components/Student'

function App() {

  const [classrooms, setClassrooms] = useState<Classroom[]>([])
  const [studentList, setStudentList] = useState<Student[]>([])
  const [roster, setRoster] = useState<Student[]>([])
  /* 
  useEffect( () => {
    fetch("http://localhost:5000/students")
    .then( response => response.json() )
    .then( data => { setStudentList(data) } )
  }, [])
  */

  useEffect( () => {
    fetch("http://localhost:5000/classrooms")
    .then( response => response.json() )
    .then( data => { setClassrooms(data) } )
  }, [])

  const [displayedClass, setDisplayedClass] = useState<Classroom | null>(null)

  useEffect( () => {
    if (displayedClass !== null) {
      getRoster(displayedClass.id)
      .then( (data) => setRoster(data))
      .catch( (error) => {
        console.error("Error fetching roster data:", error)
      })
    }
  }, [displayedClass])

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
          <li><a className="dropdown-item" href="#">Show all classrooms</a></li>
        </ul>
      </div>
      

      {/* roster display */}
      {displayedClass != null && <Roster classroom={displayedClass} toggleStatus={toggleStatus}/>}

    </div>
  )
}

async function getRoster(class_id: number): Promise<Student[]> {
  try {
    const response = await fetch("http://localhost:5000/classrooms/" + class_id)
    const students: Student[] = await response.json()

    return students
  } catch (error) {
    console.error("Error fetching classroom roster:", error)
    return []
  }
}

export default App