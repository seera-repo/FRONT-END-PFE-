import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import type {LessonCardProps} from "../types/types";


function LessonCase({ lesson, courseId }: LessonCardProps) {
  return (
    <Link
      key={lesson.id}
      to={`/courses/${courseId}/lessons/${lesson.id}`}
      className="group flex items-center gap-4 rounded-2xl border border-[#d4e5ea] bg-white px-5 py-4 transition-all hover:border-[#2F35C2]/30 hover:shadow-md"
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-colors bg-[#e8f0f3] text-[#59656e] group-hover:bg-[#2F35C2]/10 group-hover:text-[#2F35C2]`}
      >
        {lesson.order_index}
      </div>

      <div className="flex-1">
        <p className="font-semibold text-[#19232a]">
          {lesson.title}
        </p>
      </div>

      <Play className="h-4 w-4 text-[#59656e] transition-colors group-hover:text-[#2F35C2] group-hover:fill-[#d2d4f5]" />
    </Link>
  )
}

export default LessonCase