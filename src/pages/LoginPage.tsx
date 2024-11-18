import React, {useCallback, useState} from "react"
import styled, {css} from "styled-components";
import Header from "../components/Header";
import checkOn from "../assets/images/check-on.svg";
import checkOff from "../assets/images/check-off.svg";
import CheckButton from "../components/CheckButton";
import Input from "../components/Input";
import useLogin from "../hooks/login/useLogin";
import {API, AuthType} from "../enums/API";
import {LoginRequest, LoginResponse} from "../types/API";
import {useReactQueryState} from "../store/useReactQueryState";

interface LoginTypeProps {
    active: boolean;
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

const LoginContainer = styled.div`
    display: flex;
    padding: 6.42vh 5.125vw;
    flex-direction: column;
    align-items: flex-start;

    border-radius: 20px;
    background: #FFF;
    box-shadow: 0 1px 23px 0 rgba(0, 0, 0, 0.05);
`;
const LoginTitleText = styled.span`
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
    
    ${props => props.active ? css`
        border: 2px solid #117CE9;
        background: rgba(17, 124, 233, 0.14);
        color: #117CE9;
      ` : css`
        border: none;
        background: #F0F0F0;
        color: #444;
        transition: all 0.2s ease;
        
        &:hover {
            transition: all 0.2s ease;
            background: #d8d8d8;
        }
  `}
`;

const CheckIcon = styled.img<LoginTypeProps>`
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

type CurrentUserState = {
    accessToken: string;
    refreshToken: string;
    username: string;
    authType: AuthType;
}

const LoginPage: React.FC = () => {
    const [loginState, setLoginState] = useState<LoginStateProps>({
        loginType: "MAIN",
        isSaveId: false,
        id: "",
        password: ""
    });
    const [currentUser, setCurrentUser] = useReactQueryState<CurrentUserState>("currentUser", {
        accessToken: "",
        refreshToken: "",
        username: "",
        authType: AuthType.NONE,
    });

    const loginRequestData : LoginRequest = {
        id: loginState.id,
        password: loginState.password
    }

    const loginAPI = useLogin(API.LOGIN, loginRequestData);

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
            <LoginContainer>
                <LoginTitleText>로그인</LoginTitleText>
                <LoginTypeContainer>
                    <LoginTypeButton active={loginState.loginType === "MAIN"}
                                     onClick={() => handleLoginType("MAIN")} >
                        <CheckIcon active={loginState.loginType === "MAIN"}
                                   src={loginState.loginType === "MAIN" ? checkOn : checkOff} />
                        메인 계정
                    </LoginTypeButton>
                    <LoginTypeButton active={loginState.loginType === "IAM"}
                                     onClick={() => handleLoginType("IAM")} >
                        <CheckIcon active={loginState.loginType === "IAM"}
                                   src={loginState.loginType === "IAM" ? checkOn : checkOff} />
                        IAM 계정
                    </LoginTypeButton>
                </LoginTypeContainer>
                <LoginForm>
                    <Input placeholder="아이디(이메일)을 입력해 주십시오."
                           value={loginState.id}
                           name="id"
                           onChange={handleInputChange}
                           onKeyDown={enterLoginEvent} />
                    <Input placeholder="비밀번호를 입력해 주십시오."
                           value={loginState.password}
                           name="password"
                           onChange={handleInputChange}
                           onKeyDown={enterLoginEvent} />
                    <CheckButton toggleHandler={saveIdToggleHandler}
                                 isChecked={loginState.isSaveId}
                                 content="아이디 저장" />
                    <LoginButton onClick={() => {
                        loginAPI.run();

                        // TODO: loginAPI.loading이 True일 경우 로딩 Animation 추가해주면 좋을듯
                        if (!loginAPI.loading && loginAPI.error === null) {
                            // 요청 종료
                            // TODO: request Data 중에 token은 Cookie에 저장하고
                            // authType이랑 username은 global store
                            setCurrentUser((prev) => {
                                if (loginAPI.data) {
                                    const res : LoginResponse = loginAPI.data;
                                    return {...prev, accessToken: res.accessToken, refreshToken: res.refreshToken, username: res.username, authType: res.authType};
                                }
                                alert("[Server Error] 로그인 시 에러가 발생했습니다. 관리자에게 문의해주세요.")
                                return prev;
                            });
                            // TODO: authType은 권한별 페이지 렌더링 다르게 할때 쓰면 좋을꺼같고
                            // TODO: username은 로그인한 유저 닉네임 확인 가능하도록 쓸꺼
                        }
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
            </LoginContainer>
        </MainContainer>
    </>)
}

export default LoginPage;