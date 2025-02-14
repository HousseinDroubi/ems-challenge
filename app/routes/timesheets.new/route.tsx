import { useLoaderData, Form, redirect, useActionData } from "react-router";
import { getDB } from "~/db/getDB";

export async function loader() {
  const db = await getDB();
  const employees = await db.all("SELECT id, full_name FROM employees");
  employees.unshift({ id: 0, full_name: "None" }); // Add none as default
  return { employees };
}

import type { ActionFunction } from "react-router";
import NavBarComponent from "~/components/NavBarComponent/NavBarComponent";
import { useEffect, useState } from "react";
import PopupComponent from "~/components/PopupComponent/PopupComponent";
import { isEndDateGreaterThanStartDate, isValidDate } from "~/functions/date";
import ButtonComponent from "~/components/ButtonComponent/ButtonComponent";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const employee_id = formData.get("employee_id"); // <select /> input with name="employee_id"
  const start_time = formData.get("start_time");
  const end_time = formData.get("end_time");

  if (String(employee_id) === "0") {
    return {
      error_message: "Please choose an employee",
    };
  } else if (!isValidDate(String(start_time))) {
    return {
      error_message: "Invalid start time",
    };
  } else if (!isValidDate(String(end_time))) {
    return {
      error_message: "Invalid start time",
    };
  } else if (
    !isEndDateGreaterThanStartDate(String(start_time), String(end_time))
  ) {
    return {
      error_message: "End time must be greater than start time",
    };
  } else {
    // Send request
    const db = await getDB();
    await db.run(
      "INSERT INTO timesheets (employee_id, start_time, end_time) VALUES (?, ?, ?)",
      [employee_id, start_time, end_time]
    );
  }

  return redirect("/timesheets");
};

export default function NewTimesheetPage() {
  const { employees } = useLoaderData(); // Used to create a select input
  const data = useActionData();

  //! Show error message (if any)
  useEffect(() => {
    if (data)
      setPopupData({
        is_visible: true,
        text: data.error_message,
      });
  }, [data]);

  // ! Initial popup state
  const [popup_data, setPopupData] = useState({
    text: "",
    is_visible: false,
  });
  return (
    <div>
      <NavBarComponent
        pages={[
          { to: "/employees", title: "Employees" },
          { to: "/timesheets", title: "Timesheets" },
        ]}
      />
      <h1>Create New Timesheet</h1>
      <Form method="post">
        <div>
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
        <div>
          <label htmlFor="start_time">Start Time</label>
          <input
            type="datetime-local"
            name="start_time"
            id="start_time"
            required
          />
        </div>
        <div>
          <label htmlFor="end_time">End Time</label>
          <input type="datetime-local" name="end_time" id="end_time" required />
        </div>
        <ButtonComponent title="Create Timesheet" />
      </Form>
      <PopupComponent popup_data={popup_data} setPopupData={setPopupData} />
    </div>
  );
}
