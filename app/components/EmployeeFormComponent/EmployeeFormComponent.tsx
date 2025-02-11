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
          title="Enter Full Name"
          hint="e.g. John Doe"
          onTextChange={(newText: string) => setFullName(newText)}
        />
        <InputTextComponent
          text={email}
          type="email"
          title="Enter Email"
          hint="e.g. john@example.com"
          onTextChange={(newText: string) => setEmail(newText)}
        />
        <InputTextComponent
          text={phone_number}
          type="tel"
          title="Enter Phone Number"
          hint="e.g. 01-123-456"
          onTextChange={(newText: string) => setPhoneNumber(newText)}
        />
        <InputTextComponent
          text={date_of_birth}
          type="date"
          title="Enter Date of Birth"
          onTextChange={(newText: string) => setDateOfBirth(newText)}
        />
        <InputTextComponent
          text={place_of_birth}
          type="text"
          title="Enter Place of Birth"
          hint="e.g. Beqaa"
          onTextChange={(newText: string) => setPlaceOfBirth(newText)}
        />
        <InputTextComponent
          text={job_title}
          type="text"
          title="Enter Job Title"
          hint="e.g. Software Developer"
          onTextChange={(newText: string) => setJobTitle(newText)}
        />
        <InputTextComponent
          text={department}
          type="text"
          title="Enter Department"
          hint="e.g. IT"
          onTextChange={(newText: string) => setDepartment(newText)}
        />
        <InputTextComponent
          text={salary}
          type="text"
          title="Enter Salary"
          hint="e.g. 700"
          onTextChange={(newText: string) => setSalary(newText)}
        />
        <InputTextComponent
          text={start_date}
          type="date"
          title="Enter Start Date"
          onTextChange={(newText: string) => setStartDate(newText)}
        />
        <InputTextComponent
          text={end_date}
          type="date"
          title="Enter End Date"
          onTextChange={(newText: string) => setEndDate(newText)}
        />
        <ButtonComponent title="Create Employee" />
      </Form>
    </>
  );
}
