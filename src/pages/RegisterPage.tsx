import React from "react";
import Header from "../components/Header";
import styled from "styled-components";
import {CardContainer, TitleText} from "./LoginPage";
import Input from "../components/Input";

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

const RegisterFormContainer = styled.div`
    width: 100%;
    margin: 2.5vh 0 0;
`;

const RegisterButton = styled.button`
    width: 99%;
    display: flex;
    //padding: 0 21vw;
    align-items: center;
    justify-content: center;
    
    padding: 0;
    
    border-radius: 6px;
    background: #117CE9;

    color: #FFF;
    text-align: center;

    font-family: "Pretendard Variable", serif;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
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

const LoginRouteContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    
    font-size: 15px;
    line-height: 1.6;
    vertical-align: middle;
    color: #222;

    font-family: "Pretendard Variable", serif;
    font-style: normal;
    font-weight: 500;
    
    margin-top: 10vh;
`;

const LoginRouteText = styled.span`
    font-size: 15px;
    font-weight: 600;
    line-height: 2;
    color: #117ce9 !important;
    text-decoration: none !important;
    vertical-align: middle;
    transition: all 0.2s ease;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1) !important;
    
    cursor: pointer;
    margin-left: 1%;
`;

const RegisterPage: React.FC = () => {
    return (<>
        <Header />
        <MainContainer>
            <CardContainer width={69}>
                <TitleText>회원 가입을 시작합니다.</TitleText>
                <RegisterFormContainer>
                    <Input placeholder="이메일 주소를 입력해 주십시오."
                           value=""
                           name=""
                           onChange={() => {}}
                           onKeyDown={() => {}} />
                    <RegisterButton>
                        이메일로 가입하기
                    </RegisterButton>
                    <LoginRouteContainer>
                        이미 계정이 있으신가요?
                        <LoginRouteText>로그인</LoginRouteText>
                    </LoginRouteContainer>
                </RegisterFormContainer>
            </CardContainer>
        </MainContainer>
    </>);
}

export default RegisterPage;