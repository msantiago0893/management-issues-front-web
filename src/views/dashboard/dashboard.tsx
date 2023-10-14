import { Card, CardContent, Typography, Grid, Paper } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { issueByIdClosed, issueByIdConsult, issueByIdInsert, issueByIdOpen } from '../../redux/asyncThunk/dashboard.thunk';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const totalConsulted = useAppSelector((state) => state.dashboard.totalConsult);
  const totalInserted = useAppSelector((state) => state.dashboard.totalInsert);
  const totalResolved = useAppSelector((state) => state.dashboard.totalResolved);
  const totalOpen = useAppSelector((state) => state.dashboard.totalOpen);

  useEffect(() => {
    dispatch(issueByIdConsult());
    dispatch(issueByIdInsert());
    dispatch(issueByIdOpen());
    dispatch(issueByIdClosed());
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Movimientos del Día
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">Consultados</Typography>
              <Typography variant="h4">{totalConsulted}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">Insertados</Typography>
              <Typography variant="h4">{totalInserted}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">Resueltos</Typography>
              <Typography variant="h4">{totalResolved}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">Abiertos</Typography>
              <Typography variant="h4">{totalOpen}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
