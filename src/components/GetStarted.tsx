import { useNavigate } from 'react-router-dom';
import './getstarted.css';
const myPic = new URL("../hero-learning.jpg", import.meta.url).href;
function GetStarted() {
    const navigate = useNavigate();
    return (
        <div className='c0'>
            <div className='C02'>
                <div className="c1">Inclusive Learning for Everyone</div>
                <h1 className="c2">Learn at your own pace , your own way</h1>
                <p className="c3">Smart CS is a warm, accessible platform where every learner is supported. AI-powered recommendations, calm design, and an inclusive community help you thrive.</p>
                <div className="c4">
                    <button className="c5" onClick={() => navigate('/Signup')}>Get Started Free</button>
                    <button className="c6" onClick={() => navigate('/BrowseCourses')}>Browse Courses</button>
                </div>
            </div>
            <img src={myPic} style={{ width: "500px", height: "500px", marginTop: "120px", marginLeft: "50px", borderRadius: "30px", backgroundColor: "rgb(230, 230, 230)" }} />
        </div>
    );
}

export default GetStarted;