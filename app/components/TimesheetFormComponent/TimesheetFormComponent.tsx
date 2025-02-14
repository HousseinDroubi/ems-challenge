import { Form } from "react-router";
import "./TimesheetFormComponent.css";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useEffect, useState } from "react";

export default function TimesheetFormComponent({
  employees,
  update,
  timesheet,
}: any) {
  const [selected_option, setSelectedOption] = useState(0);

  useEffect(() => {
    if (update) {
      const index = employees.findIndex(
        (element: any) => element.id === timesheet.employee_id
      );
      setSelectedOption(index);
    }
  }, []);
  return (
    <article className="timesheet-container">
      <h1 className="mt-20">
        {!update ? "Create New Timesheet" : "Update Timesheet"}
      </h1>
      <Form method="post" className="timesheet-form">
        <div className="mt-10">
          <label htmlFor="employees_input_section">
            <select
              name="employee_id"
              id="employees_input_section"
              value={selected_option}
              onChange={(e) => {
                const index = employees.findIndex((employee: any) => {
                  return e.target.value == employee.id;
                });
                setSelectedOption(index);
              }}
            >
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
        <ButtonComponent
          title={!update ? "Create Timesheet" : "Update Timesheet"}
        />
      </Form>
    </article>
  );
}
