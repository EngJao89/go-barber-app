'use client'

import { useState, useEffect, useCallback } from "react";
import api from "@/lib/axios";
import { Scheduling } from "@/@types/scheduling";
import { NextAppointmentCard } from "./NextAppointmentCard";

interface BarberNextAppointmentProps {
  readonly barberId: string;
}

export function BarberNextAppointment({ barberId }: BarberNextAppointmentProps) {
  const [nextAppointment, setNextAppointment] = useState<Scheduling | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchNextAppointment = useCallback(async () => {
    try {
      const response = await api.get('scheduling');

      const barberSchedulings = response.data.filter((scheduling: Scheduling) => 
        scheduling.barberId === barberId
      );

      const today = new Date();
      const futureSchedulings = barberSchedulings.filter((scheduling: Scheduling) => {
        const schedulingDateTime = new Date(`${scheduling.dayAt}T${scheduling.hourAt}`);
        return schedulingDateTime >= today && scheduling.status !== 'cancelado';
      });

      if (futureSchedulings.length > 0) {
        const sorted = futureSchedulings.sort((a: Scheduling, b: Scheduling) => {
          const dateA = new Date(`${a.dayAt}T${a.hourAt}`);
          const dateB = new Date(`${b.dayAt}T${b.hourAt}`);
          return dateA.getTime() - dateB.getTime();
        });
        setNextAppointment(sorted[0]);
      }
    } catch (error) {
      console.error('Erro ao buscar próximo agendamento:', error);
    } finally {
      setLoading(false);
    }
  }, [barberId]);

  useEffect(() => {
    if (barberId) {
      fetchNextAppointment();
    }
  }, [barberId, fetchNextAppointment]);

  if (loading) {
    return <div className="text-zinc-400">Carregando...</div>;
  }

  return <NextAppointmentCard nextAppointment={nextAppointment || undefined} />;
}

