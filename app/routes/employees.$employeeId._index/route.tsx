import { useEffect, useState } from "react";
import { useActionData } from "react-router";
import NavBarComponent from "~/components/NavBarComponent/NavBarComponent";
import PopupComponent from "~/components/PopupComponent/PopupComponent";

export async function loader() {
  return {};
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
      <div>To implement</div>
      <PopupComponent popup_data={popup_data} setPopupData={setPopupData} />
    </div>
  );
}
