import styled, {css} from "styled-components";
import React from "react";
import {useQueryClient} from "@tanstack/react-query";

interface InputProps {
    placeholder: string;
    value: string;
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    warning?: string;
}

export enum LoginErrorType {
    USER_NOT_FOUND = "존재하지 않는 사용자입니다.",
    INVALID_PASSWORD = "비밀번호가 올바르지 않습니다. 다시 확인해 주세요.",
}

const InputContainer = styled.input<{$warning: boolean}>`
    width: 96%;
    padding: 1.7vh 0 1.7vh 1.6vw;
    display: flex;
    justify-content: center;
    align-items: flex-start;

    align-self: stretch;

    color: #666;

    font-family: "Pretendard Variable", serif;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    border-radius: 6px;
    border: 1px solid #CCC;
    background: #FFF;

    ${(props) => {
        if (props.$warning) {
            return css`
                border: 2px solid #f84d3a;
            `;
        } 
    }}
`;

const WarningMessage = styled.span`
    width: 100%;
    padding: 0;
    font-family: "Pretendard Variable", serif;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.54;
    color: #f84d3a;
    //margin-top: 8px;
`;

const Input : React.FC<InputProps> = (props) => {
    return <>
        <InputContainer placeholder={props.placeholder}
                       value={props.value}
                       name={props.name}
                       type={props.name === "password" || props.name === "passwordCheck" ? "password" : "text"}
                       onChange={props.onChange}
                       onKeyDown={props.onKeyDown}
                       $warning={props.warning !== undefined}/>
        {props.warning !== undefined && props.warning !== null ? (
            <WarningMessage>{props.warning}</WarningMessage>
        ) : undefined}
    </>;
};

export default Input;