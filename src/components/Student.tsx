import { useState, useEffect } from 'react';
import Button from './Button.tsx';

enum Status {
    PRESENT = "Present",
    ABSENT = "Absent",
    CHECKED_OUT = "Checked out"
}

interface Student {
    first_name: string
    last_name: string
    user_id: string
    status: Status
}

interface RosterRowProp {
    student: Student
    updateStudent: (student: Student) => void
    toggleStatus: (user_id: string) => void
}

const StudentRosterRow = ( prop: RosterRowProp ) => {
    const [student, setStudent] = useState<Student>(prop.student)

    return (
        <>
            <td>{student.user_id}</td>
            <td>{student.first_name}</td>
            <td>{student.last_name}</td>
            <td className="roster-row" style={{fontStyle: "italic"}}>
                <div>
                    { student.status }
                </div>
                <div style={{flexShrink: "0"}}>
                    { student.status === Status.CHECKED_OUT && <Button label="Check In" onClick={ () => {prop.toggleStatus(student.user_id)} } /> }
                    { student.status === Status.PRESENT && <Button label="Check Out" onClick={ () => {prop.toggleStatus(student.user_id)} } /> }
                </div>
            </td>
        </>
    );
}

export { Status, StudentRosterRow }
export type { Student }
