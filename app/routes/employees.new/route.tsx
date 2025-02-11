import { useEffect, useState } from "react";
import {
  Form,
  redirect,
  useActionData,
  type ActionFunction,
} from "react-router";
import EmployeeFormComponent from "~/components/EmployeeFormComponent/EmployeeFormComponent";
import NavBarComponent from "~/components/NavBarComponent/NavBarComponent";
import PopupComponent from "~/components/PopupComponent/PopupComponent";
import { getDB } from "~/db/getDB";
import {
  is18OrOlder,
  isEndDateGreaterThanStartDate,
  isValidDate,
} from "~/functions/date";
import { isValidNumber } from "~/functions/numbers";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const full_name = formData.get("full_name");
  const email = formData.get("email");
  const phone_number = formData.get("phone_number");
  const date_of_birth = formData.get("date_of_birth");
  const place_of_birth = formData.get("place_of_birth");
  const job_title = formData.get("job_title");
  const department = formData.get("department");
  const salary = formData.get("salary");
  const start_date = formData.get("start_date");
  const end_date = formData.get("end_date");
  const job_level = formData.get("job_level");

  // * Validations
  if (String(full_name).length < 3 || String(full_name).length > 50) {
    return {
      error_message: "Full name characters must be between 3 and 50",
    };
  }
  //Find if email contains @
  else if (!String(email).includes("@")) {
    return {
      error_message: "Email must contain @",
    };
    //Find if phone number is 8 digits
  } else if (String(phone_number).length !== 8) {
    return {
      error_message: "Phone number must contain exactly 8 digits",
    };
  } else if (!isValidDate(String(date_of_birth))) {
    return {
      error_message: "Invalid date of birth!",
    };
    // Find if user's age is 18 or older
  } else if (!is18OrOlder(String(date_of_birth))) {
    return {
      error_message: "Age must be greater than 18!",
    };
  } else if (
    String(place_of_birth).length < 3 ||
    String(place_of_birth).length > 50
  ) {
    return {
      error_message: "Place of birth characters must be between 3 and 50!",
    };
  } else if (String(job_title).length < 3 || String(job_title).length > 40) {
    return {
      error_message: "Job titlte characters must be between 3 and 40!",
    };
  } else if (String(department).length < 2 || String(department).length > 40) {
    return {
      error_message: "Job department characters must be between 2 and 40!",
    };
  } else if (!isValidNumber(String(salary))) {
    return {
      error_message: "Salary can contain only numbers!",
    };
  } else if (parseFloat(String(salary)) < 650) {
    return {
      error_message: "Salary canmust be above 650$!",
    };
  } else if (!isValidDate(String(start_date))) {
    return {
      error_message: "Invalid start date!",
    };
  } else if (!isValidDate(String(end_date))) {
    return {
      error_message: "Invalid end date!",
    };
  } else if (
    !isEndDateGreaterThanStartDate(String(start_date), String(end_date))
  ) {
    return {
      error_message: "End date must be greater than start date!",
    };
  } else if (String(job_level).length < 3 || String(job_level).length > 40) {
    return {
      error_message: "Job level characters must be between 3 and 40!",
    };
  } else {
    const db = await getDB();
    await db.run("INSERT INTO employees (full_name) VALUES (?)", [full_name]);

    return redirect("/employees");
  }
};

export default function NewEmployeePage() {
  const data = useActionData();
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
          { to: "/employees", title: "Employees" },
          { to: "/timesheets", title: "Timesheets" },
        ]}
      />
      <EmployeeFormComponent />
      <PopupComponent popup_data={popup_data} setPopupData={setPopupData} />
    </div>
  );
}
