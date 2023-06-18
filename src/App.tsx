import Roster from './components/Roster';
import Classroom from './components/Classroom';
import Student from './components/Student';
//import './App.css'

const handleSelectStudent = (item: Student) => {
  console.log(item.toString());
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

  return (
    <div>
      <ul>
        <li><a className="active" href="#home">Home</a></li>
        <li><a href="#news">News</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#about">About</a></li>
      </ul>

      <div className="container text-center">
        <div className="row">
          <div className="col">
            1 of 3
          </div>
          <div className="col-6">
            2 of 3 (wider)
          </div>
          <div className="col">
            3 of 3
          </div>
        </div>
      </div>

      <div className="btn-group">
        <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          Classrooms
        </button>
        <ul className="dropdown-menu">
          {
            classrooms.map( classroom =>
              <li><a className="dropdown-item" href="#">{classroom.name}</a></li>
            )
          }
          <li><hr className="dropdown-divider"/></li>
          <li><a className="dropdown-item" href="#">Show all classrooms</a></li>
        </ul>
      </div>

      <Roster course={class1.name} students={class1.students} onSelectStudent={handleSelectStudent}/>
      <Roster course={class2.name} students={class2.students} onSelectStudent={handleSelectStudent}/>
    </div>
  );
}

export default App;