import { useState } from 'react';
import Classroom from './Classroom.tsx';
import Student from './Student.tsx'
import Button from './Button.tsx';

interface RosterProp {
    classroom: Classroom;
    onSelectStudent: (item: Student) => void;
}

function Roster({classroom, onSelectStudent}: RosterProp) {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const getMessage = () => {
        return classroom.students.length === 0 && (
            <>
                <p>No students on roster</p>
                <Button label="Add a student" onClick={() => console.log("Added student")}/>
            </>
        );
    }

    return (
        <div style={{margin: "20px 100px", width: "75%", alignContent: "center", background: "#ffffff", padding: "25px", borderRadius: "10px"}}>
            <h1>{classroom.toString()}</h1>
            {getMessage()}
            <ul className="list-group">
                {
                    classroom.students.map((student, index) =>
                        <li
                            className={selectedIndex === index ? "list-group-item active" : "list-group-item"}
                            key={student.toString()}
                            onClick={() => {
                                setSelectedIndex(index)
                                onSelectStudent(student)
                            }}
                        >
                            {student.toString()}
                        </li>
                    )
                }
            </ul>
        </div>
    );
}

export default Roster;