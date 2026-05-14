import { useState } from "react";
<<<<<<< HEAD
import { EyeOff } from 'lucide-react';
=======
import { EyeOff, Mail } from 'lucide-react'
>>>>>>> 687ed3e852a6250b6f31407e676633fa8704642c
import { useNavigate } from "react-router-dom";
import logo from "../assets/icons/logo.png";

interface TokenPayload {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false); // ← new
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      const res = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      // NO TOKEN ANYMORE — just show check email screen
      setEmailSent(true);

    } catch (error) {
      setError("Something went wrong");
    }
  };

<<<<<<< HEAD
=======
  // ✅ CHECK EMAIL SCREEN
  if (emailSent) {
    return (
      <div className="items-center justify-center flex flex-col min-h-screen bg-[#E3E2EB]">
        <div className="bg-white p-8 rounded-3xl shadow-lg w-[420px] flex flex-col items-center gap-4">
          <Mail className="w-16 h-16 text-[#7268C7] mt-4" />
          <p className="text-[#7268C7] text-[24px] font-semibold text-center">
            Check your email!
          </p>
          <p className="text-[#5B5B5B] text-[14px] text-center">
            We sent a verification link to
          </p>
          <p className="text-[#495CBD] font-semibold text-[14px]">{email}</p>
          <p className="text-[#5B5B5B] text-[13px] text-center">
            Click the link in the email to activate your account. The link expires in 24 hours.
          </p>
          <button
            onClick={() => window.open("https://mail.google.com", "_blank")}
            className="text-white rounded-full px-4 py-1.5 bg-[#495CBD] w-[200px] mt-4 hover:opacity-80 transition">
            Open Gmail
          </button>
        </div>
      </div>
    );
  }

>>>>>>> 687ed3e852a6250b6f31407e676633fa8704642c
  return (
    <div className="signup">
      <div className="items-center justify-center flex flex-col min-h-screen bg-[#E3E2EB]">
        <div className="bg-white p-8 rounded-3xl shadow-lg w-[420px] flex flex-col items-center">
<<<<<<< HEAD
          <img src={logo} alt="" className="h-16" />

          <p className="items-center justify-center text-[#2e2c74] text-[27px]">Creat your account</p>

          <p className="text-[#5B5B5B] mt-2 mb-5 text-[15px] flex items-center justify-center">Join our inclusive learning community today</p>

=======
          <h1 className="items-center justify-center flex text-sm text-black-600 mb-3">welcome to learn..!</h1>
          <p className=" items-center justify-center text-[#7268C7] text-[27px]">Creat your account</p>
          <p className="text-[#5B5B5B] mt-2 mb-5 text-[15px] flex items-center justify-center">Join our inclusive learning community today</p>
>>>>>>> 687ed3e852a6250b6f31407e676633fa8704642c
          <h1 className="mr-70 mb-2 text-[15px]">user name</h1>
          <input
            type="text"
            placeholder="Enter your user name"
            onChange={(e) => setName(e.target.value)}
            className="rounded-full border px-4 p-2 outline-none border-[#4957BD] w-[350px] mb-3 placeholder:text-[14px] text-[#989797] items-center justify-center flex">
          </input>
<<<<<<< HEAD

=======
>>>>>>> 687ed3e852a6250b6f31407e676633fa8704642c
          <h1 className="mr-64 mb-2">Email addres</h1>
          <input
            type="email"
            placeholder="Enter your email addres"
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-full border px-4 p-2 outline-none w-[350px] border-[#4957BD] mb-3 placeholder:text-[14px] text-[#989797] items-center justify-center flex">
          </input>
<<<<<<< HEAD

=======
>>>>>>> 687ed3e852a6250b6f31407e676633fa8704642c
          <h1 className="mr-70 mb-2">password</h1>
          <div className="relative">
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-full border px-4 p-2 outline-none w-[350px] border-[#4957BD] placeholder:text-[14px] text-[#989797] pr-10">
            </input>
            <EyeOff className="w-5.5 h-3.5 text-black absolute right-3 top-1/2 -translate-y-1/2" />
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
          )}
<<<<<<< HEAD

          <h1
            onClick={() => navigate('/Login')}
            className="text-[14px] hover:underline mt-3 text-right w-full cursor-pointer pr-3 text-[#7268C7]">
            i already have an account
          </h1>

          <button
            onClick={handleLogin}
            className="text-white rounded-full px-4 py-1.5 bg-[#495CBD] w-[150px] block mt-7 hover:opacity-80 transition items-center justify-center flex">
            signUp
=======
          <nav onClick={() => navigate('/Login')}
            className="text-[14px] hover:underline mt-3 text-right w-full cursor-pointer pr-3 text-[#7268C7]">i already have an account</nav>
          <button
            onClick={handleLogin}
            className="text-white rounded-full px-4 py-1.5 bg-[#495CBD] w-[150px] block mt-7 hover:opacity-80 transition items-center justify-center flex">signUp
>>>>>>> 687ed3e852a6250b6f31407e676633fa8704642c
          </button>
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
};
=======
}
>>>>>>> 687ed3e852a6250b6f31407e676633fa8704642c

export default signup;