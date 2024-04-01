import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import
{
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Alert,
  Snackbar,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

import { ApiService } from '../Service';

export const VerifyCode = () =>
{
  const { email } = useParams();
  const [userInput, setUserInput] = useState({email: email, code: '',});
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const onVerifyCodeHandler = async() =>
  {
    try
    {
      const response = await ApiService.post('/api/verify-code/', userInput);
      if (response)
      {
        setIsVerified(true);
      } 
      setTimeout(() => navigate(`/login`), 2000);
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
        {'Verify Code'}
        </Typography>
        <Box component={'form'} noValidate sx={{ mt: 1 }}>
          <TextField margin={'normal'}
                     required
                     fullWidth
                     name={'code'}
                     label={'code'}
                     type={'code'}
                     onChange={(e) => setUserInput({...userInput, code: e.target.value})}
                     id={'code'} />
          <Button onClick={onVerifyCodeHandler}
                  fullWidth
                  variant={'contained'}
                  sx={{ mt: 3, mb: 2 }} >
              {'Verify'}
          </Button>
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
      <Snackbar open={isVerified ? true : false}
                autoHideDuration={6000}
                onClose={()=> setIsVerified(false)}
                anchorOrigin={{'horizontal': 'center', 'vertical': 'top'}}>
        <Alert
          onClose={() => setIsVerified(false)}
          severity={'success'}
          variant="filled"
          sx={{ width: '100%' }}>
          {'You have successfully verified your user !!'}
        </Alert>
      </Snackbar>
    </Container>
  );
};