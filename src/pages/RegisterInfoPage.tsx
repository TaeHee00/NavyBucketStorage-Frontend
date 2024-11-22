import Header from "../components/Header";
import styled, {css} from "styled-components";
import {CardContainer, TitleText} from "./LoginPage";
import React, {useCallback, useEffect, useState} from "react";
import Input from "../components/Input";
import prevIcon from "../assets/images/prev.png"
import nextIcon from "../assets/images/next.png"
import {useQueryClient} from "@tanstack/react-query";

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

const RegisterInfoForm = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    margin-top: 1.2vh;
    gap: 2vh;
`;

const InputForm = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.2vh;
`;

const InputTitle = styled.span`
    font-size: 1rem;
    line-height: 1.88;
    font-weight: 600;
    letter-spacing: normal;
`

const SubText = styled.span`
    font-family: Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, Helvetica Neue, Segoe UI, Apple SD Gothic Neo, Noto Sans KR, Malgun Gothic, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, sans-serif !important;
    letter-spacing: 0 !important;
    -webkit-font-smoothing: antialiased !important;
    word-break: keep-all !important;
    
    margin-top: -1.5vh;
    margin-bottom: 1.5vh;
`;

const CardBottomContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    
    align-items: center;
    justify-content: space-between;
    
    margin-top: 5vh;
`;

const PrevButton = styled.div`
    font-family: Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, Helvetica Neue, Segoe UI, Apple SD Gothic Neo, Noto Sans KR, Malgun Gothic, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, sans-serif !important;
    letter-spacing: 0 !important;
    -webkit-font-smoothing: antialiased !important;
    word-break: keep-all !important;
    color: #117ce9;
    line-height: 30px;
    font-weight: 600;
    
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.8vw;
    padding: 9px 30px 9px 26px;
`;
const NextButton = styled.div`
    font-family: Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, Helvetica Neue, Segoe UI, Apple SD Gothic Neo, Noto Sans KR, Malgun Gothic, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, sans-serif !important;
    letter-spacing: 0 !important;
    -webkit-font-smoothing: antialiased !important;
    word-break: keep-all !important;
    line-height: 30px;
    font-weight: 600;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.9vw;

    background: #e7e7e7;
    color: #aaa;
    -webkit-tap-highlight-color: rgba(255, 255, 255, .1) !important;
    border-radius: 6px;
    padding: 9px 26px 9px 30px;
    margin-right: 8px;
`;

const Icon = styled.img<{type: string}>`
    width: 0.8rem;
    height: 0.8rem;
    object-fit: contain;
    
    ${props => props.type === "prev" ?css`
        filter: invert(50%) sepia(82%) saturate(5981%) hue-rotate(197deg) brightness(99%) contrast(87%);
    ` : css`
        filter: invert(71%) sepia(0%) saturate(0%) hue-rotate(356deg) brightness(95%) contrast(93%);
    `}
`;

const RegisterInfoPage = () => {
    const queryClient = useQueryClient();
    if (queryClient.getQueryData(["registerEmail"]) === undefined) {
        queryClient.setQueryData(["registerEmail"], "");
    }
    const [registerInfo, setRegisterInfo] = useState({
        email: queryClient.getQueryData(["registerEmail"]) as string,
        username: "",
        password: "",
        passwordCheck: "",
        passwordValid: true,
    })


    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRegisterInfo(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    useEffect(() => {
        if (registerInfo.password === "" || registerInfo.passwordCheck === "") {
            setRegisterInfo((prev) => ({...prev, passwordValid: true}));
            registerInfo.passwordValid = true;
            return;
        }
        setRegisterInfo((prev) => ({...prev, passwordValid: registerInfo.password === registerInfo.passwordCheck}));
    }, [registerInfo.password, registerInfo.passwordCheck]);

    return (<>
        <Header />
        <MainContainer>
            <CardContainer width={69}>
                <TitleText>로그인 정보를 입력해주세요.</TitleText>
                <SubText>입력하신 정보 회원님의 계정이 생성됩니다.</SubText>
                <RegisterInfoForm>
                    <InputForm>
                        <InputTitle>아이디</InputTitle>
                        <Input placeholder="아이디로 사용할 이메일 주소를 입력해 주십시오."
                               value={registerInfo.email}
                               name="email"
                               onChange={handleInputChange}
                               onKeyDown={() => {}} />
                    </InputForm>
                    <InputForm>
                        <InputTitle>닉네임</InputTitle>
                        <Input placeholder="닉네임으로 사용할 이름을 입력해 주십시오."
                               value={registerInfo.email}
                               name="username"
                               onChange={handleInputChange}
                               onKeyDown={() => {}} />
                    </InputForm>
                    <InputForm>
                        <InputTitle>비밀번호</InputTitle>
                        <Input placeholder="비밀번호를 입력해 주십시오."
                               value={registerInfo.password}
                               name="password"
                               onChange={handleInputChange}
                               onKeyDown={() => {}} />
                    </InputForm>
                    <InputForm>
                        <InputTitle>비밀번호 확인</InputTitle>
                        <Input placeholder="비밀번호를 다시 입력해 주십시오."
                               value={registerInfo.passwordCheck}
                               name="passwordCheck"
                               onChange={handleInputChange}
                               warning={!registerInfo.passwordValid ? "비밀번호와 비밀번호 확인이 일치하지 않습니다." : undefined}
                               onKeyDown={() => {}} />
                    </InputForm>
                </RegisterInfoForm>
                <CardBottomContainer>
                    <PrevButton>
                        <Icon src={prevIcon} alt="prev" type="prev"/>
                        이전
                    </PrevButton>
                    <NextButton>
                        다음
                        <Icon src={nextIcon} alt="next" type="next"/>
                    </NextButton>
                </CardBottomContainer>
            </CardContainer>
        </MainContainer>
    </>);
}

export default RegisterInfoPage;