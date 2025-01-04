import {style} from "@vanilla-extract/css";

export const InputStyle = style({
    width: '96%',
    padding: '1.7vh 0 1.7vh 1.6vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',

    alignSelf: 'stretch',

    color: "#666",

    fontFamily: "Pretendard Variable",
    fontSize: "1rem",
    fontWeight: 400,

    borderRadius: "6px",
    border: "1px solid #CCC",
    background: "FFF"
});

export const WarningInputStyle = style([InputStyle, {
    border: "2px solid #F84d3A"
}]);

export const WarningMessageStyle = style({
    width: "100%",
    padding: "0",
    fontFamily: "Pretendard Variable",
    fontSize: "13px",
    fontWeight: 400,
    lineHeight: "1.54",
    color: "#F84D3A"
})