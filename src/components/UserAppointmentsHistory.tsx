'use client'

import { useState, useEffect, useCallback } from "react";
import api from "@/lib/axios";
import { CardScheduling } from "./CardScheduling";
import { Scheduling } from "@/@types/scheduling";
import { AppointmentDrawer } from "./AppointmentDrawer";

interface UserAppointmentsHistoryProps {
  readonly userId: string;
}

export function UserAppointmentsHistory({ userId }: UserAppointmentsHistoryProps) {
  const [schedulings, setSchedulings] = useState<Scheduling[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<Scheduling | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fetchSchedulings = useCallback(async () => {
    try {
      const response = await api.get('scheduling');

      const userSchedulings = response.data.filter((scheduling: Scheduling) => 
        scheduling.userId === userId
      );
      setSchedulings(userSchedulings);
    } catch (error) {
      console.error('Erro ao buscar histórico de agendamentos:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchSchedulings();
    }
  }, [userId, fetchSchedulings]);

  const filterPastSchedulings = (schedulings: Scheduling[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return schedulings.filter(scheduling => {
      const schedulingDate = new Date(scheduling.dayAt);
      schedulingDate.setHours(0, 0, 0, 0);
      return schedulingDate < today;
    }).sort((a, b) => {
      const dateA = new Date(`${a.dayAt}T${a.hourAt}`);
      const dateB = new Date(`${b.dayAt}T${b.hourAt}`);
      return dateB.getTime() - dateA.getTime();
    });
  };

  const pastSchedulings = filterPastSchedulings(schedulings);

  const handleCardClick = (appointment: Scheduling) => {
    setSelectedAppointment(appointment);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedAppointment(null);
  };

  const handleStatusUpdate = () => {
    fetchSchedulings();
  };

  if (loading) {
    return <div className="text-zinc-400">Carregando histórico...</div>;
  }

  return (
    <div className="space-y-4">
      {pastSchedulings.length > 0 ? (
        pastSchedulings.map((scheduling) => (
          <CardScheduling 
            key={scheduling.id} 
            scheduling={scheduling} 
            onClick={() => handleCardClick(scheduling)}
          />
        ))
      ) : (
        <p className="text-zinc-500 text-sm">Nenhum agendamento no histórico</p>
      )}

      <AppointmentDrawer
        appointment={selectedAppointment}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
}

