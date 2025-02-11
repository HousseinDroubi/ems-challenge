import { useState } from "react";
import { Form, redirect, type ActionFunction } from "react-router";
import EmployeeFormComponent from "~/components/EmployeeFormComponent/EmployeeFormComponent";
import NavBarComponent from "~/components/NavBarComponent/NavBarComponent";
import PopupComponent from "~/components/PopupComponent/PopupComponent";
import { getDB } from "~/db/getDB";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const full_name = formData.get("full_name");

  const db = await getDB();
  await db.run("INSERT INTO employees (full_name) VALUES (?)", [full_name]);

  return redirect("/employees");
};

export default function NewEmployeePage() {
  // ! Initial popup state
  const [popup_data, setPopupData] = useState({
    text: "",
    is_visible: false,
  });

  return (
    <div>
      <NavBarComponent
        pages={[
          { to: "/employees", title: "Employees" },
          { to: "/timesheets", title: "Timesheets" },
        ]}
      />
      <EmployeeFormComponent />
      <PopupComponent popup_data={popup_data} setPopupData={setPopupData} />
      <button
        onClick={() => {
          setPopupData({ text: "Weird", is_visible: true });
        }}
      >
        Click here
      </button>
    </div>
  );
}
