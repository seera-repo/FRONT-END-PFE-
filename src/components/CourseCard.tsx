import type { CourseCardProps } from '../types/types';
import {Users, BookOpen, Heart } from 'lucide-react';



function CourseCard({ course }: CourseCardProps) {
  return (
    <div className=' bg-white duration-200 ease-in-out cursor-pointer justify-center border-[#DBDFD0]  bg-card text-card-foreground flex flex-col gap-6 border py-6 shadow-sm group h-full overflow-hidden rounded-2xl border-border bg-card transition-all hover:shadow-xl hover:-translate-y-1' key={course.id}>

      <img
        src={course.image_url ?? undefined}
        alt={course.title}
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div className="flex flex-col gap-3 px-6 p-4">
        <div className="flex items-center justify-between">

          <div className="px-3 py-1  active:opacity-80 text-[10px] font-bold rounded-2xl transition duration-200 ease-in-out cursor-pointer bg-[#d2d4f5] text-[#2F35C2]  ">
            {course.Categorie.name}
          </div>

          <span className="flex items-center gap-1 text-sm font-semibold text-foreground">
            <Heart className={`h-4 w-4 text-red-400 fill-current`} />
            {course.likes}
          </span>

        </div>

        <h2 className="text-lg font-bold leading-snug text-foreground">
          {course.title}
        </h2>

        <p className="line-clamp-2 text-sm text-[#4d555e] leading-relaxed ">
          {course.description}
        </p>

        <p className="text-sm  text-[#3f4246]">
          By{" "}
          <span className="font-medium text-black">
{/* username */}
            {course.Teacher.id}
          </span>
        </p>

        <div className="mt-auto flex items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground  text-[#4d555e]">

          <span className="flex items-center gap-1">
{/* nbr inrollments */}
            <Users className="h-3.5 w-3.5" /> {course.id}
          </span>
          <span className="flex items-center gap-1">
{/* nbr lessons */}
            <BookOpen className="h-3.5 w-3.5" /> {course.id} lessons
          </span>

        </div>
      </div>
    </div>
  )
}

export default CourseCard