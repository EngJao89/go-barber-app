'use client'

import { useEffect, useState, useCallback } from "react";
import api from "@/lib/axios";
import { BarberScheduling } from "@/@types/barberScheduling";
import { BarberSchedulingCard } from "./BarberSchedulingCard";
import { toast } from "react-toastify";

export function BarberSchedulingList() {
  const [barberScheduling, setBarberScheduling] = useState<BarberScheduling[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBarberSchedulings = useCallback(async () => {
    try {
      const response = await api.get('barber-availability');

      if (Array.isArray(response.data)) {
        setBarberScheduling(response.data);
      } else {
        console.warn('Resposta não é um array:', response.data);
        setBarberScheduling([]);
      }
    } catch (error: unknown) {
      console.error('Erro ao buscar horários disponíveis:', error);
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { status: number; data: { message?: string; error?: string } } };
        
        console.error('Status do erro:', axiosError.response.status);
        console.error('Data do erro:', axiosError.response.data);
        if (axiosError.response.status === 401) {
          console.warn('Token inválido. Redirecionando...');
        } else {
          toast.error(
            `Erro ${axiosError.response.status}: ${axiosError.response.data.message || axiosError.response.data.error || 'Erro ao carregar horários disponíveis'}`,
            { theme: "dark" }
          );
        }
      } else {
        toast.error('Erro ao carregar horários disponíveis', { theme: "dark" });
      }
      
      setBarberScheduling([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBarberSchedulings();
  }, [fetchBarberSchedulings]);

  const groupSchedulingsByPeriod = (barberSchedulings: BarberScheduling[]) => {
    const morning: BarberScheduling[] = [];
    const afternoon: BarberScheduling[] = [];
    const evening: BarberScheduling[] = [];

    for (const scheduling of barberSchedulings) {
      const hour = Number.parseInt(scheduling.startTime.split(':')[0], 10);
      
      if (hour >= 6 && hour < 12) {
        morning.push(scheduling);
      } else if (hour >= 12 && hour < 18) {
        afternoon.push(scheduling);
      } else {
        evening.push(scheduling);
      }
    }

    return { morning, afternoon, evening };
  };

  const { morning, afternoon, evening } = groupSchedulingsByPeriod(barberScheduling);
  const hasAnyScheduling = morning.length > 0 || afternoon.length > 0 || evening.length > 0;

  if (loading) {
    return <div className="text-zinc-400">Carregando agendamentos...</div>;
  }

  if (!hasAnyScheduling) {
    return (
      <div className="text-zinc-500 text-sm text-center py-8">
        Nenhum horário disponível
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {morning.length > 0 && (
        <div>
          <h2 className="text-zinc-300 text-lg font-semibold mb-2">Manhã</h2>
          <div className="space-y-1">
            {morning.map((scheduling) => (
              <BarberSchedulingCard key={scheduling.id} scheduling={scheduling} />
            ))}
          </div>
        </div>
      )}

      {afternoon.length > 0 && (
        <div>
          <h2 className="text-zinc-300 text-lg font-semibold mb-2">Tarde</h2>
          <div className="space-y-1">
            {afternoon.map((scheduling) => (
              <BarberSchedulingCard key={scheduling.id} scheduling={scheduling} />
            ))}
          </div>
        </div>
      )}

      {evening.length > 0 && (
        <div>
          <h2 className="text-zinc-300 text-lg font-semibold mb-2">Noite</h2>
          <div className="space-y-1">
            {evening.map((scheduling) => (
              <BarberSchedulingCard key={scheduling.id} scheduling={scheduling} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}