import { getCurrentDate } from "@/utils/getTimeStamp";
import { HeaderUser } from "@/components/HeaderUser";
import { SchedulingList } from "@/components/SchedulingList";
import { Calendar } from "@/components/Calendar";

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
        <div className="w-1/2">
          <h1 className="text-zinc-500 text-xl font-bold mb-4">Meus Agendamentos</h1>
          <SchedulingList />
        </div>
        <div className="w-1/2 h-fit flex justify-center">
          <Calendar />
        </div>
      </div>
    </div>
  )
}
