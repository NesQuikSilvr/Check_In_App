import { useState, useEffect } from 'react'
import Roster from './components/Roster'
import Classroom from './components/Classroom'
import { Status, Student } from './components/Student'

function App() {

  /* "Database" */
  const [studentList, setStudentList] = useState<Student[]>([
    { first_name: "Johnny", last_name: "Nguyen", user_id: "1234", status: Status.PRESENT },
    { first_name: "Peter", last_name: "Parker", user_id: "0022", status: Status.PRESENT },
    { first_name: "Miles", last_name: "Morales", user_id: "1111", status: Status.PRESENT },
    { first_name: "Gwen", last_name: "Stacy", user_id: "9999", status: Status.PRESENT },
    { first_name: "Peni", last_name: "Parker", user_id: "4444", status: Status.CHECKED_OUT }
  ])

  const [classrooms, setClassrooms] = useState<Classroom[]>([
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
  useEffect( () => {
    console.log("Student list was updated")
  }, [studentList])

  function updateStudent(user_id: string) {
     setStudentList( prevList =>
      prevList.filter( student => (
        student.user_id == user_id ? student.status = Status.ABSENT
        : student)
      )
    )
  }

  function toggleStatus(user_id: string) {
    let query = studentList.find(student => student.user_id === user_id)
    if (query!.status === Status.PRESENT) {
      query!.status = Status.CHECKED_OUT
    }
    else {
      query!.status = Status.PRESENT
    }

    setStudentList( prevList => prevList.filter(student => student.user_id != "0000"))
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
        {<Roster classroom={classrooms[0]} onSelectStudent={ (student) => {toggleStatus(student.user_id)} }/>}
        {<Roster classroom={classrooms[1]} onSelectStudent={ (student) => {toggleStatus(student.user_id)} }/>}

    </div>
  )
}

export default App