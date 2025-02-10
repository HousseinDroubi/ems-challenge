import { title } from "process";
import { useLoaderData } from "react-router";
import NavBarComponent from "~/components/NavBarComponent";
import { getDB } from "~/db/getDB";

export async function loader() {
  const db = await getDB();
  const employees = await db.all("SELECT * FROM employees;");
  return { employees };
}

export default function EmployeesPage() {
  const { employees } = useLoaderData();
  return (
    <div>
      <div>
        {employees.map((employee: any) => (
          <div key={employee.id}>
            <ul>
              <li>Employee #{employee.id}</li>
              <ul>
                <li>Full Name: {employee.full_name}</li>
              </ul>
            </ul>
          </div>
        ))}
      </div>
      <NavBarComponent
        pages={[
          { to: "/employees/new", title: "New Employee" },
          { to: "/timesheets/", title: "Timesheets" },
        ]}
      />
    </div>
  );
}
