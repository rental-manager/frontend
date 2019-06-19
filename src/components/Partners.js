// React
import React from 'react';
// Redux
import { connect } from 'react-redux';
// Router
import { withRouter } from 'react-router-dom';
// Axios
import axios from 'axios';
//Material-UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core';

//Actions
import { getPartners, getUserProperties, sendInvite } from '../actions';

//Component
import PartnerCard from './PartnerCard';

const styles = {
	card: {
		maxWidth: 600,
		margin: '20px auto'
	},
	invite: {
		maxWidth: 600,
		margin: '20px auto'
	},
	img: {
		width: 40
	},
	content: {
		display: 'flex'
	},
	contentTypography: {
		margin: 'auto'
	}
};

class Partners extends React.Component {

	componentDidMount() {
		if(!localStorage.getItem('jwt')){
			this.props.history.replace('/');
		}
		
		if(!this.props.properties){
			this.props.getUserProperties();
		}
		if(!this.props.cleaners){
			this.props.getPartners();
		}
		
		if(!this.props.partners){
			this.props.getUserProperties();
			this.props.getPartners();
		}	
	}


	componentDidUpdate(prevProps) {
		if(this.props.refreshProperties !== prevProps.refreshProperties){
			this.props.getUserProperties();
			this.props.getPartners();
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			partners: this.props.cleaners,
			email: ''
		};
	}



	handleInputChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleSubmit = event => {
		console.log(this.state.email);

		this.props.sendInvite(this.state.email);

		this.setState({
			email: ''
		})

	}

	render() {
		const { classes } = this.props;
		return (
			<div>
				<Typography variant="h2">Partners</Typography>
				{this.props.cleaners ? (
					this.props.cleaners.map(partner => {
						return <PartnerCard partner={partner} key={partner.user_id} />;
					})
				) : (
					<Typography variant="overline">
						No partners have been invited yet.
					</Typography>
				)}
				<div className={classes.invite}>
					<Typography variant="h5">
						{' '}
						Send an invite to add more partners!{' '}
					</Typography>
					<TextField
						value={this.state.email}
						onChange={this.handleInputChange}
						placeholder="Partner's Email"
						type="text"
						name="email"
					/>
					<Button type="submit" onClick={this.handleSubmit}>
						Send Invite
					</Button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		// state items
		properties: state.propertyReducer.properties,
		cleaners: state.propertyReducer.partners,
		refreshCleaners: state.propertyReducer.refreshCleaners,
		refreshProperties: state.propertyReducer.refreshProperties
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		{
			// actions
			getPartners,
			getUserProperties,
			sendInvite,
		}
	)(withStyles(styles)(Partners))
);
