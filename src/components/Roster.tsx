import { useState, useEffect } from 'react'
import Classroom from './Classroom.tsx'
import { Status, Student, StudentRosterRow } from './Student.tsx'

interface RosterProp {
    classroom: Classroom
    onSelectStudent: (item: Student) => void
    toggleStatus: (user_id: string) => void
}

function Roster({classroom, onSelectStudent, toggleStatus}: RosterProp) {
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [studentList, setStudentList] = useState<Student[]>(classroom.students)

    function updateStudent(student: Student) {
        let newList = studentList.filter(e => e.user_id != student.user_id)
        newList.push(student)
        setStudentList(newList)
    }

    function checkRoster() {
        return classroom.students.length === 0 && (
            <>
                <p>No students on roster</p>
            </>
        )
    }

    return (
        <div className="roster">
            <h1>{classroom.name}</h1>
            {checkRoster()}

            <input onChange={() => {console.log("Typing")}}></input>

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
                        classroom.students.map((student, index) =>
                        <tr
                            key={student.user_id}
                            className={selectedIndex === index ? "table-primary" : ""}
                            onClick={() => {
                                setSelectedIndex(index)
                                onSelectStudent(student)
                            }}
                        >
                            <StudentRosterRow student={student} updateStudent={updateStudent} toggleStatus={toggleStatus}/>
                        </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Roster