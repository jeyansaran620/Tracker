import React from 'react';
import {  Button, Form, FormGroup, Label, Input,FormText } from 'reactstrap';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { hostname } from '../hostname';
import Select from 'react-select';
import { customStyles } from './react-select-style';

class AddRental extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            tools : [],
            toolName : {},
            customers : [],
            cusName : {},
            dateToBeReturned : '',
            nameError:'',
            cusError: '',
            dateError: '',
            fetchError: ''
        };
    }
    
    componentDidMount()
    {
        const headers = {
            method: 'GET',
            credentials: 'include'
        };

        fetch( `${hostname}tools/available`, headers)
        .then(response => response.json())
        .then(json => 
            {
                console.log(json);
                let tools = [];
                json.map((tool) => tools.push(
                    {
                        label : tool._id,
                        value : tool._id
                    }));
                this.setState({
                    tools
                })
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    fetchError : 'tools fetch Went Wrong !!!'
                });
            })

        fetch( `${hostname}customers/`, headers)
        .then(response => response.json())
        .then(json => 
        {
            console.log(json);
            let customers = [];
            json.map((cus) => customers.push(
                {
                    label : cus.mailId,
                    value : cus.mailId
                }));
            this.setState({
                customers
            })
        })
        .catch((err) => {
            console.log(err)
            this.setState({
                fetchError : 'customers fetch Went Wrong !!!'
            });
        })
    }


    submitForm(e)
    {
        e.preventDefault();
       
        if (!this.state.toolName.value  || !this.state.cusName.value || this.state.dateToBeReturned === '')
        {
        this.setState({
            nameError : this.state.typeName.value ? '' : 'Please Select a type',
            cusError : this.state.cusName.value ? '' : 'Please Select a customer',
            dateError : this.state.dateToBeReturned === '' ? 'Provide the Expected Date' : ''
        });
        }
        else
        {
            const values = {
                customer : this.state.cusName.value,
                dateTaken : new Date().toISOString().slice(0,10),
                dateToBeReturned : this.state.dateToBeReturned
            }
            const headers = {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            };

            fetch( `${hostname}tools/${this.state.toolName.value}/rentals/`, headers)
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

    handleNameChange(name)
    {
        this.setState({
            nameError : '',
            toolName : name,
            fetchError: ''
        });
    }
    handleCusChange(name)
    {
        this.setState({
            cusError : '',
            cusName : name,
            fetchError: ''
        });
    }

    handleDateChange(event)
    {
        this.setState({
            dateToBeReturned: event.target.value,
            fetchError: ''
        });
    }
    

    render()
    {
        return (
            <div className="container">
                <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                    <FormGroup row className="p-2">
                        <Label className="col-4 text-center" for="toolName" ><h5>Tool:</h5></Label>
                        <div className="col-8 col-md-6 justify-content-center">
                        <Select options={this.state.tools}
                         style={{height:"2rem"}} id="toolName" placeholder="Select Type"  styles={customStyles}
                                value={this.state.toolName} onChange={(e) => this.handleNameChange(e)} />
                            <FormText>
                                {this.state.nameError === '' ? null : <h6 style={{color:"floralWhite"}}>{this.state.nameError}</h6>}
                            </FormText>
                        </div>
                    </FormGroup>

                    <FormGroup row className="p-2">
                        <Label className="col-4 text-center" for="cusName" ><h5>Customer:</h5></Label>
                        <div className="col-8 col-md-6 justify-content-center">
                        <Select options={this.state.customers}
                         style={{height:"2rem"}} id="toolName" placeholder="Select Customer"  styles={customStyles}
                                value={this.state.cusName} onChange={(e) => this.handleCusChange(e)} />
                            <FormText>
                                {this.state.cusError === '' ? null : <h6 style={{color:"floralWhite"}}>{this.state.cusError}</h6>}
                            </FormText>
                        </div>
                    </FormGroup>

                    <FormGroup row className="p-2">
                        <Label className="col-4 text-center" for="dateToBeReturned" ><h5>Date To Be Returned:</h5></Label>
                        <div className="col-8 col-md-6 justify-content-center">
                            <Input type="date" style={{height:"2rem"}} id="dateToBeReturned" 
                                value={this.state.dateToBeReturned} onChange={(e) => this.handleDateChange(e)} />
                            <FormText>
                                {this.state.dateError === '' ? null : <h6 style={{color:"floralWhite"}}>{this.state.dateError}</h6>}
                            </FormText>
                        </div>
                    </FormGroup>
                    <FormText>
                        {this.state.fetchError === '' ? null : <h6 style={{color:"floralWhite"}}>{this.state.fetchError}</h6>}
                    </FormText>
                    <FormGroup className="row p-2">
                      <div className="col-4 offset-1">
                            <Button style={{backgroundColor:"rgb(50,50,50)",color:"floralWhite"}}
                                onClick={() => this.props.history.push("/AddTool")}>Add Tool</Button>
                        </div>
                        <div className="col-4 offset-2">
                            <Button style={{backgroundColor:"rgb(50,50,50)",color:"floralWhite"}}
                                type = "submit" onClick={(e) => this.submitForm(e)}>Make Rent</Button>
                        </div>
                    </FormGroup>
                </Form>
            
            </div>
        );
    } 
}

AddRental.propTypes = {
    history: propTypes.object
};

export default withRouter(AddRental);