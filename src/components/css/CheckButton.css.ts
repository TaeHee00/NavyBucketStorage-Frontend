import {style} from "@vanilla-extract/css";
// import checkboxOn from "../../assets/images/checkbox3-on.svg";

export const CheckButtonStyle = style({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "auto",
    gap: "0.6vw"
});
export const CheckInputStyle = style({
    appearance: "none",
    borderRadius: "4px",
    border: "1px solid #AAA",
    background: "#FFF",
    cursor: "pointer",
    outline: "0",
    width: "17px",
    height: "17px",

    margin: "0",
    padding: "0",

    // selectors: {
    //     '&:checked': {
    //         background: `#117ce9 url(${checkboxOn}) no-repeat center`,
    //         border: 'none'
    //     }
    // }
});
export const CheckButtonContentStyle = style({
    color: "#222",

    fontFamily: "Pretendard Variable",
    fontSize: "0.938rem",
    fontWeight: "400",
    lineHeight: "30px",
});