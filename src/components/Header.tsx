
import Image from "next/image"

import logoHeader from "../../public/logo-header.png"

export function Header() {
  return(
    <nav className="bg-zinc-900 bg-opacity-30 backdrop-blur-lg">
      <div className="w-full h-full px-3 py-3">
        <Image 
          src={logoHeader} 
          alt="Logo"
          className="w-10 h-auto mb-4"/>
      </div>
    </nav>
  )
}