import NavBarComponent from "~/components/NavBarComponent/NavBarComponent";
import { getDB } from "~/db/getDB";

export async function loader({ request }: any) {
  const id = request.url.split("/").pop();
  const db = await getDB();
  const timesheetAndEmployees = await db.all(
    `SELECT employees.id as _employee_id, employees.full_name, timesheets.* FROM employees,timesheets WHERE timesheets.id = ${id}`
  );
  const data: any = {};
  // Get users
  data.users = timesheetAndEmployees.map((element) => {
    return {
      id: element._employee_id,
      full_name: element.full_name,
    };
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
  return (
    <div>
      <NavBarComponent
        pages={[
          { to: "/employees", title: "Employees" },
          { to: "/timesheets", title: "Timesheets" },
          { to: "/timesheets/new", title: "New Timesheet" },
        ]}
      />
    </div>
  );
}
