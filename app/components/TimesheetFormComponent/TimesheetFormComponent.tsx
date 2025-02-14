import { Form, Link, useLocation } from "react-router";
import "./TimesheetFormComponent.css";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useEffect, useState } from "react";

export default function TimesheetFormComponent({
  employees,
  update,
  timesheet,
}: any) {
  const [drop_list_id, setDropListId] = useState(
    update
      ? employees.findIndex(
          (element: any) => element.id === timesheet.employee_id
        )
      : 0
  );
  console.log(timesheet);
  return (
    <article className="timesheet-container">
      <h1 className="mt-20">
        {!update ? "Create New Timesheet" : "Update Timesheet"}
      </h1>
      <Form method="post" className="timesheet-form">
        <section>
          <div className="mt-10 flex a-i-c">
            <label htmlFor="employees_input_section">
              <section>
                <select
                  name="employee_id"
                  id="employees_input_section"
                  value={drop_list_id}
                  onChange={(e) => {
                    setDropListId(e.target.value);
                  }}
                >
                  {employees.map((employee: any) => (
                    <option value={employee.id} key={employee.id}>
                      {employee.full_name}
                    </option>
                  ))}
                </select>
                {drop_list_id !== 0 && (
                  <Link to={`/employees/${drop_list_id}`} className="navlink">
                    {"View Employee"}
                  </Link>
                )}
              </section>
            </label>
          </div>
          <div className="mt-10">
            <label htmlFor="start_time">Start Time:</label>
            <input
              defaultValue={update ? timesheet.start_time : undefined}
              type="datetime-local"
              name="start_time"
              id="start_time"
              required
            />
          </div>
          <div className="mt-10">
            <label htmlFor="end_time">End Time:</label>
            <input
              defaultValue={update ? timesheet.end_time : undefined}
              type="datetime-local"
              name="end_time"
              id="end_time"
              required
            />
          </div>
          <ButtonComponent
            title={!update ? "Create Timesheet" : "Update Timesheet"}
          />
        </section>
        <section></section>
      </Form>
    </article>
  );
}
