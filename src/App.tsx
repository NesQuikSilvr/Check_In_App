import { useState } from 'react'
import Roster from './components/Roster';
import Classroom from './components/Classroom';
import Student from './components/Student';
import './App.css'

const handleSelectStudent = (item: Student) => {
  console.log(item.toString());
}

function handleSelectClassroom(classroom: Classroom) {
  setDisplayedClass(classroom);
}

function setDisplayedClass(classroom: Classroom) {
  console.log(classroom.toString());
}

function App() {
  let students = [
    new Student("Johnny", "Nguyen", "1234", "asdf"),
    new Student("Peter", "Parker", "0022", "poop"),
    new Student("Miles", "Morales", "1111", "butt"),
    new Student("Gwen", "Stacy", "9999", "beep")
  ];


  let class1 = new Classroom("Gateway to Tech");
  class1.setRoster(students);
  class1.addStudent(new Student("Miguel", "O'Hara", "2099", "meep"));
  class1.removeStudent(class1.students[0]);


  let class2 = new Classroom("Math");

  let classrooms = [class1, class2];

  const [displayedClass, setDisplayedClass] = useState<Classroom | null>(null);

  return (
    <div className="main">
      <div className="btn-group">
        <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown">
          Classrooms
        </button>
        <ul className="dropdown-menu">
          {
            classrooms.map( classroom =>
              <li key={classroom.toString()}><a className="dropdown-item" href="#" onClick={() => setDisplayedClass(classroom)}>{classroom.name}</a></li>
            )
          }
          <li><hr className="dropdown-divider"/></li>
          <li><a className="dropdown-item" href="#">Show all classrooms</a></li>
        </ul>
      </div>

      {displayedClass !== null && <Roster classroom={displayedClass} onSelectStudent={handleSelectStudent}/>}

      <form style={{margin: "20px 50px"}}>
        <label>First Name</label>
        <input type="text" id="fname" name="firstname" placeholder="Student first name"/>

        <label>Last Name</label>
        <input type="text" id="lname" name="lastname" placeholder="Student last name"/>

        <label>Classroom</label>
        <select id="country" name="country">
          {
            classrooms.map( classroom =>
              <option key={classroom.toString()} value={classroom.name}>{classroom.name}</option>
            )
          }
        </select>
      
        <input type="submit" value="Add student"/>
      </form>
    </div>
  );
}

export default App;