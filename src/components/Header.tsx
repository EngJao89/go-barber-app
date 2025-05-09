
import Image from "next/image"
import { FaPowerOff } from "react-icons/fa";

import logoHeader from "../../public/logo-header.png"
import { Button } from "./ui/button";

export function Header() {
  return(
    <nav className="bg-zinc-900 bg-opacity-30 backdrop-blur-lg">
      <div className="w-full h-full px-3 py-3">
        <div className="flex w-full items-center justify-around">
          <Image 
            src={logoHeader} 
            alt="Logo"
            className="w-32 h-auto m-4"
          />

          <div className="flex items-center gap-4"> {/* Container flex alinhando os itens ao centro */}
            <Image 
              src="https://github.com/EngJao89.png" 
              alt="Foto de perfil"
              width={48} 
              height={48}
              className="rounded-full"
            />
            
            <div>
              <h1 className="text-zinc-400 font-bold">Bem Vindo,</h1>
              <h1 className="text-orange-600 font-bold">João Ricardo Martins Ribeiro</h1>
            </div>
          </div>

          <Button>
            <FaPowerOff color="gray" size={32}/>
          </Button>
        </div>
      </div>
    </nav>
  )
}