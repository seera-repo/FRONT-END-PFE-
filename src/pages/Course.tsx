import Header from "../components/Header"
import thumbnail from '../assets/images/thumbnail.png';
import { ArrowLeft, BookOpen, Heart, Play, Users, CheckCircle2, MessageSquare, Send } from "lucide-react";
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState, type FormEvent, } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import LessonCase from "../components/LessonCase";
import Comment from '../components/Comment';
import { useQuery } from '@tanstack/react-query'
import { fetchCourseById } from "../api/courses";
import { fetchLessons } from "../api/lessons";
import { fetchCommentsByCourse } from "../api/course_commnts";
import { enrole, removeEnrollment } from "../api/enrollment";
import type { CourseComment } from "../types/types"


const Course = () => {
  const queryClient = useQueryClient();

  const { id } = useParams();
  const [saved, setSaved] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [newComment, setNewComment] = useState("")
  const [Error, setError] = useState("");
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
  const [comments, setComments] = useState(commentsData?.data || []);

// Set initial enrollment status based on fetched course data
  useEffect(() => {
    if (data?.isEnrolled !== undefined) {
      setEnrolled(data.isEnrolled);
    }
  }, [data?.isEnrolled]);

    
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


  if (!data || !lessons) return <p>not found</p>
  const course = data.courses;

  const enrollmentCount = data.enrollmentCount;
  console.log("enrollment count:", data);
  if (courseLoading || lessonsLoading || commentsLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading courses</p>;


  // Handle new comment submission
  function handleComment(e: FormEvent) {
    e.preventDefault();
    if (!newComment.trim()) return;

    const fakeComment: CourseComment = {
      id: Date.now().toString(),
      comment: newComment,
      user_id: 'me',
      course_id: id!,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      User: { name: 'You' },
      Course: { title: '' },
    };

    setComments((prev) => [fakeComment, ...prev]);
    setNewComment('');
  }


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

                  <span className="flex items-center gap-1 text-sm font-semibold text-foreground">
                    <Heart className={`h-4 w-4 text-red-400 fill-current`} />
                    {course.likes}
                  </span>

                </div>

                <h1 className="mt-4 text-balance text-3xl font-extrabold text-foreground md:text-4xl">
                  {course.title}
                </h1>

                <p className="mt-2 text-base ">
                  By{" "}
                  <span className="font-semibold text-[#2F35C2] cursor-pointer hover:text-[#2F35C2]/80 transition-colors">
                    {course.Teacher.User.name}
                  </span>
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
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
                    onClick={() => setSaved(!saved)}
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