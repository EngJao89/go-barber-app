"use client";
import { useState } from "react";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { SchedulingModal } from "./SchedulingModal";

interface CalendarProps {
  userId: string;
}

export function Calendar({ userId }: CalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setSelectedDate(selectedDate);
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <CalendarUI
        mode="single"
        selected={date}
        onSelect={(newDate) => {
          setDate(newDate);
          handleDateSelect(newDate);
        }}
        className="rounded-lg border border-white text-white cursor-pointer"
      />
      
      <SchedulingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        userId={userId}
      />
    </>
  );
}
