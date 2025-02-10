import NavBarComponent from "~/components/NavBarComponent";

export async function loader() {
  return {};
}

export default function EmployeePage() {
  return (
    <div>
      <NavBarComponent
        pages={[
          { to: "/employees/", title: "Employees" },
          { to: "/employees/new", title: "New Employee" },
          { to: "/timesheets", title: "Timesheets" },
        ]}
      />
      <div>To implement</div>
    </div>
  );
}
