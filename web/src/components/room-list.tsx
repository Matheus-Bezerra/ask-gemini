import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { useRooms } from "@/http/use-rooms";
import { dayjs } from "@/lib/dayjs";

export const RoomList = () => {
  const { data, isLoading } = useRooms();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Salas recentes</CardTitle>

        <CardDescription>
          Acesso rápido para as salas criadas recentemente
        </CardDescription>

        <CardContent className="flex flex-col gap-3">
          {isLoading && (
            <p className="text-muted-foreground text-sm">Carregando...</p>
          )}

          {data?.map((room) => (
            <Link
              key={room.id}
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50"
              to={`/room/${room.id}`}
            >
              <div className="flex-1 flex flex-col gap-1">
                <h3 className="font-medium">{room.name}</h3>

                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {dayjs(room.createdAt).toNow()}
                  </Badge>
                  <Badge variant="secondary">
                    {room.questionCount} pergunta(s)
                  </Badge>
                </div>
              </div>

              <span className="flex items-center gap-1 text-sm">
                Entrar
                <ArrowRight className="size-3" />
              </span>
            </Link>
          ))}
        </CardContent>
      </CardHeader>
    </Card>
  );
};
