import {useState} from "react";
import {useNavigate} from "react-router-dom"
import photos from"../images/photo2.svg"

const Login = () => {
const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async () => {
   setError("");
  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json(); 
    if(!res.ok){  console.error("Backend error details:", data);
      setError(data.message); 
      return;
    }
    if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.href = "/dashboard";
    } else {
      setError("No token received from server");
      }
    console.log("success", data);
  }
  catch (error) {
  setError("Something went wrong. Please try again.");
  console.error("Error:", error);
}
};
  return (
    <div className="Login">
    <div className="items-center justify-center flex flex-col min-h-screen bg-[#E3E2EB]">
        <div className="bg-white p-8 rounded-3xl shadow-lg w-[420px] flex flex-col items-center">
          <h1 className="flex items-center justify-center text-sm text-black-600 ">welcome to learn..!</h1>
          <p className=" items-center justify-center text-[#7268C7] text-[27px]">Welcome back</p>
          
         <p className="text-[#5B5B5B] mt-2 mb-5 flex items-center justify-center text-sm "> Sign in to continue your learning journey</p>
         <p className="mr-65 mb-2">Email</p>
         <input 
          type="text"
          placeholder="Enter your email"
          onChange={(e) =>setEmail(e.target.value)}
          className="rounded-full border px-4 p-2 outline-none border border-[#4957BD] w-[350px] flex items-center justify-center mb-3 placeholder:text-[14px] text-[#989797]">
         </ input>
         <p className="mr-67 mb-2">password</p>
         <div className="relative">
           <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) =>setPassword(e.target.value)}
              className="rounded-full border px-4 p-2 outline-none border w-[350px] border-[#4957BD] flex items-center justify-center placeholder:text-[14px] text-[#989797]">
           </ input>
            <span className="absolute left-88 top-1/2 -translate-y-1/2 text-gray-500">
            <img src={photos} alt="photo2" className="w-5.5 h-3.5"/>
            </span>
          </div>
          
          {error && (
           <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
            )}
            <p onClick={() => navigate('/Signup')}
             className="text-[14px] hover:underline mt-3 text-right w-full cursor-pointer pr-3 text-[#7268C7]">Creat account
            </p>
         <button 
         onClick={handleLogin}
         className="text-white rounded-full px-4 py-1.5 bg-[#495CBD] w-[180px] block mt-5 flex items-center justify-center hover:opacity-80 transition">Login</ button>
        
      </div>
    </div>
   
  </div>
  )
}

export default Login