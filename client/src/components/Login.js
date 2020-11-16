import React from 'react';
import {  Button, Form, FormGroup, Label, Input,FormText } from 'reactstrap';
import propTypes from 'prop-types';
import auth from "./auth";
import { withRouter } from 'react-router-dom';
import {hostname} from '../hostname';

class Login extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            username : '',
            password: '',
            userError:'',
            passError: '',
            fetchError: ''
        };

    }
    
    checkValid(str)
    {
        if(str.length < 3 || str.length > 12)
         {
             return false
         }
         return true
    }

    submitForm(e)
    {
        e.preventDefault();
        if (!this.checkValid(this.state.username)  || !this.checkValid(this.state.password))
        {
        this.setState({
            userError : this.checkValid(this.state.username) ? '' : 'Provide a valid Username',
            passError : this.checkValid(this.state.password) ? '' : 'Provide a valid Password' 
        });
        }
        else
        {
            const headers = {
                method:'GET', 
                credentials: 'include',
                headers: {'Authorization': 'Basic ' + btoa(`${this.state.username}:${this.state.password}`)}};

            fetch( `${hostname}login`, headers)
            .then(response => response.json())
            .then(json => 
                {
                    if(json.login)
                    {
                        auth.login(() => {
                          this.props.history.push("/Home");
                        });
                    }
                    else
                    {
                        this.setState({
                            fetchError : 'Wrong Credentials'
                        });
                    }
                })
                .catch((err) => {
                    console.log(err)
                    this.setState({
                        fetchError : 'Wrong Credentials'
                    });
                })
        }
    }

    handlePassChange(event)
    {
        this.setState({
            password : event.target.value,
            passError : this.checkValid(event.target.value) ? '' : 'Provide a valid Password',
            fetchError: ''
        });
    }

    handleUserChange(event)
    {
        this.setState({
            username: event.target.value,
            userError : this.checkValid(event.target.value) ? '' : 'Provide a valid Username',
            fetchError: ''
        });
    }

    render()
    {
        return (
            <div className="container">
                <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                    <FormGroup row className="p-2">
                        <Label className="col-4 text-center" for="Username" ><h5>Username:</h5></Label>
                        <div className="col-8 col-md-6 justify-content-center">
                            <Input type="string" style={{height:"2rem"}} id="Username" placeholder="Give your Username"
                                value={this.state.username} onChange={(e) => this.handleUserChange(e)} />
                            <FormText>
                                {this.state.userError === '' ? null : <h6 style={{color:"floralWhite"}}>{this.state.userError}</h6>}
                            </FormText>
                        </div>
                    </FormGroup>

                    <FormGroup row className="p-2">
                        <Label className="col-4 text-center" for="Password" ><h5>Password:</h5></Label>
                        <div className="col-8 col-md-6 justify-content-center">
                            <Input type="password" style={{height:"2rem"}} id="Password" placeholder="Give your Password"
                                value={this.state.password} onChange={(e) => this.handlePassChange(e)} />
                            <FormText>
                                {this.state.passError === '' ? null : <h6 style={{color:"floralWhite"}}>{this.state.passError}</h6>}
                            </FormText>
                        </div>
                    </FormGroup>
                    <FormText>
                        {this.state.fetchError === '' ? null : <h6 style={{color:"floralWhite"}}>{this.state.fetchError}</h6>}
                    </FormText>
                    <FormGroup className="row p-2">
                        <div className="col-4 offset-7">
                            <Button style={{backgroundColor:"rgb(50,50,50)",color:"floralWhite"}}
                                type = "submit" onClick={(e) => this.submitForm(e)}>Login</Button>
                        </div>
                    </FormGroup>
                </Form>
            
            </div>
        );
    } 
}

Login.propTypes = {
    history: propTypes.object
};

export default withRouter(Login);