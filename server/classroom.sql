-- Active: 1690235635829@@127.0.0.1@3306@classrooms

CREATE DATABASE school;
USE school;

CREATE TABLE students(
    `id` VARCHAR(8) PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    `status` ENUM ('PRESENT', 'CHECKED_OUT', 'ABSENT')
);

CREATE TABLE classrooms(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE classroom_student_mapping(
    mapping_id INT AUTO_INCREMENT PRIMARY KEY,
    class_id INT,
    student_id VARCHAR(8) NOT NULL,
    FOREIGN KEY (class_id) REFERENCES classrooms(class_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
);


INSERT INTO students (student_id, first_name, last_name, student_status)
VALUES
    (  "1234", "Johnny",  "Nguyen", "PRESENT" ),
    (  "0022", "Peter",  "Parker", "PRESENT" ),
    (  "1111", "Miles",  "Morales", "PRESENT" ),
    (  "9999", "Gwen",  "Stacy", "PRESENT" ),
    (  "4444", "Peni",  "Parker", "CHECKED_OUT" ),
    (  "2099", "Miguel",  "O'Hara", "ABSENT" );

INSERT INTO classrooms (class_name)
VALUES
    ("Gateway to Tech"),
    ("Math"),
    ("Advisory");

INSERT INTO classroom_student_mapping (class_id, student_id)
    VALUES ( (SELECT class_id FROM classrooms WHERE class_id = 1),
             (SELECT student_id FROM students WHERE student_id = "2099") );

SELECT * FROM students;

ALTER TABLE classrooms
RENAME COLUMN class_name TO name;

SELECT classrooms.class_id, classrooms.class_name
FROM classrooms
WHERE classrooms.class_id = 1;

SELECT * FROM classrooms;

SELECT students.student_id, students.first_name, students.last_name, students.student_status
FROM students
JOIN classroom_student_mapping ON students.student_id = classroom_student_mapping.student_id;

DELETE FROM classrooms WHERE class_id = 6;