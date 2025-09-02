import { Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardHeader } from "./ui/card";
import { Scheduling } from "@/@types/scheduling";

interface CardSchedulingProps {
  scheduling?: Scheduling;
  onClick?: () => void;
}

export function CardScheduling({ scheduling, onClick }: CardSchedulingProps) {
  return (
    <Card 
      className="border-zinc-400 m-2 cursor-pointer hover:border-orange-500 transition-colors" 
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-zinc-300 font-bold">
              {scheduling?.serviceType || "Agendamento"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-600" />
            <p className="text-zinc-400">
              {scheduling?.hourAt || "08:00"}
            </p>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
