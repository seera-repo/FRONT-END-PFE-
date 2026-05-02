import Header from "../components/Header"
import thumbnail from '../assets/images/thumbnail.png';
import { ArrowLeft, BookOpen, Heart, Play, Users, CheckCircle2, MessageSquare, Send, Sparkles } from "lucide-react";
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState, type FormEvent, } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import LessonCase from "../components/LessonCase";
import Comment from '../components/Comment';
import { useQuery } from '@tanstack/react-query'
import { fetchCourseById } from "../api/courses";
import { fetchLessons } from "../api/lessons";
import { fetchQuizByCourse } from "../api/quize";
import { addComment, fetchCommentsByCourse } from "../api/course_comments";
import { enrole, removeEnrollment } from "../api/enrollment";
import { removeSavedCourse, saveCourse } from "../api/savedCourses";
import type { CourseComment } from "../types/types"


const Course = () => {
  const queryClient = useQueryClient();

  const { id } = useParams();
  const [saved, setSaved] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [newComment, setNewComment] = useState("")
  const [Error, setError] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(
    {}
  )

  const { data: quizData, isLoading: quizLoading } = useQuery({
    queryKey: ['quiz', id],
    queryFn: () => fetchQuizByCourse(id!),
    enabled: enrolled, // only fetch if enrolled
  });


  const quizQuestions = (quizData ?? []).map((q) => ({
    question: q.question,
    options: [q.option_a, q.option_b, q.option_c, q.option_d],
    answer: ["a", "b", "c", "d"].indexOf(q.correct_answer), // converts "a" → 0, "b" → 1 etc
  }));
  //FECH LESONS
  const { data: lessons, isLoading: lessonsLoading } = useQuery({
    queryKey: ['lessons', id],
    queryFn: () => fetchLessons(id!),
  });

  //FECH COURSE
  const { data, isLoading: courseLoading, error } = useQuery({
    queryKey: ['Course', id],
    queryFn: () => fetchCourseById(id!),
  });

  //FECH COMMENTS
  const { data: commentsData, isLoading: commentsLoading } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => fetchCommentsByCourse(id!),
  });
  const [comments, setComments] = useState<CourseComment[]>([]);

  useEffect(() => {
    if (commentsData?.data) {
      setComments(commentsData.data);
    }
  }, [commentsData]);

  // Set initial enrollment status based on fetched course data
  useEffect(() => {
    if (data?.isEnrolled !== undefined) {
      setEnrolled(data.isEnrolled);
    }
  }, [data?.isEnrolled]);

  // Set initial saved status based on fetched course data
  useEffect(() => {
    if (data?.isSaved !== undefined) {
      setSaved(data.isSaved);
    }
  }, [data?.isSaved]);

  //add enrollment and unenrollment mutations
  const enrollMutation = useMutation({
    mutationFn: () => enrole(id!),
    onSuccess: () => {
      setEnrolled(true);
      queryClient.invalidateQueries({ queryKey: ["Course", id] }); // refetch course data
    },
    onError: () => {
      setError("Failed to enroll, please try again.");
    }
  });

  //REMOVE ENROLLMENT
  const unenrollMutation = useMutation({
    mutationFn: () => removeEnrollment(id!),
    onSuccess: () => {
      setEnrolled(false);
      queryClient.invalidateQueries({ queryKey: ["Course", id] });
    },
    onError: () => {
      setError("Failed to unenroll, please try again.");
    }
  });

  //add save to a course
  const saveMutation = useMutation({
    mutationFn: () => saveCourse(id!),
    onSuccess: () => {
      setSaved(true);
    },
    onError: () => {
      setError("Failed to save course, please try again.");
    }
  });

  //remove from saved courses
  const removeSavedMutation = useMutation({
    mutationFn: () => removeSavedCourse(id!),
    onSuccess: () => {
      setSaved(false);
      queryClient.invalidateQueries({ queryKey: ["Course", id] });
    },
    onError: () => {
      setError("Failed to remove saved course, please try again.");
    }
  });

  const commentMutation = useMutation({
    mutationFn: (comment: string) => addComment(id!, comment),
    onSuccess: (newCmnt) => {
      setComments((prev) => [newCmnt, ...prev]);
      setNewComment('');
    },
    onError: () => {
      setError("Failed to add comment, please try again.");
    }
  });

  function handleComment(e: FormEvent) {
    e.preventDefault();
    if (!newComment.trim()) return;
    commentMutation.mutate(newComment);
  }
  //loading state
  if (!data || !lessons) return <>

    <div className="w-full gap-x-2 flex justify-center items-center">
      <div
        className="w-5 bg-[#d991c2] animate-pulse h-5 rounded-full"
      ></div>
      <div
        className="w-5 animate-pulse h-5 bg-[#9869b8] rounded-full animate-bounce"
      ></div>
      <div
        className="w-5 h-5 animate-pulse bg-[#6756cc] rounded-full animate-bounce"
      ></div>
    </div>

  </>;
  const course = data.courses;

  const enrollmentCount = data.enrollmentCount;

  //loading state for comments and quiz
  if (courseLoading || lessonsLoading || commentsLoading) return <>

    <div className="w-full gap-x-2 flex justify-center items-center">
      <div
        className="w-5 bg-[#d991c2] animate-pulse h-5 rounded-full"
      ></div>
      <div
        className="w-5 animate-pulse h-5 bg-[#9869b8] rounded-full animate-bounce"
      ></div>
      <div
        className="w-5 h-5 animate-pulse bg-[#6756cc] rounded-full animate-bounce"
      ></div>
    </div>

  </>;;
  if (error){
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <div className="flex flex-col gap-2 w-60 sm:w-72 text-[10px] sm:text-xs z-50">
          <div
            className="error-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#232531] px-[10px]"
          >
            <div className="flex gap-2">
              <div className="text-[#d65563] bg-white/5 backdrop-blur-xl p-1 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  ></path>
                </svg>
              </div>
              <div>
                <p className="text-white">Something went wrong</p>
                <p className="text-gray-500">Please try again.</p>
              </div>
            </div>
          
          </div>
        </div>
      </div>
    )
  };


  return (
    <div className="flex min-h-screen flex-col bg-[#f5f9fb]">
      <Header />
      <div className="relative mt-17 h-50 md:h-60 overflow-hidden ">
        {/* image */}
        <img
          src={course.image_url || thumbnail}
          alt={course.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-[#f2f2f5] via-violet-50/50 to-transparent" />

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
          <div className="mx-auto max-w-5xl">
            <Link
              to="/BrowseCourses"
              className="mb-4 inline-flex items-center gap-2 rounded-lg bg-[#f5f9fb]/80 px-3 py-1.5 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-[#f5f9fb]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Courses
            </Link>
          </div>
        </div>
      </div>
      <main className="flex-1 flex justify-center items-start min-h-screen bg-[#f2f2f5] pt-8">
        {/* Hero Banner */}


        <div className=" px-6 pb-12 w-250 ">
          {/* Course Header */}
          {/* Main Column */}
          <div className="flex-1 ">
            {/*course info */}
            <div className="rounded-2xl w-full shadow-lg bg-white flex flex-col gap-6 border py-6 ">

              <div className="px-8">
                <div className="flex flex-wrap items-center gap-3">

                  <div className="px-4 py-2  active:opacity-80 text-[12px] font-bold rounded-2xl transition duration-200 ease-in-out cursor-pointer bg-[#d2d4f5] text-[#2F35C2]  ">
                    {course.Categorie.name}
                  </div>

                  <span className="flex items-center gap-1 text-sm font-semibold text-[#19232a]">
                    <Heart className={`h-4 w-4 text-red-400 fill-current`} />
                    {course.likes}
                  </span>

                </div>

                <h1 className="mt-4 text-balance text-3xl font-extrabold text-[#19232a] md:text-4xl">
                  {course.title}
                </h1>

                <p className="mt-2 text-base ">
                  By{" "}
                  <span className="font-semibold text-[#2F35C2] cursor-pointer hover:text-[#2F35C2]/80 transition-colors">
                    {course.Teacher.User.name}
                  </span>
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-[#59656e]">
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" /> {enrollmentCount} students
                  </span>

                  <span className="flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4" /> {lessons.length} lessons
                  </span>
                </div>

                <p className="mt-6 text-base leading-relaxed text-[#4d555e]">
                  {course.description}
                </p>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    className={`px-4 py-3 active:opacity-80 text-[15px] font-bold rounded-2xl transition duration-200 ease-in-out cursor-pointer flex justify-center items-center ${enrolled ? "bg-[#b6d6c1] text-black" : "bg-[#d2d4f5] text-[#2F35C2]"
                      }`}
                    disabled={enrollMutation.isPending || unenrollMutation.isPending}
                    onClick={() => enrolled ? unenrollMutation.mutate() : enrollMutation.mutate()}
                  >
                    {/* {enrollMutation.isPending || unenrollMutation.isPending ? (
                      <span className="animate-spin mr-2">⏳</span>
                    ) :  */}
                    {enrolled ? (
                      <><CheckCircle2 className="mr-2 h-5 w-5" /> Enrolled</>
                    ) : (
                      <><Play className="mr-2 h-5 w-5" /> Enroll Now</>
                    )}
                  </button>

                  {(enrollMutation.isError || unenrollMutation.isError) && (
                    <p className="text-red-500 text-sm mt-2">Something went wrong, please try again.</p>
                  )}
                  {/* The disabled during isPending prevents double clicks, and invalidateQueries makes sure the course data (enrollment count etc.) refetches automatically after the action. */}


                  <button
                    className="border-2 text-base px-4 py-3 active:opacity-80 text-[15px] font-bold rounded-2xl transition duration-200 ease-in-out cursor-pointer flex bg-[#259cca]/30 border-[#d4e5ea]"
                    onClick={() => saved ? removeSavedMutation.mutate() : saveMutation.mutate()}
                  >
                    <Heart
                      className={`mr-2 h-5 w-5 ${saved
                        ? "fill-[#e7000b] text-[#e7000b]"
                        : ""
                        }`}
                    />
                    {saved ? "Saved" : "Save"}
                  </button>
                </div>
              </div>

            </div>
            {
              enrolled && (
                <>
                  {/* Lessons List */}
                  < div className="mt-8">
                    <h2 className="flex items-center gap-2 text-xl font-bold text-[#19232a]">
                      <BookOpen className="h-5 w-5 text-[#2F35C2]" />
                      Lessons ({lessons.length})
                    </h2>
                    {/* lessons */}
                    <div className="mt-4 flex flex-col gap-2">
                      {lessons.map((lesson) => (
                        // lesson
                        <LessonCase key={lesson.id} lesson={lesson} courseId={id} />
                      ))}
                    </div>
                  </div>

                  <div className="w-full h-px bg-gray-300 my-6"></div>

                  {/* AI Quiz */}
                  {
                    <div>
                      <h2 className="flex items-center gap-2 text-xl font-bold text-[#19232a]">
                        <Sparkles className="h-5 w-5 text-[#008cba]" />
                        AI-Generated Quiz
                      </h2>
                      <p className="mt-1 text-sm text-[#59656e]">
                        Test your understanding with these auto-generated questions.
                      </p>
                      <div className="mt-6 flex flex-col gap-5">
                        {quizQuestions.map((q, qIdx) => (
                          <div
                            key={qIdx}
                            className="rounded-2xl border-[#d4e5ea] bg-white text-[#19232a] flex flex-col gap-6 border shadow-sm"
                          >
                            <div className="p-6">
                              <p className="text-base font-semibold text-[#19232a]">
                                {qIdx + 1}. {q.question}
                              </p>
                              <div className="mt-4 flex flex-col gap-2">
                                {q.options.map((opt, oIdx) => {
                                  const isSelected =
                                    selectedAnswers[qIdx] === oIdx
                                  const isCorrect = oIdx === q.answer
                                  let style =
                                    "border-[#d4e5ea] text-[#59656e] hover:bg-[#e8f0f3]"
                                  if (isSelected) {
                                    style = isCorrect
                                      ? "border-[#78c192] bg-[#78c192]/15 text-[#19232a] font-medium"
                                      : "border-[#e7000b] bg-[#e7000b]/10 text-[#e7000b] font-medium"
                                  }
                                  return (
                                    <button
                                      key={oIdx}
                                      onClick={() => {
                                        if (selectedAnswers[qIdx] !== undefined) return; // already answered, do nothing
                                        setSelectedAnswers((prev) => ({
                                          ...prev,
                                          [qIdx]: oIdx,
                                        }))
                                      }}
                                      disabled={selectedAnswers[qIdx] !== undefined} // disable all options after selection
                                      className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${style} disabled:cursor-not-allowed`}
                                    >
                                      {opt}
                                      {isSelected && isCorrect && (
                                        <CheckCircle2 className="ml-2 inline h-4 w-4 text-[#78c192]" />
                                      )}
                                    </button>

                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* show only when all questions answered */}
                      {Object.keys(selectedAnswers).length === quizQuestions.length && (
                        <div className="mt-6 rounded-2xl border border-[#d4e5ea] bg-white p-6 shadow-sm">
                          {(() => {
                            const correct = quizQuestions.filter((q, i) => selectedAnswers[i] === q.answer).length;
                            const total = quizQuestions.length;
                            const percentage = Math.round((correct / total) * 100);

                            return (
                              <>
                                <div className="flex items-center justify-between mb-2">
                                  <p className="text-base font-bold text-[#19232a]">Your Score</p>
                                  <p className="text-base font-bold text-[#2F35C2]">{correct}/{total} — {percentage}%</p>
                                </div>

                                {/* bar */}
                                <div className="w-full h-3 rounded-full bg-[#e8f0f3]">
                                  <div
                                    className={`h-3 rounded-full transition-all duration-500 ${percentage >= 50 ? "bg-[#78c192]" : "bg-[#e7000b]"
                                      }`}
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>

                                {/* recommendation */}
                                <div className={`mt-4 text-sm font-medium ${percentage >= 50 ? "text-[#78c192]" : "text-[#e7000b]"}`}>
                                  {percentage >= 50
                                    ? "🎉 Great job! You passed the quiz."
                                    : <>
                                      📚 You should repeat the course.{" "}
                                      <Link to={`/courses/${id}/lessons/${lessons[0].id}`} className="underline text-[#2F35C2] hover:opacity-80">
                                        Start from the beginning
                                      </Link>
                                    </>
                                  }
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  }
                  <div className="w-full h-px bg-gray-300 my-6"></div>
                </>

              )
            }

            {/* Comments */}
            <div className="mt-8">
              <h2 className="flex items-center gap-2 text-xl font-bold text-[#19232a]">
                <MessageSquare className="h-5 w-5 text-[#2F35C2]" />
                Comments ({comments.length})
              </h2>
              <form
                onSubmit={handleComment}
                className="mt-4 flex gap-3"
              >
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className=" flex-1 rounded-xl focus-visible:border-[#c9cbfd] text-base border focus-visible:ring-[#c9cbfd]/50  border-gray-300 placeholder-gray-400 px-3 py-2 justify-center items-center shadow-sm focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed w-full"
                  rows={2}
                />
                <button
                  type="submit"
                  className="h-13 w-13 rounded-xl bg-[#585bc0] flex justify-center items-center text-white transition-colors hover:bg-[#585bc0]/80 disabled:cursor-not-allowed "
                  aria-label="Send comment"

                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
              {/* comments array */}
              <div className="mt-6 flex flex-col gap-4">
                {comments.map((comment) => (
                  <Comment key={comment.id} {...comment} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </main >

    </div >
  )
}

export default Course