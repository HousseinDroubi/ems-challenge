-- This file contains the SQL schema, it drops all tables and recreates them

DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS timesheets;

-- Create employees table
CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    place_of_birth TEXT NOT NULL,
    job_title TEXT NOT NULL,
    department TEXT NOT NULL,
    salary INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    job_level TEXT NOT NULL,
    face_image BLOB NOT NULL,
    id_image BLOB NOT NULL,
    cv_image BLOB NOT NULL,
    cover_letter_image BLOB NOT NULL
);

-- Create timesheets table
CREATE TABLE timesheets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    employee_id INTEGER NOT NULL,
    summary TEXT,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);
