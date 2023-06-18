import Student from "./Student";

class Classroom {
    public name: string;
    public students: Student[];

    constructor(name: string) {
        this.name = name;
        this.students = [];
    }

    public setRoster(students: Student[]) {
        this.students = students;
    }

    public addStudent(student: Student) {
        this.students.push(student);
    }
    
    public removeStudent(student: Student) {
        const index = this.students.indexOf(student);
        if (index > -1) {
            this.students.splice(index, 1);
        }
    }

    public toString = () : string => {
        return this.name;
    }
}

export default Classroom;