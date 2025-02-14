import { useLoaderData } from "react-router";
import { useState } from "react";
import { getDB } from "~/db/getDB";
import NavBarComponent from "~/components/NavBarComponent/NavBarComponent";
import CalendarComponent from "~/components/CalendarComponent/CalendarComponent";

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
          { to: "/employees", title: "Employees" },
          { to: "/timesheets/new", title: "New Timesheet" },
        ]}
      />
      <div>
        <button>Table View</button>
        <button>Calendar View</button>
      </div>
      <article className="mt-20">
        {true ? (
          <div className="flex j-c-c a-i-c">
            <CalendarComponent
              timesheetsAndEmployees={timesheetsAndEmployees}
            />
          </div>
        ) : (
          <></>
        )}
      </article>
    </div>
  );
}
