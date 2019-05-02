import React from 'react';

// Main Navbar
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// Side Drawer
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';

import Auth from './Auth';

const auth = new Auth();

const styles = {
    root: {
        flexGrow: 1,
        padding: 0,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    drawer: {
        zIndex: 0,
    },

    appBar: {
        zIndex: 10,
    },
    list: {
        width: 250,
        margin: '60px 0px',
    },
    loginBtn: {
        background: '#1b5e20',
        color: 'white',
    },
    logoutBtn: {
        background: '#b71c1c',
        color: 'white',
    }
}
class Navigation extends React.Component {

    componentDidMount(){
        // modify this to check central state's isloggedin once backend is deployed
        if(localStorage.getItem('jwt')){
            this.setState({
                isLoggedIn: true,
            });
        }
    }
    
    constructor(props){
        super(props);
        

        this.state = {
            // nav state, to handle search inputs, modals, etc
            top: false,
            left: false,
            bottom: false,
            right: false,
            isLoggedIn: false,
        };

        this.toggleDrawer = (side, open) => () => {
            this.setState({
                [side]: open,
            })
        }
    }

    handleLogin = event => {
        event.preventDefault();
        auth.login();
    }

    handleLogout = event => {
        event.preventDefault();
        auth.logout();
        this.props.history.replace('/');
    }

    render(){
        const {classes} = this.props;

        // changes the listed path in the navbar depending on the current component being rendered
        let pathName = this.props.location.pathname.split('/');
        let pathRoute;

        if(pathName[1] !== ''){
            pathRoute = pathName[1].charAt(0).toUpperCase() + pathName[1].slice(1);
        } else {
            pathRoute = 'Home';
        }

        const sideMenu = (
            <div className = {classes.list}>
            <List>
            {['Home', 'Properties', 'Partners', 'Guests', 'Reports'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
            ))}

            </List>
            <Divider />

            <List>
          {['Account'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>


            </div>
        )

        return (
            <div className = {classes.root}>
                <AppBar position='fixed' className = {classes.appBar}>
                    <Toolbar>
                        <IconButton color = 'inherit' aria-label='Menu' onClick = {this.toggleDrawer('left', !this.state.left)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant = 'h6' color = 'inherit' className = {classes.grow}>
                        {pathRoute}
                        </Typography>

                        {/* CONDITIONALLY RENDER LOGIN/LOGOUT BASED ON JWT PRESENCE */}
                        {!this.state.isLoggedIn ? 
                        <Button variant = 'contained' className = {classes.loginBtn} onClick = {this.handleLogin}>Login</Button>
                        :
                        <Button variant = 'contained' className = {classes.logoutBtn} onClick = {this.handleLogout}>Logout</Button>
                        }

                    </Toolbar>
                </AppBar>

                    <SwipeableDrawer className = {classes.drawer} open = {this.state.left} onClose = {this.toggleDrawer('left', false)} onOpen = {this.toggleDrawer('left', true)}>                
                    <div tabIndex={0} role='button' onClick = {this.toggleDrawer('left', false)} onKeyDown={this.toggleDrawer('left', false)}>
                    {sideMenu}
                    </div>
                    </SwipeableDrawer>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        // state items
    }
}

export default withRouter(connect(mapStateToProps, {
    // actions
    
})(withStyles(styles)(Navigation)));