'use client'

import Image from "next/image"
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiLogIn } from "react-icons/fi";

import logo from '../../../public/logo-v1.png';
import homeImg from '../../../public/home-gb.png';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export default function LoginBarber(){
  const router = useRouter();

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
            <Input 
              className="w-full h-12 px-4 text-zinc-100 bg-transparent border-zinc-400 rounded-lg focus:border-orange-500" 
              placeholder="Email"
            />

            <Input 
              className="w-full h-12 px-4 text-zinc-100 bg-transparent border-zinc-400 rounded-lg focus:border-orange-500" 
              placeholder="Senha"
              type="password"
            />

            <Button className="w-full h-12 bg-orange-600 hover:bg-orange-700 rounded-lg">
              <span className="text-zinc-100 font-medium hover:text-zinc-600">Entrar</span>
            </Button>

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