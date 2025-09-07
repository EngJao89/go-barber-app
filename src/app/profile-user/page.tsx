'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { FiArrowLeft, FiUser, FiMail, FiPhone } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { HeaderUser } from "@/components/HeaderUser";
import api from "@/lib/axios";
import { User } from "@/@types/users";

const profileSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 caracteres"),
});

export type ProfileSchema = z.infer<typeof profileSchema>;

export default function ProfileUser() {
  const router = useRouter();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const methods = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
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
      const user = response.data;

      const userResponse = await api.get(`users/${user.id}`, { headers });
      const fullUserData = userResponse.data;

      setUserData(fullUserData);

      setValue('name', fullUserData.name);
      setValue('email', fullUserData.email);
      setValue('phone', fullUserData.phone);

    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      toast.error('Erro ao carregar dados do usuário', { theme: "light" });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ProfileSchema) => {
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

      await api.put(`users/${userData?.id}`, data, { headers });
      
      toast.success('Perfil atualizado com sucesso!', { theme: "light" });
      
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      toast.error('Erro ao atualizar perfil', { theme: "light" });
    }
  };

  if (loading) {
    return (
      <div>
        <HeaderUser />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-zinc-400">Carregando...</div>
        </div>
      </div>
    );
  }

  return (
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
          <h1 className="text-zinc-50 text-3xl font-bold">Meu Perfil</h1>
        </div>

        <div className="flex gap-8">
          <div className="w-1/2 flex flex-col items-center justify-center">
            <Avatar className="w-48 h-48 mb-6">
              <AvatarImage src="https://github.com/EngJao89.png" />
              <AvatarFallback className="text-4xl">
                {userData?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-zinc-100 text-2xl font-bold">{userData?.name}</h2>
            <p className="text-zinc-400">{userData?.email}</p>
          </div>

          <div className="w-1/2">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={methods.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={20} />
                            <Input
                              {...field}
                              placeholder="Nome completo"
                              className="pl-10 bg-zinc-800 border-zinc-600 text-zinc-100 placeholder-zinc-400"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={methods.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={20} />
                            <Input
                              {...field}
                              type="email"
                              placeholder="E-mail"
                              className="pl-10 bg-zinc-800 border-zinc-600 text-zinc-100 placeholder-zinc-400"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={methods.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={20} />
                            <Input
                              {...field}
                              placeholder="Telefone"
                              className="pl-10 bg-zinc-800 border-zinc-600 text-zinc-100 placeholder-zinc-400"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-orange-600 hover:bg-orange-700"
                  >
                    Salvar Alterações
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="flex-1 border-zinc-600 text-zinc-300 hover:bg-zinc-800"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
