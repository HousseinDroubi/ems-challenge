import { getAgeFromBirthDate } from "~/functions/date";
import "./EmployeeComponent.css";
import SalaryIcon from "../../assets/icons/salary.png";
import CalendarIcon from "../../assets/icons/calendar.png";
import LevelIcon from "../../assets/icons/level.png";
import PhoneIcon from "../../assets/icons/phone.png";
import { useNavigate } from "react-router";

export default function EmployeeComponent({ employee }: any) {
  const navigate = useNavigate();

  return (
    <section
      className="flex flex-column employee-container w-100 mt-10"
      onClick={() => navigate(`/employees/${employee.id}`)}
    >
      <img src={employee.image} alt="" />
      <section>
        <h3 className="text-align-center">
          {employee.full_name.length > 17
            ? `${employee.full_name.splice(0, 15)}...`
            : employee.full_name}
        </h3>
        <br />
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
      </section>
    </section>
  );
}
