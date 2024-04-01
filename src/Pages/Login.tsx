import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import
{
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
  Snackbar,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

import { ApiService } from '../Service';

export const Login = () =>
{
  const [userInput, setUserInput] = useState({email: '', password: ''});
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  const onLoginHandler = async() =>
  {
    try
    {
      const response = await ApiService.post('/api/login/', userInput);
      console.log(response);
      setToken(response.AuthenticationResult.AccessToken);
      console.log(response)
      window.localStorage.setItem('access_token', response.AuthenticationResult.AccessToken);
      setTimeout(() => navigate('/'), 2000);
    }
    catch(e)
    {
      setErrorMessage(String(e));
    }
  }

  return (
    <Container component={'main'} maxWidth={'xs'}>
      <CssBaseline />
      <Box sx={{marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlined />
        </Avatar>
        <Typography component={'h1'} variant={'h5'}>
        {'Sign in'}
        </Typography>
        <Box component={'form'} noValidate sx={{ mt: 1 }}>
          <TextField margin={'normal'}
                      required
                      fullWidth
                      id={'email'}
                      label={'Email Address'}
                      name={'email'}
                      value={userInput.email}
                      autoComplete={'email'}
                      autoFocus
                      onChange={(e) => setUserInput({...userInput, email: e.target.value})} />
          <TextField margin={'normal'}
                      required
                      fullWidth
                      name={'password'}
                      label={'Password'}
                      value={userInput.password}
                      type={'password'}
                      id={'password'}
                      autoComplete={'current-password'}
                      onChange={(e) => setUserInput({...userInput, password: e.target.value})} />
          <Button type={'button'}
                  fullWidth
                  onClick={onLoginHandler}
                  variant={'contained'}
                  sx={{ mt: 3, mb: 2 }} >
              {'Sign In'}
          </Button>
          <Grid container>
              <Grid item>
              <Link to={'/sign-up'}>
                  {"Don't have an account? Sign Up"}
              </Link>
              </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar open={errorMessage ? true : false}
                autoHideDuration={6000}
                onClose={()=> setErrorMessage(undefined)}
                anchorOrigin={{'horizontal': 'center', 'vertical': 'top'}}>
        <Alert
          onClose={() => setErrorMessage(undefined)}
          severity={'error'}
          variant="filled"
          sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={errorMessage ? true : false}
                autoHideDuration={6000}
                onClose={()=> setErrorMessage(undefined)}
                anchorOrigin={{'horizontal': 'center', 'vertical': 'top'}}>
        <Alert
          onClose={() => setErrorMessage(undefined)}
          severity={'error'}
          variant="filled"
          sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={token ? true : false}
                autoHideDuration={6000}
                onClose={()=> setToken(undefined)}
                anchorOrigin={{'horizontal': 'center', 'vertical': 'top'}}>
        <Alert
          onClose={() => setToken(undefined)}
          severity={'success'}
          variant="filled"
          sx={{ width: '100%' }}>
          {'You have successfully logged in !!'}
        </Alert>
      </Snackbar>
    </Container>
    
  );
};