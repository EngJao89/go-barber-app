'use client';

import { useState, useEffect } from "react";
import { X, Clock, User, Calendar } from "lucide-react";
import { toast } from "react-toastify";

import { Scheduling } from "@/@types/scheduling";
import { Barber } from "@/@types/barbers";
import api from "@/lib/axios";
import { Button } from "./ui/button";

interface AppointmentDrawerProps {
  appointment: Scheduling | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate?: () => void;
}

export function AppointmentDrawer({ appointment, isOpen, onClose, onStatusUpdate }: AppointmentDrawerProps) {
  const [barberData, setBarberData] = useState<Barber | null>(null);
  const [loadingBarber, setLoadingBarber] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);

  useEffect(() => {
    if (appointment && isOpen) {
      fetchBarberData();
    }
  }, [appointment, isOpen]);

  const fetchBarberData = async () => {
    if (!appointment) return;
    
    setLoadingBarber(true);
    try {
      const response = await api.get(`barbers/${appointment.barberId}`);
      setBarberData(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados do barbeiro:', error);
    } finally {
      setLoadingBarber(false);
    }
  };

  const handleConfirmAppointment = async () => {
    if (!appointment) return;

    setLoadingConfirm(true);
    try {
      await api.patch(`scheduling/${appointment.id}`, {
        status: 'confirmado'
      });
      
      toast.success('Agendamento confirmado com sucesso!', { theme: "dark" });
      onStatusUpdate?.();
      onClose();
    } catch (error) {
      console.error('Erro ao confirmar agendamento:', error);
      toast.error('Erro ao confirmar agendamento', { theme: "dark" });
    } finally {
      setLoadingConfirm(false);
    }
  };

  const handleCancelAppointment = async () => {
    if (!appointment) return;

    setLoadingCancel(true);
    try {
      await api.patch(`scheduling/${appointment.id}`, {
        status: 'cancelado'
      });
      
      toast.success('Agendamento cancelado com sucesso!', { theme: "dark" });
      onStatusUpdate?.();
      onClose();
    } catch (error) {
      console.error('Erro ao cancelar agendamento:', error);
      toast.error('Erro ao cancelar agendamento', { theme: "dark" });
    } finally {
      setLoadingCancel(false);
    }
  };

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
              <h3 className="text-orange-500 font-semibold mb-2">Informações do Barbeiro</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-zinc-400" />
                  <span className="text-zinc-100">
                    {loadingBarber ? 'Carregando...' : barberData?.name || 'Nome não encontrado'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {appointment.status === 'pendente' && (
                <Button 
                  onClick={handleConfirmAppointment}
                  disabled={loadingConfirm}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {loadingConfirm ? 'Confirmando...' : 'Confirmar Agendamento'}
                </Button>
              )}
              
              {appointment.status === 'confirmado' && (
                <Button 
                  onClick={handleCancelAppointment}
                  disabled={loadingCancel}
                  variant="outline" 
                  className="w-full border-red-600 text-red-400 hover:bg-red-900"
                >
                  {loadingCancel ? 'Cancelando...' : 'Cancelar Agendamento'}
                </Button>
              )}

              <Button variant="outline" className="w-full border-zinc-600 text-zinc-300 hover:bg-zinc-800">
                Editar Agendamento
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
