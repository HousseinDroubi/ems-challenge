import { useLoaderData } from "react-router";
import { useState } from "react";
import { getDB } from "~/db/getDB";
import NavBarComponent from "~/components/NavBarComponent/NavBarComponent";
import CalendarComponent from "~/components/CalendarComponent/CalendarComponent";
import "./route.css";
import TimesheetComponent from "~/components/TimesheetComponent/TimesheetComponent";
import { convertToBase64 } from "~/functions/file";
import SearchBarComponent from "~/components/SearchBarComponent/SearchBarComponent";

export async function loader() {
  const db = await getDB();
  const timesheetsAndEmployees = await db.all(
    "SELECT timesheets.*, employees.full_name, employees.id AS employee_id, employees.face_image FROM timesheets JOIN employees ON timesheets.employee_id = employees.id"
  );
  const timesheetsAndEmployeesWithImages = timesheetsAndEmployees.map(
    (element) => {
      return { ...element, image: convertToBase64(element.face_image) };
    }
  );

  return { timesheetsAndEmployeesWithImages };
}

export default function TimesheetsPage() {
  const { timesheetsAndEmployeesWithImages } = useLoaderData();
  const [
    filtered_times_and_employees_with_images,
    setTimesheetsAndEmployeesWithImages,
  ] = useState(timesheetsAndEmployeesWithImages);
  const [is_calendar, setIsCalendar] = useState(true);
  const searchForTimesheet = (text: string) => {};

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
        {is_calendar ? (
          <div className="flex j-c-c a-i-c">
            <CalendarComponent
              timesheetsAndEmployees={timesheetsAndEmployeesWithImages}
            />
          </div>
        ) : (
          <div className="flex flex-column">
            <section className="flex j-c-c w-100">
              <SearchBarComponent
                searchFor={searchForTimesheet}
                placeholder={"Search for timesheet"}
              />
            </section>
            <article className="flex timesheets-container mt-10">
              {filtered_times_and_employees_with_images.map(
                (timesheetAndEmployee: any) => (
                  <TimesheetComponent
                    timesheetAndEmployee={timesheetAndEmployee}
                    key={timesheetAndEmployee.id}
                  />
                )
              )}
            </article>
          </div>
        )}
      </article>
    </div>
  );
}
