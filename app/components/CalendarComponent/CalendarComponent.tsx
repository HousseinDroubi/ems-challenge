import {
  createViewWeek,
  createViewMonthGrid,
  createViewDay,
  createViewMonthAgenda,
} from "@schedule-x/calendar";
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import "@schedule-x/theme-default/dist/index.css";
import "./CalendarComponent.css";

export default function CalendarComponent() {
  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    // ! Mock Data
    events: [
      {
        id: 1,
        title: "Title",
        start: "2025-02-14 08:00",
        end: "2025-02-14 10:00",
      },
    ],
    selectedDate: "2025-02-13",
  });
  return (
    <>
      <ScheduleXCalendar calendarApp={calendar} />
    </>
  );
}
