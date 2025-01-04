import React, {useCallback, useState} from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import {Link, useNavigate} from "react-router-dom";
import {useEmailCheck} from "../hooks/login/useAuth";
import {useQueryClient} from "@tanstack/react-query";
import {
    LoginRouteContainerStyle, LoginRouteTextStyle,
    MainContainerStyle,
    RegisterButtonStyle,
    RegisterFormContainerStyle
} from "./RegisterPage.css";
import {CardContainerStyle, TitleTextStyle} from "./LoginPage.css";

const RegisterPage: React.FC = () => {
    const queryClient = useQueryClient();
    const [email, setEmail] = useState("");
    const {emailCheck} = useEmailCheck();
    const navigate = useNavigate();

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(() => event.target.value);
    }, []);

    const enterEmailEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            emailCheck({email: email});
        }
    }

    return (<>
        <Header />
        <div className={MainContainerStyle}>
            <div className={CardContainerStyle.withWidth} style={"69vw" as React.CSSProperties }>
                <span className={TitleTextStyle}>회원 가입을 시작합니다.</span>
                <div className={RegisterFormContainerStyle}>
                    <Input placeholder="이메일 주소를 입력해 주십시오."
                           value={email}
                           name=""
                           onChange={handleInputChange}
                           onKeyDown={enterEmailEvent}
                           warning={
                               queryClient.getQueryData(["registerCheckEmailErrorMessage"]) !== undefined ?
                                   queryClient.getQueryData(["registerCheckEmailErrorMessage"]) : undefined
                           } />
                    <div className={RegisterButtonStyle} onClick={() => {
                        emailCheck({email: email});
                        if (queryClient.getQueryData(["registerEmail"]) !== undefined) {
                            navigate("/register/step/1");
                        }
                    }}>
                        이메일로 가입하기
                    </div>
                    <div className={LoginRouteContainerStyle}>
                        이미 계정이 있으신가요?
                        <Link to="/">
                            <span className={LoginRouteTextStyle} onClick={() => {}}>로그인</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default RegisterPage;