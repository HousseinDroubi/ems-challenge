import { Form, Link } from "react-router";
import "./TimesheetFormComponent.css";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useState } from "react";
import { isNowBetweenStartTimeAndLastTime } from "~/functions/date";

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
      <Form method={update ? "put" : "post"} className="timesheet-form">
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
        {update &&
          isNowBetweenStartTimeAndLastTime(
            timesheet.start_time,
            timesheet.end_time
          ) && (
            <textarea
              name="summary"
              className="mt-20"
              placeholder="Enter summary"
              rows={30}
              cols={100}
              defaultValue={timesheet.summary}
            ></textarea>
          )}

        <br />
        <ButtonComponent
          title={!update ? "Create Timesheet" : "Update Timesheet"}
        />
      </Form>
    </article>
  );
}
