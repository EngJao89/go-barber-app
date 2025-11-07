'use client';

import { useCallback, useEffect, useState } from "react";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaPowerOff } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import axios, { AxiosError } from "axios";

import logoHeader from "../../public/logo-header.png"
import api from "@/lib/axios";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import { Barber } from "@/@types/barbers";

export function HeaderBarber() {
  const [barberData, setBarberData] = useState<Barber | null>(null);
  const router = useRouter();
  const { barberToken, setBarberToken } = useAuth();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('authBarberToken');
    setBarberToken(null);
    toast.warn('Você saiu! Até breve...', { theme: "dark" });
    router.replace('/login-barber');
  }, [setBarberToken, router]);

  const fetchBarberData = useCallback(async () => {
    try {
      if (!barberToken) {
        console.warn('Token do barbeiro não encontrado no HeaderBarber');
        router.push('/login-barber');
        return;
      }

      const response = await api.post<Barber>('auth-barber/me', {});
      setBarberData(response.data);
      localStorage.setItem('userData', JSON.stringify(response.data));
    } catch (error: unknown) {
      console.error('HeaderBarber: Erro ao buscar dados do barbeiro:', error);
      
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string; error: string }>;
        if (axiosError.response) {
          if (axiosError.response.status === 401 || axiosError.response.data.error === 'Invalid Token') {
            console.warn('HeaderBarber: Token inválido, fazendo logout...');
            handleLogout();
          } else {
            toast.error(`Error fetching barber data: ${axiosError.response.data.message}`, { theme: "dark" });
          }
        } else if (axiosError.request) {
          toast.error('Error fetching barber data. No response from server.', { theme: "dark" });
        } else {
          toast.error(`Error fetching barber data: ${axiosError.message}`, { theme: "dark" });
        }
      } else {
        toast.error(`Unexpected error: ${error}`, { theme: "dark" });
      }
    }
  }, [barberToken, router, handleLogout]);

  useEffect(() => {
    const storedToken = localStorage.getItem('authBarberToken');
    if (storedToken) {
      setBarberToken(storedToken);
    } else {
      router.replace('/');
    }
  }, [setBarberToken, router]);

  useEffect(() => {
    if (barberToken) {
      fetchBarberData();
    }
  }, [barberToken, fetchBarberData]);

  const handleProfileClick = () => {
    router.push('/profile-barber');
  };

  const handleLogoClick = () => {
    router.push('/dashboard-barber');
  };

  const handleHistoryClick = () => {
    router.push('/history-barber');
  };

  return(
    <nav className="bg-zinc-900 bg-opacity-30 backdrop-blur-lg min-h-[80px]">
      <div className="w-full h-full px-6 py-4">
        <div className="flex w-full items-center justify-around">
          <Image 
            src={logoHeader} 
            alt="Logo"
            className="w-32 h-auto cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleLogoClick}
          />

          <div className="flex items-center gap-4">
            <Image 
              src="https://github.com/EngJao89.png" 
              alt="Foto de perfil"
              width={48} 
              height={48}
              className="rounded-full"
            />
            
            <div>
              <h1 className="text-zinc-400 font-bold">Bem Vindo,</h1>
              <Button
                variant="ghost"
                onClick={handleProfileClick}
                className="text-orange-600 font-bold p-0 h-auto hover:text-orange-500 hover:bg-transparent"
              >
                {barberData?.name || "Carregando..."}
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={handleHistoryClick}
              className="text-zinc-400 hover:text-zinc-100"
              title="Histórico de Agendamentos"
            >
              <FiClock size={24} />
            </Button>
            <Button onClick={handleLogout}>
              <FaPowerOff color="gray" size={32}/>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
