import Header from "../components/Header";
import React, {useCallback, useEffect, useState} from "react";
import Input from "../components/Input";
import prevIcon from "../assets/images/prev.png";
import nextIcon from "../assets/images/next.png"
import {useQueryClient} from "@tanstack/react-query";
import {useRegister} from "../hooks/login/useAuth";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {
    ActiveNextButtonStyle,
    CardBottomContainerStyle, IconActiveStyle, IconNextStyle, IconPrevStyle,
    InputFormStyle,
    InputTitleStyle,
    MainContainerStyle, NextButtonStyle, PrevButtonStyle,
    RegisterInfoFormStyle, SubTextStyle
} from "./RegisterInfoPage.css";
import {CardContainerStyle, TitleTextStyle} from "./LoginPage.css";

const RegisterInfoPage = () => {
    const queryClient = useQueryClient();
    if (queryClient.getQueryData(["registerEmail"]) === undefined) {
        queryClient.setQueryData(["registerEmail"], "");
    }
    const [registerInfo, setRegisterInfo] = useState<{email: string, username: string, password: string, passwordCheck: string, passwordValid: boolean, registerActive: boolean, emailError: string | undefined}>({
        email: queryClient.getQueryData(["registerEmail"]) as string,
        username: "",
        password: "",
        passwordCheck: "",
        passwordValid: false,
        registerActive: false,
        emailError: undefined,
    });

    const [errorEmailList, setErrorEmailList] = useState<string[]>([]);
    const navigate = useNavigate();
    const {register, response, error} = useRegister();

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setRegisterInfo(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    useEffect(() => {
        if (registerInfo.password === "" && registerInfo.passwordCheck === "") {
            setRegisterInfo((prev) => ({...prev, passwordValid: true}));
        } else {
            setRegisterInfo((prev) => ({...prev, passwordValid: registerInfo.password === registerInfo.passwordCheck}));
        }

        if (registerInfo.email !== "" && registerInfo.username !== "" && registerInfo.password !== "" && registerInfo.passwordValid) {
            setRegisterInfo((prev) => ({...prev, registerActive: true}));
        } else {
            setRegisterInfo((prev) => ({...prev, registerActive: false}));
        }
    }, [registerInfo.email, registerInfo.password, registerInfo.passwordCheck, registerInfo.passwordValid, registerInfo.username]);

    useEffect(() => {
        setRegisterInfo((prev) => ({...prev, emailError: error as string}));
    }, [error]);

    useEffect(() => {
        if (registerInfo.email !== "") {
            if (!errorEmailList.find((errorEmail) => errorEmail === registerInfo.email)) {
                setRegisterInfo((prev) => ({...prev, emailError: undefined}));
            }
        }
    }, [registerInfo.email, errorEmailList]);

    const width = 69;

    return (<>
        <Header/>
        <div className={MainContainerStyle}>
            <div className={CardContainerStyle.withWidth} style={width ? { '--card-width': `${width}vw` } as React.CSSProperties  : {}}>
                <span className={TitleTextStyle}>로그인 정보를 입력해주세요.</span>
                <span className={SubTextStyle}>입력하신 정보 회원님의 계정이 생성됩니다.</span>
                <div className={RegisterInfoFormStyle}>
                    <div className={InputFormStyle}>
                        <span className={InputTitleStyle}>아이디</span>
                        <Input placeholder="아이디로 사용할 이메일 주소를 입력해 주십시오."
                               value={registerInfo.email}
                               name="email"
                               onChange={handleInputChange}
                               onKeyDown={() => {
                               }}
                               warning={registerInfo.emailError ? registerInfo.emailError as string : undefined}/>
                    </div>
                    <div className={InputFormStyle}>
                        <span className={InputTitleStyle}>닉네임</span>
                        <Input placeholder="닉네임으로 사용할 이름을 입력해 주십시오."
                               value={registerInfo.username}
                               name="username"
                               onChange={handleInputChange}
                               onKeyDown={() => {
                               }}/>
                    </div>
                    <div className={InputFormStyle}>
                        <span className={InputTitleStyle}>비밀번호</span>
                        <Input placeholder="비밀번호를 입력해 주십시오."
                               value={registerInfo.password}
                               name="password"
                               onChange={handleInputChange}
                               onKeyDown={() => {
                               }}/>
                    </div>
                    <div className={InputFormStyle}>
                        <span className={InputTitleStyle}>비밀번호 확인</span>
                        <Input placeholder="비밀번호를 다시 입력해 주십시오."
                               value={registerInfo.passwordCheck}
                               name="passwordCheck"
                               onChange={handleInputChange}
                               warning={!registerInfo.passwordValid ? "비밀번호와 비밀번호 확인이 일치하지 않습니다." : undefined}
                               onKeyDown={() => {
                               }}/>
                    </div>
                </div>
                <div className={CardBottomContainerStyle}>
                    <button className={PrevButtonStyle} onClick={() => {
                        navigate("/register");
                    }}>
                        <img className={IconPrevStyle} src={prevIcon} alt="prev"/>
                        이전
                    </button>
                    <button className={registerInfo.registerActive ? ActiveNextButtonStyle : NextButtonStyle}
                                onClick={() => {
                                    if (!registerInfo.passwordValid) {
                                        alert("비밀번호가 일치하지 않습니다.")
                                        return;
                                    }
                                    register({
                                        username: registerInfo.username,
                                        email: registerInfo.email,
                                        password: registerInfo.password
                                    });

                                    if (!response) {
                                        setErrorEmailList((prev) => [...prev, registerInfo.email]);
                                        setRegisterInfo((prev) => ({...prev, emailError: error as string}));
                                        return;
                                    } else {
                                        navigate("/");
                                        // TODO: loading 애니메이션 추가
                                        toast("정상적으로 회원가입되었습니다.")
                                    }
                                }}>
                        다음
                        <img src={nextIcon}
                              alt="next"
                             className={registerInfo.registerActive ? IconActiveStyle : IconNextStyle}/>
                    </button>
                </div>
            </div>
        </div>
    </>);
}

export default RegisterInfoPage;