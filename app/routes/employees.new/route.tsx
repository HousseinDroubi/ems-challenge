import { Form, redirect, type ActionFunction } from "react-router";
import EmployeeFormComponent from "~/components/EmployeeFormComponent/EmployeeFormComponent";
import NavBarComponent from "~/components/NavBarComponent/NavBarComponent";
import { getDB } from "~/db/getDB";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const full_name = formData.get("full_name");

  const db = await getDB();
  await db.run("INSERT INTO employees (full_name) VALUES (?)", [full_name]);

  return redirect("/employees");
};

export default function NewEmployeePage() {
  return (
    <div>
      <NavBarComponent
        pages={[
          { to: "/employees", title: "Employees" },
          { to: "/timesheets", title: "Timesheets" },
        ]}
      />
      <h1>Create New Employee</h1>
      <EmployeeFormComponent />
    </div>
  );
}
