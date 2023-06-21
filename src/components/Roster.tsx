import { useState } from 'react';
import Classroom from './Classroom.tsx';
import Student from './Student.tsx'
import { Status } from './Student.tsx';
import Button from './Button.tsx';
import Timer from './Timer.tsx';
import '../App.css';

interface RosterProp {
    classroom: Classroom;
    onSelectStudent: (item: Student) => void;
}

function Roster({classroom, onSelectStudent}: RosterProp) {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const checkRoster = () => {
        return classroom.students.length === 0 && (
            <>
                <p>No students on roster</p>
                <Button label="Add a student" onClick={() => console.log("Added student")}/>
            </>
        );
    }

    return (
        <div className="roster">
            <h1>{classroom.name}</h1>
            {checkRoster()}
            <ul className="list-group">
                {
                    classroom.students.map((student, index) =>
                        <li
                            style={{display: "flex"}}
                            className={selectedIndex === index ? "list-group-item roster-row" : "list-group-item roster-row"}
                            key={student.toString()}
                            onClick={() => {
                                setSelectedIndex(index)
                                onSelectStudent(student)
                            }}
                        >
                            {student.toString()}
                            {student.status === Status.Checked_out && <Timer/>}
                        </li>
                    )
                }
            </ul>
        </div>
    );
}

export default Roster;