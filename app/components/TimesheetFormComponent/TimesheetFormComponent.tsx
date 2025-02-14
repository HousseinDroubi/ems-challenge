import { Form } from "react-router";
import "./TimesheetComponent.css";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

export default function TimesheetComponent({ employees }: any) {
  return (
    <article>
      <h1 className="mt-20">Create New Timesheet</h1>
      <Form method="post" className="timesheet-form">
        <div className="mt-10">
          <label htmlFor="employees_input_section">
            <select name="employee_id" id="employees_input_section">
              {employees.map((employee: any) => (
                <option value={employee.id} key={employee.id}>
                  {employee.full_name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-10">
          <label htmlFor="start_time">Start Time:</label>
          <input
            type="datetime-local"
            name="start_time"
            id="start_time"
            required
          />
        </div>
        <div className="mt-10">
          <label htmlFor="end_time">End Time:</label>
          <input type="datetime-local" name="end_time" id="end_time" required />
        </div>
        <ButtonComponent title="Create Timesheet" />
      </Form>
    </article>
  );
}
