import TableComponent from "../TableComponent/TableComponent";
import TimeIcon from "~/assets/icons/time.png";
import "./TimesheetComponent.css";

export default function TimesheetComponent({ timesheetAndEmployee }: any) {
  console.log(timesheetAndEmployee);
  return (
    <TableComponent
      employee_id={timesheetAndEmployee.employee_id}
      timesheet_id={timesheetAndEmployee.id}
      image={timesheetAndEmployee.image}
      full_name={timesheetAndEmployee.full_name}
    >
      <br />
      <div className="flex a-i-c timesheet-component-salary">
        <img src={TimeIcon} alt="" />
        <h4>Start: {timesheetAndEmployee.start_time.replace("T", " ")}</h4>
      </div>
      <div className="flex a-i-c timesheet-component-salary">
        <img src={TimeIcon} alt="" />
        <h4>End: {timesheetAndEmployee.end_time.replace("T", " ")}</h4>
      </div>
    </TableComponent>
  );
}
