import React from "react"
import styled from "styled-components";
import logo from "../assets/images/logo.png";

const MainContainer = styled.div`
    display: flex;
    height: 100%;
    padding: 2.5% 11% 1%;
`;

const LogoContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    justify-content: left;
    align-items: center;
`;

const MainText = styled.span`
    display: flex;
    flex-direction: column;
    justify-content: center;

    color: #222;
    font-family: "Pretendard Variable", serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    letter-spacing: 0.42px;
`;

const SubText = styled.span`
    display: flex;
    flex-direction: column;
    justify-content: center;
    white-space: nowrap;

    color: #222;
    font-family: "Pretendard Variable", serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.56px;
`;
const LogoImg = styled.img`
    width: 30.698px;
    height: 30px;
    margin-right: 7.6px;
`;
const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const LoginPage: React.FC = () => {
    return (<MainContainer>
        <LogoContainer>
            <LogoImg src={logo}/>
            <TextContainer>
                <MainText>NAVY</MainText>
                <SubText>CLOUD PLATFORM</SubText>
            </TextContainer>
        </LogoContainer>
    </MainContainer>)
}

export default LoginPage;