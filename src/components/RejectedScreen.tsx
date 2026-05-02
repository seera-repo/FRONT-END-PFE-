// ─── 3. REJECTED SCREEN ───────────────────────────────────────────────────────
const RejectedScreen = ({ onResubmit }: { onResubmit: () => void }) => (
  <main className="flex-1 flex items-center justify-center p-8">
    <div className="max-w-md w-full flex flex-col items-center text-center gap-6">
      <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
        <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Profile Rejected</h1>
        <p className="text-gray-400 text-sm leading-relaxed">Your profile was not approved. Please update your information and resubmit for review.</p>
      </div>
      <div className="w-full bg-white rounded-2xl shadow-md p-5 flex flex-col gap-3">
        <div className="flex items-center gap-3 bg-red-50 rounded-xl p-3">
          <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <p className="text-xs text-red-600 font-medium">Common reasons: incomplete bio, missing CV, or invalid certification.</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <button onClick={onResubmit} className="w-full bg-[#2e2c74] hover:bg-purple-900 text-white font-semibold text-sm py-3.5 rounded-2xl transition-colors duration-200 shadow-md">
          Update & Resubmit Profile
        </button>
        <button className="w-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium text-sm py-3 rounded-2xl transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  </main>
);

export default RejectedScreen;