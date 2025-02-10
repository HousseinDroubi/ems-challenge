import { Form } from "react-router";
import "./EmployeeFormComponent.css";

export default function EmployeeFormComponent() {
  return (
    <Form method="post">
      <div>
        <label htmlFor="full_name">Full Name</label>
        <input type="text" name="full_name" id="full_name" required />
      </div>
      <button type="submit">Create Employee</button>
    </Form>
  );
}
