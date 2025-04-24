import Image from "next/image"
import logo from '../../public/logo-v1.png';
import homeImg from '../../public/home-gb.png';

export default function Home() {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col items-center justify-center text-center p-16 gap-4">
        <Image 
          src={logo} 
          alt="Logo" 
        />
        <h1 className="text-2xl font-bold text-zinc-100">
          Go Barber App
        </h1>
      </div>

      <div className="w-1/2">
        <Image 
          src={homeImg} 
          alt="Home Image"
          className="object-contain w-full" 
        />
      </div>
    </div>
  );
}