import React, { Component , useState, useEffect} from 'react'
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
import FormDialog from './ModalVisa'
import TableVisa from './TableVisa'

const Visa = props => {

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
    }))
    const classes = useStyles();
    const user  = isAuthenticated() && isAuthenticated().user;
    const token = isAuthenticated() && isAuthenticated().token;

    useEffect(() => {
    });

    const [openPopup, setOpenPopup] = useState(false)

    const openInPopup = () => {
        setOpenPopup(true)
    }

    const CheckRole = () => {
        if (user) {
            if (user.role == 0) {
                return (
                    <div className={classes.root}>
                        <   ButtonAppBar
                            title={"Sila App : Visa and Workpermit " }
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
                                             Visa and Workpermit
        </Typography>
                                            <Typography className={classes.pos} color="textSecondary">

                                                Fill out your work information here.
        </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" onClick={openInPopup} >Click Here</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                {/* <Grid item xs={12}>
                                        <TableUser />
                                  
                                </Grid> */}
                                <Grid item xs={12}>
                                <TableVisa/>
                                </Grid>

                                {/* <Grid item xs={12}>
                                    <img src="https://reminder-app.nyc3.digitaloceanspaces.com/Thu%20Nov%2005%202020%2005%3A13%3A30%20GMT%2B0700%20%28GMT%2B07%3A00%294rlskrgsglwsdhgksjfgsjlhwirlgishlfhlfhlrthleirlgl5y983094702424qrhgjg34jg-340jgr-u478o.jpg?AWSAccessKeyId=KGWERP32XXOI7XLIXW7H&Expires=1604531596&Signature=5wfGLNhulZ3r%2BfQ2Cb9PUBJnfbM%3D"/>
                                </Grid> */}
                            </Grid>
                        </ButtonAppBar>

                        <FormDialog openPopup={openPopup}
                            setOpenPopup={setOpenPopup} />
                    </div>
                )
            } else {
                return (
                    <Redirect to="/visaAdmin" />
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
export default Visa