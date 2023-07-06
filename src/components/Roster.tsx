import { useEffect, useInsertionEffect, useState } from 'react';
import Classroom from './Classroom.tsx';
import { Status, Student, StudentRosterRow } from './Student.tsx'
import { TimerComponent } from './Timer.tsx';
import Button from './Button.tsx';

interface RosterProp {
    classroom: Classroom;
    onSelectStudent: (item: Student) => void;
}

function Roster({classroom, onSelectStudent}: RosterProp) {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    function checkRoster() {
        return classroom.students.length === 0 && (
            <>
                <p>No students on roster</p>
            </>
        );
    }

    return (
        <div className="roster">
            <h1>{classroom.name}</h1>
            {checkRoster()}

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
                            <StudentRosterRow student={ student }/>
                        </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Roster;