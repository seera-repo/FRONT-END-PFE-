import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SidebarTeacher from "../components/Sidebarteacher";
import { fetchCourseById, } from "../api/courses";
import { fetchLessons, createLesson } from "../api/lessons";
import { fetchCategories } from "../api/categories";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../api/apiClient";
import {
  ArrowLeft, Save, Plus, Trash2, ChevronUp, ChevronDown,
  BookOpen, Image, FileText, Tag, AlignLeft, Play, CheckCircle2,
  AlertCircle, Loader2, GripVertical, Eye
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface LessonLocal {
  id: string;
  title: string;
  description: string;
  vedio_url: File | null;
  vedio_url_existing?: string;
  order_index: number;
  isNew: boolean;
  isExpanded: boolean;
}

const generateId = () => Math.random().toString(36).slice(2, 10);

const emptyLesson = (order: number): LessonLocal => ({
  id: generateId(),
  title: "",
  description: "",
  vedio_url: null,
  order_index: order,
  isNew: true,
  isExpanded: true,
});

function reorder<T extends { order_index: number }>(arr: T[], from: number, to: number): T[] {
  const copy = [...arr];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy.map((x, i) => ({ ...x, order_index: i + 1 }));
}

// ─── Delete Lesson API call ───────────────────────────────────────────────────
async function deleteLesson(lessonId: string) {
  return apiFetch(`api/courses/lessons/${lessonId}`, { method: "DELETE" });
}

// ─── Lesson Card ─────────────────────────────────────────────────────────────
function LessonCard({
  lesson, index, total,
  onChangeText, onChangeFile, onDelete, onMoveUp, onMoveDown, onToggleExpand
}: {
  lesson: LessonLocal;
  index: number;
  total: number;
  onChangeText: (id: string, field: "title" | "description", val: string) => void;
  onChangeFile: (id: string, file: File) => void;
  onDelete: (id: string) => void;
  onMoveUp: (i: number) => void;
  onMoveDown: (i: number) => void;
  onToggleExpand: (id: string) => void;
}) {
  const videoRef = useRef<HTMLInputElement>(null);
  const isComplete = lesson.title.trim() && (lesson.vedio_url || lesson.vedio_url_existing);

  return (
    <div className={`bg-white rounded-2xl border transition-all duration-200 ${isComplete ? "border-gray-200" : "border-amber-200 bg-amber-50/30"} overflow-hidden`}>
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-4 cursor-pointer select-none"
        onClick={() => onToggleExpand(lesson.id)}
      >
        <div className="flex-shrink-0 text-gray-300 cursor-grab">
          <GripVertical className="w-4 h-4" />
        </div>

        <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${isComplete ? "bg-indigo-100 text-indigo-700" : "bg-amber-100 text-amber-700"}`}>
          {lesson.order_index}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800 truncate">
            {lesson.title || <span className="text-gray-400 font-normal italic">Untitled lesson</span>}
          </p>
          <div className="flex items-center gap-3 mt-0.5">
            {isComplete
              ? <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Complete</span>
              : <span className="text-[10px] text-amber-600 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Incomplete</span>
            }
            {lesson.isNew && (
              <span className="text-[10px] text-indigo-600 font-medium bg-indigo-50 px-1.5 py-0.5 rounded">New</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onMoveUp(index)} disabled={index === 0}
            className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onMoveDown(index)} disabled={index === total - 1}
            className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(lesson.id)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Body */}
      {lesson.isExpanded && (
        <div className="px-5 pb-5 flex flex-col gap-4 border-t border-gray-100 pt-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Title <span className="text-indigo-500">*</span></label>
            <input
              value={lesson.title}
              onChange={(e) => onChangeText(lesson.id, "title", e.target.value)}
              placeholder="e.g. Introduction to the topic"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent transition bg-white"
            />
          </div>

          {/* Video */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Video <span className="text-indigo-500">*</span></label>
            <div
              onClick={() => videoRef.current?.click()}
              className={`border-2 border-dashed rounded-xl px-4 py-5 flex flex-col items-center gap-2 cursor-pointer transition-colors ${lesson.vedio_url || lesson.vedio_url_existing ? "border-emerald-300 bg-emerald-50" : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/20"}`}
            >
              {lesson.vedio_url ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  <p className="text-sm font-semibold text-emerald-600">{lesson.vedio_url.name}</p>
                  <p className="text-xs text-gray-400">Click to replace</p>
                </>
              ) : lesson.vedio_url_existing ? (
                <>
                  <Play className="w-6 h-6 text-emerald-500" />
                  <p className="text-sm font-semibold text-emerald-600">Video attached</p>
                  <p className="text-xs text-gray-400">Click to replace with a new file</p>
                </>
              ) : (
                <>
                  <Play className="w-6 h-6 text-gray-300" />
                  <p className="text-sm font-semibold text-gray-500">Upload video</p>
                  <p className="text-xs text-gray-300">MP4, MOV, AVI</p>
                </>
              )}
              <input ref={videoRef} type="file" accept="video/*" className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) onChangeFile(lesson.id, f); }} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Description</label>
            <textarea
              value={lesson.description}
              onChange={(e) => onChangeText(lesson.id, "description", e.target.value)}
              placeholder="What will students learn in this lesson?"
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent transition bg-white resize-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
function EditCourse() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const thumbRef = useRef<HTMLInputElement>(null);
  const docRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<"details" | "lessons">("details");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSpecialized, setIsSpecialized] = useState(false);
  const [categorieId, setCategorieId] = useState("");
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [thumbPreview, setThumbPreview] = useState<string | null>(null);
  const [docFile, setDocFile] = useState<File | null>(null);
  const [lessons, setLessons] = useState<LessonLocal[]>([]);
  const [deletedLessonIds, setDeletedLessonIds] = useState<string[]>([]);

  // Fetch data
  const { data: courseData, isLoading: courseLoading } = useQuery({
    queryKey: ["course-edit", id],
    queryFn: () => fetchCourseById(id!),
    enabled: !!id,
  });

  const { data: lessonsData, isLoading: lessonsLoading } = useQuery({
    queryKey: ["lessons", id],
    queryFn: () => fetchLessons(id!),
    enabled: !!id,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Populate form on load
  useEffect(() => {
    if (courseData?.courses) {
      const c = courseData.courses;
      setTitle(c.title || "");
      setDescription(c.description || "");
      setIsSpecialized(c.isSpecialized || false);
      setCategorieId(c.categorie_id || "");
      if (c.image_url) setThumbPreview(c.image_url);
    }
  }, [courseData]);

  useEffect(() => {
    if (lessonsData) {
      setLessons(
        lessonsData.map((l) => ({
          id: l.id,
          title: l.title,
          description: l.description || "",
          vedio_url: null,
          vedio_url_existing: l.vedio_url,
          order_index: l.order_index,
          isNew: false,
          isExpanded: false,
        }))
      );
    }
  }, [lessonsData]);

  // Lesson handlers
  const addLesson = () =>
    setLessons((prev) => [...prev, emptyLesson(prev.length + 1)]);

  const deleteLesson_ = (lessonId: string) => {
    const lesson = lessons.find((l) => l.id === lessonId);
    if (lesson && !lesson.isNew) {
      setDeletedLessonIds((prev) => [...prev, lessonId]);
    }
    setLessons((prev) =>
      prev.filter((l) => l.id !== lessonId).map((l, i) => ({ ...l, order_index: i + 1 }))
    );
  };

  const updateLessonText = (lessonId: string, field: "title" | "description", val: string) =>
    setLessons((prev) => prev.map((l) => (l.id === lessonId ? { ...l, [field]: val } : l)));

  const updateLessonFile = (lessonId: string, file: File) =>
    setLessons((prev) => prev.map((l) => (l.id === lessonId ? { ...l, vedio_url: file } : l)));

  const toggleExpand = (lessonId: string) =>
    setLessons((prev) => prev.map((l) => (l.id === lessonId ? { ...l, isExpanded: !l.isExpanded } : l)));

  const moveUp = (i: number) => setLessons((prev) => reorder(prev, i, i - 1));
  const moveDown = (i: number) => setLessons((prev) => reorder(prev, i, i + 1));

  // Validation
  const courseValid = title.trim() && description.trim() && categorieId;
  const newLessonsValid = lessons.filter(l => l.isNew).every(l => l.title.trim() && l.vedio_url);
  const canSave = courseValid;
  const incompleteCount = lessons.filter(l => l.isNew && (!l.title.trim() || !l.vedio_url)).length;

  // Save
  const handleSave = async () => {
    if (!canSave || !id) return;
    setSaving(true);

    try {
      // Update course details
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("isSpecialized", String(isSpecialized));
      formData.append("categorie_id", categorieId);
      if (thumbFile) formData.append("image_url", thumbFile);
      if (docFile) formData.append("document", docFile);

      await apiFetch(`api/courses/${id}`, { method: "PUT", body: formData });

      // Delete removed lessons
      for (const lessonId of deletedLessonIds) {
        try { await deleteLesson(lessonId); } catch (e) { /* continue */ }
      }

      // Create new lessons
      for (const lesson of lessons.filter(l => l.isNew && l.title.trim())) {
        if (!lesson.vedio_url) continue;
        await createLesson(id, {
          title: lesson.title,
          description: lesson.description,
          order_index: lesson.order_index,
          vedio_url: lesson.vedio_url,
        });
      }

      queryClient.invalidateQueries({ queryKey: ["course-edit", id] });
      queryClient.invalidateQueries({ queryKey: ["lessons", id] });
      queryClient.invalidateQueries({ queryKey: ["my-courses"] });

      setSaveSuccess(true);
      setTimeout(() => { setSaveSuccess(false); navigate("/HomePageTeacher"); }, 1500);
    } catch (err) {
      console.error(err);
      alert("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const isLoading = courseLoading || lessonsLoading;
  const selectedCat = categories.find((c: any) => c.id === categorieId);

  if (isLoading) {
    return (
      <div className="flex h-screen bg-[#f5f5fb] overflow-hidden">
        <SidebarTeacher />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-[#2e2c74] animate-spin" />
            <p className="text-sm text-gray-500">Loading course data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f5f5fb] overflow-hidden">
      <SidebarTeacher />

      <main className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: "none" }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-indigo-600 transition-colors mb-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>
            <h1 className="text-xl font-extrabold text-gray-900">Edit Course</h1>
            <p className="text-xs text-gray-400 mt-0.5">Update your course details, media and lessons</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/course/${id}`)}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-700 border border-gray-200 bg-white px-4 py-2 rounded-xl hover:border-indigo-300 transition-colors"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>

            <button
              onClick={handleSave}
              disabled={!canSave || saving}
              className={`flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-xl transition-all shadow-md
                ${saveSuccess
                  ? "bg-emerald-500 text-white"
                  : "bg-[#2e2c74] hover:bg-purple-900 text-white disabled:opacity-40 disabled:cursor-not-allowed"
                }`}
            >
              {saving
                ? <Loader2 className="w-4 h-4 animate-spin" />
                : saveSuccess
                  ? <CheckCircle2 className="w-4 h-4" />
                  : <Save className="w-4 h-4" />
              }
              {saving ? "Saving..." : saveSuccess ? "Saved!" : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-2xl p-1 shadow-sm border border-gray-100 mb-6 w-fit">
          {(["details", "lessons"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-150
                ${activeTab === tab ? "bg-[#2e2c74] text-white shadow-md" : "text-gray-500 hover:text-indigo-700"}`}
            >
              {tab === "details" ? <BookOpen className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {tab === "details" ? "Course Details" : "Lessons"}
              {tab === "lessons" && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === "lessons" ? "bg-white/20 text-white" : incompleteCount > 0 ? "bg-amber-100 text-amber-600" : "bg-indigo-100 text-indigo-600"}`}>
                  {lessons.length}{incompleteCount > 0 && ` · ${incompleteCount} incomplete`}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ─── DETAILS TAB ─────────────────────────────────────────── */}
        {activeTab === "details" && (
          <div className="grid grid-cols-3 gap-6">
            {/* Main form */}
            <div className="col-span-2 flex flex-col gap-5">
              {/* Basic info */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">
                  <AlignLeft className="w-4 h-4 text-indigo-500" />
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest">Basic Information</h3>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Course Title <span className="text-indigo-500">*</span></label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition bg-white"
                      placeholder="e.g. Introduction to Computer Science"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Description <span className="text-indigo-500">*</span></label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={5}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition bg-white resize-none"
                      placeholder="Describe what students will learn..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Category */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 flex items-center gap-1"><Tag className="w-3 h-3" /> Category <span className="text-indigo-500">*</span></label>
                      <select
                        value={categorieId}
                        onChange={(e) => setCategorieId(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition bg-white"
                      >
                        <option value="">Select category</option>
                        {categories.map((c: any) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Specialized */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Specialized Course</label>
                      <div
                        onClick={() => setIsSpecialized(!isSpecialized)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all ${isSpecialized ? "border-indigo-400 bg-indigo-50" : "border-gray-200 bg-white hover:border-indigo-200"}`}
                      >
                        <div className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${isSpecialized ? "bg-indigo-600" : "bg-gray-200"}`}>
                          <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${isSpecialized ? "translate-x-5" : "translate-x-0"}`} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-700">{isSpecialized ? "Specialized" : "General"}</p>
                          <p className="text-[10px] text-gray-400">{isSpecialized ? "For specific audience" : "For all students"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Document */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">
                  <FileText className="w-4 h-4 text-indigo-500" />
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest">Course Document</h3>
                </div>

                {docFile ? (
                  <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3">
                    <FileText className="w-8 h-8 text-indigo-400" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">{docFile.name}</p>
                      <p className="text-xs text-gray-400">New document will replace existing</p>
                    </div>
                    <button onClick={() => setDocFile(null)} className="text-red-400 hover:text-red-600">
                      ×
                    </button>
                  </div>
                ) : courseData?.courses?.document ? (
                  <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                    <FileText className="w-8 h-8 text-emerald-400" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">Document attached</p>
                      <p className="text-xs text-gray-400">Click below to replace</p>
                    </div>
                  </div>
                ) : null}

                <button
                  onClick={() => docRef.current?.click()}
                  className="mt-3 w-full border-2 border-dashed border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/20 rounded-xl py-5 flex flex-col items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileText className="w-5 h-5 text-gray-300" />
                  <span className="text-sm font-medium text-gray-400">{courseData?.courses?.document ? "Replace document" : "Upload document"}</span>
                  <span className="text-xs text-gray-300">PDF, DOC, DOCX</span>
                </button>
                <input ref={docRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) setDocFile(f); }} />
              </div>
            </div>

            {/* Right sidebar */}
            <div className="flex flex-col gap-5">
              {/* Thumbnail */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                  <Image className="w-4 h-4 text-indigo-500" />
                  <h3 className="text-xs font-bold text-gray-700 uppercase tracking-widest">Thumbnail</h3>
                </div>

                <div
                  onClick={() => thumbRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 hover:border-indigo-300 rounded-2xl overflow-hidden cursor-pointer transition-colors min-h-[140px] flex items-center justify-center"
                >
                  {thumbFile ? (
                    <img src={URL.createObjectURL(thumbFile)} alt="new thumb" className="w-full h-36 object-cover" />
                  ) : thumbPreview ? (
                    <div className="relative w-full">
                      <img src={thumbPreview} alt="thumbnail" className="w-full h-36 object-cover" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <span className="text-white text-xs font-semibold">Click to change</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 py-8">
                      <Image className="w-7 h-7 text-gray-300" />
                      <span className="text-xs text-gray-400 font-medium">Upload thumbnail</span>
                      <span className="text-[10px] text-gray-300">JPG, PNG (1280×720)</span>
                    </div>
                  )}
                  <input ref={thumbRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) { setThumbFile(f); setThumbPreview(URL.createObjectURL(f)); }
                  }} />
                </div>
              </div>

              {/* Preview card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-widest mb-4 pb-3 border-b border-gray-100">Preview</h3>
                <div className="rounded-xl overflow-hidden border border-gray-100">
                  {thumbPreview && (
                    <img src={thumbPreview} alt="preview" className="w-full h-28 object-cover" />
                  )}
                  <div className="p-3">
                    {selectedCat && (
                      <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                        {selectedCat.name}
                      </span>
                    )}
                    <p className="text-sm font-bold text-gray-800 mt-2 line-clamp-2">
                      {title || <span className="text-gray-300 font-normal">Course title...</span>}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-400">
                      <span>{lessons.length} lessons</span>
                      {isSpecialized && <span className="text-amber-500">· Specialized</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── LESSONS TAB ─────────────────────────────────────────── */}
        {activeTab === "lessons" && (
          <div className="max-w-3xl flex flex-col gap-4">
            {incompleteCount > 0 && (
              <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
                <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <p className="text-xs text-amber-700 font-medium">
                  {incompleteCount} new lesson{incompleteCount > 1 ? "s" : ""} missing title or video — won't be saved until complete.
                </p>
              </div>
            )}

            {lessons.length === 0 && (
              <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-10 flex flex-col items-center gap-3 text-center">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
                  <Play className="w-7 h-7 text-indigo-400" />
                </div>
                <p className="font-semibold text-gray-700">No lessons yet</p>
                <p className="text-sm text-gray-400">Add lessons to your course</p>
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
                onDelete={deleteLesson_}
                onMoveUp={moveUp}
                onMoveDown={moveDown}
                onToggleExpand={toggleExpand}
              />
            ))}

            <button
              onClick={addLesson}
              className="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-dashed border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50/30 rounded-2xl text-sm font-semibold text-indigo-500 hover:text-indigo-700 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Lesson
            </button>

            {lessons.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 px-5 py-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span><span className="font-bold text-gray-800">{lessons.length}</span> total</span>
                  <span><span className="font-bold text-emerald-600">{lessons.filter(l => !l.isNew).length}</span> existing</span>
                  <span><span className="font-bold text-indigo-600">{lessons.filter(l => l.isNew).length}</span> new</span>
                  {deletedLessonIds.length > 0 && (
                    <span><span className="font-bold text-red-400">{deletedLessonIds.length}</span> to delete</span>
                  )}
                </div>
                <button
                  onClick={() => setActiveTab("details")}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold transition-colors flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to details
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default EditCourse;