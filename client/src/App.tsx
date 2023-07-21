import { useState, useEffect } from 'react'
import Roster from './components/Roster'
import Classroom from './components/Classroom'
import { Status, Student } from './components/Student'

function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect( () => {
    fetch("/api").then(
      //response => response.json()
      response => response.text()
    ).then(
      data => {
        //setBackendData(data)
        console.log(data)
      }
    )
    console.log(backendData)
  }, [])

  useEffect(() => {
    console.log(backendData);
  }, [backendData]);

  /* "Database" */
  const [studentList, setStudentList] = useState<Student[]>([
    { first_name: "Johnny", last_name: "Nguyen", user_id: "1234", status: Status.PRESENT },
    { first_name: "Peter", last_name: "Parker", user_id: "0022", status: Status.PRESENT },
    { first_name: "Miles", last_name: "Morales", user_id: "1111", status: Status.PRESENT },
    { first_name: "Gwen", last_name: "Stacy", user_id: "9999", status: Status.PRESENT },
    { first_name: "Peni", last_name: "Parker", user_id: "4444", status: Status.CHECKED_OUT },
    { first_name: "Miguel", last_name: "O'Hara", user_id: "2099", status: Status.ABSENT }
  ])

  const [classrooms] = useState<Classroom[]>([
    {
      id: "1234",
      name: "Gateway to Tech",
      students: studentList
    },
    {
      id: "4321",
      name: "Math",
      students: [studentList[4], studentList[2]]
    }
  ])

  const [displayedClass, setDisplayedClass] = useState<Classroom | null>(null)

  /* Data Update Callbacks */

  /* Check out a PRESENT student or check in a CHECKED_OUT student */
  function toggleStatus(user_id: string) {
    let newList = studentList.map( student => {
      if (student.user_id === user_id) {
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

  /* Rendering */

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

export default App