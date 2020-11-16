import React from 'react';
import {  Button, Form, FormGroup, Label, Input,FormText } from 'reactstrap';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { hostname } from '../hostname';

class AddCustomer extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            cusName : '',
            cusMail : '',
            cusLoc : '',
            nameError :'',
            mailError: '',
            locError: '',
            fetchError: ''
        };

    }
    
    checkValid(str)
    {
        if(str.length < 3)
         {
             return false
         }
         return true
    }

    checkMail(str)
    {
        let re =  /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;

        return re.test(str);
    }

    submitForm(e)
    {
        e.preventDefault();
        if (!this.checkValid(this.state.cusName) || !this.checkMail(this.state.cusMail)  || !this.checkValid(this.state.cusLoc))
        {
        this.setState({
            nameError : this.checkValid(this.state.cusName) ? '' : 'Provide a valid customer Name',
            locError : this.checkValid(this.state.cusLoc) ? '' : 'Provide a valid customer Location',
            mailError : this.checkMail(this.state.cusMail) ? '' : 'Provide a valid customer Mail' 
        });
        }
        else
        {
            const values = {
                name : this.state.cusName,
                mailId : this.state.cusMail,
                location : this.state.cusLoc
            }
            const headers = {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            };

            fetch( `${hostname}customers`, headers)
            .then(response => response.json())
            .then(json => 
                {
                    console.log(json);
                    this.props.history.push("/Home");
                })
                .catch((err) => {
                    console.log(err)
                    this.setState({
                        fetchError : 'Something Went Wrong !!!'
                    });
                })
        }
    }

    handleNameChange(event)
    {
        this.setState({
            cusName : event.target.value,
            nameError : this.checkValid(event.target.value) ? '' : 'Provide a valid customer Name',
            fetchError: ''
        });
    }

    handleLocChange(event)
    {
        this.setState({
            cusLoc : event.target.value,
            locError : this.checkValid(event.target.value) ? '' : 'Provide a valid customer Location',
            fetchError: ''
        });
    }

    handleMailChange(event)
    {
        this.setState({
            cusMail: event.target.value,
            mailError : this.checkMail(event.target.value) ? '' : 'Provide a valid customer Mail',
            fetchError: ''
        });
    }

    render()
    {
        return (
            <div className="container">
                <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                    <FormGroup row className="p-2">
                        <Label className="col-4 text-center" for="cusName" ><h5>Name:</h5></Label>
                        <div className="col-8 col-md-6 justify-content-center">
                            <Input type="string" style={{height:"2rem"}} id="cusName" placeholder="Give Type Name"
                                value={this.state.cusName} onChange={(e) => this.handleNameChange(e)} />
                            <FormText>
                                {this.state.nameError === '' ? null : <h6 style={{color:"floralWhite"}}>{this.state.nameError}</h6>}
                            </FormText>
                        </div>
                    </FormGroup>

                    <FormGroup row className="p-2">
                        <Label className="col-4 text-center" for="cusMail" ><h5>E-Mail:</h5></Label>
                        <div className="col-8 col-md-6 justify-content-center">
                            <Input type="email" style={{height:"2rem"}} id="cusMail" placeholder="Give Type Description"
                                value={this.state.cusMail} onChange={(e) => this.handleMailChange(e)} />
                            <FormText>
                                {this.state.mailError === '' ? null : <h6 style={{color:"floralWhite"}}>{this.state.mailError}</h6>}
                            </FormText>
                        </div>
                    </FormGroup>

                    <FormGroup row className="p-2">
                        <Label className="col-4 text-center" for="cusLoc" ><h5>Location:</h5></Label>
                        <div className="col-8 col-md-6 justify-content-center">
                            <Input type="string" style={{height:"2rem"}} id="cusLoc" placeholder="Give Type Name"
                                value={this.state.cusLoc} onChange={(e) => this.handleLocChange(e)} />
                            <FormText>
                                {this.state.locError === '' ? null : <h6 style={{color:"floralWhite"}}>{this.state.locError}</h6>}
                            </FormText>
                        </div>
                    </FormGroup>
                    <FormText>
                        {this.state.fetchError === '' ? null : <h6 style={{color:"floralWhite"}}>{this.state.fetchError}</h6>}
                    </FormText>
                    <FormGroup className="row p-2">
                        <div className="col-4 offset-7">
                            <Button style={{backgroundColor:"rgb(50,50,50)",color:"floralWhite"}}
                                type = "submit" onClick={(e) => this.submitForm(e)}>Add Customer</Button>
                        </div>
                    </FormGroup>
                </Form>
            
            </div>
        );
    } 
}

AddCustomer.propTypes = {
    history: propTypes.object
};

export default withRouter(AddCustomer);