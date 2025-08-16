import { HeaderUser } from "@/components/HeaderUser";
import { CardScheduling } from "@/components/CardScheduling";
import { getCurrentDate } from "@/utils/getTimeStamp";

export default function DashboardUser() {
  const currentDate = getCurrentDate();

  return(
    <div>
      <HeaderUser />
      <div className="m-6">
        <div className="m-2">
          <h1 className="text-zinc-50 text-4xl font-bold">Meus horários</h1>
          <p className="text-orange-500 text-base font-normal">Hoje | Dia {currentDate.day} | {currentDate.weekday}</p>
        </div>
      </div>
      <div className="m-6">
        <h1 className="text-zinc-300 text-xl font-bold">Atendimento Próximo</h1>
        <CardScheduling />
      </div>
    </div>
  )
}
