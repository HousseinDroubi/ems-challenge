import { Form } from "react-router";
import "./EmployeeFormComponent.css";
import InputTextComponent from "../InputTextComponent/InputTextComponent";
import { useState } from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

export default function EmployeeFormComponent({ update }: any) {
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [place_of_birth, setPlaceOfBirth] = useState("");
  const [job_title, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  return (
    <>
      <h1 className="title">
        {update ? "Update Employee" : "Create New Employee"}
      </h1>
      <Form method="post">
        <InputTextComponent
          text={full_name}
          type="text"
          title="Full Name"
          hint="Enter Full Name"
          onTextChange={(newText: string) => setFullName(newText)}
        />
        <InputTextComponent
          text={email}
          type="email"
          title="Email"
          hint="Enter Email"
          onTextChange={(newText: string) => setEmail(newText)}
        />
        <InputTextComponent
          text={phone_number}
          type="tel"
          title="Phone Number"
          hint="Enter Phone Number"
          onTextChange={(newText: string) => setPhoneNumber(newText)}
        />
        <InputTextComponent
          text={date_of_birth}
          type="date"
          title="Date of Birth"
          onTextChange={(newText: string) => setDateOfBirth(newText)}
        />
        <InputTextComponent
          text={place_of_birth}
          type="text"
          title="Place of Birth"
          hint="Enter Place of Birth"
          onTextChange={(newText: string) => setPlaceOfBirth(newText)}
        />
        <InputTextComponent
          text={job_title}
          type="text"
          title="Job Title"
          hint="Enter Job Title"
          onTextChange={(newText: string) => setJobTitle(newText)}
        />
        <InputTextComponent
          text={department}
          type="text"
          title="Department"
          hint="Enter Department"
          onTextChange={(newText: string) => setDepartment(newText)}
        />
        <InputTextComponent
          text={salary}
          type="text"
          title="Salary"
          hint="Enter Salary"
          onTextChange={(newText: string) => setSalary(newText)}
        />
        <InputTextComponent
          text={start_date}
          type="date"
          title="Start Date"
          onTextChange={(newText: string) => setStartDate(newText)}
        />
        <InputTextComponent
          text={end_date}
          type="date"
          title="End Date"
          onTextChange={(newText: string) => setEndDate(newText)}
        />
        <ButtonComponent title="Create Employee" />
      </Form>
    </>
  );
}
