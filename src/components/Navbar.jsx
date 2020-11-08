import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import grey from '@material-ui/core/colors/grey';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './StyleNav.css'
import { signout } from '../page/auth/apiAuth'
import { isAuthenticated } from '../page/auth/apiAuth'
import { Redirect, withRouter, Link, useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  Nav: {
    background: 'rgb(27,36,48)',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    background: 'rgb(27,36,48)',
    flexShrink: 0,
    width: 250,
    fontSize: 14,
    color: '#FFFFFF',
  },
  fullList: {
    background: 'rgb(27,36,48)',
    width: 'auto',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    background: 'rgb(27,36,48)',

  },
}));

const ButtonAppBar = ({
  title = "Management System",
  className,
  children,
  history }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [state, setState] = React.useState({
    left: false
  });

  const user  = isAuthenticated() && isAuthenticated().user;
  const token = isAuthenticated() && isAuthenticated().token;


  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const ClickSignout = () => {
    signout().then(response => {
      if (response.error) {
        alert(response.error)
      } else {
        console.log(response.data.success)
      }
    })
  }

  const linkTotimeSheet = () => {
    if(user){
       if(user.role == 0){
      history.push('/officer')
    }else{
      history.push('/main')
    }
    }
  }
  const linkToReminder = () => {
    if(user){
      if(user.role == 0){
        history.push('/reminder')
      }else{
        history.push('/remindAdmin')
      }
    }
    
  }
  const linkToVisa = () => {
    if(user){
      if(user.role == 0){
        history.push('/visa')
      }else{
        history.push('/visaAdmin')
      }
    }
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={classes.toolbar}>
        <ListItemText primary={"Sila App"} style={{ color: grey[50], marginLeft: '10%' }} />
        <IconButton style={{ color: grey[50] }} onClick={toggleDrawer(anchor, false)}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>

      <List onClick={linkTotimeSheet}>
        <ListItem button>
          <ListItemIcon>
            <AccessTimeIcon onClick={linkTotimeSheet} style={{ color: grey[50] }} />
          </ListItemIcon>
          <ListItemText primary={"Time Stamp"} onClick={linkTotimeSheet} style={{ color: grey[50] }} />
        </ListItem>
      </List>

      <List onClick={linkToReminder}>
        <ListItem button>
          <ListItemIcon>
            <DateRangeIcon onClick={linkToReminder} style={{ color: grey[50] }} />
          </ListItemIcon>
          <ListItemText primary={"reminder"} onClick={linkToReminder} style={{ color: grey[50] }} />
        </ListItem>
      </List>
      
   
      <List onClick={linkToVisa}>
        <ListItem button>
          <ListItemIcon>
            <FlightTakeoffIcon onClick={linkToVisa}  style={{ color: grey[50] }} />
          </ListItemIcon>
          <ListItemText onClick={linkToVisa}  primary={"visa & work permit"} style={{ color: grey[50] }} />
        </ListItem>
      </List>
      <List>
      <ListItem button
        component={Link} onClick={() => signout(() => {
          history.push('/')
        })} to="/"
        >
          <ListItemIcon  >
            <ExitToAppIcon style={{ color: grey[50] }}/>
          </ListItemIcon>
          <Link style={{
            textDecoration: 'none',
            color: grey[50],
            cursor: 'pointer'
          }} onClick={() => signout(() => {
            history.push('/')
          })} primary={"Signout"} to="/">
            Signout
            </Link>
          {/* <ListItemText primary={"Signout"} style={{ color: grey[50] }} /> */}
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static" className={classes.Nav}>
        <Toolbar>

          <IconButton id="burgerIcon" onClick={toggleDrawer('left', true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon >
            </MenuIcon>
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>

          <Button id="navitem" onClick={linkTotimeSheet} color="inherit">Time Sheet</Button>
          <Button id="navitem" onClick={linkToReminder}  color="inherit">reminder</Button>
          <Button id="navitem" onClick={linkToVisa}      color="inherit">visa &amp; work permit</Button>
          <Button id="navitem" color="inherit">
            <Link style={{
              textDecoration: 'none',
              color: "#FFFF",
              cursor: 'default'
            }} onClick={() => signout(() => {
              history.push('/')
            })} to="/">
              Signout
              </Link>
          </Button>
        </Toolbar>
        <SwipeableDrawer
          anchor={'left'}
          open={state['left']}
          onClose={toggleDrawer('left', false)}
          onOpen={toggleDrawer('left', true)}
        >
          {list('left')}
        </SwipeableDrawer>
      </AppBar>
      <div className={className}>{children}</div>
    </div>
  );
}

export default withRouter(ButtonAppBar)