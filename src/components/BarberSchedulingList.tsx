'use client'

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { BarberScheduling } from "@/@types/barberScheduling";
import { BarberSchedulingCard } from "./BarberSchedulingCard";

export function BarberSchedulingList() {
  const [barberScheduling, setBarberScheduling] = useState<BarberScheduling[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBarberSchedulings();
  }, []);

  const fetchBarberSchedulings = async () => {
    try {
      const response = await api.get('barber-availability');
      setBarberScheduling(response.data);
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupSchedulingsByPeriod = (barberSchedulings: BarberScheduling[]) => {
    const morning: BarberScheduling[] = [];
    const afternoon: BarberScheduling[] = [];
    const evening: BarberScheduling[] = [];

    barberSchedulings.forEach(barberSchedulings => {
      const hour = parseInt(barberSchedulings.startTime.split(':')[0]);
      
      if (hour >= 6 && hour < 12) {
        morning.push(barberSchedulings);
      } else if (hour >= 12 && hour < 18) {
        afternoon.push(barberSchedulings);
      } else {
        evening.push(barberSchedulings);
      }
    });

    return { morning, afternoon, evening };
  };

  const { morning, afternoon, evening } = groupSchedulingsByPeriod(barberScheduling);

  if (loading) {
    return <div className="text-zinc-400">Carregando agendamentos...</div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-zinc-300 text-lg font-semibold mb-2">Manhã</h2>
        <div className="space-y-1">
          {morning.length > 0 ? (
            morning.map((scheduling) => (
              <BarberSchedulingCard key={scheduling.id} scheduling={scheduling} />
            ))
          ) : (
            <p className="text-zinc-500 text-sm">Nenhum horário pela manhã</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-zinc-300 text-lg font-semibold mb-2">Tarde</h2>
        <div className="space-y-1">
          {afternoon.length > 0 ? (
            afternoon.map((scheduling) => (
              <BarberSchedulingCard key={scheduling.id} scheduling={scheduling} />
            ))
          ) : (
            <p className="text-zinc-500 text-sm">Nenhum horário pela tarde</p>
          )}
        </div>
      </div>

      {/* Noite */}
      <div>
        <h2 className="text-zinc-300 text-lg font-semibold mb-2">Noite</h2>
        <div className="space-y-1">
          {evening.length > 0 ? (
            evening.map((scheduling) => (
              <BarberSchedulingCard key={scheduling.id} scheduling={scheduling} />
            ))
          ) : (
            <p className="text-zinc-500 text-sm">Nenhum horário pela noite</p>
          )}
        </div>
      </div>
    </div>
  );
}