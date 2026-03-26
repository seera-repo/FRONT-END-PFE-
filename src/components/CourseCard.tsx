import { useState } from "react";
import heart from "../assets/icons/heart.svg";
type Props = {
  title: string;
  teacher: string;
  role: string;
  category: string;
  image: string;
};

const CourseCard = ({ title, teacher, role, category, image }: Props) => {
  const [saved, setSaved] = useState(false);

  return (
    <div className="bg-white rounded-[20px] p-5 w-full max-w-[500px] relative">
      {/* SAVE BUTTON */}
     <button
  onClick={() => setSaved(!saved)}
  className={`absolute top-5 right-5 p-2 rounded-full cursor-pointer transition-colors duration-300 ${
    saved ? "bg-purple-600" : "bg-gray-200"
  }`}
>
  <img
    src={heart}
    alt="save"
    className={`w-6 h-6 ${saved ? "text-white" : "text-gray-500"}`}
  />
</button>

      {/* CATEGORY */}
      <span className="bg-purple-200 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">
        {category}
      </span>

      {/* TITLE */}
      <h3 className=" p-2 font-medium text-gray-800">
        {title}
      </h3>

      {/* USER */}
      <div className="flex items-center mt-5 gap-3">
        <img
          src={image}
          alt="user"
          className="w-10 h-10 rounded-full object-cover"
        />

        <div>
          <p className="text-sm font-semibold text-gray-800">{teacher}</p>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
}
export default CourseCard;