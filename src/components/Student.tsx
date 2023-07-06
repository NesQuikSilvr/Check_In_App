import { useState, useEffect } from 'react';
import { TimerComponent } from './Timer.tsx';
import Button from './Button.tsx';

enum Status {
    PRESENT = "Present",
    ABSENT = "Absent",
    CHECKED_OUT = "Checked out"
}

class Student {
    first_name: string;
    last_name: string;
    user_id: string;
    password: string;
    status: Status;

    constructor(first_name: string, last_name: string, user_id: string, password: string) {
            this.first_name = first_name;
            this.last_name = last_name;
            this.user_id = user_id;
            this.password = password;
            this.status = Status.PRESENT;
    }

    public toString() {
        return this.last_name + ", " + this.first_name + " | " + this.user_id + " | " + this.status;
    }

    public getStatus() {
        return this.status;
    }

    public checkOut() {
        
        this.status = Status.CHECKED_OUT;
    }

    public checkIn() {

        this.status = Status.PRESENT;
    }
}

const StudentRosterRow: React.FC<{ student: Student }> = ({student}) => {
    const [status, setStatus] = useState(student.getStatus());

    const handleCheckIn = () => {
        student.checkIn();
        setStatus(student.getStatus());
    }

    const handleCheckOut = () => {
        student.checkOut();
        setStatus(student.getStatus());
    }

    return (
        <>
            <td>{student.user_id}</td>
            <td>{student.first_name}</td>
            <td>{student.last_name}</td>
            <td className="roster-row" style={{fontStyle: "italic"}}>
                { student.getStatus() }
                { student.getStatus() === Status.CHECKED_OUT
                  ? <Button label="Check In" onClick={ () => handleCheckIn() } />
                  : <Button label="Check Out" onClick={ () => handleCheckOut() } />
                }
            </td>
        </>
    );
}

export { Status, Student, StudentRosterRow }
