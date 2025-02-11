import { Form } from "react-router";
import "./EmployeeFormComponent.css";
import InputTextComponent from "../InputTextComponent/InputTextComponent";
import { useState } from "react";

export default function EmployeeFormComponent({ update }: any) {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");

  return (
    <>
      <h1 className="title">
        {update ? "Update Employee" : "Create New Employee"}
      </h1>
      <Form method="post">
        <InputTextComponent
          text={text}
          type="text"
          title="Name"
          hint="Enter Name"
          onTextChange={(newText: string) => setText(newText)}
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
          text={date}
          type="date"
          title="Date of Birth"
          onTextChange={(newText: string) => setDate(newText)}
        />
        <button type="submit">Create Employee</button>
      </Form>
    </>
  );
}
