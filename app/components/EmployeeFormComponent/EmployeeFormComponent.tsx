import { Form } from "react-router";
import "./EmployeeFormComponent.css";
import InputTextComponent from "../InputTextComponent/InputTextComponent";
import { useState } from "react";

export default function EmployeeFormComponent({ update }: any) {
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [place_of_birth, setPlaceOfBirth] = useState("");

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
        <button type="submit">Create Employee</button>
      </Form>
    </>
  );
}
