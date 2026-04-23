import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SidebarTeacher from "../components/Sidebarteacher";

// ─── Types ────────────────────────────────────────────────────────────────────
type CourseForm = {
  title: string;
  category: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced" | "";
  language: string;
  price: string;
  isFree: boolean;
  thumbnail: File | null;
  objectives: string[];
  requirements: string[];
};

const CATEGORIES = [
  "CS BASICS", "WEB DEV", "CS CORE", "DATABASES",
  "NETWORKING", "PROGRAMMING", "DESIGN", "MOBILE",
  "AI", "DEVOPS", "SECURITY", "OTHER",
];

const LANGUAGES = ["English", "Arabic", "French"];

// ─── Reusable input components ────────────────────────────────────────────────
const Label = ({ text, required }: { text: string; required?: boolean }) => (
  <label className="block text-sm font-semibold text-gray-700 mb-2">
    {text} {required && <span className="text-purple-500">*</span>}
  </label>
);

const Input = ({ value, onChange, placeholder, type = "text" }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) => (
  <input
    type={type}
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition"
  />
);

// Dynamic list input (for objectives / requirements)
const DynamicList = ({
  label, items, onAdd, onRemove, onChange, placeholder,
}: {
  label: string;
  items: string[];
  onAdd: () => void;
  onRemove: (i: number) => void;
  onChange: (i: number, v: string) => void;
  placeholder: string;
}) => (
  <div>
    <Label text={label} />
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={item}
            onChange={e => onChange(i, e.target.value)}
            placeholder={placeholder}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition"
          />
          <button
            onClick={() => onRemove(i)}
            className="w-9 h-9 rounded-xl bg-red-50 text-red-400 hover:bg-red-100 flex items-center justify-center transition-colors shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
      <button
        onClick={onAdd}
        className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 font-semibold transition-colors w-fit"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Add item
      </button>
    </div>
  </div>
);

// ─── Section wrapper ──────────────────────────────────────────────────────────
const Section = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-5">
    <div className="flex items-center gap-2 pb-1 border-b border-gray-100">
      <span className="text-purple-500">{icon}</span>
      <h2 className="text-base font-bold text-gray-800">{title}</h2>
    </div>
    {children}
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const AddCourse = () => {
  const navigate = useNavigate();
  const thumbRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [saving,   setSaving]   = useState(false);

  const [form, setForm] = useState<CourseForm>({
    title:        "",
    category:     "",
    description:  "",
    level:        "",
    language:     "English",
    price:        "",
    isFree:       false,
    thumbnail:    null,
    objectives:   [""],
    requirements: [""],
  });

  const update = <K extends keyof CourseForm>(key: K, value: CourseForm[K]) =>
    setForm(prev => ({ ...prev, [key]: value }));

  // Objectives
  const addObjective    = ()         => update("objectives", [...form.objectives, ""]);
  const removeObjective = (i: number) => update("objectives", form.objectives.filter((_, j) => j !== i));
  const changeObjective = (i: number, v: string) => {
    const arr = [...form.objectives]; arr[i] = v; update("objectives", arr);
  };

  // Requirements
  const addReq    = ()         => update("requirements", [...form.requirements, ""]);
  const removeReq = (i: number) => update("requirements", form.requirements.filter((_, j) => j !== i));
  const changeReq = (i: number, v: string) => {
    const arr = [...form.requirements]; arr[i] = v; update("requirements", arr);
  };

  // Thumbnail drop
  const handleThumbDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) update("thumbnail", file);
  };

  const isValid = form.title.trim() && form.category && form.description.trim() && form.level;

  const handleSave = (status: "draft" | "published") => {
    if (!isValid) return;
    setSaving(true);
    // TODO: POST to /api/courses with { ...form, status }
    setTimeout(() => {
      setSaving(false);
      navigate("/teacher");
    }, 800);
  };

  return (
    <div className="flex h-screen bg-[#f5f5fb] overflow-hidden">
      <SidebarTeacher />

      <main className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: "none" }}>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-purple-600 transition-colors mb-1"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </button>
            <h1 className="text-xl font-extrabold text-gray-900">Add New Course</h1>
            <p className="text-xs text-gray-400 mt-0.5">Fill in the details to create your course</p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => handleSave("draft")}
              disabled={!isValid || saving}
              className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Save as Draft
            </button>
            <button
              onClick={() => handleSave("published")}
              disabled={!isValid || saving}
              className="px-5 py-2 rounded-xl bg-[#2e2c74] hover:bg-purple-900 text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-md flex items-center gap-2"
            >
              {saving ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
              Publish Course
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* ── Left: main fields ── */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Basic info */}
            <Section title="Basic Information" icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }>
              <div>
                <Label text="Course Title" required />
                <Input value={form.title} onChange={v => update("title", v)} placeholder="e.g. Introduction To Computer Science" />
              </div>

              <div>
                <Label text="Description" required />
                <textarea
                  value={form.description}
                  onChange={e => update("description", e.target.value)}
                  rows={4}
                  placeholder="Describe what students will learn in this course..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <Label text="Category" required />
                  <select
                    value={form.category}
                    onChange={e => update("category", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition bg-white"
                  >
                    <option value="">Select category</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Level */}
                <div>
                  <Label text="Level" required />
                  <select
                    value={form.level}
                    onChange={e => update("level", e.target.value as CourseForm["level"])}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition bg-white"
                  >
                    <option value="">Select level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                {/* Language */}
                <div>
                  <Label text="Language" />
                  <select
                    value={form.language}
                    onChange={e => update("language", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition bg-white"
                  >
                    {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <Label text="Price" />
                  <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                      <input
                        type="number"
                        value={form.price}
                        onChange={e => update("price", e.target.value)}
                        disabled={form.isFree}
                        placeholder="0.00"
                        className="w-full border border-gray-200 rounded-xl pl-7 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition disabled:bg-gray-50 disabled:text-gray-300"
                      />
                    </div>
                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer shrink-0">
                      <button
                        onClick={() => update("isFree", !form.isFree)}
                        className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${form.isFree ? "bg-purple-600" : "bg-gray-200"}`}
                      >
                        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${form.isFree ? "translate-x-4" : "translate-x-0"}`} />
                      </button>
                      Free
                    </label>
                  </div>
                </div>
              </div>
            </Section>

            {/* Objectives */}
            <Section title="What Students Will Learn" icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }>
              <DynamicList
                label="Learning Objectives"
                items={form.objectives}
                onAdd={addObjective}
                onRemove={removeObjective}
                onChange={changeObjective}
                placeholder="e.g. Understand the basics of algorithms"
              />
            </Section>

            {/* Requirements */}
            <Section title="Requirements" icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }>
              <DynamicList
                label="Prerequisites"
                items={form.requirements}
                onAdd={addReq}
                onRemove={removeReq}
                onChange={changeReq}
                placeholder="e.g. Basic knowledge of mathematics"
              />
            </Section>
          </div>

          {/* ── Right: thumbnail + status preview ── */}
          <div className="flex flex-col gap-5">

            {/* Thumbnail */}
            <Section title="Course Thumbnail" icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }>
              <div
                onClick={() => thumbRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleThumbDrop}
                className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 overflow-hidden
                  ${dragging ? "border-purple-400 bg-purple-50" : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/20"}`}
                style={{ minHeight: 180 }}
              >
                {form.thumbnail ? (
                  <div className="relative w-full">
                    <img
                      src={URL.createObjectURL(form.thumbnail)}
                      alt="thumbnail"
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <p className="text-white text-xs font-semibold">Click to change</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-8 px-4 text-center">
                    <svg className="w-8 h-8 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm font-semibold text-gray-500">Upload thumbnail</p>
                    <p className="text-xs text-gray-300 mt-1">JPG, PNG (recommended 1280×720)</p>
                  </div>
                )}
                <input ref={thumbRef} type="file" accept="image/*" className="hidden"
                  onChange={e => { const f = e.target.files?.[0]; if (f) update("thumbnail", f); }} />
              </div>
            </Section>

            {/* Preview card */}
            <Section title="Preview" icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            }>
              <div className="bg-[#f5f5fb] rounded-xl p-4 flex flex-col gap-3">
                {/* Mini card preview */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-purple-100 text-purple-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {form.category || "CATEGORY"}
                    </span>
                    <span className="bg-gray-100 text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded-full">draft</span>
                  </div>
                  <p className="text-sm font-bold text-gray-800 leading-snug mb-3">
                    {form.title || "Your course title will appear here"}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-[10px] font-bold shrink-0">
                      DAK
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-700">Dr. Ahmed Khalil</p>
                      <p className="text-[10px] text-gray-400">Teacher</p>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-1.5 text-xs text-gray-500">
                  {form.level && (
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      Level: <span className="font-semibold capitalize text-gray-700">{form.level}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
                    Language: <span className="font-semibold text-gray-700">{form.language}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Price: <span className="font-semibold text-gray-700">{form.isFree ? "Free" : form.price ? `$${form.price}` : "Not set"}</span>
                  </div>
                </div>
              </div>
            </Section>

          </div>
        </div>
      </main>
    </div>
  );
};

export default AddCourse;