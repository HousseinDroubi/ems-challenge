import { useLoaderData } from "react-router";
import { useState } from "react";
import { getDB } from "~/db/getDB";
import NavBarComponent from "~/components/NavBarComponent/NavBarComponent";
import CalendarComponent from "~/components/CalendarComponent/CalendarComponent";
import "./route.css";

export async function loader() {
  const db = await getDB();
  const timesheetsAndEmployees = await db.all(
    "SELECT timesheets.*, employees.full_name, employees.id AS employee_id FROM timesheets JOIN employees ON timesheets.employee_id = employees.id"
  );

  return { timesheetsAndEmployees };
}

export default function TimesheetsPage() {
  const { timesheetsAndEmployees } = useLoaderData();
  const [is_calendar, setIsCalendar] = useState(true);
  return (
    <div>
      <NavBarComponent
        pages={[
          { to: "/employees", title: "Employees" },
          { to: "/timesheets/new", title: "New Timesheet" },
        ]}
      />
      <div className="flex j-c-c">
        <section className="choices flex a-i-c mt-10">
          <label htmlFor="calendar">Calendar</label>
          <input
            type="radio"
            name="show_events"
            checked={is_calendar}
            onChange={() => {
              setIsCalendar(true);
            }}
            id="calendar"
          />
          <label htmlFor="table">Table</label>
          <input
            checked={!is_calendar}
            type="radio"
            name="show_events"
            onChange={() => {
              setIsCalendar(false);
            }}
            id="table"
          />
        </section>
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
