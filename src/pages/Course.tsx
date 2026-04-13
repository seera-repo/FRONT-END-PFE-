import Header from "../components/Header"
import thumbnail from '../assets/images/thumbnail.png';
import { ArrowLeft, BookOpen, Heart, Play, Users, CheckCircle2, MessageSquare, Send } from "lucide-react";
import { Link, useParams } from 'react-router-dom';
import { useState, type FormEvent, } from "react";
import LessonCase from "../components/LessonCase";
import Comment from '../components/Comment';

const Course = () => {
  const course = {
    id: "1",
    title: "Introduction to Computer Science",
    categorie: "CS Basics",
    student: 85,
    lessons: 12,
    image: thumbnail,
    likes: 150,
    description: "Master the foundations of computer science with clear, visual explanations.",
    teacher: {
      name: 'Dr. Ahmed Khalil',
      avatar: 'https://via.placeholder.com/50'
    },
  }

  const lessons = [
    { id: 1111111, title: "What is Computer Science?", description: "An algorithm is a step-by-step set of instructions to solve a problem. In this lesson, you will learn to think algorithmically using everyday examples like recipes and directions before applying these ideas to computer programs.", order_index: 1, vedio_url: "http://localhost:3000/uploads/videos/vedio_url-123.mp4" },
    { id: 222222, title: "How Computers Think", description: "Time to write your first program! We will use a simple, beginner-friendly approach to create a program that greets the user. You will learn about code editors, running programs, and seeing your code come to life.", order_index: 2, vedio_url: "http://localhost:3000/uploads/videos/vedio_url-456.mp4" },
    { id: 3333333, title: "Introduction to Algorithms", description: "Variables are containers for storing data. Learn about different data types like numbers, text, and booleans, and understand how to use them effectively in your programs.", order_index: 3, vedio_url: "http://localhost:3000/uploads/videos/vedio_url-789.mp4" },
    { id: 4444444, title: "Your First Program", description: "Programs need to make decisions. Learn about conditional statements that let your code choose different paths based on conditions, making your programs smarter and more interactive.", order_index: 4, vedio_url: "http://localhost:3000/uploads/videos/vedio_url-012.mp4" },
    { id: 5555555, title: "Variables & Data Types", description: "Loops let you repeat actions without writing the same code over and over. Master for-loops and while-loops to handle repetitive tasks efficiently.", order_index: 5, vedio_url: "http://localhost:3000/uploads/videos/vedio_url-345.mp4" },
  ]

  const initialComments = [
    {
      id: 1,
      user: "Maria Garcia",
      comment: "This course is amazing! The explanations are so clear and easy to follow.",
    },
    {
      id: 2,
      user: "Liam Chen",
      comment: "I love the visual aids. They really help me understand abstract concepts.",
    },
  ]


  const { id } = useParams();
  const [saved, setSaved] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState("")

  function handleComment(e: FormEvent) {
    e.preventDefault()
    if (!newComment.trim()) return
    setComments((prev) => [
      {
        id: Date.now(),
        user: "You",
        comment: newComment,
      },
      ...prev,
    ])
    setNewComment("")
  }


  return (
    <div className="flex min-h-screen flex-col bg-[#f5f9fb]">
      <Header />
      <div className="relative mt-17 h-50 md:h-60 overflow-hidden ">
        {/* image */}
        <img
          src={course.image}
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
      <main className="flex-1 flex justify-center items-center min-h-screen bg-[#f2f2f5]">
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
                    {course.categorie}
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
                    {course.teacher.name}
                  </span>
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" /> {course.student} students
                  </span>

                  <span className="flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4" /> {course.lessons} lessons
                  </span>
                </div>

                <p className="mt-6 text-base leading-relaxed text-[#4d555e]">
                  {course.description}
                </p>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    className={`px-4 py-3 active:opacity-80 text-[15px] font-bold rounded-2xl transition duration-200 ease-in-out cursor-pointer flex justify-center items-center  ${enrolled ? "bg-[#b6d6c1] text-black" : " bg-[#d2d4f5] text-[#2F35C2] "
                      } `}
                    onClick={() => setEnrolled(!enrolled)}
                  >
                    {enrolled ? (
                      <>
                        <CheckCircle2 className="mr-2 h-5 w-5" /> Enrolled
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-5 w-5 " /> Enroll Now
                      </>
                    )}
                  </button>
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
                  <Comment key={comment.id} comment={comment} />
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