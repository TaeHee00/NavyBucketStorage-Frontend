import {style, styleVariants, createVar} from "@vanilla-extract/css";

export const MainContainerStyle = style({
    display: 'flex',
    height: "76vh",
    padding: "10vh 0",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    background: "#F6F7F8",
});
export const TitleTextStyle = style({
    color: '#222',
    marginBottom: '4.167vh',
    fontFamily: '"Pretendard Variable", serif',
    fontSize: '1.688rem',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '30px',
    whiteSpace: 'nowrap',
});

export const LoginTypeContainerStyle = style({
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.83vw',
});
export const CheckIconStyle = style({
    width: '16px',
    height: '16px',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '8px',
});

export const LoginFormStyle = style({
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1.2vh',
    gap: '1.2vh',
});

export const LoginButtonStyle = style({
    display: 'flex',
    padding: '0 21vw',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    background: '#117CE9',
    color: '#FFF',
    textAlign: 'center',
    fontFamily: '"Pretendard Variable", serif',
    fontSize: '1rem',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '48px',
    border: 'none',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginTop: '4vh',

    ':hover': {
        transition: 'all 0.2s ease',
        background: '#0F70D2',
    },
});

export const BottomContainerStyle = style({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
});

export const RegisterButtonStyle = style({
    color: '#117CE9',
    marginTop: 'auto',
    fontFamily: '"Pretendard Variable", serif',
    fontSize: '0.938rem',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '30px',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
});

export const FindContainerStyle = style({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2vw',
    marginTop: '4vh',
});

export const FindButtonStyle = style({
    color: '#222',
    fontFamily: '"Pretendard Variable", serif',
    fontSize: '0.938rem',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '28px',
    cursor: 'pointer',
});

export const HrStyle = style({
    width: '100%',
    border: '1px solid #EDEDED',
    marginTop: '6vh',
});

const cardWidth = createVar();

const baseCardStyle = style({
    display: 'flex',
    padding: '6.42vh 5.125vw',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: '20px',
    background: '#FFF',
    boxShadow: '0 1px 23px 0 rgba(0, 0, 0, 0.05)',
    width: cardWidth, // CSS 변수 사용
});

export const CardContainerStyle = styleVariants({
    default: [baseCardStyle],
    withWidth: [
        baseCardStyle,
        {
            vars: {
                [cardWidth]: `var(--card-width)`, // 컴포넌트에서 설정할 CSS 변수
            },
        },
    ],
});

export const LoginTypeButtonStyle = style({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',

    padding: "0.75vh 0",
    whiteSpace: 'nowrap',
    cursor: 'pointer',

    borderRadius: '6px',

    fontFamily: '"Pretendard Variable", serif',
    fontSize: '0.938rem',
    fontWeight: 600,
    lineHeight: '30px',

    border: 'none',
    background: "#F0F0F0",
    color: "#444",

    transition: 'all 0.2s ease',

    ':hover': {
        transition: 'all 0.2s ease',
        background: '#d8d8d8',
    },
});
export const ActiveLoginTypeButtonStyle = style([LoginTypeButtonStyle, {
    border: "2px solid #117CE9",
    background: "rgba(17, 124, 233, 0.14)",
    color: "#117CE9",
}]);