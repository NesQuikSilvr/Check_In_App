import { useEffect } from 'react'
import Classroom from './Classroom.tsx'
import { Status, StudentRosterRow } from './Student.tsx'

interface RosterProp {
    classroom: Classroom
    toggleStatus: (user_id: string) => void
}

function Roster({classroom, toggleStatus}: RosterProp) {
    
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
                        classroom.students.map((student) =>
                        <tr
                            key={student.user_id}
                            className={student.status === Status.CHECKED_OUT ? "table-warning" : ""}
                        >
                            <StudentRosterRow student={student} toggleStatus={toggleStatus}/>
                        </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Roster