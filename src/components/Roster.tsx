import { useState } from 'react';
import Student from './Student.tsx'
import Button from './Button.tsx';

interface RosterProp {
    course: string;
    students: Student[];
    onSelectStudent: (item: Student) => void;
}

function Roster({course, students, onSelectStudent}: RosterProp) {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const getMessage = () => {
        return students.length === 0 && (
            <>
                <p>No students on roster</p>
                <Button label="Add a student" onClick={() => console.log("Added student")}/>
            </>
        );
    }

    return (
        <>
            <h1>{course}</h1>
            {getMessage()}
            <ul className="list-group">
                {
                    students.map((student, index) =>
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
        </>
    );
}

export default Roster;