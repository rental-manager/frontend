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

const styles = {
    root: {
        flexGrow: 1,
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
}
class Navigation extends React.Component {
    
    constructor(props){
        super(props);
        

        this.state = {
            // nav state, to handle search inputs, modals, etc
            top: false,
            left: false,
            bottom: false,
            right: false,
        };

        this.toggleDrawer = (side, open) => () => {
            this.setState({
                [side]: open,
            })
        }
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
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
            ))}

            </List>
            <Divider />

            <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
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
                        {pathRoute}
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