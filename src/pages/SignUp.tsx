import {useState} from "react";
import { EyeOff } from 'lucide-react'
import {useNavigate} from "react-router-dom";

const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      
      const res = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, password }),
      });

    const data = await res.json(); 
    if(!res.ok){  console.error("Backend error details:", data); 
       setError(data.message);
      return;
    }
    console.log("success", data);
  } catch (error) {
    setError("Something went wrong");
    console.error("Error:", error);
  }
};
  return (
  
    <div className="signup">
      <div className="items-center justify-center flex flex-col min-h-screen bg-[#E3E2EB]">
        <div className="bg-white p-8 rounded-3xl shadow-lg w-[420px] flex flex-col items-center">
          <h1 className="items-center justify-center flex text-sm text-black-600 mb-3">welcome to learn..!</h1>
         
           <p className=" items-center justify-center text-[#7268C7] text-[27px]" >Creat your account</p>
          
         <p className="text-[#5B5B5B] mt-2 mb-5  text-[15px] flex items-center justify-center"> Join our inclusive learning community today </p>
         
         <h1 className="mr-70 mb-2 text-[15px]">user name</h1>
         <input 
         type="text"
         placeholder="Enter your user name"
         onChange={(e) =>setName(e.target.value)}
         className="rounded-full border px-4 p-2 outline-none border-[#4957BD] w-[350px] mb-3 placeholder:text-[14px] text-[#989797] items-center justify-center flex">
         </ input>
         <h1 className="mr-64 mb-2">Email addres</h1>
         <input 
          type="email"
          placeholder="Enter your email addres"
          onChange={(e) =>setEmail(e.target.value)}
          className="rounded-full border px-4 p-2 outline-none w-[350px] border-[#4957BD]  mb-3 placeholder:text-[14px] text-[#989797] items-center justify-center flex">
         </ input>
         <h1 className="mr-70 mb-2">password</h1>
         <div className="relative">
           <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) =>setPassword(e.target.value)}
              className="rounded-full border px-4 p-2 outline-none w-[350px] border-[#4957BD]  placeholder:text-[14px] text-[#989797]  pr-10">
           </ input>
            <EyeOff className="w-5.5 h-3.5 text-black absolute right-3 top-1/2 -translate-y-1/2"/>
          </div>
          {error && (
         <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
          )}
          <h1 onClick={() => navigate('/Login')}
          className="text-[14px] hover:underline mt-3 text-right w-full cursor-pointer pr-3 text-[#7268C7]">i already have an account</h1>
         <button 
         onClick={handleLogin}
         className="text-white rounded-full px-4 py-1.5 bg-[#495CBD] w-[150px] block mt-7  hover:opacity-80 transition items-center justify-center flex ">signUp</ button>
        </div>
      </div>
     </div>
    
  )
}

  export default signup

