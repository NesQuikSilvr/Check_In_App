import { useState } from 'react';
import Button from './Button.tsx';
import { TimerComponent } from './Timer.tsx';

enum Status {
    PRESENT = "Present",
    ABSENT = "Absent",
    CHECKED_OUT = "Checked out"
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
    const [student] = useState<Student>(prop.student)

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
                    { student.status === Status.PRESENT && <Button label="Check Out" onClick={ () => {prop.toggleStatus(student.id)} } /> }
                </div>
            </td>
        </>
    );
}

export { Status, StudentRosterRow }
export type { Student }
