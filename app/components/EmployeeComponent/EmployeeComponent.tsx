import "./EmployeeComponent.css";

export default function EmployeeComponent({ employee }: any) {
  return (
    <section className="flex flex-column employee-container w-100 mt-10">
      <img src={employee.image} alt="" />
      <section>
        <h3>
          {employee.full_name.length > 17
            ? `${employee.full_name.splice(0, 15)}...`
            : employee.full_name}
        </h3>
        <h3>Salary: {employee.salary}$</h3>
        <h4>Job Level: {employee.job_level}</h4>
        <br />
        <h5>Phone Number: {employee.phone_number}</h5>
      </section>
    </section>
  );
}
