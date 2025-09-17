"use client";
import { useState } from "react";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { SchedulingModal } from "./SchedulingModal";

interface CalendarProps {
  userId: string;
  onSchedulingCreated?: () => void;
}

export function Calendar({ userId, onSchedulingCreated }: CalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate && !isDateDisabled(selectedDate)) {
      setSelectedDate(selectedDate);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDate(undefined);
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
        disabled={isDateDisabled}
        className="rounded-lg border border-white text-white cursor-pointer"
      />
      
      <SchedulingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedDate={selectedDate}
        userId={userId}
        onSchedulingCreated={onSchedulingCreated}
      />
    </>
  );
}
