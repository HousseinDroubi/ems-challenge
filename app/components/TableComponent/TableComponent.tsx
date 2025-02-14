import { useNavigate } from "react-router";
import "./TableComponent.css";

export default function TableComponent(props: any) {
  const navigate = useNavigate();
  return (
    <section
      className="flex flex-column table-container w-100 mt-10"
      onClick={() =>
        navigate(
          props.is_employee
            ? `/employees/${props.employee_id}`
            : `/employees/${props.timesheet_id}`
        )
      }
    >
      <img src={props.image} alt="" />
      <section>
        <h3 className="text-align-center">
          {props.full_name.length > 17
            ? `${props.full_name.splice(0, 15)}...`
            : props.full_name}
        </h3>
        <br />
        {props.children}
      </section>
    </section>
  );
}
