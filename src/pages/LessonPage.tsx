import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ChevronRight, PlayCircle } from "lucide-react";
import { Link, useParams } from 'react-router-dom';
import Header from "../components/Header";
import { fetchLessons } from "../api/lessons";
import { useQuery } from "@tanstack/react-query";
//import ReactPlayer from "react-player";

// const lessons = [
//   { id: 1111111, title: "What is Computer Science?", description: "An algorithm is a step-by-step set of instructions to solve a problem. In this lesson, you will learn to think algorithmically using everyday examples like recipes and directions before applying these ideas to computer programs.", order_index: 1, vedio_url: "http://localhost:3000/uploads/videos/vedio_url-123.mp4" },
//   { id: 222222, title: "How Computers Think", description: "Time to write your first program! We will use a simple, beginner-friendly approach to create a program that greets the user. You will learn about code editors, running programs, and seeing your code come to life.", order_index: 2, vedio_url: "http://localhost:3000/uploads/videos/vedio_url-456.mp4" },
//   { id: 3333333, title: "Introduction to Algorithms", description: "Variables are containers for storing data. Learn about different data types like numbers, text, and booleans, and understand how to use them effectively in your programs.", order_index: 3, vedio_url: "http://localhost:3000/uploads/videos/vedio_url-789.mp4" },
//   { id: 4444444, title: "Your First Program", description: "Programs need to make decisions. Learn about conditional statements that let your code choose different paths based on conditions, making your programs smarter and more interactive.", order_index: 4, vedio_url: "http://localhost:3000/uploads/videos/vedio_url-012.mp4" },
//   { id: 5555555, title: "Variables & Data Types", description: "Loops let you repeat actions without writing the same code over and over. Master for-loops and while-loops to handle repetitive tasks efficiently.", order_index: 5, vedio_url: "http://localhost:3000/uploads/videos/vedio_url-345.mp4" },
// ]

function LessonPage() {

  const { id, lessonId } = useParams();

  const { data: lessonsData, isLoading: lessonsLoading } = useQuery({
    queryKey: ['lessons', id],
    queryFn: () => fetchLessons(id!),
  });

  if (lessonsLoading) return <p>Loading...</p>;

  const lessons = lessonsData ?? [];

  // id is a string (UUID), not a number
  const lesson = lessons.find(l => l.id === lessonId);


  if (!lesson) return <div>Lesson not found</div>;
  console.log('Video URL:', lesson.vedio_url);
  // order_index starts at 1, array starts at 0
  const prevLesson = lesson.order_index > 1
    ? lessons[lesson.order_index - 2]
    : null;

  const nextLesson = lesson.order_index < lessons.length
    ? lessons[lesson.order_index]
    : null;

  return (
    <div className="flex min-h-screen flex-col bg-[#f6f6fd]">
      <Header />
      <main className="flex-1 mt-20">
        <div className="mx-auto max-w-7xl px-6 py-8">
          {/* Breadcrumb */}
          <nav
            className="mb-6 flex items-center gap-1 text-sm text-[#59656e] "
            aria-label="Breadcrumb"
          >
            <Link
              to="/BrowseCourses"
              className="transition-colors hover:text-[#19232a]"
            >
              Courses
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link
              to={`/course/${id}`}
              className="transition-colors hover:text-[#19232a]"
            >
              Course
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />

            <span className="font-medium text-[#19232a]">
              Lesson {lesson?.order_index}
            </span>
          </nav>

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Main Content */}
            <div className="flex-1">
              {/* Lesson badge + title */}
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d2d4f5] text-sm font-bold text-[#2F35C2] ">
                  {lesson?.order_index}
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  Lesson {lesson.order_index} of {lessons.length}
                </span>
              </div>
              <h1 className="text-balance text-2xl font-extrabold text-foreground md:text-3xl">
                {lesson.title}
              </h1>

              {/* Video Player */}
              <div className="mt-6 overflow-hidden border-[#d4e5ea] rounded-2xl shadow-sm bg-white flex flex-col gap-6  border py-6 ">
                <div className="flex aspect-video items-center justify-center ">
                  <div className="flex flex-col items-center gap-3">
                      <video
                        src={lesson.vedio_url}
                        controls
                        className="w-full h-full rounded-lg"
                      />
                  </div>
                </div>
              </div>

              {/* Lesson Description */}
              <div className="mt-6 rounded-2xl border-[#d4e5ea] bg-white text-card-foreground flex flex-col gap-6  py-6 shadow-sm">
                <div className="p-6">
                  <h2 className="flex items-center gap-2 text-lg font-bold text-[#19232a]">
                    <BookOpen className="h-5 w-5 text-[#2F35C2]" />
                    Lesson Description
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-[#59656e]">
                    {lesson.description}
                  </p>
                </div>
              </div>

              <div className="w-full h-px bg-gray-300 my-6"></div>

              {/* Prev / Next Navigation */}
              <div className="flex items-center justify-between gap-4 py-2">
                {prevLesson ? (
                  <button
                    className="py-2 px-3 rounded-xl bg-[#585bc0] flex justify-center items-center text-white transition-colors shadow-2xl hover:bg-[#585bc0]/80 disabled:cursor-not-allowed "
                  >
                    <Link
                      className="flex"
                      to={`/courses/${id}/lessons/${prevLesson.id}`}
                    >
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      <span className="hidden sm:inline">
                        {prevLesson.title}
                      </span>
                      <span className="sm:hidden">Previous</span>
                    </Link>
                  </button>
                ) : (
                  <div />
                )}
                {nextLesson ? (
                  <button className="py-2 px-6 rounded-xl bg-[#585bc0] flex justify-center items-center text-white transition-colors hover:bg-[#585bc0]/80 disabled:cursor-not-allowed">
                    <Link
                      className="flex"
                      to={`/courses/${id}/lessons/${nextLesson.id}`}
                    >
                      <span className="hidden sm:inline">
                        {nextLesson.title}
                      </span>
                      <span className="sm:hidden">Next Lesson</span>
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </button>
                ) : (
                  <button className="p-2 rounded-xl bg-[#585bc0] flex justify-center items-center text-white transition-colors hover:bg-[#585bc0]/80 disabled:cursor-not-allowed">
                    <Link to={`/course/${id}`} className="flex">
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      Finish Course
                    </Link>
                  </button>
                )}
              </div>
            </div>

            {/* Sidebar: Lesson List */}
            <aside className="w-full shrink-0 lg:w-80">
              <div className="sticky top-24 rounded-2xl border-[#d4e5ea] bg-white text-[#19232a] flex flex-col gap-6 border py-6 shadow-sm">
                <div className="p-6">
                  <h3 className="mb-1 text-base font-bold text-[#19232a]">
                    All Lessons
                  </h3>
                  <p className="mb-4 text-xs text-[#59656e]">
                    {lessons.length} lessons total
                  </p>

                  <div className="flex flex-col gap-1">
                    {lessons.map((l, idx) => {
                      const isCurrent = l.id === lesson.id;

                      return (
                        <Link
                          key={l.id}
                          to={`/courses/${id}/lessons/${l.id}`}
                          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${isCurrent
                            ? "bg-[#4d51c8] font-semibold text-white shadow-sm"
                            : "text-[#676876] hover:bg-[#f0f0f0] hover:text-[#19232a]"
                            }`}
                        >
                          <span
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${isCurrent
                              ? "bg-white/20 text-white"
                              : "bg-[#dbdbfe] text-[#59656e]"
                              }`}
                          >
                            {idx + 1}
                          </span>

                          <span className="flex-1 truncate">
                            {l.title}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </aside>
          </div>

        </div>
      </main>
    </div>
  )
}

export default LessonPage