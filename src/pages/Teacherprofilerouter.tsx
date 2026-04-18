import { Navigate } from "react-router-dom";
import FormTeacher    from "../pages/FormTeacher";
import ProfileTeacher from "../pages/Profileteacher";

/**
 * TeacherProfileRouter
 * ─────────────────────
 * Use this component as the element for the /teacher/profile route.
 *
 * Logic:
 *   1. If the teacher has NEVER submitted the form  → show FormTeacher (one-time)
 *   2. If submitted but not yet approved            → show ProfileTeacher (pending status)
 *   3. If approved                                  → show ProfileTeacher (approved status)
 *
 * In production, replace the localStorage checks with your real auth/API state.
 * e.g. check user.profileSubmitted and user.approvalStatus from your auth context.
 */
const TeacherProfileRouter = () => {
  const profileSubmitted = localStorage.getItem("teacher_profile_submitted") === "true";

  // Form has never been submitted → show the one-time form
  if (!profileSubmitted) {
    return <FormTeacher />;
  }

  // Already submitted (pending or approved) → show the profile view
  return <ProfileTeacher />;
};

export default TeacherProfileRouter;