import React from 'react'
import { useState, useEffect } from 'react';
import Button from './Button.tsx';
import { TimerComponent } from './Timer.tsx';

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
        console.log(this.first_name + " checked out")
        this.status = Status.CHECKED_OUT;
    }

    public checkIn() {
        console.log(this.first_name + " checked in")
        this.status = Status.PRESENT;
    }
}

interface RosterRowProp {
    student: Student
}

const StudentRosterRow = ( { student }: RosterRowProp) => {
    const [status, setStatus] = useState(student.getStatus());

    useEffect( () => {
        console.log("set student status")
        student.status = status;
    }, [status])

    return (
        <>
            <td>{student.user_id}</td>
            <td>{student.first_name}</td>
            <td>{student.last_name}</td>
            <td className="roster-row" style={{fontStyle: "italic"}}>
                <div style={{flexGrow: "1", overflow: "hidden"}}>
                    { status }
                </div>
                <div style={{flexShrink: "0"}}>
                    { status === Status.CHECKED_OUT && <Button label="Check In" onClick={ () => setStatus(Status.PRESENT) } /> }
                    { status === Status.PRESENT && <Button label="Check Out" onClick={ () => setStatus(Status.CHECKED_OUT) } /> }
                </div>
            </td>
        </>
    );
}

export { Status, Student, StudentRosterRow }
