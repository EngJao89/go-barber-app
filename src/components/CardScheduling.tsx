import { Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardHeader } from "./ui/card";

export function CardScheduling() {
  return (
    <Card className="border-zinc-400">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-zinc-300 font-bold">Agendamento</p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-600" />
            <p className="text-zinc-400">08:00</p>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
