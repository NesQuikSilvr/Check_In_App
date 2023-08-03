import { useState, useEffect } from 'react'
import Roster from './components/Roster'
import Classroom from './components/Classroom'
import { Status, Student } from './components/Student'

function App() {

  const [classrooms, setClassrooms] = useState<Classroom[]>([])
  const [studentList, setStudentList] = useState<Student[]>([])
  const [roster, setRoster] = useState<Student[]>([])

  useEffect( () => {
    getStudent("0022")
  }, [])

  /* useEffect( () => {
    fetch("http://localhost:5000/classrooms")
    .then( response => response.json() )
    .then( data => { setClassrooms(data) } )
  }, []) */

  const [displayedClass, setDisplayedClass] = useState<Classroom | null>(null)

  /* useEffect( () => {
    if (displayedClass !== null) {
      getRoster(displayedClass.id)
      .then( (data) => setRoster(data))
      .catch( (error) => {
        console.error("Error fetching roster data:", error)
      })
    }
  }, [displayedClass]) */

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
  
  async function updateStatus(id: number) {
    fetch("http://localhost:5000/students",
      {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(id)
      },
    )
    .then(response => response.json())
    .then(data => {
      console.log("Response from server: ", data)
    })
    .catch( error => {
      console.error("Error in update POST: ", error)
    })
  }
  
  async function getStudent(id: string) {
    fetch(`http://localhost:5000/students`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json"}
      }
    )
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
  }
}

export default App