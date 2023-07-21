--@block
CREATE TABLE Students(
    id VARCHAR(8) PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL
);

--@block
INSERT INTO Students (id, first_name, last_name)
VALUES
    ("abcd1234", "Johnny", "Nguyen"),
    ("12345678", "Joe", "Mama")
WHERE NOT EXISTS (
    SELECT 1
    FROM Students
    WHERE 
)



--@block
SELECT * FROM Students WHERE last_name = "Nguyen";