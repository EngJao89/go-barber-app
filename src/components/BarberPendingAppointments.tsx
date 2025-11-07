'use client'

import { useState, useEffect, useCallback } from "react";
import api from "@/lib/axios";
import { CardScheduling } from "./CardScheduling";
import { Scheduling } from "@/@types/scheduling";
import { AppointmentDrawer } from "./AppointmentDrawer";
import { toast } from "react-toastify";

interface BarberPendingAppointmentsProps {
  readonly barberId: string;
}

export function BarberPendingAppointments({ barberId }: BarberPendingAppointmentsProps) {
  const [schedulings, setSchedulings] = useState<Scheduling[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<Scheduling | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fetchSchedulings = useCallback(async () => {
    if (!barberId) {
      console.warn('BarberId não disponível');
      setLoading(false);
      return;
    }

    try {
      const response = await api.get('scheduling');

      if (!Array.isArray(response.data)) {
        console.error('Resposta da API não é um array:', response.data);
        toast.error('Formato de resposta inválido da API', { theme: "dark" });
        return;
      }

      const barberSchedulings = response.data.filter((scheduling: Scheduling) => {
        const matchesBarber = scheduling.barberId === barberId;

        return matchesBarber;
      });

      const today = new Date();
      const futureSchedulings = barberSchedulings.filter((scheduling: Scheduling) => {
        const schedulingDateTime = new Date(`${scheduling.dayAt}T${scheduling.hourAt}`);
        return schedulingDateTime >= today;
      });

      const sorted = [...futureSchedulings].sort((a: Scheduling, b: Scheduling) => {
        const dateA = new Date(`${a.dayAt}T${a.hourAt}`);
        const dateB = new Date(`${b.dayAt}T${b.hourAt}`);
        return dateA.getTime() - dateB.getTime();
      });

      setSchedulings(sorted);
    } catch (error: unknown) {
      console.error('Erro ao buscar agendamentos:', error);
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { status: number; data: { message?: string; error?: string } } };
        console.error('Status:', axiosError.response.status);
        console.error('Data:', axiosError.response.data);
        
        toast.error(
          `Erro ${axiosError.response.status}: ${axiosError.response.data.message || axiosError.response.data.error || 'Erro ao buscar agendamentos'}`,
          { theme: "dark" }
        );
      } else {
        toast.error('Erro ao buscar agendamentos', { theme: "dark" });
      }
    } finally {
      setLoading(false);
    }
  }, [barberId]);

  useEffect(() => {
    if (barberId) {
      fetchSchedulings();
    }
  }, [barberId, fetchSchedulings]);

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
      {schedulings.length > 0 ? (
        schedulings.map((scheduling) => (
          <CardScheduling 
            key={scheduling.id} 
            scheduling={scheduling} 
            onClick={() => handleCardClick(scheduling)}
          />
        ))
      ) : (
        <p className="text-zinc-500 text-sm">Nenhum agendamento encontrado</p>
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

