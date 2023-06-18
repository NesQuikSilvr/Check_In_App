class Student {
    first_name: string;
    last_name: string;
    user_id: string;
    password: string;

    constructor(first_name: string, last_name: string, user_id: string, password: string) {
            this.first_name = first_name;
            this.last_name = last_name;
            this.user_id = user_id;
            this.password = password;
    }

    public toString = () : string => {
        return this.last_name + ", " + this.first_name + " | " + this.user_id;
    }
}

export default Student;