import heart from "../assets/icons/heart.svg";
import { TeacherAvatar } from "../utils";
 
type Props = {
  title: string;
  teacher: string;
  role: string;
  category: string;
  image: string;
  saved?: boolean;
  onToggleSave?: () => void;
};
 
const CourseCardHomepage = ({
  title,
  teacher,
  role,
  category,
  saved = false,
  onToggleSave,
}: Props) => {
  return (
    <div className="bg-white rounded-[20px] p-5 w-full max-w-[500px] relative shadow-md">
     
      <button
        onClick={onToggleSave}
        className={`absolute top-5 right-5 p-2 rounded-full cursor-pointer transition-colors duration-300 ${
          saved ? "bg-purple-600" : "bg-gray-200"
        }`}
      >
        <img
          src={heart}
          alt="save"
          className="w-5 h-5"
        />
      </button>
 
      
      <span className="bg-[#702DFF]/20 text-[#2f327d] text-xs px-3 py-1 rounded-full font-medium">
        {category}
      </span>
 
      
      <h3 className="p-2 font-medium text-gray-800">{title}</h3>
 
     
      <div className="flex items-center mt-5 gap-3">
         <TeacherAvatar name={teacher} />
        <div>
          <p className="text-sm font-semibold text-gray-800">{teacher}</p>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
};
 
export default CourseCardHomepage;