import { redirect, useLoaderData, type ActionFunction } from "react-router";
import NavBarComponent from "~/components/NavBarComponent/NavBarComponent";
import TimesheetFormComponent from "~/components/TimesheetFormComponent/TimesheetFormComponent";
import { getDB } from "~/db/getDB";
import { isEndDateGreaterThanStartDate, isValidDate } from "~/functions/date";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const employee_id = formData.get("employee_id"); // <select /> input with name="employee_id"
  const start_time = formData.get("start_time");
  const end_time = formData.get("end_time");

  if (String(employee_id) === "0") {
    return {
      error_message: "Please choose an employee",
    };
  } else if (!isValidDate(String(start_time))) {
    return {
      error_message: "Invalid start time",
    };
  } else if (!isValidDate(String(end_time))) {
    return {
      error_message: "Invalid start time",
    };
  } else if (
    !isEndDateGreaterThanStartDate(String(start_time), String(end_time))
  ) {
    return {
      error_message: "End time must be greater than start time",
    };
  } else {
    // update request
    console.log(formData);
  }

  return redirect("/timesheets");
};

export async function loader({ request }: any) {
  const id = request.url.split("/").pop();
  const db = await getDB();
  const timesheetAndEmployees = await db.all(
    `SELECT employees.id as _employee_id, employees.full_name, timesheets.* FROM employees,timesheets WHERE timesheets.id = ${id}`
  );
  if (timesheetAndEmployees.length == 0) return { data: null };
  const data: any = {};
  // Get employees
  data.employees = timesheetAndEmployees.map((element) => {
    return {
      id: element._employee_id,
      full_name: element.full_name,
    };
  });
  data.employees.unshift({
    id: 0,
    full_name: "None",
  });
  data.timesheet = {
    id: timesheetAndEmployees[0].id,
    start_time: timesheetAndEmployees[0].start_time,
    end_time: timesheetAndEmployees[0].end_time,
    employee_id: timesheetAndEmployees[0].employee_id,
  };
  return { data };
}

export default function TimesheetPage() {
  const { data } = useLoaderData();
  if (data == null) return <></>;
  return (
    <div>
      <NavBarComponent
        pages={[
          { to: "/employees", title: "Employees" },
          { to: "/timesheets", title: "Timesheets" },
          { to: "/timesheets/new", title: "New Timesheet" },
        ]}
      />
      <TimesheetFormComponent
        update
        employees={data.employees}
        timesheet={data.timesheet}
      />
    </div>
  );
}
