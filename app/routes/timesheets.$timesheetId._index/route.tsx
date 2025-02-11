import NavBarComponent from "~/components/NavBarComponent/NavBarComponent";

export async function loader() {
  return {};
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
      <div>To implement</div>
    </div>
  );
}
