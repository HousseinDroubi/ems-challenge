import { useLoaderData } from "react-router";
import NavBarComponent from "~/components/NavBarComponent/NavBarComponent";
import { getDB } from "~/db/getDB";
import { convertToBase64 } from "~/functions/file";

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
                  <img src={employee.image} alt={employee.full_name} />
                </li>
              </ul>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
