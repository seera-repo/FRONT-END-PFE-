import ProfileIcon from '../assets/icons/profile.svg';
import CommunityIcon from '../assets/icons/people.svg';
import CoursesIcon from '../assets/icons/folder.svg';
import DashboardIcon from '../assets/icons/home.svg';
import LogoutIcon from '../assets/icons/logout.svg';
import { getUser } from '../api/auth';
import { useNavigate, Outlet } from 'react-router-dom';
import logo from '../assets/images/Asset_14x.png';

function Header() {
  const user = getUser();

  const navLinks = [
    {
      label: "Dashboard",
      href: user?.role === "Admin" ? "/db" : user?.role === "Teacher" ? "/HomePageTeacher" : "/HomePage",
      icon: DashboardIcon
    },
    { label: "Courses", href: "/BrowseCourse", icon: CoursesIcon },
    { label: "Community", href: "/CommunityBlog", icon: CommunityIcon },
    {
      label: "Profile",
      href: user?.role === "Admin" ? "/ProfileAdmin" : user?.role === "Teacher" ? "/ProfileTeacher" : "/ProfileStudent",
      icon: ProfileIcon
    },
  ];
  const navigate = useNavigate();

  return (
    <>
      <header className='fixed top-0 left-0 z-50 h-16 w-full bg-[#d2d4f5] shadow-[0_10px_15px_rgba(0,0,0,0.1)]'>
        <nav className='flex flex-row justify-between items-center h-full px-6'>
          <a className='flex flex-row justify-center items-center gap-x-2' href='/'>
            <img src={logo} alt="Logo" className="h-15 w-auto object-contain" />
          </a>

          <ul className='flex felx-row flex-1 justify-center items-center gap-x-2 text-[#202020] font-semibold max-md:hidden'>

            {navLinks.map((link, i) => {
              return (
                <li
                  key={i}
                  className="group flex items-center gap-x-2 text-[14px] py-1 px-4 rounded-4xl cursor-pointer"
                >
                  {
                    link.icon && <img src={link.icon} alt={link.label}
                      className="transition-all group-hover:opacity-50"
                    />
                  }

                  <a
                    href={link.href}
                    className=" group-hover:text-[#702DFF] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}

          </ul>
          <button className='flex items-center gap-x-2  font-semibold  mr-9 text-[18px] hover:text-red-700 hover:bg-red-100/50 px-4 py-1 rounded-4xl transition duration-300 ease-in-out cursor-pointer ml-8 text-[#F13E3E]'
            onClick={() => {
              localStorage.clear();
              navigate('/');
            }}>
            <img src={LogoutIcon} alt="logout" />
            Logout
          </button>

        </nav>
      </header>
      <Outlet />
    </>
  )
}

export default Header