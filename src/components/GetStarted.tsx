import { useNavigate } from 'react-router-dom';
// const myPic = new URL("../../hero-learning.jpg", import.meta.url).href;
import pic from '../assets/images/hero-learning.jpg';
function GetStarted() {
    const navigate = useNavigate();
    return (
        <div className='c0 w-screen flex flex-row bg-[#e4e4ef] h-[700px] mb-[-20px] border-b border-[rgb(196,196,196)]'>
            <div className='C02 flex flex-col'>
                <h1 className="cursor-default c2 w-[650px] h-[100px] text-black font-['Geist',sans-serif] text-[55px] font-bold mt-[150px] ml-[50px]">Learn at your own pace , your own way</h1>
                <p className="cursor-default c3 font-['Geist',sans-serif] text-[20px] font-medium text-[rgb(90,90,90)] w-[600px] ml-[50px] mt-[90px]">Smart CS is a warm, accessible platform where every learner is supported. AI-powered recommendations, calm design, and an inclusive community help you thrive.</p>
                <div className="c4 flex mt-[40px] ml-[50px] gap-[25px]">
                    <button className="c5 cursor-pointer bg-[#2F327D] hover:bg-[#702DFF] text-white w-[250px] h-[60px] rounded-[40px] font-['Geist',sans-serif] text-[22px] font-medium" onClick={() => navigate('/Signup')}>Get Started Free</button>
                    <button className="c6 cursor-pointer bg-[aliceblue] hover:bg-[lightgreen] border border-[darkgray] text-black w-[250px] h-[60px] rounded-[40px] font-['Geist',sans-serif] text-[22px] font-medium" onClick={() => navigate('/BrowseCourses')}>Browse Courses</button>
                </div>
            </div>
            <img src={pic} style={{ width: "500px", height: "500px", marginTop: "90px", marginLeft: "50px", borderRadius: "30px", backgroundColor: "rgb(230, 230, 230)" }} />
        </div>
    );
}

export default GetStarted;