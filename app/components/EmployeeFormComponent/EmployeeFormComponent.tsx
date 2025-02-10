import { Form } from "react-router";
import "./EmployeeFormComponent.css";
import InputTextComponent from "../InputTextComponent/InputTextComponent";
import { useEffect, useState } from "react";

export default function EmployeeFormComponent() {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");

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
      <button type="submit">Create Employee</button>
    </Form>
  );
}
