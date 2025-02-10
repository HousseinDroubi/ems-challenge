import NavBarComponent from "~/components/NavBarComponent/NavBarComponent";

export async function loader() {
  return {};
}

export default function TimesheetPage() {
  return (
    <div>
      <NavBarComponent
        pages={[
          { to: "/timesheets", title: "Timesheets" },
          { to: "/timesheets/new", title: "New Timesheet" },
          { to: "/employees", title: "Employees" },
        ]}
      />
      <div>To implement</div>
    </div>
  );
}
