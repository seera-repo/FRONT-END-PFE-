


// ─── 2. PENDING SCREEN ────────────────────────────────────────────────────────
const PendingScreen = () => (
  <main className="flex-1 flex items-center justify-center p-8">
    <div className="max-w-md w-full flex flex-col items-center text-center gap-6">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center">
          <svg className="w-12 h-12 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
          </svg>
        </div>
        <div className="absolute inset-0 rounded-full border-4 border-amber-300 animate-ping opacity-30" />
      </div>
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Awaiting Approval</h1>
        <p className="text-gray-400 text-sm leading-relaxed">Your profile has been submitted and is currently being reviewed by an administrator. You'll receive a notification once it's approved.</p>
      </div>
      <div className="w-full bg-white rounded-2xl shadow-md p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 font-medium">Account Status</span>
          <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Pending Approval
          </span>
        </div>
        <div className="border-t border-gray-100" />
        {[
          { label: "Profile submitted", done: true, active: false },
          { label: "Under admin review", done: false, active: true },
          { label: "Account activated", done: false, active: false },
        ].map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold
              ${step.done ? "bg-green-500 text-white" : step.active ? "bg-amber-400 text-white animate-pulse" : "bg-gray-100 text-gray-400"}`}>
              {step.done
                ? <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                : i + 1}
            </div>
            <span className={`text-sm ${step.done ? "text-green-600 font-medium" : step.active ? "text-amber-600 font-semibold" : "text-gray-400"}`}>{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  </main>
);

export default PendingScreen;