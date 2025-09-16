'use client'

import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { CardScheduling } from "./CardScheduling";
import { Scheduling } from "@/@types/scheduling";
import { AppointmentDrawer } from "./AppointmentDrawer";

export function SchedulingList() {
  const [schedulings, setSchedulings] = useState<Scheduling[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<Scheduling | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    fetchSchedulings();
  }, []);

  const fetchSchedulings = async () => {
    try {
      const response = await api.get('scheduling');
      setSchedulings(response.data);
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterFutureSchedulings = (schedulings: Scheduling[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return schedulings.filter(scheduling => {
      const schedulingDate = new Date(scheduling.dayAt);
      schedulingDate.setHours(0, 0, 0, 0);
      return schedulingDate >= today;
    });
  };

  const groupSchedulingsByPeriod = (schedulings: Scheduling[]) => {
    const morning: Scheduling[] = [];
    const afternoon: Scheduling[] = [];
    const evening: Scheduling[] = [];

    schedulings.forEach(scheduling => {
      const hour = parseInt(scheduling.hourAt.split(':')[0]);
      
      if (hour >= 6 && hour < 12) {
        morning.push(scheduling);
      } else if (hour >= 12 && hour < 18) {
        afternoon.push(scheduling);
      } else {
        evening.push(scheduling);
      }
    });

    return { morning, afternoon, evening };
  };

  const futureSchedulings = filterFutureSchedulings(schedulings);
  const { morning, afternoon, evening } = groupSchedulingsByPeriod(futureSchedulings);

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
      <div>
        <h2 className="text-zinc-300 text-lg font-semibold mb-2">Manhã</h2>
        <div className="space-y-1">
          {morning.length > 0 ? (
            morning.map((scheduling) => (
              <CardScheduling 
                key={scheduling.id} 
                scheduling={scheduling} 
                onClick={() => handleCardClick(scheduling)}
              />
            ))
          ) : (
            <p className="text-zinc-500 text-sm">Nenhum agendamento pela manhã</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-zinc-300 text-lg font-semibold mb-2">Tarde</h2>
        <div className="space-y-1">
          {afternoon.length > 0 ? (
            afternoon.map((scheduling) => (
              <CardScheduling 
                key={scheduling.id} 
                scheduling={scheduling} 
                onClick={() => handleCardClick(scheduling)}
              />
            ))
          ) : (
            <p className="text-zinc-500 text-sm">Nenhum agendamento pela tarde</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-zinc-300 text-lg font-semibold mb-2">Noite</h2>
        <div className="space-y-1">
          {evening.length > 0 ? (
            evening.map((scheduling) => (
              <CardScheduling 
                key={scheduling.id} 
                scheduling={scheduling} 
                onClick={() => handleCardClick(scheduling)}
              />
            ))
          ) : (
            <p className="text-zinc-500 text-sm">Nenhum agendamento pela noite</p>
          )}
        </div>
      </div>

      <AppointmentDrawer
        appointment={selectedAppointment}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
}
