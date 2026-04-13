
function Comment({ comment }: { comment: { id: number, user: string, comment: string } }) {
  return (
    <div><div key={comment.id} className="flex gap-3">
      <div className="h-10 w-10 shrink-0 relative flex size-8 overflow-hidden rounded-full">
        <div className="bg-[#dedef5] text-[#4c4e89] flex size-full items-center justify-center rounded-full text-sm font-semibold">
          NM
        </div>
      </div>
      <div className="flex-1 rounded-2xl bg-white shadow-2xs p-4 w-150">
        <div className="flex items-center gap-2 w-150">
          <span className="text-sm font-semibold">
            {comment.user}
          </span>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed ">
          {comment.comment}
        </p>
      </div>
    </div></div>
  )
}

export default Comment