 import Header from '../components/Header';
import { Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import Input from '../components/ui/Input';
import { useState } from 'react';
import CourseCard from '../components/CourseCard';
import { useQuery } from '@tanstack/react-query';
import { fetchCourses } from '../api/courses';


const BrowseCourse = () => {
  const categories = ["All", "Development", "Design", "front-end", "back-end", "full-stack", "data science", "machine learning"];

  const [activeCategory, setActiveCategory] = useState("All");
  
  const { data: courses = [], isLoading, error } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses
  });
  console.log("Fetched courses:", courses);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading courses</p>;
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
          {courses.length > 0 ? (
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-15'>
              {
                courses.map((course) => (
                  <Link key={course.id} to={`/course/${course.id}`}>
                    <CourseCard course={course} />
                  </Link>
                ))
              }
            </div>
          ) : (

            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20">
              <Search className="h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">No courses found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your search or filter to find what you are looking for.
              </p>
              <button
                className="mt-6 rounded-xl"
                onClick={() => {
                  setActiveCategory("All")
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>

      </section>
    </>
  )
}

export default BrowseCourse