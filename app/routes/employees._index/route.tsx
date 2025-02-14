import { useLoaderData } from "react-router";
import EmployeeComponent from "~/components/EmployeeComponent/EmployeeComponent";
import NavBarComponent from "~/components/NavBarComponent/NavBarComponent";
import { getDB } from "~/db/getDB";
import { convertToBase64 } from "~/functions/file";
import "./route.css";
import SearchBarComponent from "~/components/SearchBarComponent/SearchBarComponent";
import { useEffect, useState } from "react";

export async function loader() {
  const db = await getDB();
  const arr = await db.all("SELECT * FROM employees;");
  const employees = arr.map((employee) => {
    return { ...employee, image: convertToBase64(employee.face_image) };
  });
  return { employees };
}

export default function EmployeesPage() {
  const { employees } = useLoaderData();
  const [search_bar_text, setSearchBarText] = useState("");
  const [
    filtered_times_and_employees_with_images,
    setFilteredTimesheetsAndEmployeesWithImages,
  ] = useState([]);
  useEffect(() => {
    if (search_bar_text == "") {
      setFilteredTimesheetsAndEmployeesWithImages(employees);
    } else {
      const arr = employees.filter(
        (timesheetAndEmployee: any) =>
          timesheetAndEmployee.full_name
            .toLowerCase()
            .includes(search_bar_text.toLowerCase()) ||
          String(timesheetAndEmployee.salary).includes(search_bar_text) ||
          String(timesheetAndEmployee.phone_number).includes(search_bar_text) ||
          timesheetAndEmployee.job_level
            .toLowerCase()
            .includes(search_bar_text.toLowerCase()) ||
          timesheetAndEmployee.department
            .toLowerCase()
            .includes(search_bar_text.toLowerCase()) ||
          timesheetAndEmployee.job_title
            .toLowerCase()
            .includes(search_bar_text.toLowerCase())
      );
      setFilteredTimesheetsAndEmployeesWithImages(arr);
    }
  }, [search_bar_text]);

  return (
    <div>
      <NavBarComponent
        pages={[
          { to: "/employees/new", title: "New Employee" },
          { to: "/timesheets", title: "Timesheets" },
        ]}
      />
      <div>
        <SearchBarComponent
          placeholder="Just type..."
          search_bar_text={search_bar_text}
          setSearchBarText={setSearchBarText}
        />
        <article className="employees-container flex w-100">
          {filtered_times_and_employees_with_images.map((employee: any) => (
            <EmployeeComponent employee={employee} key={employee.id} />
          ))}
        </article>
      </div>
    </div>
  );
}
