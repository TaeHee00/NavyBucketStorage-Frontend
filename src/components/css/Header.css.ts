import {style} from "@vanilla-extract/css";

export const HeaderStyle = style({
    display: "flex",
    height: "100%",
    padding: "1% 2.5% 1%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
});
export const LogoContainerStyle = style({
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    justifyContent: "left",
    alignItems: "center",
});
export const MainTextStyle = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    color: "#222",
    fontFamily: "Pretendard Variable",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "900",
    lineHeight: "normal",
    letterSpacing: "0.42px"
});
export const SubTextStyle = style({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    whiteSpace: "nowrap",

    color: "#222",
    fontFamily: "Pretendard Variable",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
    letterSpacing: "-0.56px"
});
export const LogoStyle = style({
    width: "30.698px",
    height: "30px",
    marginRight: "7.6px"
});
export const TextContainerStyle = style({
    display: "flex",
    flexDirection: "column",
});
export const UserStyle = style({
    fontFamily: "Pretendard Variable",
    fontSize: "15px",
    fontWeight: "600",
    marginRight: "0.5%",
});