import { useEffect, useState } from 'react'
import Button from './Button.tsx'
import { TimerComponent } from './Timer.tsx'

enum Status {
    PRESENT = "PRESENT",
    ABSENT = "ABSENT",
    CHECKED_OUT = "CHECKED_OUT"
}

interface Student {
    id: string
    first_name: string
    last_name: string
    status: Status
}

interface RosterRowProp {
    p_student: Student
    toggleStatus: (user_id: string, status: Status) => void
}

function StudentRosterRow( {p_student, toggleStatus}: RosterRowProp ) {
    const [student, setStudent] = useState<Student>(p_student)

    useEffect( () => {
        setStudent(p_student)
    }, [p_student])

    return (
        <tr key={student.id} className={student.status === Status.CHECKED_OUT ? "table-warning" : ""}>
            <td>{student.id}</td>
            <td>{student.first_name}</td>
            <td>{student.last_name}</td>
            <td className="roster-row" style={{fontStyle: "italic"}}>
                <div>
                    { student.status }
                </div>
                <div style={{flexShrink: "0"}}>
                    { student.status === Status.CHECKED_OUT && <TimerComponent onPress={checkin}/> }
                    {
                        student.status !== Status.CHECKED_OUT &&
                        <Button label="Check Out" onClick={ checkout } />
                    }
                </div>
            </td>
        </tr>
    )

    /* Functions */
    function checkout() {
        updateStatus(student.id, Status.CHECKED_OUT)
    }

    function checkin() {
        updateStatus(student.id, Status.PRESENT)
    }

    /* API Requests */
    async function updateStatus(id: string, status: Status) {
        setStudent({...student, status: status})
        toggleStatus(id, status)
        fetch(`http://localhost:5000/students/${id}`,
            {
                method: "PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify( {status: status} )
            }
        )
        .then(response => response.json())
        .then((data) => {console.log(data)})
    }
}

export { Status, StudentRosterRow }
export type { Student }
