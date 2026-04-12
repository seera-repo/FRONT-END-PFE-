import * as React from 'react'


function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className=" h-13 px-15 w-140 shadow py-1 rounded-2xl border border-gray-300 bg-transparent text-gray-800 placeholder:text-gray-400 outline-none transition focus:border-[#702DFF] focus:ring-2 focus:ring-[#702DFF]/30 text-start"
      {...props}
    />
  )
}

export default Input 
