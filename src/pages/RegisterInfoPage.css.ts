import { style } from '@vanilla-extract/css';

export const MainContainerStyle = style({
    display: 'flex',
    height: '76vh',
    padding: '10vh 0',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    background: '#F6F7F8',
});

export const RegisterInfoFormStyle = style({
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1.2vh',
    gap: '2vh',
});

export const InputFormStyle = style({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2vh',
});

export const InputTitleStyle = style({
    fontSize: '1rem',
    lineHeight: 1.88,
    fontWeight: 600,
    letterSpacing: 'normal',
});

export const CardBottomContainerStyle = style({
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '5vh',
});

export const SubTextStyle = style({
    fontFamily: "Pretendard Variable",
    letterSpacing: "0",
    fontSmooth: 'antialiased',
    wordBreak: "keep-all",

    marginTop: "-1.5vh",
    marginBottom: "1.5vh",
});

export const PrevButtonStyle = style({
    fontFamily: "Pretendard Variable",
    letterSpacing: "0",
    fontSmooth: 'antialiased',
    wordBreak: "keep-all",
    color: "#117CE9",
    lineHeight: "30px",

    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    gap: "0.8vw",
    padding: "9px 30px 9px 26px",

    cursor: "pointer",
});

export const NextButtonStyle = style({
    fontFamily: "Pretendard Variable",
    letterSpacing: "0",
    fontSmooth: 'antialiased',
    wordBreak: "keep-all",
    lineHeight: "30px",
    fontWeight: "600",

    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    gap: "0.9vw",
    borderRadius: "6px",
    padding: "9px 26px 9px 30px",
    marginRight: "8px",

    backgroundColor: "#E7E7E7",
    color: "#AAA",
});
export const ActiveNextButtonStyle = style([NextButtonStyle, {
    backgroundColor: "#117CE9",
    color: "#FFF",
}]);
const baseIconStyle = style({
    width: '0.8rem',
    height: '0.8rem',
    objectFit: 'contain',
});
export const IconPrevStyle = style([
    baseIconStyle,
    {
        filter: 'invert(50%) sepia(82%) saturate(5981%) hue-rotate(197deg) brightness(99%) contrast(87%)',
    }
]);
export const IconNextStyle = style([
    baseIconStyle,
    {
        filter: 'invert(71%) sepia(0%) saturate(0%) hue-rotate(356deg) brightness(95%) contrast(93%)',
    }
]);
export const IconActiveStyle = style([
    baseIconStyle,
    {
        filter: 'invert(100%) sepia(0%) saturate(2%) hue-rotate(122deg) brightness(111%) contrast(101%)',
    }
]);