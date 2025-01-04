import React, {useCallback, useState} from "react"
import Header from "../components/Header";
import checkOn from "../assets/images/check-on.svg";
import checkOff from "../assets/images/check-off.svg";
import CheckButton from "../components/CheckButton";
import Input, {LoginErrorType} from "../components/Input";
import {useLogin} from "../hooks/login/useAuth";
import {useQueryClient} from "@tanstack/react-query";
import {
    ActiveLoginTypeButtonStyle,
    BottomContainerStyle, CardContainerStyle, FindButtonStyle, FindContainerStyle,
    HrStyle,
    LoginButtonStyle,
    LoginFormStyle,
    LoginTypeContainerStyle,
    MainContainerStyle, RegisterButtonStyle,
    TitleTextStyle
} from "./LoginPage.css";
import {CheckButtonStyle} from "../components/css/CheckButton.css";

// interface LoginTypeProps {
//     $active: boolean;
//     onClick?: (loginType: string) => void;
// }

export interface LoginStateProps {
    loginType: string;
    isSaveId: boolean;
    id: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const [loginState, setLoginState] = useState<LoginStateProps>({
        loginType: "MAIN",
        isSaveId: false,
        id: "",
        password: ""
    });

    const { login } = useLogin();
    const queryClient = useQueryClient();

    const handleLoginType = useCallback((loginType: string) => {
        if (loginState.loginType === loginType) return;

        setLoginState(prev => {
            return {...prev, loginType: loginType}
        })
    }, [loginState.loginType]);

    const saveIdToggleHandler = useCallback(() => {
        setLoginState(prev => { return {...prev, isSaveId: !prev.isSaveId}});
    }, []);

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }, []);

    const enterLoginEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            login({ id: loginState.id, password: loginState.password });
        }
    }

    return (<>
        <Header />
        <div className={MainContainerStyle}>
            <div className={CardContainerStyle.default}>
                <span className={TitleTextStyle}>로그인</span>
                <div className={LoginTypeContainerStyle}>
                    <button className={loginState.loginType === "MAIN" ? ActiveLoginTypeButtonStyle : LoginTypeContainerStyle }
                                     onClick={() => handleLoginType("MAIN")}
                                     type="button" >
                        <img className={CheckButtonStyle}
                                   src={loginState.loginType === "MAIN" ? checkOn : checkOff}  alt={""}/>
                        메인 계정
                    </button>
                    <button className={loginState.loginType === "IAM" ? ActiveLoginTypeButtonStyle : LoginTypeContainerStyle }
                                     onClick={() => handleLoginType("IAM")}
                                     type="button" >
                        <img className={CheckButtonStyle} alt={""}
                                   src={loginState.loginType === "IAM" ? checkOn : checkOff} />
                        IAM 계정
                    </button>
                </div>
                <div className={LoginFormStyle}>
                    <Input placeholder="아이디(이메일)을 입력해 주십시오."
                           value={loginState.id}
                           name="id"
                           onChange={handleInputChange}
                           onKeyDown={enterLoginEvent}
                           warning={queryClient.getQueryData(["loginError"]) === LoginErrorType.USER_NOT_FOUND ? LoginErrorType.USER_NOT_FOUND : undefined} />
                    <Input placeholder="비밀번호를 입력해 주십시오."
                           value={loginState.password}
                           name="password"
                           onChange={handleInputChange}
                           onKeyDown={enterLoginEvent}
                           warning={queryClient.getQueryData(["loginError"]) === LoginErrorType.INVALID_PASSWORD ? LoginErrorType.INVALID_PASSWORD : undefined} />
                    <CheckButton toggleHandler={saveIdToggleHandler}
                                 isChecked={loginState.isSaveId}
                                 content="아이디 저장" />
                    <button className={LoginButtonStyle} type="button" onClick={(event) => {
                        event.preventDefault();
                        login({ id: loginState.id, password: loginState.password });
                    }}>로그인</button>
                </div>
                <hr className={HrStyle}/>
                <div className={BottomContainerStyle}>
                    <button className={RegisterButtonStyle}>회원가입</button>
                    <div className={FindContainerStyle}>
                        <button className={FindButtonStyle}>아이디 찾기</button>
                        <button className={FindButtonStyle}>비밀번호 찾기</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default LoginPage;