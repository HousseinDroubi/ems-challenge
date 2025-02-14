import { useLoaderData } from "react-router";
import { useEffect, useState } from "react";
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
    setFilteredTimesheetsAndEmployeesWithImages,
  ] = useState([]);
  const [is_calendar, setIsCalendar] = useState(true);
  const [search_bar_text, setSearchBarText] = useState("");

  const [employees_names, setEmployeesNames] = useState<any>([]);

  const [id, setId] = useState(0);

  useEffect(() => {
    const arr = [{ id: 0, full_name: "None" }];
    timesheetsAndEmployeesWithImages.forEach((element: any) => {
      arr.push({
        id: element.employee_id,
        full_name: element.full_name,
      });
    });
    setEmployeesNames(arr);
  }, []);

  useEffect(() => {
    if (search_bar_text == "") {
      setFilteredTimesheetsAndEmployeesWithImages(
        timesheetsAndEmployeesWithImages
      );
    } else {
      const arr = timesheetsAndEmployeesWithImages.filter(
        (timesheetAndEmployee: any) =>
          timesheetAndEmployee.full_name
            .toLowerCase()
            .includes(search_bar_text.toLowerCase())
      );
      setFilteredTimesheetsAndEmployeesWithImages(arr);
    }
  }, [search_bar_text]);

  useEffect(() => {
    setSearchBarText(id == 0 ? "" : employees_names[id].full_name);
  }, [id]);

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
          <div className="flex flex-column table-view">
            <SearchBarComponent
              placeholder={"Search for timesheet"}
              search_bar_text={search_bar_text}
              setSearchBarText={setSearchBarText}
            />
            <section className="flex j-c-c w-100 a-i-c mt-20">
              <label htmlFor="employees_input_section">
                Search by employee:{" "}
              </label>
              <select
                name="employee_id"
                id="employees_input_section"
                value={id}
                onChange={(e) => {
                  console.log(e.target.value);
                  setId(parseInt(e.target.value));
                }}
              >
                {employees_names.map((employee: any) => (
                  <option value={employee.id} key={employee.id}>
                    {employee.full_name}
                  </option>
                ))}
              </select>
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
