import { HeaderUser } from "@/components/HeaderUser";

export default function DashboardUser() {
  return(
    <div>
      <HeaderUser />
      <div className="m-6">
        <div className="m-2">
          <h1 className="text-zinc-50 text-4xl font-bold">Meus horários</h1>
          <p className="text-orange-500 text-base font-normal">Hoje | Dia 22 | Quinta feira</p>
        </div>

        <div className="ml-2 mr-2 mt-14">
          <h1 className="text-zinc-400 text-xl font-bold">Meu Agendamento</h1>
          <p className="text-orange-500 text-base font-normal">Hoje | Dia 04 | Quarta feira</p>
        </div>

        <div className="ml-2 mr-2 mt-14">
          <h1 className="text-zinc-400 text-xl font-bold">Meu Agendamento</h1>
          <p className="text-orange-500 text-base font-normal">Hoje | Dia 04 | Quarta feira</p>
        </div>

        <div className="ml-2 mr-2 mt-14">
          <h1 className="text-zinc-400 text-xl font-bold">Meu Agendamento</h1>
          <p className="text-orange-500 text-base font-normal">Hoje | Dia 23 | Segunda feira</p>
        </div>

        <div className="ml-2 mr-2 mt-14">
          <h1 className="text-zinc-400 text-xl font-bold">Meu Agendamento</h1>
          <p className="text-orange-500 text-base font-normal">Hoje | Dia 02 | Quarta feira</p>
        </div>
        <div className="ml-2 mr-2 mt-14">
          <h1 className="text-zinc-400 text-xl font-bold">Meu Agendamento</h1>
          <p className="text-orange-500 text-base font-normal">Hoje | Dia 29 | Terça feira</p>
        </div>
      </div>
    </div>
  )
}
