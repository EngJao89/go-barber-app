'use client';

import { X, Clock, User, Calendar } from "lucide-react";
import { Scheduling } from "@/@types/scheduling";
import { Button } from "./ui/button";

interface AppointmentDrawerProps {
  appointment: Scheduling | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AppointmentDrawer({ appointment, isOpen, onClose }: AppointmentDrawerProps) {
  if (!appointment || !isOpen) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-zinc-900 w-96 max-h-[80vh] overflow-y-auto rounded-lg shadow-2xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-zinc-100 text-xl font-bold">Detalhes do Agendamento</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-zinc-400 hover:text-zinc-100"
            >
              <X size={20} />
            </Button>
          </div>

          <div className="space-y-6">
            <div className="bg-zinc-800 p-4 rounded-lg">
              <h3 className="text-orange-500 font-semibold mb-2">Tipo de Serviço</h3>
              <p className="text-zinc-100 text-lg">{appointment.serviceType}</p>
            </div>

            <div className="bg-zinc-800 p-4 rounded-lg">
              <h3 className="text-orange-500 font-semibold mb-2">Data e Horário</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-zinc-400" />
                  <span className="text-zinc-100">{formatDate(appointment.dayAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-zinc-400" />
                  <span className="text-zinc-100">{appointment.hourAt}</span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-800 p-4 rounded-lg">
              <h3 className="text-orange-500 font-semibold mb-2">Status</h3>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  appointment.status === 'confirmado' ? 'bg-green-500' :
                  appointment.status === 'pendente' ? 'bg-yellow-500' :
                  appointment.status === 'cancelado' ? 'bg-red-500' :
                  'bg-blue-500'
                }`}></div>
                <span className="text-zinc-100 capitalize">{appointment.status}</span>
              </div>
            </div>

            <div className="bg-zinc-800 p-4 rounded-lg">
              <h3 className="text-orange-500 font-semibold mb-2">Informações do Cliente</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-zinc-400" />
                  <span className="text-zinc-100">Cliente ID: {appointment.userId}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                Confirmar Agendamento
              </Button>
              <Button variant="outline" className="w-full border-zinc-600 text-zinc-300 hover:bg-zinc-800">
                Editar Agendamento
              </Button>
              <Button variant="outline" className="w-full border-red-600 text-red-400 hover:bg-red-900">
                Cancelar Agendamento
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 