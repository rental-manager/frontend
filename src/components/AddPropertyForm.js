import React from 'react';
import styled from 'styled-components';

import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core';

import {addProperty} from '../actions/propertyActions';

// Form Components 

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

const styles = {
    container: {
        display: 'flex',
        flexFlow: 'column nowrap',
        padding: '5%',
        height: '50vh',
    },
    formField: {
        margin: '10px 0px',
    },
    formButton: {
        margin: '10px 0px',
    }

}

class AddPropertyForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            addModal: false,
            property_name: '',
            address: '',
            img_url: null,
            cleaner_id: null,
            guest_guide: null,
            assistant_guide: null,
        }
    }

    handleInput = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();

        const property = {
            property_name: this.state.property_name,
            address: this.state.address,
            img_url: this.state.img_url,
            cleaner_id: this.state.cleaner_id,
            guest_guide: this.state.guest_guide,
            assistant_guide: this.state.assistant_guide,
        }

        this.props.addProperty(property);
        this.props.close();
    }

    render(){
        const {classes} = this.props;
        return (
            <div>
                <form onSubmit = {this.handleSubmit} className = {classes.container} noValidate autoComplete='off'>
                <Typography variant  = 'h4' textAlign = 'center'>Add a New Property</Typography>

                <TextField className = {classes.formField} id='standard-dense' label = 'Property Name' value = {this.state.property_name} onChange={this.handleInput('property_name')}/>
                <TextField className = {classes.formField} id='standard-dense' label = 'Address' value = {this.state.address} onChange = {this.handleInput('address')} />
                <Button className = {classes.formButton} variant = 'outlined' color = 'primary' type='submit'>Submit</Button>
                </form>

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
    addProperty,
    
})(withStyles(styles)(AddPropertyForm)));