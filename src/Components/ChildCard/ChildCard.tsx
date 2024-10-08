import { deleteChildren, Child } from '../../reducer';
import { CircularProgress, Grid, MenuItem, Tooltip, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useEffect, useRef, useState } from 'react';
import { store } from '../../store';

import { MenuBox } from '../ParrentsCard/ParrentsCard.styles';

interface ChildCardProps {
    el: Child
}

function ChildCard({ el }: ChildCardProps) {
    const [menu, setMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState(false);

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current?.contains(event.target as Node)) {
            setMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    function handleDelete(e: any) {
        e.preventDefault();
        setLoading(true)
        store.dispatch(deleteChildren(el.id))
        setMenu(false)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }

    return (
        <>
            {
                loading ?
                    <Grid container alignItems='center' justifyContent='center'>
                        < CircularProgress color="secondary" sx={{ width: '100%', display: 'flex', alignItems: 'center' }} />
                    </Grid >
                    :
                    <Grid container mt={1} p={2} sx={{ border: `2px solid grey`, borderRadius: '20px', position: 'relative', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant='h4' children={el.name} color='black'/>
                        <Tooltip title={'Add child'} placement='top'>
                            <MoreVertIcon sx={{ cursor: 'pointer' }} onClick={() => setMenu((pre) => !pre)} />
                        </Tooltip>
                        {menu &&
                            <MenuBox ref={menuRef}>
                                <MenuItem onClick={handleDelete} children={'Delete child'} />
                            </MenuBox>
                        }
                    </Grid>}
        </>)
    
}

export default ChildCard;