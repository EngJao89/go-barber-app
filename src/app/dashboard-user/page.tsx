import { HeaderUser } from "@/components/HeaderUser";
import { CardScheduling } from "@/components/CardScheduling";
import { Calendar } from "@/components/Calendar";
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
      
      <div className="m-6 flex gap-8">
        <div className="flex-1">
          <h1 className="text-zinc-500 text-xl font-bold mb-4">Atendimento Próximo</h1>
          <CardScheduling />
        </div>
        <div className="flex-1 flex justify-center">
          <Calendar />
        </div>
      </div>
    </div>
  )
}
