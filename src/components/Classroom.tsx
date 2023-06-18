import Student from "./Student";

class Classroom {
    name: string;
    students: Student[];

    constructor(name: string) {
        this.name = name;
        this.students = [];
    }

    public toString = () : string => {
        return this.name;
    }
}

export default Classroom;