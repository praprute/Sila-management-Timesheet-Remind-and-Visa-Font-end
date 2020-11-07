import React, { useState, useEffect } from 'react';
import 'date-fns'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DateFnsUtils from '@date-io/date-fns';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import './StyleModalTimesheet.css'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import Moment from 'moment'
import { DateRange } from '@material-ui/icons';
import { isAuthenticated } from '../auth/apiAuth'
import MenuItem from '@material-ui/core/MenuItem';
import { API, GOOGLE_API_KEY } from './../../config';
import Alert from '@material-ui/lab/Alert';
import 'date-fns';
import { Redirect, useHistory } from 'react-router-dom'

const FormDialog = props => {
    const useStyles = makeStyles((theme) => ({
        font: {
            color: 'rgb(27,36,48)'
        }
    }));

    const classes = useStyles();
    const history = useHistory();
    const { openPopup, setOpenPopup } = props;
    const [values, setValues] = useState({
        idReminder: props.dataEdit,
        date: props.dateEdit,
        description: props.descriptionEdit,
        error: "",
        loading: false,
        successloading: false,
        redirectToReferrer: false,
    })

    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');

    const user = isAuthenticated() && isAuthenticated().user;
    const token = isAuthenticated() && isAuthenticated().token;

    const { idReminder, description, successloading, error, redirectToReferrer } = values;

    const [notidate, setDate] = React.useState(Moment(new Date()).format('YYYY-MM-DD'));
    const [notidate1, setDate1] = React.useState(Moment(new Date()).format('YYYY-MM-DD'));
    const [notidate2, setDate2] = React.useState(Moment(new Date()).format('YYYY-MM-DD'));
    const [notidate3, setDate3] = React.useState(Moment(new Date()).format('YYYY-MM-DD'));

    const handleDateChange = (date) => {
        const noti = Moment(date).format('YYYY-MM-DD')
        const noti1 = Moment(date).add(1, 'month').format('YYYY-MM-DD')
        const noti2 = Moment(date).add(2, 'month').format('YYYY-MM-DD')
        const noti3 = Moment(date).add(3, 'month').format('YYYY-MM-DD')
        setDate(noti);
        setDate1(noti1);
        setDate2(noti2);
        setDate3(noti3);
    };

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    useEffect(() => {
        setDate(props.dateEdit)
        setValues({
            ...values,
            idReminder: props.dataEdit,
            date: props.dateEdit,
            description: props.descriptionEdit
        })
    }, [props]);


    const onChangeImage = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }


    const loading = (load) => {
        if (load) {
            return (<Alert variant="outlined" severity="info">
                This is an info alert — check it out!
            </Alert>)
        } else {

        }
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, loading: true })
        let formData = new FormData();
        formData.append('file', file)
        formData.append('idReminder', values.idReminder)
        formData.append('idUserRemind', user.idusers)
        formData.append('notidate', notidate)
        formData.append('description', values.description)
        formData.append('notidate1', notidate1)
        formData.append('notidate2', notidate2)
        formData.append('notidate3', notidate3)
        axios.post(`${API}/updateRemind`,
            formData,
            {
                headers: {
                    "Content-Type": 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                if (response) {
                    setValues({ ...values, loading: false, redirectToReferrer: true })
                    setOpenPopup(false)
                    window.location.reload(true);
                }
            })
    }

    return (
        <div
            {...props}>
            <Dialog open={openPopup} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Reminder </DialogTitle>
                {loading(values.loading)}
                <DialogContent>
                    <Grid container spacing={18} component="main">

                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                id="image"
                                label={filename}
                                disabled
                                fullWidth
                                onChange={handleChange('client')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <label htmlFor="upload-photo">
                                <input
                                    style={{ display: 'none' }}
                                    id="upload-photo"
                                    name="upload-photo"
                                    type="file"
                                    onChange={onChangeImage}
                                />
                                <Button
                                    variant="contained"
                                    color="default"
                                    className={classes.button}
                                    startIcon={<CloudUploadIcon />}
                                    fullWidth
                                    // type="file"
                                    component="span"
                                >
                                    Upload Image
                                </Button>
                            </label>
                        </Grid>

                        <Grid item xs={12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Date"
                                    format="dd/MM/yyyy"
                                    value={notidate}
                                    fullWidth
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <TextField
                            margin="dense"
                            id="name"
                            label="descriptions"
                            multiline
                            rows={4}
                            type="text"
                            fullWidth
                            value={description}
                            onChange={handleChange('description')}
                        />

                    </Grid>

                </DialogContent>
                <DialogActions>

                    <Button onClick={() => { setOpenPopup(false) }} className={classes.font}>
                        Cancel
          </Button>
                    <Button onClick={onSubmit} className={classes.font}>
                        Subscribe
            </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default FormDialog;