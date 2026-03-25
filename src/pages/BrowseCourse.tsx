import Header from '../components/Header';
import thumbnail from '../assets/images/thumbnail.png';
import { Search, Filter, Badge, Star, Users, BookOpen, Heart } from 'lucide-react';
import Input from '../components/ui/Input';
import { useState } from 'react';

const BrowseCourse = () => {

  const coursesarr = [
    {
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
    },
    {
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
    },

    {
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
    },

    {
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
    },

    {
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
    },

    {
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
    },

    {
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
    },


  ]

  const categories = ["All", "Development", "Design", "front-end", "back-end", "full-stack", "data science", "machine learning"];

  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <>
      <Header />
      <section className='relative mt-5 overflow-auto scrollbar-hide scroll-smooth   sm:py-20 py-6 flex flex-col justify-center items-center  mb-30min-h-screen  bg-background'>

        <div className='flex flex-col justify-center m-4 item-center gap-y-2 text-center'>
          <h1 className=' text-[#2F327D] mt-10  text-balance text-3xl font-extrabold  md:text-4xl lg:text-5xl '>
            Browse Courses
          </h1>
          <p className='text-[#495460] text-center  mx-auto mt-2 max-w-2xl text-pretty text-lg'>
            Explore our collection of inclusive, well-structured courses designed for every type of learner.
          </p>
        </div>

        {/* Search */}
        <div className="mx-auto mt-2 mb-14 max-w-xl m-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search courses, topics, or instructors..."
              className="h-14 rounded-2xl border-border pl-12 text-base shadow-sm"
            />
          </div>
        </div>
        <div className="w-full h-px bg-[#d2d4f5] m-0"></div>

        {/* Filters + Grid */}
        <section className='px-6 py-10 bg-violet-50/50'>
          {/* Filters */}
          <div className="mb- flex flex-wrap items-center justify-center gap-2 mx-auto max-w-7xl ">
            <Filter className="mr-1 h-4 w-4 text-muted-foreground" />
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-6 py-2  active:opacity-80 text-[13px] font-bold rounded-4xl transition duration-200 ease-in-out cursor-pointer ${(activeCategory === cat) ? "bg-[#d2d4f5] text-[#2F35C2] shadow border" : "text-black border border-gray-300 hover:bg-[#d2d4f5] hover:shadow"}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-15'>
            {
              coursesarr.map((course) => (
                <div className=' bg-white duration-200 ease-in-out cursor-pointer justify-center border-[#DBDFD0]  bg-card text-card-foreground flex flex-col gap-6 border py-6 shadow-sm group h-full overflow-hidden rounded-2xl border-border bg-card transition-all hover:shadow-xl hover:-translate-y-1' key={course.id}>

                  <img
                    src={course.image}
                    alt={course.title}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className="flex flex-col gap-3 px-6 p-4">
                    <div className="flex items-center justify-between">

                      <div className="px-3 py-1  active:opacity-80 text-[10px] font-bold rounded-2xl transition duration-200 ease-in-out cursor-pointer bg-[#d2d4f5] text-[#2F35C2]  ">
                        {course.categorie}
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
                        {course.teacher.name}
                      </span>
                    </p>

                    <div className="mt-auto flex items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground  text-[#4d555e]">

                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" /> {course.student}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5" /> {course.lessons} lessons
                      </span>

                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </section>

      </section>
    </>
  )
}

export default BrowseCourse