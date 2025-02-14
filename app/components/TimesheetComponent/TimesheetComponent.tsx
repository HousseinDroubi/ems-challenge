import TableComponent from "../TableComponent/TableComponent";
import "./TimesheetComponent.css";

export default function TimesheetComponent({ timesheetAndEmployee }: any) {
  console.log(timesheetAndEmployee);
  return (
    <TableComponent
      employee_id={timesheetAndEmployee.employee_id}
      timesheet_id={timesheetAndEmployee.id}
      image={timesheetAndEmployee.image}
      full_name={timesheetAndEmployee.full_name}
    ></TableComponent>
  );
}
