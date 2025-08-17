import { HeaderBarber } from "@/components/HeaderBarber";
import { CardScheduling } from "@/components/CardScheduling";
import { getCurrentDate } from "@/utils/getTimeStamp";

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
      <CardScheduling />
    </div>
  )
}
