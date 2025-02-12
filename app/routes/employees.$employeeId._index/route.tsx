import { useEffect, useState } from "react";
import { useActionData } from "react-router";
import EmployeeFormComponent from "~/components/EmployeeFormComponent/EmployeeFormComponent";
import NavBarComponent from "~/components/NavBarComponent/NavBarComponent";
import PopupComponent from "~/components/PopupComponent/PopupComponent";
import { getDB } from "~/db/getDB";

export async function loader({ request }: any) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  const db = await getDB();
  const employee = await db.get(
    `SELECT * FROM employees WHERE id = ${id} LIMIT 1;`
  );
  const employee_with_files = {
    ...employee,
    face_image_base64: employee.face_image.toString("base64"),
    id_image_base64: employee.id_image.toString("base64"),
    cv_image_base64: employee.cv_image.toString("base64"),
    cover_letter_image_base64: employee.cover_letter_image.toString("base64"),
  };

  return { employee_with_files };
}

export default function EmployeePage() {
  const data = useActionData();

  //! Show error message (if any)
  useEffect(() => {
    if (data)
      setPopupData({
        is_visible: true,
        text: data.error_message,
      });
  }, [data]);

  // ! Initial popup state
  const [popup_data, setPopupData] = useState({
    text: "",
    is_visible: false,
  });
  return (
    <div>
      <NavBarComponent
        pages={[
          { to: "/employees/", title: "Employees" },
          { to: "/employees/new", title: "New Employee" },
          { to: "/timesheets", title: "Timesheets" },
        ]}
      />
      <EmployeeFormComponent />
      <PopupComponent popup_data={popup_data} setPopupData={setPopupData} />
    </div>
  );
}
