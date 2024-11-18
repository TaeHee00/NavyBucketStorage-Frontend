import styled from "styled-components";
import React from "react";

interface InputProps {
    placeholder: string;
    value: string;
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputContainer = styled.input`
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
`;

const Input : React.FC<InputProps> = (props) => {
    return <InputContainer placeholder={props.placeholder}
                           value={props.value}
                           name={props.name}
                           type={props.name === "password" ? props.name : "text"}
                           onChange={props.onChange}
                           onKeyDown={props.onKeyDown} />;
};

export default Input;