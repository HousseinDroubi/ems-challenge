import { createEventModalPlugin } from "@schedule-x/event-modal";
import {
  createViewWeek,
  createViewMonthGrid,
  createViewDay,
  createViewMonthAgenda,
} from "@schedule-x/calendar";
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import "@schedule-x/theme-default/dist/index.css";
import "./CalendarComponent.css";
import { getFormattedToday } from "~/functions/date";

export default function CalendarComponent({ timesheetsAndEmployees }: any) {
  const eventModal = createEventModalPlugin();

  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: timesheetsAndEmployees.map((timesheetWithEmployee: any) => {
      return {
        id: String(timesheetWithEmployee.id),
        title: timesheetWithEmployee.full_name,
        start: timesheetWithEmployee.start_time.replace("T", " "),
        end: timesheetWithEmployee.end_time.replace("T", " "),
      };
    }),
    selectedDate: getFormattedToday(),
    plugins: [eventModal],
  });
  return (
    <>
      <ScheduleXCalendar calendarApp={calendar} />
    </>
  );
}
