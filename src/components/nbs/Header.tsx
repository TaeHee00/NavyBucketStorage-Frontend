import React from "react"
import logo from "../../assets/images/logo.png";
import {
    HeaderStyle,
    LogoContainerStyle,
    LogoStyle,
    MainTextStyle,
    SubTextStyle,
    TextContainerStyle, UserStyle
} from "../css/Header.css";

const LoginPage: React.FC<{username: string}> = (props) => {
    return (<div className={HeaderStyle}>
        <div className={LogoContainerStyle}>
            <img className={LogoStyle} src={logo} alt={""}/>
            <div className={TextContainerStyle}>
                <span className={MainTextStyle}>NAVY</span>
                <span className={SubTextStyle}>CLOUD PLATFORM</span>
            </div>
        </div>
        <div className={UserStyle}>
            {props.username}
        </div>
    </div>)
}

export default LoginPage;