import { getAgeFromBirthDate } from "~/functions/date";
import SalaryIcon from "../../assets/icons/salary.png";
import CalendarIcon from "../../assets/icons/calendar.png";
import LevelIcon from "../../assets/icons/level.png";
import PhoneIcon from "../../assets/icons/phone.png";
import TableComponent from "../TableComponent/TableComponent";
import "./EmployeeComponent.css";

export default function EmployeeComponent({ employee }: any) {
  return (
    <TableComponent
      employee_id={employee.id}
      image={employee.image}
      full_name={employee.full_name}
      is_employee
    >
      <div className="flex a-i-c employee-component-salary">
        <img src={SalaryIcon} alt="" />
        <h4>Salary: {employee.salary}$</h4>
      </div>
      <div className="flex a-i-c employee-component-salary">
        <img src={CalendarIcon} alt="" />
        <h4>Age: {getAgeFromBirthDate(employee.date_of_birth)} years</h4>
      </div>
      <div className="flex a-i-c employee-component-salary">
        <img src={LevelIcon} alt="" />
        <h4>Level: {employee.job_level}</h4>
      </div>
      <div className="flex a-i-c employee-component-salary">
        <img src={PhoneIcon} alt="" />
        <h4>Phone Number: {employee.phone_number}</h4>
      </div>
    </TableComponent>
  );
}
