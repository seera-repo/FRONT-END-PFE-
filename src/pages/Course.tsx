import Header from "../components/Header"
import thumbnail from '../assets/images/thumbnail.png';
import { ArrowLeft } from "lucide-react";
import {Link} from 'react-router-dom';
const Course = () => {
    const course =  {
      id: "1",
      title: "Introduction to Computer Science",
      categorie: "CS Basics",
      student: 85,
      lessons: 12,
      duration: "6 hours",
      image: thumbnail,
      likes: 150,
      description: "Master the foundations of computer science with clear, visual explanations.",
      teacher: {
        name: 'Dr. Ahmed Khalil',
        avatar: 'https://via.placeholder.com/50'
      },
    }
  return (
    <div>
      <Header />

      <main>
        <div className="relative h-64 overflow-hidden md:h-80">
          <img
            src={course.image}
            alt={course.title}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
            <div className="mx-auto max-w-5xl">
              <Link
                to="/courses"
                className="mb-4 inline-flex items-center gap-2 rounded-lg bg-background/80 px-3 py-1.5 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-background"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Courses
              </Link>
            </div>
          </div>
        </div>
      </main>
      
    </div>
  )
}

export default Course