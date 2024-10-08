import { addChildren, Child, Parent } from '../../reducer';
import { Box, CircularProgress, Collapse, Grid, TextField, Tooltip, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ButtonAction, MenuBox } from './ParrentsCard.styles';
import { useEffect, useRef, useState } from 'react';
import { store } from '../../store';
import { useAppSelector } from '../../hooks';
import ChildCard from '../ChildCard/ChildCard';

interface ParrentsCardProps {
    parent: Parent
}

function ParrentsCard({ parent }: ParrentsCardProps) {
    const [childName, setChildName] = useState('')
    const childs = useAppSelector((state) => state.todoReducer.children.filter((el) => el.parentId === parent.id));

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

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true)
        store.dispatch(addChildren({
            id: Date.now() + '-' + Math.floor(Math.random() * 1000000),
            name: childName,
            parentId: parent.id
        }))
        setMenu(false)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }

    return (
        <Grid container p={2} sx={{ border: `2px solid grey`, borderRadius: '20px', position: 'relative', flexDirection: 'column' }}>
            <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h4' children={parent.title} />
                <Tooltip title={'Add child'} placement='top'>
                    <MoreVertIcon sx={{ cursor: 'pointer' }} onClick={() => setMenu((pre) => !pre)} />
                </Tooltip>
                {menu &&
                    <MenuBox ref={menuRef} >
                        <Box component='form' onSubmit={handleSubmit} >
                            <Grid container gap={1}>
                                <Typography children="child name" color="black" />
                                <TextField
                                    type="string"
                                    required
                                    fullWidth
                                    onChange={((e) => setChildName(e.target.value))}
                                />
                            </Grid>
                            <ButtonAction type="submit" variant='contained'>
                                <Typography children="Add child" />
                            </ButtonAction>
                        </Box>
                    </MenuBox>
                }
            </Grid>
            {loading ? (
                <Grid container alignItems='center' justifyContent='center'>
                    <CircularProgress color="secondary" sx={{ width: '100%', display: 'flex', alignItems: 'center' }} />
                </Grid>
            ) : (

                <Collapse in={childs.length > 0} sx={{ margin: '20px 40px' }}>
                    {childs.map((el) => <ChildCard key={el.id} el={el} />)}
                </Collapse>

            )}
        </Grid>
    );
}

export default ParrentsCard;