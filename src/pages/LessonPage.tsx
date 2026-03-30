import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ChevronRight, PlayCircle } from "lucide-react";
import { Link, useParams } from 'react-router-dom';
import Header from "../components/Header";
//import ReactPlayer from "react-player";

const lessons = [
  { id: 1, title: "What is Computer Science?", description: "An algorithm is a step-by-step set of instructions to solve a problem. In this lesson, you will learn to think algorithmically using everyday examples like recipes and directions before applying these ideas to computer programs.", order_index: 1, vedio_url: "http://localhost:3000/uploads/videos/vedio_url-123.mp4" },
  { id: 2, title: "How Computers Think", description: "An algorithm is a step-by-step set of instructions to solve a problem. In this lesson, you will learn to think algorithmically using everyday examples like recipes and directions before applying these ideas to computer programs.", order_index: 2, vedio_url: "http://localhost:3000/uploads/videos/vedio_url-456.mp4" },
  { id: 3, title: "Introduction to Algorithms", description: "An algorithm is a step-by-step set of instructions to solve a problem. In this lesson, you will learn to think algorithmically using everyday examples like recipes and directions before applying these ideas to computer programs.", order_index: 3, vedio_url: "http://localhost:3000/uploads/videos/vedio_url-789.mp4" },
  { id: 4, title: "Your First Program", description: "An algorithm is a step-by-step set of instructions to solve a problem. In this lesson, you will learn to think algorithmically using everyday examples like recipes and directions before applying these ideas to computer programs.", order_index: 4, vedio_url: "http://localhost:3000/uploads/videos/vedio_url-012.mp4" },
  { id: 5, title: "Variables & Data Types", description: "An algorithm is a step-by-step set of instructions to solve a problem. In this lesson, you will learn to think algorithmically using everyday examples like recipes and directions before applying these ideas to computer programs.", order_index: 5, vedio_url: "http://localhost:3000/uploads/videos/vedio_url-345.mp4" },
]

function LessonPage() {
  const { id, lessonId } = useParams<{
    id: string;
    lessonId: string;
  }>();
  // get lesson by id from parrams
  const lessonIdNumber = Number(lessonId);
  const lesson = lessons.find(l => l.id === lessonIdNumber);

  if (!lesson) {
    return <div>Lesson not found</div>;
  }
  const prevLesson = lesson.order_index > 0
    ? lessons[lesson.order_index - 1]
    : null;

  const nextLesson = lesson.order_index + 1 < lessons.length
    ? lessons[lesson.order_index + 1]
    : null;

  return (
    <div className="flex min-h-screen flex-col bg-[#f6f6fd]">
      <Header />
      <main className="flex-1 mt-20">
        <div className="mx-auto max-w-7xl px-6 py-8">
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

          <div>
            <div>
              <div className="flex-1">
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
                      <div className="flex h-20 w-20 items-center justify-center rounded-full">
                        <PlayCircle className="h-12 w-12 text-[#091b21]" />
                      </div>
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

                {/* <Separator className="my-8" /> */}

                {/* Prev / Next Navigation */}
              <div className="flex items-center justify-between gap-4">
                {prevLesson ? (
                  <button
                    className="rounded-xl"
                  >
                    <Link
                      to={`/courses/${id}/lessons/${leson}`}
                    >
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      <span className="hidden sm:inline">
                        {prevLesson.title}
                      </span>
                      <span className="sm:hidden">Previous</span>
                    </Link>
                  </Button>
                ) : (
                  <div />
                )}
                {nextLesson ? (
                  <Button size="lg" asChild className="rounded-xl">
                    <Link
                      href={`/courses/${id}/lessons/${lessonIndex + 2}`}
                    >
                      <span className="hidden sm:inline">
                        {nextLesson.title}
                      </span>
                      <span className="sm:hidden">Next Lesson</span>
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                ) : (
                  <Button size="lg" asChild className="rounded-xl">
                    <Link href={`/courses/${id}`}>
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      Finish Course
                    </Link>
                  </Button>
                )}
              </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default LessonPage