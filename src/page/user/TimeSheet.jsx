import React, { Component, useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom'
import { isAuthenticated } from '../auth/apiAuth'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonAppBar from '../../components/Navbar';
import FormDialog from './ModalTimeSheet'
import './styleTimeSheet.css'
import TableUser from './Table'

const TimeSheetUser = props => {

    const useStyles = makeStyles((theme) => ({
        root: {
            // height: '100vh',
            height: '100%',
            backgroundColor: '#F7F9FC',
            // paddingTop: 15,
            flexGrow: 1
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
    }));
    const classes = useStyles();

    const [values, setValues] = useState({
        some: "",
        error: "",
        loading: false,
        redirectToReferrer: false,
    })

    const [openPopup, setOpenPopup] = useState(false)

    const openInPopup = () => {
        setOpenPopup(true)
    }

    const { loading, error, redirectToReferrer } = values;

    const user  = isAuthenticated() && isAuthenticated().user;
    const token = isAuthenticated() && isAuthenticated().token;

    const loguser = () => {
        console.log('usersssssssss')
        console.log(user.role)
        console.log(token)
    }
    useEffect(() => {
    });

    const CheckRole = () => {
    
        if (user) {
            if (user.role == 0) {
                return (
                    <div className={classes.root}>
                        <   ButtonAppBar
                            title={"Sila App : Time Stamp "}
                            className="TimeSheetUser"
                        >
                            <Grid id="row-card1" container spacing={18} component="main">
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
                                                TIME SHEET
        </Typography>
                                            <Typography className={classes.pos} color="textSecondary">

                                                Fill out your work information here.
        </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" onClick={openInPopup}>Click Here</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item xs={12}>
                                        <TableUser />
                                   
                                </Grid>
                            </Grid>
                        </ButtonAppBar>

                        <FormDialog openPopup={openPopup}
                            setOpenPopup={setOpenPopup} />
                    </div>
                )
            } else {
                return (
                    <Redirect to="/main" />
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
export default TimeSheetUser;