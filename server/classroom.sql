-- Active: 1690235635829@@127.0.0.1@3306@classrooms

CREATE DATABASE school;
USE school;

CREATE TABLE students(
    student_id VARCHAR(8) PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    student_status ENUM ('PRESENT', 'CHECKED_OUT', 'ABSENT')
);

CREATE TABLE classrooms(
    class_id INT AUTO_INCREMENT PRIMARY KEY,
    class_name VARCHAR(255) NOT NULL
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
             (SELECT student_id FROM students WHERE student_id = "1234") );

SELECT * FROM students;

SELECT * FROM classrooms;

SELECT * FROM classroom_student_mapping;

DELETE FROM classroom_student_mapping WHERE mapping_id = 3;
