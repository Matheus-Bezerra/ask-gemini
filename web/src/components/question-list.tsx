import { useRoomQuestions } from "@/http/use-room-questions";
import { QuestionItem } from "./question-item";

interface QuestionListProps {
  roomId: string;
}

export const QuestionList = ({ roomId }: QuestionListProps) => {
  const { data } = useRoomQuestions(roomId);
  console.log("Questions data:", data);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-foreground">
          Perguntas & Respostas
        </h2>
      </div>

      {data &&
        data?.map((question) => (
          <QuestionItem key={question.id} question={question} />
        ))}
    </div>
  );
};
