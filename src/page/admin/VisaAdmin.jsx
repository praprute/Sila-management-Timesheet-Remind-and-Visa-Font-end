import React, {Component, useEffect, useState } from 'react'
import MiniDrawer from '../../components/Layoust'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { isAuthenticated } from '../auth/apiAuth'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TableVisa from './TableVisaAdmin'
import ButtonAppBar from './../../components/Navbar'
import './styleTimesheetadmin.css'

const VisaAdmin = props => {

    const useStyles = makeStyles((theme) => ({
        root: {
            // height: '100vh',
            height: '100%',
            width: '100%',
            backgroundColor: 'rgb(247,249,252)',
            // backgroundColor: 'red',
            padding: theme.spacing(5),
            flexGrow: 1,
        },
        rootCard: {
            padding: theme.spacing(3),
            minWidth: '50%',
            marginTop: 20,
            marginBottom: 10,
            marginLeft: 10,
            marginRight: 10

        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 5,
        },
        content: {
            flexGrow: 1,
            backgroundColor: 'rgb(247,249,252)',
            // padding: theme.spacing(3),
          },
    }));
    const classes = useStyles();

    const [values, setValues] = useState({
        some: "",
        error: "",
        loading: false,
        redirectToReferrer: false,
    })

    const { loading, error, redirectToReferrer } = values;

    const user = isAuthenticated() && isAuthenticated().user;
    const token = isAuthenticated() && isAuthenticated().token;

    useEffect(() => {
    });

    const indexVisa = () => {
        return (
            <Grid id="row-card1" container className={classes.content} spacing={18} component="main">
                <Grid item md={6} sm={12} xs={12} spacing={0} >
                    <Card id="card" className={classes.rootCard} >
                        <CardContent>
                            <Typography className={classes.title} variant="h4" component="h2" color="textSecondary" gutterBottom>
                                User Information
</Typography>
                            <Typography variant="body2" component="p">
                                
                                {"User name : " + user.name}
                                <br />
                                {"User email: " + user.email}
                                <br />
                                {"User Login: " + "Success"}
                                <br />
                                {"User Login Id: " + user.idusers}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={6} sm={12} xs={12} spacing={0} >
                    <Card id="card" className={classes.rootCard}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Visa Admin
</Typography>
                            <Typography className={classes.pos} color="textSecondary">

                                Fill out your work information here.
</Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" >Click Here</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item md={12} sm={12} xs={12} style={{ width: '100%', overflowX: 'scroll' }}>
                    <TableVisa />
                </Grid>
            </Grid>
        )
    }

    const CheckRole = () => {
        if (user) {
            if (user.role == 1) {
                return (
                    <div>
                        <div id="miniDrawer">
                            <MiniDrawer
                            
                            title={"Hi " + user.name}
                            className="TimeSheetAdmin"
                        >
                            {indexVisa()}
                        </MiniDrawer>
                        </div>
                        <div id="navbar">
                            <ButtonAppBar
                            
                        title={"Hi " + user.name}
                        className="TimeSheetAdmin">
                            {indexVisa()}
                        </ButtonAppBar>
                        </div>

                        
                    </div>

                )
            } else {
                return (
                    <Redirect to="/visa" />
                )
            }
        } else {
            return (
                <Redirect to="/" />
            )
        }

    }
    return (
        <div>
            {CheckRole()}
        </div>

    )

}
export default VisaAdmin;