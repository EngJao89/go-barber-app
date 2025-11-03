"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import api from "@/lib/axios";

import { Button } from "@/components/ui/button";
import { HeaderUser } from "@/components/HeaderUser";
import { UserAppointmentsHistory } from "@/components/UserAppointmentsHistory";


export default function HistoryUser() {
  const router = useRouter();
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    fetchUserId();
  }, []);

  const fetchUserId = async () => {
    try {
      const token = localStorage.getItem('authUserToken');
      if (!token) {
        router.push('/');
        return;
      }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await api.post('auth-user/me', {}, { headers });
      setUserId(response.data.id);
    } catch (error) {
      console.error('Erro ao buscar ID do usuário:', error);
      router.push('/');
    }
  };

  return(
    <div>
      <HeaderUser />
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
          {userId ? (
            <UserAppointmentsHistory userId={userId} />
          ) : (
            <div className="text-zinc-400">Carregando...</div>
          )}
        </div>
      </div>
    </div>
  )
}

