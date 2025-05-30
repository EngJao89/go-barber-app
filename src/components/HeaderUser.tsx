'use client';

import { useCallback, useEffect, useState } from "react";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaPowerOff } from "react-icons/fa";
import axios, { AxiosError } from "axios";

import logoHeader from "../../public/logo-header.png"
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import api from "@/lib/axios";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  accessToken: string;
}

export function HeaderUser() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();
  const { userToken, setUserToken } = useAuth();

  const fetchUserData = useCallback(async () => {
    try {
      if (!userToken) {
        router.push('/');
        throw new Error('No token available');
      }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      };

      const response = await api.post<UserData>('auth-user/me', {}, { headers });
      setUserData(response.data);

      localStorage.setItem('userData', JSON.stringify(response.data));
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;
        if (axiosError.response) {
          if (axiosError.response.status === 401 || axiosError.response.data.error === 'Invalid Token') {
            handleLogout();
          }
          toast.error(`Error fetching user data: ${axiosError.response.data.message}`, { theme: "light" });
        } else if (axiosError.request) {
          toast.error('Error fetching user data. No response from server.', { theme: "light" });
        } else {
          toast.error(`Error fetching user data: ${axiosError.message}`, { theme: "light" });
        }
      } else {
        toast.error(`Unexpected error: ${error}`, { theme: "light" });
      }
    }
  }, [userToken, router]);

  useEffect(() => {
    const storedToken = localStorage.getItem('authUserToken');
    if (storedToken) {
      setUserToken(storedToken);
      fetchUserData();
    } else {
      router.replace('/');
    }
  }, [setUserToken, fetchUserData, router]);


  function handleLogout() {
    localStorage.removeItem('authUserToken');
    setUserToken(null);
    toast.warn('Você saiu! Até breve...', { theme: "light" });
    router.replace('/');
  }

  return(
    <nav className="bg-zinc-900 bg-opacity-30 backdrop-blur-lg">
      <div className="w-full h-full px-3 py-3">
        <div className="flex w-full items-center justify-around">
          <Image 
            src={logoHeader} 
            alt="Logo"
            className="w-32 h-auto m-4"
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
              <h1 className="text-orange-600 font-bold">{userData?.name}</h1>
            </div>
          </div>

          <Button onClick={handleLogout}>
            <FaPowerOff color="gray" size={32}/>
          </Button>
        </div>
      </div>
    </nav>
  )
}