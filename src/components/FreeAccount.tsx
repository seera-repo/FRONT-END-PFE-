import { useNavigate } from "react-router-dom";
function FreeAccount() {
    const navigate = useNavigate();
    return (
        <div id="freeAccount" className="w-screen bg-[#2F327D] h-[320px]  pt-[30px] mt-[100px]">
            <h1 id="freeAccountTitle" className="cursor-default w-[200px] h-[100px] text-white text-[43px] font-[700] mt-[30px] ml-[370px] whitespace-nowrap">Ready to start learning?</h1>
            <p id="freeAccountText" className="cursor-default text-[22px] font-[500] text-white w-[800px] text-center whitespace-nowrap ml-[225px] mt-[-20px]">Join thousands of learners in our inclusive community. Your journey starts here.</p>
            <button id="freeAccountButton" className="bg-[lightgreen] text-white w-[300px] h-[60px] rounded-[40px] text-[20px] font-[500] ml-[470px] mt-[30px] hover:opacity-90" onClick={() => navigate('/Signup')}>Create Your Free Account</button>
        </div>
    );
}
export default FreeAccount;