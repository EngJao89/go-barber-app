import { Clock, User } from "lucide-react";
import { Card, CardHeader } from "./ui/card";
import { Scheduling } from "@/@types/scheduling";

interface NextAppointmentCardProps {
  nextAppointment?: Scheduling;
}

export function NextAppointmentCard({ nextAppointment }: NextAppointmentCardProps) {
  if (!nextAppointment) {
    return (
      <Card className="border-zinc-400">
        <CardHeader className="py-3 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <p className="text-zinc-300 font-bold">Próximo Atendimento</p>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-600" />
              <p className="text-zinc-400">Nenhum agendamento</p>
            </div>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-zinc-400">
      <CardHeader className="py-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <p className="text-zinc-300 font-bold">Próximo Atendimento</p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-600" />
            <p className="text-zinc-400">{nextAppointment.hourAt}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <User className="w-4 h-4 text-zinc-400" />
          <p className="text-zinc-400 text-sm">{nextAppointment.serviceType}</p>
        </div>
      </CardHeader>
    </Card>
  );
} 