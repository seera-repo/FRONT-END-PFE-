
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

export interface User {
  name: string;
  isSick?: boolean;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  user_id: string;
  likes: number;
  isSpecialized: boolean;
  createdAt: string;
  updatedAt: string;
  User?: User;
}

export interface Comment {
  id: string;
  comment: string;
  user_id: string;
  post_id: string;
  createdAt: string;
  updatedAt: string;
  Post?: Pick<Post, "title">;
  User?: User;
}