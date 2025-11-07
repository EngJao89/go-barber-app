'use client'

import { useState, useEffect, useCallback } from "react";
import api from "@/lib/axios";
import { CardScheduling } from "./CardScheduling";
import { Scheduling } from "@/@types/scheduling";
import { AppointmentDrawer } from "./AppointmentDrawer";

interface BarberAppointmentsListProps {
  readonly barberId: string;
}

export function BarberAppointmentsList({ barberId }: BarberAppointmentsListProps) {
  const [schedulings, setSchedulings] = useState<Scheduling[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<Scheduling | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fetchSchedulings = useCallback(async () => {
    if (!barberId) {
      console.warn('BarberId não disponível para buscar agendamentos');
      setLoading(false);
      return;
    }

    try {
      const response = await api.get('scheduling');

      if (!Array.isArray(response.data)) {
        console.error('Resposta da API não é um array:', response.data);
        setSchedulings([]);
        setLoading(false);
        return;
      }

      const barberSchedulings = response.data.filter((scheduling: Scheduling) => 
        scheduling.barberId === barberId
      );
      setSchedulings(barberSchedulings);
    } catch (error: unknown) {
      console.error('Erro ao buscar agendamentos:', error);
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { status: number; data: { message?: string; error?: string } } };
        console.error('Status:', axiosError.response.status);
        console.error('Data:', axiosError.response.data);
      }

      setSchedulings([]);
    } finally {
      setLoading(false);
    }
  }, [barberId]);

  useEffect(() => {
    if (barberId) {
      fetchSchedulings();
    }
  }, [barberId, fetchSchedulings]);

  const filterConfirmedSchedulings = (schedulings: Scheduling[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return schedulings.filter(scheduling => {
      if (scheduling.status !== 'confirmado') return false;
      
      const schedulingDate = new Date(scheduling.dayAt);
      schedulingDate.setHours(0, 0, 0, 0);
      return schedulingDate >= today;
    }).sort((a, b) => {
      const dateA = new Date(`${a.dayAt}T${a.hourAt}`);
      const dateB = new Date(`${b.dayAt}T${b.hourAt}`);
      return dateA.getTime() - dateB.getTime();
    });
  };

  const confirmedSchedulings = filterConfirmedSchedulings(schedulings);

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
    return <div className="text-zinc-400">Carregando agendamentos...</div>;
  }

  return (
    <div className="space-y-4">
      {confirmedSchedulings.length > 0 ? (
        confirmedSchedulings.map((scheduling) => (
          <CardScheduling 
            key={scheduling.id} 
            scheduling={scheduling} 
            onClick={() => handleCardClick(scheduling)}
          />
        ))
      ) : (
        <p className="text-zinc-500 text-sm">Nenhum agendamento confirmado</p>
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

