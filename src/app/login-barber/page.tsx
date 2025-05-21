'use client'

import Image from "next/image"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FiArrowLeft, FiLogIn } from "react-icons/fi";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import axios from 'axios';

import logo from '../../../public/logo-v1.png';
import homeImg from '../../../public/home-gb.png';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("E-mail é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginBarber(){
  const router = useRouter();
  const methods = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit, formState: { errors } } = methods;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem('authUserToken');
      if (token) {
        router.replace('/dashboard-barber');
      }
    }
  }, [router]);

    const onSubmit = async (data: LoginSchema) => {
    try {
      if (!data.email || !data.password) {
        toast.warning('Por favor, forneça o nome de usuário e a senha', {theme: "light"});
        throw new Error('Por favor, forneça o nome de usuário e a senha');
      }

      const response = await api.post('auth-barber/login', data, { withCredentials: true });

      if (response.data.accessToken) {
        localStorage.setItem('authUserToken', response.data.accessToken);
        toast.success(`Usuário Logado: ${data.email}, Seja Bem vindo!`, {theme: "light"})
        router.replace('/dashboard-barber');
      } else {
        toast.error('Token não encontrado na resposta', {theme: "light"})
        throw new Error('Token não encontrado na resposta');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = 'Login falhou. Por favor, verifique suas credenciais e tente novamente.';
        toast.error(axiosError, {theme: "light"});
      } else {
        toast.error('Ocorreu um erro inesperado. Tente novamente mais tarde.', {theme: "light"});
      }
    }
  };

  return(
    <div className="flex min-h-screen">
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="flex flex-col items-center max-w-md w-full gap-6">
          <Image 
            src={logo} 
            alt="Logo"
            className="w-60 h-auto mb-4" 
          />
          <h1 className="mt-4 mb-4 text-2xl font-bold text-zinc-100">
            Login Barbeiro
          </h1>

          <div className="w-full space-y-4">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="relative z-10">
                <FormField
                  name="email"
                  control={methods.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="Seu Usuário" 
                          {...field} 
                          value={field.value || ''} 
                          className="w-full h-12 px-4 text-zinc-100 bg-transparent border-zinc-400 rounded-lg focus:border-orange-500" 
                        />
                      </FormControl>
                      {errors.email && <FormMessage className="ml-4 text-zinc-400">{errors.email.message}</FormMessage>}
                    </FormItem>
                  )}
                />

                <FormField
                  name="password"
                  control={methods.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Sua Senha" 
                          {...field} 
                          value={field.value || ''} 
                          className="w-full h-12 px-4 text-zinc-100 bg-transparent mt-4 border-zinc-400 rounded-lg focus:border-orange-500" 
                        />
                      </FormControl>
                      {errors.password && <FormMessage className="ml-4 text-zinc-400">{errors.password.message}</FormMessage>}
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit"
                  className="w-full h-12 mt-4 bg-orange-600 hover:bg-orange-800 rounded-lg"
                >
                  <span className="text-zinc-100 font-medium hover:text-zinc-600">Entrar</span>
                </Button>
              </form>
            </FormProvider>

            <Button className="w-full flex justify-center items-center">
              <h1 className="text-zinc-100 font-bold hover:text-zinc-600">Esqueci minha senha</h1>
            </Button>

            <Button 
              onClick={() => router.push('/register-barber')} 
              className="w-full flex mt-32 justify-center items-center "
            >
              <FiLogIn size={12} className="text-orange-600"/>
              <h1 className="text-orange-600 hover:text-orange-800 font-bold">Criar conta de Barbeiro</h1>
            </Button>

            <Button 
              onClick={() => router.push('/')} 
              className="w-full flex justify-center items-center"
            >
              <FiArrowLeft size={12} className="text-orange-600"/>
              <h1 className="text-orange-600 hover:text-orange-800 font-bold">Voltar para login de usuário</h1>
            </Button>
          </div>
        </div>
      </div>

      <div className="w-1/2 h-screen">
        <Image 
          src={homeImg} 
          alt="Home Image"
          className="object-cover w-full h-full" 
          priority
        />
      </div>
    </div>
  )
}