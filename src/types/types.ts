
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
export interface Course {
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
  isEnrolled: boolean;
  isSaved: boolean;
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
export interface User {
  id: string;
  name: string;
  email: string;
  role_id?: string;
  isSick?: boolean;
  emailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}


export interface PublicUser {
  id: string;
  name: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;

  user_id: string;
  user?: PublicUser;

  likes: number;
  isSpecialized: boolean;
   

  createdAt: string;
  updatedAt: string;
  isLikedByCurrentUser?: boolean;
  comments?: PostComment[];
    commentsCount?: number;
}


export interface PostComment {
  id: string;
  comment: string;

  user_id: string;
  user?: PublicUser;

  post_id: string;

  createdAt: string;
  updatedAt: string;
}

export type Category = {
  id: string;
  name: string;
  createdAt: string; // or Date if you parse it
  updatedAt: string; // or Date if you parse it
};

export type categoryResponse = {
  success: boolean;
  data: Category[];
};

export type enrollment = {
    id: string;
    user_id: string;
    course_id: string;
    updatedAt: string;
    createdAt: string;
}

export type enrollmentResponse = {
  message: string;
  success: boolean;
  data: enrollment
};

export interface Quize {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: "a" | "b" | "c" | "d";
  course_id: string;
}




// Shared recommendation course shape
export interface RecommendedCourse {
  id: string;
  title: string;
  categorie_id: string;
  categorie_name: string;
  teacher_id: string;
  teacher_name: string;
}

// Hybrid mode (user has enrollments)
export interface HybridRecommendedCourse extends RecommendedCourse {
  score: number;
}

// Popular mode (new user, no enrollments)
export interface PopularRecommendedCourse extends RecommendedCourse {
  enrollment_count: number;
}

export interface RecommendationResponse {
  user_id?: string; // present in hybrid, absent in popular
  recommendations: HybridRecommendedCourse[] | PopularRecommendedCourse[];
}