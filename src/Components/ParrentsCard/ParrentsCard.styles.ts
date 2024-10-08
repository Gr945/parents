import { Box, Button, styled } from "@mui/material";

export const MenuBox = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    padding: '8px 12px',
    gap: '8px',
    borderRadius: '8px',
    border: `1px solid black`,
    position: 'absolute',
    top: 0,
    right: 0,
    background: 'white',
    zIndex: 1000
}));

export const ButtonAction = styled(Button)(() => ({
    gap: '10px',
    marginTop: '20px',
    background: '#474646FF',
    borderRadius: '30px',
    padding: '16px',
    '&:hover': {
        background: '#E6E6E6FF',
    },
}));