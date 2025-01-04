import { style, styleVariants } from '@vanilla-extract/css';

export const BucketCardContainerStyle = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '#c6c6cd 1px solid',
    borderRadius: '15px',
    padding: '2%',
    margin: '4% 6%',
});

export const CardTitleStyle = style({
    fontFamily: '"Pretendard Variable", serif',
    fontSize: '19px',
    fontStyle: 'normal',
    fontWeight: 600,
});

export const ActiveBucketCountStyle = style({
    color: '#636365',
});

export const BucketToolContainerStyle = style({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
});

export const ToolListStyle = style({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.5rem',
    whiteSpace: 'nowrap',
    marginRight: '7vw',
});

export const ToolButtonStyle = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '#1260fd 2px solid',
    borderRadius: '30px',
    padding: '2% 5%',
    height: '1.5rem',
    color: '#1260fd',
    fontFamily: '"Pretendard Variable", serif',
    fontSize: '15px',
    fontStyle: 'normal',
    fontWeight: 600,
});

export const RefreshIconStyle = style({
    width: '1.5rem',
    height: '1.5rem',
    objectFit: 'contain',
    filter: 'invert(37%) sepia(82%) saturate(6713%) hue-rotate(219deg) brightness(101%) contrast(98%)',
});

export const BucketTableStyle = style({
    width: '100%',
    textAlign: 'left',
    marginTop: '2.5%',
    borderCollapse: 'collapse',
});

export const TableRowStyle = styleVariants({
    // default: {
    //     // selectors: {
    //     //     '& th': {
    //     //         position: 'relative',
    //     //         paddingRight: '20px',
    //     //     },
    //     //     '& th:not(:last-child)::after': {
    //     //         content: '"|"',
    //     //         position: 'absolute',
    //     //         right: '8px',
    //     //         bottom: '3.5px',
    //     //         color: '#8d8d8f',
    //     //     },
    //     },
    // },
    // // spacer: {},
});

export const TableBodyStyle = style({
    borderTop: '#c6c6cd 1px solid',
    borderSpacing: '0 10px',
});

export const CheckBoxStyle = style({
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
    background: '#fff',
    borderRadius: '100%',
    cursor: 'pointer',
    height: '1rem',
    width: '1rem',
    outline: 0,
    border: '2px solid #bebfc5',
    margin: 0,
    padding: 0,
    verticalAlign: 'middle',

    // selectors: {
    //     '&:checked': {
    //         background: '#2d76ff',
    //         border: 'none',
    //         position: 'relative',
    //     },
    //     '&:checked::after': {
    //         content: '""',
    //         position: 'absolute',
    //         top: '50%',
    //         left: '50%',
    //         transform: 'translate(-50%, -50%)',
    //         width: '0.5rem',
    //         height: '0.5rem',
    //         background: 'white',
    //         borderRadius: '50%',
    //     }
    // }
});

const baseBucketContainerStyle = style({
    // selectors: {
    //     '& td': {
    //         padding: '10px',
    //         fontFamily: '"Pretendard Variable", serif',
    //         fontSize: '15px',
    //         fontStyle: 'normal',
    //         fontWeight: 600,
    //     }
    // }
});

export const BucketContainerStyle = styleVariants({
    unchecked: [baseBucketContainerStyle],
    checked: [
        baseBucketContainerStyle,
        {
            outline: '2px solid #006ce0',
            borderRadius: '10px',
            background: '#f0fbff',
        }
    ]
});
