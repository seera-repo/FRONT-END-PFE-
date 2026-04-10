import "./footer.css"
function Footer() {
    return (
        <div>
            <div id="footer">
                <div id="footerFlex">
                    <div id="flexfooter">
                        <img ></img>
                        <h3 >diversity</h3>
                    </div>
                    <p id="footerText">Inclusive learning for everyone. Designed with accessibility and care at its core.</p>
                </div>
                <div id="gridFooter">
                    <a className="titleGridFooter">Platform</a>
                    <a className="titleGridFooter">Support</a>
                    <a className="titleGridFooter">Legal</a>
                    <a className="elementGridFooter">Courses</a>
                    <a className="elementGridFooter">help Center</a>
                    <a className="elementGridFooter">Privacy Policy</a>
                    <a className="elementGridFooter">Community</a>
                    <a className="elementGridFooter">Accessibility</a>
                    <a className="elementGridFooter">Terms of service</a>
                    <a className="elementGridFooter">about us</a>
                    <a className="elementGridFooter">contact</a>
                </div>
            </div>
            <div id="lastSectionFooter">
                <p id="footerText1">made with <span></span> for inclusive education</p>
                <p id="footerText2">2026 Smart CS. All rights reserved.</p>
            </div>
        </div>
    );
}
export default Footer;