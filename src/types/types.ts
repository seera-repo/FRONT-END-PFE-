
// src/types/course.ts

export interface Lesson {
  id: string;
  title: string;
  description: string | null;
  vedio_url: string;
  order_index: number;
  course_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Teacher {
  id: string;
  user_id: string;
  isPsychologist: boolean;
  cv_URL: string;
  descreption: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  User: {
    name: string;
  };
}
interface Course {
  id: string;
  title: string;
  description: string;
  document: string | null;
  image_url: string | null;
  isSpecialized: boolean;
  teacher_id: string;
  categorie_id: string;
  likes: number;
  createdAt : Date;
  updatedAt: Date;

  // counts
  lessonsCount: number;
  enrollmentsCount: number;

  // associations
  Teacher: {
    id: string;
    user_id: string;
    status: string;
    cvUrl?: string | null;
    User: {
      name: string;
    };
  };

  Categorie: {
    name: string;
  };
}

// export interface Course {
//   id: string;
//   title: string;
//   description: string;
//   document: string | null;
//   image_url: string | null;
//   isSpecialized: boolean;
//   teacher_id: string;
//   categorie_id: string;
//   likes: number;
//   createdAt: string;
//   updatedAt: string;
//   Teacher: Teacher;
//   Categorie: { name: string };
//   Enrollments: any[];
// }

export interface CourseByIdResponse {
  success: boolean;
  courses: Course;
  enrollmentCount: number;
  lessonCount: number;
}

export type CourseCardProps = {
  course:  Course; 
};


export type LessonCardProps = {
  lesson: Lesson;
  courseId?: string;
};

// src/types/course.ts

export interface CourseComment {
  id: string;
  comment: string;
  user_id: string;
  course_id: string;
  createdAt: string;
  updatedAt: string;
  User: {
    name: string;
  };
  Course: {
    title: string;
  };
}

export interface CommentsResponse {
  success: boolean;
  count: number;
  data: CourseComment[];
}