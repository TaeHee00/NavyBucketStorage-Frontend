import React from "react";
import {CheckButtonContentStyle, CheckButtonStyle, CheckInputStyle} from "./css/CheckButton.css";

interface CheckButtonProps {
    isChecked: boolean;
    content: string;
    toggleHandler?: () => void;
}

const CheckButton: React.FC<CheckButtonProps> = (props) => {
    return (<div className={CheckButtonStyle}>
        <input className={CheckInputStyle} type="checkbox"
                    defaultChecked={props.isChecked}
                    onClick={props.toggleHandler === null || props.toggleHandler === undefined ? undefined : props.toggleHandler} />
        <span className={CheckButtonContentStyle}>{props.content}</span>
    </div>);
};

export default CheckButton;