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
    private status: Status;

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
}

const StudentRosterElement: React.FC<{ student: Student }> = ({student}) => {
    return (
        <>
            {student.toString()}
            {student.getStatus() === Status.CHECKED_OUT && <TimerComponent/>}
        </>
    );
}

export { Status, Student, StudentRosterElement }
