import { HeaderBarber } from "@/components/HeaderBarber";

export default function DashboardBarber() {
  return(
    <div>
      <HeaderBarber />
      <div className="m-6">
        <div className="m-2">
          <h1 className="text-zinc-50 text-4xl font-bold">Horários Agendados</h1>
          <p className="text-orange-500 text-base font-normal">Hoje | Dia 22 | Quinta feira</p>
        </div>

        <div className="ml-2 mr-2 mt-14">
          <h1 className="text-zinc-400 text-xl font-bold">Agenda do dia</h1>
          <p className="text-orange-500 text-base font-normal">Hoje | Dia 22 | Quinta feira</p>
        </div>
      </div>
    </div>
  )
}