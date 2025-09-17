"use client";

import { useState, useEffect } from "react";

import api from "@/lib/axios";
import { getCurrentDate } from "@/utils/getTimeStamp";
import { HeaderUser } from "@/components/HeaderUser";
import { SchedulingList } from "@/components/SchedulingList";
import { Calendar } from "@/components/Calendar";

export default function DashboardUser() {
  const currentDate = getCurrentDate();
  const [userId, setUserId] = useState<string>('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchUserId();
  }, []);

  const fetchUserId = async () => {
    try {
      const token = localStorage.getItem('authUserToken');
      if (!token) return;

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await api.post('auth-user/me', {}, { headers });
      setUserId(response.data.id);
    } catch (error) {
      console.error('Erro ao buscar ID do usuário:', error);
    }
  };

  const handleSchedulingCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return(
    <div>
      <HeaderUser />
      <div className="m-6">
        <div className="m-2">
          <h1 className="text-zinc-50 text-4xl font-bold">Meus horários</h1>
          <p className="text-orange-500 text-base font-normal">Hoje | Dia {currentDate.day} | {currentDate.weekday}</p>
        </div>
      </div>

      <div className="m-6 flex gap-8">
        <div className="flex-1">
          <h1 className="text-zinc-500 text-xl font-bold mb-4">Meus Agendamentos</h1>
          <SchedulingList key={refreshKey} />
        </div>
        <div className="w-1/2 h-fit flex justify-center">
          <Calendar 
            userId={userId} 
            onSchedulingCreated={handleSchedulingCreated}
          />
        </div>
      </div>
    </div>
  )
}
