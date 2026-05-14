import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeOff, Mail } from "lucide-react";
import logo from "../assets/icons/logo.png";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      setEmailSent(true);
    } catch (err) {
      setError("Something went wrong");
    }
  };


  if (emailSent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#E3E2EB]">
        <div className="bg-white p-8 rounded-3xl shadow-lg w-[420px] flex flex-col items-center gap-3">
          <Mail className="w-16 h-16 text-[#7268C7]" />

          <p className="text-[22px] font-semibold text-[#7268C7]">
            Check your email!
          </p>

          <p className="text-sm text-gray-600 text-center">
            We sent a verification link to
          </p>

          <p className="font-semibold text-[#495CBD]">{email}</p>

          <button
            onClick={() => window.open("https://mail.google.com", "_blank")}
            className="mt-4 bg-[#495CBD] text-white px-5 py-2 rounded-full hover:opacity-80"
          >
            Open Gmail
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#E3E2EB]">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-[420px] flex flex-col items-center">

        <img src={logo} alt="logo" className="h-16 mb-2" />

        <h1 className="text-[26px] text-[#2e2c74] font-semibold">
          Create your account
        </h1>

        <p className="text-sm text-gray-500 mb-5 text-center">
          Join our inclusive learning community today
        </p>

        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setName(e.target.value)}
          className="w-[350px] border rounded-full p-2 mb-3 px-4"
        />

        <input
          type="email"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
          className="w-[350px] border rounded-full p-2 mb-3 px-4"
        />

        <div className="relative w-[350px] mb-2">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-full p-2 px-4 pr-10"
          />
          <EyeOff className="w-4 h-4 absolute right-3 top-3 text-gray-500" />
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}

        <p
          onClick={() => navigate("/Login")}
          className="text-sm text-[#7268C7] mt-3 cursor-pointer hover:underline"
        >
          I already have an account
        </p>

        <button
          onClick={handleSignup}
          className="mt-5 bg-[#495CBD] text-white px-6 py-2 rounded-full hover:opacity-80"
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Signup;