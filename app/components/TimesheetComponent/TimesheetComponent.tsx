import TableComponent from "../TableComponent/TableComponent";
import TimeIcon from "~/assets/icons/time.png";
import "./TimesheetComponent.css";
import TableDetailsComponent from "../TableDetailsComponent/TableDetailsComponent";

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
      <TableDetailsComponent
        icon={TimeIcon}
        content={`Start: ${timesheetAndEmployee.start_time.replace("T", " ")}`}
        alt="Start"
      />
      <TableDetailsComponent
        icon={TimeIcon}
        content={`End: ${timesheetAndEmployee.end_time.replace("T", " ")}`}
        alt="End"
        additional_style={"rotate-180"}
      />
    </TableComponent>
  );
}
