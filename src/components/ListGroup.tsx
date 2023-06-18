import { useState } from 'react';
import Student from './Student.tsx'

interface Roster {
    course: string;
    students: Student[];
    onSelectStudent: (item: Student) => void;
}

function ListGroup({course, students, onSelectStudent}: Roster) {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const getMessage = () => {
        return students.length === 0 && <p>No item found</p>;
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

export default ListGroup;