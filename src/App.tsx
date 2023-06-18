import ListGroup from './components/ListGroup';
import Student from './components/Student';
import Alert from './components/Alert';
import Button from './components/Button';

function App() {
  let students = [
    new Student("Johnny", "Nguyen", "1234", "asdf"),
    new Student("Peter", "Parker", "0022", "poop"),
    new Student("Miles", "Morales", "1111", "butt")
  ];

  const handleSelectStudent = (item: Student) => {
    console.log(item.toString());
  }

  return (
    <div>
      <Alert>
        <h1>Warning</h1>
        <p>You have not flushed your toilet</p>
      </Alert>

      <Button label="Flush toilet" onClick={() => console.log("Toilet flushed")}/>

      <div className="btn-group">
        <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          Action
        </button>
        <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="#">Action</a></li>
          <li><a className="dropdown-item" href="#">Another action</a></li>
          <li><a className="dropdown-item" href="#">Something else here</a></li>
          <li><hr className="dropdown-divider"/></li>
          <li><a className="dropdown-item" href="#">Separated link</a></li>
        </ul>
      </div>

      <ListGroup course='Gateway to Tech' students={students} onSelectStudent={handleSelectStudent}/>
      <ListGroup course='Math' students={[new Student("Gwen", "Stacy", "9999", "beep")]} onSelectStudent={handleSelectStudent}/>
    </div>
  );
}

export default App;