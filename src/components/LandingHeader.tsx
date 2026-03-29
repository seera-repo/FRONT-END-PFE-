
import { Outlet, useNavigate } from 'react-router-dom';

function LandingHeader() {

  const mainLinks = [
    { label: "Home", href: "#Home", },

    { label: "About us", href: "#AboutUs" },

    { label: "Features", href: "#Features" },

    { label: "Contacts", href: "#Contacts" },
  ];
  const navigate = useNavigate();
  return (
    <>
      <header className='fixed top-0 left-0 z-50 pt-4 pb-4 w-full bg-[#3548A7] shadow-[0_10px_15px_rgba(0,0,0,0.1)]'>
        <nav className='flex flex-row justify-between items-center '>
          <a
            className='flex flex-row justify-center items-center'
            href='/'>

            <h3 className='ml-6 text-3xl font-bold text-[#d2d4f5]'>WebName</h3>
          </a>

          <ul className='flex felx-row flex-1 justify-center items-center gap-x-2 text-[#d2d4f5] font-semibold max-md:hidden'>

            {mainLinks.map((link, i) => {
              return (
                <li
                  key={i}
                  className="group flex items-center gap-x-2 text-[14px] py-1 px-4 rounded-4xl cursor-pointer"
                >
                  <a
                    href={link.href}
                    className=" group-hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}

          </ul>

          <div className='flex flex-row gap-4 mr-11 font-semibold'>
            <button className='font-semibold  py-1 px-4 rounded-4xl text-[14px] active:opacity-80 transition duration-300 ease-in-out cursor-pointer bg-white border-2 border-white  hover:bg-[#d2d4f5] hover:border-[#d2d4f5]'
              onClick={() => navigate('/Login')}>
              login
            </button>
            <button className='font-semibold  py-1 px-4 rounded-4xl text-[14px] active:opacity-80 transition duration-300 ease-in-out cursor-pointer text-[#d2d4f5] bg-[#2F35C2] border-2 border-white  hover:bg-[#d2d4f5] hover:border-[#d2d4f5] hover:text-[#2F35C2]'
              onClick={() => navigate('/signUp')}>
              Sign up
            </button>
          </div>

        </nav>
      </header>
      <Outlet />

    </>
  )

}

export default LandingHeader