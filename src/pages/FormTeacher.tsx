import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SidebarTeacher from "../components/Sidebarteacher";
import { createTeacherProfile } from "../api/teacher";
import { useMutation } from "@tanstack/react-query";

/**
 * FormTeacher — shown ONCE after teacher signup.
 * On submit, mark profileSubmitted in localStorage then redirect to /teacher.
 * The router should guard this route: if profileSubmitted === "true", redirect away.
 */
const FormTeacher = () => {
  const navigate = useNavigate();
  const [isPsychologist, setIsPsychologist] = useState(false);
  const [bio, setBio] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);


  // inside the component:
  const { mutate: submitProfile, isPending } = useMutation({
    mutationFn: createTeacherProfile,
    onSuccess: () => setSubmitted(true),
    onError: () => alert("Failed to submit profile. Try again."),
  });

  const handleSubmit = () => {
    if (!bio.trim() || !cvFile) return;
    submitProfile({ isPsychologist, descreption: bio, cvFile });
  };


  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setCvFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCvFile(file);
  };

  // ── Confirmation screen shown after submit ────────────────────────────────
  if (submitted) {
    return (
      <div className="flex h-screen bg-white overflow-hidden">
        <SidebarTeacher />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-md text-center flex flex-col items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-[#A7AAE9]/30 flex items-center justify-center">
              <svg className="w-10 h-10 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Profile Submitted!</h1>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your profile has been sent for review. An administrator will approve it shortly.
                You'll be notified once your account is approved.
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3 flex items-center gap-2 w-full">
              <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-amber-700 font-medium">Pending Approval</span>
            </div>
            <button
              onClick={() => navigate("/HomePage")}
              className="w-full bg-[#2e2c74] hover:bg-purple-900 text-white font-semibold text-sm py-3.5 rounded-2xl transition-colors duration-200 shadow-md"
            >
              Go to Dashboard
            </button>
          </div>
        </main>
      </div>
    );
  }

  // ── Form ──────────────────────────────────────────────────────────────────
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <SidebarTeacher />

      <main className="flex-1 overflow-y-auto p-8" style={{ scrollbarWidth: "none" }}>

        {/* Page header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Complete Your Profile</h1>
          <p className="text-gray-400 text-sm">Fill in your information to start teaching on Smart CS</p>
        </div>

        <div className="max-w-2xl mx-auto flex flex-col gap-5">

          {/* Approval notice */}
          <div className="bg-[#A7AAE9]/20 border border-[#A7AAE9]/50 rounded-2xl px-5 py-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-gray-700">Approval Required</p>
              <p className="text-xs text-gray-500 mt-0.5">
                After submitting, an administrator will review your profile. You will be notified once approved.
              </p>
            </div>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-5">

            {/* Section header */}
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <h2 className="text-base font-bold text-gray-800">Profile Information</h2>
            </div>
            <p className="text-xs text-gray-400 -mt-3">This information will be visible to students</p>

            {/* Psychologist toggle */}
            <div className="bg-[#A7AAE9]/10 rounded-2xl px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Are you a Psychologist?</p>
                  <p className="text-xs text-gray-400">Check this if you have psychology certification</p>
                </div>
              </div>
              <button
                onClick={() => setIsPsychologist(!isPsychologist)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${isPsychologist ? "bg-purple-600" : "bg-gray-200"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${isPsychologist ? "translate-x-5" : "translate-x-0"}`} />
              </button>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description / Bio <span className="text-purple-500">*</span>
              </label>
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                rows={5}
                placeholder="Tell students about yourself, your teaching experience, qualifications..."
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition"
              />
            </div>

            {/* CV Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload CV / Resume <span className="text-purple-500">*</span>
              </label>
              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl px-6 py-10 flex flex-col items-center justify-center cursor-pointer transition-colors duration-200
                  ${dragging ? "border-purple-400 bg-purple-50"
                    : cvFile ? "border-green-300 bg-green-50"
                      : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/30"}`}
              >
                {cvFile ? (
                  <>
                    <svg className="w-8 h-8 text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm font-semibold text-green-600">{cvFile.name}</p>
                    <p className="text-xs text-gray-400 mt-1">Click to replace</p>
                  </>
                ) : (
                  <>
                    <svg className="w-8 h-8 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <p className="text-sm font-semibold text-gray-600">Click to upload your CV</p>
                    <p className="text-xs text-gray-400 mt-1">PDF, DOC, or DOCX (Max 10MB)</p>
                  </>
                )}
                <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!bio.trim()}
              className="w-full flex items-center justify-center gap-2 bg-[#2e2c74] hover:bg-purple-900 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm py-3.5 rounded-2xl transition-colors duration-200 shadow-md mt-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              {isPending ? "Submitting..." : "Submit for Approval"}
            </button>

          </div>
        </div>
      </main>
    </div>
  );
};

export default FormTeacher;