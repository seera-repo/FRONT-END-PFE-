
export type Course = {
  id: string;
  title: string;
  categorie: string;
  student: number;
  lessons: number;
  duration: string;
  image: string;
  likes: number;
  description: string;
  teacher: {
    name: string;
    avatar: string;
  };
};

export type CourseCardProps = {
  course: Course;
};

// types.ts
export type Lesson = {
  id: number;
  title: string;
  description: string;
  order_index: number;
};

export type LessonCardProps = {
  lesson: Lesson;
  courseId?: string;
};