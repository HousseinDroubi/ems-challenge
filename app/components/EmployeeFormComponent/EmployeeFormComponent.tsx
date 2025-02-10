import { Form } from "react-router";
import "./EmployeeFormComponent.css";
import InputTextComponent from "../InputTextComponent/InputTextComponent";
import { useEffect, useState } from "react";

export default function EmployeeFormComponent() {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");

  return (
    <Form method="post">
      <InputTextComponent
        text={text}
        type="text"
        hint="Name"
        onTextChange={(newText: string) => setText(newText)}
      />
      <InputTextComponent
        text={email}
        type="email"
        hint="Email"
        onTextChange={(newText: string) => setEmail(newText)}
      />
      <InputTextComponent
        text={phone_number}
        type="tel"
        hint="Phone Number"
        onTextChange={(newText: string) => setPhoneNumber(newText)}
      />
      <button type="submit">Create Employee</button>
    </Form>
  );
}
