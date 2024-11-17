import styled from "styled-components";
import React from "react";
import checkboxOn from "../assets/images/checkbox3-on.svg"

interface CheckButtonProps {
    isChecked: boolean;
    content: string;
    toggleHandler?: () => void;
}

const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-right: auto;
    gap: 0.6vw;
`;

const CheckInput = styled.input`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 4px;
    border: 1px solid #AAA;
    background: #FFF;
    cursor: pointer;
    outline: 0;
    width: 17px;
    height: 17px;

    margin: 0;
    padding: 0;

    &:checked {
        background: #117ce9 url(${checkboxOn}) no-repeat center;
        border: none;
    }
`;

const CheckButtonContent = styled.span`
    color: #222;

    font-family: "Pretendard Variable", serif;
    font-size: 0.938rem;
    font-style: normal;
    font-weight: 400;
    line-height: 30px;
`;

const CheckButton: React.FC<CheckButtonProps> = (props) => {
    return (<MainContainer>
        <CheckInput type="checkbox"
                    checked={props.isChecked}
                    onClick={props.toggleHandler === null || props.toggleHandler === undefined ? undefined : props.toggleHandler} />
        <CheckButtonContent>{props.content}</CheckButtonContent>
    </MainContainer>);
};

export default CheckButton;