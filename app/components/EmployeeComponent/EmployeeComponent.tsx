import { getAgeFromBirthDate } from "~/functions/date";
import SalaryIcon from "../../assets/icons/salary.png";
import CalendarIcon from "../../assets/icons/calendar.png";
import LevelIcon from "../../assets/icons/level.png";
import PhoneIcon from "../../assets/icons/phone.png";
import TableComponent from "../TableComponent/TableComponent";
import "./EmployeeComponent.css";
import TableDetailsComponent from "../TableDetailsComponent/TableDetailsComponent";

export default function EmployeeComponent({ employee }: any) {
  return (
    <TableComponent
      employee_id={employee.id}
      image={employee.image}
      full_name={employee.full_name}
      is_employee
    >
      <TableDetailsComponent
        icon={SalaryIcon}
        content={`Salary: ${employee.salary}$`}
        alt="Salary"
      />
      <TableDetailsComponent
        icon={CalendarIcon}
        content={`Age: ${getAgeFromBirthDate(employee.date_of_birth)} years`}
        alt="Birth date"
      />
      <TableDetailsComponent
        icon={LevelIcon}
        content={`Level: ${employee.job_level}`}
        alt="Job Level"
      />
      <TableDetailsComponent
        icon={PhoneIcon}
        content={`Phone Number: ${employee.phone_number}`}
        alt="Phone Number"
      />
    </TableComponent>
  );
}
