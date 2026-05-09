import {useEffect } from "react";
import SidebarTeacher from "../components/Sidebarteacher";
import { useNavigate } from "react-router-dom";
//import AddCourse from "./AddCourse";
import Sidebar from "../components/Sidebar";
import PendingScreen from "../components/pandingScreen";
import RejectedScreen from "../components/RejectedScreen";
import ApprovedDashboard from "../components/ApprovedDashboard";
import { useQuery } from "@tanstack/react-query";
import { getMyTeacherProfile } from "../api/teacher";


// ─── MAIN GATE ────────────────────────────────────────────────────────────────
const HomePageTeacher = () => {
  const navigate = useNavigate();

  const { data: teacher, isLoading } = useQuery({
    queryKey: ["my-teacher-profile"],
    queryFn: getMyTeacherProfile,
  });

  useEffect(() => {
    if (!isLoading && (teacher === null || teacher === undefined)) {
      navigate("/formTeacher");
    }
  }, [teacher, isLoading, navigate]);

  if (isLoading) {
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
  };

  const status = teacher?.status ?? "none";
  function handleResubmit(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex h-screen bg-[#f5f5fb] overflow-hidden">

      {status === "pending" && <> <Sidebar /><PendingScreen /></>}
      {status === "rejected" && <> <Sidebar /><RejectedScreen onResubmit={handleResubmit} /></>}
      {/* ✅ Pass navigate as prop to ApprovedDashboard */}
      {status === "approved" && <><SidebarTeacher /> <ApprovedDashboard navigate={navigate} /></>}
    </div>
  );
};

export default HomePageTeacher;