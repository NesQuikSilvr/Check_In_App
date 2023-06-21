enum Status {
    Present,
    Absent,
    Checked_out
}

class Student {
    first_name: string;
    last_name: string;
    user_id: string;
    password: string;
    status: Status;

    constructor(first_name: string, last_name: string, user_id: string, password: string, status: Status=Status.Present) {
            this.first_name = first_name;
            this.last_name = last_name;
            this.user_id = user_id;
            this.password = password;
            this.status = status;
    }

    public toString = () : string => {
        return this.last_name + ", " + this.first_name + " | " + this.user_id + " | " + Status[this.status];
    }
}

export { Status }
export default Student;