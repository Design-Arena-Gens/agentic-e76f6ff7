"use client";

import { useMemo, useReducer, useState } from "react";
import { Booking, BookingAction, BookingState, MeetingType } from "../../lib/types/booking";
import { generateMonthMatrix, getMonthLabel, isSameDay } from "../../lib/utils/date";
import Link from "next/link";

function bookingReducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case "setDate":
      return { ...state, date: action.date };
    case "setTime":
      return { ...state, time: action.time };
    case "setType":
      return { ...state, meetingType: action.meetingType };
    case "setLocation":
      return { ...state, location: action.location };
    default:
      return state;
  }
}

function TimeSlotSelector({ selected, onSelect }: { selected?: string; onSelect: (t: string) => void }) {
  const slots = useMemo(() => {
    const result: string[] = [];
    const start = 9 * 60; // 09:00
    const end = 17 * 60; // 17:00
    for (let m = start; m <= end; m += 30) {
      const h = Math.floor(m / 60);
      const mm = m % 60;
      const label = `${String(h).padStart(2, "0")}:${mm === 0 ? "00" : "30"}`;
      result.push(label);
    }
    return result;
  }, []);

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
      {slots.map((s) => {
        const active = s === selected;
        return (
          <button
            key={s}
            type="button"
            onClick={() => onSelect(s)}
            className={
              "rounded-lg border px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-brand-600 " +
              (active
                ? "bg-brand-600 text-white border-brand-600 shadow"
                : "bg-white/70 dark:bg-white/5 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800")
            }
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}

function Toggle({ checked, onChange, labels }: { checked: boolean; onChange: (v: boolean) => void; labels: [string, string] }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-10 w-44 items-center rounded-full transition px-1 ring-1 ring-inset ring-slate-300 dark:ring-slate-700 ${checked ? "bg-brand-600" : "bg-white/70 dark:bg-white/5"}`}
    >
      <span
        className={`absolute left-1 top-1 h-8 w-20 rounded-full bg-white dark:bg-slate-200 shadow transition-transform ${checked ? "translate-x-22" : "translate-x-0"}`}
        style={{ transform: checked ? "translateX(88px)" : "translateX(0px)" }}
      />
      <span className={`z-10 w-1/2 text-center text-sm ${checked ? "text-white/80" : "text-slate-700 dark:text-slate-300"}`}>{labels[0]}</span>
      <span className={`z-10 w-1/2 text-center text-sm ${checked ? "text-white" : "text-slate-900 dark:text-slate-100"}`}>{labels[1]}</span>
    </button>
  );
}

function Calendar({ value, onChange }: { value?: Date; onChange: (d: Date) => void }) {
  const [cursor, setCursor] = useState<Date>(value ?? new Date());
  const month = useMemo(() => generateMonthMatrix(cursor), [cursor]);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-white/5 backdrop-blur p-4">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          className="rounded-lg p-2 hover:bg-slate-50 dark:hover:bg-slate-800"
          aria-label="Previous month"
        >
          ?
        </button>
        <div className="font-medium text-slate-900 dark:text-slate-50">{getMonthLabel(cursor)}</div>
        <button
          type="button"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          className="rounded-lg p-2 hover:bg-slate-50 dark:hover:bg-slate-800"
          aria-label="Next month"
        >
          ?
        </button>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs text-slate-500">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {month.map((day, idx) => {
          const isCurrentMonth = day.getMonth() === cursor.getMonth();
          const selected = value && isSameDay(day, value);
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onChange(day)}
              className={
                "aspect-square rounded-lg text-sm transition focus:outline-none focus:ring-2 focus:ring-brand-600 flex items-center justify-center " +
                (selected
                  ? "bg-brand-600 text-white shadow"
                  : isCurrentMonth
                    ? "bg-white/70 dark:bg-white/5 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
                    : "text-slate-400 dark:text-slate-600")
              }
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [state, dispatch] = useReducer(bookingReducer, {
    meetingType: "Online",
  });

  const booking: Booking | undefined = useMemo(() => {
    if (!state.date || !state.time) return undefined;
    return {
      date: state.date,
      time: state.time,
      meetingType: state.meetingType,
      location: state.location,
    };
  }, [state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking) return;
    alert(
      `Meeting booked on ${booking.date.toDateString()} at ${booking.time} (${booking.meetingType}${booking.location ? ` - ${booking.location}` : ""})`
    );
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50">Client Booking Dashboard</h1>
        <Link href="/" className="text-sm text-brand-700 hover:underline">? Back to Home</Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Select date</label>
                <Calendar
                  value={state.date}
                  onChange={(d) => dispatch({ type: "setDate", date: d })}
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Select time</label>
                <TimeSlotSelector
                  selected={state.time}
                  onSelect={(t) => dispatch({ type: "setTime", time: t })}
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Meeting type</label>
                <Toggle
                  checked={state.meetingType === "Offline"}
                  onChange={(v) => dispatch({ type: "setType", meetingType: v ? "Offline" : "Online" })}
                  labels={["Online", "Offline"]}
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Location (optional)</label>
                <input
                  type="text"
                  placeholder={state.meetingType === "Offline" ? "Office address or property location" : "Video link or preferred platform"}
                  value={state.location ?? ""}
                  onChange={(e) => dispatch({ type: "setLocation", location: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-white/5 px-3 py-2 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {booking ? (
                  <span>
                    Selected: <strong>{booking.date.toDateString()}</strong> at <strong>{booking.time}</strong> ? <strong>{booking.meetingType}</strong>
                  </span>
                ) : (
                  <span>Please choose a date and time to continue.</span>
                )}
              </div>
              <button
                type="submit"
                disabled={!booking}
                className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-5 py-3 text-white shadow-lg shadow-brand-600/30 transition hover:translate-y-[-1px] hover:bg-brand-700 active:translate-y-[0] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Book meeting
              </button>
            </div>
          </form>
        </section>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-white/5 backdrop-blur p-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Upcoming calendar</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Visualize your schedule at a glance.</p>
            <div className="mt-4">
              <Calendar value={state.date} onChange={(d) => dispatch({ type: "setDate", date: d })} />
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-white/5 backdrop-blur p-4">
            <h3 className="text-base font-medium text-slate-900 dark:text-slate-100">Tips</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-slate-600 dark:text-slate-300 space-y-1">
              <li>Choose an online meeting for faster consultations.</li>
              <li>Pick off-peak hours for more flexibility.</li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
