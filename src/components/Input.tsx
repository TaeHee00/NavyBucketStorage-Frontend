import React from "react";
import {InputStyle, WarningInputStyle, WarningMessageStyle} from "./css/Input.css";

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

const Input : React.FC<InputProps> = (props) => {

    return <div className={props.warning !== undefined ? InputStyle : WarningInputStyle}>
        <input placeholder={props.placeholder}
                       value={props.value}
                       name={props.name}
                       type={props.name === "password" || props.name === "passwordCheck" ? "password" : "text"}
                       onChange={props.onChange}
                       onKeyDown={props.onKeyDown}/>
        {props.warning !== undefined && props.warning !== null ? (
            <span className={WarningMessageStyle}>{props.warning}</span>
        ) : undefined}
    </div>;
};

export default Input;