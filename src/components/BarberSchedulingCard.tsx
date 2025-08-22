import { Clock } from "lucide-react";
import { Card, CardHeader } from "./ui/card";
import { BarberScheduling } from "@/@types/barberScheduling";

interface BarberSchedulingCardProps {
  scheduling: BarberScheduling;
}

export function BarberSchedulingCard({ scheduling }: BarberSchedulingCardProps) {
  return (
    <Card className="border-zinc-400">
      <CardHeader className="py-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <p className="text-zinc-300 font-bold">Horário Disponível</p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-600" />
            <p className="text-zinc-400">
              {scheduling.startTime} - {scheduling.endTime}
            </p>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
} 