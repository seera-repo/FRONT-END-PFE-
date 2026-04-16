function Footer() {
    return (
        <div>
            <div className="w-screen h-[250px] bg-[rgb(245,245,254)] flex flex-row w-full">
                <div className="flex flex-col ml-[50px] mt-[50px]">
                    <div className="flex flex-row gap-[10px]">
                        <img />
                        <h3 className="w-[50px] h-[20px] font-bold text-[25px] text-[rgb(44,44,44)]">diversity</h3>
                    </div>
                    <p className="w-[250px] text-[17px] font-normal text-[rgb(90,90,90)] h-[30px] text-center mt-[25px]">
                        Inclusive learning for everyone. Designed with accessibility and care at its core.
                    </p>
                </div>

                <div className="grid grid-cols-3 w-[800px] h-[180px] mt-[50px] ml-[50px] bg-[rgb(245,245,254)] gap-x-[60px]">
                    <a className="font-medium text-[20px] text-[rgb(41,41,41)] text-center">Platform</a>
                    <a className="font-medium text-[20px] text-[rgb(41,41,41)] text-center">Support</a>
                    <a className="font-medium text-[20px] text-[rgb(41,41,41)] text-center">Legal</a>
                    <a className="text-[16px] font-light text-gray-500 text-center">Courses</a>
                    <a className="text-[16px] font-light text-gray-500 text-center">Help Center</a>
                    <a className="text-[16px] font-light text-gray-500 text-center">Privacy Policy</a>
                    <a className="text-[16px] font-light text-gray-500 text-center">Community</a>
                    <a className="text-[16px] font-light text-gray-500 text-center">Accessibility</a>
                    <a className="text-[16px] font-light text-gray-500 text-center">Terms of service</a>
                    <a className="text-[16px] font-light text-gray-500 text-center">About us</a>
                    <a className="text-[16px] font-light text-gray-500 text-center">Contact</a>
                </div>
            </div>

            <div className="flex flex-row justify-between items-center border-t-2 border-[rgb(219,219,219)] h-[50px] bg-[rgb(245,245,254)] whitespace-nowrap w-full">
                <p className="text-[17px] font-light text-gray-500 ml-[20px] py-[10px]">made with ❤️ for inclusive education</p>
                <p className="text-[17px] font-light text-gray-500 mr-[20px] py-[10px]">2026 Smart CS. All rights reserved.</p>
            </div>
        </div>
    );
}

export default Footer;