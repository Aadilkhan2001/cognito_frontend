import { useNavigate } from 'react-router-dom';

import
{
  AppBar,
  Box,
  Toolbar,
  Button,
  Card,
  Typography,
  CardContent,
}from '@mui/material';

export const  Home = () =>
{
  const token = window.localStorage.getItem('access_token');
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position={'static'}>
        <Toolbar>
          <Button color={'inherit'} onClick={()=> navigate('/sign-up')}>Signup</Button>
          <Button color={'inherit'} onClick={()=> token ? window.localStorage.clear() : navigate('/login')}>{token ? 'Logout' : 'Login'}</Button>
        </Toolbar>
      </AppBar>
      <Card sx={{ minWidth: 275, marginTop: 4 }}>
      <CardContent>
        {
         token
         ? <Typography sx={{ fontSize: 20 }} gutterBottom>
            You are logged in and this is your Token : 
            <br />
            {token}
            </Typography>
         : <Typography sx={{ fontSize: 20 }} gutterBottom>
            You are not logged in yet!!. Please login first.
           </Typography>
        }        
      </CardContent>
    </Card>
    </Box>
  );
}