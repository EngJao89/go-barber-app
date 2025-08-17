import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardHeader, CardTitle } from "./ui/card";

export function CardScheduling() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>Agendamento</p>
        </CardTitle>
      </CardHeader>
    </Card>
  )
}
