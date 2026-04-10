import { useNavigate } from "react-router-dom";
import "./freeaccount.css"

function FreeAccount() {
    const navigate = useNavigate();
    return (
        <div id="freeAccount">
            <h1 id="freeAccountTitle">Ready to start learning?</h1>
            <p id="freeAccountText">Join thousands of learners in our inclusive community. Your journey starts here.</p>
            <button id="freeAccountButton" onClick={() => navigate('/Signup')}>Create Your Free Account</button>
        </div>
    );
}
export default FreeAccount;