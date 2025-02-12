import { useLoaderData } from "react-router";
import NavBarComponent from "~/components/NavBarComponent/NavBarComponent";
import { getDB } from "~/db/getDB";

export async function loader() {
  const db = await getDB();
  const arr = await db.all("SELECT * FROM employees;");

  const employees = arr.map((employee) => {
    const base64Image = employee.image.toString("base64");
    return { ...employee, base64Image };
  });

  return { employees };
}

export default function EmployeesPage() {
  const { employees } = useLoaderData();
  return (
    <div>
      <NavBarComponent
        pages={[
          { to: "/employees/new", title: "New Employee" },
          { to: "/timesheets", title: "Timesheets" },
        ]}
      />
      <div>
        {employees.map((employee: any) => (
          <div key={employee.id}>
            <ul>
              <li>Employee #{employee.id}</li>
              <ul>
                <li>Full Name: {employee.full_name}</li>
                <li>
                  <img
                    src={`data:image/jpeg;base64,${employee.base64Image}`}
                    alt={employee.full_name}
                  />
                </li>
              </ul>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
