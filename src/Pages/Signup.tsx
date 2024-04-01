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

export const Signup = () =>
{
  const [userInput, setUserInput] = useState({email: '', password: '', name: ''});
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const onSignupHandler = async() =>
  {
    try
    {
      const response = await ApiService.post('/api/signup/', userInput);
      if (response)
      {
        setIsRegister(true);
      } 
      setTimeout(() => navigate(`/verify-code/${userInput.email}`), 2000);
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
        {'Sign Up'}
        </Typography>
        <Box component={'form'} noValidate sx={{ mt: 1 }}>
          <TextField margin={'normal'}
                     required
                     fullWidth
                     id={'name'}
                     label={'Name'}
                     value={userInput.name}
                     name={'name'}
                     autoComplete={'name'}
                     onChange={(e) => setUserInput({...userInput, name: e.target.value})}
                     autoFocus />
          <TextField margin={'normal'}
                     required
                     fullWidth
                     id={'email'}
                     label={'Email Address'}
                     name={'email'}
                     value={userInput.email}
                     onChange={(e) => setUserInput({...userInput, email: e.target.value})}
                     autoComplete={'email'}
                     autoFocus />
          <TextField margin={'normal'}
                     required
                     fullWidth
                     name={'password'}
                     label={'Password'}
                     type={'password'}
                     id={'password'}
                     value={userInput.password}
                     onChange={(e) => setUserInput({...userInput, password: e.target.value})}
                     autoComplete={'current-password'} />
          <Button onClick={onSignupHandler}
                  fullWidth
                  variant={'contained'}
                  sx={{ mt: 3, mb: 2 }} >
              {'Sign Up'}
          </Button>
          <Grid container>
              <Grid item>
              <Link to={'/login'}>
                  {"Already have an account? Log In"}
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
      <Snackbar open={isRegister ? true : false}
                autoHideDuration={6000}
                onClose={()=> setIsRegister(false)}
                anchorOrigin={{'horizontal': 'center', 'vertical': 'top'}}>
        <Alert
          onClose={() => setIsRegister(false)}
          severity={'success'}
          variant="filled"
          sx={{ width: '100%' }}>
          {'You have successfully Register !!'}
        </Alert>
      </Snackbar>
    </Container>
  );
};