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
  const [travelTime, setTravelTime] = useState(new Date());
  const [endTravelTime, setEndTravelTime] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [finishTime, setFinishTime] = useState(new Date());
  const [values, setValues] = useState({
    place: "",
    client: "",
    clientCode: "",
    description: "",
    expenses: "",
    cost: "",
    partner: "",
    status: "",
    lattitude: "",
    longtitude: "",
    error: "",
    loading: false,
    successloading: false,
    redirectToReferrer: false,
  })
  const [location, setLocation] = useState({
    lat: "",
    long: "",
  })
  const [listlocation, setlistlocation] = useState([])
  const [Partner, setPartner] = useState([])
  const user = isAuthenticated() && isAuthenticated().user;
  const token = isAuthenticated() && isAuthenticated().token;
  const { getplace, lat, long } = location;
  const { place, client, clientCode, description, expenses,
    cost, partner, status, lattitude, longtitude,  successloading, error, redirectToReferrer } = values;
  const fetchPartner = () => {
    axios.post(`${API}/fetchpartner`, {}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      setPartner(response.data.message)
    })
  }
  const editIndex = props.dataEdit
  const [dataEdit, setDataEdit] = useState({ editIndex });

  const getLocation = () => {
    if (openPopup) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getCoordinate, handleLocationError , {
          enableHighAccuracy:true,
          timeout:5000
        })
      } else {
        alert("ไม่สามารถเช็คอินกับ browser นี้ได้")
      }
    }
  }

  const getCoordinate = (position) => {
    setLocation({ ...location, lat: position.coords.latitude, long: position.coords.longitude })
    getPlace(position.coords.latitude, position.coords.longitude)
    console.log(position)
  }

  const list = []

  const getPlace = (x, y) => {
    setValues({ loading: true, successloading: false })
    axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${x},${y}&sensor=false&key=${GOOGLE_API_KEY}`, {

      })
      .then(response => {
        for (var i = 0; i < response.data.results.length; i++) {
          list.push({
            value: response.data.results[i].formatted_address,
            label: response.data.results[i].formatted_address
          })
        }
        setlistlocation(list)
        setValues({ loading: false, successloading: true })
      })
  }

  const lodingCheckin = (loading, success) => {
    if (loading) {
      return (<Alert severity="info">loading place, Checkin Again please</Alert>)
    } else {

    }
    if (success) {
      return (<Alert severity="success">Select Your Place</Alert>)
    } else {

    }
  }

  const handleLocationError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.")
        break;
    }
  }

  const handleTravelTime = (date) => {
    var dateTrans = Moment(date).format('YYYY-MM-DD HH:mm:ss')
    setTravelTime(dateTrans);
  };

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }
 

  useEffect(() => {
    getLocation()
    fetchPartner()
    // console.log(dataSet.idworks)
  }, []);

  const handleEndTravelTime = (date) => {
    date = Moment(date).format('YYYY-MM-DD HH:mm:ss')
    setEndTravelTime(date);
  };
  const handleStartTime = (date) => {
    date = Moment(date).format('YYYY-MM-DD HH:mm:ss')
    setStartTime(date);
  };
  const handleFinishTime = (date) => {
    date = Moment(date).format('YYYY-MM-DD HH:mm:ss')
    setFinishTime(date);
  };

  const submitIndex = event => {
    event.preventDefault();
    axios.post(`${API}/insertWork`, {
      idUser: user.idusers,
      status: values.status,
      TravelTime: travelTime,
      EndTravelTime: endTravelTime,
      StartTime: startTime,
      FinishTime: finishTime,
      partner: values.partner,
      description: values.description,
      expenses: values.expenses,
      cost: values.cost,
      location: values.place,
      x: location.lat,
      y: location.long,
      client: values.client,
      clientcode: values.clientCode
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      setOpenPopup(false)
      history.push("/")
    })
  }

  return (
    <div
      {...props}>

      <Dialog open={openPopup} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Time Sheet</DialogTitle>
        <DialogContent>
          <Grid container spacing={18} component="main">
            <Grid item xs={12}>
              {lodingCheckin(values.loading, values.successloading)}
              <TextField
                id="standard-select-currency"
                select
                label="Select"
                value={place}
                fullWidth
                onChange={handleChange('place')}
              >
                {listlocation.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item style={{ marginTop: "1rem" }} xs={12}>

              <Button onClick={getLocation} fullWidth variant="contained" color="secondary">
                Checkin
              </Button>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="เวลาออกเดินทาง"
                  value={travelTime}
                  onChange={handleTravelTime}
                  fullWidth
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="เวลาที่ถึง"
                  value={endTravelTime}
                  onChange={handleEndTravelTime}
                  fullWidth
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="เวลาเริ่มงาน"
                  value={startTime}
                  onChange={handleStartTime}
                  fullWidth
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="เวลางานเสร็จสิ้น"
                  value={finishTime}
                  onChange={handleFinishTime}
                  fullWidth
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <TextField

                margin="dense"
                id="name"
                label="ชื่อลูกความ"
                type="text"
                fullWidth
                value={client}
                onChange={handleChange('client')}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <TextField

                margin="dense"
                id="name"
                label="รหัสลูกความ"
                type="text"
                fullWidth
                value={clientCode}
                onChange={handleChange('clientCode')}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <TextField

                margin="dense"
                id="name"
                label="ค่าเดินทาง"
                type="text"
                fullWidth
                value={expenses}
                onChange={handleChange('expenses')}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <TextField

                margin="dense"
                id="name"
                label="ค่าใช้จ่าย"
                type="text"
                fullWidth
                value={cost}
                onChange={handleChange('cost')}
              />
            </Grid>
            <TextField
              margin="dense"
              id="name"
              label="สถานะ"
              type="text"
              fullWidth
              value={status}
              onChange={handleChange('status')}
            />
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
            <TextField
              margin="dense"
              select
              id="name"
              label="Partner"
              type="text"
              fullWidth
              value={partner}
              onChange={handleChange('partner')}
            >
              {Partner.map((option) => (
                <MenuItem key={option.name} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>

          </Grid>
          {/* {JSON.stringify(props.dataEdit.idworks)} */}
          {/* <TextField
                id="standard-select-currency"
                select
                label="Select"
                value={place}
                fullWidth
                onChange={handleChange('place')}
              >
                {Partner.map((option) => (
                  <MenuItem key={option.name} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField> */}

          {/* {JSON.stringify(Partner)}
              {JSON.stringify(listlocation)} */}

          {/* {JSON.stringify(values)}
          {JSON.stringify(travelTime)}
          {JSON.stringify(endTravelTime)}
          {JSON.stringify(startTime)}
          {JSON.stringify(finishTime)}
          {JSON.stringify(location)} */}

        </DialogContent>
        <DialogActions>

          <Button onClick={() => { setOpenPopup(false) }} className={classes.font}>
            Cancel
          </Button>
          <Button onClick={submitIndex} className={classes.font}>
            Subscribe
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormDialog;