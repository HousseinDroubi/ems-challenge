import { useLoaderData } from "react-router";
import NavBarComponent from "~/components/NavBarComponent/NavBarComponent";
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
                    src={convertToBase64(employee.face_image)}
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

const convertToBase64 = (face_image: any) => {
  return `data:image/jpeg;base64,${face_image.toString("base64")}`;
};
