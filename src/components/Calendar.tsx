"use client"

import { useState } from "react";
import { Calendar as CalendarUI } from "@/components/ui/calendar";

export function Calendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <CalendarUI
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-lg border border-zinc-400 text-zinc-400"
    />
  )
}
