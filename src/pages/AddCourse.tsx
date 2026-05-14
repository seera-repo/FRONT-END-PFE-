import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SidebarTeacher from "../components/Sidebarteacher";
import { createCourse } from "../api/courses";
import { createLesson } from "../api/lessons";
import { fetchCategories } from "../api/categories";
import { useQuery } from '@tanstack/react-query';

interface CourseAttributes {
  title: string;
  description: string;
  document?: string | null;
  image_url?: string | null;
  isSpecialized: boolean;
  categorie_id: string;
}

interface LessonAttributes {
  id: string;
  title: string;
  description?: string | null;
  vedio_url: File | null;
  order_index: number;
  course_id: string;
}

const generateId = () => Math.random().toString(36).slice(2, 10);

const emptyLesson = (courseId: string, order: number): LessonAttributes => ({
  id: generateId(),
  title: "",
  description: "",
  vedio_url: null,
  order_index: order,
  course_id: courseId,
});

function reorder<T>(arr: T[], from: number, to: number): T[] {
  const copy = [...arr];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy.map((x: any, i) => ({ ...x, order_index: i + 1 }));
}

const Label = ({ text, required }: { text: string; required?: boolean }) => (
  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
    {text} {required && <span className="text-purple-500">*</span>}
  </label>
);

const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition bg-white";

const SectionCard = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-5">
    <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
      <span className="text-purple-500">{icon}</span>
      <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">{title}</h2>
    </div>
    {children}
  </div>
);

// ─── Lesson card ──────────────────────────────────────────────────────────────
interface LessonCardProps {
  lesson: LessonAttributes;
  index: number;
  total: number;
  onChangeText: (id: string, field: "title" | "description", value: string) => void;
  onChangeFile: (id: string, file: File) => void;
  onDelete: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

const LessonCard = ({ lesson, index, total, onChangeText, onChangeFile, onDelete, onMoveUp, onMoveDown }: LessonCardProps) => {
  const [expanded, setExpanded] = useState(lesson.title === "");
  const videoRef = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-[#f5f5fb] rounded-2xl border border-gray-100 overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center shrink-0">
          {lesson.order_index}
        </div>
        <p className="flex-1 text-sm font-semibold text-gray-700 truncate min-w-0">
          {lesson.title || <span className="text-gray-300 font-normal italic">Untitled lesson</span>}
        </p>
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={() => onMoveUp(index)} disabled={index === 0}
            className="p-1.5 rounded-lg text-gray-400 hover:text-purple-600 hover:bg-purple-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
          </button>
          <button onClick={() => onMoveDown(index)} disabled={index === total - 1}
            className="p-1.5 rounded-lg text-gray-400 hover:text-purple-600 hover:bg-purple-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          <button onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-colors">
            <svg className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          <button onClick={() => onDelete(lesson.id)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 flex flex-col gap-4 border-t border-gray-100 pt-4">
          <div>
            <Label text="Lesson Title" required />
            <input className={inputCls} value={lesson.title}
              onChange={e => onChangeText(lesson.id, "title", e.target.value)}
              placeholder="e.g. Introduction to Variables" />
          </div>

          {/* Video file upload */}
          <div>
            <Label text="Video File" required />
            <div
              onClick={() => videoRef.current?.click()}
              className={`border-2 border-dashed rounded-xl px-4 py-6 flex flex-col items-center gap-2 cursor-pointer transition-colors
                ${lesson.vedio_url ? "border-green-300 bg-green-50" : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/20"}`}
            >
              {lesson.vedio_url ? (
                <>
                  <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <p className="text-sm font-semibold text-green-600">{lesson.vedio_url.name}</p>
                  <p className="text-xs text-gray-400">Click to replace</p>
                </>
              ) : (
                <>
                  <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                  <p className="text-sm font-semibold text-gray-500">Upload video file</p>
                  <p className="text-xs text-gray-300">MP4, MOV, AVI (Max 500MB)</p>
                </>
              )}
              <input ref={videoRef} type="file" accept="video/*" className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) onChangeFile(lesson.id, f); }} />
            </div>
          </div>

          <div>
            <Label text="Description" />
            <textarea className={inputCls + " resize-none"} rows={3}
              value={lesson.description ?? ""}
              onChange={e => onChangeText(lesson.id, "description", e.target.value)}
              placeholder="What will students learn in this lesson?" />
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Main page ────────────────────────────────────────────────────────────────
const AddCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const isEdit = !!id;
  const courseId = useRef(generateId());

  const thumbRef = useRef<HTMLInputElement>(null);
  const docRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "lessons">("details");

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  const categories = categoriesData ?? [];

  const [course, setCourse] = useState<CourseAttributes>({
    title: "",
    description: "",
    document: null,
    image_url: null,
    isSpecialized: false,
    categorie_id: "",
  });

  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [docFile, setDocFile] = useState<File | null>(null);
  const [thumbDrag, setThumbDrag] = useState(false);

  const [lessons, setLessons] = useState<LessonAttributes[]>([
    emptyLesson(courseId.current, 1)
  ]);

  const updateCourse = <K extends keyof CourseAttributes>(key: K, value: CourseAttributes[K]) =>
    setCourse(prev => ({ ...prev, [key]: value }));

  const addLesson = () =>
    setLessons(prev => [...prev, emptyLesson(courseId.current, prev.length + 1)]);

  const deleteLesson = (lessonId: string) =>
    setLessons(prev =>
      prev.filter(l => l.id !== lessonId).map((l, i) => ({ ...l, order_index: i + 1 }))
    );

  // ← two separate updaters, no confusion
  const updateLessonText = (lessonId: string, field: "title" | "description", value: string) =>
    setLessons(prev => prev.map(l => l.id === lessonId ? { ...l, [field]: value } : l));

  const updateLessonFile = (lessonId: string, file: File) =>
    setLessons(prev => prev.map(l => l.id === lessonId ? { ...l, vedio_url: file } : l));

  const moveUp = (i: number) => setLessons(prev => reorder(prev, i, i - 1));
  const moveDown = (i: number) => setLessons(prev => reorder(prev, i, i + 1));

  const courseValid = course.title.trim() && course.description.trim() && course.categorie_id;
  const lessonsValid = lessons.every(l => l.title.trim() && l.vedio_url !== null);
  const canPublish = courseValid && lessonsValid && lessons.length > 0;
  const lessonIssues = lessons.filter(l => !l.title.trim() || !l.vedio_url).length;

  // selected category name for preview
  const selectedCategoryName = categories.find(c => c.id === course.categorie_id)?.name ?? "";

  const handleSave = async () => {

  if (!canPublish) return;
    if (!canPublish) return;
    setSaving(true);
    try {
      const { course: createdCourse } = await createCourse({
        title: course.title,
        description: course.description,
        isSpecialized: course.isSpecialized,
        categorie_id: course.categorie_id,
        imageFile: thumbFile,
        docFile: docFile,
      });

      for (const lesson of lessons) {
        if (!lesson.vedio_url) continue;
        await createLesson(createdCourse.id, {
          title: lesson.title,
          description: lesson.description ?? "",
          order_index: lesson.order_index,
          vedio_url: lesson.vedio_url,
        });
      }

      navigate("/HomePageTeacher");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#f5f5fb] overflow-hidden">
      <SidebarTeacher />

      <main className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: "none" }}>

        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-purple-600 transition-colors mb-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              Back to Dashboard
            </button>
            <h1 className="text-xl font-extrabold text-gray-900">
              {isEdit ? "Edit Course" : "Add New Course"}
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {isEdit ? "Update your course details and lessons" : "Create your course with lessons"}
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={!canPublish || saving}
            className="px-5 py-2 rounded-xl bg-[#2e2c74] hover:bg-purple-900 text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-md flex items-center gap-2 mt-1"
          >
            {saving
              ? <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            }
            {isEdit ? "Save Changes" : "Publish Course"}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-2xl p-1 shadow-sm mb-5 w-fit">
          {(["details", "lessons"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-150
                ${activeTab === tab ? "bg-[#2e2c74] text-white shadow-md" : "text-gray-500 hover:text-purple-700"}`}>
              {tab === "details"
                ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              }
              {tab === "details" ? "Course Details" : "Lessons"}
              {tab === "lessons" && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full
                  ${activeTab === "lessons" ? "bg-white/20 text-white"
                    : lessonIssues > 0 ? "bg-red-100 text-red-500" : "bg-purple-100 text-purple-700"}`}>
                  {lessons.length}{lessonIssues > 0 && ` · ${lessonIssues} incomplete`}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* DETAILS TAB */}
        {activeTab === "details" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 flex flex-col gap-5">
              <SectionCard title="Basic Information" icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              }>
                <div>
                  <Label text="Course Title" required />
                  <input className={inputCls} value={course.title}
                    onChange={e => updateCourse("title", e.target.value)}
                    placeholder="e.g. Introduction To Computer Science" />
                </div>
                <div>
                  <Label text="Description" required />
                  <textarea className={inputCls + " resize-none"} rows={4}
                    value={course.description}
                    onChange={e => updateCourse("description", e.target.value)}
                    placeholder="Describe what students will learn in this course..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label text="Category" required />
                    <select className={inputCls} value={course.categorie_id}
                      onChange={e => updateCourse("categorie_id", e.target.value)}>
                      <option value="">Select category</option>
                      {categories.map((c: any) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label text="Specialized Course?" />
                    <div onClick={() => updateCourse("isSpecialized", !course.isSpecialized)}
                      className={`mt-1 flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-150
                        ${course.isSpecialized ? "border-purple-400 bg-purple-50" : "border-gray-200 bg-white hover:border-purple-200"}`}>
                      <div className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${course.isSpecialized ? "bg-purple-600" : "bg-gray-200"}`}>
                        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${course.isSpecialized ? "translate-x-5" : "translate-x-0"}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-700">Specialized</p>
                        <p className="text-[10px] text-gray-400">For specific audience</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Course Document" icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              }>
                <p className="text-xs text-gray-400 -mt-3">Optional — attach a PDF syllabus or course material</p>
                {docFile || course.document ? (
                  <div className="flex items-center gap-3 bg-purple-50 border border-purple-200 rounded-xl px-4 py-3">
                    <svg className="w-8 h-8 text-purple-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {docFile?.name ?? course.document ?? "Document attached"}
                      </p>
                      <p className="text-xs text-gray-400">Click to replace</p>
                    </div>
                    <button onClick={() => { setDocFile(null); updateCourse("document", null); }}
                      className="text-red-400 hover:text-red-600 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ) : (
                  <button onClick={() => docRef.current?.click()}
                    className="w-full border-2 border-dashed border-gray-200 hover:border-purple-300 hover:bg-purple-50/20 rounded-xl py-6 flex flex-col items-center gap-2 transition-colors cursor-pointer">
                    <svg className="w-7 h-7 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                    <p className="text-sm font-semibold text-gray-500">Upload document</p>
                    <p className="text-xs text-gray-300">PDF, DOC, DOCX (Max 20MB)</p>
                  </button>
                )}
                <input ref={docRef} type="file" accept=".pdf,.doc,.docx" className="hidden"
                  onChange={e => { const f = e.target.files?.[0]; if (f) { setDocFile(f); updateCourse("document", f.name); } }} />
              </SectionCard>
            </div>

            <div className="flex flex-col gap-5">
              <SectionCard title="Course Thumbnail" icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              }>
                <div
                  onClick={() => thumbRef.current?.click()}
                  onDragOver={e => { e.preventDefault(); setThumbDrag(true); }}
                  onDragLeave={() => setThumbDrag(false)}
                  onDrop={e => { e.preventDefault(); setThumbDrag(false); const f = e.dataTransfer.files[0]; if (f?.type.startsWith("image/")) { setThumbFile(f); updateCourse("image_url", f.name); } }}
                  className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 overflow-hidden min-h-[160px]
                    ${thumbDrag ? "border-purple-400 bg-purple-50" : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/20"}`}
                >
                  {thumbFile ? (
                    <div className="relative w-full">
                      <img src={URL.createObjectURL(thumbFile)} alt="thumbnail" className="w-full h-40 object-cover" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <p className="text-white text-xs font-semibold">Click to change</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center py-8 px-4 text-center">
                      <svg className="w-8 h-8 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <p className="text-sm font-semibold text-gray-500">Upload thumbnail</p>
                      <p className="text-xs text-gray-300 mt-1">JPG, PNG (1280×720 recommended)</p>
                    </div>
                  )}
                  <input ref={thumbRef} type="file" accept="image/*" className="hidden"
                    onChange={e => { const f = e.target.files?.[0]; if (f) { setThumbFile(f); updateCourse("image_url", f.name); } }} />
                </div>
              </SectionCard>

              <SectionCard title="Preview" icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              }>
                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  {thumbFile && (
                    <img src={URL.createObjectURL(thumbFile)} alt="thumb" className="w-full h-28 object-cover rounded-lg mb-3" />
                  )}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-purple-100 text-purple-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {selectedCategoryName || "CATEGORY"}  {/* ← fixed */}
                    </span>
                    {course.isSpecialized && (
                      <span className="bg-amber-100 text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded-full">Specialized</span>
                    )}
                  </div>
                  <p className="text-sm font-bold text-gray-800 leading-snug mb-3">
                    {course.title || <span className="text-gray-300 font-normal">Course title</span>}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] text-gray-400 border-t border-gray-100 pt-2">
                    <span>{lessons.length} lesson{lessons.length !== 1 ? "s" : ""}</span>
                    {course.document && <span>· Document included</span>}
                  </div>
                </div>
              </SectionCard>
            </div>
          </div>
        )}

        {/* LESSONS TAB */}
        {activeTab === "lessons" && (
          <div className="flex flex-col gap-4 max-w-3xl">
            {lessonIssues > 0 && (
              <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
                <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-xs text-amber-700 font-medium">
                  {lessonIssues} lesson{lessonIssues > 1 ? "s" : ""} missing title or video — required to publish.
                </p>
              </div>
            )}

            {lessons.map((lesson, i) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                index={i}
                total={lessons.length}
                onChangeText={updateLessonText}
                onChangeFile={updateLessonFile}
                onDelete={deleteLesson}
                onMoveUp={moveUp}
                onMoveDown={moveDown}
              />
            ))}

            <button onClick={addLesson}
              className="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-dashed border-purple-200 hover:border-purple-400 hover:bg-purple-50/30 rounded-2xl text-sm font-semibold text-purple-500 hover:text-purple-700 transition-all duration-150">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              Add Lesson
            </button>

            {lessons.length > 0 && (
              <div className="bg-white rounded-2xl px-5 py-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span><span className="font-bold text-gray-800">{lessons.length}</span> lesson{lessons.length !== 1 ? "s" : ""}</span>
                  <span><span className="font-bold text-green-600">{lessons.filter(l => l.title && l.vedio_url).length}</span> complete</span>
                  {lessonIssues > 0 && <span className="text-red-400"><span className="font-bold">{lessonIssues}</span> incomplete</span>}
                </div>
                <button onClick={() => setActiveTab("details")}
                  className="text-xs text-purple-600 hover:text-purple-800 font-semibold transition-colors flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  Back to details
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AddCourse;
