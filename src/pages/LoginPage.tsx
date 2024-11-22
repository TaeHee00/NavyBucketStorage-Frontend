import React, {useCallback, useState} from "react"
import styled, {css} from "styled-components";
import Header from "../components/Header";
import checkOn from "../assets/images/check-on.svg";
import checkOff from "../assets/images/check-off.svg";
import CheckButton from "../components/CheckButton";
import Input, {LoginErrorType} from "../components/Input";
import {useLogin} from "../hooks/login/useAuth";
import {useQueryClient} from "@tanstack/react-query";

interface LoginTypeProps {
    $active: boolean;
    onClick?: (loginType: string) => void;
}

export interface LoginStateProps {
    loginType: string;
    isSaveId: boolean;
    id: string;
    password: string;
}

const MainContainer = styled.div`
    display: flex;
    height: 76vh;
    padding: 10vh 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: stretch;
    background: #F6F7F8;
`;

export const CardContainer = styled.div<{width?: number}>`
    display: flex;
    padding: 6.42vh 5.125vw;
    flex-direction: column;
    align-items: flex-start;

    border-radius: 20px;
    background: #FFF;
    box-shadow: 0 1px 23px 0 rgba(0, 0, 0, 0.05);

    width: ${props => props.width ? `${props.width}vw` : null};
`;
export const TitleText = styled.span`
    color: #222;
    margin-bottom: 4.167vh;

    font-family: "Pretendard Variable", serif;
    font-size: 1.688rem;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
    white-space: nowrap;
`;
const LoginTypeContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.83vw;
`;

const LoginTypeButton = styled.button<LoginTypeProps>`
  // 스타일 정의
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;

    padding: 0.75vh 0;
    white-space: nowrap;
    cursor: pointer;

    border-radius: 6px;

    font-family: "Pretendard Variable", serif;
    font-size: 0.938rem;
    font-style: normal;
    font-weight: 600;
    line-height: 30px;

    border: none;
    background: #F0F0F0;
    color: #444;
    transition: all 0.2s ease;

    &:hover {
        transition: all 0.2s ease;
        background: #d8d8d8;
    }
  ${({ $active }) => $active && css`
        border: 2px solid #117CE9;
        background: rgba(17, 124, 233, 0.14);
        color: #117CE9;
  `}
`;

const CheckIcon = styled.img<{$active: boolean, src: string}>`
    width: 16px;
    height: 16px;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
`;

const LoginForm = styled.form`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    margin-top: 1.2vh;
    gap: 1.2vh;
`;

const LoginButton = styled.button`
    display: flex;
    padding: 0 21vw;
    align-items: center;
    justify-content: center;
    
    border-radius: 6px;
    background: #117CE9;

    color: #FFF;
    text-align: center;

    font-family: "Pretendard Variable", serif;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 48px;
    
    border: none;
    white-space: nowrap;
    cursor: pointer;

    transition: all 0.2s ease;

    &:hover {
        transition: all 0.2s ease;
        background: #0F70D2;
    }
    
    margin-top: 4vh;
`;

const BottomContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const RegisterButton = styled.span`
    color: #117CE9;

    margin-top: auto;
    
    font-family: "Pretendard Variable", serif;
    font-size: 0.938rem;
    font-style: normal;
    font-weight: 600;
    line-height: 30px;
    
    white-space: nowrap;
    cursor: pointer;
`;

const FindContainer = styled.div`
    //width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    
    gap: 2vw;
    
    margin-top: 4vh;
`;

const FindButton = styled.span`
    color: #222;

    font-family: "Pretendard Variable", serif;
    font-size: 0.938rem;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
    
    cursor: pointer;
`;

const Hr = styled.hr`
    width: 100%;
    border: 1px solid #EDEDED;
    
    margin-top: 6vh;
`;

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
        <MainContainer>
            <CardContainer>
                <TitleText>로그인</TitleText>
                <LoginTypeContainer>
                    <LoginTypeButton $active={loginState.loginType === "MAIN"}
                                     onClick={() => handleLoginType("MAIN")}
                                     type="button" >
                        <CheckIcon $active={loginState.loginType === "MAIN"}
                                   src={loginState.loginType === "MAIN" ? checkOn : checkOff} />
                        메인 계정
                    </LoginTypeButton>
                    <LoginTypeButton $active={loginState.loginType === "IAM"}
                                     onClick={() => handleLoginType("IAM")}
                                     type="button" >
                        <CheckIcon $active={loginState.loginType === "IAM"}
                                   src={loginState.loginType === "IAM" ? checkOn : checkOff} />
                        IAM 계정
                    </LoginTypeButton>
                </LoginTypeContainer>
                <LoginForm>
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
                    <LoginButton type="button" onClick={(event) => {
                        event.preventDefault();
                        login({ id: loginState.id, password: loginState.password });
                    }}>로그인</LoginButton>
                </LoginForm>
                <Hr />
                <BottomContainer>
                    <RegisterButton>회원가입</RegisterButton>
                    <FindContainer>
                        <FindButton>아이디 찾기</FindButton>
                        <FindButton>비밀번호 찾기</FindButton>
                    </FindContainer>
                </BottomContainer>
            </CardContainer>
        </MainContainer>
    </>)
}

export default LoginPage;