import React, { Component, useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { API } from './../../config'
import { Redirect } from 'react-router-dom'
import { Signin, authenticate, isAuthenticated } from './apiAuth'

const SignInSide = props => {
    const useStyles = makeStyles((theme) => ({
        root: {
            height: '100vh',
        },
        image: {
            backgroundImage: `url(${require('./../../img/sideSignin.jpg')})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor:
                theme.palette.type === 'dark' ? theme.palette.grey[50] : theme.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
        paper: {
            margin: theme.spacing(10, 4),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        logo: {
            margin: theme.spacing(1)
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));

    const [values, setValues] = useState({
        email: "",
        password: "",
        token: "",
        error: "",
        loading: false,
        redirectToReferrer: false,
    })

    const { email, password, loading, error, redirectToReferrer } = values;

    const user = isAuthenticated() && isAuthenticated().user;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    useEffect(() => {
        autoLogin()
    }, []);

    const autoLogin = () => {
        if (user) {
            setValues({
                ...values,
                redirectToReferrer: true
            });
        }
    }

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        Signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false });
                } else {
                    if (data.success == "success") {
                        authenticate(data, () => {
                            setValues({
                                ...values,
                                redirectToReferrer: true
                            });
                        })
                        // console.log(user)
                    } else {
                        setValues({ ...values, error: data.message_th, loading: false });
                        // console.log(data.message_th)
                    }
                }
            });
    }

    const showError = () => (
        <Alert style={{ display: error ? "" : "none", width: '100%' }} severity="error">
            {error}
        </Alert>
    )

    const classes = useStyles();

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user) {
                return (
                    <Redirect to="/main" />
                )
            } else {
                return (
                    <Redirect to="/" />
                )
            }
        } else {
            return (
                <Grid container component="main" className={classes.root}>
                    <CssBaseline />
                    <Grid item xs={false} sm={4} md={7} style={{
                        backgroundImage: `url(${require('./../../img/sideSignin.jpg')})`,
                        backgroundRepeat: 'no-repeat',
                        // backgroundColor:
                        //     theme.palette.type === 'dark' ? theme.palette.grey[50] : theme.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}>
                        {/* <div className="leftBackground">
                            <img src={require('./../../img/sideSignin.jpg')} />
                        </div> */}
                    </Grid>
                    <Grid item xs={12} sm={8} md={5} justify="center" component={Paper} elevation={6} square>
                        <div className={classes.paper}>
                            <div className={classes.logo}>
                                <img src={require('./../../img/sila-logo.png')} />
                            </div>
                            <Typography component="h1" variant="h5">
                                Sign in
                    </Typography>
                            {showError()}
                            {/* {JSON.stringify(user)}
                            {JSON.stringify(redirectToReferrer)} */}
                            <form className={classes.form} noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={handleChange('email')}
                                    value={email}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={handleChange('password')}
                                    value={password}
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={clickSubmit}
                                >
                                    Sign In
              </Button>
                                <Grid container>
                                    <Grid item xs>
                                        {API}
                                        {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                                    </Grid>
                                    <Grid item>
                                        <Link href="#" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Box mt={5}>

                                    {/* <Copyright /> */}
                                </Box>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            )
        }
    }
    return (
        <div>
            {redirectUser()}
        </div>
    )

}
export default SignInSide
