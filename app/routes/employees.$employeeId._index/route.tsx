import { useEffect, useState } from "react";
import {
  redirect,
  useActionData,
  useLoaderData,
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
import { convertToBase64 } from "~/functions/file";
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
  const face_image = formData.get("image");
  const id_image = formData.get("id");
  const cv_image = formData.get("cv");
  const cover_letter_image = formData.get("cover_letter");

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
    //Find if date of bieth is valid
  } else if (!isValidDate(String(date_of_birth))) {
    return {
      error_message: "Invalid date of birth!",
    };
    // Find if user's age is 18 or older
  } else if (!is18OrOlder(String(date_of_birth))) {
    return {
      error_message: "Age must be greater than 18!",
    };
    //Find if place of birth's number of characters is between 3 and 50
  } else if (
    String(place_of_birth).length < 3 ||
    String(place_of_birth).length > 50
  ) {
    return {
      error_message: "Place of birth characters must be between 3 and 50!",
    };
    //Find if job title's number of characters is between 3 and 40
  } else if (String(job_title).length < 3 || String(job_title).length > 40) {
    return {
      error_message: "Job titlte characters must be between 3 and 40!",
    };
    //Find if department's number of characters is between 3 and 50
  } else if (String(department).length < 2 || String(department).length > 40) {
    return {
      error_message: "Job department characters must be between 2 and 40!",
    };
    //Find if salary is a number
  } else if (!isValidNumber(String(salary))) {
    return {
      error_message: "Salary can contain only numbers!",
    };
    //Find if salary is a greater than or equal 650
  } else if (parseFloat(String(salary)) < 650) {
    return {
      error_message: "Salary canmust be above 650$!",
    };
    //Find if start date is valid
  } else if (!isValidDate(String(start_date))) {
    return {
      error_message: "Invalid start date!",
    };
    //Find if end date is valid
  } else if (!isValidDate(String(end_date))) {
    return {
      error_message: "Invalid end date!",
    };

    //Find if end date is greater than start date
  } else if (
    !isEndDateGreaterThanStartDate(String(start_date), String(end_date))
  ) {
    return {
      error_message: "End date must be greater than start date!",
    };
    //Find if job level's number of characters is between 3 and 40
  } else if (String(job_level).length < 3 || String(job_level).length > 40) {
    return {
      error_message: "Job level characters must be between 3 and 40!",
    };
  }
  const db = await getDB();

  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  let image_buffer, id_buffer, cv_buffer, cover_letter_buffer;

  const image_array_buffer = await (face_image as File).arrayBuffer();
  image_buffer = Buffer.from(image_array_buffer);

  const id_array_buffer = await (id_image as File).arrayBuffer();
  id_buffer = Buffer.from(id_array_buffer);

  const cv_array_buffer = await (cv_image as File).arrayBuffer();
  cv_buffer = Buffer.from(cv_array_buffer);

  const cover_letter_array_buffer = await (
    cover_letter_image as File
  ).arrayBuffer();
  cover_letter_buffer = Buffer.from(cover_letter_array_buffer);

  await db.run(
    `UPDATE employees
      SET full_name = ?, email = ?,
      phone_number = ?, date_of_birth = ?,
      place_of_birth = ?, job_title = ?,
      department = ?, salary = ?,
      start_date = ?, end_date = ?,
      job_level = ? , face_image = ?,
      id_image = ?, cv_image = ?,
      cover_letter_image = ?
      
      WHERE id = ?
    `,
    [
      full_name,
      email,
      phone_number,
      date_of_birth,
      place_of_birth,
      job_title,
      department,
      salary,
      start_date,
      end_date,
      job_level,
      id,
      image_buffer,
      id_buffer,
      cv_buffer,
      cover_letter_buffer,
    ]
  );

  return redirect("/employees");
};

export async function loader({ request }: any) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  const db = await getDB();
  const employee = await db.get(
    `SELECT * FROM employees WHERE id = ${id} LIMIT 1;`
  );
  const employee_with_files = {
    ...employee,
    face_image_base64: convertToBase64(employee.face_image),
    id_image_base64: convertToBase64(employee.id_image),
    cv_image_base64: convertToBase64(employee.cv_image),
    cover_letter_image_base64: convertToBase64(employee.cover_letter_image),
  };

  return { employee_with_files };
}

export default function EmployeePage() {
  const data = useActionData();
  const { employee_with_files } = useLoaderData();
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
      <EmployeeFormComponent employee_data={employee_with_files} update />
      <PopupComponent popup_data={popup_data} setPopupData={setPopupData} />
    </div>
  );
}
