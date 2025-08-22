import { getCurrentDate } from "@/utils/getTimeStamp";
import { HeaderBarber } from "@/components/HeaderBarber";
import { BarberSchedulingList } from "@/components/BarberSchedulingList";
import { Calendar } from "@/components/Calendar";

export default function DashboardBarber() {
  const currentDate = getCurrentDate();

  return(
    <div>
      <HeaderBarber />
      <div className="m-6">
        <div className="m-2">
          <h1 className="text-zinc-50 text-4xl font-bold">Horários Agendados</h1>
          <p className="text-orange-500 text-base font-normal">Hoje | Dia {currentDate.day} | {currentDate.weekday}</p>
        </div>
      </div>

      <div className="m-6 flex gap-8">
        <div className="flex-1">
          <h1 className="text-zinc-500 text-xl font-bold mb-4">Horários Disponíveis</h1>
          <BarberSchedulingList />
        </div>
        <div className="flex-1 flex justify-center">
          <Calendar />
        </div>
      </div>
    </div>
  )
}
