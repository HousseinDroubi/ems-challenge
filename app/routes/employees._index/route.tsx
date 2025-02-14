import { Form, useLoaderData } from "react-router";
import EmployeeComponent from "~/components/EmployeeComponent/EmployeeComponent";
import NavBarComponent from "~/components/NavBarComponent/NavBarComponent";
import { getDB } from "~/db/getDB";
import { convertToBase64 } from "~/functions/file";
import "./route.css";
import SearchBarComponent from "~/components/SearchBarComponent/SearchBarComponent";
import { useEffect, useState } from "react";
import ButtonComponent from "~/components/ButtonComponent/ButtonComponent";

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
        <Form>
          <SearchBarComponent
            placeholder="Just type..."
            search_bar_text={search_bar_text}
            setSearchBarText={setSearchBarText}
          />
          <section>
            <div className="order-section flex j-c-c a-i-c mt-20">
              <label htmlFor="order_by">Order By:</label>
              <select name="order_by" id="order_by">
                <option value="full_name">Full name</option>
                <option value="salary">Salary</option>
                <option value="department">Department</option>
              </select>
              <label htmlFor="order">Order:</label>
              <select name="order" id="order">
                <option value="asc">ASC</option>
                <option value="desc">DESC</option>
              </select>
              <ButtonComponent title="Apply Order search" />
            </div>
          </section>
        </Form>
        <article className="employees-container flex w-100">
          {filtered_times_and_employees_with_images.map((employee: any) => (
            <EmployeeComponent employee={employee} key={employee.id} />
          ))}
        </article>
      </div>
    </div>
  );
}
