import { useState, useEffect } from 'react'
import Roster from './components/Roster'
import Classroom from './components/Classroom'
import { Status, Student } from './components/Student'

function App() {

  const [classrooms, setClassrooms] = useState<Classroom[]>([])
  const [studentList, setStudentList] = useState<Student[]>([])

  useEffect( () => {
    getClassrooms()
  }, [])

  const [displayedClass, setDisplayedClass] = useState<Classroom | null>(null)

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
  
  async function addStudent() {
    const postData = {
      id: "3333",
      first_name: "Peter",
      last_name: "Porker",
      status: Status.PRESENT
    }
  
    fetch("http://localhost:5000/students",
      {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(postData)
      },
    )
    .then(response => response.json())
    .then(data => {
      console.log("Response from server: ", data)
    })
    .catch( error => {
      console.error("Error in student POST: ", error)
    })
  }
}

export default App