import {
  createViewWeek,
  createViewMonthGrid,
  createViewDay,
  createViewMonthAgenda,
} from "@schedule-x/calendar";
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import "@schedule-x/theme-default/dist/index.css";
import "./CalendarComponent.css";

export default function CalendarComponent({ timesheetsAndEmployees }: any) {
  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    // ! Mock Data
    events: timesheetsAndEmployees.map((timesheetWithEmployee: any) => {
      return {
        id: String(timesheetWithEmployee.id),
        title: timesheetWithEmployee.full_name,
        start: timesheetWithEmployee.start_time.replace("T", " "),
        end: timesheetWithEmployee.end_time.replace("T", " "),
      };
    }),
    selectedDate: "2025-02-13",
  });
  return (
    <>
      <ScheduleXCalendar calendarApp={calendar} />
    </>
  );
}
