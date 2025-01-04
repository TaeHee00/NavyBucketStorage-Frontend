import React from "react"
import logo from "../assets/images/logo.png";
import {
    LogoContainerStyle,
    LogoImgStyle,
    MainContainerStyle,
    SubTextStyle,
    TextContainerStyle
} from "./css/NoSessionHeader.css";

const LoginPage: React.FC = () => {
    return (<div className={MainContainerStyle}>
        <div className={LogoContainerStyle}>
            <img className={LogoImgStyle} src={logo} alt={""}/>
            <div className={TextContainerStyle}>
                <span className={MainContainerStyle}>NAVY</span>
                <span className={SubTextStyle}>CLOUD PLATFORM</span>
            </div>
        </div>
    </div>)
}

export default LoginPage;