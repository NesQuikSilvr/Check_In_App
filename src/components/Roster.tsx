import { useState } from 'react';
import Classroom from './Classroom.tsx';
import { Status, Student } from './Student.tsx'
import { TimerComponent } from './Timer.tsx';

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
                            <td>{student.user_id}</td>
                            <td>{student.first_name}</td>
                            <td>{student.last_name}</td>
                            <td className="roster-row" style={{fontStyle: "italic"}}>
                                {student.getStatus()}
                                {student.getStatus() === Status.CHECKED_OUT && <TimerComponent/>}
                            </td>
                        </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Roster;