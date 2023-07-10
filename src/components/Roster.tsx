import { useEffect, useState } from 'react';
import Classroom from './Classroom.tsx';
import { Student, StudentRosterRow } from './Student.tsx'

interface RosterProp {
    classroom: Classroom;
    onSelectStudent: (item: Student) => void;
}

let guy = new Student("Peter", "Porker", "1284", "2388")

function Roster({classroom, onSelectStudent}: RosterProp) {
    const [selectedIndex, setSelectedIndex] = useState(-1)

    function checkRoster() {
        return classroom.students.length === 0 && (
            <>
                <p>No students on roster</p>
            </>
        )
    }

    function deleteStudent(user_id: string) {
        classroom.students = classroom.students.filter((student) => student.user_id !== user_id)
        
        console.log(user_id)
        console.log(classroom.students.toString())
    }

    return (
        <div className="roster">
            <h1>{classroom.name}</h1>
            {checkRoster()}

            <input></input>

            <table className="table table-striped table-hover">
                <thead>
                    <tr className="table-dark">
                        <th scope="col">ID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                <tr><StudentRosterRow student={ guy } /></tr>
                    {
                        classroom.students.map((student, index) =>
                        <tr
                            key={student.toString()}
                            className={selectedIndex === index ? "table-primary" : ""}
                            onClick={() => {
                                setSelectedIndex(index)
                                onSelectStudent(student)
                            }}
                        >
                            <StudentRosterRow student={student} />
                        </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

Roster.defaultProps = {
    classroom: new Classroom("Base Classroom")
}

export default Roster;