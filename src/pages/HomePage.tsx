////////////////////////// HOME PAGE ///////////////////////////////
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import CourseCardHomepage from "../components/CourseCardHomepage";
import ProfileCard from "../components/ProfileCard";
import leftIcon from "../assets/icons/leftswip.svg";
import rightIcon from "../assets/icons/rightswip.svg";
import starIcon from "../assets/icons/star.svg";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyEnrollment } from "../api/enrollment";
import { getMySavedCourses, saveCourse, removeSavedCourse } from "../api/savedCourses";
import { fetchRecommendations } from "../api/recommendationApi";
import type { RecommendationMode } from "../api/recommendationApi";


//========================================= TYPES ==========================================//

type Course = {
  id: string;
  title: string;
  teacher: string;
  role: string;
  category: string;
  image: string;
};

type CourseRowProps = {
  title: string;
  icon?: string;
  courses: Course[];
  savedIds: Set<string>;
  onToggleSave: (id: string) => void;
  emptyMessage?: string;
};

type SavedRowProps = {
  courses: Course[];
  savedIds: Set<string>;
  onToggleSave: (id: string) => void;
};

const GAP = 16;

//========================================= COURSE ROW COMPONENT ==========================================//


function CourseRow({ title, icon, courses, savedIds, onToggleSave, emptyMessage }: CourseRowProps) {
  const navigate = useNavigate();
  //================= REFS =================//
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  //================= STATE =================//
  const [index, setIndex] = useState(0);
  const [perPage, setPerPage] = useState(3);
  const [cardWidth, setCardWidth] = useState(240);

  //================= MEASURE ON RESIZE =================//
  useEffect(() => {
    const measure = () => {
      const w = wrapperRef.current?.clientWidth ?? 0;
      if (!w) return;
      const n = w >= 700 ? 3 : w >= 450 ? 2 : 1;
      const cw = (w - GAP * (n - 1)) / n;
      setPerPage(n);
      setCardWidth(cw);
      setIndex(0);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, []);

  const maxIndex = Math.max(0, courses.length - perPage);
  const canLeft = index > 0;
  const canRight = index < maxIndex;

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: index * (cardWidth + GAP), behavior: "smooth" });
  }, [index, cardWidth]);

  //================= CLAMP INDEX WHEN COURSES CHANGE =================//
  useEffect(() => {
    setIndex((i) => Math.min(i, Math.max(0, courses.length - perPage)));
  }, [courses.length, perPage]);

  const goLeft = () => setIndex((i) => Math.max(0, i - 1));
  const goRight = () => setIndex((i) => Math.min(maxIndex, i + 1));

  //================= TOUCH SWIPE =================//
  const touchStart = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].pageX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStart.current - e.changedTouches[0].pageX;
    if (delta > 40) goRight();
    if (delta < -40) goLeft();
  };

  //================= RENDER =================//
  return (
    <section className="mb-7">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold tracking-widest uppercase text-gray-800 flex items-center gap-2">
          {icon && <img src={icon} alt="" className="w-4 h-4 shrink-0" />}
          {title}
          {courses.length > 0 && (
            <span className="ml-1 bg-purple-100 text-purple-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
              {courses.length}
            </span>
          )}
        </h2>

        {/* NAVIGATION BUTTONS */}
        {courses.length > perPage && (
          <div className="flex gap-2">
            <button onClick={goLeft} disabled={!canLeft}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all
                ${canLeft ? "border-gray-300 bg-white hover:bg-gray-100 shadow-sm cursor-pointer"
                  : "border-gray-200 bg-gray-50 opacity-40 cursor-not-allowed"}`}>
              <img src={leftIcon} alt="left" className="w-4 h-4" />
            </button>
            <button onClick={goRight} disabled={!canRight}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all
                ${canRight ? "border-gray-300 bg-white hover:bg-gray-100 shadow-sm cursor-pointer"
                  : "border-gray-200 bg-gray-50 opacity-40 cursor-not-allowed"}`}>
              <img src={rightIcon} alt="right" className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* COURSE CARDS */}
      {courses.length === 0 ? (
        <div className="flex items-center gap-3 text-gray-400 text-sm py-4 px-2">
          {emptyMessage ?? "Nothing here yet."}
        </div>
      ) : (
        <div ref={wrapperRef} className="overflow-hidden pb-4 -mb-4">
          <div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto select-none pb-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", pointerEvents: "none" }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {courses.map((course) => (
              <div key={course.id} className="shrink-0" style={{ width: cardWidth, pointerEvents: "auto" }}>
                <div onClick={() => navigate(`/course/${course.id}`)} className="cursor-pointer">
                  <CourseCardHomepage
                    title={course.title} teacher={course.teacher} role={course.role}
                    category={course.category} image={course.image}
                    saved={savedIds.has(course.id)}
                    onToggleSave={() => onToggleSave(course.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </section>
  );
}


function SavedRow({ courses, savedIds, onToggleSave }: SavedRowProps) {
  const navigate = useNavigate();
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [perPage, setPerPage] = useState(3);
  const [cardWidth, setCardWidth] = useState(240);

  //================= MEASURE ON RESIZE =================//
  useEffect(() => {
    const measure = () => {
      const w = containerRef.current?.clientWidth ?? 0;
      if (!w) return;
      const n = w >= 700 ? 3 : w >= 450 ? 2 : 1;
      const cw = (w - GAP * (n - 1)) / n;
      setPerPage(n);
      setCardWidth(cw);
      setIndex(0);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  //================= CAROUSEL LOGIC =================//
  const needsCarousel = courses.length > perPage;
  const maxIndex = Math.max(0, courses.length - perPage);
  const canLeft = index > 0;
  const canRight = index < maxIndex;

  //================= SCROLL ON INDEX CHANGE =================//
  useEffect(() => {
    if (!needsCarousel) return;
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: index * (cardWidth + GAP), behavior: "smooth" });
  }, [index, cardWidth, needsCarousel]);

  //================= RESET INDEX WHEN NOT CAROUSEL =================//
  useEffect(() => {
    if (!needsCarousel) setIndex(0);
  }, [needsCarousel]);

  const goLeft = () => setIndex((i) => Math.max(0, i - 1));
  const goRight = () => setIndex((i) => Math.min(maxIndex, i + 1));

  //================= TOUCH SWIPE =================//
  const touchStart = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].pageX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!needsCarousel) return;
    const delta = touchStart.current - e.changedTouches[0].pageX;
    if (delta > 40) goRight();
    if (delta < -40) goLeft();
  };

  //================= RENDER =================//
  return (
    <section className="mb-7">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold tracking-widest uppercase text-gray-800 flex items-center gap-2">
          Saved Courses
          {courses.length > 0 && (
            <span className="ml-1 bg-purple-100 text-purple-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
              {courses.length}
            </span>
          )}
        </h2>

        {/* NAVIGATION BUTTONS */}
        {needsCarousel && (
          <div className="flex gap-2">
            <button onClick={goLeft} disabled={!canLeft}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all
                ${canLeft ? "border-gray-300 bg-white hover:bg-gray-100 shadow-sm cursor-pointer"
                  : "border-gray-200 bg-gray-50 opacity-40 cursor-not-allowed"}`}>
              <img src={leftIcon} alt="left" className="w-4 h-4" />
            </button>
            <button onClick={goRight} disabled={!canRight}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all
                ${canRight ? "border-gray-300 bg-white hover:bg-gray-100 shadow-sm cursor-pointer"
                  : "border-gray-200 bg-gray-50 opacity-40 cursor-not-allowed"}`}>
              <img src={rightIcon} alt="right" className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* COURSE CARDS */}
      <div ref={containerRef}>
        {courses.length === 0 ? (
          <div className="flex items-center gap-3 text-gray-400 text-sm py-4 px-2">
            Save a course by clicking the heart button.
          </div>
        ) : needsCarousel ? (

          /* CAROUSEL */
          <div className="overflow-hidden pb-4 -mb-4">
            <div
              ref={trackRef}
              className="flex gap-4 overflow-x-auto select-none pb-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none", pointerEvents: "none" }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {courses.map((course) => (
                <div key={course.id} className="shrink-0" style={{ width: cardWidth, pointerEvents: "auto" }}>
                  <div onClick={() => navigate(`/course/${course.id}`)} className="cursor-pointer">
                    <CourseCardHomepage
                      title={course.title} teacher={course.teacher} role={course.role}
                      category={course.category} image={course.image}
                      saved={savedIds.has(course.id)}
                      onToggleSave={() => onToggleSave(course.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        ) : (

          /* GRID */
          <div
            className="grid gap-4 pb-4 -mb-4"
            style={{ gridTemplateColumns: `repeat(${perPage}, 1fr)` }}
          >
            {courses.map((course) => (
              <div onClick={() => navigate(`/course/${course.id}`)} className="cursor-pointer">
              <CourseCardHomepage
                key={course.id}
                title={course.title} teacher={course.teacher} role={course.role}
                category={course.category} image={course.image}
                saved={savedIds.has(course.id)}
                onToggleSave={() => onToggleSave(course.id)}
              />
              </div>
            ))}
          </div>

        )}
      </div>

    </section>
  );
}

const HomePage = () => {
  const queryClient = useQueryClient();

  const { data: enrollmentData, isLoading: enrollmentLoading } = useQuery({
    queryKey: ["my-enrollments"],
    queryFn: getMyEnrollment,
  });

  const YOUR_COURSES: Course[] = (enrollmentData?.data ?? []).map((e) => ({
    id: e.course_id,
    title: e.Course.title,
    teacher: e.Course.Teacher.User.name,
    role: "Software Developer",    // static for now, or remove from Course type
    category: e.Course.Categorie.name,
    image: e.Course.image_url ?? "",
  }));

  const { data: savedData, isLoading: saveLoading } = useQuery({
    queryKey: ["my-saved-courses"],
    queryFn: getMySavedCourses,
  });

  const savedCourses: Course[] = (savedData?.data ?? []).map((e) => ({
    id: e.course_id,
    title: e.Course.title,
    teacher: e.Course.Teacher.User.name,
    role: "Software Developer",
    category: e.Course.Categorie.name,
    image: e.Course.image_url ?? "",
  }));

  const saveMutation = useMutation({
    mutationFn: (courseId: string) => saveCourse(courseId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["my-saved-courses"] }),
  });

  const removeMutation = useMutation({
    mutationFn: (courseId: string) => removeSavedCourse(courseId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["my-saved-courses"] }),
  });


  //================= FETCH RECOMMENDATIONS =================//
  const { data: recData, isLoading: recLoading, isError: recError } = useQuery({
    queryKey: ["recommendations"],
    queryFn: fetchRecommendations,
  });

  const recMode: RecommendationMode = recData?.mode ?? "popular";

  const RECOMMENDED: Course[] = (recData?.courses ?? []).map((c) => ({
    id: c.id,
    title: c.title,
    teacher: c.teacher_name,
    role: "",
    category: c.categorie_name,
    image: "",
  }));
  const savedCourseIds = new Set(savedCourses.map((course) => course.id));

  const toggleSave = (courseId: string) => {
    if (savedCourseIds.has(courseId)) {
      removeMutation.mutate(courseId);
    } else {
      saveMutation.mutate(courseId);
    }
  };
  if (enrollmentLoading || saveLoading) {
    return (
      <div className="w-full h-screen gap-x-2 flex justify-center items-center">
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
    )
  }

  //================= RENDER =================//
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar />

      <div className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>

        {/* HERO */}
        <div className="relative overflow-hidden rounded-3xl mb-8 bg-[#2e2c74]">
          <div className="absolute -top-10 -right-10 w-52 h-52 bg-purple-500/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-6  w-40 h-40 bg-indigo-400/20 rounded-full blur-2xl" />
          <div className="absolute top-4 right-32     w-20 h-20 bg-violet-300/20 rounded-full blur-xl" />
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          <div className="relative z-10 px-10 py-10 flex items-center justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 bg-white/15 text-white/90 text-[11px] font-semibold px-3 py-1 rounded-full mb-4 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                New courses available
              </span>
              <h1 className="text-white text-3xl font-extrabold leading-tight mb-2">
                Discover<br /><span className="text-purple-300">New Skills</span>
              </h1>
              <p className="text-white/60 text-sm">One step at a time.</p>
            </div>
            <div className="hidden lg:flex flex-col gap-2 mr-4">
              {["Python", "CSbasics", "Databases"].map((label, i) => (
                <div key={label}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-xs font-medium px-3 py-1.5 rounded-xl"
                  style={{ transform: `translateX(${i * 8}px)` }}>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* YOUR COURSES */}
        <CourseRow
          title="Your Courses"
          courses={YOUR_COURSES}
          savedIds={savedCourseIds}   // ← driven by API now
          onToggleSave={toggleSave}
        />

        {/* RECOMMENDED COURSES */}
        {recLoading ? (
          <div className="text-sm text-gray-400 py-4 px-2 animate-pulse">
            Loading recommendations...
          </div>
        ) : recError ? (
          <div className="text-sm text-red-400 py-4 px-2">
            Could not load recommendations.
          </div>
        ) : (
          <CourseRow
            title={recMode === "hybrid" ? "Recommended For You" : "Popular Courses"}
            icon={starIcon}
            courses={RECOMMENDED}
            savedIds={savedCourseIds}
            onToggleSave={toggleSave}
            emptyMessage="No recommendations available."
          />
        )}

        {/* SAVED COURSES */}
        <SavedRow
          courses={savedCourses}
          savedIds={savedCourseIds}
          onToggleSave={toggleSave}
        />

      </div>
    </div>
  );
};

export default HomePage;