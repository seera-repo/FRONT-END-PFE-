import { useEffect, useRef, useState } from "react";
import type { Course } from "../types/types";
import CourseCardHomepage from "./CourseCardHomepage";
import leftIcon from "../assets/icons/left.svg";
import rightIcon from "../assets/icons/right.svg";


type CourseRowProps = {
  title: string;
  icon?: string;
  courses: Course[];
  savedIds: Set<string>;
  onToggleSave: (id: string) => void;
  emptyMessage?: string;
};
const GAP = 16;

export function CourseRow({ title, icon, courses, savedIds, onToggleSave, emptyMessage }: CourseRowProps) {

  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [perPage, setPerPage] = useState(3);
  const [cardWidth, setCardWidth] = useState(240);

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
  
  useEffect(() => {
    setIndex((i) => Math.min(i, Math.max(0, courses.length - perPage)));
  }, [courses.length, perPage]);

  const goLeft = () => setIndex((i) => Math.max(0, i - 1));
  const goRight = () => setIndex((i) => Math.min(maxIndex, i + 1));

  const touchStart = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].pageX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStart.current - e.changedTouches[0].pageX;
    if (delta > 40) goRight();
    if (delta < -40) goLeft();
  };

  return (
    <section className="mb-7">
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

      {courses.length === 0 ? (
        <div className="flex items-center gap-3 text-gray-400 text-sm py-4 px-2">
          {emptyMessage ?? "Nothing here yet."}
        </div>
      ) : (
        /*
          KEY FIX: instead of overflow-hidden (which clips shadows),
          we use overflow-hidden only on x, and add pb-4 + -mb-4 trick
          so the bottom shadow is visible while horizontal overflow is still clipped.
        */
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
                <CourseCardHomepage
                  title={course.title} teacher={course.Teacher.User.name} role={course.role}
                  category={course.Categorie.name} image={course.image}
                  saved={savedIds.has(course.id)}
                  onToggleSave={() => onToggleSave(course.id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}