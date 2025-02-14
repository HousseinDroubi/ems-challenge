import {
  Form,
  useActionData,
  useLoaderData,
  type ActionFunction,
} from "react-router";
import EmployeeComponent from "~/components/EmployeeComponent/EmployeeComponent";
import NavBarComponent from "~/components/NavBarComponent/NavBarComponent";
import { getDB } from "~/db/getDB";
import { convertToBase64 } from "~/functions/file";
import "./route.css";
import SearchBarComponent from "~/components/SearchBarComponent/SearchBarComponent";
import { useEffect, useState } from "react";
import ButtonComponent from "~/components/ButtonComponent/ButtonComponent";
import { getOrderByQuery } from "~/functions/sql";

export async function loader() {
  const db = await getDB();
  const arr = await db.all("SELECT * FROM employees;");
  const employees = arr.map((employee) => {
    return { ...employee, image: convertToBase64(employee.face_image) };
  });
  return { employees };
}
export const action: ActionFunction = async ({ request }) => {
  const db = await getDB();
  const formData = await request.formData();
  let query = "";
  if (formData.has("clicked_order_by")) {
    query = getOrderByQuery(
      String(formData.get("order_by")),
      String(formData.get("order")),
      String(formData.get("search_bar"))
    );
    const arr = await db.all(query);
    const employees = arr.map((employee) => {
      return { ...employee, image: convertToBase64(employee.face_image) };
    });
    return { employees };
  }
};
export default function EmployeesPage() {
  const { employees } = useLoaderData();
  const data = useActionData();
  const [search_bar_text, setSearchBarText] = useState("");
  const [
    filtered_times_and_employees_with_images,
    setFilteredTimesheetsAndEmployeesWithImages,
  ] = useState([]);

  useEffect(() => {
    if (data) setFilteredTimesheetsAndEmployeesWithImages(data.employees);
  }, [data]);

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
        <Form method="post">
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
                <option value="ASC">ASC</option>
                <option value="DESC">DESC</option>
              </select>
              <ButtonComponent
                title="Apply Order search"
                name="clicked_order_by"
              />
            </div>
          </section>
          <section>
            <div className="order-section flex j-c-c a-i-c mt-20">
              <label htmlFor="filter_by">Filter By:</label>
              <select name="filter_by" id="filter_by">
                <option value="full_name">Full name</option>
                <option value="salary">Salary</option>
                <option value="department">Department</option>
              </select>
              <label htmlFor="filter">Filter:</label>
              <select name="filter" id="filter">
                {/* To be filled */}
              </select>
              <ButtonComponent
                title="Apply filter search"
                name="click_apply_filter"
              />
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
