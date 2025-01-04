import {style} from "@vanilla-extract/css";

export const MainContainerStyle = style({
    display: 'flex',
    height: '100%',
    padding: '2.5% 11% 1%',
});

export const LogoContainerStyle = style({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'left',
    alignItems: 'center',
});

export const MainTextStyle = style({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: '#222',
    fontFamily: '"Pretendard Variable", serif',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 900,
    lineHeight: 'normal',
    letterSpacing: '0.42px',
});

export const SubTextStyle = style({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    color: '#222',
    fontFamily: '"Pretendard Variable", serif',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
    letterSpacing: '-0.56px',
});

export const LogoImgStyle = style({
    width: '30.698px',
    height: '30px',
    marginRight: '7.6px',
});

export const TextContainerStyle = style({
    display: 'flex',
    flexDirection: 'column',
});