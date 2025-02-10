import { useLoaderData } from "react-router";
import { useState } from "react";
import { getDB } from "~/db/getDB";
import NavBarComponent from "~/components/NavBarComponent/NavBarComponent";

export async function loader() {
  const db = await getDB();
  const timesheetsAndEmployees = await db.all(
    "SELECT timesheets.*, employees.full_name, employees.id AS employee_id FROM timesheets JOIN employees ON timesheets.employee_id = employees.id"
  );

  return { timesheetsAndEmployees };
}

export default function TimesheetsPage() {
  const { timesheetsAndEmployees } = useLoaderData();

  return (
    <div>
      <NavBarComponent
        pages={[
          { to: "/timesheets/new", title: "New Timesheet" },
          { to: "/employees", title: "Employees" },
        ]}
      />
      <div>
        <button>Table View</button>
        <button>Calendar View</button>
      </div>
      {/* Replace `true` by a variable that is changed when the view buttons are clicked */}
      {true ? (
        <div>
          {timesheetsAndEmployees.map((timesheet: any) => (
            <div key={timesheet.id}>
              <ul>
                <li>Timesheet #{timesheet.id}</li>
                <ul>
                  <li>
                    Employee: {timesheet.full_name} (ID: {timesheet.employee_id}
                    )
                  </li>
                  <li>Start Time: {timesheet.start_time}</li>
                  <li>End Time: {timesheet.end_time}</li>
                </ul>
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>
            To implement, see{" "}
            <a href="https://schedule-x.dev/docs/frameworks/react">
              Schedule X React documentation
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}
