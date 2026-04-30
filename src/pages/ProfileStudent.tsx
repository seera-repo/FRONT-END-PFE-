import Header from "../components/Header"
import {ChevronRight} from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { fetchProfileStudent } from '../api/user'

const ProfileStudent = () => {
  const { data: user, isLoading, isError } = useQuery({
  queryKey: ['profile'],
  queryFn: fetchProfileStudent
 })

 if (isLoading){
    return (
      <div className="w-full h-screen gap-x-2 flex justify-center items-center">
        <div
          className="w-5 bg-[#d991c2] animate-pulse h-5 rounded-full"
        ></div>
        <div
          className="w-5 animate-pulse h-5 bg-[#9869b8] rounded-full animate-bounce"
        ></div>
        <div
          className="w-5 h-5 animate-pulse bg-[#6756cc] rounded-full animate-bounce"
        ></div>
      </div>
    )
  };
  
if (isError) return <p>Something went wrong</p>

  const getInitial= (firstName:string,lastName:string) =>{
   return `${firstName[0]}${lastName[0]}`.toUpperCase()
  }

  const getCategoryLabel = () => {
  if (user?.isSick) return "Special Needs Student"
  return "Regular Student"
}
  return (
   <div className="ProfileStudent bg-green-600">
     <div className="flex min-h-screen flex-col bg-[#f6f6fd] pb-20">
        <Header />
        <main className="flex-1 mt-20">
          <h1 className="text-[37px] pt-5 flex justify-center items-center font-semibold">
            Student Profile
          </h1>
          <span className="text-[16px] pt-3 flex justify-center items-center text-gray-500">
            Tell us about yourself to personalize your learning
          </span>
          <div className="mx-auto max-w-3xl bg-white mt-10 rounded-3xl">
            <div className="flex justify-center items-center pt-5">
             <div className="h-28 w-28 rounded-full flex justify-center items-center bg-[#3548A7]">
                <span className="text-white font-bold text-3xl">
                  {getInitial("wissal" , "mekhaldi")}
                </span>
             </div>
            
            </div>
           <p className="text-[19px] flex justify-center items-center pt-8">Personal Information
           </p>
           <p className="text-[19px] mt-5 ml-10 inderline">Basic Information</p>
           <div className="w-[90%] mx-auto h-px bg-gray-200 my-4"></div>
            <div className="flex">
              <div className="w-1/2">
               <p className="pl-8 mt-5 text-[16px]">Full Name *</p>
                <input
                  value={user?.name || ""}
                  placeholder="Student's full name"
                  className="rounded-2xl border p-2 ml-8 mt-2 w-[340px] border-gray-300">
                </input>
               <p className="pl-8 mt-5 text-[16px]">Email *</p>
                <input
                value={user?.email || ""}
                  placeholder="Email address"
                  className="rounded-2xl border p-2 ml-8 mt-2 w-[340px] border-gray-300">
                </input>
              </div>
              <div className="w-1/2">
               <p className="pl-8 text-[16px] pt-5">Category *</p>
                  <input
                   value={getCategoryLabel() || ""}
                    placeholder="select your caterogy"
                    className="rounded-2xl border p-2 ml-8 mt-2 w-[340px] border-gray-300">
                  </input>
                <p className="pl-8 text-[16px] pt-5">Created at *</p>
                  <input
                    placeholder="select your caterogy"
                    value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ""}
                    className="rounded-2xl border p-2 ml-8 mt-2 w-[340px] border-gray-300">
                  </input>
              </div>
            </div>
            <div className="flex justify-center items-center pt-10 items-center gap-2 pb-8">
                  <button className="p-1 py-5 rounded-3xl bg-[#2D0680] hover:bg-[#702DFF] w-[600px] text-white font-semibold text-[20px] flex items-center justify-center">Complete setup 
                    < ChevronRight className="w-5 h-5 text-white"/>
                  </button>
                </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ProfileStudent