import './App.css';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { addParrent, Parent } from './reducer';
import ParrentsCard from './Components/ParrentsCard/ParrentsCard';
import { ButtonAction } from './Components/ParrentsCard/ParrentsCard.styles';
import { store } from './store';
import { useMemo, useState } from 'react';
import { useAppSelector } from './hooks';

function App() {
  const parents = useAppSelector((state) => state.todoReducer.parents);

  const [parentTitle, setParentTitle] = useState('');

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    store.dispatch(addParrent({
      id: Date.now() + '-' + Math.floor(Math.random() * 1000000),
      title: parentTitle,
    }));
    setParentTitle('')
  }
  
const AppMemo = useMemo(() => {
  return (
    <Grid container justifyContent='center' p={4} gap={2}>
      <Typography variant='h4' children='Parent list' />

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: '20px', alignContent: 'center', width: '100%', justifyContent: 'center' }}>
        <Typography children="parrent title" color="black" />
        <TextField
          type="string"
          required
          value={parentTitle}
          onChange={(e) => setParentTitle(e.target.value)}
        />
        <ButtonAction type="submit" variant='contained' sx={{ marginTop: '0' }}>
          <Typography children="Add parrent" />
        </ButtonAction>
      </Box>

      <Grid container flexDirection='column' gap={2}>
        {parents.length > 0 ?
          parents.map((el: Parent) => <ParrentsCard key={el.id} parent={el} />)
          : <Typography variant='h6' children='Empty list' />}
      </Grid>
    </Grid>
  );
}, [parents, parentTitle])
  return AppMemo;
}

export default App;
