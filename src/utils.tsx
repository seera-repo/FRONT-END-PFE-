export function TeacherAvatar({ name }: { name: string }) {
  const initials = name.trim().split(" ").length > 1
  ? name.trim().split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
  : name.slice(0, 2).toUpperCase();

  return (
    <div className="w-10 h-10 rounded-full bg-[#2e2c74] flex items-center justify-center shrink-0">
      <span className="text-white text-sm font-bold">{initials}</span>
    </div>
  );
}