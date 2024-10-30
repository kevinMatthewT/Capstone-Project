import { Box, useTheme, Button, TextField, IconButton, Typography, FormControlLabel} from '@mui/material';
import React, {useState, useEffect} from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";

function ResetPass() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }
  
  //Input Error
    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
      setChecked(event.target.checked);
    };

  //Set Value/login
  const [email, setEmail] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate("");

  /*Pass Reset */
  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/");
  })

  return (
    <div className="app">
      <main className="content">
          <Box textAlign="center" width="350px" alignItems="center" justifyContent="center" m="0 auto" mt="30px" height="250px" padding="20px"
           sx={{backgroundColor: "#edf5fc", borderRadius: "16px",
           border:4 , borderColor: 'black'}}>
              <Typography variant='h2' sx={{color: '#335bb3'}}>Welcome! </Typography>
              <Box>
                <p>
                <TextField 
                id='standard-basic' 
                label="Email" 
                variant='standard' 
                fullWidth 
                size='small'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                />
                </p> 

                <p>
                  <Button fullWidth variant='contained' sx={{color: "335bb3", marginTop:"5px"}} type='submit'
                  onClick={() => sendPasswordReset(email)}>
                    Reset Password
                  </Button>
                </p>
                <p>
                  <Typography variant='h6' sx={{color: '#335BB3'}}>
                    Already have an account?
                    <Link  to='/login' style={{color: "#335BB3"}}>
                     Login 
                    </Link>
                     here.
                  </Typography>
                </p>

              </Box>
        </Box>
      </main>
    </div>
  )
};

export default ResetPass;