import React, { useState, useEffect } from 'react'
import '@material-ui/core'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DateRangeIcon from '@material-ui/icons/DateRange';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import grey from '@material-ui/core/colors/grey';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Title } from '@material-ui/icons';
import { signout } from './../page/auth/apiAuth'
import { Redirect, withRouter, Link } from 'react-router-dom'
import { createHashHistory } from 'history';
import { isAuthenticated } from '../page/auth/apiAuth'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: 'rgb(27,36,48)',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    background: 'rgb(27,36,48)',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: 'rgb(27,36,48)',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    background: 'rgb(27,36,48)',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const MiniDrawer = ({
  title = "Maagement System",
  className,
  children,
  history
}, props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const user  = isAuthenticated() && isAuthenticated().user;
  const token = isAuthenticated() && isAuthenticated().token;

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
    history.push('/main')
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >

        <div className={classes.toolbar}>
          <ListItemText primary={"Sila App"} style={{ color: grey[50], marginLeft: '10%' }} />
          <IconButton style={{ color: grey[50] }} onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>

        <Divider />

        <List onClick={linkTotimeSheet}>
          <ListItem button>
            <ListItemIcon>
              <AccessTimeIcon style={{ color: grey[50] }} />
            </ListItemIcon>
            <ListItemText primary={"Time Stamp"} style={{ color: grey[50] }} />
          </ListItem>
        </List>

        <List onClick={linkToReminder}>
          <ListItem button>
            <ListItemIcon>
              <DateRangeIcon style={{ color: grey[50] }} />
            </ListItemIcon>
            <ListItemText primary={"reminder"} style={{ color: grey[50] }} />
          </ListItem>
        </List>

        <List onClick={linkToVisa}>
          <ListItem button>
            <ListItemIcon>
              <FlightTakeoffIcon style={{ color: grey[50] }} />
            </ListItemIcon>
            <ListItemText primary={"visa & work permit"} style={{ color: grey[50] }} />
          </ListItem>
        </List>
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

      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={className}>{children}</div>
      </main>
    </div>
  );
}
export default withRouter(MiniDrawer)