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

export const RegisterFormContainerStyle = style({
    width: '100%',
    margin: '2.5vh 0 0',
});

export const RegisterButtonStyle = style({
    width: '99%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    borderRadius: '6px',
    background: '#117CE9',
    color: '#FFF',
    textAlign: 'center',
    fontFamily: '"Pretendard Variable", serif',
    fontSize: '1rem',
    fontStyle: 'normal',
    fontWeight: 700,
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

export const LoginRouteContainerStyle = style({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    fontSize: '15px',
    lineHeight: 1.6,
    verticalAlign: 'middle',
    color: '#222',
    fontFamily: '"Pretendard Variable", serif',
    fontStyle: 'normal',
    fontWeight: 500,
    marginTop: '10vh',
    whiteSpace: 'nowrap',
    // selectors: {
    //     '& a': {
    //         textDecoration: 'none',
    //         marginLeft: '1%',
    //     },
    // },
});

export const LoginRouteTextStyle = style({
    fontSize: '15px',
    fontWeight: 600,
    lineHeight: 2,
    color: '#117ce9',
    textDecoration: 'none',
    verticalAlign: 'middle',
    transition: 'all 0.2s ease',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
});
