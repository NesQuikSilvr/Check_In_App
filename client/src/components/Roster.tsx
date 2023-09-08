import { useEffect, useState } from 'react'
import Classroom from './Classroom.tsx'
import { Student, Status, StudentRosterRow } from './Student.tsx'

interface RosterProp {
    classroom: Classroom
    toggleStatus: (user_id: string, status: Status) => void
}

function Roster({classroom, toggleStatus}: RosterProp) {
    const [studentList, setStudentList] = useState<Student[]>([])

    useEffect( () => {
        getRoster(classroom.id)
    }, [classroom])
    
    function checkRoster() {
        return studentList.length === 0 && (
            <>
                <p>No students on roster</p>
            </>
        )
    }

    return (
        <div className="roster">
            <h1>{classroom.name}</h1>
            {checkRoster()}

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
                        studentList.map((student) =>
                            <StudentRosterRow p_student={student} toggleStatus={toggleStatus}/>
                        )
                    }
                </tbody>
            </table>
        </div>
    )

    /* API Requests */
    async function getRoster(id: number) {
        fetch(`http://localhost:5000/classrooms/${id}`)
        .then( response => response.json() )
        .then( data => setStudentList(data) )
    }
}

export default Roster