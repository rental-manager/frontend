// React
import React from 'react';
// Redux
import {connect} from 'react-redux';
// Router
import {withRouter} from 'react-router-dom';
// Axios
import axios from 'axios';
//Material-UI
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class Partners extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          email:''
        };

    }

    handleInputChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
    sendEmail = async (e) => {
      // if(!this.state.email)
      //     return;
      e.preventDefault();
      console.log('sending email');

      let token = localStorage.getItem('jwt');
      let userInfo = localStorage.getItem('userInfo');

      let options = {
          headers: {
              Authorization: `Bearer ${token}`,
              'user-info': userInfo,
          }   
      }

      let body = {
          cleaner_email: this.state.email
      }
      
      const backendUrl = process.env.backendURL|| 'http://localhost:5000';
      try {
         const res = await axios.post(`${backendUrl}/api/invites`, body, options);
      }
      catch (err) {
          console.log(err);
      }
  }

    render(){
        return (
            <div>
                <TextField
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    placeholder="Assistant's Email"
                    type="text"
                    name="email"
                />
                <Button
                type="submit"
                onClick={this.sendEmail}
                >
                    Send Invite
                </Button>
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
    
})(Partners))