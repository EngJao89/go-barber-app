"use client";

import { useState, useEffect } from "react";
import { getCurrentDate } from "@/utils/getTimeStamp";
import { HeaderBarber } from "@/components/HeaderBarber";
import { BarberSchedulingList } from "@/components/BarberSchedulingList";
import { BarberNextAppointment } from "@/components/BarberNextAppointment";
import { BarberAppointmentsList } from "@/components/BarberAppointmentsList";
import { BarberPendingAppointments } from "@/components/BarberPendingAppointments";
import { Calendar } from "@/components/Calendar";
import api from "@/lib/axios";

export default function DashboardBarber() {
  const currentDate = getCurrentDate();
  const [barberId, setBarberId] = useState<string>('');

  useEffect(() => {
    fetchBarberId();
  }, []);

  const fetchBarberId = async () => {
    try {
      const token = localStorage.getItem('authBarberToken');
      if (!token) {
        console.warn('Token do barbeiro não encontrado');
        return;
      }

      const response = await api.post('auth-barber/me', {});

      if (response.data?.id) {
        setBarberId(response.data.id);
      } else {
        console.error('ID do barbeiro não encontrado na resposta:', response.data);
      }
    } catch (error: unknown) {
      console.error('Erro ao buscar ID do barbeiro:', error);
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { status: number; data: { message?: string; error?: string } } };
        console.error('Status:', axiosError.response.status);
        console.error('Data:', axiosError.response.data);
      }
    }
  };

  return(
    <div>
      <HeaderBarber />
      <div className="m-6">
        <div className="m-2">
          <h1 className="text-zinc-50 text-4xl font-bold">Horários Agendados</h1>
          <p className="text-orange-500 text-base font-normal">Hoje | Dia {currentDate.day} | {currentDate.weekday}</p>
        </div>
      </div>

      <div className="m-6 flex gap-8">
        <div className="w-1/2">
          <h1 className="text-zinc-500 text-xl font-bold mb-4">Próximo Atendimento</h1>
          {barberId && <BarberNextAppointment barberId={barberId} />}
        </div>
        <div className="w-1/2">
          <h1 className="text-zinc-500 text-xl font-bold mb-4">Agendamentos Confirmados</h1>
          {barberId && <BarberAppointmentsList barberId={barberId} />}
        </div>
      </div>

      <div className="m-6">
        <h1 className="text-zinc-500 text-xl font-bold mb-4">Agendamentos a Confirmar</h1>
        {barberId && <BarberPendingAppointments barberId={barberId} />}
      </div>

      <div className="m-6 flex gap-8">
        <div className="flex-1">
          <h1 className="text-zinc-500 text-xl font-bold mb-4">Horários Disponíveis</h1>
          <BarberSchedulingList />
        </div>
        <div className="w-1/2 h-fit flex justify-center">
          <Calendar />
        </div>
      </div>
    </div>
  )
}
