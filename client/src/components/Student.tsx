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
    student: Student
    toggleStatus: (user_id: string) => void
}

const StudentRosterRow = ( prop: RosterRowProp ) => {
    const [student, setStudent] = useState<Student>(prop.student)

    useEffect( () => {
        console.log("Student re-render")
    }, [student])

    return (
        <>
            <td>{student.id}</td>
            <td>{student.first_name}</td>
            <td>{student.last_name}</td>
            <td className="roster-row" style={{fontStyle: "italic"}}>
                <div>
                    { student.status }
                </div>
                <div style={{flexShrink: "0"}}>
                    { student.status === Status.CHECKED_OUT && <TimerComponent/> }
                    {
                        student.status !== Status.CHECKED_OUT &&
                        <Button label="Check Out" onClick={ () => {toggleStatus(student.id)} } />
                    }
                </div>
            </td>
        </>
    )

    /* API Requests */
    async function updateStatus(id: string, status: Status) {
        setStudent({...student, status: status})
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

    function toggleStatus(id: string) {
        if (student.status === Status.ABSENT) {
            updateStatus(id, Status.PRESENT)
        }
        else {
            updateStatus(id, Status.ABSENT)
        }
    }
}

export { Status, StudentRosterRow }
export type { Student }
