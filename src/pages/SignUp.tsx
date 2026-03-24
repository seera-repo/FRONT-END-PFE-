

const signup = () => {
  return (
    <div className="signup">
      <div className="flex h-screen gap-30">
        <div className="w-1/2">
        <img src="/images/photo1.png" alt="photo1" className="w-150 h-130 mt-10 ml-10" />
        <p className="absolute bottom-23 font-bold left-20 text-white text-[30px]  ">
         Lorem Ipsum is simply
         </p>
         <h1 className="absolute bottom-15 font-meduim left-20 text-white text-[20px] ">
         Lorem Ipsum is simply
         </h1>
        </div>
        <div className="w-1/2 mt-20  ">
          <h1 className="ml-35 text-sm text-black-600 ">welcome to learn..!</h1>
          <div className="flex bg-[#6783F4] rounded-full w-60  p-1.5  mt-5 ml-20">
            <button className="rounded-full bg-[#6783F4] text-white font-medium px-4 py-1.5 flex flex-col gap-3 w-[200px]">login</button>
            <button className="rounded-full bg-[#4957BD] text-white font-medium text-center px-4 py-1.5 w-[150px] ">signUp</button>
          </div>
         <p className="text-[#5B5B5B] mt-10 mb-5 ml-10 text-sm "> Lorem Ipsum is simply dummy text of the printing and <br />typesetting industry.</p>
         <h1 className="ml-10">Email addres</h1>
         <input 
         type="email"
         placeholder="Enter your email addres"
         className="rounded-full border px-4 p-2 outline-none border w-[350px] border-[#4957BD] ml-10 mb-3 placeholder:text-[14px] text-[#989797]">
         </ input>
         <h1 className="ml-10">user name</h1>
         <input 
         type="text"
         placeholder="Enter your user name"
         className="rounded-full border px-4 p-2 outline-none border border-[#4957BD] w-[350px] ml-10 mb-3 placeholder:text-[14px] text-[#989797]">
         </ input>
         <h1 className="ml-10">password</h1>
         <div className="relative">
           <input
              type="password"
              placeholder="Enter your password"
              className="rounded-full border px-4 p-2 outline-none border w-[350px] border-[#4957BD] ml-10 placeholder:text-[14px] text-[#989797]">
           </ input>
            <span className="absolute left-88 top-1/2 -translate-y-1/2 text-gray-500">
            <img src="/images/photo2.svg" alt="photo2" className="w-5.5 h-3.5"/>
            </span>
          </div>
         <button className="text-white rounded-full px-4 py-1.5 bg-[#495CBD] w-[150px] block mt-7 ml-32 hover:opacity-80 transition ">signUp</ button>
        </div>
      </div>
  
    </div>
  )
}

export default signup