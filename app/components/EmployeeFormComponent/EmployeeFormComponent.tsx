import { Form } from "react-router";
import "./EmployeeFormComponent.css";
import InputTextComponent from "../InputTextComponent/InputTextComponent";

export default function EmployeeFormComponent() {
  return (
    <Form method="post">
      <InputTextComponent />
      <button type="submit">Create Employee</button>
    </Form>
  );
}
