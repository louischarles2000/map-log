
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { List, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Avatar, Collapse } from '@material-ui/core';
import { ChevronLeft, ChevronRight, ExpandLess, ExpandMore, ExitToAppRounded } from '@material-ui/icons';

import { toggleDrawer, signOutAction, showPopupHandler, updateViewport } from '../../store/actions/entries';

import logo from './logo.png';

let drawerWidth = 360;

if(window.innerWidth < 700){
  drawerWidth = 260;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: '#292929'
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#292929'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0,3),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const UserInfo = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { user, entries, openDrawer } = useSelector(state => state.entriesState);
  const dispatch = useDispatch();
  // const [collapse, setCollapse] = React.useState(false);
  const [values, setValues] = React.useState({
    collapseUser: false,
    entriesCollapse: true
  });

  const handleValueChange = (name, value) => {
    setValues(() => ({
      ...values,
      [name]: value
    }));
  };

  const logOut = () => {
    dispatch(signOutAction());
  }

  const showPost = entry => {
    const view = {
      longitude: entry.longitude,
      latitude: entry.latitude
    }
    dispatch(toggleDrawer(openDrawer));
    dispatch(updateViewport(view));
    dispatch(showPopupHandler({[entry._id]: true}));
  }

  return(
      <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={openDrawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      {/* HEADER */}
      <List>
        <ListItem button={false}>
          <ListItemIcon><img alt="TravelLog" src={logo} style={{ width: 30, height: 30 }} /></ListItemIcon>
          <ListItemText primary={<Typography variant="h6">MapLogs</Typography>} />
          <IconButton onClick={() => dispatch(toggleDrawer(openDrawer))}>
            {theme.direction === 'ltr' ? <ChevronLeft color="primary"/> : <ChevronRight />}
          </IconButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {/* USER */}
        <ListItem button onClick={() => handleValueChange('collapseUser', !values.collapseUser)}>
          <ListItemText primary={user.name} secondary={user.email}/>
          {values.collapseUser ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={values.collapseUser} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested} onClick={logOut}>
              <ListItemIcon><ExitToAppRounded color="secondary"/></ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItem>
          </List>
        </Collapse>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => handleValueChange('entriesCollapse', !values.entriesCollapse)}>
          <ListItemText primary="Previous Travels" secondary={entries.length + ' Travel(s)'}/>
          {values.entriesCollapse ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={values.entriesCollapse} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
          {entries.map(entry => (
            <ListItem key={entry._id} button className={classes.nested} onClick={() => showPost(entry)}>
              <Avatar src={entry.image} alt={entry.title} />
              <ListItemText secondary={entry.title} style={{ marginLeft: 10, color: '#000' }}/>
            </ListItem>
          ))}
          </List>
        </Collapse>
      </List>
    </Drawer>

  );
}

export default UserInfo;