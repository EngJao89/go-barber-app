"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import api from "@/lib/axios";

import { Button } from "@/components/ui/button";
import { HeaderBarber } from "@/components/HeaderBarber";
import { BarberAppointmentsHistory } from "@/components/BarberAppointmentsHistory";

export default function HistoryBarber() {
  const router = useRouter();
  const [barberId, setBarberId] = useState<string>('');

  const fetchBarberId = useCallback(async () => {
    try {
      const token = localStorage.getItem('authBarberToken');
      if (!token) {
        router.push('/');
        return;
      }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await api.post('auth-barber/me', {}, { headers });
      setBarberId(response.data.id);
    } catch (error) {
      console.error('Erro ao buscar ID do barbeiro:', error);
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    fetchBarberId();
  }, [fetchBarberId]);

  return(
    <div>
      <HeaderBarber />
      <div className="m-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-zinc-400 hover:text-zinc-100"
          >
            <FiArrowLeft size={20} />
          </Button>
          <h1 className="text-zinc-50 text-3xl font-bold">Histórico de Agendamentos</h1>
        </div>

        <div className="mt-6">
          {barberId ? (
            <BarberAppointmentsHistory barberId={barberId} />
          ) : (
            <div className="text-zinc-400">Carregando...</div>
          )}
        </div>
      </div>
    </div>
  )
}

